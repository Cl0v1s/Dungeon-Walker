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
	owner.sendMessage("Vous buvez "+this.name+" jusqu'a la derniere goutte malgre son gout repugnant.");
	owner.addEffect(new StatEffect(owner,this.name,this.light,this.force,this.con,this.tail,this.dex,this.life,this.launch,this.lrm,this.effectLength));
}
