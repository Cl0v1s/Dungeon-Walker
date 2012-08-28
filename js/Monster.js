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
	this.fi=5;

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
	Motor.dungeon.getCurrentStair().map[this.x][this.y]=1;
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
	Motor.dungeon.getCurrentStair().map[this.x][this.y]=0;
	
}


/**
 * If the onFire trigger is on true, then this method apply damages on the monster.
 */
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
