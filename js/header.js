
//lrm=life random bonus, c'est le nombre par lequel on multiplie le resultat du lancé de dès pour obtenir la vie ou les degat d'une entité.
//Launch=nombre de lancer de dès pour déterminer la vie ou les dégats d'une entitée.
//Hi=nombre de tour avant heal.
//Hr=heal ratio, soins lorsque le nombre de tour est egal au heal interval (%).

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//ARMES ET ATTAQUES
var MAINS={
"Name" : "mains nues",
"Id" : 0,
"Atk" :0,
"Launch" :1,
"Lrm" : 2,
"Price" : 0
}
var TOUCHE_REPUGNANT={
"Name" : "touche repugnant",
"Id" : 2,
"Atk" :0,
"Launch" :3,
"Lrm" : 1,
"Price" : 0
}
var GRIFFES={
"Name" : "griffes",
"Id" : 1,
"Atk" :0,
"Launch" :1,
"Lrm" : 2,
"Price" : 0
}
var PIQUE={
"Name" : "pique",
"Id" : 3,
"Atk" :0,
"Launch" :1,
"Lrm" : 6,
"Price" : 5
}
var EPEE_A_DEUX_MAINS={
"Name" : "epee a deux mains",
"Id" : 4,
"Atk" :0,
"Launch" :1,
"Lrm" : 10,
"Price" : 50
}
var EPEE_A_SIMPLE_TRANCHANT={
"Name" : "epee a simple tranchant",
"Id" : 6,
"Atk" :0,
"Launch" :1,
"Lrm" : 4,
"Price" : 10
}
var DAGUE={
"Name" : "dague",
"Id" : 5,
"Atk" : 0,
"Launch" : 1,
"Lrm" : 3,
"Price" : 2
}

var Armurerie=new Array();
Armurerie[0]=MAINS;
Armurerie[1]=GRIFFES;
Armurerie[2]=TOUCHE_REPUGNANT;
Armurerie[3]=PIQUE;
Armurerie[4]=EPEE_A_DEUX_MAINS;
Armurerie[5]=DAGUE;
Armurerie[6]=EPEE_A_SIMPLE_TRANCHANT;


////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//Items
var STEAK_CUIT={
"Name" : "steak cuit",
"Pound" : 2,
"Desc" : " Un bon morceau de muscle cuit a point.",
"Effect" : "eat",
"EffectValue" : 10,
"Cookable" : false,
"Price" : 15
}
var STEAK_CRU={
"Name" : "steak cru",
"Pound" : 2,
"Desc" : " Un morceau de muscle juteux preleve sur un cadavre.",
"Effect" : "eat",
"EffectValue" : 5,
"Cookable" : STEAK_CUIT,
"Price" : 5
}
var PATTE_D_ARAIGNEE={
"Name" : "patte d'arai.",
"Pound" : 2,
"Desc" : " Une patte velue arachee du corps d'une enorme araignee.",
"Effect" : "",
"EffectValue" : 0,
"Cookable" : false,
"Price" : 2
}
var OEIL_D_ARAIGNEE={
"Name" : "oeil d'arai.",
"Pound" : 2,
"Desc" : " Un oeil visqueux arachee du corps d'une enorme araignee.",
"Effect" : "",
"EffectValue" : 0,
"Cookable" : false,
"Price" : 2
}
var CHAIR_INFAME={
"Name" : "chair infame",
"Pound" : 2,
"Desc" : " Un bout de chair a l'aspect fort peu apetissant.",
"Effect" : "eat",
"EffectValue" : 2,
"Cookable" : false,
"Price" : 2
}
var BRIQUET={
"Name" : "briquet",
"Pound" : 3,
"Desc" : " un petit briquet constitue d'un silex et d'un fragment de fer.",
"Effect" : "fire",
"EffectValue" : 0,
"Cookable" : false,
"Price" : 30
}

