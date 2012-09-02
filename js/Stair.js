function Stair()
{
	this.map=new Array();
	for(i=0;i<88;i++)
	{
		this.map[i]=new Array();
		for(u=0;u<48;u++)
		{
			this.map[i][u]=0;
		}
	}
	this.light=Math.floor(Math.random()*4)+5;
	this.animationFrame=0;
	this.fireNumber=1;
	this.spawnPoint=null;
	this.rooms=new Array();
	this.monsters=new Array();
	this.roomsNumber=0;
	while(this.roomsNumber<3)
		this.roomsNumber=Math.round(Math.random()*8+1);
	this.generateRooms();
	this.generateCorridor(this.rooms[0],this.rooms[1]);
	flagCorridor=false;
	for(q=0;q<this.rooms.length;q++)
	{
		if(this.rooms[q].isConnected())
		{
			for(s=0;s<this.rooms.length;s++)
			{
				if(s != q && !this.rooms[s].isConnected())
				{
					this.generateCorridor(this.rooms[q],this.rooms[s]);	
					flagCorridor=true;					
					break;
				}
			}
			if(flagCorridor)
				continue;
		}
	}
	this.generateLiquid();
	this.generateObstacles();
	this.generateChest();
	this.placeStairAndPlayer();
}

/**
 * this method puts monsters into the rooms
 */
Stair.prototype.generateMonsters=function()
{
	nb=this.rooms.length*Math.floor(Math.random()*Motor.dungeon.getCurrentStairId())+20;
	for(n=0;n<nb;n++)
	{
		xTemp=0;
		yTemp=0;
		while(this.getRoomAt(xTemp,yTemp)==false || this.map[xTemp][yTemp] !=1)
		{
			xTemp=Math.floor(Math.random()*88)+1;
			yTemp=Math.floor(Math.random()*48)+1;
		}
		id=-1;
		attempt=0;
		while(id==-1 || MonsterList[id].biome != this.getRoomAt(xTemp,yTemp).getBiome())
		{
			attempt+=1;
			
			id=Math.floor(Math.random()*Motor.dungeon.getCurrentStairId());
			if(attempt>=50)
				break;
		}
		if(attempt>=50)
		{
			this.monsters[n]=undefined;
			continue;
		}
		this.monsters[n]=new Monster(this,xTemp,yTemp,MonsterList[id]);
	}
}

/**
 * Adds a new entity to the monsters list
 */
Stair.prototype.addEntityToList=function(entity)
{
	this.monsters.push(entity);
}

/**
 * This method move the geneated Monsters of the room.
 * If the player is on collid with the Monster, the game begin a fight.
 */
Stair.prototype.moveMonsters=function()
{
	for(n=0;n<this.monsters.length;n++)
	{
			if(this.monsters[n] !=undefined && this.monsters[n] instanceof Monster)
			{
				if(this.monsters[n].isDead())
				{
					this.monsters[n]=undefined;
					continue;
				}
				this.monsters[n].think();
			}
	}
}

/**
 * This method manages the fights
 */
