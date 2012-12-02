function Larvin(stairTemp,xTemp,yTemp,spawn,idTemp)
{
	Monster.call(this,stairTemp,xTemp,yTemp,idTemp);
	/** Monster's settings **/
	this.name="larvin";
	this.biome="plain";
	this.image="L";
	this.life=20;
	this.launch=0;
	this.lrm=0;
	this.light=5;
	this.atk=1;
	this.force=1;
	this.constitution=10;
	this.taille=1;
	this.dexterite=1;
	this.score=2;
	this.drop=new Array();	
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
		this.sprite.src="graphics/characters/"+this.name+"/"+this.name+"-"+this.spriteFrame+".png";
		this.stair.map[this.x][this.y]=0;
	}
}

/**
 * Legacy
 */
Larvin.prototype=new Monster();

/**
 * Runs the monster's ia
 **/
Larvin.prototype.think=function()
{
	this.changeStat();
	bestFriend=undefined;
	worstEnemy=undefined;
	friendList=new Array();
	enemyList=new Array();
	for(d=0;d<this.stair.monsters.length;d++)
	{
		target=this.stair.monsters[d];

		if(target != undefined && target != this)
		{
				if((target.getX()==this.x-1 && target.getY()==this.y) || (target.getX()==this.x+1 && target.getY()==this.y) || (target.getY()==this.y-1 && target.getX()==this.x) || (target.getY()==this.y+1 && target.getX()==this.x))
				{
					if(this.onFire && Math.floor(Math.random()*2+1)==1)
						target.setFire();
		
					if(target.getName() != this.name)
					{
						this.agressivity+=1;
						result=this.stair.fight(target,this);
					}
					else
					{
						if(Client.turn>=this.maturity)
						{
							if(this.sexe=="female" && target.getSexe()=="male")
							{
								this.procreate(target);
								this.maturity=Client.turn+Math.floor(Math.random()*200);
							}
						}
					}
						
				}
				if(this.canSee(target.getX(),target.getY()))
				{
					if(target.name==this.name)
					{
						friendList.push(target);
					}
					else
						enemyList.push(target);
				}
		}
	}
	if(bestFriend==undefined)
	{
		for(e=0;e<friendList.length;e++)
		{
			target=friendList[e];
			total=target.atk;
			for(i=0;i<target.launch;i++)
			{
				lancer=Math.random()*6+1;
				lancer=Math.floor(lancer);
				total=total+Math.round(target.atk/lancer);
			}
			sympathy=total*(6-Math.sqrt(Math.pow(target.getX()-this.x,2)+Math.pow(target.getY()-this.y,2)))-2*this.agressivity;
			target.setSympathy(sympathy);
			if(bestFriend==undefined || sympathy>bestFriend.getSympathy())
					bestFriend=target;
		}
	}
	
	if(worstEnemy==undefined)
	{
		for(e=0;e<enemyList.length;e++)
		{
			target=enemyList[e];
			total=this.atk;
			for(i=0;i<this.launch;i++)
			{
				lancer=Math.random()*6+1;
				lancer=Math.floor(lancer);
				total=total+Math.round(this.atk/lancer);
			}
			antipathy=total*(6-Math.sqrt(Math.pow(target.getX()-this.x,2)+Math.pow(target.getY()-this.y,2)))-2*this.agressivity;
			target.setAntipathy(antipathy);
			if(worstEnemy==undefined || antipathy>worstEnemy.getAntipathy())
					worstEnemy=target;
		}
	}
	
	this.enemy=worstEnemy;
	this.friend=bestFriend;
	
	
	water=this.searchFor(3);
	drinkDesire=0;
	if(water != undefined)	
	{
		drinkDesire=(this.soif*-1+100)/2*(6-Math.sqrt(Math.pow((water[0]-this.x),2)+Math.pow((water[1]-this.y),2)));
	}
	
	
	for(c=0;c<this.effectList.length;c++)
	{
		if(this.effectList[c] instanceof StatEffect)
			this.effectList[c]=this.effectList[c].update();
	}	

	if(bestFriend != undefined && worstEnemy != undefined)
	{
		this.run(worstEnemy.getX(),worstEnemy.getY());
		return;
	}
	else if(bestFriend != undefined)
	{
		if(drinkDesire>bestFriend.getSympathy() && water != undefined)
			this.moveTo(water[0],water[1]);
			
		if(this.isNearEntity(bestFriend))
		{
			this.isGrouped(bestFriend);
		}
		if(this.isNearEntity(bestFriend))
			this.selectDir();
		else
			this.moveTo(bestFriend.getX(),bestFriend.getY());
		return;
	}
	else if(worstEnemy != undefined)
	{
		this.run(worstEnemy.getX(),worstEnemy.getY());
	}

	this.selectDir();
}

