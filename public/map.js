//map.js
var blockimg = new Image();
blockimg.src = '/static/img/blocks.png';
let block1 = {width:256, height:128, image:blockimg, x:0, y:0, scale:1};
let block2 = {width:250, height:130, image:blockimg, x:0, y:150, scale:1};
let block_hitbox = {dx:20, dy:6, height:50};

let finishpoint = {width:250, height:170, image:blockimg, x:270, y:0, scale:1};
let checkpoint_hitbox = {dx:10, dy:5, height:50};
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
  {image:alphimg, width:100, height:100, x:0, y:0, scale:0.5, animFrames:15, value:"a", id:0},
  {image:alphimg, width:100, height:100, x:100, y:0, scale:0.5, animFrames:20, value:"б", id:2},
  {image:alphimg, width:100, height:100, x:200, y:0, scale:0.5, animFrames:23, value:"в", id:3},
  {image:alphimg, width:100, height:100, x:300, y:0, scale:0.5, animFrames:17, value:"г", id:4},
  {image:alphimg, width:100, height:100, x:400, y:0, scale:0.5, animFrames:25, value:"д", id:5},
  {image:alphimg, width:100, height:100, x:0, y:100, scale:0.5, animFrames:30, value:"э", id:6},
  {image:alphimg, width:100, height:100, x:100, y:200, scale:0.5, animFrames:28, value:"е", id:7},
  {image:alphimg, width:120, height:100, x:180, y:100, scale:0.5, animFrames:32, value:"ж", id:8},
  {image:alphimg, width:100, height:100, x:300, y:100, scale:0.5, animFrames:35, value:"з", id:9},
  {image:alphimg, width:100, height:100, x:400, y:100, scale:0.5, animFrames:38, value:"и", id:10},
  {image:alphimg, width:100, height:100, x:0, y:200, scale:0.5, animFrames:40, value:"й", id:11},
  {image:alphimg, width:100, height:100, x:100, y:200, scale:0.5, animFrames:20, value:"к", id:12},
  {image:alphimg, width:100, height:100, x:200, y:200, scale:0.5, animFrames:30, value:"л", id:13},
  {image:alphimg, width:100, height:100, x:300, y:200, scale:0.5, animFrames:40, value:"м", id:14},
  {image:alphimg, width:100, height:100, x:400, y:200, scale:0.5, animFrames:50, value:"н", id:15},
  {image:alphimg, width:100, height:100, x:0, y:300, scale:0.5, animFrames:66, value:"о", id:16},
  {image:alphimg, width:100, height:100, x:100, y:300, scale:0.5, animFrames:57, value:"п", id:17},
  {image:alphimg, width:100, height:100, x:200, y:300, scale:0.5, animFrames:30, value:"р", id:18},
  {image:alphimg, width:100, height:100, x:300, y:300, scale:0.5, animFrames:18, value:"с", id:19},
  {image:alphimg, width:100, height:100, x:400, y:300, scale:0.5, animFrames:26, value:"т", id:20},
  {image:alphimg, width:100, height:100, x:0, y:400, scale:0.5, animFrames:38, value:"у", id:21},
  {image:alphimg, width:100, height:100, x:100, y:400, scale:0.5, animFrames:43, value:"ф", id:22},
  {image:alphimg, width:100, height:100, x:200, y:400, scale:0.5, animFrames:54, value:"х", id:23},
  {image:alphimg, width:100, height:100, x:300, y:400, scale:0.5, animFrames:48, value:"ц", id:24},
  {image:alphimg, width:100, height:100, x:400, y:400, scale:0.5, animFrames:56, value:"ч", id:25},
  {image:alphimg, width:100, height:100, x:0, y:500, scale:0.5, animFrames:60, value:"ш", id:26},
  {image:alphimg, width:100, height:100, x:100, y:500, scale:0.5, animFrames:34, value:"щ", id:27},
  {image:alphimg, width:100, height:100, x:200, y:500, scale:0.5, animFrames:29, value:"ю", id:28},
  {image:alphimg, width:100, height:100, x:300, y:500, scale:0.5, animFrames:42, value:"я", id:29},
  {image:alphimg, width:100, height:100, x:400, y:500, scale:0.5, animFrames:45, value:"ы", id:30},
  {image:alphimg, width:100, height:100, x:0, y:600, scale:0.5, animFrames:18, value:"ь", id:31},
  {image:alphimg, width:100, height:100, x:100, y:600, scale:0.5, animFrames:28, value:"ъ", id:32},
  {image:alphimg, width:100, height:100, x:200, y:600, scale:0.5, animFrames:30, value:"ё", id:33}
];
let a_hitbox = {dx:5, dy:5, width:30, height:30};

let objects = [
   {skin:alphabet_skin[0], pos:{x:350,y:200}, hitbox:a_hitbox},//а
   {skin:alphabet_skin[1], pos:{x:660,y:354}, hitbox:a_hitbox},//б
   {skin:alphabet_skin[2], pos:{x:950,y:300}, hitbox:a_hitbox},//в
   {skin:alphabet_skin[3], pos:{x:1150,y:50}, hitbox:a_hitbox},//г
   {skin:alphabet_skin[4], pos:{x:30,y:50}, hitbox:a_hitbox},//д
   {skin:alphabet_skin[5], pos:{x:170,y:310}, hitbox:a_hitbox},//э
   {skin:alphabet_skin[6], pos:{x:1060,y:220}, hitbox:a_hitbox},//е
   {skin:alphabet_skin[7], pos:{x:580,y:40}, hitbox:a_hitbox}//ж
//  {type:'lut', skin:alphabet_skin[8], pos:{x:350,y:200}, hitbox:a_hitbox},//з
//  {type:'lut', skin:alphabet_skin[9], pos:{x:660,y:354}, hitbox:a_hitbox},//и
//  {type:'lut', skin:alphabet_skin[10], pos:{x:950,y:300}, hitbox:a_hitbox},//й
//  {type:'lut', skin:alphabet_skin[11], pos:{x:1150,y:50}, hitbox:a_hitbox},//к
//  {type:'lut', skin:alphabet_skin[12], pos:{x:30,y:50}, hitbox:a_hitbox},//л
//  {type:'lut', skin:alphabet_skin[13], pos:{x:170,y:310}, hitbox:a_hitbox},//м
//  {type:'lut', skin:alphabet_skin[14], pos:{x:1060,y:220}, hitbox:a_hitbox},//н
//  {type:'lut', skin:alphabet_skin[15], pos:{x:580,y:40}, hitbox:a_hitbox},//о
//  {type:'point', skin:finishpoint, pos:{x:1050,y:350}, hitbox:checkpoint_hitbox},
];
