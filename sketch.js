var space_sprite, rocket_sprite;
var spaceImg, rocketImg;

var invisibleWall1, invisibleWall2, invisibleWall3, invisibleWall4;

var coinAnimation, coinSprite;

var coinsGroup;

var asteroidSprite, asteroidAnimation;

var coins = 0;

var gameState = "play";

function preload(){
  spaceImg = loadImage("SPACE.jpg")
  rocketImg = loadImage("rocket_ship.png")
  coinAnimation = loadAnimation("CoinAnimation/coin1.png", "CoinAnimation/coin2.png", "CoinAnimation/coin3.png", "CoinAnimation/coin4.png", "CoinAnimation/coin5.png", "CoinAnimation/coin6.png", "CoinAnimation/coin7.png")
asteroidAnimation = loadAnimation("giphy-20.png", "giphy-21.png", "giphy-22.png", "giphy-23.png", "giphy-24.png", "giphy-25.png", "giphy-26.png", "giphy-27.png", "giphy-28.png", "giphy-29.png", "giphy-3.png", "giphy-30.png", "giphy-31.png", "giphy-32.png", "giphy-33.png", "giphy-34.png", "giphy-35.png", "giphy-36.png", "giphy-37.png", "giphy-38.png", "giphy-39.png", "giphy-4.png", "giphy-41.png", "giphy-42.png", "giphy-43.png", "giphy-44.png", "giphy-45.png", "giphy-46.png", "giphy-47.png", "giphy-48.png", "giphy-49.png", "giphy-5.png", "giphy-50.png", "giphy-51.png", "giphy-52.png", "giphy-53.png", "giphy-54.png", "giphy-55.png", "giphy-56.png", "giphy-57.png", "giphy-58.png", "giphy-59.png", "giphy-6.png")
}

function setup() {
  createCanvas(windowWidth - 20, windowHeight)
  space_sprite = createSprite(width / 2, height / 2, 10, 10)
  space_sprite.addImage(spaceImg)
  space_sprite.scale = 3.7
  
  rocket_sprite = createSprite(width / 2, height/ 1.3, 10, 10)
  rocket_sprite.addImage(rocketImg)
  rocket_sprite.scale = 0.5
  coinsGroup = new Group();
  asteroidG = new Group();
}

function draw() {
  background(spaceImg)
  drawSprites()
  console.log(frameCount)
  if (asteroidG.isTouching(rocket_sprite)) {
    gameState = "end"
  }
  if (gameState === "end") {
    coinsGroup.destroyEach()
    asteroidG.destroyEach()
    rocket_sprite.destroy()
    frameCount = 3
  }
  if (frameCount % 100 === 0) {
    spawnAsteroids()
  }
  if (frameCount % 60 === 0) {
    spawnCoins()
  }
  if (keyDown("right")) {
    rocket_sprite.x += 7
  }
  if (keyDown("left")) {
    rocket_sprite.x -=7
  }
  if (keyDown("up")) {
    rocket_sprite.y -=7
  }
  if (keyDown("down")) {
    rocket_sprite.y += 7
  }
  //createEdgeSprites error so im making invisible walls
  invisibleWall1 = createSprite(1, height / 2, 1, height)
  rocket_sprite.collide(invisibleWall1)
  rocket_sprite.setCollider("rectangle", 0, 0, 120, 200)
  invisibleWall1.visible = false
  
  
  invisibleWall2 = createSprite(width / 2, 1, width, 1)
  rocket_sprite.collide(invisibleWall2)
  invisibleWall2.visible = false
  
  invisibleWall3 = createSprite(width, height / 2, 1, height)
  rocket_sprite.collide(invisibleWall3)
  invisibleWall3.visible = false
  
  invisibleWall4 = createSprite(width / 2, height, width, 1)
  rocket_sprite.collide(invisibleWall4)
  fill(255)
  textSize(20)
  text('Coins: ' + coins, width / 2.5, height - height + 50)
  if (rocket_sprite.isTouching(coinsGroup)) {
    coinsGroup.destroyEach()
    coins += 2
  }
  coinsGroup.setColliderEach("circle", 0, 0, 5)
  space_sprite.velocityY = 5
  if (space_sprite.y > height) {
    space_sprite.y += 1
  }
}

function spawnCoins() {
  coin_sprite = createSprite(random(0, width), 0, 1, 1)
  coin_sprite.addAnimation("spinning_coin", coinAnimation)
  coin_sprite.scale = 0.4
  coin_sprite.velocityY = 4
  coin_sprite.lifetime = 130
  rocket_sprite.depth = coin_sprite.depth + 1
  coinsGroup.add(coin_sprite)
}

function spawnAsteroids() {
  asteroidSprite = createSprite(random(0, width / 2), 0, 1, 1)
  asteroidSprite.velocityX = 5
  asteroidSprite.velocityY = 5
  asteroidSprite.debug = true
  asteroidSprite.scale = 0.3
  asteroidSprite.lifetime = 200
  asteroidSprite.addAnimation("asteroid", asteroidAnimation)
  asteroidSprite.setCollider("circle", 110, 90, 70)
  asteroidSprite.depth = rocket_sprite.depth + 1
  asteroidG.add(asteroidSprite)
}