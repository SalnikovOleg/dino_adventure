// unit.js
function Player (options) {
    this.skin = document.createElement('canvas');
    this.skin.id = options.id;
    document.body.appendChild(this.skin);
    this.skin.width = options.skin.width;
    this.skin.height = options.skin.height;
    this.skin.xd = options.skin.xd;//смещение координат скина
    this.skin.yd = options.skin.yd;
    //animation params
    this.context = this.skin.getContext('2d');
    this.animTickCount = 0;
    this.animTicksPerFrame = 4;
    this.image = options.skin.image; //list of images
    this.frames = options.skin.frames; // list of coords offramses
    this.curSprite = 'idle_right'; // current's sprite name
    this.curFrame = 0;  //current frme number
    this.animation = true;// анимация персонажа
    //moving params
    this.hitbox = {width:options.size.width, height:options.size.height};
    this.pos = {x:options.pos.x, y:options.pos.y};
    this.walk = 'none'; // right left none идем
    this.last_direction = 'right';
    this.speed = options.speed || 2;// количество пикселей смещения за одно движение
    this.jump = {active : false, start : false, height : this.pos.y, down : false,
        speed : options.jump.speed || 4, max: options.jump.max || 220
    };
    this.lut = [];
    this.show_hitbox = SHOW_HITBOX;
}

// отрисовка юнита
Player.prototype.render = function () {
      this.context.clearRect(0, 0, this.skin.width, this.skin.height);
      this.context.drawImage(
          this.image,
          this.skin.width * this.curFrame,
          this.frames[this.curSprite].y,
          this.skin.width,
          this.skin.height,
          0, 0, this.skin.width, this.skin.height
        );
        if (this.show_hitbox) {
          this.context.strokeRect(Math.abs(this.skin.xd), this.skin.yd, this.hitbox.width, this.hitbox.height-4);
        }
};

Player.prototype.move = function() {
  this.skin.style.left = this.skin.xd + this.pos.x + 'px';
  this.skin.style.top = (this.pos.y + this.skin.yd -  this.skin.height ) + 'px';
}

// обновление координат и позиций спрайтов
Player.prototype.update = function(next) {
  this.animTickCount += 1;
  if (this.animTickCount > this.animTicksPerFrame) {
        this.animTickCount = 0;
        let spriteName = this.walk == 'none' ? 'idle_' + this.last_direction : 'walk_' + this.walk;
        if (this.jump.active) {
            spriteName = this.walk == 'none' ? 'jump_' +  this.last_direction : 'jump_' + this.walk;
        }
        if (this.jump.down) {
          this.curFrame = 9;
        } else if (this.curSprite != spriteName || this.curFrame == this.frames[this.curSprite].count-1) {
          this.curFrame = 0;
          this.curSprite = spriteName;
        } else {
          this.curFrame += 1;
        }
  }
  this.pos = {x:next.x, y:next.y};

  this.move();
  this.render();
}

//определение координат следующей позиции
Player.prototype.next_pos = function(){
   let next = {x : this.pos.x, y : this.pos.y};
   //хождение вправо влево
   // в режиме бег - скорость (пикселей за движение) больше, другой спрайт
   if (this.walk == 'right') {
     next.x = this.pos.x + this.speed;
   } else if (this.walk == 'left') {
     next.x = this.pos.x - this.speed;
   }

   if (this.jump.active) {
      if (this.jump.start == false) {
          this.jump.start = true;
          this.jump.height = this.pos.y;
      }
      if (this.jump.height - this.pos.y >= this.jump.max) {
          this.jump.down = true;
      }
      if (this.jump.down) { //достигли верхнего предела падаем вниз
          next.y = this.pos.y + this.jump.speed;
      } else { // прыгаем вверх
          next.y = this.pos.y - this.jump.speed;
      }
   }
  return next;
}

Player.prototype.walk_right = function(keydown){
  if (this.walk == 'left' && !keydown)
    return;
  this.walk = keydown ? 'right' : 'none';
  this.last_direction = 'right';
}
Player.prototype.walk_left = function(keydown){
  if (this.walk == 'right' && !keydown)
    return;
  this.walk = keydown ? 'left' : 'none';
  this.last_direction = 'left';
}
Player.prototype.start_jump = function() {
   this.jump.active = true;
}
Player.prototype.end_jump = function(pos){
  this.jump.active = false;
  this.jump.start = false;
  this.jump.down = false;
}
Player.prototype.jump_down = function(y){
  this.jump.active = true;
  this.jump.start = true;
  this.jump.down = true;
  this.jump.height = y;
}


// +++++++++++++++++++++++++++++++++++++======================================+++++++
function Unit(options) {
  this.skin = document.createElement('canvas');
  document.body.appendChild(this.skin);
  this.context = this.skin.getContext('2d');
  this.skin.width = options.skin.width;
  this.skin.height = options.skin.height;
  this.skin.x = options.skin.x;
  this.skin.y = options.skin.y;
  this.scale = options.skin.scale;
  this.image = options.skin.image;
  this.pos = options.pos;
  this.hitbox = {};
  this.hitbox.x = this.pos.x + options.hitbox.dx,
  this.hitbox.y = this.pos.y + options.hitbox.dy,
  this.hitbox.dx = options.hitbox.dx;
  this.hitbox.dy = options.hitbox.dy;
  this.hitbox.width = options.hitbox.width ? options.hitbox.width  :  (this.skin.width - 2 * options.hitbox.dx) * this.scale;
  this.hitbox.height = options.hitbox.height ? options.hitbox.height  : (this.skin.height - 2 * options.hitbox.dy) * this.scale;
  this.animFrames = options.skin.animFrames;
  this.frameCount = 0;
  this.y_move = 1;
  this.show_hitbox = SHOW_HITBOX;
}

Unit.prototype.render = function() {
  this.context.clearRect(0, 0, this.skin.width, this.skin.height);
  this.context.drawImage(
    this.image,
    this.skin.x,
    this.skin.y,
    this.skin.width,
    this.skin.height,
    0,
    0,
    this.skin.width * this.scale,
    this.skin.height * this.scale,
  );
  if (this.show_hitbox) {
    this.context.strokeRect(this.hitbox.dx, this.hitbox.dy, this.hitbox.width, this.hitbox.height);
  }
}

Unit.prototype.move = function(x, y) {
  this.pos.x += x;
  this.pos.y += y;
  this.skin.style.left = this.pos.x + 'px';
  this.skin.style.top = this.pos.y + 'px';
}

Unit.prototype.shake = function() {
  this.frameCount += 1;
  if ( this.frameCount >= this.animFrames) {
    this.frameCount = 0;
    this.y_move = this.y_move == 1 ? -1 : 1;
    this.move(0, this.y_move);
  }
}

Unit.prototype.clear = function() {
    this.context.clearRect(0, 0, this.skin.width, this.skin.height);
}
