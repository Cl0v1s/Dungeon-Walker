function ItemFood(nameTemp,poundTemp,valueTemp,cookResultTemp,descTemp,priceTemp)
{
	Item.call(this, nameTemp,poundTemp,descTemp,priceTemp);
	this.value=valueTemp;
	this.cookResult=cookResultTemp;	
}

/**
 * Legacy
 */
ItemFood.prototype=new Item();

/**
 * Allow to eat the item
 */
ItemFood.prototype.use=function(owner)
{
	faim=owner.getHungry();
	faim=faim+this.value;
	owner.setHungry(faim);
	Motor.messages.add("Vous manger attivement le "+this.name+".");
	return undefined;
}

/**
 * Allow to cook the item.
 */
ItemFood.prototype.cook=function()
{
		Motor.messages.add("Quelques minutes plus tard vous retirez un delicieux morceau de "+this.cookResult.getName()+" des flammes.");
		return this.cookResult;
}


