//////////////////////////////////////////////////////////////////////////////////////
//class Room
//////////////////////////////////////////////////////////////////////////////////////
//par chaipokoi
//crée le : 7/05/2012
//modifiée le :
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
"UnknowColor" :  "rgb(255,255,255)"
}



function Room(top,left,down,right)
{
	this.width=0;
	this.height=0;
	this.biome="dungeon";
	this.tile=undefined;
	this.doors=0;
	this.monsters=new Array();
	this.frame=0;
	this.fireFrame=0;
	this.water=false;
	//paramétrage de la police 
	surface.font = "32px pixel";
	//création de la grille
	this.grill=new Array();
	this.entityGrill=new Array();
	for(i=0;i<19;i++)
	{
		this.grill[i]=new Array();
		this.entityGrill[i]=new Array();
		for(u=0;u<10;u++)
		{
			this.grill[i][u]=0;
			this.entityGrill[i][u]=1;
		}
	}
	this.grill;
	//détermination de la taille de la salle
	while (this.width<3)
	{
		this.width=Math.floor((Math.random()*16)+1);
	}
	while(this.height<3)
	{
	this.height=Math.floor((Math.random()*8)+1);
	}
	this.x=Math.floor(19*32/2-this.width*32/2);
	this.y=Math.floor(10*32/2-this.height*32/2);

	//génaration de la salle en fonction du biome, qui lui même est déterminé a partir de celui des salles avoisi
	if(this.biome=="dungeon")
	{
	
		this.tile=DungeonTile;
		surface.fillStyle = this.tile.WallColor;
		//mur haut
		placed=false;
		for(i=0;i<this.width;i++)
		{
			if(placed==false)
				door=Math.floor(Math.random()*this.width+2)-1;

			if(i !=door)
			{
				surface.fillText("#", this.x+i*32, this.y);
				this.grill[Math.floor((this.x+i*32)/32)][Math.floor(this.y/32)]=2;
			}
			if(down !=undefined && i>1)
			{
				door=i;
			}

			if(i==door && placed==false)
			{
				this.doors+=1;
				placed=true;
				this.grill[Math.floor((this.x+i*32)/32)][Math.floor(this.y/32)]="doorUp";
				door=100;
			}	
		}
		//mur bas
		placed=false;
		for(i=0;i<this.width;i++)
		{
			if(placed==false)
			{
				door=0;
				while(door==0)
				{
					door=Math.floor(Math.random()*this.height-1);
				}
					
			}

			if(i !=door)
			{
			surface.fillText("#", this.x+i*32, this.y+this.height*32);
			this.grill[Math.floor((this.x+i*32)/32)][Math.floor((this.y+this.height*32)/32)]=2;
			}
			if(top !=undefined && i>1)
			{
				door=i;
			}

			if(i==door && placed==false)
			{
				this.doors+=1;
				placed=true;
				this.grill[Math.floor((this.x+i*32)/32)][Math.floor((this.y+this.height*32)/32)]="doorDown";
				door=100;
			}	
		}
		//mur gauche
		placed=false;
		for(i=0;i<this.height;i++)
		{
			if(placed==false)
			{
				door=0;
				while(door==0)
				{
					door=Math.floor(Math.random()*this.height-1);
				}
					
			}
			if(i !=door)
			{
			surface.fillText("#", this.x, this.y+i*32);
			this.grill[Math.floor(this.x/32)][Math.floor((this.y+i*32)/32)]=2;
			}
			if(right !=undefined && i>1)
			{
				door=i;
			}

			if(i==door && placed==false)
			{
				this.doors+=1;
				placed=true;
				this.grill[Math.floor(this.x/32)][Math.floor((this.y+i*32)/32)]="doorLeft";
				door=100;
			}	
		}
		//mur droite
		placed=false;
		for(i=0;i<this.height+1;i++)
		{
			if(placed==false)
			{
				door=0;
				while(door==0)
				{
					door=Math.floor(Math.random()*this.height-1);
				}
					
			}

			if(i !=door)
			{
			surface.fillText("#", this.x+this.width*32, this.y+i*32);
			this.grill[Math.floor((this.x+this.width*32)/32)][Math.floor((this.y+i*32)/32)]=2;
			}
			if(left !=undefined && i>1)
			{
				door=i;
			}

			if(i==door && placed==false)
			{
				this.doors+=1;
				placed=true;
				this.grill[Math.floor((this.x+this.width*32)/32)][Math.floor((this.y+i*32)/32)]="doorRight";
				door=100;
			}	
			
		}
	



		//"remplissage" de la salle
		for(i=Math.floor(this.x/32)+1;i<Math.floor(this.x/32)+this.width;i++)
		{
			for(u=Math.floor(this.y/32)+1;u<Math.floor(this.y/32)+this.height;u++)
			{
				this.grill[i][u]=1;
			}		
		}



		
		
  		//gestion de l'eau
		rand=Math.random()*20+1;
		rand=Math.floor(rand);
		if(rand>=1 && rand<=5)
		{
			i=Math.floor((Math.random()*(this.width-Math.floor(this.x/32)))+1)+Math.floor(this.x/32);
			u=Math.floor((Math.random()*(this.height-Math.floor(this.y/32)))+1)+Math.floor(this.y/32);
			if(this.grill[i][u] !=2 && this.grill[i][u] !="doorRight" && this.grill[i][u] !="doorLeft" && this.grill[i][u] !="doorUp" && this.grill[i][u] !="doorDown" && i>Math.floor(this.x/32))
				this.grill[i][u]=3;
				this.water=true;

		}
			boucle=1;
			for(i=Math.floor(this.x/32)+1;i<Math.floor(this.x/32)+this.width;i++)
			{
		
					for(u=Math.floor(this.y/32)+1;u<Math.floor(this.y/32)+this.height;u++)
					{
						rand=Math.random()*10+1;
						rand=Math.floor(rand);
						if(rand>1 && this.grill[i][u]==3)
						{
							if(this.grill[i-1][u] !=2 && this.grill[i-1][u] !="doorRight" && this.grill[i-1][u] !="doorLeft" && this.grill[i-1][u] !="doorUp" && this.grill[i-1][u] !="doorDown")
							{
								this.grill[i-1][u]=3;
							}
							if(this.grill[i+1][u] !=2 && this.grill[i+1][u] !="doorRight" && this.grill[i+1][u] !="doorLeft" && this.grill[i+1][u] !="doorUp" && this.grill[i+1][u] !="doorDown")
							{
								this.grill[i+1][u]=3;
							}
							if(this.grill[i][u-1] !=2 && this.grill[i][u-1] !="doorRight" && this.grill[i][u-1] !="doorLeft" && this.grill[i][u-1] !="doorUp" && this.grill[i][u-1] !="doorDown")
							{
								this.grill[i][u-1]=3;
							}
							if(this.grill[i][u+1] !=2 && this.grill[i][u+1] !="doorRight" && this.grill[i][u+1] !="doorLeft" && this.grill[i][u+1] !="doorUp" && this.grill[i][u+1] !="doorDown")
							{
								this.grill[i][u+1]=3;
							}
						}
			
					
				}
			}

	}

	//création des monstres
	monster_nb=Math.floor(Math.random()*((Math.floor(this.width*this.height/8))+1));
	for (z=0;z<monster_nb;z+=1)
	{
		monster_type=Math.floor(Math.random()*Bestiaire.length);
		monster_x=0;
		monster_y=this.y;
		monster_x=Math.floor((this.x+32)/32)+1+(Math.floor(Math.random()*this.width-2));
		monster_y=Math.floor((this.y+32)/32)+1+(Math.floor(Math.random()*this.height-2));

		if(this.grill[monster_x][monster_y]==1 && this.entityGrill[monster_x][monster_y]==1)
		{
			score=0;
			if(typeof player !="undefined")
				score=player.score

			if(Bestiaire[monster_type].Biome==this.biome && score>=Bestiaire[monster_type].Level)
			{
				this.entityGrill[monster_x][monster_y]=2;
				this.monsters[z]=new Monster(monster_x,monster_y,Bestiaire[monster_type]);
			}

		}
	}
	

	if(typeof RoomList[Xr-1*100+Yr] !="undefined" || typeof RoomList[Xr+1*100+Yr] !="undefined" || typeof RoomList[Xr*100+Yr+1] !="undefined" || typeof RoomList[Xr*100+Yr-1] !="undefined")
	{
		rand=Math.floor((Math.random()*2)+1);
		switch(rand)
		{
			case 1:	
			Msgzone.add("Vous entrez dans une salle sombre apparament rectangulaire,");
			break;
			case 2:
			Msgzone.add("Encore une salle de meme apparence...");
			break;
		}

	}
	else
	{
		Msgzone.add("Vous entrez dans une salle sombre apparament rectangulaire,");
	}

	if(this.water==true)
	{
		rand=Math.floor((Math.random()*2)+1);
		switch(rand)
		{
			case 1:
				Msgzone.add("Il flotte dans l'air comme une odeur de moisissure."); 
				break;
			case 2:
				Msgzone.add("Vous placez votre mains sur un mur puis vous la retiree, entierement humide.");
				break;
		}
	}
		
	if(this.doors==1)
	{
		rand=Math.floor((Math.random()*2)+1);
		switch(rand)
		{
			case 1:
				Msgzone.add("C'est un cul de sac !");
				break;
			case 2:
				Msgzone.add("La salle s'avere etre une petit alcove.");
				break;
		}
	}
	if(this.doors==0)
	{
		Msgzone.add("Vous etes enferme ici a tout jamais ! Mouhahahahahahaha !");
	}
	rand=Math.floor((Math.random()*1));
	if(this.monsters.length>0+rand)
	{
		rand=Math.floor((Math.random()*3)+1);
		rand=rand*10;
		rand=Math.floor(rand*this.monsters.length/100);
		Msgzone.add("Vous pouvez sentir les mouvements des plusieurs monstres, ils sont peut-etre "+(this.monsters.length-rand)+".");
		Msgzone.add("Restez sur vos gardes !");
	}
	else
	{
		Msgzone.add("Vous pensez etre seul dans la piece...");	
	}

			
}


