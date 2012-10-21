function Client()
{
	this.player=undefined;
	this.dungeon=undefined;
	this.turn=0;
	this.dayInterval=1440/2;
	this.time="Day";
	this.xPos=0;
	this.yPos=0;
	this.canvasPlaced=false;
	this.spellListen=false;
	this.spellListenChar="";
	this.animationFrame=0;


}

/**
 * Searchs the stair's spawnpoint and places the player at it's coordiantes
 */
Client.prototype.start=function(par1)
{
		this.player=par1;
		x=this.dungeon.stairs[0].getSpawnPoint()[0]+this.dungeon.stairs[0].getSpawnPoint()[2].getX();
		y=this.dungeon.stairs[0].getSpawnPoint()[1]+this.dungeon.stairs[0].getSpawnPoint()[2].getY();
		this.player.setX(x);
		this.player.setY(y);
		this.dungeon.stairs[0].addEntityToList(this.player);
}

/**
 * Returns the canvas's x pos
 */
Client.prototype.getXPos=function()
{
		return this.xPos;
}

/**
 * Returns the canva's y pos
 */
Client.prototype.getYPos=function()
{
		return this.yPos;
}

/**
 * Sets the canvas's x pos
 */
Client.prototype.setXPos=function(value)
{
	this.xPos=value;
}

/**
 * Sets the canvas's y pos
 */
Client.prototype.setYPos=function(value)
{
	this.yPos=value;
}

/**
 * Replaces the canvas to it's origin
 */
Client.prototype.resetCanvas=function()
{
		this.xPos=0;
		this.yPos=0;
		this.canvasPlaced=false;
}

/**
 * Creates a new dungeon.
 */
Client.prototype.generateDungeon=function()
{
	this.dungeon=new Dungeon();
	this.dungeon.stairs[0].generateMonsters();
	return this.dungeon.stairs[0];
}


/**
 * Shows a loading message until the camera is not locked over the player
 */
Client.prototype.loading=function()
{
		if(typeof r=="undefined")
		{

			r=50;
			v=50;
			b=50;
			ratio=5;
		}
		surface.font = "100px pixel";
		surface.fillStyle = "rgb("+r+","+v+","+b+")";
		surface.fillText("Loading...",document.getElementById('canvas').width/2-300/2,document.getElementById('canvas').height/2-100/2);
		r+=ratio;
		v+=ratio;
		b+=ratio;

		if(r>255)
		{
			ratio=-5;
		}
		if(r<50)
		{
			ratio=5;
		}
}


/**
 * Updates the Client's stats
 */
Client.prototype.update=function()
{
	if(!(Parameters.isTiled()))
		clean();
	else
	{
		surface.fillStyle="rgb(167,186,74)";
		surface.fillRect (0, 0,document.getElementById('canvas').width,document.getElementById('canvas').height);
	}
	if(!this.canvasPlaced)
		this.moveCanvas();
	else
		this.inputUpdate();
		
	if(!this.canvasPlaced)
		this.loading();
	else
	{
		this.drawEnvironement();
		this.player.draw();
	}

}

/**
 * Updates the Client's input
 */
Client.prototype.inputUpdate=function()
{	

	if(!this.spellListen)
	{
		if(!Input.equals(0) && LastKey != 13)
		{
			this.newTurn();
		}
			
		if(Input.equals(39))
		{
			this.player.move("right");
		}

		if(Input.equals(40))
		{
			this.player.move("down");		
		}
			
		if(Input.equals(37))
		{
			this.player.move("left");
		}
			
		if(Input.equals(38))
		{
			this.player.move("up");
		}
		
		if(Input.equals(80))
			Scene=RecipeGUI;
			
		if(Input.equals(76))
			this.player.lap();
			
		if(Input.equals(73))
			this.player.openInventory();
			
		if(Input.equals(69))
			this.player.openEquipement();
			
		if(Input.equals(13))
			this.player.interact();
			
		if(Input.equals(83))
			this.player.rest();
			
		if(Input.equals(27))
			this.player.reset();
			
		if(Input.equals(17))
			this.resetCanvas();
			
		if(Input.equals(77))
		{
			this.spellListen=true;
			this.player.sendMessage("Vous penetrez au plus profond de votre conscience et parvenez a atteindre le monde des esprits.");	
		}
	}
	else if(!Input.equals(0))
	{
		if(Input.equals(27))
		{
				this.spellListenChar="";
				this.spellListen=false;		
				this.player.sendMessage("Vous reprenez vos esprits et revenez a la realite.");	
				return;
		}
		if(String.fromCharCode(Input.getLastKey()) != this.spellListenChar.charAt(this.spellListenChar.length-1))
			this.spellListenChar=this.spellListenChar+String.fromCharCode(Input.getLastKey());
		else
			return;
			
		for(h=0;h<SpellList.length;h++)
		{
			if(SpellList[h].getName()==this.spellListenChar)
			{
				this.player.callSpell(SpellList[h]);
				this.spellListenChar="";
				this.spellListen=false;
				this.player.sendMessage("Vous appelez le sort des arcanes "+SpellList[h].getName()+".");
			}
		}
		
		
	}
		

}

