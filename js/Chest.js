function Chest()
{
	this.pound=20;
	this.examination=0;
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
	alert(this.inventory.contains);
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
	Motor.player.draw();
	Motor.dungeon.getCurrentStair().draw();
	surface.fillStyle="rgb(0,0,0)";
	surface.fillRect (0, 0,320,320);
	surface.fillRect (Motor.messages.x*32-100, (Motor.messages.y-1)*32,600,500);
	Motor.messages.draw();
	surface.font = "24px pixel";
	surface.fillStyle = "rgb(150,150,150)";
	surface.fillText("(e) examiner     (enter) recuperer",5,24);
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
		
			surface.fillText(this.inventory.contains[i].getName(),20+x*100,56+20*y);
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

	surface.fillText(">",0+this.inventory.pointer_x*100,56+20*this.inventory.pointer_y);
	
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
				Motor.messages.add("Vous regardez l'objet "+this.inventory.contains[this.inventory.index].getName()+" de plus pres.");
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
		Motor.messages.add("Vous refermez precausioneusement le coffre.");
		Scene=Motor;
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

		surface.fillStyle="rgb(0,0,0)";
		surface.fillRect (0, 0,320,320);
		surface.fillRect (Motor.messages.x*32-100, Motor.messages.y*32,600,500);
		Motor.messages.draw();
	surface.font = "24px pixel";
	surface.fillStyle = "rgb(150,150,150)";
	surface.fillText("(e) fermer     (enter) recuperer",5,24);
		surface.font="28px pixel";
		surface.fillText(this.inventory.contains[id].getName()+" :",5,56+24);
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
				surface.fillText(word[i],5+x*10, 56+28+24+y*20);
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
	Motor.player.inventory.add(this.inventory.contains[this.inventory.index].getId());
	Motor.messages.add("Vous sortez l'objet du coffre et le glissez dans votre sac.");
	this.inventory.remove(this.inventory.index);
}
