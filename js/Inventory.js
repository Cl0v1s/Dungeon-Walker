
function Inventory(owner)
{
	this.owner=owner;
	this.size=0;
	this.index=0;
	this.contains=new Array();
	this.pointer_x=0;
	this.pointer_y=1;
	this.examination=0;
}

/**
 * Adds an object to the inventory list
 */
Inventory.prototype.add=function(id)
{
	if(this.size<this.owner.getPound())
	{
		for(i=0;i<=this.contains.length;i++)
		{
			if(typeof this.contains[i]=="undefined")
			{
				this.contains[i]=ItemList[id];
				this.owner.sendMessage("Vous placez l'objet "+ItemList[id].getName()+" dans votre sac.");
				this.size+=ItemList[id].getPod();
				return true;
			}
		}
	}
	else
	{
		this.owner.sendMessage("Vous ne pouvez plus rien porter, vous laissez donc l'objet sur le sol.");
		return false;
	}
}

/**
 * Update the inventory GUI
 */
Inventory.prototype.update=function()
{
	this.inputUpdate();
	clean();
	Client.player.draw();
	Client.drawEnvironement();
	surface.fillStyle="rgb(0,0,0)";
	surface.fillRect (0, 0,320,320);
	if(this.owner.messages != undefined)
	{
		surface.fillRect (this.owner.messages.x*32-100, (this.owner.messages.y-1)*32,600,500);
		this.owner.messages.draw();
	}
	surface.font = "24px pixel";
	surface.fillStyle = "rgb(150,150,150)";
	surface.fillText("(e) examiner     (enter) utiliser",5,24);
	//if(!(this.owner.previousTile instanceof Chest)) 
		surface.fillText("(c) cuire        (d) lacher",5,48);
	//else
	//	surface.fillText("(c) cuire        (d) placer dans le coffre",5,48);		
		
	surface.font = "20px pixel";
	x=0;
	y=0;
	for(i=0;i<this.contains.length;i++)
	{
		y=y+1;
		surface.fillStyle = "rgb(150,150,150)";
		if(typeof this.contains[i] !="undefined")
		{
			surface.fillText(this.contains[i].getName(),20+x*100,56+20*y);
		}
		else
			surface.fillText("vide",20+x*100,56+20*y);				

		if(y>=13)
		{
			y=0;
			x+=1;
		}
	}
	surface.fillStyle = "rgb(150,150,150)";

	surface.fillText(">",0+this.pointer_x*100,56+20*this.pointer_y);
	
	if(this.examination==1)
	{
		this.examine(this.index);
	}

}

/**
 * Update the player's input
 */
Inventory.prototype.inputUpdate=function()
{
	if(Input.equals(68))
	{
		this.owner.sendMessage("Vous abandonnez l'objet "+this.contains[this.index].getName()+".");
		this.remove(this.index);
	}
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
	
	if(Input.equals(40))
		this.downList();
		
	if(Input.equals(38))
		this.upList();
		
	if(Input.equals(13))
		this.use();
		
	if(Input.equals(67))
		this.cook();
		
	if(Input.equals(27))
	{
		this.size=0;
		for(i=0;i<this.contains.length;i++)
		{
			if(this.contains[i]!=undefined)
			{
				this.size+=this.contains[i].getPod();
			}
		}
		this.owner.sendMessage("Vous fermez votre sac et vous vous redressez pret a repartir.");
		Scene=Client;
	}	
}

/**
 * allow to go down in the list
 */
Inventory.prototype.downList=function()
{
	if(this.index<this.contains.length-1)
	{
		this.index+=1;
		this.pointer_y+=1;
		if(this.pointer_y>=13 && this.index>=13)
		{
			this.pointer_x+=1;
			this.pointer_y=1;
		}
	}
}

/**
 * allow to go up in the list
 */
Inventory.prototype.upList=function()
{
	if(this.index>0)
	{
		this.index-=1;
		this.pointer_y-=1;
		if(this.pointer_y<=1 && this.index==12)
		{
			this.pointer_x-=1;
			this.pointer_y=13;
		}
	}

}

/**
 * Allow the player to use an item. 
 * This method call the use method of the target item.
 */
Inventory.prototype.use=function()
{
	if(typeof this.contains[this.index] !="undefined")
	{
		if(this.contains[this.index] instanceof ItemEquipement)
		{
			this.contains[this.index]=this.owner.equipement.wear(this.contains[this.index]);
		}
		else
		{
			this.contains[this.index]=this.contains[this.index].use(this.owner);
		}
		this.examination=0;
	}
}

/**
 * Allow the player to cook a item.
 * This method call the cook method of the target item.
 */
Inventory.prototype.cook=function()
{
	if(typeof this.contains[this.index] !="undefined")
	{
		x=this.owner.getX();
		y=this.owner.getY();
		if((this.owner.getStair().getMap()[x-1][y]==4 || this.owner.getStair().getMap()[x+1][y]==4 || this.owner.getStair().getMap()[x][y+1]==4 || this.owner.getStair().getMap()[x][y-1]==4))
		{
			this.owner.sendMessage("Vous placez l'objet "+this.contains[this.index].getName()+" au dessus du feu et patientez...");
			if(this.owner.getTalents().canCook())
			{
				this.contains[this.index]=this.contains[this.index].cook(this.owner);
				this.examination=0;
			}
		}
		else if((this.owner.getStair().getMap()[x-1][y]==6 || this.owner.getStair().getMap()[x+1][y]==6 || this.owner.getStair().getMap()[x][y+1]==6 || this.owner.getStair().getMap()[x][y-1]==6))
		{
			this.owner.sendMessage("Vous placez l'objet "+this.contains[this.index].getName()+" au dessus de la lave et patientez...");
			if(this.owner.getTalents().canCook())
			{
				this.contains[this.index]=this.contains[this.index].cook(this.owner);
				this.examination=0;
			}
		}
		else
		{
			this.owner.sendMessage("Faire cuir un truc ? Mais sur quoi ?");			
		}
	}	
}

/**
 * Removes an objetc from the list.
 */
Inventory.prototype.remove=function(id)
{
	this.size-=this.contains[id].getPod();
	if(this.owner.previousTile instanceof Chest)
		this.owner.previousTile.inventory.add(this.contains[id].getId());
	
	this.contains[id]=undefined;
}

/**
 * Draw the selectionned item's descritption on the screen.
 */
Inventory.prototype.examine=function(id)
{
		if(typeof this.contains[id]=="undefined")
		{
			this.examination=0;
			return;
		}

		surface.fillStyle="rgb(0,0,0)";
		surface.fillRect (0, 0,320,320);
		if(this.owner.messages != undefined)
		{
			surface.fillRect (this.owner.messages.x*32-100, this.owner.messages.y*32,600,500);
			this.owner.messages.draw();
		}
	surface.font = "24px pixel";
	surface.fillStyle = "rgb(150,150,150)";
	surface.fillText("(e) fermer     (enter) utiliser",5,24);
	surface.fillText("(d) lacher",5,48);
		surface.font="28px pixel";
		surface.fillText(this.contains[id].getName()+" :",5,56+24);
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
				surface.fillText(word[i],5+x*10, 56+28+24+y*20);
		}
}
