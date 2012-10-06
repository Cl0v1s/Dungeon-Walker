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
  
  
  /**
   * Head
   */
   var LeatherHood=new ItemEquipement("capuche cuir",2,"head",0,3,0,0,0,"Une capuche de cuir legere, masquant a peine votre visage.",6);
   var IronHelmet=new ItemEquipement("casque fer",10,"head",0,9,0,0,0,"Un lourd casque de fer, il protege parfaitement le sommet de votre crane.",50);   
   
   /**
    * Torso
    */
    var LinenShirt=new ItemEquipement("chemise lin",4,"torso",0,1,0,0,0,"Une legere chemise de lin, vieille et trouee.",3);
    var Ironbreastplate=new ItemEquipement("plaq. fer ventr.",20,"torso",0,15,0,0,0,"Une plaque de fer imposante, couvrant votre torse mais laissant quelque points morts visibles.",60); 
    
    /**
     * Legs
     */
     var LinenTrousers=new ItemEquipement("panta. lin",4,"legs",0,1,0,0,0,"Un pantalon de lin ayant deja servi un moment.",3);
     var IronSkirt=new ItemEquipement("jupe mailles",12,"legs",0,12,0,0,0,"Une jupe de mailles serres, vous donnant un petit air effemine.",53); 
     
     /**
      * Feet
      */
	  var LeatherBoots=new ItemEquipement("bottes cuir",8,"feet",0,3,0,0,0,"De lourdes bottes en cuir de creatures des marais.",10);
	  var SoldierBoots=new ItemEquipement("bottes soldat",10,"feet",0,7,0,0,0,"De lourdes bottes en cuir de creatures des marais renforcees par des anneaux de fer.",15);  