var Item=new Array();
Item[0]=STEAK_CUIT;
Item[1]=STEAK_CRU;
Item[2]=PATTE_D_ARAIGNEE;
Item[3]=OEIL_D_ARAIGNEE;
Item[4]=CHAIR_INFAME;



Item[100]=Armurerie[0];
Item[101]=Armurerie[1];
Item[102]=Armurerie[2];
Item[103]=Armurerie[3];
Item[104]=Armurerie[4];
Item[105]=Armurerie[5];
Item[106]=Armurerie[6];
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//BESTIAIRE
var ARAIGNEE_VELUE={
"Name" : "araignee velue",
"Biome": "dungeon",
"Img" : "X",
"Life" : 0,
"Launch" : 1,
"Lrm" : 8,
"weapon" : GRIFFES,
"Follow" : false,
"Desc" : "On trouve cette araignée de la taille d'une main et à la morsure redoutable dans les jungles, les tombes, les grottes, et bien sur, dans tout l'Outreterre. Elles ne tissent pas de toile, mais peuvent s'installer sur celles d'autres araignees.",
"Score" : 10,
"Level" : 0,
"Drop" :new Array()
}
ARAIGNEE_VELUE.Drop[0]=2;
ARAIGNEE_VELUE.Drop[1]=3;
ARAIGNEE_VELUE.Drop[2]=4;

var CUBE_GELATINEUX={
"Name" : "cube gelatineux",
"Biome": "dtes",
"Img" : "&",
"Life" : 32,
"Launch" : 4,
"Lrm" : 8,
"weapon" : TOUCHE_REPUGNANT,
"Follow" : false,
"Desc" : "Le cube gelatineux est un monstre presque transparent qui erre lentement dans les donjons et les cavernes, absorbant dechets, charogne et creatures vivantes. Il ne digère que les matieres organiques, les autres restant piegees et visibles à l’interieur de son corps.",
"Score" : 50,
"Level" : 100
}



var Bestiaire=new Array();
Bestiaire[0]=ARAIGNEE_VELUE;
Bestiaire[1]=CUBE_GELATINEUX;


////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//CLASSES
var BARBARE={
"Name" :"barbare",
"Img" : "B",
"Life" : 0,
"Launch" : 1,
"Lrm" : 12,
"For" : 4,
"Con" : 1,
"Tai" : 1,
"Dex" : 1,
"Hi" : 20,
"Hr" : 2,
"Weapon" : EPEE_A_SIMPLE_TRANCHANT ,
"Desc" : "Les barbares sont des guerriers ruses, pleins de ressources, perseverants et impitoyables.Ils sont egalement plutot solitaires, c'est pour cela qu'ils vivent a l'ecart de la civilisation,en pleine nature."
}

var PALADIN={
"Name" :"paladin",
"Img" : "P",
"Life" : 0,
"Launch" : 1,
"Lrm" : 10,
"For" : 2,
"Con" : 1,
"Tai" : 1,
"Dex" : 2,
"Hi" : 20,
"Hr" : 5,
"Weapon" : PIQUE,
"Desc" : "Les paladins sont possesseurs de magie divine et exellent dans le soin ainsi que dans la protection.Tres tot, les paladins sont capables de detecter le Mal et vivent pour le combattre."
}

var RODEUR={
"Name" :"rodeur",
"Img" : "R",
"Life" : 0,
"Launch" : 1,
"Lrm" : 8,
"For" : 1,
"Con" : 1,
"Tai" : 1,
"Dex" : 4,
"Hi" : 10,
"Hr" : 2,
"Weapon" : DAGUE,
"Desc" : " Maitres dans l'art de traquer, les rodeurs connaissent les forets comme leurs poches et acceptent frequemment le role de protecteur de ceux qui vivent ou veulent traverser une foret.Plutot faibles ils preferent les embuscades au attaques directes."
}



var Class=new Array();
Class[0]=BARBARE;
Class[1]=PALADIN;
Class[2]=RODEUR;









