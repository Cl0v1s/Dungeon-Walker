function ItemScroll(nameTemp,poundTemp,descTemp,priceTemp)
{
	Item.call(this, nameTemp,poundTemp,descTemp,priceTemp,"special");
	this.spell=SpellList[Math.floor(Math.random()*SpellList.length)];
	this.window=new Window(608/2-500/2,520/2-150/2,500,150,this.spell.getName()+"<br><br>"+this.spell.getDescription(),"20");
	this.owner=undefined;
}


/**
 * Legacy
 */
ItemScroll.prototype=new Item();

/**
 * Allow to use the item
 */
ItemScroll.prototype.use=function(owner)
{
	owner.sendMessage("Vous ouvrez le parchemin et essayez de dechiffrer son contenu.");
	this.owner=owner;
	Scene=this;
}

/**
 * Allow to close the item
 */
ItemScroll.prototype.close=function()
{
	this.owner.sendMessage("Vous ouvrez le parchemin et essayez de dechiffrer son contenu.");
	if(Math.floor(Math.random()*2)+1==1)
	{
		this.owner.sendMessage("Vous rangez precaussioneseument le parchemin dans votre sac.");
		this.owner.inventory.add(this.getId());
	}
	this.owner.sendMessage("Le parchemin tombe en poussiere entre vos mains...");
	Scene=this.owner.inventory;
}

/**
 * Show the scroll's content
 **/
ItemScroll.prototype.update=function()
{
	this.window.draw();
	if(Input.equals(27))
		this.close();
}