Stair.prototype.fight=function(fighter1,fighter2)
{
	fighter1_total=0;
	fighter2_total=0;
	for(i=0;i<6;i++)
	{
		lancer=Math.random()*6+1;
		lancer=Math.floor(lancer);
		fighter1_total=fighter1_total+lancer;
		lancer=Math.random()*6+1;
		lancer=Math.floor(lancer);
		fighter2_total=fighter2_total+lancer;
	}
	if(fighter1_total>=fighter2_total)
	{
		prio=fighter1;
		dmg1=fighter1.turn(fighter2);
		sec=fighter2;
		dmg2=fighter2.turn(fighter1);
	}
	else
	{
		prio=fighter2;
		dmg1=fighter2.turn(fighter2);
		sec=fighter1;
		dmg2=fighter1.turn(fighter1);
	}


	rand=Math.floor((Math.random()*2)+1);
	Motor.messages.changeMode("battle");
	switch(rand)
	{
		case 1:
		sentence=prio.name+" tente un engagement contre "+sec.name+" et lui inflige "+dmg1+" degats,";
		sentence2= sec.name+" contre-attaque en infligeant "+dmg2+" degats a son adversaire.";
		break;
		case 2:
		sentence=prio.name+" s'elance sur "+sec.name+" et le blesse en lui infligeant "+dmg1+" degats.";
		sentence2="Malheureusement pour son adversaire, "+sec.name+" pare et "+prio.name+" perd "+dmg2+" points de vie.";
		break;



	}

	Motor.messages.add(sentence);
	Motor.messages.add(sentence2);


	if(fighter1.life<=0)
	{
		Motor.messages.add(fighter2.name+" a vaincu "+fighter1.name+".");
		Motor.messages.changeMode("normal");
		return true;
	}

	if(fighter2.life<=0)
	{
		Motor.dungeon.getCurrentStair().map[fighter2.x][fighter2.y]=1;
		Motor.messages.add(fighter1.name+" a vaincu "+fighter2.name+".");
		Motor.messages.changeMode("normal");
		return false;
	}	
}


/**
 * This method initalizes the rooms and places they in the Stair's map grid.
 */
Stair.prototype.generateRooms=function()
{
		for(i=0;i<this.roomsNumber-1;i++)
		{
				canPlaced=false;
				flag=true;
				attempt=0;
				while(!canPlaced)
				{
					if(attempt>10)
					{
						i=i-1;
						break;
					}
					roomX=Math.floor(Math.random()*67);
					roomY=Math.floor(Math.random()*26);
					
					for(n=0;n<this.rooms.length-1;n++)
					{
							if(roomX>=this.rooms[n].getX() && roomX<=this.rooms[n].getX()+this.rooms[n].getWidth() && roomY>=this.rooms[n].getY() && roomY<=this.rooms[n].getY()+this.rooms[n].getHeight())
							{
								flag=false;
							}
					}
					if(flag==true)
						canPlaced=true;
						
					attempt=attempt+1;
				}
				this.rooms[i]=new Room(roomX,roomY);
				roomMap=this.rooms[i].getMap();
				for(m=0;m<roomMap.length;m++)
				{
					for(o=0;o<roomMap[m].length;o++)
					{
						this.map[roomX+m][roomY+o]=roomMap[m][o];
					}
				}
		}
}

/**
 * Returns the room who contains the specified position
 */
Stair.prototype.getRoomAt=function(xTemp,yTemp)
{
		for(q=0;q<this.rooms.length;q++)
		{
			if(xTemp>=this.rooms[q].getX() && xTemp<=this.rooms[q].getX()+this.rooms[q].getWidth() && yTemp>=this.rooms[q].getY() && yTemp<=this.rooms[q].getY()+this.rooms[q].getHeight())
				return this.rooms[q];
		}
			return false;
}


/**
 * This method adds some trees on the map in the plain biomes
 */