Client.prototype.newTurn=function()
{	
	this.turn+=1;

	if(this.turn>=this.dayInterval)
	{
		if(this.time=="Day")
		{
			player.sendMessage("La temperature diminue peu a peu, il semblerait que le soleil se couche...");
			this.time="Night";
		}
		else
		{
			player.sendMessage("La temperature monte legerement, il fait probablement jour dehors...");
			this.time="Day";
		}
		this.dayInterval+=this.turn;
	}
	this.player.getStair().moveMonsters();
}


/**
 * This method places the client's camera on the player 
 */
Client.prototype.moveCanvas=function()
{
	objX=this.player.getX()*32;
	objY=this.player.getY()*32;
	canvasWidth=document.getElementById('canvas').width;
	canvasHeight=document.getElementById('canvas').height;
	if(!(this.xPos+canvasWidth/2>=objX && this.xPos+canvasWidth/2<=objX+canvasWidth) || !(this.yPos+canvasHeight/2>=objY && this.yPos+canvasHeight/2<=objY+canvasHeight))
	{
			this.xPos=this.xPos*-1;
			this.yPos=this.yPos*-1;
			if(this.xPos+canvasWidth/2<objX)
			{
				this.xPos=this.xPos+32;
			}
			if(this.xPos+canvasWidth/2>objX)
			{
				this.xPos=this.xPos-32;
			}
			if(this.yPos+canvasHeight/2<objY)
			{
				this.yPos=this.yPos+32;
			}
			if(this.xPos+canvasHeight/2>objY)
			{
				this.yPos=this.yPos-32;
			}
			if(Math.abs(this.xPos+canvasWidth/2-objX)<=32 && Math.abs(this.yPos+canvasHeight/2-objY)<=32)
				this.canvasPlaced=true;
			
				
			this.xPos=this.xPos*-1;
			this.yPos=this.yPos*-1;
	}
}

/**
 * This method draws the player's environnement 
 */
Client.prototype.drawEnvironement=function()
{
	surface.font = "32px pixel";
	this.animationFrame+=1;
	if(!(Parameters.isTiled()))
		this.drawNoTiles();
	else
		this.drawTiles();
}


/**
 * This method draws the player's environement without tiles
 */
