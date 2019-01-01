function Game(options) {
  this.bg_canvas = document.createElement('canvas');
  this.bg_canvas.setAttribute('id', options.id);
  this.bg_canvas.width = options.size.width || 1200;
  this.bg_canvas.height = options.size.height || 600;
  document.body.appendChild(this.bg_canvas);
  this.bg_ctx = this.bg_canvas.getContext('2d');
  this.bg=null;
  this.units=[];
  let self = this;
  this.framse = [];
  this.blocks = [];
  this.lut = [];
  this.units = [];
  document.onkeydown = document.onkeyup = function(e){ self.key_handle(e); };
  this.show_hitbox  = SHOW_HITBOX;
}

// отображение фона и передача юнитов
Game.prototype.load = function(options) {
  this.bg = options.bg;
  this.player = options.player;
  this.border = options.mainBorder;
  this.bg_ctx.drawImage(this.bg, 0, 0);
  this.blocks = this.prepare_objects(options.blocks);
  this.draw_blocks(this.blocks);

  this.lut = options.lut;
  for (let i in this.lut) {
     this.lut[i].render();
     this.lut[i].move(0,0);
  }
  //начальное положение игрока
  this.player.render();
  this.player.move();
}

//отрисовка объектов
Game.prototype.draw_blocks = function(objects) {
  for(let i in objects) {
    this.bg_ctx.drawImage(
      objects[i].skin.image,
      objects[i].skin.x,
      objects[i].skin.y,
      objects[i].skin.width,
      objects[i].skin.height,
      objects[i].pos.x,
      objects[i].pos.y,
      objects[i].skin.width * objects[i].skin.scale,
      objects[i].skin.height * objects[i].skin.scale,
    );
    if (this.show_hitbox) {
      this.bg_ctx.strokeRect(objects[i].hitbox.x, objects[i].hitbox.y, objects[i].hitbox.width, objects[i].hitbox.height);
    }
  }
}

Game.prototype.prepare_objects=function(objects) {
  for (let i in objects) {
    let hitbox = {
      x : objects[i].pos.x + objects[i].hitbox.dx,
      y : objects[i].pos.y + objects[i].hitbox.dy,
      width : objects[i].hitbox.width ? objects[i].hitbox.width  :  (objects[i].skin.width - 2 * objects[i].hitbox.dx) * objects[i].skin.scale,
      height :  objects[i].hitbox.height ? objects[i].hitbox.height  : (objects[i].skin.height - 2 * objects[i].hitbox.dy) * objects[i].skin.scale
    }
    objects[i].hitbox = hitbox;
  }
  return objects;
}

Game.prototype.render = function() {
  // двигать лут туда сюда
  for (let i in this.lut) {
    this.lut[i].shake();
  }
  //moving
  let pos = this.player.next_pos();
  pos = this.checkup_position(pos, this.player);
  this.player.update(pos);
  this.check_lut(pos);
}

//обработчик действий пользователя
Game.prototype.key_handle = function(e) {
    switch (e.which) {
      case 39 :
          this.player.walk_right(e.type == 'keydown');
      break;
      case 37 :
          this.player.walk_left(e.type == 'keydown')
      break;
      case 32:
      if (e.type == 'keydown' && !this.player.jump.active )
          this.player.start_jump();
      break;
    }
    return false;
  }


Game.prototype.checkup_position = function(next, unit) {
  if (next.x < 0 || (next.x + unit.hitbox.width) > this.bg_canvas.width) //края рамки
      next.x = unit.pos.x;
  if (unit.jump.down && next.y >= this.border[3]) { //призеление на край карты
      unit.end_jump();
      next.y = this.border[3];
      return next;
  }
  let closest_block = this.find_closest_object(next, unit, this.blocks);
  if (closest_block) {
    this.blocks_collision(closest_block, next, unit);
  } else if (!unit.jump.active && next.y < this.border[3]){
     unit.jump_down();
  }
  return next;
}

