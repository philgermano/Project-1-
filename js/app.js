let imgLoaded = false;


//target canvas and define it as 2d
const canvas = document.querySelector("#myCanvas");
const context = canvas.getContext("2d");

const playLayer = document.querySelector("#playerLayer");
const playCtx = playLayer.getContext("2d");

//list of image assets. will be preloaded in preLoad function
const assetList = ["img/tilemap_packed.png",
      "img/SORCERER/ENEMIES8bit_Sorcerer Idle U.png",
      "img/SORCERER/ENEMIES8bit_Sorcerer Hurt D.png",
      "img/SORCERER/ENEMIES8bit_Sorcerer Idle D.png"
]

const img = new Image();
img.setAttribute("src", "../img/bomb_party_v4.png");

const playImg = new Image();
playImg.setAttribute("src", "../img/SORCERER/ENEMIES8bit_Sorcerer Idle D.png");

///////////////
////MAPS

var map = {
  cols: 11,
  rows: 8,
  tSize: 16,
  mSize: 4,//size increase as a multiple
  atlasCol: 15,
  atlasRow: 7, 
  tiles: [
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0 , 0, 
    0, 101, 1, 1, 1, 1, 1, 1, 1, 101, 0,
    0, 101, 17, 17, 17, 17, 17, 17, 17, 101, 0,
    0, 101, 16, 16, 16, 16, 16, 16, 16, 101, 0,
    0, 101, 16, 16, 16, 16, 16, 16, 16, 101, 0,
    0, 101, 17, 17, 17, 17, 17, 17, 17, 101, 0,
    0,  1, 1, 1, 1, 1, 1, 1, 1, 1, 0,
    0, 0, 0, 0, 0, 0, 0, 0, 0 , 0, 0
  ],
  drawMap: () =>{
    let mapIndex = 0;
    let sourceX = 0;
    let sourceY = 0;
    let mapHeight = map.rows * map.tSize;
    let mapWidth = map.cols * map.tSize;
    tileMap = img;

    for (let c = 0; c < mapHeight; c+= map.tSize) {
      console.log("c", c);
          for (let r = 0; r < mapWidth; r += map.tSize) {
            console.log("r", r);
            let tile = map.tiles[mapIndex];
            if (tile !== 0) { // 0 => empty tile
              tile -= 1;
              sourceX =  Math.floor(tile % map.atlasCol) * map.tSize; //if over tilemap width its takes remainder and measures from 0
              sourceY =  Math.floor(tile / map.atlasCol) * map.tSize;// floor brings to nearest lower whole number. EG.. tile 18 = floor of 1.5 = 1 so tile is grabbed from 1 tile down.
              context.drawImage(
                tileMap, // image source
                sourceX, // x on tilemap to cut from
                sourceY, // y on tilemap to cut from
                map.tSize, // source tile width
                map.tSize, // source tile height
                r * map.mSize, // target x on canvas
                c * map.mSize, // target y on canvas
                map.mSize * map.tSize , // target width on canvas
                map.mSize * map.tSize // target height on canvas
              )
            }
            mapIndex++;
          }
        } 
 }
};

