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
  var Dague=new ItemEquipement("dague",4,"weapon",3,0,0,1,1,"Une lame courte et legere. Vous pouvez facilement la dissimuler dans une botte ou sous votre veste.",2);
