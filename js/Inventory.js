//////////////////////////////////////////////////////////////////////////////////////
//class Inventory
//////////////////////////////////////////////////////////////////////////////////////
//par chaipokoi
//crée le : 7/05/2012
//modifiée le : 12/08/2012
/////////////////////////////////////////////////////////////////////////////////////
//gère un inventaire.
//-gère la récupération d'objets
//-gère le tri et l'affichage du contenu
//-gère l'utilisation des objets
//-gère la supression des objets
//-gère la lecture de la description des objets
////////////////////////////////////////////////////////////////////////////////////


function Inventory(size)
{
	this.size=0;
	this.index=0;
	this.contains=new Array();
	this.contains[0]=BRIQUET;
	this.pointer_x=0;
	this.pointer_y=1;
	this.examination=0;
}


Inventory.prototype.add=function(id)
{

	if(this.size<player.pound)
	{
		for(i=0;i<=this.contains.length;i++)
		{
			if(typeof this.contains[i]=="undefined")
			{
				this.contains[i]=Item[id];
				Motor.messages.add("Vous placez l'objet "+Item[id].Name+" dans votre sac.");
				this.size+=Item[id].Pound;
				return true;
			}
		}
	}
	Motor.messages.add("Vous ne pouvez plus rien porter, vous laissez donc l'objet sur le sol.");
	return false;

}

Inventory.prototype.update=function()
{
	Motor.player.draw();
	this.inputUpdate();
	surface.fillStyle="rgb(0,0,0)";
	surface.fillRect (0, 0,320,320);
	surface.fillRect (Motor.messages.x*32-100, (Motor.messages.y-1)*32,600,500);
	Motor.messages.draw();
	surface.font = "24px pixel";
	surface.fillStyle = "rgb(150,150,150)";
	surface.fillText("(e) examiner     (enter) utiliser",5,24);
	surface.fillText("(d) lacher",5,48);
	surface.font = "20px pixel";
	x=0;
	y=0;
	for(i=0;i<this.contains.length;i++)
	{
		y=y+1;
		surface.fillStyle = "rgb(150,150,150)";
		if(typeof this.contains[i] !="undefined")
		{
			
			if(this.contains[i].Effect !="")
				surface.fillStyle="rgb(0,10,250)";
			
			
			if(this.contains[i].Effect=="eat")
				surface.fillStyle="rgb(95,54,14)";


			surface.fillText(this.contains[i].Name,20+x*100,56+20*y);
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

Inventory.prototype.inputUpdate=function()
{
	if(Input.equals(68))
	{
		Motor.messages.add("Vous abandonnez l'objet "+this.contains[this.index].Name+".");
		this.remove(this.index);
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
	
	if(Input.equals(40))
		this.downList();
		
	if(Input.equals(38))
		this.upList();
		
	if(Input.equals(13))
		this.use();
		
	if(Input.equals(27))
	{
		Motor.messages.add("Vous fermez votre sac et vous vous redressez pret a repartir.");
		Scene=Motor;
	}	
}

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

Inventory.prototype.use=function()
{
	if(typeof this.contains[this.index] !="undefined")
	{
		if(this.contains[this.index].Effect=="eat" && this.contains[this.index].Cookable==false)
		{
			player.faim+=this.contains[this.index].EffectValue;
			Motor.messages.add("Vous mangez attivement le "+this.contains[this.index].Name+".");
			this.remove(this.index);
		}
		if(this.contains[this.index].Cookable !=false && (Motor.getCurrentRoom().grill[Motor.player.x][Motor.player.y+1]==5 || Motor.getCurrentRoom().grill[Motor.player.x][(Motor.player.y+1)]==6) )
		{
			Motor.messages.add("Vous placez l'objet "+this.contains[this.index].Name+" au-dessus du feu.");
			for(i=0;i<5;i++)
			{
				Motor.newTurn();
			}
			this.contains[this.index]=this.contains[this.index].Cookable;
			Motor.messages.add("L'objet "+this.contains[this.index].Name+" est pret.");

		}
		if(this.contains[this.index].Effect=="fire")
		{
			Motor.getCurrentRoom().setFire(player);
		}
		this.examination=0;
	}
}

Inventory.prototype.remove=function(id)
{
	this.size-=this.contains[id].Pound;
	this.contains[id]=undefined;
}


Inventory.prototype.examine=function(id)
{
		if(typeof this.contains[id]=="undefined")
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
	surface.fillText("(e) fermer     (enter) utiliser",5,24);
	surface.fillText("(d) lacher",5,48);
		surface.font="28px pixel";
		surface.fillText(this.contains[id].Name+" :",5,56+24);
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
				surface.fillText(word[i],5+x*10, 56+28+24+y*20);
		}
}