Room.prototype.draw=function(xD,yD)
{

	if(xD==undefined || yD==undefined)
	{
		xD=0;
		yD=0;
	}

	surface.font = "32px pixel";
	for(i=0;i<19;i++)
	{
		for(u=0;u<10;u++)
		{
			switch(this.grill[i][u])
			{
				case 2 :
				surface.fillStyle = this.tile.WallColor;
				surface.fillText(this.tile.Wall,xD+i*32, yD+u*32);			
				break;
				case 3 :
				surface.fillStyle = this.tile.Water_1Color;
				surface.fillText(this.tile.Water_1,xD+i*32, yD+u*32);
				this.frame+=1;
				if(this.frame>=(550+Math.floor(Math.random()*51)))
				{	
				this.grill[i][u]=4;	
				this.frame=0;
				}	
				break;	
				case 4 :
				surface.fillStyle = this.tile.Water_2Color;
				surface.fillText(this.tile.Water_2,xD+i*32, yD+u*32);	
				this.frame+=1;
				if(this.frame>=(250+Math.floor(Math.random()*51)))
				{	
				this.grill[i][u]=3;	
				this.frame=0;
				}	
				break;	
				case 5 :
				surface.fillStyle = this.tile.Fire_1Color;
				surface.fillText(this.tile.Fire_1,xD+i*32, yD+u*32);
				this.fireFrame+=1;
				if(this.fireFrame>=(30+Math.floor(Math.random()*51)))
				{	
				rand=Math.floor(Math.random()*11);
				if(rand==0)
				{
					this.grill[i][u]=1;
					break;
				}
				else
				{
					this.grill[i][u]=6;	
					this.fireFrame=0;
				}

				}	
				break;	
				case 6:
				surface.fillStyle = this.tile.Fire_2Color;
				surface.fillText(this.tile.Fire_2,xD+i*32, yD+u*32);	
				this.fireFrame+=1;
				if(this.fireFrame>=(30+Math.floor(Math.random()*51)))
				{	
				this.grill[i][u]=5;	
				this.fireFrame=0;
				}	
				break;			
			}
			if(this.entityGrill[i][u]>=10)
			{
				surface.fillText("$",xD+i*32, yD+u*32);				
			}
		}
	}
	for(i=0;i<this.monsters.length;i++)
	{
		if(this.monsters[i] !=undefined)
			this.monsters[i].draw();
	}	
}

