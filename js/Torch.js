function Torch(xTemp,yTemp,stairTemp,itemTemp)
{
	this.x=xTemp;
	this.y=yTemp;
	this.stair=stairTemp;
	this.item=itemTemp;
	this.light=this.item.getLight();
	this.stair.addLightSource(new LightSource(this.x,this.y,this.stair,this.light));
}


/**
 * Draws the torch on the screen
 **/
Torch.prototype.draw=function()
{
	if(Parameters.isTiled())
	{
		TileSet.draw(Client.traduceInTileIndex(1,this.stair,this.x,this.y),Client.getXPos()+this.x*32,Client.getYPos()+this.y*32);
		TileSet.draw(21,Client.getXPos()+this.x*32,Client.getYPos()+this.y*32);
	}
	else
	{
		surface.fillStyle="rgb(129,81,6)";
		surface.fillText("!", Client.getXPos()+this.x*32, Client.getYPos()+this.y*32);
	}
}

/**
 * Returns the item that created the torch on the map
 **/ 
Torch.prototype.getItem=function()
{
	return this.item;
}


/**
 * Removes the torch from the map
 **/
Torch.prototype.remove=function()
{
	this.stair.removeLightSourceFromCoord(this.x,this.y);
	this.stair.map[this.x][this.y]=1;
	return this.item.getId();
}