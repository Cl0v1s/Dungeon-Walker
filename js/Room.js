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



function Room(x,y)
{
	biomeTemp=Math.floor(Math.random()*13)+1;
	if(biomeTemp>=1 && biomeTemp<=3)
	{
		this.biome="plain";
		this.tile=PlainTile;
	}
	else if(biomeTemp>=10 && biomeTemp<=13)
	{
		this.biome="cave";
	}
	else
	{
		this.biome="dungeon";
		this.tile=DungeonTile;
	}

	this.x=x;
	this.y=y;
	this.width=0;
	this.height=0;
	this.connected=false;
	this.spawn=false;
	this.monsters=new Array();
	while(this.width<5)
	{
		this.width=Math.floor(Math.random()*21+1);
	}
	while(this.height<5)
	{
		this.height=Math.floor(Math.random()*16+1);
	}
	this.map=new Array();
	for(p=0;p<this.width;p++)
	{
		this.map[p]=new Array();
		for(q=0;q<this.height;q++)
		{
				this.map[p][q]=1;
		}
	}
	this.generateWalls();	
}

/**
 * This method puts the walls numbers in the Room's grid
 */
Room.prototype.generateWalls=function()
{
	for(p=0;p<this.width;p++)
	{
			this.map[p][0]=2;
			this.map[p][this.height-1]=2;
	}
	
	for(q=0;q<this.height;q++)
	{
			this.map[0][q]=2;
			this.map[this.width-1][q]=2;
	}
}

/**
 * this method returns the room's x position.
 * Used to place the room's map into the Dungeon Map.
 */
Room.prototype.getX=function()
{
		return this.x;
}

/**
 * this method returns the room's y position.
 * Used to place the room's map into the Dungeon Map.
 */
Room.prototype.getY=function()
{
		return this.y;
}

/**
 * this method returns the room's width.
 * Used to place the room's map into the Dungeon Map.
 */
Room.prototype.getWidth=function()
{
		return this.width;
}

/**
 * this method returns the room's width.
 * Used to place the room's map into the Dungeon Map.
 */
Room.prototype.getHeight=function()
{
		return this.height;
}


/**
 * Returns the biome of the room
 */
Room.prototype.getBiome=function()
{
	return this.biome;
}

/**
 * this method returns the room's map.
 */
Room.prototype.getMap=function()
{
		return this.map;
}

/**
 * Returns if the room id connected to the other rooms or not
 */
Room.prototype.isConnected=function()
{
		return this.connected;
}

/**
 * Sets the map connected
 */
Room.prototype.setConnected=function(value)
{
	this.connected=value;
}

/**
 * Sets the specified cell value to the sent value
 */
Room.prototype.setCell=function(x,y,value)
{
	this.map[x][y]=value;
}

/**
 * Move the rom to the specified position
 */
Room.prototype.setPos=function(xTemp,yTemp)
{
	this.x=xTemp;
	this.y=yTemp;
}


/**
 * returns the coordinate of the spawn point, if doesn't exists, return false
 */
Room.prototype.getSpawn=function()
{
	return this.spawn;
}

/**
 * Create the spawn point
 */
Room.prototype.setSpawn=function()
{
	xTemp=1;
	yTemp=1;
	while(xTemp==1 || yTemp==1 || this.map[xTemp][yTemp]!=1)
	{
		xTemp=Math.floor(Math.random()*(this.width-1))+1;
		yTemp=Math.floor(Math.random()*(this.height-1))+1;
	}
	this.spawn=[xTemp,yTemp];
	return [xTemp,yTemp];
}

/**
 * Place a stair in the room
 */
Room.prototype.placeStair=function()
{
	xTemp=0;
	yTemp=0;
	while(xTemp==0 || yTemp==0 || this.map[xTemp][yTemp]!=1)
	{
		xTemp=Math.floor(Math.random()*(this.width-1))+1;
		yTemp=Math.floor(Math.random()*(this.height-1))+1;
	}
	this.setCell(xTemp,yTemp,"stair");
	return [xTemp,yTemp];
}



