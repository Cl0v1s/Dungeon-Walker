
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
"Price" : 0,
"Desc" : "Cet appendice semble etre recouvert de poison..."
}
var GRIFFES={
"Name" : "griffes",
"Id" : 1,
"Atk" :0,
"Launch" :1,
"Lrm" : 2,
"Price" : 0,
"Desc" : "Des griffes de predateur, bien affutes et tranchante comme un rasoir."
}
var PIQUE={
"Name" : "pique",
"Id" : 3,
"Atk" :0,
"Launch" :1,
"Lrm" : 6,
"Price" : 5,
"Desc" : "Un baton disposant d'une extremite en fer travaille. Vous pouvez distinctmement lire des symboles magiques sur la pique."
}
var EPEE_A_DEUX_MAINS={
"Name" : "epee a deux mains",
"Id" : 4,
"Atk" :0,
"Launch" :1,
"Lrm" : 10,
"Price" : 50,
"Desc" : "Une epee imposante, tellement lourde que vous la soutenez a peine avec vos deux bras."
}
var EPEE_A_SIMPLE_TRANCHANT={
"Name" : "epee a simple tranchant",
"Id" : 6,
"Atk" :0,
"Launch" :1,
"Lrm" : 4,
"Price" : 10,
"Desc" : "Une epee de fabrication simple, forgee par un novice."
}
var DAGUE={
"Name" : "dague",
"Id" : 5,
"Atk" : 0,
"Launch" : 1,
"Lrm" : 3,
"Price" : 2,
"Desc" : "Une lame courte et legere. Vous pouvez facilement la dissimuler dans une botte ou sous votre veste."
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
Item=new Array();
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
"Drop" : new Array()
}
ARAIGNEE_VELUE.Drop[0]=SpiderLeg.getId();
ARAIGNEE_VELUE.Drop[1]=SpiderEye.getId();
ARAIGNEE_VELUE.Drop[2]=RottenFlesh.getId();


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
"Light" : 1,
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
"Light" : 1,
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
"Light" : 2,
"Weapon" : DAGUE,
"Desc" : " Maitres dans l'art de traquer, les rodeurs connaissent les forets comme leurs poches et acceptent frequemment le role de protecteur de ceux qui vivent ou veulent traverser une foret.Plutot faibles ils preferent les embuscades au attaques directes."
}



var Class=new Array();
Class[0]=BARBARE;
Class[1]=PALADIN;
Class[2]=RODEUR;









