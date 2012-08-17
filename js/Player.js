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
	surface.fillText(this.img, this.x*32, this.y*32);
	if(this.onFire==true)
	{
		surface.fillStyle="rgb(250,50,50)";
		surface.fillText("W", this.x*32, this.y*32);
	}
}
////////////////////////////////////////////////////////////////

Player.prototype.move=function(dir)
{
	this.weapon=this.equipement.contains["weapon"];
	for(a=0;a<Motor.getCurrentRoom().monsters.length;a++)
	{
		if(Motor.getCurrentRoom().monsters[a] !=undefined)
		{
			if((Motor.getCurrentRoom().monsters[a].x-1==this.x && Motor.getCurrentRoom().monsters[a].y==this.y) || (Motor.getCurrentRoom().monsters[a].x+1==this.x && Motor.getCurrentRoom().monsters[a].y==this.y) || (Motor.getCurrentRoom().monsters[a].y-1==this.y && Motor.getCurrentRoom().monsters[a].x==this.x) || (Motor.getCurrentRoom().monsters[a].y+1==this.y && Motor.getCurrentRoom().monsters[a].x==this.x))
				{
					return;

				}
		}
	}

					Motor.getCurrentRoom().entityGrill[this.x][this.y]=1;
					switch(dir)
					{
						case "right":
							if(Motor.getCurrentRoom().blocked(this.x+1,this.y)==false)
								this.x+=1;
								break;
						case "left":
							if(Motor.getCurrentRoom().blocked(this.x-1,this.y)==false)
								this.x-=1;
								break;
						case "down":
							if(Motor.getCurrentRoom().blocked(this.x,this.y+1)==false)
								this.y+=1;
								break;
						case "up" :		
							if(Motor.getCurrentRoom().blocked(this.x,this.y-1)==false)
								this.y-=1;
								break;
					}
					Motor.getCurrentRoom().entityGrill[this.x][this.y]=2;

	//messages en fonction du type de sol
	if(Motor.getCurrentRoom().grill[this.x][this.y]==3)
	{
		this.onFire=false;
		message="Vous marchez dans une petite mare d'eau";
		if(Motor.getCurrentRoom().biome=="dungeon")
		{
				message=message+", cree annees apres annees par l'infiltration.";
		}
		else
			message=messages+".";
		Motor.messages.add(message);
	}
	if(Motor.getCurrentRoom().grill[this.x][this.y]==4)
	{
		this.onFire=false;
		Motor.messages.add("Quelque chose a frole vos jambes...BRRR...");
	}
	if(Motor.getCurrentRoom().grill[this.x][this.y]==5 || Motor.getCurrentRoom().grill[this.x][this.y]==6)
	{
		this.onFire=true;
		Motor.messages.add("Idiot! vous avez marchez sur le feu!");
	}
				
	
	
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
	grill=Motor.getCurrentRoom().grill[this.x][this.y];
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
////////////////////////////////////////////////////////////////////
/*
Player.prototype.changeRoom=function(dir)
{
	switch(dir)
	{
		case "right":
			Motor.xPosRoom+=1;
			if(Motor.getCurrentRoom()==undefined)
				Motor.generateRoom(undefined,undefined,undefined,this.y);

			found=0;
			for(i=0;i<19;i++)
			{
				for(u=0;u<10;u++)
				{
					if(Motor.getCurrentRoom().getGrill(i,u)=="doorLeft")
					{
						found=1;
						this.setX(i);
						this.setY(u);
					}
				}
			}

			if(found==0)
			{

				//Motor.getCurrentRoom().createDoor("right");
				Motor.messages.add("Oh ! un passage secret !");
				found=1;
			}
	
			break;
		case "left" :
			Motor.xPosRoom-=1;
			if(Motor.getCurrentRoom()==undefined)
				Motor.generateRoom(undefined,this.y,undefined,undefined);

			found=0;
			for(i=0;i<19;i++)
			{
				for(u=0;u<10;u++)
				{
					if(Motor.getCurrentRoom().getGrill(i,u)=="doorRight")
					{
						found=1;
						this.setX(i);
						this.setY(u);
					}
				}
			}
			if(found==0)
			{
				//Motor.getCurrentRoom().createDoor("left");
				Motor.messages.add("Oh ! un passage secret !");
				found=1;
			}	
			break;
		case "down" :
			Motor.yPosRoom+=1;
			if(Motor.getCurrentRoom()==undefined)
				Motor.generateRoom(undefined,undefined,this.x,undefined);

			found=0;
			for(i=0;i<19;i++)
			{
				for(u=0;u<10;u++)
				{
					if(Motor.getCurrentRoom().getGrill(i,u)=="doorUp")
					{
						found=1;
						this.setX(i);
						this.setY(u);
					}
				}
			}
			if(found==0)
			{
				//Motor.getCurrentRoom().createDoor("down");
				Motor.messages.add("Oh ! un passage secret !");
				found=1;
			}	
			break;
		case "up" :
			Motor.yPosRoom-=1;
			if(Motor.getCurrentRoom()==undefined)
				Motor.generateRoom(this.x,undefined,undefined,undefined);

			found=0;
			for(i=0;i<19;i++)
			{
				for(u=0;u<10;u++)
				{
					if(Motor.getCurrentRoom().getGrill(i,u)=="doorDown")
					{
						found=1;
						this.setX(i);
						this.setY(u);
					}
				}
			}
			if(found==0)
			{
				//Motor.getCurrentRoom().createDoor("up");
				Motor.messages.add("Oh ! un passage secret !");
				found=1;
			}	
			break;
		
	}
}
 */
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



Player.prototype.kill=function()
{
	gameOver();
}



