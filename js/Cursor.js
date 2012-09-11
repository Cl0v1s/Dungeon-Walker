function Cursor(xTemp,yTemp,lightTemp)
{
	this.x=xTemp;
	this.y=yTemp;
	this.xOrigin=this.x;
	this.yOrigin=this.y;
	this.light=lightTemp;
}


/**
 * Moves the cursor
 */
Cursor.prototype.move=function(dir)
{
	side=this.light;
	originX=Math.round(this.xOrigin-side/2);
	originY=Math.round(this.yOrigin-side/2);
	switch(dir)
	{
		case "right":
			if(this.x<originX+side)
				this.x+=1;
		break;
		case "left":
			if(this.x>originX)
				this.x-=1;
		break;
		case "up":
			if(this.y>originY)
				this.y-=1;
		break;
		case "down":
			if(this.y<originY+side)
				this.y+=1;
		break;	
	}
}

/**
 * Returns the cursor's xPos
 */
Cursor.prototype.getX=function()
{
	return this.x;
}

/**
 * Returns the cursor's yPos
 */
Cursor.prototype.getY=function()
{
	return this.y;
}


/**
 * Return the cursor's origin point
 */ 
Cursor.prototype.getOrigin=function()
{
		return new Array(xOrigin,yOrigin);
}


/**
 * Draws the cursor on the screen
 */
Cursor.prototype.draw=function()
{
		surface.font = "30px pixel";
		surface.fillStyle="rgb(250,0,0)";
		surface.fillText("[ ]", Client.getXPos()+this.x*32-2, Client.getYPos()+this.y*32-2);	
}
