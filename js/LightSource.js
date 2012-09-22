function LightSource(xTemp,yTemp,stairTemp,lightTemp)
{
	this.stair=stair;
	this.x=xTemp;
	this.y=yTemp;
	this.light=lightTemp;	
	this.visibleBlockList=new Array();
	this.lightZone();
}



/**
 * Return the lightSource's x coordinate
 */
LightSource.prototype.getX=function()
{
	return this.x;
}

/**
 * Return the lightSource's y coordinate
 */
LightSource.prototype.getY=function()
{
	return this.y;
}


/**
 * Checks if the LightSource can see the specified position
 */
LightSource.prototype.lightZone=function()
{
	this.visibleBlockList=new Array();
	this.visibleBlockList.push(new Array(this.x,this.y));
	for(d=0;d<this.visibleBlockList.length;d++)
	{
					
				cX=this.visibleBlockList[d][0];
				cY=this.visibleBlockList[d][1];
		
				if(this.canSeeBlockAt(cX+1,cY))
					this.visibleBlockList.push(new Array(cX+1,cY));
				
				if(this.canSeeBlockAt(cX-1,cY))
					this.visibleBlockList.push(new Array(cX-1,cY));
				
				if(this.canSeeBlockAt(cX,cY+1))
					this.visibleBlockList.push(new Array(cX,cY+1));
				
				if(this.canSeeBlockAt(cX,cY-1))
					this.visibleBlockList.push(new Array(cX,cY-1));				
	}

}

/**
 * Check if the block can bee seen by LightSource
 */
LightSource.prototype.canSeeBlockAt=function(xTemp,yTemp)
{
				if((this.stair.walkable(xTemp,yTemp) || this.stair.getMap()[xTemp][yTemp]==0) && !this.isVisible(xTemp,yTemp) && this.isInRange(xTemp,yTemp) && this.bresenham(xTemp,yTemp))
						return true;
				
				return false;
}

/**
 * Check if the block was already checked
 */
LightSource.prototype.isVisible=function(xTemp,yTemp)
{
	for(e=0;e<this.visibleBlockList.length;e++)
	{
		if(this.visibleBlockList[e]==null)
			continue;
			
		if(this.visibleBlockList[e][0]==xTemp && this.visibleBlockList[e][1]==yTemp)
		{
			return true;
		}
	}
	
	return false;
}



/**
 * Returns the LightSource's line of sight
 */
LightSource.prototype.isInRange=function(xTemp,yTemp)
{
	
	distance=(xTemp-this.x)*(xTemp-this.x)+(yTemp-this.y)*(yTemp-this.y);
	if(distance>this.light*this.light)
		return false;
	else
		return true;
		
}

/**
 * Checks if the line between the LightSource and the specified position is obstructed with the bresenham's algorythm
 */
LightSource.prototype.bresenham=function(xE,yE)
{
    var coordinatesArray = new Array();
    // Translate coordinates
    var x1 = this.x;
    var y1 = this.y;
    var x2 = xE;
    var y2 = yE;
    // Define differences and error check
    var dx = Math.abs(x2 - x1);
    var dy = Math.abs(y2 - y1);
    var sx = (x1 < x2) ? 1 : -1;
    var sy = (y1 < y2) ? 1 : -1;
    var err = dx - dy;
    // Set first coordinates
    coordinatesArray.push(new Array(x1, y1));
    // Main loop
    while (!((x1 == x2) && (y1 == y2))) {
      var e2 = err << 1;
      if (e2 > -dy) {
        err -= dy;
        x1 += sx;
      }
      if (e2 < dx) {
        err += dx;
        y1 += sy;
      }
      // Set coordinates
      coordinatesArray.push(new Array(x1, y1));
    }

	for(t=0;t<coordinatesArray.length;t++)
	{
		if(!this.stair.walkable(coordinatesArray[t][0],coordinatesArray[t][1]) && this.stair.getMap()[coordinatesArray[t][0]][coordinatesArray[t][1]]!=0)
			return false;
	}
	return true;
		
}
