function Equipement(ownerTemp)
{
	this.index=0;
	this.owner=ownerTemp;
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

/**
 * Place the specified object in it's slot
 */
Equipement.prototype.wear=function(object)
{
	old=this.contains[object.getPlace()];
	if(old != undefined)
		old.unWear(this.owner);
	object.wear(this.owner);
	this.contains[object.getPlace()]=object;
	return old;
}

/**
 * Removes the current object of the equipment list and sends it to the owner's inventory
 */
Equipement.prototype.remove=function()
{
		object=this.contains[this.index];
		if(object != undefined)
		{
			object.unWear(this.owner);
			this.owner.inventory.add(object.getId());
		}
		this.contains[object.getPlace()]=undefined;
}

/**
 * Update the equipment GUI
 */
Equipement.prototype.update=function()
{
	clean();
	Client.player.draw();
	Client.dungeon.getCurrentStair().draw();
	this.contains[0]=this.contains["head"];
	this.contains[1]=this.contains["torso"];
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
	if(this.owner.messages != undefined)
	{
		surface.fillRect (this.owner.messages.x*32-100, (this.owner.messages.y-1)*32,600,500);
		this.owner.messages.draw();
	}
	surface.font = "24px pixel";
	surface.fillStyle = "rgb(150,150,150)";
	surface.fillText("(e) examiner     (r) retirer",document.getElementById('canvas').width-310,24);
	surface.font = "20px pixel";
	try
	{
		surface.fillText("tete: "+this.contains[0].getName(),document.getElementById('canvas').width-310,56);
	}
	catch(error)
	{
	}
	try
	{
		surface.fillText("torse: "+this.contains[1].getName(),document.getElementById('canvas').width-310,56+20);
	}
	catch(error)
	{
	}
	try
	{
		surface.fillText("arme: "+this.contains[2].getName(),document.getElementById('canvas').width-310,56+20*2);
	}
	catch(error)
	{
	}
	try
	{
		surface.fillText("jambes: "+this.contains[3].getName(),document.getElementById('canvas').width-310,56+20*3);
	}
	catch(error)
	{
	}
	try
	{
		surface.fillText("pieds: "+this.contains[4].getName(),document.getElementById('canvas').width-310,56+20*4);
	}
	catch(error)
	{
	}
	surface.fillText(">",document.getElementById('canvas').width-320,56+20*this.index);
}

/**
 * Update the playe's entries
 */
Equipement.prototype.inputUpdate=function()
{
			if(Input.equals(40))
				this.downList();
			
			if(Input.equals(38))
				this.upList();
			
			if(Input.equals(27))
			{
				this.owner.sendMessage("Vous remettez votre equipement en place et vous vous redressez, pret a repartir.");
				Scene=Client;
			}
			
			if(Input.equals(82))
				this.remove();
				
			
			if(Input.equals(69))
			{
					if(this.examination==0)
					{
						this.owner.sendMessage("Vous regardez l'objet "+this.contains[this.index].getName()+" de plus pres.");
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

/**
 * Allow the player to go donw in the list
 */
Equipement.prototype.downList=function()
{
		this.index+=1;
		if(this.index>4)
			this.index=0;
}

/**
 * Allow the player to go up in the list
 */
Equipement.prototype.upList=function()
{
		this.index-=1;
		if(this.index<0)
			this.index=4;

}

/**
 * Draw the current object's description on the screen
 */ 
Equipement.prototype.examine=function(id)
{
		if(typeof this.contains[id]=="undefined")
		{
			this.examination=0;
			return;
		}

		surface.fillStyle="rgb(0,0,0)";
		surface.fillRect (document.getElementById('canvas').width-321, 0,320,320);
		if(this.owner.messages != undefined)
		{
			surface.fillRect (this.owner.messages.x*32-100, this.owner.messages.y*32,600,500);
			this.owner.messages.draw();
		}
		surface.font = "24px pixel";
		surface.fillStyle = "rgb(150,150,150)";
		surface.fillText("(e) fermer     (r) retirer",document.getElementById('canvas').width-315,24);
		surface.font="28px pixel";
		surface.fillText(this.contains[id].getName()+" :",document.getElementById('canvas').width-315,56+24);
		surface.font="20px pixel";
		surface.fillStyle="rgb(150,150,150)";
		word=this.contains[id].getDesc().split("");
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