Stair.prototype.generateObstacles=function()
{
		for(i=0;i<88;i++)
		{
				for(u=0;u<48;u++)
				{
					roomTemp=this.getRoomAt(i,u);
					if(roomTemp != false)
					{
						if(roomTemp.getBiome()=="plain")
						{
							rand=Math.floor(Math.random()*50);
							if(rand==1)
							{
									xTemp=Math.floor(Math.random()*(roomTemp.getWidth()-2))+2;
									yTemp=Math.floor(Math.random()*(roomTemp.getHeight()-2))+2;
									tentatives=0;
									while(this.map[roomTemp.getX()+xTemp][roomTemp.getY()+yTemp] != 1 && tentatives < 50)
									{
										tentatives+=1;
										xTemp=Math.floor(Math.random()*(roomTemp.getWidth()-2))+2;
										yTemp=Math.floor(Math.random()*(roomTemp.getHeight()-2))+2;									
									}
									if(tentatives>=50)
										continue;
										
									tentative=0;
									while((this.map[roomTemp.getX()+xTemp-1][roomTemp.getY()+yTemp] != 1 || this.map[roomTemp.getX()+xTemp+1][roomTemp.getY()+yTemp] != 1 || this.map[roomTemp.getX()+xTemp][roomTemp.getY()+yTemp+1] != 1 || this.map[roomTemp.getX()+xTemp][roomTemp.getY()+yTemp-1] != 1) && tentative<50)
									{
										tentatives+=1;
										xTemp=Math.floor(Math.random()*(roomTemp.getWidth()-2))+2;
										yTemp=Math.floor(Math.random()*(roomTemp.getHeight()-2))+2;
									}
									if(tentatives>=50)
										continue;
									this.map[roomTemp.getX()+xTemp][roomTemp.getY()+yTemp]=5;
							}
						}
						else if(roomTemp.getBiome()=="dungeon")
						{
							rand=Math.floor(Math.random()*70);
							if(rand==1)
							{
									xTemp=Math.floor(Math.random()*(roomTemp.getWidth()-2))+2;
									yTemp=Math.floor(Math.random()*(roomTemp.getHeight()-2))+2;
									tentatives=0;
									while(this.map[roomTemp.getX()+xTemp][roomTemp.getY()+yTemp] != 1 && tentatives < 50)
									{
										tentatives+=1;
										xTemp=Math.floor(Math.random()*(roomTemp.getWidth()-2))+2;
										yTemp=Math.floor(Math.random()*(roomTemp.getHeight()-2))+2;									
									}
									if(tentatives>=50)
										continue;
									tentative=0;
									while((this.map[roomTemp.getX()+xTemp-1][roomTemp.getY()+yTemp] == 2 || this.map[roomTemp.getX()+xTemp+1][roomTemp.getY()+yTemp] == 2 || this.map[roomTemp.getX()+xTemp][roomTemp.getY()+yTemp+1] == 2 || this.map[roomTemp.getX()+xTemp][roomTemp.getY()+yTemp-1] == 2) && tentative<50)
									{
										tentatives+=1;
										xTemp=Math.floor(Math.random()*(roomTemp.getWidth()-2))+2;
										yTemp=Math.floor(Math.random()*(roomTemp.getHeight()-2))+2;
									}
									if(tentatives>=50)
										continue;
									this.map[roomTemp.getX()+xTemp][roomTemp.getY()+yTemp]=5;
							}
						}
						else if(roomTemp.getBiome()=="cave")
						{
							rand=Math.floor(Math.random()*40);
							if(rand==1)
							{
									xTemp=Math.floor(Math.random()*(roomTemp.getWidth()-2))+2;
									yTemp=Math.floor(Math.random()*(roomTemp.getHeight()-2))+2;
									tentatives=0;
									while(this.map[roomTemp.getX()+xTemp][roomTemp.getY()+yTemp] != 1 && tentatives < 50)
									{
										tentatives+=1;
										xTemp=Math.floor(Math.random()*(roomTemp.getWidth()-2))+2;
										yTemp=Math.floor(Math.random()*(roomTemp.getHeight()-2))+2;									
									}
									if(tentatives>=50)
										continue;
									tentative=0;
									while((this.map[roomTemp.getX()+xTemp-1][roomTemp.getY()+yTemp] == 2 || this.map[roomTemp.getX()+xTemp+1][roomTemp.getY()+yTemp] == 2 || this.map[roomTemp.getX()+xTemp][roomTemp.getY()+yTemp+1] == 2 || this.map[roomTemp.getX()+xTemp][roomTemp.getY()+yTemp-1] == 2) && tentative<50)
									{
										tentatives+=1;
										xTemp=Math.floor(Math.random()*(roomTemp.getWidth()-2))+2;
										yTemp=Math.floor(Math.random()*(roomTemp.getHeight()-2))+2;
									}
									if(tentatives>=50)
										continue;
									this.map[roomTemp.getX()+xTemp][roomTemp.getY()+yTemp]=5;
							}
						}
					}
				}
		}
	
}

