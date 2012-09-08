function Monster(stair,x,y,raceTemp)
{
	this.x=x;
	this.y=y;
	this.race=raceTemp;
	this.stair=stair;
	this.name=this.race.name;;
	this.light=this.race.light;
	this.biome=this.race.biome;
	this.image=this.race.image;
	this.launch=this.race.launch;
	this.lrm=this.race.lrm;
	this.life=this.race.life;
	total=0;
	for(d=0;d<this.launch;d++)
	{
		lancer=Math.random()*6+1;
		lancer=Math.floor(lancer);
		total=total+lancer;
	}
	total=total*this.lrm;
	this.life+=total;
	this.atk=1;
	this.force=this.race.force;
	this.constitution=this.race.constitution;
	this.taille=this.race.taille;
	this.dexterite=this.race.dexterite;
	this.agressivity=this.race.agressivity;
	this.sympathy=0;
	this.antipathy=0;
	
	this.isSleeping=false;
	this.isSick=false;
	this.sickInterval=10;
	this.sickFrame=0;
	
	this.score=this.race.score;
	this.drop=this.race.drop;	
	this.effectList=new Array();
	this.pound=100;
	this.inventory=new Inventory(this);
	this.equipement=new Equipement(this);
	this.inventory.add(this.race.weapon.getId());
	this.inventory.use();
	
	this.sommeil=100;
	this.soif=100;

	this.onFire=false;
	this.fireFrame=0;
	this.fireInterval=5;
	this.previousTile=1;
	this.stair.map[this.x][this.y]=0;
	this.death=false;
}


/**
 * Allow the monster to drink
 */
Monster.prototype.lap=function()
{
		if(this.soif<100)
		{
			this.soif=this.soif+Math.round(10*this.soif/100);
			this.sendMessage("Vous buvez goulument l'eau limpide qui se trouve a vos pieds.");
			rand=Math.floor(Math.random()*50)+1;
			if(rand==1)
			{
					this.isSick=true;
					this.sendMessage("L'eau que vous venez d'avaler avait un drole de gout...");
					this.sendMessage("Priez pour qu'elle n'ai pas stagne ici trop longtemps....");
			}
		}
		else
		{
			this.sendMessage("Vous n'avez pas soif.");		
		}
}

/**
 * if the isSick trigger is on true, then inflict some damages to the monster
 */
Monster.prototype.sick=function()
{
	if(this.isSick==true)
	{
		this.sickFrame+=1;
		if(this.sickFrame>=this.sickInterval)
		{
			if(Math.floor(Math.random()*20)+1==1)
			{
				this.sendMessage("Vous sentez une amelioration de votre etat de sante, vous pouvez enfin respirer normalement.");
				this.isSick=false;
				return;
			}
			
			if(this.life>=10)
			{
				this.sendMessage("La maladie vous affaiblie.");
				this.addEffect(new StatEffect(this,"sick",-2,0,-Math.round(20*this.constitution/100),0,0,-Math.round(this.life/2),0,0,this.sickInterval));
			}
			else
			{
				this.sendMessage("Vous toussez dans votre main et essuyez le sang qui s'y trouve sur vos vetements.");
				this.addEffect(new StatEffect(this,"sick",-2,0,-Math.round(20*this.constitution/100),0,0,-Math.round(this.life/2),0,0,this.sickInterval));
			}
			this.sickFrame=0;
		}
	}
}

/**
 * Allow the monster to rest
 */
Monster.prototype.sleep=function()
{
	if(this.isSleeping)
	{
		this.light=0;
		this.sleepFrame+=1;
		if(this.sleepFrame>=20)
		{
			this.sommeil+=1;
			Motor.newTurn();
			this.sleepFrame=0;
		}
		if(this.sommeil>=100)
		{
				this.isSleeping=false;
				this.light=this.class.Light;
				this.sendMessage("Vous vous reveillez enfin, apres avoir passe une mauvaise nuit.");
				if(this.previousTile==3)
				{
					this.isSick=true;
					this.sendMessage("Malheureusement, vous etes tombe malade: vous vous etes endormis dans une mare...");
				}
		}
	}
}

