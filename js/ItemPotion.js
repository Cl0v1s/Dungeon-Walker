function ItemPotion(nameTemp,poundTemp,effectLengthTemp,lightTemp,forceTemp,constTemp,tailleTemp,dexTemp,lifeTemp,launchTemp,lrmTemp,descTemp,priceTemp)
{
	Item.call(this,nameTemp,poundTemp,descTemp,priceTemp,"potion");
	this.effectLength=effectLengthTemp;
	this.light=lightTemp;
	this.force=forceTemp;
	this.con=constTemp;
	this.tail=tailleTemp;
	this.dex=dexTemp;
	this.life=lifeTemp;
	this.launch=launchTemp;
	this.lrm=lrmTemp;
}

/**
 * Legacy
 */
ItemPotion.prototype=new Item();


/**
 * Allow the player to drink the item
 */
ItemPotion.prototype.use=function(owner)
{
	Motor.messages.add("Vous buvez la potion jusqu'a la derniere goutte malgre son gout repugnant.");
	effect=new StatEffect(owner,this.light,this.force,this.con,this.tail,this.dex,this.life,this.launch,this.lrm,this.effectLength);
	owner.addEffect(effect);
}
