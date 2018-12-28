window.addEventListener("DOMContentLoaded", ready);
function ready () {
  // let unit = create(1,2);
  // let unit2 = create(10,15);
  // unit.move();
  // unit.render();
  // unit2.move();
  // unit2.render();
}

function create(x,y){
  that = {},
  tick = 0;
  that.x = x;
  that.y = y;

  that.move = function(){
    tick +=1;
    that.x +=1;
    that.y +=1;
  }

  that.render = function(){
    console.log('thick ='+tick+' x='+that.x+' y='+that.y);
  }

  return that;
}

function Hamster() {
  this.food = [];
}

//Hamster.prototype.food = []; // пустой "живот"

Hamster.prototype.found = function(something) {
  this.food.push(something);
};

// Создаём двух хомяков и кормим первого
var speedy = new Hamster();
var lazy = new Hamster();

speedy.found("яблоко");
speedy.found("орех");

console.log( speedy.food.length ); // 2
console.log( lazy.food.length ); // 2 (!??)