const player = {
  cols: 11,
  rows: 8,
  tSize: 16,
  mSize: 4,//size increase as a multiple
  atlasCol: 8,
  atlasRow: 1, 
  tiles: [
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 2, 2, 2, 2, 2, 2, 2, 0, 0,
    0, 0, 2, 2, 2, 2, 2, 2, 2, 0, 0,
    0, 0, 2, 2, 2, 2, 2, 2, 2, 0, 0,
    0, 0, 2, 2, 2, 2, 2, 2, 2, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 
  ],
  playIndex: 24,
  playCol: 2,
  playRow: 2,


  drawPlayer: () =>{

    playCtx.drawImage(
                  playImg, // image source
                  0, // x on tilemap to cut from
                  0, // y on tilemap to cut from
                  player.tSize, // source tile width
                  player.tSize, // source tile height
                  player.playCol * (player.mSize * player.tSize), // target x on canvas
                  player.playRow * (player.mSize * player.tSize), // target y on canvas
                  player.mSize * player.tSize , // target width on canvas
                  player.mSize * player.tSize // target height on canvas
                )


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
          },

            playerRight: () =>{
                if (player.tiles[player.playIndex +1] === 2){
                    //player.tiles[player.playIndex] = 2;
                    //player.tiles[player.playIndex +1] = 1;
                    player.playIndex++;
                    player.playCol++;
                    console.log(player.playIndex);
                    playCtx.clearRect(0, 0, canvas.width, canvas.height);
                    player.drawPlayer();
                }},

                playerLeft: () =>{
                  if (player.tiles[player.playIndex -1] === 2){
                      //player.tiles[player.playIndex] = 2;
                      //player.tiles[player.playIndex -1] = 1;
                      player.playIndex--;
                      player.playCol--;
                      console.log(player.playIndex);
                      playCtx.clearRect(0, 0, canvas.width, canvas.height);
                      player.drawPlayer();
                  }},

                  playerUp: () =>{
                    if (player.tiles[player.playIndex - player.cols] === 2){
                        player.tiles[player.playIndex] = 2;
                        //player.tiles[player.playIndex - player.cols] = 1;
                        player.playIndex =player.playIndex - player.cols;
                        player.playRow--;
                        console.log(player.playIndex);
                        playCtx.clearRect(0, 0, canvas.width, canvas.height);
                        player.drawPlayer();
                    }},

                    playerDown: () =>{
                      if (player.tiles[player.playIndex + player.cols] === 2){
                          player.tiles[player.playIndex] = 2;
                          //player.tiles[player.playIndex +player.cols] = 1;
                          player.playIndex = player.playIndex + player.cols;
                          player.playRow++
                          console.log(player.playIndex);
                          playCtx.clearRect(0, 0, canvas.width, canvas.height);
                          player.drawPlayer();
                      }


            },

    bomb: () =>{
        console.log("boom");
    },       

    movePlayer( {keyCode}){
          if (keyCode === 37){
            //left
            player.playerLeft();
          }else if (keyCode === 39  ){
            //right
            player.playerRight();
          }else if ( keyCode === 38 ){
            //up
            player.playerUp();
          }else if ( keyCode === 40){
            //down
            player.playerDown();
          }else if( keyCode === 16 ){
            player.bomb();
          }
    }        
}
/////////////////
//////FUNCTIONS
/////////////////
//runs through asset array and sets them as links in head to preload them. Does preload but need to set it to run other things after the load is done.
const preLoad = (assets) =>{
  for (let i = 0; i < assets.length; i++) {        
      let res = document.createElement("link");
      res.rel = "preload";
      res.as = "image";
      res.href = assets[i];
      document.head.appendChild(res);
      console.log(res);
  }
    imgLoaded = true;
}   
// context.fillStyle = "tan";
// context.fillRect(0, 0, 256, 265);

// let grid = context.createLinearGradient(0,0,200,50);
// grid.addColorStop(0, "red");
// grid.addColorStop(1,"white");
// context.fillStyle = grid;
// context.fillRect(10,10,236,236);


// context.lineWidth = 4;
// context.moveTo(0,0);
// context.lineTo(256,256);
// context.strokeStyle = "black"
// context.stroke();

// context.font = "30px Comic Sans MS";
// context.fillStyle = "black";
// context.textAlign = "center";
// context.fillText("Hello World", canvas.width/2, canvas.height/2);

 
  // context.drawImage(
  //     img,
  //     64,0, //tilsheet x abd y
  //     16,16, //how big to grab
  //     10,10, //where to place 
  //     50,50 //size of tile when placed
  //     )    
      
// const drawMap = (tX, tY, mX, mY) =>{
//   //tX ,tY = tilemap x & y for tile... mX, mY = canvas x & y for placement
// }

// let mapIndex = 0;
// let sourceX = 0;
// let sourceY = 0;
// let mapHeight = map.rows * map.tSize;
// let mapWidth = map.cols * map.tSize;
// tileMap = img;

//  const drawMap =() =>{
//     for (let c = 0; c < mapHeight; c+= map.tSize) {
//       console.log("c", c);
//           for (let r = 0; r < mapWidth; r += map.tSize) {
//             console.log("r", r);
//             let tile = map.tiles[mapIndex];
//             if (tile !== 0) { // 0 => empty tile
//               tile -= 1;
//               sourceX =  Math.floor(tile % map.atlasCol) * map.tSize; //if over tilemap width its takes remainder and measures from 0
//               sourceY =  Math.floor(tile / map.atlasCol) * map.tSize;// floor brings to nearest lower whole number. EG.. tile 18 = floor of 1.5 = 1 so tile is grabbed from 1 tile down.
//               context.drawImage(
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
 
 //drawMap();

 map.drawMap();
 player.drawPlayer();

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

document.addEventListener("keydown", player.movePlayer);