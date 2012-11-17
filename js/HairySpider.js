function HairySpider(stairTemp,xTemp,yTemp,spawn,idTemp)
{
	Monster.call(this,stairTemp,xTemp,yTemp,idTemp);
	/** Monster's settings **/
	this.name="araigne velue";
	this.biome="dungeon";
	this.image="X";
	this.life=0;
	this.launch=1;
	this.lrm=8;
	this.light=4;
	this.atk=1;
	this.force=5;
	this.constitution=2;
	this.taille=1;
	this.dexterite=5;
	this.score=10;
	this.drop=new Array(SpiderLeg.getId(),SpiderEye.getId(),RottenFlesh.getId());	
	this.inventory.add(Claw.getId());
	/** end **/

	if(spawn)
	{
		this.agressivity=0;
		total=0;
		for(d=0;d<this.launch;d++)
		{
			lancer=Math.random()*6+1;
			lancer=Math.floor(lancer);
			total=total+lancer;
		}
		total=total*this.lrm;
		this.life+=total;
		this.inventory.use();
		this.sprite.src="graphics/characters/"+this.name+"/"+this.name+"-"+this.spriteFrame+".png";
		this.stair.map[this.x][this.y]=0;
	}
}

/**
 * Legacy
 */
HairySpider.prototype=new Monster();


/**
 * Runs the monster's ia
 **/
HairySpider.prototype.think=function()
{
	this.Ia_basic();
}