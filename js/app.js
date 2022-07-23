

//target canvas and define it as 2d

const menuLayer = document.querySelector("#menuLayer");
const menuCtx = menuLayer.getContext("2d");

const canvas = document.querySelector("#myCanvas");
const context = canvas.getContext("2d");

const playerLayer = document.querySelector("#playerLayer");
const playCtx = playerLayer.getContext("2d");

const uiLayer = document.querySelector("#uiLayer");
const uiCtx = playerLayer.getContext("2d");

//list of image assets. will be preloaded in preLoad function
const boomSound = new Audio("./img/8-Bit-SFX_Explosion-2.mp3")
const menuMusic = new Audio("./img/CyberCafe.mp3")
const battleMusic = new Audio("./img/Puzzle Battle.mp3")

const img = new Image();
img.setAttribute("src", "./img/bomb_party_v4.png");

const explosives =[];
const explosions =[];
const mapIndexMods =[0,-1,1,11,-11]
const mapRowMods =[0,0,0,1,-1]
const mapColMods =[0,-1,1,0,0]
let tick = null;
let moveDelay = null;
let choice = "start";
let gameState = "";
let mapInd = 0;
let playerMaps =[

  
   [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 1, 0, 2, 4, 4, 2, 2, 0, 0,
    0, 0, 2, 4, 2, 0, 2, 2, 2, 0, 0,
    0, 0, 2, 0, 0, 0, 0, 0, 2, 0, 0,
    0, 0, 2, 2, 2, 0, 2, 4, 2, 0, 0,
    0, 0, 4, 0, 2, 4, 2, 2, 2, 0, 0, 
    0, 0, 2, 2, 2, 4, 2, 0, 1, 0, 0, 
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 
  ],

  
   [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 1, 2, 2, 2, 2, 2, 2, 0, 0,
    0, 0, 2, 2, 2, 2, 2, 2, 2, 0, 0,
    0, 0, 2, 2, 2, 2, 2, 2, 2, 0, 0,
    0, 0, 2, 2, 2, 2, 2, 2, 2, 0, 0,
    0, 0, 2, 2, 2, 2, 2, 2, 2, 0, 0, 
    0, 0, 2, 2, 2, 2, 2, 2, 1, 0, 0, 
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],

    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 
      0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
      0, 0, 1, 4, 2, 4, 4, 2, 2, 0, 0,
      0, 0, 2, 2, 4, 4, 2, 4, 4, 0, 0,
      0, 0, 4, 4, 2, 4, 4, 2, 2, 0, 0,
      0, 0, 2, 4, 2, 4, 4, 2, 4, 0, 0,
      0, 0, 4, 4, 4, 4, 2, 4, 2, 0, 0, 
      0, 0, 2, 4, 2, 4, 4, 2, 1, 0, 0, 
      0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 
      0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],

];