Room.prototype.blocked=function(x,y)
{

	if(this.grill[x][y]=="doorUp")
	{
		player.changeRoom("up");
	}
	if(this.grill[x][y]=="doorDown")
	{
		player.changeRoom("down");
	}
	if(this.grill[x][y]=="doorLeft")
	{
		player.changeRoom("left");
	}
	if(this.grill[x][y]=="doorRight")
	{
		player.changeRoom("right");
	}
	
	if(this.entityGrill[x][y]>=10)
	{
		player.inventory.add((this.entityGrill[x][y]-10));
	}


	if(this.grill[x][y]!=2 && this.entityGrill[x][y]!=2)
	{
		return false;
	}

	return true;

}

Room.prototype.research=function(bloc)
{
	for(i=0;i<19;i++)
	{
		for(u=0;u<10;u++)
		{
			if(this.grill[i][u]==bloc)
			{
				response=new Array();
				response[1]=i;
				response[2]=u;
				return response;
			}
		}
	}
	return false;
}

Room.prototype.moveMonsters=function()
{
	for(a=0;a<this.monsters.length;a++)
	{

	

		battle=0;
		if(this.monsters[a] !=undefined)
		{
			if (Tour>=this.monsters[a].fi)
			{
				this.monsters[a].fire();
				if(this.monsters[a].life<=0)
					this.monsters[a]=undefined;	
			}	
				for(m=0;m<this.monsters.length;m++)
				{
					if(a !=m && this.monsters[m] !=undefined)
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


				if((this.monsters[a].x-1==player.x && this.monsters[a].y==player.y) || (this.monsters[a].x+1==player.x && this.monsters[a].y==player.y) || (this.monsters[a].y-1==player.y && this.monsters[a].x==player.x) || (this.monsters[a].y+1==player.y && this.monsters[a].x==player.x))
				{
					battle=1;
					result=this.battle(player,this.monsters[a]);
					if(result==false)
					{
						drop=Math.floor(Math.random()*2)+1;
						player.score+=this.monsters[a].race.Score;
						if(drop==1)
						{
							rand=Math.floor(Math.random()*this.monsters[a].race.Drop.length);
							drop=this.monsters[a].race.Drop[rand];
							drop=drop+10;
							this.entityGrill[this.monsters[a].x][this.monsters[a].y]=drop;
						}
						this.monsters[a]=undefined;
					}
					if(result==true)
					{
						gameOver();
					}

				}
				
				if(battle==0)
				{
					this.entityGrill[this.monsters[a].x][this.monsters[a].y]=1;
					this.monsters[a].selectDir(this.grill,this.entityGrill);
					this.entityGrill[this.monsters[a].x][this.monsters[a].y]=2;
				}
		

		}
	}

}


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
	Msgzone.changeMode("battle");
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

	Msgzone.add(sentence);
	Msgzone.add(sentence2);

	if(fighter1.life<=0)
	{
		this.entityGrill[fighter1.x][fighter1.y]=1;
		Msgzone.add(fighter2.nam+" a vaincu "+fighter1.nam+".");
		Msgzone.changeMode("normal");
		return true;
	}

	if(fighter2.life<=0)
	{
		this.entityGrill[fighter2.x][fighter2.y]=1;
		Msgzone.add(fighter1.nam+" a vaincu "+fighter2.nam+".");
		Msgzone.changeMode("normal");
		return false;
	}


	

}


