//let imgLoaded = false;

// var cache = document.createElement("CACHE");
// cache.style = "position:absolute;z-index:-1000;opacity:0;";
// document.body.appendChild(cache);
// function preloadImage(url) {
//     var img = new Image();
//     img.src = url;
//     img.style = "position:absolute";
//     cache.appendChild(img);
// }

// preloadImage("../img/bomb_party_v4.png");
// preloadImage("../img/SORCERER/ENEMIES8bit_Sorcerer Idle D.png");

//target canvas and define it as 2d
const canvas = document.querySelector("#myCanvas");
const context = canvas.getContext("2d");

const playerLayer = document.querySelector("#playerLayer");
const playCtx = playerLayer.getContext("2d");



//list of image assets. will be preloaded in preLoad function


const img = new Image();
img.setAttribute("src", "./img/bomb_party_v4.png");

const playImg = new Image();
playImg.setAttribute("src", "./img/SORCERER/ENEMIES8bit_Sorcerer Idle D.png");

const explosives =[];
const explosions =[];
const mapIndexMods =[0,-1,1,11,-11]
const mapRowMods =[0,0,0,1,-1]
const mapColMods =[0,-1,1,0,0]

let moveDelay = null;
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
  this.mSize= 4;//size increase as a multiple
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


 const map = new levelMap([
  0, 0, 0, 0, 0, 0, 0, 0, 0, 0 , 0, 
  0, 101, 1, 1, 1, 1, 1, 1, 1, 101, 0,
  0, 101, 17, 25, 17, 17, 17, 17, 17, 101, 0,
  0, 101, 16, 16, 16, 25, 16, 16, 16, 101, 0,
  0, 101, 16, 25, 25, 25, 25, 25, 16, 101, 0,
  0, 101, 17, 17, 17, 25, 17, 17, 17, 101, 0,
  0, 101, 17, 25, 17, 17, 17, 17, 17, 101, 0,
  0, 101, 17, 17, 17, 17, 17, 25, 17, 101, 0,
  0,  1, 1, 1, 1, 1, 1, 1, 1, 1, 0,
  0, 0, 0, 0, 0, 0, 0, 0, 0 , 0, 0
])

const player = {
  /////num represent the player number
  cols: 11,
  rows: 10,
  tSize: 16,
  mSize: 4,//size increase as a multiple
  atlasCol: [8, 8],
  atlasRow: [1,1], 
  sprCol: [2,2],
  sprRow: [3,5],
  tiles: [
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 1, 0, 2, 2, 2, 2, 2, 0, 0,
    0, 0, 2, 2, 2, 0, 2, 2, 2, 0, 0,
    0, 0, 2, 0, 0, 0, 0, 0, 2, 0, 0,
    0, 0, 2, 2, 2, 0, 2, 2, 2, 0, 0,
    0, 0, 2, 0, 2, 2, 2, 2, 2, 0, 0, 
    0, 0, 2, 2, 2, 2, 2, 0, 1, 0, 0, 
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 
  ],
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
          if (keyCode === 37){
            //left
            player.playerLeft(0);
          }else if (keyCode === 39  ){
            //right
            player.playerRight(0);
          }else if ( keyCode === 38 ){
            //up
            player.playerUp(0);
          }else if ( keyCode === 40){
            //down
            player.playerDown(0);
          }else if( keyCode === 16 ){
           //bomb
           player.plantBomb(0);
          }else if (keyCode === 65){
            //left player 2
            player.playerLeft(1);
          }else if (keyCode === 68  ){
            //right player 2
            player.playerRight(1);
          }else if ( keyCode === 87 ){
            //up player 2
            player.playerUp(1);
          }else if ( keyCode === 83){
            //down player 2
            player.playerDown(1);
          }else if( keyCode === 32 ){
           //bomb player
           player.plantBomb(1);
          }

          } 
     }
            




