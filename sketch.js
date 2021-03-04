var trex,trex1,ground,ground1,invisibleGround,cloud,cloud1,obstacle,obstacle1,obstacle2,obstacle3,obstacle4,obstacle5,obstacle6,score,obstacleGroup,cloudGroup,deadTrex,gameOver,gameOver1,restart,restart1;

var gameState = 1


function preload(){
  trex1=loadAnimation("trex1.png","trex3.png","trex4.png")
  
  deadTrex=loadAnimation("trex_collided.png")
  
  obstacle1=loadImage("obstacle1.png")
  obstacle2=loadImage("obstacle2.png")
  obstacle3=loadImage("obstacle3.png")
  obstacle4=loadImage("obstacle4.png")
  obstacle5=loadImage("obstacle5.png")
  obstacle6=loadImage("obstacle6.png")
  
  ground1=loadImage("ground2.png")
  
  cloud1=loadImage("cloud.png")
  
  gameOver1 = loadImage("gameOver.png")
  restart1 = loadImage("restart.png")
}


function setup() {
  createCanvas(600, 200);
  trex=createSprite(100,140)
  trex.addAnimation("trex",trex1)
  trex.scale=0.7
  
  ground=createSprite(300,180,300,10)
  ground.addImage("ground",ground1)
  
  invisibleGround=createSprite(300,195,600,10)
  invisibleGround.visible=false
  
  obstacleGroup=new Group()
  cloudGroup=new Group()
  
  trex.setCollider("circle",0,0,35)
  score=0
  
  gameOver = createSprite(300,95)
  gameOver.addImage("gameOver",gameOver1)
  gameOver.visible=false
  
  restart = createSprite(300,150)
  restart.addImage("restart",restart1)
  restart.visible=false
  restart.scale=0.5
}

function draw() {
  background("red");
  
  text("Score:"+score,400,50)
  
  if(gameState === 1){
    gameOver.visible = false
    restart.visible = false
    if(keyDown("space") && trex.y > 130){
    console.log(trex.y)
     trex.velocityY=-15 
     }
  
  if(obstacleGroup.isTouching(trex)){
    gameState=0
  }
  
  trex.velocityY=trex.velocityY + 0.6  
  trex.collide(invisibleGround)  
  
  ground.velocityX=-3
  
  
  if(ground.x < 0){
     ground.x=600
     }
  
  score=score+Math.round(frameCount/100)
  
  spawnClouds()
  spawnObstacles()
    
}else if(gameState === 0){
  
  gameOver.visible=true
  restart.visible=true
  
  trex.velocityY=0
  ground.velocityX=0
  cloudGroup.setVelocityXEach(0)
  obstacleGroup.setVelocityXEach(0)
  trex.addAnimation("trex",deadTrex)
  cloudGroup.setLifetimeEach(-1)
  obstacleGroup.setLifetimeEach(-1)
  //cloudGroup.destroyEach()
  //obstacleGroup.destroyEach()
}
  
  
 if(mousePressedOver(restart)) {
    reset(); 
 }  
 
  
  drawSprites()
}
  
  function reset  (){
  
  gameState = 1;
  obstacleGroup.destroyEach();
  cloudGroup.destroyEach();
  trex.addAnimation("trex",trex1)
  score = 0;
  
}

function spawnClouds(){
  if(frameCount % 80 === 0){
  cloud=createSprite(600,100)  
  cloud.y=Math.round(random(50,100))
  cloud.addImage("cloud",cloud1)
  cloud.velocityX=-3
  cloud.depth=trex.depth-1 
  cloud.lifetime=195
  cloudGroup.add(cloud)
}
}

function spawnObstacles(){
  if(frameCount % 100 === 0){
  obstacle=createSprite(600,165,10,40)
  obstacle.velocityX=-3
  //generate random obstacles  
  var rand = Math.round(random(1,6));
  switch(rand) { 
  case 1: obstacle.addImage(obstacle1);
      break;
  case 2: obstacle.addImage(obstacle2);
      break;
  case 3: obstacle.addImage(obstacle3);
      break;
  case 4: obstacle.addImage(obstacle4);
      break;
  case 5: obstacle.addImage(obstacle5);
      break;
  case 6: obstacle.addImage(obstacle6);
      break;
  default: break;
  }
               
    obstacle.scale=0.5
    obstacle.lifetime=195
    obstacleGroup.add(obstacle)
  } 
}
