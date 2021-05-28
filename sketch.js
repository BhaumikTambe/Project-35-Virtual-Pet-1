//Create variables here
var dog,dogImg
var hdog, hdogI

var dataBase, foodS, foodStock;

function preload() {
  //load images here
  dogImg = loadImage("images/dogimg.png");
  hdogI = loadImage("images/dogimg1.png");
}

function setup() {
  dataBase = firebase.database();
	createCanvas(500, 500);
 
  dog = createSprite(250,350,50,50);
  dog.addImage("dogImage", dogImg);
  dog.scale = 0.15;

  foodStock = dataBase.ref('food');
  foodStock.on("value",readStock);

}


function draw() {  
  background(46,193,87);
  //add styles here

  if (keyWentDown(UP_ARROW)){
    writeStock(foodS);
    dog.addImage("dogImage",hdogI);
}

  drawSprites();
  textSize(24);
  fill("white");
  text("Press UP Arrow Key To feed Roni",50,20);
  text("Food Remaning: " +foodS,100,100);
}

function readStock(data){
  foodS = data.val();
}

function writeStock(x){
  if(x <= 0){
    x = 0;
  }else{
    x = x-1;
  } 
  dataBase.ref('/').update({food:x})

}