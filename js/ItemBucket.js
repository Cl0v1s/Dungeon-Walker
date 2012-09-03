function ItemBucket(nameTemp,poundTemp,descTemp,priceTemp)
{
	Item.call(this, nameTemp,poundTemp,descTemp,priceTemp,"special");	
}

/**
 * Legacy
 */
ItemBucket.prototype=new Item();

/**
 * Allow to use the item
 */
ItemBucket.prototype.use=function(owner)
{
	if(owner.isNear(3))
	{
		Motor.messages.add("Vous remplissez votre "+this.name+" d'eau.")
		return WaterBucket;
	}
	else
		Motor.messages.add("Vous remplissez votre "+this.name+" d'air.");
	
	return this; 
}
