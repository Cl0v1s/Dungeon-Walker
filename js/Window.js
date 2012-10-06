function Window(xTemp,yTemp,widthTemp,heightTemp,txtTemp,sizeTemp)
{
	this.image=new Image();
	this.image.src="graphics/box.png";
	this.x=xTemp;
	this.y=yTemp;
	this.width=widthTemp;
	this.height=heightTemp;
	this.txt=txtTemp;
	this.size=sizeTemp;
}


/**
 * Draws the text of the windows on the screen
 */
Window.prototype.draw=function()
{
	surface.font = this.size+"px pixel";
	surface.fillStyle = "rgb(83,122,62)";
	surface.drawImage(this.image,0, 0, 600, 600,this.x, this.y, this.width,this.height);	
	table=this.txt.split("<br>");
	for(w=0;w<table.length;w++)
	{
		surface.fillText(table[w],this.x+(6*this.width/100), this.y+(20*this.height/100)+w*(this.size/2));
	}
}


/**
 * Changes the window's position
 */
Window.prototype.placeAt=function(xTemp,yTemp)
{
	this.x=xTemp;
	this.y=yTemp;
}
