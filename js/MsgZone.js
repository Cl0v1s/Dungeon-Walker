function MsgZone(x,y)
{
	this.x=x;
	this.y=y;
	this.history=new Array();
	this.mode="normal";
}

MsgZone.prototype.draw=function()
{
	r=50;
	v=50;
 	b=50;
	for(i=0;i>(this.history.length*(-1));i--)
	{
		surface.font = "16px pixel";
		surface.fillStyle="rgb("+r+","+v+","+b+")";

		if(this.mode=="battle")
				surface.fillStyle="rgb(250,10,10)";

		if(typeof this.history[(i*(-1))] !="undefined")
		{
			surface.fillText(this.history[(i*(-1))], this.x*32, this.y*32+(i*-1)*17);
			r=r+50;
			v=v+50;
		 	b=b+50;
		}

	}
		surface.font = "32px pixel";
		surface.fillStyle="rgb(50,250,50)";
		if(player.life<=50)
			surface.fillStyle="rgb("+(200+player.life)+",50,50)";
		

		surface.fillText("Vie:"+player.life, this.x*32, this.y*32+6*17+20);
		surface.fillStyle="rgb(95,54,14)";		
		surface.fillText("Faim:"+Math.floor((-1*player.faim+100)), this.x*32+3*32, this.y*32+6*17+20);
		surface.fillStyle="rgb(16,124,117)";		
		surface.fillText("Soif:"+Math.floor((-1*player.soif+100)), this.x*32+7*32, this.y*32+6*17+20);
		surface.fillStyle="rgb(10,78,73)";		
		surface.fillText("Hygiene:"+Math.floor(player.hygiene), this.x*32+11*32, this.y*32+6*17+20);
		surface.fillStyle="rgb(263,225,255)";		
		surface.fillText("Sommeil:"+Math.floor((-1*player.sommeil+100)), this.x*32, this.y*32+6*17+20+32);
		surface.fillStyle="rgb(255,181,33)";		
		surface.fillText("Score:"+player.score, this.x*32+7*32, this.y*32+6*17+20+32);
		
		if(Scene == Motor)
		{
			surface.font = "21px pixel";
			surface.fillStyle="rgb(0,0,0)";
			surface.fillRect (0, 0,document.getElementById('canvas').width,34);
			surface.fillStyle="rgb(50,50,50)";
			surface.fillText("[i] Inventory   [e] Equipement   [p] Prepare   [l] Lap   [s]Sleep   [enter] Interact", 10, 32);	
		}


}

MsgZone.prototype.add=function(msg)
{
	for(i=1;i<(this.history.length);i++)
	{
		this.history[i-1]=this.history[i];
	}
	this.history[5]=msg;

}

MsgZone.prototype.changeMode=function(value)
{
	this.mode=value;
}
