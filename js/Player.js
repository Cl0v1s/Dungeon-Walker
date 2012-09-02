function Player(x,y,FOR,CON,TAI,DEX,race)
{
	this.x=x;
	this.y=y;
	this.name="Conan";
	this.class=race;
	this.light=this.class.Light;
	//calcul des caractéristiques
	this.force=FOR*this.class.For;
	this.constitution=CON*this.class.Con;
	this.taille=TAI*this.class.Tai;
	this.dexterite=DEX*this.class.Dex;
	this.life=(this.constitution+this.taille)/2;
	total=0;
	for(i=0;i<this.class.Launch;i++)
	{
		lancer=Math.random()*6+1;
		lancer=Math.floor(lancer);
		total=total+lancer;
	}
	total=total*this.class.Lrm;
	this.life+=total;

	this.atk=1;
	this.lrm=this.class.Lrm;
	this.launch=this.class.Launch;
	
	this.img=this.class.Img;
	this.equipement=new Equipement(this);
	this.pound=Math.floor(((this.taille*2+this.constitution)/3)/4);
	//statistiques de survie
	this.hygiene=100;
	this.faim=100;
	this.sommeil=100;
	this.soif=100;
	this.isSick=false;
	this.onFire=false;
	this.effectList=new Array();
	//autre
	this.score=0;
	this.inventory=new Inventory(this);
	this.fireInterval=5;
	this.fireFrame=0;
	this.previousTile=1;
	this.inventory.add(this.class.Weapon.getId());
	this.inventory.use();
	this.hi=this.class.Hi;
	this.sickInterval=10;
	this.sickFrame=0;
	this.sympathy=0;
	this.antipathy=0;
}

/**
 * Sets the sympathy temp amount
 */
Player.prototype.setSympathy=function(value)
{
	this.sympathy=value;
}

/**
 * Returns the sympathy temp amout
 */
Player.prototype.getSympathy=function()
{
	return this.sympathy;
}

/**
 * Sets the antipathy temp amount
 */
Player.prototype.setAntipathy=function(value)
{
	this.antipathy=value;
}

/**
 * Returns the antipathy temp amout
 */
Player.prototype.getAntipathy=function()
{
	return this.antipathy;
}


/**
 * Returns the player's name
 */
Player.prototype.getName=function()
{
	return this.name;
}

/**
 * Draws the player on the screen
 */
Player.prototype.draw=function()
{
	if(this.faim>100)
		this.faim=100;

	if(this.soif>100)
		this.soif=100;

	if(this.sommeil>100)
		this.sommeil=100;

	if(this.hygiene>100)
		this.hygiene=100;
		
	if(this.faim<0)
		this.faim=0;

	if(this.soif<0)
		this.soif=0;

	if(this.sommeil<0)
		this.sommeil=0;

	if(this.hygiene<0)
		this.hygiene=0;


	surface.font = "30px pixel";
	surface.fillStyle="rgb(50,150,50)";
	surface.fillText(this.img, Motor.getXPos()+this.x*32, Motor.getYPos()+this.y*32);
	if(this.onFire==true)
	{
		surface.fillStyle="rgb(250,50,50)";
		surface.fillText("W", Motor.getXPos()+this.x*32, Motor.getYPos()+this.y*32);
	}
}

/**
 * Manages the player's movements 
 */
Player.prototype.move=function(dir)
{
	stair=Motor.dungeon.getCurrentStair();
	for(c=0;c<this.effectList.length;c++)
	{
		if(this.effectList[c] instanceof StatEffect)
			this.effectList[c]=this.effectList[c].update();
	}
	this.fire();
	this.sick();
	stair.map[this.x][this.y]=this.previousTile;
	switch(dir)
	{				
		case "right":
			if(stair.walkable(this.x+1,this.y))
			{
				this.x+=1;
				Motor.setXPos(Motor.getXPos()-32);
			}
			break;
		case "left":
			if(stair.walkable(this.x-1,this.y))
			{
				this.x-=1;
				Motor.setXPos(Motor.getXPos()+32);
			}
			break;
		case "down":
			if(stair.walkable(this.x,this.y+1))
			{
				this.y+=1;
				Motor.setYPos(Motor.getYPos()-32);
			}
			break;
		case "up" :		
			if(stair.walkable(this.x,this.y-1))
			{
				this.y-=1;
				Motor.setYPos(Motor.getYPos()+32);
			}
			break;
	}
	this.getObject();
	this.getUp();
	this.previousTile=stair.getMap()[this.x][this.y];
	this.contextMessage();
	stair.map[this.x][this.y]=0;
}

/**
 * if the isSick trigger is on true, then inflict some damages to the player 
 */
