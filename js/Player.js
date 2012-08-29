function Player(x,y,FOR,CON,TAI,DEX,race)
{
	this.x=x;
	this.y=y;
	this.nam="Conan";
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
	//autre
	this.score=0;
	this.inventory=new Inventory(this);
	this.fireInterval=5;
	this.fireFrame=0;
	this.previousTile=1;


	this.hi=this.class.Hi;
	this.si=20;
	

	

	surface.fillStyle="rgb(50,150,50)";


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
	this.fire();
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
		this.life-=(this.life*5/100);
		if(this.life>=10)
		{
			Motor.messages.add("La maladie vous affaiblie.");
		}
		else
		{
			Motor.messages.add("Vous toussez dans votre main et essuyez le sang qui s'y trouve sur votre pantalon.");
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
	grill=Motor.dungeon.getCurrentStair().map[this.x][this.y];
	if(grill==3)
	{
		if(this.soif<100)
		{
			this.soif+=1;
			Motor.messages.add("Vous buvez goulument l'eau limpide qui se trouve a vos pieds.");
		}
		else
		{
			Motor.messages.add("Vous n'avez pas soif.");		
		}
	}
	if(grill==4)
	{
		if(this.soif<100)
		{
			this.isSick=true;
			this.soif+=1;
			Motor.messages.add("Lorsque vous approchez le liquide de votre bouche, la puanteur assaille votre nez mais vous buvez tout de meme.");
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
	//détermination des degats de base de l'arme
	total=0;
	for(i=0;i<this.launch;i++)
	{
		lancer=Math.random()*6+1;
		lancer=Math.floor(lancer);
		total=total+lancer;
	}
	dmg=this.atk*this.force+total*this.lrm+Math.floor(this.dexterite/10);
	//bonus de zone
	zone=Math.floor((Math.random()*3)+1);
	switch(zone)
	{
		//coup à la tete
		case 1 :
		dmg=dmg+Math.floor((Math.random()*6)+1);
		break;
		//coup au torse
		case 2:
		dmg=dmg+Math.floor((Math.random()*4)+1);
		break;
		//coup au membres
		case 3:
		dmg=dmg+Math.floor((Math.random()*2)+1);
		break;
	}
	//parade de l'ennemi
	test=Math.floor((Math.random()*3)+1);
	//parade réussi 
	if(test==2)
	{
		parade=Math.floor((Math.random()*30)+1);
		parade=dmg*parade/100;
		dmg=dmg-Math.floor(parade);
	}
	ennemy.setLife(ennemy.life-dmg)
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
