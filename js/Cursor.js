function Cursor(xTemp,yTemp,lightTemp,ownerTemp)
{
	this.x=xTemp;
	this.y=yTemp;
	this.xOrigin=this.x;
	this.yOrigin=this.y;
	this.light=lightTemp;
	this.owner=ownerTemp;
}


/**
 * Moves the cursor
 */
Cursor.prototype.move=function(dir)
{
	switch(dir)
	{
		case "right":
			if(this.isInRange(this.x+1,this.y) && this.owner.isInRange(this.x+1,this.y))
				this.x+=1;
		break;
		case "left":
			if(this.isInRange(this.x-1,this.y) && this.owner.isInRange(this.x-1,this.y))
				this.x-=1;
		break;
		case "up":
			if(this.isInRange(this.x,this.y-1) && this.owner.isInRange(this.x,this.y-1))
				this.y-=1;
		break;
		case "down":
			if(this.isInRange(this.x,this.y+1) && this.owner.isInRange(this.x,this.y+1))
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
 * Returns the cursor's line of sight
 */
Cursor.prototype.isInRange=function(xTemp,yTemp)
{
	
	distance=(xTemp-this.x)*(xTemp-this.x)+(yTemp-this.y)*(yTemp-this.y);
	if(distance>this.light*this.light)
		return false;
	else
		return true;
		
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
