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
	surface.fillText("0", this.x*32, this.y*32);


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
	for(a=0;a<RoomList[Xr*100+Yr].monsters.length;a++)
	{
		if(RoomList[Xr*100+Yr].monsters[a] !=undefined)
		{
			if((RoomList[Xr*100+Yr].monsters[a].x-1==this.x && RoomList[Xr*100+Yr].monsters[a].y==this.y) || (RoomList[Xr*100+Yr].monsters[a].x+1==this.x && RoomList[Xr*100+Yr].monsters[a].y==this.y) || (RoomList[Xr*100+Yr].monsters[a].y-1==this.y && RoomList[Xr*100+Yr].monsters[a].x==this.x) || (RoomList[Xr*100+Yr].monsters[a].y+1==this.y && RoomList[Xr*100+Yr].monsters[a].x==this.x))
				{
					return;

				}
		}
	}

					RoomList[Xr*100+Yr].entityGrill[this.x][this.y]=1;
					switch(dir)
					{
						case "right":
							if(RoomList[Xr*100+Yr].blocked(this.x+1,this.y)==false)
								this.x+=1;
								break;
						case "left":
							if(RoomList[Xr*100+Yr].blocked(this.x-1,this.y)==false)
								this.x-=1;
								break;
						case "down":
							if(RoomList[Xr*100+Yr].blocked(this.x,this.y+1)==false)
								this.y+=1;
								break;
						case "up" :		
							if(RoomList[Xr*100+Yr].blocked(this.x,this.y-1)==false)
								this.y-=1;
								break;
					}
					RoomList[Xr*100+Yr].entityGrill[this.x][this.y]=2;

	//messages en fonction du type de sol
	if(RoomList[Xr*100+Yr].grill[this.x][this.y]==3)
	{
		this.onFire=false;
		Msgzone.add("Vous marchez dans une petite mare d'eau, cree annees apres annees par l'infiltration.");
	}
	if(RoomList[Xr*100+Yr].grill[this.x][this.y]==4)
	{
		this.onFire=false;
		Msgzone.add("Quelque chose a frole vos jambes...BRRR...");
	}
	if(RoomList[Xr*100+Yr].grill[this.x][this.y]==5 || RoomList[Xr*100+Yr].grill[this.x][this.y]==6)
	{
		this.onFire=true;
		Msgzone.add("Idiot! vous avez marchez sur le feu!");
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
			Msgzone.add("La maladie vous affaiblie.");
		}
		else
		{
			Msgzone.add("Vous toussez dans votre main et essuyez le sang qui s'y trouve sur votre pantalon.");
		}
	}
}

/////////////////////////////////////////////////////////////////////
Player.prototype.fire=function()
{
	if(this.onFire==true)
	{		
			this.life-=10;
			Msgzone.add("Vous brulez a petit feu.");
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
	grill=RoomList[Xr*100+Yr].grill[this.x][this.y];
	if(grill==3)
	{
		if(this.soif<100)
		{
			this.soif+=1;
			Msgzone.add("Vous buvez goulument l'eau limpide qui se trouve a vos pieds.");
		}
		else
		{
			Msgzone.add("Vous n'avez pas soif.");		
		}
	}
	if(grill==4)
	{
		if(this.soif<100)
		{
			this.isSick=true;
			this.soif+=1;
			Msgzone.add("Lorsque vous approchez le liquide de votre bouche, la puanteur assaille votre nez mais vous buvez tout de meme.");
		}
		else
		{
			Msgzone.add("Vous n'avez pas soif.");	
		}
	}
	if(grill !=3 && grill !=4)
	{
		Msgzone.add("Il n'y a pas d'eau a vos pieds.");
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

Player.prototype.changeRoom=function(dir)
{
	switch(dir)
	{
		case "right":
			Xr+=1;
			if(RoomList[Xr*100+Yr]==undefined)
				createRoom(undefined,undefined,undefined,this.y);

			found=0;
			for(i=0;i<19;i++)
			{
				for(u=0;u<10;u++)
				{
					if(RoomList[Xr*100+Yr].getGrill(i,u)=="doorLeft")
					{
						found=1;
						this.setX(i);
						this.setY(u);
					}
				}
			}

			if(found==0)
			{

				RoomList[Xr*100+Yr].createDoor("right");
				Msgzone.add("Oh ! un passage secret !");
				found=1;
			}
	
			break;
		case "left" :
			Xr-=1;
			if(RoomList[Xr*100+Yr]==undefined)
				createRoom(undefined,this.y,undefined,undefined);

			found=0;
			for(i=0;i<19;i++)
			{
				for(u=0;u<10;u++)
				{
					if(RoomList[Xr*100+Yr].getGrill(i,u)=="doorRight")
					{
						found=1;
						this.setX(i);
						this.setY(u);
					}
				}
			}
			if(found==0)
			{
				RoomList[Xr*100+Yr].createDoor("left");
				Msgzone.add("Oh ! un passage secret !");
				found=1;
			}	
			break;
		case "down" :
			Yr+=1;
			if(RoomList[Xr*100+Yr]==undefined)
				createRoom(undefined,undefined,this.x,undefined);

			found=0;
			for(i=0;i<19;i++)
			{
				for(u=0;u<10;u++)
				{
					if(RoomList[Xr*100+Yr].getGrill(i,u)=="doorUp")
					{
						found=1;
						this.setX(i);
						this.setY(u);
					}
				}
			}
			if(found==0)
			{
				RoomList[Xr*100+Yr].createDoor("down");
				Msgzone.add("Oh ! un passage secret !");
				found=1;
			}	
			break;
		case "up" :
			Yr-=1;
			if(RoomList[Xr*100+Yr]==undefined)
				createRoom(this.x,undefined,undefined,undefined);

			found=0;
			for(i=0;i<19;i++)
			{
				for(u=0;u<10;u++)
				{
					if(RoomList[Xr*100+Yr].getGrill(i,u)=="doorDown")
					{
						found=1;
						this.setX(i);
						this.setY(u);
					}
				}
			}
			if(found==0)
			{
				RoomList[Xr*100+Yr].createDoor("up");
				Msgzone.add("Oh ! un passage secret !");
				found=1;
			}	
			break;
		
	}
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



Player.prototype.kill=function()
{
	gameOver();
}