let maps = [

  
   [0, 0, 0, 0, 0, 0, 0, 0, 0, 0 , 0, 
    0, 101, 1, 101, 1, 1, 1, 1, 1, 101, 0,
    0, 101, 17, 1, 17, 25, 25, 17, 17, 101, 0,
    0, 101, 17, 25, 17, 101, 17, 17, 17, 101, 0,
    0, 101, 17, 1, 1, 101, 1, 1, 17, 101, 0,
    0, 101, 17, 17, 17, 1, 17, 25, 17, 101, 0,
    0, 101, 25, 1, 17, 25, 17, 17, 17, 101, 0,
    0, 101, 17, 17, 17, 25, 17, 101, 17, 101, 0,
    0,  1, 1, 1, 1, 1, 1, 1, 1, 1, 0,
    0, 0, 0, 0, 0, 0, 0, 0, 0 , 0, 0],
    
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0 , 0, 
      0, 101, 1, 1, 1, 1, 1, 1, 1, 101, 0,
      0, 101, 17, 17, 17, 17, 17, 17, 17, 101, 0,
      0, 101, 17, 17, 17, 17, 17, 17, 17, 101, 0,
      0, 101, 17, 17, 17, 17, 17, 17, 17, 101, 0,
      0, 101, 17, 17, 17, 17, 17, 17, 17, 101, 0,
      0, 101, 17, 17, 17, 17, 17, 17, 17, 101, 0,
      0, 101, 17, 17, 17, 17, 17, 17, 17, 101, 0,
      0,  1, 1, 1, 1, 1, 1, 1, 1, 1, 0,
      0, 0, 0, 0, 0, 0, 0, 0, 0 , 0, 0],

      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0 , 0, 
        0, 101, 1, 1, 1, 1, 1, 1, 1, 101, 0,
        0, 101, 17, 25, 17, 25, 25, 17, 17, 101, 0,
        0, 101, 17, 17, 25, 25, 17, 25, 25, 101, 0,
        0, 101, 25, 25, 17, 25, 25, 17, 17, 101, 0,
        0, 101, 17, 25, 17, 25, 25, 17, 25, 101, 0,
        0, 101, 25, 25, 25, 25, 17, 25, 17, 101, 0,
        0, 101, 17, 25, 17, 25, 25, 17, 17, 101, 0,
        0,  1, 1, 1, 1, 1, 1, 1, 1, 1, 0,
        0, 0, 0, 0, 0, 0, 0, 0, 0 , 0, 0],
]
///////////////
////classes
class bomb {
  constructor(row, col, bombMapIndex){
      this.row = row;
      this.col = col;
      this.bombMapIndex = bombMapIndex;
      this.stage = 1;
      this.sprCol = 5;
      this.sprRow = 7;
      this.time = 36;
      this.sprTime = 6;
      
      this.boom = function (){
       //console.log("boomign");
       //player.tiles[this.bombMapIndex] = 2;
        for (let i = 0; i < mapIndexMods.length; i++) {
            //console.log("looping booming");
        if( player.tiles[this.bombMapIndex + mapIndexMods[i]] !== 0){
          // console.log("should be making boomlets");
          const boomlet = new explosion(this.row + mapRowMods[i], this.col + mapColMods[i], this.bombMapIndex + mapIndexMods[i]);
          explosions.push(boomlet);
          if(player.tiles[this.bombMapIndex + mapIndexMods[i]] ===4){
            player.tiles[this.bombMapIndex + mapIndexMods[i]] = 2;
            map.tiles[this.bombMapIndex + mapIndexMods[i]] =16;

          }
          // console.log(boomlet);
          // console.log(explosions);
          //player.tiles[this.bombMapIndex + mapIndexMods[i]] = 2;
        };
      }
        //bomb exploding stuff. 
        //probably removing itself and creating and instance of the explosion type.
      };

      this.drawBomb = function (){
        let sourceX =  (this.sprCol -1) * 16;
        let sourceY = (this.sprRow -1) * 16;
          // console.log("SX", sourceX);
          // console.log("SY",sourceY);
        playCtx.drawImage(
                      img, // image source
                      sourceX, // x on tilemap to cut from
                      sourceY, // y on tilemap to cut from
                      map.tSize, // source tile width
                      map.tSize, // source tile height
                      this.col * (map.mSize * map.tSize), // target x on canvas
                      this.row * (map.mSize * map.tSize), // target y on canvas
                      map.mSize * map.tSize , // target width on canvas
                      map.mSize * map.tSize // target height on canvas
        )}
  }
}

class levelMap {
  constructor(layout){
  this.cols = 11;
  this.rows= 10;
  this.tSize= 16;
  this.mSize= 4.3;//size increase as a multiple
  this.atlasCol= 15;
  this.atlasRow= 7;
  this.tiles= layout;
  this.drawMap = function (){
    let mapIndex = 0;
    let sourceX = 0;
    let sourceY = 0;
    let mapHeight = this.rows * this.tSize;
    let mapWidth = this.cols * this.tSize;
    let tileMap = img;

    for (let c = 0; c < mapHeight; c+= this.tSize) {
      //console.log("c", c);
          for (let r = 0; r < mapWidth; r += this.tSize) {
            //console.log("r", r);
            let tile = this.tiles[mapIndex];
            if (tile !== 0) { // 0 => empty tile
              tile -= 1;
              sourceX =  Math.floor(tile % this.atlasCol) * this.tSize; //if over tilemap width its takes remainder and measures from 0
              sourceY =  Math.floor(tile / this.atlasCol) * this.tSize;// floor brings to nearest lower whole number. EG.. tile 18 = floor of 1.5 = 1 so tile is grabbed from 1 tile down.
              context.drawImage(
                tileMap, // image source
                sourceX, // x on tilemap to cut from
                sourceY, // y on tilemap to cut from
                this.tSize, // source tile width
                this.tSize, // source tile height
                r * this.mSize, // target x on canvas
                c * this.mSize, // target y on canvas
                this.mSize * this.tSize , // target width on canvas
                this.mSize * this.tSize // target height on canvas
              )
            }
            mapIndex++;
          }
        } 
 }
}
};