Client.prototype.drawTiles=function()
{
	for(o=0;o<88;o++)
	{
		if(o<Math.floor((Client.getXPos())/32)-10)
				continue;
				
		for(p=0;p<48;p++)
		{				
			if(p<Math.floor((Client.getYPos())/32)-10)
				continue;
				
				if(this.player.getStair().getRoomAt(o,p)!=false)
				{
							if(this.player.getStair().getRoomAt(o,p).getBiome()=="plain")
							{
								if(this.player.getStair().map[o][p]==1)
									TileSet.draw(12,Client.getXPos()+o*32, Client.getYPos()+p*32);
								else if(this.player.getStair().map[o][p]==5)
									TileSet.draw(7,Client.getXPos()+o*32, Client.getYPos()+p*32);
							}
							else if(this.player.getStair().getRoomAt(o,p).getBiome()=="dungeon")
							{
								if(this.player.getStair().map[o][p]==1)
										TileSet.draw(0,Client.getXPos()+o*32, Client.getYPos()+p*32);
								else if(this.player.getStair().map[o][p]==5)
									TileSet.draw(13,Client.getXPos()+o*32, Client.getYPos()+p*32);
								else if(this.player.getStair().map[o][p] instanceof Chest)
									TileSet.draw(6,Client.getXPos()+o*32, Client.getYPos()+p*32);
							}
							else if(this.player.getStair().getRoomAt(o,p).getBiome()=="cave")
							{
								if(this.player.getStair().map[o][p]==1)
									TileSet.draw(3,Client.getXPos()+o*32, Client.getYPos()+p*32);
								else if(this.player.getStair().map[o][p]==5)
									TileSet.draw(16,Client.getXPos()+o*32, Client.getYPos()+p*32);
								else if(this.player.getStair().map[o][p]==6)
									this.drawLava(o,p);
							}
				}
				else 
				{
									if(this.player.getStair().map[o][p]==1)
										TileSet.draw(0,Client.getXPos()+o*32, Client.getYPos()+p*32);
				}
				if(this.player.getStair().map[o][p]==2)
								TileSet.draw(2,Client.getXPos()+o*32, Client.getYPos()+p*32);
				else if(this.player.getStair().map[o][p]=="stair")
								surface.fillText(DungeonTile.Stair,Client.getXPos()+o*32, Client.getYPos()+p*32);
				else if(this.player.getStair().map[o][p]>=10)
								surface.fillText("$",Client.getXPos()+o*32, Client.getYPos()+p*32);
				else if(this.player.getStair().map[o][p]==3)
							this.drawWater(o,p);
				else if(this.player.getStair().map[o][p]==4)
							this.drawFire(o,p);	
							
				this.drawShadow(o,p);			
							
				
		}
	}
		for(p=0;p<this.player.getStair().monsters.length;p++)
		{
				intancity=1;
				if(this.player.getStair().monsters[p] != undefined)
				{
					this.player.getStair().monsters[p].draw(intancity);
				}
		}
}



/**
 * This method draws the player's environement without tiles
 */
Client.prototype.drawNoTiles=function(side,originX,originY)
{				
	for(o=0;o<88;o++)
	{
		for(p=0;p<48;p++)
		{
			
				if(this.player.getStair().getRoomAt(o,p)!=false)
				{
							if(this.player.getStair().getRoomAt(o,p).getBiome()=="plain")
							{
								if(this.player.getStair().map[o][p]==1)
									surface.fillStyle = PlainTile.GroundColor;
								else if(this.player.getStair().map[o][p]==5)
									surface.fillStyle = PlainTile.TreeColor;
							}
							else if(this.player.getStair().getRoomAt(o,p).getBiome()=="dungeon")
							{
								if(this.player.getStair().map[o][p]==1)
									surface.fillStyle = DungeonTile.WallColor;
								else if(this.player.getStair().map[o][p]==5)
									surface.fillStyle = DungeonTile.StoneColor;
								else if(this.player.getStair().map[o][p] instanceof Chest)
									surface.fillStyle = DungeonTile.ChestColor;
							}
							else if(this.player.getStair().getRoomAt(o,p).getBiome()=="cave")
							{
								if(this.player.getStair().map[o][p]==1)
									surface.fillStyle = CaveTile.GroundColor;
								else if(this.player.getStair().map[o][p]==5)
									surface.fillStyle = CaveTile.StoneColor;
							}
				}
				else
				{
					if(this.player.getStair().map[o][p]==1)
						surface.fillStyle = DungeonTile.WallColor;	
				}
				
				if(this.player.getStair().map[o][p]==2 || this.player.getStair().map[o][p]=="stair")
							surface.fillStyle = DungeonTile.WallColor;
				else if(this.player.getStair().map[o][p]==3)
							surface.fillStyle = DungeonTile.Water_1Color;
				else if(this.player.getStair().map[o][p]>=10)
							surface.fillStyle="rgb(248,214,0)";
							
				this.drawShadow(o,p)
		
						
				if(this.player.getStair().getRoomAt(o,p)!=false)
				{
							if(this.player.getStair().getRoomAt(o,p).getBiome()=="plain")
							{
								if(this.player.getStair().map[o][p]==1)
									surface.fillText(PlainTile.Ground,Client.getXPos()+o*32, Client.getYPos()+p*32);
								else if(this.player.getStair().map[o][p]==5)
									surface.fillText(PlainTile.Tree,Client.getXPos()+o*32, Client.getYPos()+p*32);
							}
							else if(this.player.getStair().getRoomAt(o,p).getBiome()=="dungeon")
							{
								if(this.player.getStair().map[o][p]==1)
										surface.fillText(DungeonTile.Ground,Client.getXPos()+o*32, Client.getYPos()+p*32);
								else if(this.player.getStair().map[o][p]==5)
									surface.fillText(DungeonTile.Stone,Client.getXPos()+o*32, Client.getYPos()+p*32);
								else if(this.player.getStair().map[o][p] instanceof Chest)
									surface.fillText(DungeonTile.Chest,Client.getXPos()+o*32, Client.getYPos()+p*32);
							}
							else if(this.player.getStair().getRoomAt(o,p).getBiome()=="cave")
							{
								if(this.player.getStair().map[o][p]==1)
									surface.fillText(CaveTile.Ground,Client.getXPos()+o*32, Client.getYPos()+p*32);
								else if(this.player.getStair().map[o][p]==5)
									surface.fillText(CaveTile.Stone,Client.getXPos()+o*32, Client.getYPos()+p*32);
								else if(this.player.getStair().map[o][p]==6)
									this.drawLava(o,p);
							}
				}
				else 
				{
									if(this.player.getStair().map[o][p]==1)
										surface.fillText(DungeonTile.Ground,Client.getXPos()+o*32, Client.getYPos()+p*32);
				}
				if(this.player.getStair().map[o][p]==2)
								surface.fillText(DungeonTile.Wall,Client.getXPos()+o*32, Client.getYPos()+p*32);
				else if(this.player.getStair().map[o][p]=="stair")
								surface.fillText(DungeonTile.Stair,Client.getXPos()+o*32, Client.getYPos()+p*32);
				else if(this.player.getStair().map[o][p]>=10)
								surface.fillText("$",Client.getXPos()+o*32, Client.getYPos()+p*32);
				else if(this.player.getStair().map[o][p]==3)
							this.drawWater(o,p);
				else if(this.player.getStair().map[o][p]==4)
							this.drawFire(o,p);
				
		}
	}
		for(p=0;p<this.player.getStair().monsters.length;p++)
		{
				intancity=1;
				if(this.player.getStair().monsters[p] != undefined)
				{
					if(this.player.getStair().monsters[p].getX()<originX || this.player.getStair().monsters[p].getX()>originX+side || this.player.getStair().monsters[p].getY()<originY || this.player.getStair().monsters[p].getY()>originY+side)
					{
						xDistance=Math.abs(this.player.getStair().monsters[p].getX()-originX);
						yDistance=Math.abs(this.player.getStair().monsters[p].getY()-originY);
						distance=xDistance*xDistance+yDistance*yDistance;
						distance=Math.sqrt(distance);
						intancity=1/distance;
					}
					this.player.getStair().monsters[p].draw(intancity);
				}
		}
}


