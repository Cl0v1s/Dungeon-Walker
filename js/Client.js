function Client()
{
	this.player=undefined;
	this.dungeon=undefined;
	this.turn=0;
	this.dayInterval=144;
	this.time="Day";
	this.xPos=0;
	this.yPos=0;
	this.canvasPlaced=false;
	this.spellListen=false;
	this.spellListenChar="";


}

/**
 * Searchs the stair's spawnpoint and places the player at it's coordiantes
 */
Client.prototype.start=function(par1)
{
		this.player=par1;
		x=this.dungeon.getCurrentStair().getSpawnPoint()[0]+this.dungeon.getCurrentStair().getSpawnPoint()[2].getX();
		y=this.dungeon.getCurrentStair().getSpawnPoint()[1]+this.dungeon.getCurrentStair().getSpawnPoint()[2].getY();
		this.player.setX(x);
		this.player.setY(y);
		this.dungeon.getCurrentStair().addEntityToList(this.player);
}

/**
 * Returns the canvas's x pos
 */
Client.prototype.getXPos=function()
{
		return this.xPos;
}

/**
 * Returns the canva's y pos
 */
Client.prototype.getYPos=function()
{
		return this.yPos;
}

/**
 * Sets the canvas's x pos
 */
Client.prototype.setXPos=function(value)
{
	this.xPos=value;
}

/**
 * Sets the canvas's y pos
 */
Client.prototype.setYPos=function(value)
{
	this.yPos=value;
}

/**
 * Replaces the canvas to it's origin
 */
Client.prototype.resetCanvas=function()
{
		this.xPos=0;
		this.yPos=0;
		this.canvasPlaced=false;
}

/**
 * Creates a new dungeon.
 */
Client.prototype.generateDungeon=function()
{
	this.dungeon=new Dungeon();
	this.dungeon.getCurrentStair().generateMonsters();
	return this.dungeon.getCurrentStair();
}


/**
 * Shows a loading message until the camera is not locked over the player
 */
Client.prototype.loading=function()
{
		if(typeof r=="undefined")
		{

			r=50;
			v=50;
			b=50;
			ratio=5;
		}
		surface.font = "100px pixel";
		surface.fillStyle = "rgb("+r+","+v+","+b+")";
		surface.fillText("Loading...",document.getElementById('canvas').width/2-300/2,document.getElementById('canvas').height/2-100/2);
		r+=ratio;
		v+=ratio;
		b+=ratio;

		if(r>255)
		{
			ratio=-5;
		}
		if(r<50)
		{
			ratio=5;
		}
}


/**
 * Updates the Client's stats
 */
Client.prototype.update=function()
{
	
	clean();
	if(!this.canvasPlaced)
		this.moveCanvas();
	else
		this.inputUpdate();
		
	if(!this.canvasPlaced)
		this.loading();
	else
	{
		Client.dungeon.getCurrentStair().draw();
		this.player.draw();
	}

}

/**
 * Updates the Client's input
 */
Client.prototype.inputUpdate=function()
{	

	if(!this.spellListen)
	{
		if(!Input.equals(0) && LastKey != 13)
		{
			this.newTurn();
		}
			
		if(Input.equals(39))
		{
			this.player.move("right");
		}

		if(Input.equals(40))
		{
			this.player.move("down");		
		}
			
		if(Input.equals(37))
		{
			this.player.move("left");
		}
			
		if(Input.equals(38))
		{
			this.player.move("up");
		}
		
		if(Input.equals(80))
			Scene=RecipeGUI;
			
		if(Input.equals(76))
			this.player.lap();
			
		if(Input.equals(73))
			this.player.openInventory();
			
		if(Input.equals(69))
			this.player.openEquipement();
			
		if(Input.equals(13))
			this.player.interact();
			
		if(Input.equals(83))
			this.player.rest();
			
		if(Input.equals(27))
			this.player.reset();
			
		if(Input.equals(17))
			this.resetCanvas();
			
		if(Input.equals(77))
		{
			this.spellListen=true;
			this.player.sendMessage("Vous penetrez au plus profond de votre conscience et parvenez a atteindre le monde des esprits.");	
		}
	}
	else if(!Input.equals(0))
	{
		if(Input.equals(27))
		{
				this.spellListenChar="";
				this.spellListen=false;		
				this.player.sendMessage("Vous reprenez vos esprits et revenez a la realite.");	
				return;
		}
		if(String.fromCharCode(Input.getLastKey()).toLowerCase() != this.spellListenChar.charAt(this.spellListenChar.length-1).toLowerCase())
			this.spellListenChar=this.spellListenChar+String.fromCharCode(Input.getLastKey()).toLowerCase();
		else
			return;
			
		for(h=0;h<SpellList.length;h++)
		{
			if(SpellList[h].getName()==this.spellListenChar)
			{
				this.player.callSpell(SpellList[h]);
				this.spellListenChar="";
				this.spellListen=false;
				this.player.sendMessage("Vous appelez le sort des arcanes "+SpellList[h].getName()+".");
			}
		}
		
		
	}
		

}

Client.prototype.newTurn=function()
{	
	this.turn+=1;

	if(this.turn>=this.dayInterval)
	{
		if(this.time=="Day")
		{
			for(i=0;i<this.dungeon.getCurrentStair().monsters.length;i++)
			{
				if(this.dungeon.getCurrentStair().monsters[i] != undefined)
					this.dungeon.getCurrentStair().monsters[i].changeStat();
			}
			player.sendMessage("La temperature diminue peu a peu, il semblerait que le soleil se couche...");
			this.time="Night";
		}
		else
		{
			player.sendMessage("La temperature monte legerement, il fait probablement jour dehors...");
			this.time="Day";
		}
		this.dayInterval+=this.turn;
	}
	this.dungeon.getCurrentStair().moveMonsters();
}

Client.prototype.moveCanvas=function()
{
	objX=this.player.getX()*32;
	objY=this.player.getY()*32;
	canvasWidth=document.getElementById('canvas').width;
	canvasHeight=document.getElementById('canvas').height;
	if(!(this.xPos+canvasWidth/2>=objX && this.xPos+canvasWidth/2<=objX+canvasWidth) || !(this.yPos+canvasHeight/2>=objY && this.yPos+canvasHeight/2<=objY+canvasHeight))
	{
			this.xPos=this.xPos*-1;
			this.yPos=this.yPos*-1;
			if(this.xPos+canvasWidth/2<objX)
			{
				this.xPos=this.xPos+32;
			}
			if(this.xPos+canvasWidth/2>objX)
			{
				this.xPos=this.xPos-32;
			}
			if(this.yPos+canvasHeight/2<objY)
			{
				this.yPos=this.yPos+32;
			}
			if(this.xPos+canvasHeight/2>objY)
			{
				this.yPos=this.yPos-32;
			}
			if(Math.abs(this.xPos+canvasWidth/2-objX)<=32 && Math.abs(this.yPos+canvasHeight/2-objY)<=32)
				this.canvasPlaced=true;
			
				
			this.xPos=this.xPos*-1;
			this.yPos=this.yPos*-1;
	}
}









