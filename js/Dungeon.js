
function Dungeon()
{
		this.stairIndex=0;
		this.stairs=new Array();
		this.generateStair();
}

/**
 * This method checks if a stair alreday exists or not
 */
Dungeon.prototype.stairExists=function(index)
{
		if(typeof this.stairs[index] != "undefined")
			return true;
		else
			return false;
}

/**
 * This method create a new Stair in the dungeon
 */
Dungeon.prototype.generateStair=function()
{
	
	if(!this.stairExists(this.stairIndex))
	{
			this.stairs[this.stairIndex]=new Stair();
			if(this.stairIndex==0)
				Motor.messages.add("Vous penetrez dans un donjon sombre et sale");
			else
			{
					flag=Math.floor(Math.random()*2)+1;
					if(flag==1)
						Motor.messages.add("Vous montez difficilement les marches millenaires et decouvrez une nouvelle salle.");
					else
						Motor.messages.add("Encore un nouvel etage ?!");
			}
	}
}

/**
 * This method allow the player to go up in the dungeon
 */
Dungeon.prototype.upStair=function()
{
	this.stairIndex=this.stairIndex+1;
	this.generateStair();
}

/**
 * This method allow the player to go down in the dungeon
 */
Dungeon.prototype.downStair=function()
{
	this.stairIndex=this.stairIndex-1;
	this.generateStair();
}

/**
 * This method returns the stair where the player is
 */
Dungeon.prototype.getCurrentStair=function()
{
		return this.stairs[this.stairIndex];
}

/**
 * This method returns the current stair's id
 */
Dungeon.prototype.getCurrentStairId=function()
{
		return this.stairIndex;
}