/**
 * This method draw draws and animates the water on the screen
 */
Client.prototype.drawWater=function(xTemp,yTemp)
{
	if(this.animationFrame<=10)
	{
		if(!(Parameters.isTiled()))
			surface.fillText(DungeonTile.Water_1,this.getXPos()+xTemp*32, this.getYPos()+yTemp*32);
		else
			TileSet.draw(4,this.getXPos()+xTemp*32, this.getYPos()+yTemp*32);
		
	}
	else if(this.animationFrame>10 && this.animationFrame<=20)
	{
		if(!(Parameters.isTiled()))
			surface.fillText(DungeonTile.Water_2,this.getXPos()+xTemp*32, this.getYPos()+yTemp*32);
		else
			TileSet.draw(5,this.getXPos()+xTemp*32, this.getYPos()+yTemp*32);
	}
	else
	{
			this.animationFrame=0;
		if(!(Parameters.isTiled()))
			surface.fillText(DungeonTile.Water_1,this.getXPos()+xTemp*32, this.getYPos()+yTemp*32);
		else
			TileSet.draw(4,this.getXPos()+xTemp*32, this.getYPos()+yTemp*32);
	}	
}

/**
 * This method draw draws and animates the lava on the screen
 */
Client.prototype.drawLava=function(xTemp,yTemp)
{
	if(this.animationFrame<=15)
	{
		surface.fillStyle = CaveTile.Lava_1Color;
		if(!(Parameters.isTiled()))
			surface.fillText(CaveTile.Lava_1,this.getXPos()+xTemp*32, this.getYPos()+yTemp*32);
		else
			TileSet.draw(10,this.getXPos()+xTemp*32, this.getYPos()+yTemp*32);
	}
	else if(this.animationFrame>15 && this.animationFrame<=30)
	{
		surface.fillStyle = CaveTile.Lava_2Color;
		if(!(Parameters.isTiled()))
			surface.fillText(CaveTile.Lava_2,this.getXPos()+xTemp*32, this.getYPos()+yTemp*32);
		else
			TileSet.draw(11,this.getXPos()+xTemp*32, this.getYPos()+yTemp*32);
	}
	else
	{
			surface.fillStyle = CaveTile.Lava_1Color;
		if(!(Parameters.isTiled()))
			surface.fillText(CaveTile.Lava_1,this.getXPos()+xTemp*32, this.getYPos()+yTemp*32);
		else
			TileSet.draw(10,this.getXPos()+xTemp*32, this.getYPos()+yTemp*32);
	}	
}



