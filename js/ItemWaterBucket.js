function ItemWaterBucket(nameTemp,poundTemp,descTemp,priceTemp)
{
	Item.call(this, nameTemp,poundTemp,descTemp,priceTemp,"special");	
}

/**
 * Legacy
 */
ItemWaterBucket.prototype=new Item();

/**
 * Allow to use the item
 */
ItemWaterBucket.prototype.use=function(owner)
{
	if(owner.isNear(6))
	{
		Motor.messages.add("Vous videz votre "+this.name+" sur la lave.")
		Motor.messages.add("Dans un nuage de vapeur, la lave se solidifie pour former de la pierre.");
		x=owner.getX();
		y=owner.getY();
		if(Motor.dungeon.getCurrentStair().map[x-1][y]==6)
			Motor.dungeon.getCurrentStair().map[x-1][y]=1;
		else if(Motor.dungeon.getCurrentStair().map[x+1][y]==6)
			Motor.dungeon.getCurrentStair().map[x+1][y]=1;
		else if(Motor.dungeon.getCurrentStair().map[x][y-1]==6)
			Motor.dungeon.getCurrentStair().map[x][y-1]=1;
		else if(Motor.dungeon.getCurrentStair().map[x][y+1]==6)
			Motor.dungeon.getCurrentStair().map[x][y+1]=1;
	}
	else if(owner.isNear(4))
	{
		Motor.messages.add("Vous videz votre "+this.name+" sur le feu.")
		Motor.messages.add("Dans un nuage de vapeur, le feu s'eteint.");
		x=owner.getX();
		y=owner.getY();
		if(Motor.dungeon.getCurrentStair().map[x-1][y]==4)
			Motor.dungeon.getCurrentStair().map[x-1][y]=1;
		else if(Motor.dungeon.getCurrentStair().map[x+1][y]==4)
			Motor.dungeon.getCurrentStair().map[x+1][y]=1;
		else if(Motor.dungeon.getCurrentStair().map[x][y-1]==4)
			Motor.dungeon.getCurrentStair().map[x][y-1]=1;
		else if(Motor.dungeon.getCurrentStair().map[x][y+1]==4)
			Motor.dungeon.getCurrentStair().map[x][y+1]=1;
	}
	else
	{
		Motor.messages.add("Vous videz l'eau contenue dans votre "+this.name+" sur votre tete.");
		owner.hygiene+=Math.round((50*owner.hygiene)/100);
		owner.onFire=false;
	}
	
	return Bucket; 
}
