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
		owner.sendMessage("Vous remplissez votre "+this.name+" d'eau.")
		return WaterBucket;
	}
	else
		owner.sendMessage("Vous remplissez votre "+this.name+" d'air.");
	
	return this; 
}