/**
 * This method draws and animates the fire on the screen.
 */
Client.prototype.drawFire=function(xTemp,yTemp)
{

	this.player.stair.actualizeFire(xTemp,yTemp);

	
	if(this.animationFrame<=5)
	{
		surface.fillStyle = DungeonTile.Fire_1Color;
		if(!(Parameters.isTiled()))
			surface.fillText(DungeonTile.Fire_1,this.getXPos()+xTemp*32, this.getYPos()+yTemp*32);
		else
			TileSet.draw(8,this.getXPos()+xTemp*32, this.getYPos()+yTemp*32);
		
	}
	else if(this.animationFrame>10 && this.animationFrame<=20)
	{
		surface.fillStyle = DungeonTile.Fire_2Color;
		if(!(Parameters.isTiled()))
			surface.fillText(DungeonTile.Fire_2,this.getXPos()+xTemp*32, this.getYPos()+yTemp*32);
		else
			TileSet.draw(9,this.getXPos()+xTemp*32, this.getYPos()+yTemp*32);
	}
	else
	{
			this.animationFrame=0;
			surface.fillStyle = DungeonTile.Fire_1Color;
		if(!(Parameters.isTiled()))
			surface.fillText(DungeonTile.Fire_1,this.getXPos()+xTemp*32, this.getYPos()+yTemp*32);
		else
			TileSet.draw(8,this.getXPos()+xTemp*32, this.getYPos()+yTemp*32);
		
	}
	
}

/**
 * This method draw the shadows on the screen
 */
Client.prototype.drawShadow=function(xTemp,yTemp)
{		
	flag=true;
	for(l=0;l<this.player.getStair().lightList.length;l++)
	{
		if(this.player.getStair().lightList[l] != undefined)
		{
			if(this.player.getStair().lightList[l].isVisible(xTemp,yTemp))
				flag=false;
		}
	}
	
	if(!this.player.isVisible(xTemp,yTemp) && flag && Parameters.isTiled())
			TileSet.draw(1,this.getXPos()+xTemp*32, this.getYPos()+yTemp*32);	
	else if(!this.player.isVisible(xTemp,yTemp) && flag && !Parameters.isTiled())
			surface.fillStyle="rgb("+10+","+10+","+10+")";
		
}


/**
 * Return the tileset's index of the specified real index
 */
Client.prototype.traduceInTileIndex=function(indexTemp,stairTemp,o,p)
{
				if(stairTemp.getRoomAt(o,p)!=false)
				{
							if(stairTemp.getRoomAt(o,p).getBiome()=="plain")
							{
								if(indexTemp==1)
									return 12;
								else if(indexTemp==5)
									return 7;
							}
							else if(stairTemp.getRoomAt(o,p).getBiome()=="dungeon")
							{
								if(indexTemp==1)
										return 0;
								else if(indexTemp==5)
									return 13;
							}
							else if(stairTemp.getRoomAt(o,p).getBiome()=="cave")
							{
								if(indexTemp==1)
								{
									return 3;
								}
								else if(indexTemp==5)
								{
									//Null
								}

							}
				}
				else 
				{
									if(indexTemp==1)
										return 0;
				}
				if(indexTemp==2)
								return 2;
				else if(indexTemp=="stair")
				{
								//NULL
				}
				else if(indexTemp>=10)
				{
								//NULL
				}
				else if(indexTemp==3)
							return 4;
				else if(indexTemp==4)
							return 8;
				else if(indexTemp instanceof Chest)
							return 6;
				else if(indexTemp==6)
							return 10;
							
}









