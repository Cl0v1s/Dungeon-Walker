
function Dungeon()
{
		this.stairIndex=0;
		this.stairs=new Array();
		this.generateStair();
}

Dungeon.prototype.stairExists=function(index)
{
		if(typeof this.stairs[index] != "undefined")
			return true;
		else
			return false;
}


Dungeon.prototype.generateStair=function()
{
	
	if(!this.stairExists(this.stairIndex))
	{
			this.stairs[this.stairIndex]=new Stair();
	}
}


Dungeon.prototype.upStair=function()
{
	this.stairIndex=this.stairIndex+1;
	this.generateStair();
}

Dungeon.prototype.downStair=function()
{
	this.stairIndex=this.stairIndex-1;
	this.generateStair();
}

Dungeon.prototype.getCurrentStair=function()
{
		return this.stairs[this.stairIndex];
}