class explosion{
  constructor (row, col, boomMapIndex){
  this.row = row;
  this.col = col;
  this.bombMapIndex = boomMapIndex;
  this.stage = 1;
  this.sprCol = 15;
  this.sprRow = 7;
  this.time = 7;
  this.sprTime = 3;
  
  this.boom = function (){
   
    //bomb exploding stuff. 
    //probably removing itself and creating and instance of the explosion type.
  };

  this.drawBoom = function (){
    let sourceX =  (this.sprCol -1) * 16;
    let sourceY = (this.sprRow -1) * 16;
      // console.log("SX", sourceX);
      // console.log("SY",sourceY);
    playCtx.drawImage(
                  img, // image source
                  sourceX, // x on tilemap to cut from
                  sourceY, // y on tilemap to cut from
                  map.tSize, // source tile width
                  map.tSize, // source tile height
                  this.col * (map.mSize * map.tSize), // target x on canvas
                  this.row * (map.mSize * map.tSize), // target y on canvas
                  map.mSize * map.tSize , // target width on canvas
                  map.mSize * map.tSize // target height on canvas
    )}
}
}

///////////////
////MAPS


 const map = new levelMap([0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 
  0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
  0, 0, 1, 2, 2, 2, 2, 2, 2, 0, 0,
  0, 0, 2, 2, 2, 2, 2, 2, 2, 0, 0,
  0, 0, 2, 2, 2, 2, 2, 2, 2, 0, 0,
  0, 0, 2, 2, 2, 2, 2, 2, 2, 0, 0,
  0, 0, 2, 2, 2, 2, 2, 2, 2, 0, 0, 
  0, 0, 2, 2, 2, 2, 2, 2, 1, 0, 0, 
  0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 
  0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0])

const player = {
  /////num represent the player number
  cols: 11,
  rows: 10,
  tSize: 16,
  mSize: 4.3,//size increase as a multiple
  atlasCol: [8, 8],
  atlasRow: [1,1], 
  sprCol: [2,2],
  sprRow: [3,5],
  tiles: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0 , 0, 
    0, 101, 1, 1, 1, 1, 1, 1, 1, 101, 0,
    0, 101, 17, 17, 17, 17, 17, 17, 17, 101, 0,
    0, 101, 17, 17, 17, 17, 17, 17, 17, 101, 0,
    0, 101, 17, 17, 17, 17, 17, 17, 17, 101, 0,
    0, 101, 17, 17, 17, 17, 17, 17, 17, 101, 0,
    0, 101, 17, 17, 17, 17, 17, 17, 17, 101, 0,
    0, 101, 17, 17, 17, 17, 17, 17, 17, 101, 0,
    0,  1, 1, 1, 1, 1, 1, 1, 1, 1, 0,
    0, 0, 0, 0, 0, 0, 0, 0, 0 , 0, 0],
  
  playIndex: [24,85],
  playCol: [2,8],
  playRow: [2,7],
  faceLeft: [false, false],
  timeDelay:[false,false],
//marks current tile as open
  pMarkCur: (num) =>{
    if(player.tiles[player.playIndex[num]] === 1){
      player.tiles[player.playIndex[num]] = 2;
};
  },
///sets delay so player cant rapid move or jump diangals
  delayMove: function(num){
    player.timeDelay[num] = true;
    //console.log(player.timeDelay[num]);
    setTimeout(()=>{
      player.timeDelay[num] = false;
      //console.log(player.timeDelay[num]);
    },100)
  },

