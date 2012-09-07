function ItemLighter(nameTemp,poundTemp,descTemp,priceTemp)
{
	Item.call(this, nameTemp,poundTemp,descTemp,priceTemp,"special");
}

/**
 * Legacy
 */
ItemLighter.prototype=new Item();

/**
 * Allow to use the item
 */
ItemLighter.prototype.use=function(owner)
{
	x=owner.getX();
	y=owner.getY();
	if(owner.stair.getMap()[x][y+1] == 1)
	{
		rand=Math.floor(Math.random()*2)+1;
		if(rand==1)
		{
			owner.sendMessage("Apres avoir produit vainement quelques etincelles vous reussissez enfin a allumer un petit feu.");
			owner.stair.setFire(x,y+1);
		}
		else
			owner.sendMessage("Vos efforts sont vain, vous n'arrivez pas a obtenir quelque chose d'acceptable...");
	}
	else
		owner.sendMessage("Ne soyez pas idiot, il est impossible d'allumer un feu la dessus !");
	
	return this; 
}

