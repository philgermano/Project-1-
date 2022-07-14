let imgLoaded = false;


//target canvas and define it as 2d
const canvas = document.querySelector("#myCanvas");
const context = canvas.getContext("2d");

//list of image assets. will be preloaded in preLoad function
const assetList = ["img/tilemap_packed.png",
      "img/SORCERER/ENEMIES8bit_Sorcerer Idle U.png",
      "img/SORCERER/ENEMIES8bit_Sorcerer Hurt D.png",
      "img/SORCERER/ENEMIES8bit_Sorcerer Idle D.png"
]

///////////////
////MAPS

var map = {
  cols: 4,
  rows: 4,
  tSize: 16,
  mSize: 4,//size increase as a multiple
  atlasCol: 12,
  atlasRow: 11, 
  tiles: [
    2, 3, 3, 4,
    14, 31, 31, 16, 
    14, 43, 43, 16, 
    26, 27, 27, 28, 
  ],
  getTile: function(col, row) {
    return this.tiles[row * map.cols + col]
  }
};


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



        
  // preLoad(assetList);

  const img = new Image();
  img.setAttribute("src", "../img/tilemap_packed.png");
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

let mapIndex = 0;
let sourceX = 0;
let sourceY = 0;
let mapHeight = map.rows * map.tSize;
let mapWidth = map.cols * map.tSize;
tileMap = img;

 const drawMap =() =>{
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
              mapIndex++;
            }
          }
        } 
 }
 
 drawMap();