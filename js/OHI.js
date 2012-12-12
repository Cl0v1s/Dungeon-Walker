function OHI(ownerTemp)
{
	this.owner=ownerTemp;
	this.list=new Array();
	this.opacity=0;
}

/**
 * Adds a information to the queued informations
 **/
OHI.prototype.send=function(msgTemp)
{
	for(i=1;i<(this.list.length);i++)
	{
		this.list[i-1]=this.list[i];
	}
	this.list[1]=new Array(msgTemp,0);
	this.opacity=100;
}

/**
 * Draws the Over Head Informator on the screen
 **/
OHI.prototype.draw=function()
{
	x=this.owner.getX();
	y=this.owner.getY();
	this.opacity-=2;
		for(i=0;i>(this.list.length*(-1));i--)
		{
			surface.font = "25px pixel";
			if(this.owner instanceof Player)
				surface.fillStyle="rgba(255,10,10,"+(this.opacity-30*i)/100+")";
			else 
				surface.fillStyle="rgba(10,10,255,"+(this.opacity-30*i)/100+")";

			if(typeof this.list[(i*(-1))] !="undefined" && typeof this.list[(i*(-1))][0] !="undefined" && this.list[(i*(-1))][0] !="-undefined" )
			{
				surface.fillText(this.list[(i*(-1))][0],Client.getXPos()+x*32, Client.getYPos()+y*32-this.list[(i*(-1))][1]);
				this.list[(i*(-1))][1]+=2;
			}

		}
	if(this.opacity<=0)
		this.list=new Array();
}