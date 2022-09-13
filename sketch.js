var matheus,matheusImg;
var bordas;
var chao;
var chao_2
var chao_soquefake
var nuvem
var nuvemimg
var cactus
var kwanzas = 0
var grupocactos
var nuvemgrupo
var JOGAR = 0
var GAMEOVER = 1
var modo = JOGAR
var trexover
var overgame,overgameImg
var continuar,continueImg
var wastedmp3
var checkpoint
var jump
function preload(){
  //pré carrega imagens, animacoes, musicas etc

  matheusImg = loadAnimation("trex3.png","trex4.png");
  chao_2 = loadImage ("ground2.png ")
  nuvemimg = loadImage ("cloud.png")
  obs1 = loadImage ("obstacle1.png")
  obs2 = loadImage ("obstacle2.png")
  obs3 = loadImage ("obstacle3.png")
  obs4 = loadImage ("obstacle4.png")
  obs5 = loadImage ("obstacle5.png")
  obs6 = loadImage ("obstacle6.png")
  
trexover = loadImage ("trex_collided.png")
overgameImg = loadImage ("gameOver.png")
continueImg = loadImage ("restart.png")

wastedmp3 = loadSound ("die.mp3")
checkpoint = loadSound ("checkPoint.mp3")
jump = loadSound ("jump.mp3")


}

function setup(){ 
  //funcao de configuração
  createCanvas(windowWidth,windowHeight ); 

  matheus = createSprite(50,height-100,20,20);
  matheus.addAnimation("correndo",matheusImg);
  matheus.scale = 0.5;
  matheus.debug = false  
  matheus.setCollider ("circle",0,0,40 )

  bordas = createEdgeSprites();

  chao = createSprite(width/2,height-10,600,20);
  chao.addImage (chao_2)
  chao.velocityX = -5
  chao.x = chao.width / 2

  chao_soquefake = createSprite (width/2,height,width,20)
  chao_soquefake.visible = false;
  //var test= Math.round (random (1,10))
 // console.log (test)
 grupocactos = new Group ()
 nuvemgrupo = new Group ()
 matheus.addImage ("trex_collided",trexover)
overgame = createSprite(width/2,height/2)
continuar = createSprite (width/2,height/2+50)
overgame.addImage (overgameImg)
continuar.addImage (continueImg) 
overgame.visible = false;
continuar.visible = false; 
}


function draw(){
  background('white');
  text("kwanzas: "+ kwanzas,500,20)



if (modo===JOGAR) {

  kwanzas = kwanzas + Math.round(frameRate()/60)
  if(kwanzas%100===0&&kwanzas>0){ 
    checkpoint.play   () 
  }
  
  if(touches.length>0&& matheus.isTouching(chao)){
    matheus.velocityY = -15;
    jump.play () 
    touches=[] 
  }

  matheus.velocityY = matheus.velocityY + 1;
  matheus.collide(chao_soquefake);
  if(chao.x< 0){
    chao.x = chao.width/2
    
  }
  cactussummon ()
criarnuvem ()

if (matheus.isTouching(grupocactos)){
  wastedmp3.play ( )
  modo=GAMEOVER 
  //matheus.velocityY = -15 
  //jump.play ()     


}
}

else if( modo===GAMEOVER) {
  chao.velocityX = 0
  grupocactos.setVelocityXEach(0)
nuvemgrupo.setVelocityXEach(0)
  matheus.velocityY = 0
  matheus.changeAnimation ("trex_collided")
  grupocactos.setLifetimeEach(-1)
nuvemgrupo.setLifetimeEach(-1)
overgame.visible = true;
continuar.visible = true; 
if (touches.length>0){
  resetar()
  touches=[]
}
}

  

   
  

  drawSprites();


}


function criarnuvem (){
  if(frameCount%60===0){
    nuvem = createSprite (width,Math.round (random(height-100,height-190)),20,20) 
  nuvem.velocityX = -3
  nuvem.addImage (nuvemimg)
  nuvem.scale = 0.5
  nuvem.lifetime = width
  nuvemgrupo.add(nuvem)

  }
}
function cactussummon(){
if(frameCount%60===0){
  cactus = createSprite (width,height-20)
  cactus.velocityX = -(5+kwanzas/100)
  var randomizar = Math.round(random(1,6))
  switch(randomizar){
    case 1: cactus.addImage(obs1)
    break;
    case 2: cactus.addImage(obs2)
    break;
    case 3: cactus.addImage(obs3)
    break;
    case 4: cactus.addImage(obs4)
    break;
    case 5: cactus.addImage(obs5)
    break;
    case 6: cactus.addImage(obs6)
    break;
  }
  cactus.scale= 0.5
  cactus.lifetime = width
  grupocactos.add (cactus)
}

}
function resetar () {
  modo=JOGAR
  grupocactos.destroyEach()
 matheus.changeAnimation("correndo")
 kwanzas = 0
 nuvemgrupo.destroyEach() 
 overgame.visible = false;
 continuar.visible = false;  
}
