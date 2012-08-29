function ItemEquipement(nameTemp,poundTemp,placeTemp,atkTemp,constTemp,dexTemp,lrmTemp,launchTemp,descTemp,priceTemp)
{
	Item.call(this,nameTemp,poundTemp,descTemp,priceTemp);
	this.place=placeTemp;
	this.atk=atkTemp;
	this.cons=constTemp;
	this.dex=dexTemp;
	this.lrm=lrmTemp;
	this.launch=launchTemp;
}

ItemEquipement.prototype=new Item();

/**
 * Returns the emplacement of this equipment
 */
ItemEquipement.prototype.getPlace=function()
{
	return this.place;
}


/**
 * Return the attack amount of this equipment
 */
ItemEquipement.prototype.getAtk=function()
{
	return this.atk;
}

/**
 * Returns the constitution bonus
 */
ItemEquipement.prototype.getConstBonus=function()
{
	return this.cons;
}

/**
 * Returns the dexterity bonus
 */
ItemEquipement.prototype.getDexBonus=function()
{
	return this.dex;
}

/**
 * Returns the Lrm amount of this equipment
 */
ItemEquipement.prototype.getLRM=function()
{
	return this.lrm;
}

/**
 * Returns the launch number of this equipment
 */
ItemEquipement.prototype.getLaunch=function()
{
	return this.launch;
}

/**
 * Add the equipment bonus to the owner of this equipment
 */
ItemEquipement.prototype.wear=function(owner)
{
		value=owner.getAtk();
		value=value+this.atk;
		owner.setAtk(value);
		
		value=owner.getLrm();
		value=value+this.lrm;
		owner.setLrm(value);

		value=owner.getLaunch();
		value=value+this.launch;
		owner.setLaunch(value);
		
		value=owner.getConst();
		value=value+this.cons;
		owner.setConst(value);
		
		value=owner.getDex();
		value=value+this.dex;
		owner.setDex(value);
}

/**
 * remove the equipment bonus to the owner of this equipment
 */
ItemEquipement.prototype.unWear=function(owner)
{
		value=owner.getAtk();
		value=value-this.atk;
		owner.setAtk(value);
		
		value=owner.getLrm();
		value=value-this.lrm;
		owner.setLrm(value);

		value=owner.getLaunch();
		value=value-this.launch;
		owner.setLaunch(value);
		
		value=owner.getConst();
		value=value-this.cons;
		owner.setConst(value);
		
		value=owner.getDex();
		value=value-this.dex;
		owner.setDex(value);
}