/**
 * This method places near one chest per stair.
 */
Stair.prototype.generateChest=function()
{
	for(i=0;i<88;i++)
	{
		for(u=0;u<48;u++)
		{
				roomTemp=this.getRoomAt(i,u);
				if(roomTemp != false)
				{
					if(roomTemp.getBiome()=="dungeon")
					{
						rand=Math.floor(Math.random()*100)+1;
						if(rand==1 && this.map[i][u]==1)
						{
							if(this.map[i-1][u]==2 || this.map[i+1][u]==2 || this.map[i][u-1]==2 || this.map[i][u+1]==2)
							{
								this.map[i][u]=new Chest();
							}
							
						}
						
					}
				}
		}
	}	
}

/**
 * This method adds water or lava tiles on the map using a layer algorythm.
 */
Stair.prototype.generateLiquid=function()
{
	value=3;
	for(i=0;i<88;i++)
	{
		for(u=0;u<48;u++)
		{
			if(this.map[i][u]==1 && this.getRoomAt(i,u) != false)
			{
					if(this.getRoomAt(i,u).getBiome()=="cave")
						value=6
					else
						value=3
						
					flag=Math.floor(Math.random()*this.rooms.length*10)+1;
					if(flag==1)
					{
						this.map[i][u]=value;
					}
			}
		}
	}
	for(n=0;n<5;n++)
	{
		for(i=0;i<88;i++)
		{
			for(u=0;u<48;u++)
			{
				if(this.getRoomAt(i,u) != false)
				{
					if(this.getRoomAt(i,u).getBiome()=="cave")
						value=6
					else
						value=3
				}
				else
					value=3
					
				if(this.map[i][u]==value)
				{
						flag=Math.floor(Math.random()*5)+1;
						switch(flag)
						{
							case 1:
								if(this.map[i][u+1]==1)
									this.map[i][u+1]=value
								break;
							case 2:
								if(this.map[i][u-1]==1)
									this.map[i][u-1]=value
								break;
							case 3:
								if(this.map[i+1][u]==1)
									this.map[i+1][u]=value
								break;
							case 4:
								if(this.map[i-1][u]==1)
									this.map[i-1][u]=value
								break;
						}
				}
			}
		}
	}	
		for(i=0;i<87;i++)
		{
			for(u=0;u<47;u++)
			{
				if(this.getRoomAt(i,u) != false)
				{
					if(this.getRoomAt(i,u).getBiome()=="cave")
						value=6
					else
						value=3
				}
				else
					value=3
					
				//BUG A CORRIGER (RARE) 
				if((this.map[i][u+1]==value && this.map[i][u-1]==value) || (this.map[i+1][u]==value && this.map[i-1][u]==value))
				{
					if(this.map[i][u]==1)
						this.map[i][u]==value
				}
			}
		}	
}

/**
 * This method uses a A* pathfinding method to make corridors between the two specified rooms
 */