Player.prototype.sick=function()
{
	if(this.isSick==true)
	{
		this.sickFrame+=1;
		if(this.sickFrame>=this.sickInterval)
		{
			this.life-=Math.round(this.life*5/100);
			if(this.life>=10)
			{
				Motor.messages.add("La maladie vous affaiblie.");
			}
			else
			{
				Motor.messages.add("Vous toussez dans votre main et essuyez le sang qui s'y trouve sur vos vetements.");
			}
			this.sickFrame=0;
		}
	}
}

/**
 * if the onFire trigger is on true, then inflict some damages to the player
 */
Player.prototype.fire=function()
{
	if(this.onFire==true)
	{		
			this.fireFrame+=1;
			if(this.fireFrame>=this.fireInterval)
			{
				this.fireFrame=0;
				this.life-=10;
				Motor.messages.add("Vous brulez a petit feu.");
			}
	}
}


/**
 * Heals the player
 */
Player.prototype.heal=function()
{
	if(this.isSick==false && this.faim>50)
	{
	heal=Math.floor(this.life*this.class.Hr/100);
	this.life+=heal;
	}

}


/**
 * This method manages the player's stats
 */
Player.prototype.changeStat=function()
{
	this.soif-=(100/5);
	this.sommeil-=(50/3);
	this.faim-=30+(Math.floor(Math.random()*20));
}


/**
 * This method allow the player to drink some water.
 */
Player.prototype.lap=function()
{
	grill=this.previousTile;
	if(grill==3)
	{
		if(this.soif<100)
		{
			this.soif=this.soif+Math.round(10*this.soif/100);
			Motor.messages.add("Vous buvez goulument l'eau limpide qui se trouve a vos pieds.");
			rand=Math.floor(Math.random()*100)+1;
			if(rand==1)
			{
					this.isSick=true;
					Motor.messages.add("L'eau que vous venez d'avaler avait un drole de gout...");
					Motor.messages.add("Priez pour qu'elle n'ai pas stagne ici trop longtemps....");
			}
		}
		else
		{
			Motor.messages.add("Vous n'avez pas soif.");		
		}
	}
	if(grill !=3 && grill !=4)
	{
		Motor.messages.add("Il n'y a pas d'eau a vos pieds.");
	}
}

/**
 * Sets the player's x pos
 */
Player.prototype.setX=function(x)
{
	this.x=x;
}

/**
 * Sets the player's y pos
 */
Player.prototype.setY=function(y)
{
	this.y=y;
}

/**
 * Returns the player x pos
 */
Player.prototype.getX=function()
{
	return this.x;
}

/**
 * Returns the player's y pos
 */
Player.prototype.getY=function()
{
	return this.y;
}

/**
 * Sets the player's life counter
 */
Player.prototype.setLife=function(nb)
{
	this.life=nb;
}


/**
 * This method manage the player's fight actions
 */
Player.prototype.turn=function(ennemy)
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
 * Allow the player to open the inventory GUI
 */
Player.prototype.openInventory=function()
{
		Motor.messages.add("Vous vous asseyez sur le sol et vous ouvrez votre sac.");
		Scene=this.inventory;
}

/**
 * Allow the player to open the equipement GUI
 */
Player.prototype.openEquipement=function()
{
		Motor.messages.add("Vous vous asseyez sur le sol et vous otez votre equipement.");
		Scene=this.equipement;
}

/**
 * This method allow the player to get the object if there are.
 */
Player.prototype.getObject=function()
{
		if(Motor.dungeon.getCurrentStair().getMap()[this.x][this.y]>=10)
		{
			this.inventory.add(Motor.dungeon.getCurrentStair().getMap()[this.x][this.y]-10);
			Motor.dungeon.getCurrentStair().map[this.x][this.y]=1;
		}
}

/**
 * if the player is on a stair then generate a new stair.
 */
Player.prototype.getUp=function()
{
		if(Motor.dungeon.getCurrentStair().getMap()[this.x][this.y]=="stair")
		{
			this.previousTile=1;
			Motor.dungeon.upStair();
			x=Motor.dungeon.getCurrentStair().getSpawnPoint()[0]+Motor.dungeon.getCurrentStair().getSpawnPoint()[2].getX();
			y=Motor.dungeon.getCurrentStair().getSpawnPoint()[1]+Motor.dungeon.getCurrentStair().getSpawnPoint()[2].getY();
			this.setX(x);
			this.setY(y);
			Motor.resetCanvas();
		}
}

/**
 * Returns the light of the player
 */
Player.prototype.getLight=function()
{
	return this.light;
}


/**
 * Returns the player's hungry counter
 */
Player.prototype.getHungry=function()
{
	return this.faim;
}

/**
 * Sets the player's hungry counter
 */
Player.prototype.setHungry=function(faimTemp)
{
	this.faim=faimTemp;
}

/**
 * Returns the player's weight capacity
 */
