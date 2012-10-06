function WindowChoice(xTemp,yTemp,widthTemp,heightTemp,choice1,choice2,choice3,sizeTemp)
{
	Window.call(this,xTemp,yTemp,widthTemp,heightTemp,choice1+"<br><br>"+choice2+"<br><br>"+choice3,sizeTemp);
	this.choice=new Array(choice1,choice2,choice3);
	this.index=0;
	this.active=true;
}

/**
 * Legacy
 */
WindowChoice.prototype=new Window();


/**
 * Draws the text of the windows on the screen
 */
WindowChoice.prototype.draw=function()
{
	surface.font = this.size+"px pixel";
	surface.fillStyle = "rgb(83,122,62)";
	surface.drawImage(this.image,0, 0, 600, 600,this.x, this.y, this.width,this.height);	
	table=this.txt.split("<br>");
	for(w=0;w<table.length;w++)
	{
		surface.fillText(table[w],this.x+(10*this.width/100), this.y+(40)+w*(this.size/2));
	}
	surface.fillText(">",this.x+(6*this.width/100), this.y+(40)+(this.index*(this.size/2))*2);
	

}


/**
 * Allow the player to change to window choice's selected option
 */
WindowChoice.prototype.update=function()
{
	if(this.active)
	{
		if(Input.equals(40))
		{
			if(this.index<2)
					this.index=this.index+1;
			else
					this.index=0;
		}
			
		if(Input.equals(38))
		{
			if(this.index>0)
					this.index=this.index-1;
			else
					this.index=2;
		}
	}
}


/**
 * Return the window choice current index
 */
WindowChoice.prototype.getIndex=function()
{
		return this.index;
}
