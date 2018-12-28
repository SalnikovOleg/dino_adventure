//map.js
let mainBorder = [0,0,1200,530];

var blockimg = new Image();
blockimg.src = '/static/img/blocks.png';
let block1 = {width:256, height:128, image:blockimg, x:0, y:0, scale:1};
let block2 = {width:250, height:130, image:blockimg, x:0, y:150, scale:1};
let block_hitbox = {dx:20, dy:6, height:50};
//x:540, y:400, width:220,
let blocks = [
  {skin:block2, pos:{x:-100,y:290}, hitbox:block_hitbox},
  {skin:block2, pos:{x:750,y:210}, hitbox:block_hitbox},
  {skin:block2, pos:{x:230,y:240}, hitbox:block_hitbox},
  {skin:block1, pos:{x:520,y:394}, hitbox:block_hitbox},
  {skin:block2, pos:{x:1050,y:100}, hitbox:block_hitbox},
];

let alphimg = new Image();
alphimg.src = '/static/img/alphabet.png';

let alphabet_skin = [
  {image:alphimg, width:100, height:100, x:0, y:0, scale:0.5, animFrames:15, value:"a"},
  {image:alphimg, width:100, height:100, x:100, y:0, scale:0.5, animFrames:20, value:"б"},
  {image:alphimg, width:100, height:100, x:200, y:0, scale:0.5, animFrames:23, value:"в"},
  {image:alphimg, width:100, height:100, x:300, y:0, scale:0.5, animFrames:17, value:"г"},
  {image:alphimg, width:100, height:100, x:400, y:0, scale:0.5, animFrames:25, value:"д"},
  {image:alphimg, width:100, height:100, x:0, y:100, scale:0.5, animFrames:30, value:"э"},
  {image:alphimg, width:100, height:100, x:100, y:200, scale:0.5, animFrames:28, value:"е"},
  {image:alphimg, width:120, height:100, x:180, y:100, scale:0.5, animFrames:10, value:"ж"}
];

let a_hitbox = {dx:5, dy:5, width:30, height:30};
let lut_map = [
  {skin:alphabet_skin[0], pos:{x:350,y:200}, hitbox:a_hitbox},//а
  {skin:alphabet_skin[1], pos:{x:660,y:354}, hitbox:a_hitbox},//б
  {skin:alphabet_skin[2], pos:{x:950,y:300}, hitbox:a_hitbox},//в
  {skin:alphabet_skin[3], pos:{x:1150,y:50}, hitbox:a_hitbox},//г
  {skin:alphabet_skin[4], pos:{x:30,y:50}, hitbox:a_hitbox},//д
  {skin:alphabet_skin[5], pos:{x:170,y:310}, hitbox:a_hitbox},//э
  {skin:alphabet_skin[6], pos:{x:1060,y:220}, hitbox:a_hitbox},//е
  {skin:alphabet_skin[7], pos:{x:580,y:40}, hitbox:a_hitbox}//ж
];