Player.prototype.getPound=function()
{
		return this.pound;
}


/**
 * Kill the player
 */
Player.prototype.kill=function()
{
	Motor.gameOver();
}

/**
 * Send a message to the HUD in accord with the player's situation.
 * Can be change the player's stats.
 */
Player.prototype.contextMessage=function()
{
		if(this.previousTile==3)
		{
			Motor.messages.add("Vous marchez dans une flaque d'eau, formee annee apres annee par l'infiltration.");
			if(this.onFire==true)
			{
				Motor.messages.add("Vous laisser l'eau fraiche recouvrir vos brulure...");
				this.onFire=false;
			}
		}
		else if(this.previousTile==4)
		{
			Motor.messages.add("Vous marchez dans des flammes, idiot !");
			this.onFire=true;
		}
		else if(this.previousTile==6)
		{
			Motor.messages.add("Une odeur de brule atteint vos narines... Et vous vous rendez compte que vous marchez dans de la lave !");
			this.life=this.life-10;
			this.onFire=true;
		}
}

/**
 * Returns the player's attack amount
 */
Player.prototype.getAtk=function()
{
	return this.atk;
}

/**
 * Returns the player's lrm amount
 */
Player.prototype.getLrm=function()
{
	return this.lrm;
}

/**
 * Returns the player's launch number
 */
Player.prototype.getLaunch=function()
{
	return this.launch;
}

/**
 * Returns the player's consititution amount
 */
Player.prototype.getConst=function()
{
	return this.constitution;
}

/**
 * Returns the player's dexterity amount
 */
Player.prototype.getDex=function()
{
	return this.dexterite;
}

/**
 * Sets the player's attack amount
 */
Player.prototype.setAtk=function(value)
{
	this.atk=value;
}

/**
 * Sets the player's lrm amount
 */
Player.prototype.setLrm=function(value)
{
	this.lrm=value;
}
/**
 * Sets the player's launch number
 */
Player.prototype.setLaunch=function(value)
{
	this.launch=value;
}
/**
 * Sets the player's consitution amount
 */
Player.prototype.setConst=function(value)
{
	this.constitution=value;
}
/**
 * Sets the player's dexerity amount
 */
Player.prototype.setDex=function(value)
{
	this.dexterite=value;
}

/**
 * Checks if the player is on a chest and, open the chest
 */
Player.prototype.interact=function()
{	
	//open chest
	if(this.previousTile instanceof Chest)
	{
		Motor.messages.add("Vous ouvrez le coffre doucement, de peur d'abimer son contenu.");
		Scene=this.previousTile;
	}
	else
	{
		this.searchForGrass();
	}
	
}

/**
 * Checks if the player is near a bush and, generate adds a new grass type item to his inventory
 */
Player.prototype.searchForGrass=function()
{
	if(Motor.dungeon.getCurrentStair().getMap()[this.x-1][this.y]==5 || Motor.dungeon.getCurrentStair().getMap()[this.x+1][this.y]==5 || Motor.dungeon.getCurrentStair().getMap()[this.x][this.y-1]==5 || Motor.dungeon.getCurrentStair().getMap()[this.x][this.y+1]==5)
	{
		if(Motor.dungeon.getCurrentStair().getMap()[this.x-1][this.y]==5)
		{
			xTemp=this.x-1;
			yTemp=this.y;
		}
		else if(Motor.dungeon.getCurrentStair().getMap()[this.x+1][this.y]==5)
		{
			xTemp=this.x+1;
			yTemp=this.y;
		}
		else if(Motor.dungeon.getCurrentStair().getMap()[this.x][this.y-1]==5)
		{
			xTemp=this.x;
			yTemp=this.y-1;
		}
		else
		{
			xTemp=this.x;
			yTemp=this.y+1;
		}
		
		room=Motor.dungeon.getCurrentStair().getRoomAt(this.x,this.y);
		if(room != false)
		{
			if(room.getBiome()=="plain")
			{
				rand=Math.floor(Math.random()*10)+1;
				if(rand==1)
				{
					list=new Array();
					for(i=0;i<ItemList.length;i++)
					{
						if(ItemList[i] != undefined)
						{
							type=ItemList[i].getType();
							if(type=="grass")
								list.push(ItemList[i]);
						}
					}
					rand=Math.floor(Math.random()*list.length);
					object=list[rand];
					Motor.messages.add("Apres un rapide exament, vous decouvrez l'objet "+object.getName()+".");
					this.inventory.add(object.getId());
				}
				else
					Motor.messages.add("Vous n'avez rien trouve d'interessant...");
				Motor.dungeon.getCurrentStair().map[xTemp][yTemp]=1;
			}
		}
	}
	
}

/**
 * add an effect to the effects list
 */
Player.prototype.addEffect=function(effect)
{
		this.effectList.push(effect);
}
