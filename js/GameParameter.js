function GameParameter()
{
	this.tiled=true;
	this.help=true;
}

/**
 * Sets if the stair's method draw have to draw the elements tiled or in text-characters
 */
GameParameter.prototype.setHelped=function()
{
		if(this.help==true)
			this.help=false;
		else
			this.help=true;
}

/**
 * Returns the tiled trigger
 */
GameParameter.prototype.isHelped=function()
{
	return this.help;
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