//draws player
  drawPlayer: (num) =>{
//console.log(num);
//console.log(player.playCol[num]);
    let sourceX =  (player.sprCol[num] -1) * 16;
    let sourceY = (player.sprRow[num] -1) * 16;
if (player.faceLeft[num] === true){
  playCtx.save();
  playCtx.scale(-1, 1);
  //draws player with canvas reversed then reverses scale ofter player is drawn for left facing movement.

  //console.log(player.faceLeft);

  playCtx.drawImage(
    img, // image source
    sourceX, // x on tilemap to cut from
    sourceY, // y on tilemap to cut from
        player.tSize, // source tile width
        player.tSize, // source tile height
        (player.playCol[num] * (player.mSize * player.tSize)* -1), // target x on canvas
        player.playRow[num] * (player.mSize * player.tSize), // target y on canvas
        ((player.mSize * player.tSize) * -1), // target width on canvas
        player.mSize * player.tSize // target height on canvas
      )

      playCtx.restore();

} else {
    playCtx.drawImage(
              img, // image source
              sourceX, // x on tilemap to cut from
              sourceY, // y on tilemap to cut from
                  player.tSize, // source tile width
                  player.tSize, // source tile height
                  player.playCol[num] * (player.mSize * player.tSize), // target x on canvas
                  player.playRow[num] * (player.mSize * player.tSize), // target y on canvas
                  player.mSize * player.tSize , // target width on canvas
                  player.mSize * player.tSize // target height on canvas
                )
            }
          },
                  //player movement for moving
                  ///activates delayMove, changes current tile to open and moves player location on map and his other tracking variables. Also changes sprite index.
            playerRight: (num) =>{
                if (player.tiles[player.playIndex[num] +1] === 2 && player.timeDelay[num] === false){
                    player.delayMove(num);
                    player.pMarkCur(num);
                    player.tiles[player.playIndex[num] +1] = 1;
                    player.playIndex[num]++;
                    player.playCol[num]++;
                    player.sprCol[num] = 5;
                    player.faceLeft[num] = false;
                    //console.log(player.playIndex);
                    // playCtx.clearRect(0, 0, canvas.width, canvas.height);
                    // player.drawPlayer();
                    //console.log(player.tiles);
                }},

                playerLeft: (num) =>{
                  if (player.tiles[player.playIndex[num] -1] === 2 && player.timeDelay[num] === false){
                    player.delayMove(num);
                      player.pMarkCur(num);
                      player.tiles[player.playIndex[num] -1] = 1;
                      player.playIndex[num]--;
                      player.playCol[num]--;
                      player.sprCol[num] = 5;
                      player.faceLeft[num] = true;
                      //console.log(player.playIndex);
                      // playCtx.clearRect(0, 0, canvas.width, canvas.height);
                      // player.drawPlayer();
                  }},

                  playerUp: (num) =>{
                    if (player.tiles[player.playIndex[num] - player.cols] === 2 && player.timeDelay[num] === false){
                      player.delayMove(num);
                        player.pMarkCur(num);
                        player.tiles[player.playIndex[num] - player.cols] = 1;
                        player.playIndex[num] =player.playIndex[num] - player.cols;
                        player.playRow[num]--;
                        player.sprCol[num] = 1;
                        player.faceLeft[num] = false;
                        //console.log(player.playIndex);
                        // playCtx.clearRect(0, 0, canvas.width, canvas.height);
                        // player.drawPlayer();
                    }},

                    playerDown: (num) =>{
                      if (player.tiles[player.playIndex[num] + player.cols] === 2 && player.timeDelay[num] === false){
                        player.delayMove(num);
                          player.pMarkCur(num);
                          player.tiles[player.playIndex[num] +player.cols] = 1;
                          player.playIndex[num] = player.playIndex[num] + player.cols;
                          player.playRow[num]++;
                          player.sprCol[num] = 2;
                          player.faceLeft[num] = false;
                          //console.log(player.playIndex);
                          // playCtx.clearRect(0, 0, canvas.width, canvas.height);
                          // player.drawPlayer();
                      }},
                          //creates and places bomb. adds to array for drawing bombs and marks tile as having a bomb on map.
                      plantBomb: (num) =>{
                        if( player.tiles[player.playIndex[num]] !== 3){
                          const bomblet = new bomb(player.playRow[num],player.playCol[num], player.playIndex[num]);
                          player.tiles[player.playIndex[num]] = 3;
                          explosives.push(bomblet);
                          // console.log(bomblet);
                          // console.log(explosives);

                      }},
                  //tracks keys and actives functions for either player 1 or two
            movePlayer( {keyCode}){
          if (keyCode === 37 ){
                    if (gameState === "start") {
                      player.playerLeft(0);
                    }else if (gameState === "select"){
                      mapInd--
                      if(mapInd <0){
                       mapInd = 2;
                      };
                        for (let i = 0; i < playerMaps[mapInd].length; i++) {
                          player.tiles.shift()
                          player.tiles.push(playerMaps[mapInd][i])
                          
                        };
                        for (let i = 0; i < playerMaps[mapInd].length; i++) {
                          map.tiles.shift()
                          map.tiles.push(maps[mapInd][i])
                          
                        }
                      // map.tiles = maps[mapInd];
                      // player.tiles = playerMaps[mapInd];
                      
                      // console.log(player.tiles);
                      // console.log(map.tiles);
                    }
          }else if (keyCode === 39){
                  //right
                      if (gameState === "start") {
                        player.playerRight(0);
                      }else if (gameState === "select"){
                        mapInd++
                        if(mapInd >2){
                          mapInd = 0;
                        };
                        for (let i = 0; i < playerMaps[mapInd].length; i++) {
                          player.tiles.shift()
                          player.tiles.push(playerMaps[mapInd][i])
                          
                        };
                        for (let i = 0; i < playerMaps[mapInd].length; i++) {
                          map.tiles.shift()
                          map.tiles.push(maps[mapInd][i])
                        }
                        // console.log(player.tiles);
                        // console.log(map.tiles);
                      }
          }else if ( keyCode === 38 ){
            //up
            if(gameState === "main"){
              choice = "start";
            }else if(gameState === "start"){
                player.playerUp(0);
            }
          }else if ( keyCode === 40){
            //down
            if(gameState === "main"){
              choice = "help";
            } else if(gameState === "start"){
              player.playerDown(0);
            }
          }else if( keyCode === 16  && gameState === "start" ){
           //bomb
           player.plantBomb(0);
          }else if (keyCode === 65 && gameState === "start" ){
            //left player 2
            player.playerLeft(1);
          }else if (keyCode === 68  && gameState === "start"  ){
            //right player 2
            player.playerRight(1);
          }else if ( keyCode === 87 && gameState === "start" ){
            //up player 2
            player.playerUp(1);
          }else if ( keyCode === 83 && gameState === "start" ){
            //down player 2
            player.playerDown(1);
          }else if( keyCode === 32  && gameState === "start" ){
           //bomb player
           player.plantBomb(1);
              //ENTER key
          }else if(keyCode === 13)
          if(choice === "start"){
            //clear menu. draw top thing and kick on draw map. and player spawn tick.
            choice = "";
            clearInterval(tick);
            menuCtx.clearRect(0, 0, canvas.width, canvas.height);
            mapSelect();
          } else if(gameState === "select"){
              //clear menu. draw top thing and kick on draw map. and player spawn tick.
              matchStart();
          
        }else if(choice === "help" ){
            //clear menu and draw the game instructions
            choice = "";
            gameState = "help";
            displayHelp();
          }else if(gameState === "help" ){
              //clear menu and draw the game instructions

              clearInterval(tick);
              menuCtx.clearRect(0, 0, canvas.width, canvas.height);
              gameStart();
              choice = "start";
          }else if(gameState === "over"){

            console.log(maps[mapInd]);
            console.log(playerMaps[mapInd]);
            matchReset();
          }
          } 
     }
            