/**
 * This method manages the player's stats
 */
Monster.prototype.changeStat=function()
{
	this.sommeil-=(50/3);
	this.soif-=(100/5);
}

/**
 * Show a message in the monster's msgZone
 */
Monster.prototype.sendMessage=function(msg)
{}

/**
 * Returns the monster's weight capacity
 */
Monster.prototype.getPound=function()
{
		return this.pound;
}

/**
 * Sets the monster's life counter
 */
Monster.prototype.setLife=function(nb)
{
	this.life=nb;
}

/**
 * Draws the monster on the screen
 */
Monster.prototype.draw=function(intancity)
{
	if(this.life<=0)
	{
		return;
	}
	surface.font = "30px pixel";
	if(this.agressivity==0)
	{
		r=0;
		g=0;
		b=70;
	}
	else if(this.agressivity==1)
	{
		r=100;
		g=0;
		b=0;
	}
	else if(this.agressivity>=2)
	{
		r=200;
		g=0;
		b=0;
	}
	
	this.sleep();
	if(this.isSleeping)
		intancity-=10;

	surface.fillStyle="rgb("+Math.floor(r*intancity)+","+Math.floor(g*intancity)+","+Math.floor(b*intancity)+")";


	surface.fillText(this.image, Motor.getXPos()+this.x*32, Motor.getYPos()+this.y*32);
	if(this.onFire==true)
	{
		surface.fillStyle="rgb(250,50,50)";
		surface.fillText("W",Motor.getXPos()+this.x*32, Motor.getYPos()+this.y*32);
	}
}

/**
 * This method manages the monster's fight actions
 */
Monster.prototype.turn=function(ennemy)
{
	if(!this.isSleeping)
	{
		fighter1=this;
		fighter2=ennemy;
		//Degats basiques des coups porté
			//Degats statiques
			total=fighter1.atk;
			//ajout des degats du nombre de coups portés avec l'arme
			for(i=0;i<fighter1.launch;i++)
			{
				lancer=Math.random()*6+1;
				lancer=Math.floor(lancer);
				total=total+Math.round(fighter1.atk/lancer);
			}
			dmg=total;
		//bonus de zone
		if(fighter1.dexterite>100)
			fighter1.dexterite=100;
			
		zone=Math.floor(Math.random()*(100-fighter1.dexterite))+1;
		
		if(zone>=0 && zone<=10)
			dmg=dmg+Math.round(fighter1.force*30/100);
		else if(zone>=11 && zone<=50)
			dmg=dmg+Math.round(fighter1.force*20/100);
		else
			dmg=dmg+Math.round(fighter1.force*10/100);
			
		

		//parade de l'ennemi
		if(fighter2.dexterite>fighter1.dexterite)
		{
			if(fighter2.dexterite>100)
				fighter2.dexterite=100;
				
			zone=Math.floor(Math.random()*(100-fighter2.dexterite))+1;
			
			if(zone>=0 && zone<=30)
			{
				parade=Math.floor((Math.random()*fighter2.constitution)+1);
				parade=dmg*parade/100;
				dmg=dmg-Math.floor(parade);
			}
		}
		fighter2.setLife(fighter2.life-dmg)
		return dmg;
	}
	else
	{
		if(Math.floor(Math.random()*2)+1==1)
		{
			this.isSleeping=false;
			this.sendMessage("Vous vous reveillez en sursautant !");
			ennemy.sendMessage("Votre adversaire se reveille en sursaut !");
		}
	}
}

/**
 * This method is the monster's basic movement IA.
 * This method selects a walkable direction for the monster.
 */
Monster.prototype.selectDir=function()
{
		dir=0;
		while(dir<1)
		{
			dir=Math.floor((Math.random()*5)+1);
		}
		switch(dir)
		{	
			case 1 :
				this.move("right");
			break;
			case 2 :
				this.move("left");	
			break;
			case 3 :
				this.move("down");
			break;
			case 4 :
				this.move("up");	
			break;


		}
}

