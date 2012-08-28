function Equipement()
{
	this.index=0;
	this.contains=new Array();
	this.contains[0]=undefined;
	this.contains[1]=undefined;
	this.contains[2]=undefined;
	this.contains[3]=undefined;
	this.contains[4]=undefined;
	this.contains["head"]=undefined;
	this.contains["torso"]=undefined;
	this.contains["weapon"]=undefined;
	this.contains["legs"]=undefined;
	this.contains["feet"]=undefined;
	this.pointer_x=0;
	this.examination=0;
}


Equipement.prototype.wear=function(zone,id)
{
	old=this.contains[zone];
	this.contains[zone]=Item[id];
	return old;
}

Equipement.prototype.update=function()
{
	clean();
	Motor.player.draw();
	Motor.dungeon.getCurrentStair().draw();
	this.contains[0]=this.contains["head"];
	this.contains[1]=this.contains["torse"];
	this.contains[2]=this.contains["weapon"];
	this.contains[3]=this.contains["legs"];
	this.contains[4]=this.contains["feet"];
	if(this.examination==1)
	{
		this.inputUpdate();
		this.examine(this.index);
		return;
	}
	this.inputUpdate();
	surface.fillStyle="rgb(0,0,0)";
	surface.fillRect (document.getElementById('canvas').width-321, 0,320,320);
	surface.fillRect (Motor.messages.x*32-100, (Motor.messages.y-1)*32,600,500);
	Motor.messages.draw();
	surface.font = "24px pixel";
	surface.fillStyle = "rgb(150,150,150)";
	surface.fillText("(e) examiner     (r) retirer",document.getElementById('canvas').width-310,24);
	surface.font = "20px pixel";
	try
	{
		surface.fillText("tete: "+this.contains[0].Name,document.getElementById('canvas').width-310,56);
	}
	catch(error)
	{
	}
	try
	{
		surface.fillText("torse: "+this.contains[1].Name,document.getElementById('canvas').width-310,56+20);
	}
	catch(error)
	{
	}
	try
	{
		surface.fillText("arme: "+this.contains[2].Name,document.getElementById('canvas').width-310,56+20*2);
	}
	catch(error)
	{
	}
	try
	{
		surface.fillText("jambes: "+this.contains[3].Name,document.getElementById('canvas').width-310,56+20*3);
	}
	catch(error)
	{
	}
	try
	{
		surface.fillText("pieds: "+this.contains[4].Name,document.getElementById('canvas').width-310,56+20*4);
	}
	catch(error)
	{
	}
	surface.fillText(">",document.getElementById('canvas').width-320,56+20*this.index);
}

Equipement.prototype.inputUpdate=function()
{
			if(Input.equals(40))
				player.equipement.downList();
			
			if(Input.equals(38))
				player.equipement.upList();
			
			if(Input.equals(27))
			{
				Motor.messages.add("Vous remettez votre equipement en place et vous vous redressez, pret a repartir.");
				Scene=Motor;
			}
			
			if(Input.equals(69))
			{
					if(this.examination==0)
					{
						Motor.messages.add("Vous regardez l'objet "+this.contains[this.index].Name+" de plus pres.");
						this.examination+=1;
						return;
					}
					if(this.examination==1)
					{
						this.examination-=1;
						return;
					}	
			}
}


Equipement.prototype.downList=function()
{
		this.index+=1;
		if(this.index>4)
			this.index=0;
}


Equipement.prototype.upList=function()
{
		this.index-=1;
		if(this.index<0)
			this.index=4;

}

Equipement.prototype.examine=function(id)
{
		if(typeof this.contains[id]=="undefined")
		{
			this.examination=0;
			return;
		}

		surface.fillStyle="rgb(0,0,0)";
		surface.fillRect (document.getElementById('canvas').width-321, 0,320,320);
		surface.fillRect (Motor.messages.x*32-100, Motor.messages.y*32,600,500);
		Motor.messages.draw();
		surface.font = "24px pixel";
		surface.fillStyle = "rgb(150,150,150)";
		surface.fillText("(e) fermer     (r) retirer",document.getElementById('canvas').width-315,24);
		surface.font="28px pixel";
		surface.fillText(this.contains[id].Name+" :",document.getElementById('canvas').width-315,56+24);
		surface.font="20px pixel";
		surface.fillStyle="rgb(150,150,150)";
		word=this.contains[id].Desc.split("");
		y=0;
		x=0;
		flag=15;
		jump=false;
		for (i=0;i<word.length;i++)
		{
			jump=false;
			if(i>flag && word[i]==" ")
			{
				y+=1;
				flag+=15;
				x=0;
				jump=true;
				
			}
			x+=1;
			if(jump==false)
				surface.fillText(word[i],document.getElementById('canvas').width-315+x*10, 56+28+24+y*20);
		}
}
