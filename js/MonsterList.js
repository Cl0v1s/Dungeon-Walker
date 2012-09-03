/**
 * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
 * MONSTERLIST.JS              														 *
 * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
 * This File lists the various monsters that the player can found during his adventure.
 * To add a monster, you must create an object and instanciate the MonsterRace class.
 * The monster's informations must be in this order:
 * 	name,biome,character without tile,basic life,light,force,consitution,size,dexterity,launch,lrm,weapon (see AttackList.js),the dungeon level 
 *  where the monster can be found,agressivity amount,score bonus,an array who contains the list of the items can be droped by the monster.
 */

var HairySpider=new MonsterRace("araignee velue","dungeon","X",0,3,5,2,1,5,1,8,Claw,0,0,5,new Array(SpiderLeg.getId(),SpiderEye.getId(),RottenFlesh.getId()));
var AggressiveRat=new MonsterRace("rat agressif","dungeon","%",5,6,7,2,3,6,1,5,Claw,1,2,7,new Array());
