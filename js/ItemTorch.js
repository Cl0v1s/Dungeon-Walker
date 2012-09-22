function ItemTorch(nameTemp,poundTemp,lightTemp,descTemp,priceTemp)
{
	ItemEquipement.call(this,nameTemp,poundTemp,"weapon",0,0,0,0,0,descTemp,priceTemp);
	this.light=lightTemp;
}

ItemTorch.prototype=new ItemEquipement();

/**
 * Add the equipment bonus to the owner of this equipment
 */
ItemTorch.prototype.wear=function(owner)
{
	value=owner.light;
	value=value+this.light;
	owner.light=value;
}

/**
 * remove the equipment bonus to the owner of this equipment
 */
ItemTorch.prototype.unWear=function(owner)
{
	value=owner.light;
	value=value-this.light;
	owner.light=value;
}
