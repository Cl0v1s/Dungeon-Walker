

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
	this.spawnPoint=null;
	this.rooms=new Array();
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
	this.generateWater();
	this.placeStairAndPlayer();
}

/**
 * this method puts monsters into the rooms
 */
Stair.prototype.generateMonsters=function()
{
	for(i=0;i<this.rooms.length;i++)
	{
		this.rooms[i].generateMonsters();
	}
}

/**
 * This method moves the monstrers of the room
 */
Stair.prototype.moveMonsters=function()
{
	for(i=0;i<this.rooms.length;i++)
	{
		this.rooms[i].moveMonsters();
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
 * This method adds water tiles on the map using a layer algorythm.
 */
Stair.prototype.generateWater=function()
{
	for(i=0;i<88;i++)
	{
		for(u=0;u<48;u++)
		{
			if(this.map[i][u]==1 && this.getRoomAt(i,u) != false)
			{
					flag=Math.floor(Math.random()*this.rooms.length*10)+1;
					if(flag==1 && this.getRoomAt(i,u).getBiome()=="dungeon")
					{
						this.map[i][u]=3;
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
				if(this.map[i][u]==3)
				{
						flag=Math.floor(Math.random()*5)+1;
						switch(flag)
						{
							case 1:
								if(this.map[i][u+1]==1)
									this.map[i][u+1]=3
								break;
							case 2:
								if(this.map[i][u-1]==1)
									this.map[i][u-1]=3
								break;
							case 3:
								if(this.map[i+1][u]==1)
									this.map[i+1][u]=3
								break;
							case 4:
								if(this.map[i-1][u]==1)
									this.map[i-1][u]=3
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
				if((this.map[i][u+1]==3 && this.map[i][u-1]==3) || (this.map[i+1][u]==3 && this.map[i-1][u]==3))
				{
					if(this.map[i][u]==1)
						this.map[i][u]==3
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
 * This method reads the entire stair grid and draws the tiles
 */ 
Stair.prototype.draw=function()
{
	surface.font = "32px pixel";
	side=Motor.player.getLight()*this.light;
	originX=Math.floor(Motor.player.getX()-side/2);
	originY=Math.floor(Motor.player.getY()-side/2);
	tile="";	
	for(o=0;o<88;o++)
	{
		for(p=0;p<48;p++)
		{
			
				if(this.map[o][p]==2)
							surface.fillStyle = DungeonTile.WallColor;
				else if(this.map[o][p]=="stair")
							surface.fillStyle = DungeonTile.WallColor;
				else if(this.map[o][p]>=10)
							surface.fillStyle="rgb(248,214,0)";
				else if(this.map[o][p]==3)
							surface.fillStyle=DungeonTile.Water_1Color;
				
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
				if(this.map[o][p]==2)
								surface.fillText(DungeonTile.Wall,Motor.getXPos()+o*32, Motor.getYPos()+p*32);
				else if(this.map[o][p]=="stair")
								surface.fillText(DungeonTile.Stair,Motor.getXPos()+o*32, Motor.getYPos()+p*32);
				else if(this.map[o][p]>=10)
								surface.fillText("$",Motor.getXPos()+o*32, Motor.getYPos()+p*32);
				else if(this.map[o][p]==3)
							surface.fillText(DungeonTile.Water_1,Motor.getXPos()+o*32, Motor.getYPos()+p*32);
				
		}
	}
	for(o=0;o<this.rooms.length;o++)
	{
		for(p=0;p<this.rooms[o].monsters.length;p++)
		{
				intancity=1;
				if(this.rooms[o].monsters[p] != undefined)
				{
					if(this.rooms[o].monsters[p].getX()<originX || this.rooms[o].monsters[p].getX()>originX+side || this.rooms[o].monsters[p].getY()<originY || this.rooms[o].monsters[p].getY()>originY+side)
					{
						xDistance=Math.abs(this.rooms[o].monsters[p].getX()-originX);
						yDistance=Math.abs(this.rooms[o].monsters[p].getY()-originY);
						distance=xDistance*xDistance+yDistance*yDistance;
						distance=Math.sqrt(distance);
						intancity=1/distance;
					}
					this.rooms[o].monsters[p].draw(intancity);
				}
		}
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
 * Return is the specified tile is walkable or not for the player
 */
Stair.prototype.walkable=function(xTemp,yTemp)
{
		if(this.map[xTemp][yTemp]==2 || this.map[xTemp][yTemp]==0)
			return false;
		else
			return true;
}

/**
 * Return is the specified tile is walkable or not for the monsters
 */
Stair.prototype.walkableMonster=function(xTemp,yTemp)
{
		if(this.map[xTemp][yTemp] !=1)
			return false;
		else
			return true;
}