/**
 * This method moves the monster
 */
Monster.prototype.move=function(dir)
{
	if(this.sommeil<=10)
	{
		if(Math.floor(Math.random()*10)+1==1)
			this.isSleeping=true;
	}
	if(!this.isSleeping)
	{
		if(this.life<=0)
			return;
		this.fire();
		this.stair.map[this.x][this.y]=this.previousTile;
		switch(dir)
		{
			case "right":
				if(this.stair.walkableMonster(this.x+1,this.y))
					this.x+=1;
					break;
			case "left":
				if(this.stair.walkableMonster(this.x-1,this.y))
					this.x-=1;
					break;
			case "down":
				if(this.stair.walkableMonster(this.x,this.y+1))
					this.y+=1;
					break;
			case "up" :		
				if(this.stair.walkableMonster(this.x,this.y-1))
					this.y-=1;
					break;
		}
		this.previousTile=this.stair.map[this.x][this.y];
		this.isGrouped();
		if(this.previousTile==4)
			this.setFire();
		this.stair.map[this.x][this.y]=0;
		
		if(this.isNear(3))
		{
			this.lap();
		}
	}
	
}


/**
 * if the onFire trigger is on true, then inflict some damages to the monster
 */
Monster.prototype.fire=function()
{
	if(this.onFire==true)
	{		
			this.fireFrame+=1;
			if(this.fireFrame>=this.fireInterval)
			{
				this.fireFrame=0;
				this.life-=(20*this.life_max/100);
				this.life=Math.floor(this.life);
				if(this.life<=0)
				{
					this.kill("burnt");
				}
			}
	}
}

/**
 * Sets the onFire trigger to true.
 */
Monster.prototype.setFire=function()
{
	this.onFire=true;
}

/**
 * Returns the monster's x coordinate 
 */
Monster.prototype.getX=function()
{
	return this.x;
}

/**
 * Returns the monster's y coordinate.
 */
Monster.prototype.getY=function()
{
		return this.y;
}

/**
 * Return if the monster is dead or not
 */
Monster.prototype.isDead=function()
{
	return this.death;
}

/**
 * Kill the monster
 */
Monster.prototype.kill=function(reason,by)
{
	if(reason=="slain")
	{
						if(by !=undefined)
						{
							by.score+=this.score;
						}
						drop=Math.floor(Math.random()*2)+1;
						if(drop==1)
						{
							rand=Math.floor(Math.random()*this.drop.length);
							drop=this.drop[rand];
							drop=drop+10;
							this.stair.map[this.getX()][this.getY()]=drop;
						}
						else
							this.stair.map[this.getX()][this.getY()]=1;
	}
	else
		this.stair.map[this.getX()][this.getY()]=1;
	this.death=true;
}

/**
 * Returns the monster's attack amount
 */
Monster.prototype.getAtk=function()
{
	return this.atk;
}

/**
 * Returns the monster's lrm amount
 */
Monster.prototype.getLrm=function()
{
	return this.lrm;
}

/**
 * Returns the monster's launch number
 */
Monster.prototype.getLaunch=function()
{
	return this.launch;
}

/**
 * Returns the monster's consititution amount
 */
Monster.prototype.getConst=function()
{
	return this.constitution;
}

/**
 * Returns the monster's dexterity amount
 */
Monster.prototype.getDex=function()
{
	return this.dexterite;
}

/**
 * Sets the monster's attack amount
 */
Monster.prototype.setAtk=function(value)
{
	this.atk=value;
}

/**
 * Sets the monster's lrm amount
 */
Monster.prototype.setLrm=function(value)
{
	this.lrm=value;
}
/**
 * Sets the monster's launch number
 */
Monster.prototype.setLaunch=function(value)
{
	this.launch=value;
}
/**
 * Sets the monster's consitution amount
 */
Monster.prototype.setConst=function(value)
{
	this.constitution=value;
}
/**
 * Sets the monster's dexerity amount
 */
Monster.prototype.setDex=function(value)
{
	this.dexterite=value;
}

