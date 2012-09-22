function Talent(ownerTemp)
{
	this.owner=ownerTemp;
	this.cooking=1;
	this.survival=1;
	this.magic=1;
	this.picking=1;
}

/**
 * Returns the owner's cooking talent
 */ 
Talent.prototype.getCookTalent=function()
{
	return this.cooking;
}


/**
 * Returns the owner's survival talent
 */ 
Talent.prototype.getSurvivalTalent=function()
{
	return this.survival;
}


/**
 * Returns the owner's magic talent
 */ 
Talent.prototype.getMagicTalent=function()
{
	return this.magic;
}

/**
 * Returns the owner's picking talent
 */
Talent.prototype.getPickingTalent=function()
{
	return this.picking;
}

/**
 * Returns the owner can cook
 */ 
Talent.prototype.canCook=function()
{
	rand=Math.floor(Math.random()*(Math.floor(this.cooking)+1))+1;
	if(rand==1)
		return false;
	else
	{
		this.cooking=this.cooking+((this.cooking*10)/100);
		this.cooking=Math.round(this.cooking*10);
		this.cooking=this.cooking/10;
		if(this.cooking==Math.floor(this.cooking) || this.cooking-0.1==Math.floor(this.cooking))
			this.levelUp("la cuisine");
		return true;
	}
}


/**
 * Returns the owner can do the survival action
 */ 
Talent.prototype.canSurvive=function()
{
	rand=Math.floor(Math.random()*(Math.floor(this.survival)+1))+1;
	if(rand==1)
		return false;
	else
	{
		this.survival=this.survival+((this.survival*10)/100);
		this.survival=Math.round(this.survival*10);
		this.survival=this.survival/10;
		if(this.survival==Math.floor(this.survival) || this.survival-0.1==Math.floor(this.survival))
			this.levelUp("la survie");
		return true;
	}
}


/**
 * Returns the owner can launch his spell
 */ 
Talent.prototype.canInvoke=function()
{
	rand=Math.floor(Math.random()*(Math.floor(this.magic)+1))+1;
	if(rand==1)
		return false;
	else
	{
		this.magic=this.magic+((this.magic*10)/100);
		this.magic=Math.round(this.magic*10);
		this.magic=this.magic/10;
		if(this.magic==Math.floor(this.magic) || this.magic-0.1==Math.floor(this.magic))
			this.levelUp("la magie");
		return true;
	}
}

/**
 * Returns the owner can cook
 */ 
Talent.prototype.canPick=function()
{
	rand=Math.floor(Math.random()*(Math.floor(this.picking)+1))+1;
	if(rand==1)
		return false;
	else
	{
		this.picking=this.picking+((this.picking*10)/100);
		this.picking=Math.round(this.picking*10);
		if(this.owner.class==RODEUR)
			this.picking=this.picking/10;
		else
			this.picking=this.picking/100;
		
		if(this.picking==Math.floor(this.picking) || this.picking-0.1==Math.floor(this.picking))
			this.levelUp("le crochetage");
		return true;
	}
}


/**
 * Send a message to the talent's owner for say that one of his talents has leveled up.
 */
Talent.prototype.levelUp=function(stat)
{
	this.owner.sendMessage("Vous semblez mieux maitriser "+stat+".");
}
