//////////////////////////////////////////////////////////////////////////////////////
//class Room
//////////////////////////////////////////////////////////////////////////////////////
//par chaipokoi
//crée le : 7/05/2012
/////////////////////////////////////////////////////////////////////////////////////
//permet de gérer les différentes salles,
//Fonctionnalités:
//-génération aléatoire=Room(top,left,down,right)
//-affichage à l'écran=draw(xD,yD)
//-test de collision=blocked(x,y)
//-recherche de la position d'un bloc de la salle=research(bloc)
//-récupération des différentes caractéristiques de la salle
//-réglage des différentes caractéristiques de la salle
////////////////////////////////////////////////////////////////////////////////////


var DungeonTile={
"Ground" : ".",
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
"Stair" : ">"
}



function Room(x,y)
{
	this.biome="dungeon";
	if(this.biome=="dungeon")
		this.tile=DungeonTile;
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

/**
 * Generates Monsters and puts them on the map
 */
Room.prototype.generateMonsters=function()
{
		nb=Math.floor(Math.random()*(Motor.dungeon.getCurrentStairId()+5));
		for(n=0;n<nb;n++)
		{
			xM=Math.floor(Math.random()*this.width)+1;
			xM=this.x+xM;
			yM=Math.floor(Math.random()*this.height)+1;
			yM=this.y+yM;
			while(Motor.dungeon.getCurrentStair().getMap()[xM][yM] != 1)
			{
				xM=Math.floor(Math.random()*this.width)+1;
				xM=this.x+xM;
				yM=Math.floor(Math.random()*this.height)+1;
				yM=this.y+yM;
			}
			race=Math.floor(Math.random()*Motor.dungeon.getCurrentStairId());
			this.monsters[n]=new Monster(xM,yM,Bestiaire[race]);
		}
}


/**
 * This method move the geneated Monsters of the room.
 * If the player is on collid with the Monster, the game begin a fight.
 */
Room.prototype.moveMonsters=function()
{
	for(a=0;a<this.monsters.length;a++)
	{

	

		battle=0;
		if(this.monsters[a] !=undefined)
		{
			if (Motor.turn>=this.monsters[a].fi)
			{
				this.monsters[a].fire();
				if(this.monsters[a].life<=0)
					this.monsters[a]=undefined;	
			}	
				for(m=0;m<this.monsters.length;m++)
				{
					if(a !=m && this.monsters[m] !=undefined && this.monsters[a] !=undefined)
					{
							if((this.monsters[a].x-1==this.monsters[m].x && this.monsters[a].y==this.monsters[m].y) || (this.monsters[a].x+1==this.monsters[m].x && this.monsters[a].y==this.monsters[m].y) || (this.monsters[a].y-1==this.monsters[m].y && this.monsters[a].x==this.monsters[m].x) || (this.monsters[a].y+1==this.monsters[m].y && this.monsters[a].x==this.monsters[m].x))
						{
							if(this.monsters[a].nam !=this.monsters[m].nam)
							{
								battle=1;
								result=this.battle(this.monsters[m],this.monsters[a]);
								if(result==false)
								{
									this.monsters[a]=undefined;
								}
								if(result==true)
								{
									this.monsters[m]=undefined;
								}
							}
							if(this.monsters[m].onFire==true)
							{
								this.monsters[a].setFire();
							}
						}

					}
				}


				if((this.monsters[a].x-1==Motor.player.getX() && this.monsters[a].y==Motor.player.getY()) || (this.monsters[a].x+1==Motor.player.getX() && this.monsters[a].y==Motor.player.getY()) || (this.monsters[a].y-1==Motor.player.getY() && this.monsters[a].x==Motor.player.getX()) || (this.monsters[a].y+1==Motor.player.getY() && this.monsters[a].x==Motor.player.getX()))
				{
					battle=1;
					result=this.battle(player,this.monsters[a]);
					if(result==false)
					{
						drop=Math.floor(Math.random()*2)+1;
						Motor.player.score+=this.monsters[a].race.Score;
						if(drop==1)
						{
							rand=Math.floor(Math.random()*this.monsters[a].race.Drop.length);
							drop=this.monsters[a].race.Drop[rand];
							drop=drop+10;
							Motor.dungeon.getCurrentStair().map[this.monsters[a].getX()][this.monsters[a].getY()]=drop;
						}
						this.monsters[a]=undefined;
					}
					if(result==true)
					{
						Motor.gameOver();
					}

				}
				
				if(battle==0)
				{
					this.monsters[a].selectDir(this.map);
				}
		

		}
	}

}

/**
 * allow battle between two entities
 */
Room.prototype.battle=function(fighter1,fighter2)
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
		sentence=prio.nam+" tente un engagement contre "+sec.nam+" et lui inflige "+dmg1+" degats,";
		sentence2= sec.nam+" contre-attaque en infligeant "+dmg2+" degats a son adversaire.";
		break;
		case 2:
		sentence=prio.nam+" s'elance sur "+sec.nam+" et le blesse en lui infligeant "+dmg1+" degats.";
		sentence2="Malheureusement pour son adversaire, "+sec.nam+" pare et "+prio.nam+" perd "+dmg2+" points de vie.";
		break;



	}

	Motor.messages.add(sentence);
	Motor.messages.add(sentence2);

	if(fighter1.life<=0)
	{
		this.entityGrill[fighter1.x][fighter1.y]=1;
		Motor.messages.add(fighter2.nam+" a vaincu "+fighter1.nam+".");
		Motor.messages.changeMode("normal");
		return true;
	}

	if(fighter2.life<=0)
	{
		Motor.dungeon.getCurrentStair().map[fighter2.x][fighter2.y]=1;
		Motor.messages.add(fighter1.nam+" a vaincu "+fighter2.nam+".");
		Motor.messages.changeMode("normal");
		return false;
	}


	

}


/*
Room.prototype.setFire=function(entity)
{
	rand=Math.floor(Math.random()*6);
	if(rand>=1 && rand<=3)
	{
		if(this.grill[entity.x][entity.y+1]==1)
		{
			this.grill[entity.x][entity.y+1]=5;
			Motor.messages.add("Vous reussissez a mettre le feu au sol.")
		}
		else
		{
			Motor.messages.add("Vous ne pouvez pas allumer un feu ici !");
		}
	}
	else
	{
			Motor.messages.add("Une petite braise apparait...Mais ne survit malheureusement pas.")
	}
	Motor.newTurn();
	clean();
	this.draw();

}
*/