/////////////////
//////FUNCTIONS
/////////////////
//runs through asset array and sets them as links in head to preload them. Does preload but need to set it to run other things after the load is done.
// const preLoad = (assets) =>{
//   for (let i = 0; i < assets.length; i++) {        
//       let res = document.createElement("link");
//       res.rel = "preload";
//       res.as = "image";
//       res.href = assets[i];
//       document.head.appendChild(res);
//       console.log(res);
//   }
//     imgLoaded = true;
// }   


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
          explosives[i].boom();
          explosives.splice(i,1,);
          //ticks down timer so explosions vanish once done.
        }
        
      }
      if (player.playIndex[0] === explo.bombMapIndex){
        //player dies if they hit an explosion
        //need a version for each player and to draw a canvas element for death pop up. give option for rematch or map select
        clearInterval(tick);
        console.log("player 1 died");
      };
      if (player.playIndex[1] === explo.bombMapIndex){
        //player dies if they hit an explosion
        //need a version for each player and to draw a canvas element for death pop up. give option for rematch or map select
        clearInterval(tick);
        console.log("player 2 died");
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
 


 map.drawMap();
 player.drawPlayer(0);
 
 let tick = setInterval(()=>{
          ///Set the game tick rate. essentially frame rate. every frame/tick it clears the player canvas and redraws the player, bombs, and explosions updating their states and positions each time.
  playCtx.clearRect(0, 0, canvas.width, canvas.height);
  player.drawPlayer(0);
  player.drawPlayer(1);
  drawBombs();
  drawBooms();
 },100)


//  window.onload = function() {
//   map.drawMap();
//   player.drawPlayer();

//     tick = setInterval(()=>{
//     playCtx.clearRect(0, 0, canvas.width, canvas.height);
//     player.drawPlayer();
//     drawBombs();
//     drawBooms();
//    },100)
// }


//catches key presses and feeds them to a player method which in turn splits them up into inputs for player 1 or 2
document.addEventListener("keydown", player.movePlayer);

//console.log(map);

////DEAD CODE GRAVEYARD. DIDN'T WORK BUT FIGURED ID HOLD OFF ON DELETING FOR NOW.
//#region 
// const bombTimer = (x,y,stage) =>{
//   setTimeout(( x, y, stage)=>{
//     bombCtx.clearRect(0, 0, canvas.width, canvas.height);
//     let bombX= x;
//     let bombY = y;
//     stage;
//     bombCtx.drawImage(
//       img, // image source
//       (bomb.bombCol + stage) * 16, // x on tilemap to cut from
//       (bomb.bombRow + stage) * 16, // y on tilemap to cut from
//       bomb.tSize, // source tile width
//       bomb.tSize, // source tile height
//       bombX, // target x on canvas
//       bombY, // target y on canvas
//       bomb.mSize * bomb.tSize , // target width on canvas
//       bomb.mSize * bomb.tSize // target height on canvas
//         )

//   stage ++;
//   console.log(stage, bombX, bombY);

//     bombTimer(bombX,bombY, stage)}
//   ,500)
// }

    // console.log("boom");
    // //bomb 1 is index 71. col 5, row 7
    //     bombCtx.drawImage(
    //           img, // image source
    //           bomb.bombCol * 16, // x on tilemap to cut from
    //           bomb.bombRow * 16, // y on tilemap to cut from
    //           bomb.tSize, // source tile width
    //           bomb.tSize, // source tile height
    //           player.playCol * (player.mSize * player.tSize), // target x on canvas
    //           player.playRow * (player.mSize * player.tSize), // target y on canvas
    //           bomb.mSize * bomb.tSize , // target width on canvas
    //           bomb.mSize * bomb.tSize // target height on canvas
    //     );
    //     bombTimer(player.playCol * (player.mSize * player.tSize),player.playRow * (player.mSize * player.tSize) ,1);      
//},  

   // let mapIndex = 0;
    // let sourceX = 0;
    // let sourceY = 0;
    // let mapHeight = player.rows * player.tSize;
    // let mapWidth = player.cols * player.tSize;
    // tileMap = playImg;


    // for (let c = 0; c < mapHeight; c+= player.tSize) {
    //   console.log("c", c);
    //       for (let r = 0; r < mapWidth; r += player.tSize) {
    //         console.log("r", r);
    //         let tile = player.tiles[mapIndex];
    //         if (tile !== 0 && tile !== 2) { // 0 => empty tile
    //           tile -= 1;
    //           sourceX =  Math.floor(tile % player.atlasCol) * player.tSize; //if over tilemap width its takes remainder and measures from 0
    //           sourceY =  Math.floor(tile / player.atlasCol) * player.tSize;// floor brings to nearest lower whole number. EG.. tile 18 = floor of 1.5 = 1 so tile is grabbed from 1 tile down.
    //           playctx.drawImage(
    //             tileMap, // image source
    //             sourceX, // x on tilemap to cut from
    //             sourceY, // y on tilemap to cut from
    //             player.tSize, // source tile width
    //             player.tSize, // source tile height
    //             r * player.mSize, // target x on canvas
    //             c * player.mSize, // target y on canvas
    //             player.mSize * player.tSize , // target width on canvas
    //             player.mSize * player.tSize // target height on canvas
    //           )
    //         }
    //         mapIndex++;
    //       }
      //  } 
  //     let mapIndex = 0;
  //     let sourceX = 0;
  //     let sourceY = 0;
  //     let mapHeight = map.rows * map.tSize;
  //     let mapWidth = map.cols * map.tSize;
  //     tileMap = img;
  
  //     for (let c = 0; c < mapHeight; c+= map.tSize) {
  //       console.log("c", c);
  //           for (let r = 0; r < mapWidth; r += map.tSize) {
  //             console.log("r", r);
  //             let tile = bomb.tiles[mapIndex];
  //             if (tile !== 0) { // 0 => empty tile
  //               tile -= 1;
  //               sourceX =  Math.floor(tile % map.atlasCol) * map.tSize; //if over tilemap width its takes remainder and measures from 0
  //               bombCtx.drawImage(
  //                 tileMap, // image source
  //                 sourceX, // x on tilemap to cut from
  //                 sourceY, // y on tilemap to cut from
  //                 map.tSize, // source tile width
  //                 map.tSize, // source tile height
  //                 r * map.mSize, // target x on canvas
  //                 c * map.mSize, // target y on canvas
  //                 map.mSize * map.tSize , // target width on canvas
  //                 map.mSize * map.tSize // target height on canvas
  //               )
  //             }
  //             mapIndex++;
  //           }
  //         } 
  //  }

  //  bomb: ()=>{
  //   if(player.tiles[player.playIndex] === 1){
  //     player.tiles[player.playIndex] = 95;
  //     bomb.tiles[player.playIndex] = 95;
  //     bomb.placeBomb();
  
   //time based movement testers
//  setTimeout(()=>{
//   console.log("move right");
//   player.playerRight()
// }, 3000)

// setTimeout(()=>{
//   console.log("move left");
//   player.playerLeft()
// }, 5000)

// setTimeout(()=>{
//   console.log("move up");
//   player.playerUp()
// }, 3000)

// setTimeout(()=>{
//   console.log("move down");
//   player.playerDown();
//   console.log([player.tiles]);
// }, 4000)


// window.addEventListener("keydown", event => {
//   if (event.key == "v") {
//     player.playerUp;
//   }
// });


// var map = {
//   cols: 11,
//   rows: 8,
//   tSize: 16,
//   mSize: 4,//size increase as a multiple
//   atlasCol: 15,
//   atlasRow: 7, 
//   tiles: [
//     0, 0, 0, 0, 0, 0, 0, 0, 0, 0 , 0, 
//     0, 101, 1, 1, 1, 1, 1, 1, 1, 101, 0,
//     0, 101, 17, 17, 17, 17, 17, 17, 17, 101, 0,
//     0, 101, 16, 16, 16, 16, 16, 16, 16, 101, 0,
//     0, 101, 16, 16, 16, 16, 16, 16, 16, 101, 0,
//     0, 101, 17, 17, 17, 17, 17, 17, 17, 101, 0,
//     0,  1, 1, 1, 1, 1, 1, 1, 1, 1, 0,
//     0, 0, 0, 0, 0, 0, 0, 0, 0 , 0, 0
//   ],
//   drawMap: function (){
//     let mapIndex = 0;
//     let sourceX = 0;
//     let sourceY = 0;
//     let mapHeight = this.rows * this.tSize;
//     let mapWidth = this.cols * this.tSize;
//     tileMap = img;

//     for (let c = 0; c < mapHeight; c+= this.tSize) {
//       console.log("c", c);
//           for (let r = 0; r < mapWidth; r += this.tSize) {
//             console.log("r", r);
//             let tile = this.tiles[mapIndex];
//             if (tile !== 0) { // 0 => empty tile
//               tile -= 1;
//               sourceX =  Math.floor(tile % this.atlasCol) * this.tSize; //if over tilemap width its takes remainder and measures from 0
//               sourceY =  Math.floor(tile / this.atlasCol) * this.tSize;// floor brings to nearest lower whole number. EG.. tile 18 = floor of 1.5 = 1 so tile is grabbed from 1 tile down.
//               context.drawImage(
//                 tileMap, // image source
//                 sourceX, // x on tilemap to cut from
//                 sourceY, // y on tilemap to cut from
//                 this.tSize, // source tile width
//                 this.tSize, // source tile height
//                 r * this.mSize, // target x on canvas
//                 c * this.mSize, // target y on canvas
//                 this.mSize * this.tSize , // target width on canvas
//                 this.mSize * this.tSize // target height on canvas
//               )
//             }
//             mapIndex++;
//           }
//         } 
//  }
// };


//#endregion