/**
 * Returns the monster's name
 */
Monster.prototype.getName=function()
{
	return this.name;
}

/**
 * Sets the sympathy temp amount
 */
Monster.prototype.setSympathy=function(value)
{
	this.sympathy=value;
}

/**
 * Returns the sympathy temp amout
 */
Monster.prototype.getSympathy=function()
{
	return this.sympathy;
}

/**
 * Sets the antipathy temp amount
 */
Monster.prototype.setAntipathy=function(value)
{
	this.antipathy=value;
}

/**
 * Returns the antipathy temp amout
 */
Monster.prototype.getAntipathy=function()
{
	return this.antipathy;
}

/**
 * Checks if the monster is near the specified entity
 */
Monster.prototype.isNearEntity=function(other)
{
	if((other.getX()==this.x-1 && other.getY()==this.y) || (other.getX()==this.x+1 && other.getY()==this.y) || (other.getY()==this.y-1 && other.getX()==this.x) || (other.getY()==this.y+1 && other.getX()==this.x))
		return true;
	else 
		return false;
}

/**
 * Checks if the monster is near the specified tile
 */
Monster.prototype.isNear=function(value)
{
	if(this.stair.getMap()[this.x+1][this.y]==value || this.stair.getMap()[this.x-1][this.y]==value || this.stair.getMap()[this.x][this.y+1]==value || this.stair.getMap()[this.x][this.y-1]==value)
		return true;
	else
		return false;	
}

/**
 * Checks if the monster can see the specified tile
 */
Monster.prototype.searchFor=function(tile)
{
	side=this.light;
	originX=Math.round(this.x-side/2);
	originY=Math.round(this.y-side/2);
	listTemp=new Array();
	for(f=originX;f<=originX+side;f++)
	{
			for(g=originY;g<=originY+side;g++)
			{
					if(this.stair.getMap()[f][g]==tile)
					{
						listTemp.push(new Array());
						listTemp[listTemp.length-1][0]=f;
						listTemp[listTemp.length-1][1]=g;
						
					}
			}
	}
	nearest=undefined;
	for(i=0;i<listTemp.length;i++)
	{
		if(nearest==undefined || (Math.abs(listTemp[i][0]-this.x)<Math.abs(nearest[0]-this.x) && Math.abs(listTemp[i][1]-this.y)<Math.abs(nearest[1]-this.y)))
		{
			nearest=new Array();
			nearest[0]=listTemp[i][0];
			nearest[1]=listTemp[i][1];			
		}
	}
	
	return nearest;
	
}


/**
 * Adds an effect to the effectList
 */
Monster.prototype.addEffect=function(effect)
{
	this.effectList.push(effect);
}


/**
 * If the monster is near his bestfriend, adds an grouped effect to the monster and his bestfriend
 */
Monster.prototype.isGrouped=function(other)
{
	this.addEffect(new StatEffect(this,"grouped",0,0,0,0,5,0,5,0,1));
	if(other != undefined)
	{
		other.addEffect(new StatEffect(this,"leader",0,0,0,0,5,0,5,0,1));
	}
}


/**
 * Run the monster's ia
 */
