/**
 * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
 * EQUIPMENTLIST.JS              														 *
 * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
 * This File lists the various equipments that the player can found during his adventure.
 * To add an equipment, you must create an object and instanciate the ItemEquipement class.
 * The informations of the equipment must be in this order:
 * 		name,weight,place,attack amount,constitution bonus,dexterity bonus,lrm amount bonus, launch number bonus,description and price.
 */
 
 /**
  * The Weapons
  */
  var Dague=new ItemEquipement("dague",4,"weapon",3,0,0,1,1,"Une lame courte et legere. Vous pouvez facilement la dissimuler dans une botte ou sous votre veste.",10);
  var SingleEdgedSword=new ItemEquipement("epee a simple tranchant",5,"weapon",6,0,0,1,1,"Une epee de fabrication simple, forgee par un novice.",15);
  var TwoHandledSword=new ItemEquipement("epee a deux mains",10,"weapon",15,0,0,1,1,"Une epee imposante, tellement lourde que vous la soutenez a peine avec vos deux bras.",30);
  var Pike=new ItemEquipement("pique",5,"weapon",4,0,0,1,2,"Un baton disposant d'une extremite en fer travaille. Vous pouvez distinctmement lire des symboles magiques sur la pique.",14);