Game.prototype.find_closest_object = function(next, unit, objects) {
  let x1 = next.x;
  let x2 = next.x + unit.hitbox.width;
  let y1 = next.y - unit.hitbox.height;
  let y2 =  next.y;
  let obj = false;
  for (let i in objects) {
    let bx1 = objects[i].hitbox.x;
    let bx2 = objects[i].hitbox.x + objects[i].hitbox.width;
    let by1 = objects[i].hitbox.y;
    let by2 = objects[i].hitbox.y + objects[i].hitbox.height;

    if ( ( (x2 >= bx1 && x1 <= bx2 ) || (x1 <= bx2 && x2 >= bx1) )
        && ( ( y1 >= by1 && y1 <= by2 ) || ( y2 >= by1 && y2 <= by2 ) ) ) {
          obj = objects[i];
          break;
      }
  }
  return obj;
}

Game.prototype.blocks_collision = function(object, next, unit) {
  let x1 = next.x;
  let x2 = next.x + unit.hitbox.width;
  let y1 = next.y - unit.hitbox.height;
  let y2 =  next.y;
  let bx1 = object.hitbox.x;
  let bx2 = object.hitbox.x + object.hitbox.width;
  let by1 = object.hitbox.y;
  let by2 = object.hitbox.y + object.hitbox.height;

  //находимся в X координатах блока
  let x_area = (unit.last_direction == 'right' && x2 >= bx1 && x1 <= bx2 ) || (unit.last_direction == 'left' && x1 <= bx2 && x2 >= bx1 );
  let y_area = ( y1 > by1 && y1 < by2 ) || ( y2 > by1 && y2 < by2 );
  correct_x = next.x;
  if (x_area && y_area) {
    if ( Math.abs(x2-bx1) <= 4 ) correct_x = bx1-unit.hitbox.width;
    if ( Math.abs(x1-bx2) <= 4 ) correct_x = bx2;
  }

  if (!unit.jump.active && !x_area && next.y < this.border[3]) { // cлезли с блока - падаем вниз
    unit.jump_down();
    return;
  }

  if(unit.jump.active && !unit.jump.down) {//если лители вверх - то проверим не треснулись ли башкой
    if (x_area && y1 <= by2 && y2 > by2) {
       unit.jump_down();
       if (x_area && y_area) { // уперлись по оси x
         next.x = correct_x;
       }
       return;
    }
  }
  if (unit.jump.down) { //если падали вниз - завершить прыжок
    if ( x_area && y2 >= by1 && y1 < by1) {
      if ( (y2 - by1) < 4) {
        unit.end_jump();
        next.y = by1;
      } else {
        next.x = correct_x;
      }
      return;
    }
  }
  if (x_area && y_area) { // уперлись по оси x
    next.x = correct_x;
    return;
  }
}

Game.prototype.check_lut = function(pos) {
    let lut = this.find_closest_unit(pos, this.player, this.lut);
    if (lut) {
       this.player.lut.push(lut.value);
       lut.clear();
       this.lut.splice(lut.index, 1);
    }
}

Game.prototype.find_closest_unit = function(next, unit, objects) {
  let x1 = next.x;
  let x2 = next.x + unit.hitbox.width;
  let y1 = next.y - unit.hitbox.height;
  let y2 =  next.y;
  let obj = false;
  for (let i in objects) {
    let bx1 = objects[i].hitbox.x;
    let bx2 = objects[i].hitbox.x + objects[i].hitbox.width;
    let by1 = objects[i].hitbox.y;
    let by2 = objects[i].hitbox.y + objects[i].hitbox.height;
    if ( ( (x2 > bx1 && x1 < bx2 ) || (x1 < bx2 && x2 > bx1) )
        && ( ( y1 > by1 && y1 < by2 ) || ( y2 > by1 && y2 < by2 ) || (y1 < by1 && y2 > by2 ) )
      ) {
          obj = objects[i];
          obj.index = i;
          break;
      }
  }
  return obj;
}
