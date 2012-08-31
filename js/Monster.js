function Monster(x,y,race)
{
	this.x=x;
	this.y=y;
	this.race=race;
	this.nam=this.race.Name;
	this.follow=this.race.Follow;
	this.img=this.race.Img;
	this.life=this.race.Life;
	total=0;
	for(i=0;i<this.race.Launch;i++)
	{
		lancer=Math.random()*6+1;
		lancer=Math.floor(lancer);
		total=total+lancer;
	}
	this.life=this.life+total*this.race.Lrm;
	this.life_max=this.life;
	this.atk=1;
	this.force=this.race.For;
	this.constitution=this.race.Con;
	this.dexterite=this.race.Dex;
	this.taille=this.race.Tai;
	this.pound=100;
	this.inventory=new Inventory(this);
	this.equipement=new Equipement(this);
	this.inventory.add(this.race.Weapon.getId());
	this.inventory.use();


	this.onFire=false;
	this.fireFrame=0;
	this.fireInterval=5;
	this.previousTile=1;
	this.death=false;
}

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
	if(this.follow==false)
		surface.fillStyle="rgb("+Math.floor(150*intancity)+","+Math.floor(50*intancity)+","+Math.floor(50*intancity)+")";

	if(this.follow==true)
		surface.fillStyle="rgb("+Math.floor(250*intancity)+","+Math.floor(50*intancity)+","+Math.floor(50*intancity)+")";

	surface.fillText(this.img, Motor.getXPos()+this.x*32, Motor.getYPos()+this.y*32);
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

/**
 * This method is the monster's basic movement IA.
 * This method selects a walkable direction for the monster.
 */
Monster.prototype.selectDir=function()
{
	if(this.follow==false)
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
}

/**
 * This method moves the monster
 */
Monster.prototype.move=function(dir)
{
	if(this.life<=0)
		return;
	this.fire();
	Motor.dungeon.getCurrentStair().map[this.x][this.y]=this.previousTile;
	switch(dir)
	{
		case "right":
			if(Motor.dungeon.getCurrentStair().walkableMonster(this.x+1,this.y))
				this.x+=1;
				break;
		case "left":
			if(Motor.dungeon.getCurrentStair().walkableMonster(this.x-1,this.y))
				this.x-=1;
				break;
		case "down":
			if(Motor.dungeon.getCurrentStair().walkableMonster(this.x,this.y+1))
				this.y+=1;
				break;
		case "up" :		
			if(Motor.dungeon.getCurrentStair().walkableMonster(this.x,this.y-1))
				this.y-=1;
				break;
	}
	this.previousTile=Motor.dungeon.getCurrentStair().map[this.x][this.y];
	if(this.previousTile==4)
		this.setFire();
	Motor.dungeon.getCurrentStair().map[this.x][this.y]=0;
	
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
				if(this.life>0)
					Motor.messages.add(this.nam+" brule en criant.");
				else
				{
					Motor.messages.add(this.nam+" disparait dans un petit nuage de poussieres.");
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
Monster.prototype.kill=function(reason)
{
	if(reason=="slain")
	{
						drop=Math.floor(Math.random()*2)+1;
						if(drop==1)
						{
							rand=Math.floor(Math.random()*this.race.Drop.length);
							drop=this.race.Drop[rand];
							drop=drop+10;
							Motor.dungeon.getCurrentStair().map[this.getX()][this.getY()]=drop;
						}
						else
							Motor.dungeon.getCurrentStair().map[this.getX()][this.getY()]=this.previousTile;
	}
	else
		Motor.dungeon.getCurrentStair().map[this.getX()][this.getY()]=this.previousTile;
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

