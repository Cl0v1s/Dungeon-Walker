function Spell(nameTemp,effectTemp,lightTemp)
{
	this.name=nameTemp;
	this.effect=effectTemp;
	this.light=lightTemp;
	this.cursor=undefined;
	SpellList.push(this);
	this.id=SpellList.length;
}

/**
 * Returns the spell's name
 */
Spell.prototype.getName=function()
{
	return this.name;
}

/**
 * Returns the spell's effect
 */
Spell.prototype.getEffect=function()
{
	return this.effect;
}

/**
 * Returns the spell's range
 */
Spell.prototype.getLight=function()
{
	return this.light;
}

/**
 * Adds the spell's effect to the target's effect list
 */
Spell.prototype.use=function(caller)
{
	if(this.cursor != undefined)
	{
		listTemp=caller.getStair().monsters;
		target=undefined;
		for(i=0;i<listTemp.length;i++)
		{
			if(listTemp[i] != undefined && (listTemp[i].getX()==this.cursor.getX() && listTemp[i].getY()==this.cursor.getY()))
			{
				target=listTemp[i];
				break;
			}
		}
		if(caller.getTalents().canInvoke())
		{
			if(target instanceof Monster || target instanceof Player)
			{
				this.effect.changeOwner(target);
				this.effect.apply();
				target.addEffect(this.effect);
				caller.sendMessage("Vous lancez le sort "+this.name+" qui atteint sa cible.");
				target.sendMessage("Vous avez ete touche par le sort "+this.name+".");					
			}
			else
				caller.sendMessage("Vous lancez votre sort "+this.name+" dans le vide...");
		}
		else
			caller.sendMessage("Vous revenez brutalement au monde reel, vous n'avez pas reussi a maintenir la liaison.");
			
		this.cursor=undefined;
	}
}


/**
 * create a new cursor at the caller's pos
 */
Spell.prototype.launch=function(caller)
{
	this.cursor=new Cursor(caller.getX(),caller.getY(),this.light);
}


/**
 * Moves the spell's cursor into the specified position
 */
Spell.prototype.move=function(dir)
{
	if(this.cursor != undefined)
		this.cursor.move(dir);
}


/**
 * Updates the spell's cursor and actions
 */
Spell.prototype.update=function()
{
	this.cursor.draw();
}