/////////////////
//////FUNCTIONS
/////////////////
const matchStart = () =>{
  battleMusic.play();
  clearInterval(tick);
  menuCtx.clearRect(0, 0, canvas.width, canvas.height);
  menuCtx.fillStyle = "#555555";
  menuCtx.fillRect(0 ,0,768 ,768 );
  gameState = "start"
  tick = setInterval(()=>{
    menuMusic.pause();
    ///Set the game tick rate. essentially frame rate. every frame/tick it clears the player canvas and redraws the player, bombs, and explosions updating their states and positions each time.
playCtx.clearRect(0, 0, canvas.width, canvas.height);
map.drawMap();
player.drawPlayer(0);
player.drawPlayer(1);
drawBombs();
drawBooms();
},100)

} 
const mapSelect = () =>{
  clearInterval(tick);
  menuCtx.clearRect(0, 0, canvas.width, canvas.height);
  menuCtx.fillStyle = "#555555";
  menuCtx.fillRect(0 ,0,768 ,768 );
  gameState = "select"
  tick = setInterval(()=>{
    ///Set the game tick rate. essentially frame rate. every frame/tick it clears the player canvas and redraws the player, bombs, and explosions updating their states and positions each time.
map.drawMap();
},100)
}

const displayHelp = () =>{
  clearInterval(tick);
  menuCtx.clearRect(0, 0, canvas.width, canvas.height);
  tick = setInterval(()=>{
    menuCtx.fillStyle = "#555555";
    menuCtx.strokeStyle = "black";
    menuCtx.lineWidth = 5;
    
    menuCtx.font = "60px Rubik Mono One";

    menuCtx.fillRect(0 ,0,768 ,768 );

    menuCtx.fillStyle = "red";

  
    menuCtx.fillText("Try to blow up", (uiCtx.canvas.width* .5) -350 ,(uiCtx.canvas.height* .5) - 300);
    menuCtx.strokeText("Try to blow up", (uiCtx.canvas.width* .5) -350 ,(uiCtx.canvas.height* .5) - 300);

    menuCtx.fillText("your opponent", (uiCtx.canvas.width* .5) -320 ,(uiCtx.canvas.height* .5) - 230);
    menuCtx.strokeText("your opponent", (uiCtx.canvas.width* .5) -320 ,(uiCtx.canvas.height* .5) - 230);

    menuCtx.font = "50px Rubik Mono One";

    menuCtx.fillText("Player 1 controls", (uiCtx.canvas.width* .5) -350 ,(uiCtx.canvas.height* .5) -140);
    menuCtx.strokeText("Player 1 controls", (uiCtx.canvas.width* .5) -350 ,(uiCtx.canvas.height* .5) -140);

        menuCtx.font = "40px Rubik Mono One";
        menuCtx.fillStyle = "white";

    menuCtx.fillText("Arrow keys to move", (uiCtx.canvas.width* .5) -300 ,(uiCtx.canvas.height* .5) - 80);
    menuCtx.strokeText("Arrow keys to move", (uiCtx.canvas.width* .5) -300 ,(uiCtx.canvas.height* .5) - 80);

    menuCtx.fillText("Shift for bombs", (uiCtx.canvas.width* .5) -300 ,(uiCtx.canvas.height* .5) - 20);
    menuCtx.strokeText("Shift for bombs", (uiCtx.canvas.width* .5) -300 ,(uiCtx.canvas.height* .5) - 20);

         menuCtx.font = "50px Rubik Mono One";
         menuCtx.fillStyle = "red";

    menuCtx.fillText("Player 2 controls", (uiCtx.canvas.width* .5) -350 ,(uiCtx.canvas.height* .5) + 100);
    menuCtx.strokeText("Player 2 controls", (uiCtx.canvas.width* .5) -350 ,(uiCtx.canvas.height* .5) + 100);

        menuCtx.font = "40px Rubik Mono One";
        menuCtx.fillStyle = "white";

    menuCtx.fillText("WASD to move", (uiCtx.canvas.width* .5) -300 ,(uiCtx.canvas.height* .5) + 200 );
    menuCtx.strokeText("WASD to move", (uiCtx.canvas.width* .5) -300 ,(uiCtx.canvas.height* .5) + 200);


    menuCtx.fillText("Space for bombs", (uiCtx.canvas.width* .5) -300 ,(uiCtx.canvas.height* .5) + 250);
    menuCtx.strokeText("Space for bombs", (uiCtx.canvas.width* .5) -300 ,(uiCtx.canvas.height* .5) + 250);

  },100)
}

