function Equipement()
{
	this.index=0;
	this.contains=new Array();
	this.contains["head"]=undefined;
	this.contains["torso"]=undefined;
	this.contains["leg"]=undefined;
	this.contains["feet"]=undefined;
	this.contains["weapon"]=undefined;
	this.pointer_x=0;
	this.pointer_y=1;
	this.examination=0;
}


Equipement.prototype.wear=function(zone,id)
{
	old=this.contains[zone];
	this.contains[zone]=Item[id];
	return old;
}

Equipement.prototype.open=function()
{
	player.draw();
	surface.fillStyle="rgb(0,0,0)";
	surface.fillRect (document.getElementById('canvas').width-320, 0,320,320);
	surface.fillRect (Msgzone.x*32-100, (Msgzone.y-1)*32,600,500);
	Msgzone.draw();
	surface.font = "24px pixel";
	surface.fillStyle = "rgb(150,150,150)";
	surface.fillText("(e) examiner     (r) enlever",document.getElementById('canvas').width-315,24);
	surface.font = "20px pixel";
	try
	{
		surface.fillText("tete: "+this.contains["head"].Name,document.getElementById('canvas').width-315,56);
	}
	catch(error)
	{
	}
	try
	{
		surface.fillText("torse: "+this.contains["torso"].Name,document.getElementById('canvas').width-315,56+20);
	}
	catch(error)
	{
	}
	try
	{
		surface.fillText("arme: "+this.contains["weapon"].Name,document.getElementById('canvas').width-315,56+20*2);
	}
	catch(error)
	{
	}
	try
	{
		surface.fillText("jambes: "+this.contains["leg"].Name,document.getElementById('canvas').width-315,56+20*3);
	}
	catch(error)
	{
	}
	try
	{
		surface.fillText("pieds: "+this.contains["feet"].Name,document.getElementById('canvas').width-315,56+20*4);
	}
	catch(error)
	{
	}
	surface.fillText(">",document.getElementById('canvas').width-320,56+20*this.pointer_y);







}


Equipement.prototype.downList=function()
{
	if(this.index<this.contains.length-1)
	{
		this.index+=1;
		this.pointer_y+=1;
		if(this.pointer_y>=4 && this.index>=4)
		{
			this.index=0;
			this.pointer_y=1;
		}
	}
}


Equipement.prototype.upList=function()
{
	if(this.index>0)
	{
		this.index-=1;
		this.pointer_y-=1;
		if(this.pointer_y<=1)
		{
			this.index=4;
			this.pointer_y=5;
		}
	}

}
