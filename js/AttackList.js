/**
 * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
 * ATTACKLIST.JS              														 *
 * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
 * This File lists the various attacks that the monsters can use against the player during his journey.
 * To add an attack, you must create an object and instanciate the ItemEquipement class.
 * The informations of the attack must be in this order:
 * 		name,weight,place,attack amount,constitution bonus,dexterity bonus,lrm amount bonus, launch number bonus,description and price.
 */
 
 var Claw=new ItemEquipement("griffe",0,"weapon",1,0,0,0,4,"Des griffes de predateur, bien affutes et tranchante comme un rasoir.",0);
 var Glue=new ItemEquipement("glue",0,"weapon",3,0,0,0,2,"Une matière empoisonnée visqueuse et collante.",0);
