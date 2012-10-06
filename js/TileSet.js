var DungeonTile={
"Ground" : ".",
"Stone" : "@",
"StoneColor" : "rgb(120,100,120)",
"Wall" : "#",
"WallColor" : "rgb(153,153,153)",
"Water_1" : "-",
"Water_1Color" : "rgb(50,50,150)",
"Water_2" : "_",
"Water_2Color" : "rgb(50,50,250)",
"Fire_1" : "w",
"Fire_1Color" : "rgb(150,50,50)",
"Fire_2" : "W",
"Fire_2Color" : "rgb(250,50,50)",
"Unknow" : "/",
"UnknowColor" :  "rgb(255,255,255)",
"Stair" : ">",
"Chest" : "=",
"ChestColor" : "rgb(140,97,30)",

}

var CaveTile={
"Lava_1" : "-",
"Lava_1Color" : "rgb(150,50,50)",
"Lava_2" : "_",
"Lava_2Color" : "rgb(250,50,50)",
"Ground" : ":",
"GroundColor" : "rgb(100,100,100)",
"Stone" : "@",
"StoneColor" : "rgb(120,100,120)"
}

var PlainTile={
"Ground" : "'",
"GroundColor" : "rgb(0,153,0)",
"Tree" : "T",
"TreeColor" : "rgb(50,153,50)",
"Wall" : "#",
"WallColor" : "rgb(153,153,153)",
"Water_1" : "-",
"Water_1Color" : "rgb(50,50,150)",
"Water_2" : ">",
"Water_2Color" : "rgb(50,50,250)",
"Fire_1" : "w",
"Fire_1Color" : "rgb(150,50,50)",
"Fire_2" : "W",
"Fire_2Color" : "rgb(250,50,50)",
"Unknow" : "/",
"UnknowColor" :  "rgb(255,255,255)",
"Stair" : ">",
}




function TileSet(file)
{
	this.image = new Image();
	this.image.reference = this;
	this.image.onload = function() 
	{
		if(!this.complete) 
			throw new Error("Erreur de chargement du tileset nommé \"" + url + "\".");
	}
	this.image.src = "graphics/" + file;
}


/**
 * This method draws the specified tile on the screen.
 */
TileSet.prototype.draw=function(index,x,y)
{
	surface.drawImage(this.image,index*32, 0, 32, 32,x, y, 32, 32);	
}
