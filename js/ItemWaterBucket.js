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
		owner.sendMessage("Vous videz votre "+this.name+" sur la lave.")
		owner.sendMessage("Dans un nuage de vapeur, la lave se solidifie pour former de la pierre.");
		x=owner.getX();
		y=owner.getY();
		if(owner.stair.map[x-1][y]==6)
			owner.stair.map[x-1][y]=1;
		else if(owner.stair.map[x+1][y]==6)
			owner.stair.map[x+1][y]=1;
		else if(owner.stair.map[x][y-1]==6)
			owner.stair.map[x][y-1]=1;
		else if(owner.stair.map[x][y+1]==6)
			owner.stair.map[x][y+1]=1;
	}
	else if(owner.isNear(4))
	{
		owner.sendMessage("Vous videz votre "+this.name+" sur le feu.")
		owner.sendMessage("Dans un nuage de vapeur, le feu s'eteint.");
		x=owner.getX();
		y=owner.getY();
		if(owner.stair.map[x-1][y]==4)
			owner.stair.map[x-1][y]=1;
		else if(owner.stair.map[x+1][y]==4)
			owner.stair.map[x+1][y]=1;
		else if(owner.stair.map[x][y-1]==4)
			owner.stair.map[x][y-1]=1;
		else if(owner.stair.map[x][y+1]==4)
			owner.stair.map[x][y+1]=1;
	}
	else
	{
		owner.sendMessage("Vous videz l'eau contenue dans votre "+this.name+" sur votre tete.");
		owner.hygiene+=Math.round((50*owner.hygiene)/100);
		owner.onFire=false;
	}
	
	return Bucket; 
}
