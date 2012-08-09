
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
	this.weapon=this.race.weapon;
	this.onFire=false;
	this.fi=5;;

}

Monster.prototype.setLife=function(nb)
{
	this.life=nb;
}

Monster.prototype.draw=function()
{
	surface.font = "30px pixel";
	if(this.follow==false)
		surface.fillStyle="rgb(150,50,50)";

	if(this.follow==true)
		surface.fillStyle="rgb(250,10,10)";

	surface.fillText(this.img, this.x*32, this.y*32);
	if(this.onFire==true)
	{
		surface.fillStyle="rgb(250,50,50)";
		surface.fillText("W", this.x*32, this.y*32);
	}
}

Monster.prototype.turn=function(ennemy)
{
	//détermination des degats de base de l'arme
	total=0;
	for(i=0;i<this.weapon.Launch;i++)
	{
		lancer=Math.random()*6+1;
		lancer=Math.floor(lancer);
		total=total+lancer;
	}
	dmg=this.weapon.Atk+total*this.weapon.Lrm;
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

Monster.prototype.selectDir=function(grill,entityGrill)
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
				this.move("right",grill,entityGrill);
			break;
			case 2 :
				this.move("left",grill,entityGrill);	
			break;
			case 3 :
				this.move("down",grill,entityGrill);
			break;
			case 4 :
				this.move("up",grill,entityGrill);	
			break;


		}
	}
}


Monster.prototype.blocked=function(grill,entityGrill,x,y)
{
	if((grill[x][y]==1 || grill[x][y]==5 || grill[x][y]==6)&& entityGrill[x][y]==1)
	{
		if(grill[x][y]==5 || grill[x][y]==6)
		{
			this.onFire=true;
		}
		return false;
	}

	return true;



}

Monster.prototype.move=function(dir,grill,entityGrill)
{

	switch(dir)
	{
		case "right":
			if(this.blocked(grill,entityGrill,this.x+1,this.y)==false)
				this.x+=1;
				break;
		case "left":
			if(this.blocked(grill,entityGrill,this.x-1,this.y)==false)
				this.x-=1;
				break;
		case "down":
			if(this.blocked(grill,entityGrill,this.x,this.y+1)==false)
				this.y+=1;
				break;
		case "up" :		
			if(this.blocked(grill,entityGrill,this.x,this.y-1)==false)
				this.y-=1;
				break;
	}
	
}

Monster.prototype.fire=function()
{
	if(this.onFire==true)
	{		
			this.fi+=5;
			this.life-=(20*this.life_max/100);
			this.life=Math.floor(this.life);
			Msgzone.add(this.nam+" brule en criant.");
	}
}


Monster.prototype.setFire=function()
{
	this.onFire=true;
}