Stair.prototype.generateCorridor=function(room1,room2)
{
	room1Side=0;
	room2Side=0;
	
	room1Center=[room1.getX()+Math.floor(room1.getWidth()/2),room1.getY()+Math.floor(room1.getHeight()/2)];
	room2Center=[room2.getX()+Math.floor(room2.getWidth()/2),room2.getY()+Math.floor(room2.getHeight()/2)];
	
	xDifference=Math.abs(room1Center[0]-room2Center[0]);
	yDifference=Math.abs(room1Center[1]-room2Center[1]);
	
	
	if(xDifference>yDifference)
	{
			if(room1Center[0]>=room2Center[0])
			{
				room1Side=2;
				room2Side=4;
			}
			else
			{
				room1Side=4;
				room2Side=2;
			}
	}
	else
	{
			if(room1Center[1]>=room2Center[1])
			{
				room1Side=1;
				room2Side=3;
			}
			else
			{
				room1Side=3;
				room2Side=1;
			}
	}
	

	value=1;
	originX=0;
	originY=0;
	if(room1Side==1 || room1Side==3)
	{
		value=Math.floor(Math.random()*(room1.getWidth()-2)+2);
		if(room1Side==1)
		{
			room1.setCell(value,0,1);	
			originX=room1.getX()+value;
			originY=room1.getY();
		}
		else
		{
			room1.setCell(value,room1.getHeight()-1,1);
			originX=room1.getX()+value;
			originY=room1.getY()+room1.getHeight()-1;
		}
	}
	else
	{
		value=Math.floor(Math.random()*(room1.getHeight()-2)+2);
		if(room1Side==2)
		{
			room1.setCell(0,value,1);	
			originX=room1.getX();
			originY=room1.getY()+value;
		}
		else
		{
			room1.setCell(room1.getWidth()-1,value,1);
			originX=room1.getX()+room1.getWidth()-1;
			originY=room1.getY()+value;
		}
	}
	
	value=1;
	objectiveX=0;
	objectiveY=0;
	if(room2Side==1 || room2Side==3)
	{
		while(value<=0 && value>=getWidth()-1)
		value=Math.floor(Math.random()*(room2.getWidth())+2);
		if(room2Side==1)
		{
			room2.setCell(value,0,1);	
			objectiveX=room2.getX()+value;
			objectiveY=room2.getY();
		}
		else
		{
			room2.setCell(value,room2.getHeight()-1,1);
			objectiveX=room2.getX()+value;
			objectiveY=room2.getY()+room2.getHeight()-1;
		}
	}
	else
	{
		while(value<=0 && value>=getHeight()-1)
		value=Math.floor(Math.random()*(room2.getHeight()-2)+2);
		if(room2Side==2)
		{
			room2.setCell(0,value,1);	
			objectiveX=room2.getX();
			objectiveY=room2.getY()+value;
		}
		else
		{
			room2.setCell(room2.getWidth()-1,value,1);
			objectiveX=room2.getX()+room2.getWidth()-1;
			objectiveY=room2.getY()+value;
		}
	}
	origin=[originX,originY];
	objective=[objectiveX,objectiveY];
	
	path=a_star(origin,objective, this.map, 88, 48);
	for(i=0;i<path.length;i++)
	{
			this.map[path[i].x][path[i].y]=1;
	}
	for(o=0;o<88;o++)
	{
		for(p=0;p<48;p++)
		{
			if(this.map[o][p]==1 && this.map[o+1][p+1]==1)
			{
						this.map[o+1][p]=1;
						
					continue;
			}
			else if(this.map[o][p]==1 && this.map[o-1][p-1]==1)
			{
						this.map[o-1][p]=1;
						
					continue;
			}
			else if(this.map[o][p]==1 && this.map[o+1][p-1]==1)
			{
						this.map[o+1][p]=1;
						
					continue;
			}
			else if(this.map[o][p]==1 && this.map[o-1][p+1]==1)
			{
						this.map[o-1][p]=1;
						
					continue;
			}
		}
	}


	for(o=0;o<88;o++)
	{
		for(p=0;p<48;p++)
		{
			if(this.map[o][p]==1)
			{
					if(this.map[o+1][p] != 1)
						this.map[o+1][p]=2;
						
					if(this.map[o-1][p] != 1)
						this.map[o-1][p]=2;
						
					if(this.map[o][p+1] != 1)
						this.map[o][p+1]=2;
						
					if(this.map[o][p-1] != 1)
						this.map[o][p-1]=2;
			}
		}
	}
	
	
	room1.setConnected(true);
	room2.setConnected(true);

	
}


/**
 * This method reads the entire stair grid call the correct method to draw
 */ 
Stair.prototype.draw=function()
{
	surface.font = "32px pixel";
	tile="";	
	side=Motor.player.getLight()*this.light;
	originX=Math.floor(Motor.player.getX()-side/2);
	originY=Math.floor(Motor.player.getY()-side/2);
	this.animationFrame+=1;
	if(!(Parameters.isTiled()))
		this.drawNoTiles(side,originX,originY);
	else
		this.drawTiles(side,originX,originY);
	
}