const gameStart = () =>{
  setTimeout(()=>{
    menuMusic.play();
  },1000);
  
  gameState = "main"
  tick = setInterval(()=>{
    menuCtx.clearRect(0, 0, canvas.width, canvas.height);
    menuCtx.fillStyle = "#555555";
    menuCtx.strokeStyle = "black";
    menuCtx.lineWidth = 5;
    menuCtx.font = "70px Rubik Mono One";

    menuCtx.fillRect(0 ,0,768 ,768 );

    menuCtx.fillStyle = "red";
    menuCtx.lineWidth = 15;
    menuCtx.strokeText("BOOM    FOR", (uiCtx.canvas.width* .5) -340 ,(uiCtx.canvas.height* .5) - 200,);
    menuCtx.strokeText("IMPROVEMENT", (uiCtx.canvas.width* .5) -340 ,(uiCtx.canvas.height* .5) - 100,);
    //menuCtx.font = "70px Chewy";
    menuCtx.fillText("BOOM    FOR", (uiCtx.canvas.width* .5) -340 ,(uiCtx.canvas.height* .5) - 200,);
    menuCtx.fillText("IMPROVEMENT", (uiCtx.canvas.width* .5) -340 ,(uiCtx.canvas.height* .5) - 100,);
    menuCtx.font = "50px Rubik Mono One";
    
    menuCtx.lineWidth = 5;
if(choice === "start"){
  menuCtx.fillStyle = "yellow";
}else{
  menuCtx.fillStyle = "white";
}
    menuCtx.fillText("Game Start", (uiCtx.canvas.width* .5) -200 ,(uiCtx.canvas.height* .5) + 70,);
    menuCtx.strokeText("Game Start", (uiCtx.canvas.width* .5) -200 ,(uiCtx.canvas.height* .5) + 70,);
        if(choice === "help"){
          menuCtx.fillStyle = "yellow";
        }else{
          menuCtx.fillStyle = "white";
        }
    menuCtx.fillText("Help", (uiCtx.canvas.width* .5) -200 ,(uiCtx.canvas.height* .5) + 150,);
    menuCtx.strokeText("Help", (uiCtx.canvas.width* .5) -200 ,(uiCtx.canvas.height* .5) + 150,);


    ///Set the game tick rate. essentially frame rate. every frame/tick it clears the menu and redraws showing currently selected option.
},100)

} 

