//////////////////////////////////////////////////////////////////////////////////////
//class Player
//////////////////////////////////////////////////////////////////////////////////////
//par chaipokoi
//crée le : 6/05/2012
//modifiée le : 16/06/2012
//-17/06/2012
//-20/06/2012
/////////////////////////////////////////////////////////////////////////////////////
//permet de gérer le joueur local,
//Fonctionnalités:
//-déplacement dans la salle=move(dir)
//-changement de salle=changeRoom(dir)
//-affichage à l'écran=draw()
//-récupération des positions x et y du joueur=getX() et getY()
//-régalage des positions x et y  du joueur
//-soigne le joueur a l'intervalle donné par la classe du joueur
//-modifie les statistiques de survie du joueur
//-permet l'action de boire afin de remonter la statiqtique soif 
//-gère la maladie
//-gère l'état "en feu"
//-gère l'ouverture de l'inventaire
//-gère la mort
////////////////////////////////////////////////////////////////////////////////////


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
	this.img=this.class.Img;
	this.equipement=new Equipement();
	this.equipement.wear("weapon",(this.class.Weapon.Id+100));
	this.weapon=this.equipement.contains["weapon"];
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
	this.inventory=new Inventory(15);

	this.hi=this.class.Hi;
	this.fi=5;
	this.si=20;
	

	

	surface.fillStyle="rgb(50,150,50)";



}
//////////////////////////////////////////////////////////////

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


	surface.font = "30px pixel";
	surface.fillStyle="rgb(50,150,50)";
	surface.fillText(this.img, Motor.getXPos()+this.x*32, Motor.getYPos()+this.y*32);
	if(this.onFire==true)
	{
		surface.fillStyle="rgb(250,50,50)";
		surface.fillText("W", this.x*32, this.y*32);
	}
}
////////////////////////////////////////////////////////////////

Player.prototype.move=function(dir)
{
	stair=Motor.dungeon.getCurrentStair();
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
}
//////////////////////////////////////////////////////////////////:

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

/////////////////////////////////////////////////////////////////////
Player.prototype.fire=function()
{
	if(this.onFire==true)
	{		
			this.life-=10;
			Motor.messages.add("Vous brulez a petit feu.");
	}
}
/////////////////////////////////////////////////////////////////////

Player.prototype.heal=function()
{
	if(this.isSick==false && this.faim>50)
	{
	heal=Math.floor(this.life*this.class.Hr/100);
	this.life+=heal;
	}

}
////////////////////////////////////////////////////////////////////

Player.prototype.changeStat=function()
{
	this.soif-=(100/5);
	this.sommeil-=(50/3);
	this.faim-=30+(Math.floor(Math.random()*20));
}
////////////////////////////////////////////////////////////////////

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
////////////////////////////////////////////////////////////////////

Player.prototype.setX=function(x)
{
	this.x=x;
}

Player.prototype.setY=function(y)
{
	this.y=y;
}

Player.prototype.getX=function()
{
	return this.x;
}

Player.prototype.getY=function()
{
	return this.y;
}

Player.prototype.setLife=function(nb)
{
	this.life=nb;
}

////////////////////////////////////////////////////////////////////////////////////////

Player.prototype.turn=function(ennemy)
{
	//détermination des degats de base de l'arme
	total=0;
	for(i=0;i<this.weapon.Launch;i++)
	{
		lancer=Math.random()*6+1;
		lancer=Math.floor(lancer);
		total=total+lancer;
	}
	dmg=this.weapon.Atk+total*this.weapon.Lrm+Math.floor(this.dexterite/10);
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

////////////////////////////////////////////////////////////////////////////////////////
Player.prototype.openInventory=function()
{
		Motor.messages.add("Vous vous asseyez sur le sol et vous ouvrez votre sac.");
		Scene=this.inventory;
}

////////////////////////////////////////////////////////////////////////////////////////
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
 * Kill the player
 */
Player.prototype.kill=function()
{
	Motor.gameOver();
}