/**
 * Draws the map with Graphics tiles (better)
 */
Stair.prototype.drawTiles=function(side,originX,originY)
{
	
}

/**
 * Draws the map without Graphics tiles (faster)
 */
Stair.prototype.drawNoTiles=function(side,originX,originY)
{
	for(o=0;o<88;o++)
	{
		for(p=0;p<48;p++)
		{
			
				if(this.getRoomAt(o,p)!=false)
				{
							if(this.getRoomAt(o,p).getBiome()=="plain")
							{
								if(this.map[o][p]==1)
									surface.fillStyle = PlainTile.GroundColor;
								else if(this.map[o][p]==5)
									surface.fillStyle = PlainTile.TreeColor;
							}
							else if(this.getRoomAt(o,p).getBiome()=="dungeon")
							{
								if(this.map[o][p]==1)
									surface.fillStyle = DungeonTile.WallColor;
								else if(this.map[o][p]==5)
									surface.fillStyle = DungeonTile.StoneColor;
								else if(this.map[o][p] instanceof Chest)
									surface.fillStyle = DungeonTile.ChestColor;
							}
							else if(this.getRoomAt(o,p).getBiome()=="cave")
							{
								if(this.map[o][p]==1)
									surface.fillStyle = CaveTile.GroundColor;
								else if(this.map[o][p]==5)
									surface.fillStyle = CaveTile.StoneColor;
							}
				}
				else
				{
					if(this.map[o][p]==1)
						surface.fillStyle = DungeonTile.WallColor;	
				}
				if(this.map[o][p]==2 || this.map[o][p]=="stair")
							surface.fillStyle = DungeonTile.WallColor;
				else if(this.map[o][p]==3)
							surface.fillStyle = DungeonTile.Water_1Color;
				else if(this.map[o][p]>=10)
							surface.fillStyle="rgb(248,214,0)";
							
				if(this.getRoomAt(o,p) != false)
				{
						if(this.getRoomAt(o,p).getBiome() !="plain" || (this.getRoomAt(o,p).getBiome() =="plain" && this.map[o][p]==2))
						{
							if(o<originX)
							{
										value=10-Math.abs(originX-o);
										surface.fillStyle="rgb("+value+","+value+","+value+")";
							}
							if(o>originX+side)
							{
										value=10-Math.abs((originX+side)-o);
										surface.fillStyle="rgb("+value+","+value+","+value+")";
							}
							if(p<originY)
							{
										value=10-Math.abs(originY-p);
										surface.fillStyle="rgb("+value+","+value+","+value+")";
							}
							if(p>originY+side)
							{
										value=10-Math.abs(originY-p);
										surface.fillStyle="rgb("+value+","+value+","+value+")";
							}
						}					
				}
				else
				{
						if(o<originX)
						{
									value=10-Math.abs(originX-o);
									surface.fillStyle="rgb("+value+","+value+","+value+")";
						}
						if(o>originX+side)
						{
									value=10-Math.abs((originX+side)-o);
									surface.fillStyle="rgb("+value+","+value+","+value+")";
						}
						if(p<originY)
						{
									value=10-Math.abs(originY-p);
									surface.fillStyle="rgb("+value+","+value+","+value+")";
						}
						if(p>originY+side)
						{
									value=10-Math.abs(originY-p);
									surface.fillStyle="rgb("+value+","+value+","+value+")";
						}
				}	
						
				if(this.getRoomAt(o,p)!=false)
				{
							if(this.getRoomAt(o,p).getBiome()=="plain")
							{
								if(this.map[o][p]==1)
									surface.fillText(PlainTile.Ground,Motor.getXPos()+o*32, Motor.getYPos()+p*32);
								else if(this.map[o][p]==5)
									surface.fillText(PlainTile.Tree,Motor.getXPos()+o*32, Motor.getYPos()+p*32);
							}
							else if(this.getRoomAt(o,p).getBiome()=="dungeon")
							{
								if(this.map[o][p]==1)
										surface.fillText(DungeonTile.Ground,Motor.getXPos()+o*32, Motor.getYPos()+p*32);
								else if(this.map[o][p]==5)
									surface.fillText(DungeonTile.Stone,Motor.getXPos()+o*32, Motor.getYPos()+p*32);
								else if(this.map[o][p] instanceof Chest)
									surface.fillText(DungeonTile.Chest,Motor.getXPos()+o*32, Motor.getYPos()+p*32);
							}
							else if(this.getRoomAt(o,p).getBiome()=="cave")
							{
								if(this.map[o][p]==1)
									surface.fillText(CaveTile.Ground,Motor.getXPos()+o*32, Motor.getYPos()+p*32);
								else if(this.map[o][p]==5)
									surface.fillText(CaveTile.Stone,Motor.getXPos()+o*32, Motor.getYPos()+p*32);
								else if(this.map[o][p]==6)
									this.drawLava(o,p);
							}
				}
				else 
				{
									if(this.map[o][p]==1)
										surface.fillText(DungeonTile.Ground,Motor.getXPos()+o*32, Motor.getYPos()+p*32);
				}
				if(this.map[o][p]==2)
								surface.fillText(DungeonTile.Wall,Motor.getXPos()+o*32, Motor.getYPos()+p*32);
				else if(this.map[o][p]=="stair")
								surface.fillText(DungeonTile.Stair,Motor.getXPos()+o*32, Motor.getYPos()+p*32);
				else if(this.map[o][p]>=10)
								surface.fillText("$",Motor.getXPos()+o*32, Motor.getYPos()+p*32);
				else if(this.map[o][p]==3)
							this.drawWater(o,p);
				else if(this.map[o][p]==4)
							this.drawFire(o,p);
				
		}
	}
		for(p=0;p<this.monsters.length;p++)
		{
				intancity=1;
				if(this.monsters[p] != undefined)
				{
					if(this.monsters[p].getX()<originX || this.monsters[p].getX()>originX+side || this.monsters[p].getY()<originY || this.monsters[p].getY()>originY+side)
					{
						xDistance=Math.abs(this.monsters[p].getX()-originX);
						yDistance=Math.abs(this.monsters[p].getY()-originY);
						distance=xDistance*xDistance+yDistance*yDistance;
						distance=Math.sqrt(distance);
						intancity=1/distance;
					}
					this.monsters[p].draw(intancity);
				}
		}
}

