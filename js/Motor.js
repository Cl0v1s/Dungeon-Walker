//////////////////////////////////////////////////////////////////////////////////////
//class Motor
//////////////////////////////////////////////////////////////////////////////////////
//par chaipokoi
//crée le : 11/08/2012
//modifié le : 12/08/2012
/////////////////////////////////////////////////////////////////////////////////////
//Le moteur de jeu.
//-gère la génération de la première salle.
//-gère le début du jeu.
//-gère les tours à chaque déplacement du joueur.
//-gère le GameOver.
////////////////////////////////////////////////////////////////////////////////////

function Motor()
{
	this.player=undefined;
	this.dungeon=undefined;
	this.turn=0;
	this.dayInterval=144;
	this.time="Day";
	
	this.messages=new MsgZone(1,11);
	
	this.xPos=0;
	this.yPos=0;
	this.canvasPlaced=false;


}

Motor.prototype.start=function(par1)
{
		this.player=par1;
		x=this.dungeon.getCurrentStair().getSpawnPoint()[0]+this.dungeon.getCurrentStair().getSpawnPoint()[2].getX();
		y=this.dungeon.getCurrentStair().getSpawnPoint()[1]+this.dungeon.getCurrentStair().getSpawnPoint()[2].getY();
		this.player.setX(x);
		this.player.setY(y);
}

Motor.prototype.getXPos=function()
{
		return this.xPos;
}

Motor.prototype.getYPos=function()
{
		return this.yPos;
}

Motor.prototype.setXPos=function(value)
{
	this.xPos=value;
}

Motor.prototype.setYPos=function(value)
{
	this.yPos=value;
}

Motor.prototype.resetCanvas=function()
{
		this.xPos=0;
		this.yPos=0;
		this.canvasPlaced=false;
}

Motor.prototype.generateStair=function(top,left,down,right)
{
	this.dungeon=new Dungeon();
	this.dungeon.getCurrentStair().generateMonsters();
}

Motor.prototype.update=function()
{
	
	clean();
	this.dungeon.getCurrentStair().draw();
	this.inputUpdate();
	this.player.draw();
	this.messages.draw();
}


Motor.prototype.inputUpdate=function()
{
	if(!this.canvasPlaced)
		this.moveCanvas();
	
	if(!Input.equals(0))
	{
		this.newTurn();
	}
		
	if(Input.equals(13))
		alert(Motor.dungeon.getCurrentStair().getMap()[this.player.getX()][this.player.getY()]);
		
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
		
	if(Input.equals(76))
		this.player.lap();
		
	if(Input.equals(73))
		this.player.openInventory();
		
	if(Input.equals(69))
		this.player.openEquipement();
		

}

Motor.prototype.newTurn=function()
{	
	this.turn+=1;
	if (this.turn>=this.player.hi)
	{
		this.player.hi+=this.turn;
		this.player.heal();	
		this.messages.add("Vos blessures cicatrisent peu a peu...");
	}
	if (this.turn>=this.player.fi)
	{
		this.player.fi+=this.turn;
		this.player.fire();	
	}
	if (this.turn>=this.player.si)
	{
		this.player.si+=this.turn;
		this.player.sick();	
	}


	if(this.turn>=this.dayInterval)
	{
		if(this.time=="Day")
		{
			this.player.changeStat();
			this.messages.add("La luminositee diminue peu a peu...");
			this.time="Night";
		}
		else
		{
			this.messages.add("La lumiere du jour revient suivie par son compagnon le soleil.");
			this.time="Day";
		}
		this.dayInterval+=this.turn;
	}
	this.dungeon.getCurrentStair().moveMonsters();
}

Motor.prototype.moveCanvas=function()
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



Motor.prototype.gameOver=function()
{
	clean();
	surface.font = "100px pixel";
	surface.fillStyle="rgb(50,50,50)";
	surface.fillText("GAME OVER", document.getElementById('canvas').width/2-400/2,document.getElementById('canvas').height/2-100/2);
	exit();

}