Room.prototype.createDoor=function(wall)
{
	
	if(wall=="right")
	{
			door=Math.floor(Math.random()*this.height-1);	
				this.doors+=1;
				placed=true;
				player.setX(Math.floor(this.x/32));
				player.setY(Math.floor((this.y+door*32)/32));
				this.grill[Math.floor(this.x/32)][Math.floor((this.y+door*32)/32)]="doorLeft";
				door=100;
				
		

	}
	if(wall=="left")
	{
			door=Math.floor(Math.random()*this.height-1);	
				this.doors+=1;
				placed=true;
				player.setX(Math.floor((this.x+this.width*32)/32));
				player.setY(Math.floor((this.y+door*32)/32));
				this.grill[Math.floor((this.x+this.width*32)/32)][Math.floor((this.y+door*32)/32)]="doorRight";
				door=100;	
			
		
	}
	if(wall=="up")
	{
			door=Math.floor(Math.random()*this.height-1);
				this.doors+=1;
				placed=true;
				player.setX(Math.floor((this.x+this.width*32)/32));
				player.setY(Math.floor((this.y+door*32)/32));
				this.grill[Math.floor((this.x+this.width*32)/32)][Math.floor((this.y+door*32)/32)]="doorRight";
				door=100;	

	}
	if(wall=="down")
	{
		placed=false;
		for(i=0;i<this.width;i++)
		{
			if(placed==false)
				door=Math.floor(Math.random()*this.width+2)-1;

			if(i==door && placed==false)
			{
				this.doors+=1;
				placed=true;
				player.setX(Math.floor((this.x+i*32)/32));
				player.setY(Math.floorMath.floor(this.y/32)+1);
				this.grill[Math.floor((this.x+i*32)/32)][Math.floor(this.y/32)]="doorUp";
				door=100;
			}	
		}


	}
}

Room.prototype.setFire=function(entity)
{
	rand=Math.floor(Math.random()*6);
	if(rand>=1 && rand<=3)
	{
		if(this.grill[entity.x][entity.y+1]==1)
		{
			this.grill[entity.x][entity.y+1]=5;
			Msgzone.add("Vous reussissez a mettre le feu au sol.")
		}
		else
		{
			Msgzone.add("Vous ne pouvez pas allumer un feu ici !");
		}
	}
	else
	{
			Msgzone.add("Une petite braise apparait...Mais ne survit malheureusement pas.")
	}
	action();
	clean();
	this.draw();

}

Room.prototype.getGrill=function(x,y)
{
	return this.grill[x][y];
}


Room.prototype.getBiome= function()
{
	return this.biome;
}

Room.prototype.getX= function()
{
	return this.x;
}

Room.prototype.setX= function(x)
{
	this.x=x;
}


Room.prototype.getY= function()
{
	return this.y;
}

Room.prototype.getH= function()
{
	return this.height;
}

Room.prototype.getW= function()
{
	return this.width;
}

Room.prototype.setEntityGrill= function(x,y,valeur)
{
	this.entityGrill[x][y]=valeur;
}