/**
 * This method draw draws and animates the water on the screen
 */
Stair.prototype.drawWater=function(xTemp,yTemp)
{
	if(this.animationFrame<=50)
	{
		surface.fillText(DungeonTile.Water_1,Motor.getXPos()+xTemp*32, Motor.getYPos()+yTemp*32);
	}
	else if(this.animationFrame>50 && this.animationFrame<=100)
	{
		surface.fillText(DungeonTile.Water_2,Motor.getXPos()+xTemp*32, Motor.getYPos()+yTemp*32);
	}
	else
	{
			this.animationFrame=0;
			surface.fillText(DungeonTile.Water_1,Motor.getXPos()+xTemp*32, Motor.getYPos()+yTemp*32);
	}	
}

/**
 * This method draw draws and animates the lava on the screen
 */
Stair.prototype.drawLava=function(xTemp,yTemp)
{
	if(this.animationFrame<=70)
	{
		surface.fillStyle = CaveTile.Lava_1Color;
		surface.fillText(CaveTile.Lava_1,Motor.getXPos()+xTemp*32, Motor.getYPos()+yTemp*32);
	}
	else if(this.animationFrame>70 && this.animationFrame<=140)
	{
		surface.fillStyle = CaveTile.Lava_2Color;
		surface.fillText(CaveTile.Lava_2,Motor.getXPos()+xTemp*32, Motor.getYPos()+yTemp*32);
	}
	else
	{
			this.animationFrame=0;
			surface.fillStyle = CaveTile.Lava_1Color;
			surface.fillText(CaveTile.Lava_1,Motor.getXPos()+xTemp*32, Motor.getYPos()+yTemp*32);
	}	
}



