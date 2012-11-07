function ItemSeed(nameTemp,poundTemp,descTemp,priceTemp)
{
	Item.call(this, nameTemp,poundTemp,descTemp,priceTemp,"grass");
}


/**
 * Legacy
 */
ItemSeed.prototype=new Item();

/**
 * Allow to use the item
 */
ItemSeed.prototype.use=function(owner)
{
	x=owner.getX();
	y=owner.getY();
	if(owner.stair.getMap()[x][y+1] == 1 && owner.stair.getRoomAt(x,y+1).getBiome()=="plain")
	{
		owner.stair.map[x][y+1]=new Grass(x,y+1,owner.stair);
		owner.sendMessage("Vous creusez un petit trou dans le sol meuble et vous y plantez la graine.");
	}
	else
		owner.sendMessage("Ne soyez pas idiot, il est impossible de planter quoi que ce soit ici !");
	
	return undefined; 
}