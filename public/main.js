//main.js
let game, player;
var animationframe = 0;
const SHOW_HITBOX = false;

// load player skin
let pinit = {
  pos : {x:610, y:400},
  size :  {width:50, height:90},
  speed : 2,
  jump : {speed:4, max:220}
};
pinit.skin = {
  frames : {'idle_right':{'y':0,'count':10}, 'idle_left':{'y':100,'count':10},
            'walk_right':{'y':200,'count':10}, 'walk_left':{'y':300, 'count':10},
            'run_left':{'y':200,'count':8}, 'run_right':{'y':300,'count':8},
            'jump_right':{'y':400,'count':10}, 'jump_left':{'y':500,'count':10},
          },
  skin : null,
  width : 100,
  height : 100,
  xd : -13,
  yd : 13
}
pinit.skin.image = new Image();
pinit.skin.image.src = '/static/img/dino.png';


document.addEventListener('DOMContentLoaded', function(){
    //создание игры
    game = new Game({id:'bg', size:{width:1200, height:600}, show_hitbox:false});
    let bg = new Image();
    bg.src = '/static/img/bg1.png'; //загрузка фонового изображения
    bg.addEventListener('load', run);

    function run(){
      // создание и помещение игрока
      player = new Player({id:'player', size:pinit.size, pos:pinit.pos, jump:pinit.jump, speed:pinit.speed, skin:pinit.skin});
      let lut_list = [];
      for(let lut of lut_map) {
        lut_list.push(new Unit(lut));
      }
      //загрузка уровня
      game.load({bg:bg, player:player, mainBorder:mainBorder, blocks:blocks, lut:lut_list});
      //looop = setInterval(loop,100);
      loop();//запуск игрового цикла
    }

    function loop() {
        requestAnimationFrame(loop);
        game.render();
    }
});
