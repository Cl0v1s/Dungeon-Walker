function Chest()
{
	this.back=new Window(0, 0,320,320,"","");
	this.owner=undefined;
	this.pound=20;
	this.examination=0;
	rand=Math.floor(Math.random()*10)+1;
	if(rand==1)
		this.locked=true;
	else
		this.locked=false;
	this.inventory=new Inventory(this);
	nb=Math.floor(Math.random()*10);
	for(n=0;n<nb;n++)
	{
		rand=Math.floor(Math.random()*Claw.getId());
		if(ItemList[rand] instanceof Item || ItemList[rand] instanceof ItemEquipement)
		{
			this.inventory.add(ItemList[rand].getId());
		}
	}
}

/**
 * Show a message in the chest's HUD
 * Useless
 */
Chest.prototype.sendMessage=function(msg)
{}

/**
 * Opens the chest
 */
Chest.prototype.open=function(owner)
{
	this.owner=owner;
	Scene=this;
}

/**
 * Opens the chest
 */
Chest.prototype.close=function(owner)
{
	this.owner=undefined;
	Scene=Client;
}


/**
 * Returns if the chest is locked or not
 */
Chest.prototype.isLocked=function()
{
	return this.locked;
}


/**
 * Returns the chest's weight capacity
 */
Chest.prototype.getPound=function()
{
		return this.pound;
}

/**
 * updates the chest GUI
 */
Chest.prototype.update=function()
{
	this.updateInput();
	clean();
	if(this.owner != undefined)
	{
		Client.drawEnvironement();
		this.owner.draw();
		this.back.draw();
		if(this.owner.messages != undefined)
		{
			surface.fillStyle = "rgb(0,0,0)";
			if(!Parameters.isTiled())
				surface.fillRect (this.owner.messages.x*32-100, (this.owner.messages.y-1)*32,600,500);
			this.owner.messages.draw();
		}
	}

	surface.font = "24px pixel";
	surface.fillStyle = "rgb(83,122,62)";
	surface.fillText("(e) examiner     (enter) recuperer",20,44);
	surface.font = "20px pixel";
	x=0;
	y=0;
	for(i=0;i<this.inventory.contains.length;i++)
	{
		y=y+1;
		surface.fillStyle = "rgb(150,150,150)";
		if(typeof this.inventory.contains[i] !="undefined")
		{
			if(this.inventory.contains[i].getName() == undefined)
			{
				this.inventory.remove(i);
				continue;
			}
		
			surface.fillText(this.inventory.contains[i].getName(),30+x*100,56+20*y);
		}
		else
			surface.fillText("vide",30+x*100,56+20*y);				

		if(y>=13)
		{
			y=0;
			x+=1;
		}
	}
	surface.fillStyle = "rgb(150,150,150)";

	surface.fillText(">",20+this.inventory.pointer_x*100,56+20*this.inventory.pointer_y);
	
	if(this.examination==1)
	{
		this.examine(this.inventory.index);
	}
	
}

/**
 * Checks the player's entries
 */
Chest.prototype.updateInput=function()
{
	if(Input.equals(69))
	{
			if(this.examination==0)
			{
				if(this.inventory.contains[this.inventory.index] != undefined)
					this.owner.sendMessage("Vous regardez l'objet "+this.inventory.contains[this.inventory.index].getName()+" de plus pres.");
				this.examination+=1;
				return;
			}
			if(this.examination==1)
			{
				this.examination-=1;
				return;
			}	
	}
	
	if(Input.equals(40))
		this.inventory.downList();
		
	if(Input.equals(38))
		this.inventory.upList();
		
	if(Input.equals(13))
		this.getObject();
		
	if(Input.equals(27))
	{
		this.owner.sendMessage("Vous refermez precausioneusement le coffre.");
		this.close(this.owner);
	}		
}


/**
 * Draw the selectionned item's descritption on the screen.
 */
Chest.prototype.examine=function(id)
{
		if(typeof this.inventory.contains[id]=="undefined")
		{
			this.examination=0;
			return;
		}

		this.back.draw();
		if(this.owner.messages != undefined)
		{
			surface.fillStyle = "rgb(0,0,0)";
			if(!Parameters.isTiled())
				surface.fillRect (this.owner.messages.x*32-100, (this.owner.messages.y-1)*32,600,500);
			this.owner.messages.draw();
		}
	surface.font = "24px pixel";
	surface.fillStyle = "rgb(83,122,62)";
	surface.fillText("(e) fermer     (enter) recuperer",20,44);
		surface.font="28px pixel";
		surface.fillText(this.inventory.contains[id].getName()+" :",20,50+44);
		surface.font="20px pixel";
		surface.fillStyle="rgb(150,150,150)";
		word=this.inventory.contains[id].getDesc().split("");
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
				surface.fillText(word[i],20+x*10, 50+28+44+y*20);
		}
}

/**
 * allow to go down in the list
 */
Chest.prototype.downList=function()
{
	if(this.inventory.index<this.inventory.contains.length-1)
	{
		this.inventory.index+=1;
		this.inventory.pointer_y+=1;
		if(this.inventory.pointer_y>=13 && this.inventory.index>=13)
		{
			this.inventory.pointer_x+=1;
			this.inventory.pointer_y=1;
		}
	}
}

/**
 * allow to go up in the list
 */
Chest.prototype.upList=function()
{
	if(this.inventory.index>0)
	{
		this.inventory.index-=1;
		this.inventory.pointer_y-=1;
		if(this.inventory.pointer_y<=1 && this.inventory.index==12)
		{
			this.inventory.pointer_x-=1;
			this.inventory.pointer_y=13;
		}
	}
}

/**
 * Removes an item from the chest's inventory list and puts it to the player's inventory
 */
Chest.prototype.getObject=function()
{
	if(this.owner.inventory.add(this.inventory.contains[this.inventory.index].getId()))
	{
		this.owner.sendMessage("Vous sortez l'objet du coffre et le glissez dans votre sac.");
		this.inventory.remove(this.inventory.index);
	}
	else
	{
		this.owner.sendMessage("Malheureusement l'objet n'entre pas dans votre sac.");
	}
}