Monster.prototype.think=function()
{

	
	friendList=new Array();
	enemyList=new Array();
	side=this.light;
	originX=Math.round(this.x-side/2);
	originY=Math.round(this.y-side/2);
	for(d=0;d<this.stair.monsters.length;d++)
	{
		target=this.stair.monsters[d];

		if(target != undefined && target != this)
		{
			if(target.getName() != this.name)
			{
				if((target.getX()==this.x-1 && target.getY()==this.y) || (target.getX()==this.x+1 && target.getY()==this.y) || (target.getY()==this.y-1 && target.getX()==this.x) || (target.getY()==this.y+1 && target.getX()==this.x))
				{
					this.agressivity+=1;
					result=this.stair.fight(target,this);
						
				}
			} 
			
				if(target.getX()>=originX && target.getX()<=originX+side && target.getY()>=originY && target.getY()<=originY+side)
				{
					if(target.getName()==this.name)
					{
						friendList.push(target);
					}
					else
						enemyList.push(target);
				}
		}
	}
	bestFriend=undefined;
	for(e=0;e<friendList.length;e++)
	{
		target=friendList[e];
		total=target.atk;
		for(i=0;i<target.launch;i++)
		{
			lancer=Math.random()*6+1;
			lancer=Math.floor(lancer);
			total=total+Math.round(target.atk/lancer);
		}
		sympathy=total*(6-Math.sqrt(Math.pow(target.getX()-this.x,2)+Math.pow(target.getY()-this.y,2)))-2*this.agressivity;
		target.setSympathy(sympathy);
		if(bestFriend==undefined || sympathy>bestFriend.getSympathy())
				bestFriend=target;
	}
	worstEnemy=undefined;
	for(e=0;e<enemyList.length;e++)
	{
		target=enemyList[e];
		total=this.atk;
		for(i=0;i<this.launch;i++)
		{
			lancer=Math.random()*6+1;
			lancer=Math.floor(lancer);
			total=total+Math.round(this.atk/lancer);
		}
		antipathy=total*(6-Math.sqrt(Math.pow(target.getX()-this.x,2)+Math.pow(target.getY()-this.y,2)))-2*this.agressivity;
		target.setAntipathy(antipathy);
		if(worstEnemy==undefined || antipathy>worstEnemy.getAntipathy())
				worstEnemy=target;
	}
	water=this.searchFor(3);
	drinkDesire=0;
	if(water != undefined)	
	{
		drinkDesire=(this.soif*-1+100)/2*(6-Math.sqrt(Math.pow((water[0]-this.x),2)+Math.pow((water[1]-this.y),2)));
	}
	
	
	for(c=0;c<this.effectList.length;c++)
	{
		if(this.effectList[c] instanceof StatEffect)
			this.effectList[c]=this.effectList[c].update();
	}	

	if(bestFriend != undefined && worstEnemy != undefined)
	{
		if(drinkDesire>worstEnemy.getAntipathy() && drinkDesire>bestFriend.getSympathy())
			this.moveTo(water[0],water[1]);
			
			
		if(this.isNearEntity(bestFriend))
		{
			this.isGrouped(bestFriend);
		}
		
		if(this.agressivity>=2)
		{
			this.moveTo(worstEnemy.getX(),worstEnemy.getY());
		}
		else if(this.agressivity==1)
		{
			this.selectDir();
		}
		else if(this.agressivity==0)
		{
			if(this.isNearEntity(bestFriend))
				this.selectDir();
			else
				this.moveTo(bestFriend.getX(),bestFriend.getY());			
		}
		
			return;
	}
	else if(bestFriend != undefined)
	{
		
		if(drinkDesire>bestFriend.getSympathy())
			this.moveTo(water[0],water[1]);
			
		if(this.isNearEntity(bestFriend))
		{
			this.isGrouped(bestFriend);
		}

		if(this.agressivity<2)
		{
			if(this.isNearEntity(bestFriend))
				this.selectDir();
			else
				this.moveTo(bestFriend.getX(),bestFriend.getY());
			
		}
		else
			this.selectDir();
	
		return;
	}
	else if(worstEnemy != undefined)
	{
		if(drinkDesire>worstEnemy.getAntipathy())
			this.moveTo(water[0],water[1]);
			
		if(this.agressivity>=1)
			this.moveTo(worstEnemy.getX(),worstEnemy.getY());
		else
			this.selectDir();
		return;
	}

	this.selectDir();

	
}

/**
 * Moves the monster to the specified position
 */
Monster.prototype.moveTo=function(xTemp,yTemp)
{
	if(xTemp>this.x)
	{
		this.move("right");
		return;
	}
	if(xTemp<this.x)
	{
		this.move("left");
		return;
	}	
	if(yTemp>this.y)
	{
		this.move("down");
		return;
	}
	if(yTemp<this.y)
	{
		this.move("up");
		return;
	}
	
	this.selectDir();
}




