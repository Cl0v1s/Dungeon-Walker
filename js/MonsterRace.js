MonsterList=new Array();


function MonsterRace(nameTemp,biomeTemp,imgNoTileTemp,lifeTemp,lightTemp,forceTemp,constTemp,tailleTemp,dexTemp,launchTemp,lrmTemp,weaponTemp,levelTemp,agressivity,scoreTemp,dropTemp)
{
	this.name=nameTemp;
	this.biome=biomeTemp;
	this.image=imgNoTileTemp;
	this.life=lifeTemp;
	this.force=forceTemp;
	this.constitution=constTemp;
	this.taille=tailleTemp;
	this.dexterite=dexTemp;
	this.launch=launchTemp;
	this.lrm=lrmTemp;
	this.weapon=weaponTemp;
	this.level=levelTemp;
	this.agressivity=agressivity;
	this.score=scoreTemp;
	this.drop=dropTemp;
	this.light=lightTemp;
	this.id=MonsterList.length;
	MonsterList[MonsterList.length]=this;
	//alert(this.name+":"+this.id);
}
