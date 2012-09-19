function GameParameter()
{
	this.tiled=true;
	
}

/**
 * Sets if the stair's method draw have to draw the elements tiled or in text-characters
 */
GameParameter.prototype.setTiled=function()
{
		if(this.tiled==true)
			this.tiled=false;
		else
			this.tiled=true;
}

/**
 * Returns the tiled trigger
 */
GameParameter.prototype.isTiled=function()
{
	return this.tiled;
}
