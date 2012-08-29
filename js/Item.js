var ItemList=new Array();

function Item(nameTemp,poundTemp,descTemp,priceTemp)
{
		this.name=nameTemp;
		this.pod=poundTemp;
		this.desc=descTemp;
		this.price=priceTemp;
		this.id=ItemList.length;
		ItemList.push(this);
		//alert(this.name+":"+this.id);
}

/**
 * Returns the item's name
 */
Item.prototype.getName=function()
{
		return this.name;
}

/**
 * Returns the item's mass
 */
Item.prototype.getPod=function()
{
	return this.pod;
}

/**
 * returns the item's description
 */
Item.prototype.getDesc=function()
{
		return this.desc;
}


/**
 * returns the item's sell price
 */
Item.prototype.getPrice=function()
{
		return this.price;
}

/**
 * Returns the item's id.
 */
Item.prototype.getId=function()
{
	return this.id;
}

/**
 * Allow to use the item.
 */
Item.prototype.use=function()
{
		return this;
}

/**
 * Allow to cook the item.
 */
Item.prototype.cook=function()
{
		Motor.messages.add("Soudain l'objet "+this.name+" part en cendres...");
		return undefined;
}