const matchReset = () =>{
  battleMusic.pause();
  explosions.length = 0;
  // while(explosions.length >0){
  //   explosions.pop();
  // }

  explosives.length = 0;
  // while(explosives.length >0){
  //   explosives.pop();
  // }


 //resets obj values
  player.atlasCol = [8, 8];
  player.atlasRow = [1,1];
  player.sprCol = [2,2];
  player.sprRow = [3,5];;
  
  player.playIndex = [24,85];
  player.playCol = [2,8];
  player.playRow = [2,7];
  player.faceLeft = [false, false];
  player.timeDelay =[false,false];

 
  for (let i = 0; i < playerMaps[mapInd].length; i++) {
    player.tiles.shift();
    player.tiles.push(playerMaps[mapInd][i]);
    
  };
  for (let i = 0; i < playerMaps[mapInd].length; i++) {
    map.tiles.shift();
    map.tiles.push(maps[mapInd][i]);
  }    

  matchStart();
}


const drawBombs = ()=>{
 // console.log("drawbobs");
    //cycles through bomb array
    explosives.forEach((iED) =>{
      iED.drawBomb();
      iED.time -= 1;
      //times how long until bomb explodes.
      //times sprite changes on bomb.
              //put in if else for different numbers so the fuse gets smaller. cycle first 3-4 frames then 5 - 6 for right before explosion  BIG MAYBE. far more important stuff
      iED.sprTime -= 1;
      // console.log(iED);
      //console.log(iED.time);
      if (iED.sprTime <= 0){
          iED.sprCol++;
          iED.sprTime = 6;
          //advances through bomb sprites
          //resets sprite timer for next sprite advance
    }
      if (iED.time <= 0){
        player.tiles[iED.bombMapIndex] = 2;
          iED.boom();
          boomSound.play();
          //console.log(iED.boom);
           explosives.shift();
            //ticks down timer so explosions vanish once done.
      }
    } ) 
    
}
const drawBooms = ()=>{
  // console.log("drawbombs");
          //cycles through explosion array
     explosions.forEach((explo) =>{
      player.tiles[explo.bombMapIndex] = 2;
      for (let i = 0; i < explosives.length; i++) {
        // console.log(explosives[i]);
        // console.log(explo);
        if (explo.bombMapIndex === explosives[i].bombMapIndex){
          explosives[i].time = 0;
          //explosives[i].boom();
          //explosives.splice(i,1,);
            //blows up any bombs in contact with an explosion
        }
        
      }
      //player 1 dead
      if (player.playIndex[0] === explo.bombMapIndex){

        gameState = "over";
        //player dies if they hit an explosion
        //need a version for each player and to draw a canvas element for death pop up. give option for rematch or map select
        clearInterval(tick);
          uiCtx.fillStyle = "white";
          uiCtx.strokeStyle = "black";
          uiCtx.lineWidth = 5;
          uiCtx.font = "30px Arial";


          uiCtx.fillRect((uiCtx.canvas.width* .5) -200 ,(uiCtx.canvas.height* .5) - 150, 400, 300);
          uiCtx.strokeRect((uiCtx.canvas.width* .5) -200 ,(uiCtx.canvas.height* .5) - 150, 400, 300);

          uiCtx.fillStyle = "black";

          uiCtx.fillText("Player 1 lost.", (uiCtx.canvas.width* .5) -90 ,(uiCtx.canvas.height* .5) - 50,);

          uiCtx.fillText("Press Enter to restart.", (uiCtx.canvas.width* .5) -140 ,(uiCtx.canvas.height* .5) + 70,);

        //uiCtx.drawImage()

        //console.log("player 1 died. push any button to restart");
      };
      //player 2 dead
      if (player.playIndex[1] === explo.bombMapIndex){

        gameState = "over";
        //player dies if they hit an explosion
        //need a version for each player and to draw a canvas element for death pop up. give option for rematch or map select
        clearInterval(tick);
        uiCtx.fillStyle = "white";
        uiCtx.strokeStyle = "black";
        uiCtx.lineWidth = 5;
        uiCtx.font = "30px Arial";


        uiCtx.fillRect((uiCtx.canvas.width* .5) -200 ,(uiCtx.canvas.height* .5) - 150, 400, 300);
        uiCtx.strokeRect((uiCtx.canvas.width* .5) -200 ,(uiCtx.canvas.height* .5) - 150, 400, 300);

        uiCtx.fillStyle = "black";

        uiCtx.fillText("Player 2 lost.", (uiCtx.canvas.width* .5) -90 ,(uiCtx.canvas.height* .5) - 50,);

        uiCtx.fillText("Press Enter to restart.", (uiCtx.canvas.width* .5) -140 ,(uiCtx.canvas.height* .5) + 70,);
        console.log("player 2 died.push any button to restart");


      };
      //draws bomb and cuts timer for explosion life and sprite image advancer.
      explo.drawBoom();
      explo.time -= 1;
      explo.sprTime -= 1;
      // console.log(iED);
      //console.log(explo.time);
      if (explo.sprTime <= 0){
        explo.sprRow--;
        explo.sprTime = 3; 
        //advances through explosion sprites
          //resets sprite timer for next sprite advance
      }
      //   console.log(explo);
      //  console.log(explo.time);
      //  console.log(explosions);
      //  console.log(player.tiles);
       if (explo.time <= 0){
            //explo.boom;
                        //timer hits 0 remove explosion from array so it essentially no longer exists next draw tick.
           //player.tiles[explo.bombMapIndex] = 2;
           explosions.shift();
       }
     } ) 
     
 }
 




gameStart();



//catches key presses and feeds them to a player method which in turn splits them up into inputs for player 1 or 2
document.addEventListener("keydown", player.movePlayer);

//console.log(map);












