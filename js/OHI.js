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
	this.list[2]=msgTemp;
	this.opacity=100;
}

/**
 * Draws the Over Head Informator on the screen
 **/
OHI.prototype.draw=function()
{
	x=this.owner.getX();
	y=this.owner.getY()-1.5;
	this.opacity-=2;
	r=255;
	v=50;
	b=50;
	if(r>=0)
	{

		for(i=0;i>(this.list.length*(-1));i--)
		{
			surface.font = "25px pixel";
			surface.fillStyle="rgba("+r+","+v+","+b+","+this.opacity/10+")";


			if(typeof this.list[(i*(-1))] !="undefined")
			{
				surface.fillText(this.list[(i*(-1))],Client.getXPos()+x*32, Client.getYPos()+y*32+(-26*i)-5);
				r=r-50;
				v=v-25;
				b=b-12.5;
			}

		}
	}
	if(this.opacity<=0)
		this.list=new Array();
}