/**
 * This method draws and animates the fire on the screen.
 */
Stair.prototype.drawFire=function(xTemp,yTemp)
{
	rand=Math.floor(Math.random()*100)+1;
	if(rand==1)
	{
		this.map[xTemp][yTemp]=1;
		return;
	}
	if(rand==6 && this.getRoomAt(xTemp,yTemp)!=false)
	{
		if(this.getRoomAt(xTemp,yTemp).getBiome()=="plain")
		{
				rand=Math.floor(Math.random()*4)+1;
				if(rand==1 && this.map[xTemp-1][yTemp]==1)
					this.map[xTemp-1][yTemp]=4;
				else if(rand==2 && this.map[xTemp][yTemp-1]==1)
					this.map[xTemp][yTemp-1]=4;
				else if(rand==3 && this.map[xTemp+1][yTemp]==1)
					this.map[xTemp+1][yTemp]=4;
				else if(rand==4 && this.map[xTemp][yTemp+1]==1)
					this.map[xTemp][yTemp+1]=4;
		}
	}
	

	
	if(this.animationFrame<=20)
	{
		surface.fillStyle = DungeonTile.Fire_1Color;
		surface.fillText(DungeonTile.Fire_1,Motor.getXPos()+xTemp*32, Motor.getYPos()+yTemp*32);
	}
	else if(this.animationFrame>20 && this.animationFrame<=40)
	{
		surface.fillStyle = DungeonTile.Fire_2Color;
		surface.fillText(DungeonTile.Fire_2,Motor.getXPos()+xTemp*32, Motor.getYPos()+yTemp*32);
	}
	else
	{
			this.animationFrame=0;
			surface.fillStyle = DungeonTile.Fire_1Color;
			surface.fillText(DungeonTile.Fire_1,Motor.getXPos()+xTemp*32, Motor.getYPos()+yTemp*32);
	}
	
}



/**
 * This method puts the stairs and the spawn point
 */
Stair.prototype.placeStairAndPlayer=function()
{
	room=Math.floor(Math.random()*(this.rooms.length));
	this.spawnPoint=this.rooms[room].setSpawn();
	this.spawnPoint[2]=this.rooms[room];
	room=0;
	while(room==0 && this.rooms[room].getSpawn() != false)
		room=Math.floor(Math.random()*(this.rooms.length));
	emp=this.rooms[room].placeStair();		
	this.map[this.rooms[room].getX()+emp[0]][this.rooms[room].getY()+emp[1]]="stair";
}

/**
 * Returns the coordinates and the room of the spawnPoint
 */
Stair.prototype.getSpawnPoint=function()
{
	return this.spawnPoint;
}

/**
 * Returns the map of the stair
 */
Stair.prototype.getMap=function()
{
		return this.map;
}

/**
 * Sets the specified position to the fire Tile id
 */
Stair.prototype.setFire=function(xTemp,yTemp)
{
	if(this.map[xTemp][yTemp]==1)
		this.map[xTemp][yTemp]=4;
}

/**
 * Return is the specified tile is walkable or not for the player
 */
Stair.prototype.walkable=function(xTemp,yTemp)
{
		if(this.map[xTemp][yTemp]==2 || this.map[xTemp][yTemp]==0 || this.map[xTemp][yTemp]==5)
			return false;
		else
			return true;
}

/**
 * Return is the specified tile is walkable or not for the monsters
 */
Stair.prototype.walkableMonster=function(xTemp,yTemp)
{
		if(this.map[xTemp][yTemp] ==1 || this.map[xTemp][yTemp] ==4)
			return true;
		else
			return false;
}


/**
 * Return the stair's light
 */
Stair.prototype.getLight=function()
{
	return this.light;
}
