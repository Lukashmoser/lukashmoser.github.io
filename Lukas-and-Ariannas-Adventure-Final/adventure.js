//to fix fence jump bug, get time of every key clicked, if time between two keys is less than 
//.5 for example, ignore the key click


 
  const levels  = [ 
  // level 0
  ["flag","enemyright","","","wallGL","","","","enemyleft","rider",
   "enemydown","","","","wallGL","","tree","tree","rock","rock",
   "start animate1","animate1","animate1","wallLTC","wallRBC","","","","rock","rock",
   "","","","doorGL","start animate4","animate4","animate4","animate4","animate4","animate4",
   "wallGU","wallGU","wallGU","wallRBC","start animate5","animate5","animate5","animate5","animate5","animate5",
   "","","","","","","","","","",
   "start animate3","animate3","animate3","","tree","tree","tree","","","",
   "","tree","","","tree","rock","tree","start animate2","animate2","animate2",
   "","tree","","","tree","tree","tree","","","",
   "armorpile","tree","","","","enemydown","","","","charup"],
   
  //level 1 ///
  ["chardown","tree","","wallGR","rock","rock","rock","rock","flag","rock",
   "","tree","","doorGR","start animate7","animate7","animate7","animate7","animate7","animate7",
   "","tree","","wallGR","","","","","","",
   "","tree","","wallLBC","wallGU","wallGU","wallGU","wallGU","wallGU","wallGU",
   "","tree","rider","rock","tree","rock","tree","rock","tree","rock",
   "","tree","","start animate8","animate8","animate8","animate8","animate8","","",
   "","tree","","start animate9","animate9","animate9","animate9","animate9","","",
   "","tree","tree","tree","tree","tree","tree","tree","tree","",
   "","start animate10","animate10","animate10","animate10","animate10","animate10","animate10","animate10","",
   "","start animate6","animate6","animate6","animate6","animate6","animate6","animate6","animate6",""],

 //level 2
  ["","","","wallGL","","","","","","tree",
   "","","","doorGL","","tree","","","","tree",
   "","","","wallGL","start animate11","animate11","animate11","tree","","tree",
   "","","","wallGL","","tree","start animate12","animate12","animate12","tree",
   "","","","wallGL","","","rider","tree","","tree",
   "proj1","","proj3","wallGL","","tree","start animate13","animate13","animate13","tree",
   "druid","","druid","wallGL","start animate16","animate16","animate16","tree","","tree",
   "","proj2","","wallGL","armorpile","tree","start animate14","animate14","animate14","animate14",
   "tree","druid","tree","wallGL","","","","tree","","tree",
   "rock","flag","rock","wallGL","rock","tree","start animate15","animate15","animate15","charleft",]
   
  ]; // end of levels ///

const totalLevels = 2;
const noPassObstacles = ["rock", "tree", "water", "wallGL", "wallGR", "wallGD", "wallGU", "wallLBC", "wallLTC", "wallRBC", "wallRTC"]; ///
var currentLevel = 0; // starting level
var riderOn = false; // is the rider on?
var armorOn = false; // is the armor on? ///
var gridBoxes ;
var currentLocationOfHorse = 0;
var currentLocationOfEnemy = 0;
var enemyStart ; // where the enemy starts animation, first box enemy is showed in
var currentAnimation; // allows 1 animation per level

var currentLocationOfHorse = 0;
var currentLocationOfEnemy1 = 0;
var enemyStart1 ; // where the enemy starts animation, first box enemy is showed in
var currentLocationOfEnemy2 = 0;
var enemyStart2 ;
var currentLocationOfEnemy3 = 0;
var enemyStart3 ;
var currentlocationOfEnemy4 = 0;
var enemyStart4;
var currentLocationOfEnemy5 = 0;
var enemyStart5;
var currentLocationOfEnemy6 = 0;
var enemyStart6;
var currentLocationOfEnemy7 = 0;
var enemyStart7;
var currentLocationOfEnemy8 = 0;
var enemyStart8;
var currentLocationOfEnemy9 = 0;
var enemyStart9;
var currentLocationOfEnemy10 = 0;
var enemyStart10;
var currentLocationOfEnemy11 = 0;
var enemyStart11;
var currentLocationOfEnemy12 = 0;
var enemyStart12;
var currentLocationOfEnemy13 = 0;
var enemyStart13;
var currentLocationOfEnemy14 = 0;
var enemyStart14;
var currentLocationOfEnemy15 = 0;
var enemyStart15;
var currentLocationOfEnemy16 = 0;
var enemyStart16;
var currentProjectile1;
var currentProjectile2;
var currentProjectile3;
var currentAnimation1;
var currentAnimation2;
var currentAnimation3;
var currentAnimation4;
var currentAnimation5;
var currentAnimation6;
var currentAnimation7;
var currentAnimation8;
var currentAnimation9;
var currentAnimation10;
var currentAnimation11;
var currentAnimation12;
var currentAnimation13;
var currentAnimation14;
var currentAnimation15;
var currentAnimation16;
var originalLocation1 = 0;
var originalLocation2 = 0;
var originalLocation3 = 0;
var startLocation1 = 0;
var startLocation2 = 0;
var startLocation3 = 0;
var widthOfBoard = 10; 
var counter = 0;
var stage1 = 0;
var stage2 = 0;
var stage3 = 0;
var currentTime = 0;
var oldTime = 0;
var canMove = true;



// start game
window.addEventListener("load", function() {
  gridBoxes = document.querySelectorAll("#gameBoard div");
  loadLevel();
});

// move character 
document.addEventListener("keydown", function (e) {
	
	var d = new Date();
	var n = d.getTime();
	
	currentTime = n;
	
	// 250 is time between key clicks in milliseconds
	if(currentTime > oldTime + 250 || currentTime == oldTime){
    switch (e.keyCode) {
	  case 37: //left arrow
	    if (currentLocationOfHorse % widthOfBoard !== 0 && canMove) {

		  tryToMove("left");  
		}
		break;
	  case 38: //up arrow
	     if (currentLocationOfHorse - widthOfBoard >= 0 && canMove) {
		  tryToMove("up");  
		}
		break;
	  case 39: //right arrow
	     if (currentLocationOfHorse % widthOfBoard < widthOfBoard - 1 && canMove) {
		  tryToMove("right");  
		}
		break;
	  case 40: //down arrow
	     if (currentLocationOfHorse + widthOfBoard < widthOfBoard *
		 widthOfBoard && canMove) {
		  tryToMove("down");  
		}
		break;
	}//switch
	}
	oldTime = currentTime;
}); //key event listener	

//try to move character

function tryToMove(direction) {
	
  // location before move
  let oldLocation = currentLocationOfHorse;
  
  // class of location before move
  let oldClassName = gridBoxes[oldLocation].className;
  
  let currentClass = gridBoxes[oldLocation].className;
  
  let nextLocation = 0; //location we wish to move to
  let nextClass = ""; //class of location we wish to move to
  
  let nextLocation2 = 0;
  let nextClass2 = "";
  
  let newClass = ""; //new class to switch to if move successful
  
  switch(direction) {
	case "left":
	  nextLocation = currentLocationOfHorse - 1;
	  break; 
	case "right":
      nextLocation = currentLocationOfHorse + 1;
	  break; 
    case "up":
      nextLocation = currentLocationOfHorse - widthOfBoard;
	  break;
	case "down":
      nextLocation = currentLocationOfHorse + widthOfBoard;
	  break;

  }  // switch
  
  nextClass = gridBoxes[nextLocation].className;
  
  // if the obstacle is not passable, dont move
  if (noPassObstacles.includes(nextClass)) {return; }
  
  //if its a fence, and there is no rider
  if (!riderOn && nextClass.includes("door")) {return;}
  
  // if there is a fence and the rider is on move two spaces with animation
  if (nextClass.includes("door")) {
	  
	//if jumping fence from its side
    if (nextClass.includes("fenceside") && direction == "left"){
	  return;
    } else if (nextClass.includes("fenceside") && direction == "right"){
	  return; 
    } else if (nextClass.includes("fence 1") && direction == "left"){
	  return;
    } else if (nextClass.includes("fence 1") && direction == "right"){
	  return; 
    }

	
	// rider must be on to jump
	if (riderOn) {
	  gridBoxes[currentLocationOfHorse].className = "";  //will bug if jump is before a bridge
	  oldClassName = gridBoxes[nextLocation].className;

      // set values according to direction
      if(currentClass.includes("armor")){
		if (direction == "left") {
          nextClass = "armorJL";
		  nextClass2 = "armorrideleft";
		  nextLocation2 = nextLocation - 1;
		} else if (direction == "right")	 {
		  nextClass = "armorJR";
		  nextClass2 = "armorrideright";
		  nextLocation2 = nextLocation + 1;
	    } else if (direction == "up") {
		  nextClass = "overfenceup";
		  nextClass2 = "charrideup";
		  nextLocation2 = nextLocation - widthOfBoard;
	    }  else if (direction == "down") {
		  nextClass = "overfencedown";
		  nextClass2 = "charridedown";
		  nextLocation2 = nextLocation + widthOfBoard;
	    } // else if
	  } else{
		if (direction == "left") {
          nextClass = "overfenceleft";
		  nextClass2 = "charrideleft";
		  nextLocation2 = nextLocation - 1;
		} else if (direction == "right")	 {
		  nextClass = "overfenceright";
		  nextClass2 = "charrideright";
		  nextLocation2 = nextLocation + 1;
	    } else if (direction == "up") {
		  nextClass = "overfenceup";
		  nextClass2 = "charrideup";
		  nextLocation2 = nextLocation - widthOfBoard;
	    }  else if (direction == "down") {
		  nextClass = "overfencedown";
		  nextClass2 = "charridedown";
		  nextLocation2 = nextLocation + widthOfBoard;
	    } // else if 
	  }	
    
	  // if impassible object after fence, dont move
	  if(gridBoxes[nextLocation2].className.includes("impassable")){
		gridBoxes[currentLocationOfHorse].className = nextClass2;
		return;
	  } // if
	 
	  //if fence is at edge if grid
	  if(nextLocation2 % widthOfBoard == 0){
	    currentLocationOfHorse = oldLocation;
	    gridBoxes[currentLocationOfHorse].className = nextClass2;
	    return; 
	  } // if

	 
	// show horse jumping 
	gridBoxes[nextLocation].className = nextClass;
	
	setTimeout(function () {
	
	  // set jump back to just a fence
	  gridBoxes[nextLocation].className = oldClassName;
	  
	  // update current location of horse to be 2 spaces past take off
	  currentLocationOfHorse = nextLocation2;
	  
	  // get class of box after jump
	  nextClass = gridBoxes[currentLocationOfHorse].className; //code is written 
	  //that if there is a non passable obsticale after jump, it will throw an error
	  
	  //  show horse and rider after landing
	  gridBoxes[currentLocationOfHorse].className = nextClass2;
	  
	  //  if next box is a flag, go up a level
	  levelUp(nextClass);
	  
	}, 350);
	return;
	
	} // if riderOn
	
  } // if class has fence
  
  
  // if there is a rider, add rider
  if (nextClass == "rider") {
	riderOn = true;  
  } //  if
  
  // if there is armor, add armor
  if(nextClass == "armorpile"){
	armorOn = true;
  }// if
  
  // if there is a bridge in the old location keep it
  if (oldClassName.includes("druid")) {
	gridBoxes[oldLocation].className = "druid";	
  } else {
	gridBoxes[oldLocation].className = "";  
  } // else
  
  // build name of new class ///
  if(armorOn){
	newClass = (riderOn) ? "armorride" : "armor";
    newClass += direction;
  } else {
	newClass = (riderOn) ? "charride" : "char";
    newClass += direction; 
  }///
  
  // if there is a bridge in the next location, keep it
  if (gridBoxes[nextLocation].classList.contains("bridge")) {
	newClass += " bridge";	
  } //if
  
  // move 1 space
  currentLocationOfHorse = nextLocation;
  gridBoxes[currentLocationOfHorse].className = newClass;
  
  // if it is an enemy 
  if(nextClass.includes("enemy2")) {
	document.getElementById("lose").style.display = "block";
	startLocation1 = originalLocation1;
	startLocation2 = originalLocation2;
	startLocation3 = originalLocation3;
	clearTimeout(currentProjectile3);
	clearTimeout(currentProjectile2);
	clearTimeout(currentProjectile1);
	clearTimeout(currentAnimation1);
	clearTimeout(currentAnimation2);
	clearTimeout(currentAnimation3);
	clearTimeout(currentAnimation4);
	clearTimeout(currentAnimation5);
	clearTimeout(currentAnimation6);
	clearTimeout(currentAnimation7);
	clearTimeout(currentAnimation8);
	clearTimeout(currentAnimation9);
	clearTimeout(currentAnimation10);
	clearTimeout(currentAnimation11);
	clearTimeout(currentAnimation12);
	clearTimeout(currentAnimation13);
	clearTimeout(currentAnimation14);
	clearTimeout(currentAnimation15);
	clearTimeout(currentAnimation16);
	canMove = false;
    return;
  } else if (nextClass.includes("enemy")){
	if(!newClass.includes("armor")){
	  document.getElementById("lose").style.display = "block";
	  startLocation1 = originalLocation1;
	  startLocation2 = originalLocation2;
	  startLocation3 = originalLocation3;
	  clearTimeout(currentProjectile3);
	  clearTimeout(currentProjectile2);
	  clearTimeout(currentProjectile1);
	  clearTimeout(currentAnimation1);
		clearTimeout(currentAnimation2);
		clearTimeout(currentAnimation3);
		clearTimeout(currentAnimation4);
		clearTimeout(currentAnimation5);
		clearTimeout(currentAnimation6);
		clearTimeout(currentAnimation7);
		clearTimeout(currentAnimation8);
		clearTimeout(currentAnimation9);
		clearTimeout(currentAnimation10);
		clearTimeout(currentAnimation11);
		clearTimeout(currentAnimation12);
		clearTimeout(currentAnimation13);
		clearTimeout(currentAnimation14);
		clearTimeout(currentAnimation15);
		clearTimeout(currentAnimation16);
	  canMove = false;
      return;
	}
  }
  
  // if it is an orb
  if(nextClass.includes("orb")){
	document.getElementById("lose").style.display = "block";
	startLocation1 = originalLocation1;
	startLocation2 = originalLocation2;
	startLocation3 = originalLocation3;
	clearTimeout(currentProjectile3);
	clearTimeout(currentProjectile2);
	clearTimeout(currentProjectile1);
	clearTimeout(currentAnimation1);
	clearTimeout(currentAnimation2);
	clearTimeout(currentAnimation3);
	clearTimeout(currentAnimation4);
	clearTimeout(currentAnimation5);
	clearTimeout(currentAnimation6);
	clearTimeout(currentAnimation7);
	clearTimeout(currentAnimation8);
	clearTimeout(currentAnimation9);
	clearTimeout(currentAnimation10);
	clearTimeout(currentAnimation11);
	clearTimeout(currentAnimation12);
	clearTimeout(currentAnimation13);
	clearTimeout(currentAnimation14);
	clearTimeout(currentAnimation15);
	clearTimeout(currentAnimation16);
	canMove = false;
    return;
  }
  
  if(nextClass.includes("druid")){
	if(!newClass.includes("armor")){
	  document.getElementById("lose").style.display = "block";
	  startLocation1 = originalLocation1;
	  startLocation2 = originalLocation2;
	  startLocation3 = originalLocation3;
	  clearTimeout(currentProjectile3);
	  clearTimeout(currentProjectile2);
	  clearTimeout(currentProjectile1);
	  clearTimeout(currentAnimation1);
	  clearTimeout(currentAnimation2);
	  clearTimeout(currentAnimation3);
	  clearTimeout(currentAnimation4);
	  clearTimeout(currentAnimation5);
	  clearTimeout(currentAnimation6);
	  clearTimeout(currentAnimation7);
	  clearTimeout(currentAnimation8);
	  clearTimeout(currentAnimation9);
	  clearTimeout(currentAnimation10);
	  clearTimeout(currentAnimation11);
	  clearTimeout(currentAnimation12);
	  clearTimeout(currentAnimation13);
	  clearTimeout(currentAnimation14);
	  clearTimeout(currentAnimation15);
	  clearTimeout(currentAnimation16);
	  canMove = false;
      return;
	}  
  }
  
  //move up a level if needed
  levelUp(nextClass);
  
} //tryToMove

// move up a level
function levelUp(nextClass) {
  if (nextClass == "flag" && riderOn && currentLevel < totalLevels) {
	document.getElementById("levelup").style.display = "block";
	clearTimeout(currentAnimation);
	setTimeout (function() {
	  document.getElementById("levelup").style.display = "none";
	    currentLevel++;  //add an if statement if there are no more levels dont increment
	    loadLevel(); 
	  
	}, 1000);
	
  } else if(nextClass == "flag" && riderOn && currentLevel >= totalLevels){
	  document.getElementById("end").style.display = "block";
	  clearTimeout(currentAnimation);
  } // else if
  
} //levelUp


// load current levels 0 - maxlevel
function loadLevel(){
  let levelMap = levels[currentLevel];
  let animateBoxes1 = [];
  let animateBoxes2 = [];
  let animateBoxes3 = [];
  let animateBoxes4 = [];
  let animateBoxes5 = [];
  let animateBoxes6 = [];
  let animateBoxes7 = [];
  let animateBoxes8 = [];
  let animateBoxes9 = [];
  let animateBoxes10 = [];
  let animateBoxes11= [];
  let animateBoxes12 = [];
  let animateBoxes13 = [];
  let animateBoxes14 = [];
  let animateBoxes15 = [];
  let animateBoxes16 = [];
  let animate1Index = 0;
  let animate2Index = 0;
  let animate3Index = 0;
  let animate4Index = 0;
  let animate5Index = 0;
  let animate6Index = 0;
  let animate5Direction = "left";
  let animate6Direction = "down";
  let projectile1 = 0;
  let projectile2 = 0;
  let projectile3 = 0;
  riderOn = false;
  armorOn = false;
  canMove = true;
  document.getElementById("lose").style.display = "none";
  
  // load board
  for(var i = 0; i < gridBoxes.length; i++){
	gridBoxes[i].className = levelMap[i];
	if(levelMap[i].includes("char")) currentLocationOfHorse = i;
	if(levelMap[i].includes("proj1")){
	  projectile1 = i;
	}
	if(levelMap[i].includes("proj2")){
	  projectile2 = i;
	}
	if(levelMap[i].includes("proj3")){
	  projectile3 = i;
	}
	if(currentLevel == 0){
		if(levelMap[i].includes("start animate1")){ 
		  enemyStart1 = i - 1;
		  currentLocationOfEnemy1 = enemyStart1;
		}// if
		if(levelMap[i].includes("start animate2")){ 
		  enemyStart2 = i - 1;
		  currentLocationOfEnemy2 = enemyStart2;
		}// if
		if(levelMap[i].includes("start animate3")){ 
		  enemyStart3 = i - 1;
		  currentLocationOfEnemy3 = enemyStart3;
		}// if
		if(levelMap[i].includes("start animate4")){ 
		  enemyStart4 = i - 1;
		  currentLocationOfEnemy4 = enemyStart4;
		}// if
		if(levelMap[i].includes("start animate5")){ 
		  enemyStart5 = i + 6;
		  currentLocationOfEnemy5 = enemyStart5;
		} 
	} else if (currentLevel == 1){
	
		if(levelMap[i].includes("start animate6")){ 
		  enemyStart6 = i;
		  currentLocationOfEnemy6 = enemyStart6;
		}
		if(levelMap[i].includes("start animate7")){ 
		  enemyStart7 = i ;
		  currentLocationOfEnemy7 = enemyStart7;
		}
		if(levelMap[i].includes("start animate8")){ 
		  enemyStart8 = i ;
		  currentLocationOfEnemy8 = enemyStart8;
		}
		if(levelMap[i].includes("start animate9")){ 
		  enemyStart9 = i + 4;
		  currentLocationOfEnemy9 = enemyStart9;
		}
		if(levelMap[i].includes("start animate10")){ 
		  enemyStart10 = i + 6;
		  currentLocationOfEnemy10 = enemyStart10;
		}
	} else if(currentLevel == 2){
	
		if(levelMap[i].includes("start animate11")){ 
		  enemyStart11 = i - 1;
		  currentLocationOfEnemy11 = enemyStart11;
		}
		if(levelMap[i].includes("start animate12")){ 
		  enemyStart12 = i - 1;
		  currentLocationOfEnemy12 = enemyStart12;
		}
		if(levelMap[i].includes("start animate13")){ 
		  enemyStart13 = i - 1;
		  currentLocationOfEnemy13 = enemyStart13;
		}
		if(levelMap[i].includes("start animate14")){ 
		  enemyStart14 = i - 1;
		  currentLocationOfEnemy14 = enemyStart14;
		}
		if(levelMap[i].includes("start animate15")){ 
		  enemyStart15 = i - 1;
		  currentLocationOfEnemy15 = enemyStart15;
		}
		if(levelMap[i].includes("start animate16")){ 
		  enemyStart16 = i - 1;
		  currentLocationOfEnemy16 = enemyStart16;
		}// if
	}

  } // for
  
  animateBoxes1 = document.querySelectorAll(".animate1");
  animateBoxes2 = document.querySelectorAll(".animate2");
  animateBoxes3 = document.querySelectorAll(".animate3");
  animateBoxes4 = document.querySelectorAll(".animate4");
  animateBoxes5 = document.querySelectorAll(".animate5");
  animateBoxes6 = document.querySelectorAll(".animate6");
  animateBoxes7 = document.querySelectorAll(".animate7");
  animateBoxes8 = document.querySelectorAll(".animate8");
  animateBoxes9 = document.querySelectorAll(".animate9");
  animateBoxes10 = document.querySelectorAll(".animate10");
  animateBoxes11 = document.querySelectorAll(".animate11");
  animateBoxes12 = document.querySelectorAll(".animate12");
  animateBoxes13 = document.querySelectorAll(".animate13");
  animateBoxes14 = document.querySelectorAll(".animate14");
  animateBoxes15 = document.querySelectorAll(".animate15");
  animateBoxes16 = document.querySelectorAll(".animate16");
  
  if(currentLevel == 0){

    animateEnemy1(animateBoxes1, 0, "right");
    animateEnemy2(animateBoxes2, 0, "right");
    animateEnemy3(animateBoxes3, 0, "right");
    animateEnemy4(animateBoxes4, 0, "right");
    animateEnemy5(animateBoxes5, 5, animate5Direction);
  } else if (currentLevel == 1) {
 
  animateEnemy6(animateBoxes6, 0, "right"); 
  animateEnemy7(animateBoxes7, 0, "right"); 
  animateEnemy8(animateBoxes8, 0, "right"); 
  animateEnemy9(animateBoxes9,4, "right"); 
  animateEnemy10(animateBoxes10, 7, "left"); 
  } else if (currentLevel == 2){
  animateEnemy11(animateBoxes11, 0, "right"); 
  animateEnemy12(animateBoxes12, 0, "right"); 
  animateEnemy13(animateBoxes13, 0, "right"); 
  animateEnemy14(animateBoxes14, 0, "right"); 
  animateEnemy15(animateBoxes15, 0, "right"); 
  animateEnemy16(animateBoxes16, 0, "right"); 
  }
  
  if(currentLevel == 2){
	animateProjectile1(projectile1);
    animateProjectile2(projectile2);
    animateProjectile3(projectile3);
  }
  
} //loadLevel

//animate projectiles
function animateProjectile1(startLocation){
  if(stage1 == 0){
	startLocation1 = startLocation;
	startLocation = startLocation1;
	gridBoxes[startLocation].classList.add("orb");
	originalLocation1 = startLocation;
  }
  if(stage1 == 1){
	gridBoxes[startLocation].classList.remove("orb");
    startLocation -= widthOfBoard;
	gridBoxes[startLocation].classList.add("orb");
  }
  if(stage1 == 2){
	gridBoxes[startLocation].classList.remove("orb");
    startLocation -= widthOfBoard;
	gridBoxes[startLocation].classList.add("orb");
  }
  if(stage1 == 3){
	gridBoxes[startLocation].classList.remove("orb");
    startLocation -= widthOfBoard;
	gridBoxes[startLocation].classList.add("orb");
  }
  if(stage1 == 4){
	gridBoxes[startLocation].classList.remove("orb");
	startLocation = originalLocation1;
	startLocation += 10;
	stage1 = 0;
  }
  
  if(currentLocationOfHorse == startLocation){
	document.getElementById("lose").style.display = "block";
	startLocation1 = originalLocation1;
	startLocation2 = originalLocation2;
	startLocation3 = originalLocation3;
	clearTimeout(currentProjectile3);
	clearTimeout(currentProjectile2);
	clearTimeout(currentProjectile1);
	clearTimeout(currentAnimation1);
	clearTimeout(currentAnimation2);
	clearTimeout(currentAnimation3);
	clearTimeout(currentAnimation4);
	clearTimeout(currentAnimation5);
	clearTimeout(currentAnimation6);
	clearTimeout(currentAnimation7);
	clearTimeout(currentAnimation8);
	clearTimeout(currentAnimation9);
	clearTimeout(currentAnimation10);
	clearTimeout(currentAnimation11);
	clearTimeout(currentAnimation12);
	clearTimeout(currentAnimation13);
	clearTimeout(currentAnimation14);
	clearTimeout(currentAnimation15);
	clearTimeout(currentAnimation16);
	canMove = false;
	
    return;	  
  }
   currentProjectile1 = setTimeout(function(){
	animateProjectile1(startLocation);
	
  }, 1000);
   
   stage1++;
}

function animateProjectile2(startLocation){
  if(stage2 == 0){
	startLocation2 = startLocation;
	startLocation = startLocation2;
	gridBoxes[startLocation].classList.add("orb");
	originalLocation2 = startLocation;
  }
  if(stage2 == 1){
	gridBoxes[startLocation].classList.remove("orb");
    startLocation -= widthOfBoard;
	gridBoxes[startLocation].classList.add("orb");
  }
  if(stage2 == 2){
	gridBoxes[startLocation].classList.remove("orb");
    startLocation -= widthOfBoard;
	gridBoxes[startLocation].classList.add("orb");
  }
  if(stage2 == 3){
	gridBoxes[startLocation].classList.remove("orb");
    startLocation -= widthOfBoard;
	gridBoxes[startLocation].classList.add("orb");
  }
  if(stage2 == 4){
	gridBoxes[startLocation].classList.remove("orb");
	startLocation = originalLocation2;
	startLocation += 10;
	stage2 = 0;
  }
  
  if(currentLocationOfHorse == startLocation){
	document.getElementById("lose").style.display = "block";
	startLocation1 = originalLocation1;
	startLocation2 = originalLocation2;
	startLocation3 = originalLocation3;
	clearTimeout(currentProjectile3);
	clearTimeout(currentProjectile2);
	clearTimeout(currentProjectile1);
	clearTimeout(currentAnimation1);
	clearTimeout(currentAnimation2);
	clearTimeout(currentAnimation3);
	clearTimeout(currentAnimation4);
	clearTimeout(currentAnimation5);
	clearTimeout(currentAnimation6);
	clearTimeout(currentAnimation7);
	clearTimeout(currentAnimation8);
	clearTimeout(currentAnimation9);
	clearTimeout(currentAnimation10);
	clearTimeout(currentAnimation11);
	clearTimeout(currentAnimation12);
	clearTimeout(currentAnimation13);
	clearTimeout(currentAnimation14);
	clearTimeout(currentAnimation15);
	clearTimeout(currentAnimation16);
	canMove = false;
	
    return;	  
  }
   currentProjectile2 = setTimeout(function(){
	animateProjectile2(startLocation);
	
  }, 1000);
   
   stage2++;
}

function animateProjectile3(startLocation){
  if(stage3 == 0){
	startLocation3 = startLocation;
	startLocation = startLocation3;
	originalLocation3 = startLocation;
	gridBoxes[startLocation].classList.add("orb");
	
  }
  if(stage3 == 1){
	gridBoxes[startLocation].classList.remove("orb");
    startLocation -= widthOfBoard;
	gridBoxes[startLocation].classList.add("orb");
  }
  if(stage3 == 2){
	gridBoxes[startLocation].classList.remove("orb");
    startLocation -= widthOfBoard;
	gridBoxes[startLocation].classList.add("orb");
  }
  if(stage3 == 3){
	gridBoxes[startLocation].classList.remove("orb");
    startLocation -= widthOfBoard;
	gridBoxes[startLocation].classList.add("orb");
  }
  if(stage3 == 4){
	gridBoxes[startLocation].classList.remove("orb");
	startLocation = originalLocation3;
	startLocation += 10;
	stage3 = 0;
  }
  
  if(currentLocationOfHorse == startLocation){
	document.getElementById("lose").style.display = "block";
	startLocation1 = originalLocation1;
	startLocation2 = originalLocation2;
	startLocation3 = originalLocation3;
	clearTimeout(currentProjectile3);
	clearTimeout(currentProjectile2);
	clearTimeout(currentProjectile1);
	clearTimeout(currentAnimation1);
	clearTimeout(currentAnimation2);
	clearTimeout(currentAnimation3);
	clearTimeout(currentAnimation4);
	clearTimeout(currentAnimation5);
	clearTimeout(currentAnimation6);
	clearTimeout(currentAnimation7);
	clearTimeout(currentAnimation8);
	clearTimeout(currentAnimation9);
	clearTimeout(currentAnimation10);
	clearTimeout(currentAnimation11);
	clearTimeout(currentAnimation12);
	clearTimeout(currentAnimation13);
	clearTimeout(currentAnimation14);
	clearTimeout(currentAnimation15);
	clearTimeout(currentAnimation16);
	canMove = false;
	
    return;	  
  }
   currentProjectile3 = setTimeout(function(){
	animateProjectile3(startLocation);
	
  }, 1000);
   
   stage3++;
   
   
}
// animate enemy left to right
// boxes - array of grid boxes that include animation
// index - current location of animation
// direction - current direction of animation
function animateEnemy1(boxes, index, direction){///////////////////
	
  if(counter == 0){
    currentLocationOfEnemy1 = enemyStart1;
  } // if
  
  // exits function if no animation
  if(boxes.length <= 0){ return;}
  if(currentLevel == 1){ return;}
  if(currentLevel == 2){ return;}
  // update the images
  if(direction == "right"){
	boxes[index].classList.add("enemy2right");
  } else{
	boxes[index].classList.add("enemy2left");
  } //else
  
  // remove images from other boxes
  for(i = 0; i < boxes.length; i++){
	if(i != index){
	  boxes[i].classList.remove("enemy2left");
	  boxes[i].classList.remove("enemy2right");
	} //if
  } //for

  // moving right
  if(direction == "right"){
	if(counter >= 1){

		currentLocationOfEnemy1++;
	} // if
	
	// turn around if hit right side of animation
	if(index == boxes.length - 1){
	  //currentLocationOfEnemy = currentLocationOfEnemy + 1;
	  index--;
	  direction = "left";
    } else{
	  index++;
    } //else
	
  // moving left
  } else{
	if(counter >= 1){

		currentLocationOfEnemy1--;
	} //if 
	
	// turn around if hit left side of animation
    if(index == 0){
	 // currentLocationOfEnemy = currentLocationOfEnemy - 1;
	  index++;
	  direction = "right";
	} else{
		index--;
	} //else
		
  }// else
  
 // if enemy runs into player, end the game

  if(currentLocationOfHorse == currentLocationOfEnemy1){
	document.getElementById("lose").style.display = "block";
	startLocation1 = originalLocation1;
	startLocation2 = originalLocation2;
	startLocation3 = originalLocation3;
	clearTimeout(currentProjectile3);
	clearTimeout(currentProjectile2);
	clearTimeout(currentProjectile1);
	clearTimeout(currentAnimation1);
	clearTimeout(currentAnimation2);
	clearTimeout(currentAnimation3);
	clearTimeout(currentAnimation4);
	clearTimeout(currentAnimation5);
	clearTimeout(currentAnimation6);
	clearTimeout(currentAnimation7);
	clearTimeout(currentAnimation8);
	clearTimeout(currentAnimation9);
	clearTimeout(currentAnimation10);
	clearTimeout(currentAnimation11);
	clearTimeout(currentAnimation12);
	clearTimeout(currentAnimation13);
	clearTimeout(currentAnimation14);
	clearTimeout(currentAnimation15);
	clearTimeout(currentAnimation16);
	canMove = false;
    return;	  
  } //if
  
counter++;
 
  currentAnimation1 = setTimeout(function(){
	  animateEnemy1(boxes, index, direction);
  }, 750);
   
   //counter++;

 
}// animateEnemy1

// animate enemy left to right
// boxes - array of grid boxes that include animation
// index - current location of animation
// direction - current direction of animation
// enemy - type of enemy displayed
function animateEnemy2(boxes, index, direction){///////////////////
	
  if(counter == 0){
    currentLocationOfEnemy2 = enemyStart2;
  } // if
  
  // exits function if no animation
  if(boxes.length <= 0){ return;}
   if(currentLevel == 1){ return;}
   if(currentLevel == 2){ return;}
  
  // update the images
  if(direction == "right"){
	boxes[index].classList.add("enemy2right");
  } else{
	boxes[index].classList.add("enemy2left");
  } //else
  
  // remove images from other boxes
  for(i = 0; i < boxes.length; i++){
	if(i != index){
	  boxes[i].classList.remove("enemy2left");
	  boxes[i].classList.remove("enemy2right");
	} //if
  } //for
  
  // moving right
  if(direction == "right"){
	if(counter >= 1){

		currentLocationOfEnemy2++;
	} // if
	
	// turn around if hit right side of animation
	if(index == boxes.length - 1){
	  //currentLocationOfEnemy = currentLocationOfEnemy + 1;
	  index--;
	  direction = "left";
    } else{
	  index++;
    } //else
	
  // moving left
  } else{
	if(counter >= 1){

		currentLocationOfEnemy2--;
	} //if 
	
	// turn around if hit left side of animation
    if(index == 0){
	 // currentLocationOfEnemy = currentLocationOfEnemy - 1;
	  index++;
	  direction = "right";
	} else{
		index--;
	} //else
		
  }// else
  

  currentAnimation2 = setTimeout(function(){
	  animateEnemy2(boxes, index, direction);
  }, 750);
   
   //counter++;

  // if enemy runs into player, end the game
  if(currentLocationOfHorse == currentLocationOfEnemy2){
	document.getElementById("lose").style.display = "block";
	startLocation1 = originalLocation1;
	startLocation2 = originalLocation2;
	startLocation3 = originalLocation3;
	clearTimeout(currentProjectile3);
	clearTimeout(currentProjectile2);
	clearTimeout(currentProjectile1);
	clearTimeout(currentAnimation1);
	clearTimeout(currentAnimation2);
	clearTimeout(currentAnimation3);
	clearTimeout(currentAnimation4);
	clearTimeout(currentAnimation5);
	clearTimeout(currentAnimation6);
	clearTimeout(currentAnimation7);
	clearTimeout(currentAnimation8);
	clearTimeout(currentAnimation9);
	clearTimeout(currentAnimation10);
	clearTimeout(currentAnimation11);
	clearTimeout(currentAnimation12);
	clearTimeout(currentAnimation13);
	clearTimeout(currentAnimation14);
	clearTimeout(currentAnimation15);
	clearTimeout(currentAnimation16);
	canMove = false;
    return;	  
  } //if
}// animateEnemy2

// animate enemy left to right
// boxes - array of grid boxes that include animation
// index - current location of animation
// direction - current direction of animation
// enemy - type of enemy displayed
function animateEnemy3(boxes, index, direction){///////////////////
	
  if(counter == 0){
    currentLocationOfEnemy3 = enemyStart3;
  } // if
  
  // exits function if no animation
  if(boxes.length <= 0){ return;}
   if(currentLevel == 1){ return;}
      if(currentLevel == 2){ return;}
  
  // update the images
  if(direction == "right"){
	boxes[index].classList.add("enemy2right");
  } else{
	boxes[index].classList.add("enemy2left");
  } //else
  
  // remove images from other boxes
  for(i = 0; i < boxes.length; i++){
	if(i != index){
	  boxes[i].classList.remove("enemy2left");
	  boxes[i].classList.remove("enemy2right");
	} //if
  } //for
  
  // moving right
  if(direction == "right"){
	if(counter >= 1){

		currentLocationOfEnemy3++;
	} // if
	
	// turn around if hit right side of animation
	if(index == boxes.length - 1){
	  //currentLocationOfEnemy = currentLocationOfEnemy + 1;
	  index--;
	  direction = "left";
    } else{
	  index++;
    } //else
	
  // moving left
  } else{
	if(counter >= 1){

		currentLocationOfEnemy3--;
	} //if 
	
	// turn around if hit left side of animation
    if(index == 0){
	 // currentLocationOfEnemy = currentLocationOfEnemy - 1;
	  index++;
	  direction = "right";
	} else{
		index--;
	} //else
		
  }// else
  

  currentAnimation3 = setTimeout(function(){
	  animateEnemy3(boxes, index, direction);
  }, 750);
   
   //counter++;

  // if enemy runs into player, end the game

  if(currentLocationOfHorse == currentLocationOfEnemy3){
	document.getElementById("lose").style.display = "block";
	startLocation1 = originalLocation1;
	startLocation2 = originalLocation2;
	startLocation3 = originalLocation3;
	clearTimeout(currentProjectile3);
	clearTimeout(currentProjectile2);
	clearTimeout(currentProjectile1);
	clearTimeout(currentAnimation1);
	clearTimeout(currentAnimation2);
	clearTimeout(currentAnimation3);
	clearTimeout(currentAnimation4);
	clearTimeout(currentAnimation5);
	clearTimeout(currentAnimation6);
	clearTimeout(currentAnimation7);
	clearTimeout(currentAnimation8);
	clearTimeout(currentAnimation9);
	clearTimeout(currentAnimation10);
	clearTimeout(currentAnimation11);
	clearTimeout(currentAnimation12);
	clearTimeout(currentAnimation13);
	clearTimeout(currentAnimation14);
	clearTimeout(currentAnimation15);
	clearTimeout(currentAnimation16);
	canMove = false;
    return;	  
  } //if
}// animateEnemy3

// animate enemy left to right
// boxes - array of grid boxes that include animation
// index - current location of animation
// direction - current direction of animation
// enemy - type of enemy displayed
function animateEnemy4(boxes, index, direction){///////////////////
	
  if(counter == 0){
    currentLocationOfEnemy4 = enemyStart4;
  } // if
  
  // exits function if no animation
  if(boxes.length <= 0){ return;}
   if(currentLevel == 1){ return;}
       if(currentLevel == 2){ return;}
  
  // update the images
  if(direction == "right"){
	boxes[index].classList.add("enemy2right");
  } else{
	boxes[index].classList.add("enemy2left");
  } //else
  
  // remove images from other boxes
  for(i = 0; i < boxes.length; i++){
	if(i != index){
	  boxes[i].classList.remove("enemy2left");
	  boxes[i].classList.remove("enemy2right");
	} //if
  } //for
  
  // moving right
  if(direction == "right"){
	if(counter >= 1){

		currentLocationOfEnemy4++;
	} // if
	
	// turn around if hit right side of animation
	if(index == boxes.length - 1){
	  //currentLocationOfEnemy = currentLocationOfEnemy + 1;
	  index--;
	  direction = "left";
    } else{
	  index++;
    } //else
	
  // moving left
  } else{
	if(counter >= 1){

		currentLocationOfEnemy4--;
	} //if 
	
	// turn around if hit left side of animation
    if(index == 0){
	 // currentLocationOfEnemy = currentLocationOfEnemy - 1;
	  index++;
	  direction = "right";
	} else{
		index--;
	} //else
		
  }// else
  

  currentAnimation4 = setTimeout(function(){
	  animateEnemy4(boxes, index, direction);
  }, 750);
   
   //counter++;

  // if enemy runs into player, end the game

  if(currentLocationOfHorse == currentLocationOfEnemy4){
	document.getElementById("lose").style.display = "block";
	startLocation1 = originalLocation1;
	startLocation2 = originalLocation2;
	startLocation3 = originalLocation3;
	clearTimeout(currentProjectile3);
	clearTimeout(currentProjectile2);
	clearTimeout(currentProjectile1);
	clearTimeout(currentAnimation1);
	clearTimeout(currentAnimation2);
	clearTimeout(currentAnimation3);
	clearTimeout(currentAnimation4);
	clearTimeout(currentAnimation5);
	clearTimeout(currentAnimation6);
	clearTimeout(currentAnimation7);
	clearTimeout(currentAnimation8);
	clearTimeout(currentAnimation9);
	clearTimeout(currentAnimation10);
	clearTimeout(currentAnimation11);
	clearTimeout(currentAnimation12);
	clearTimeout(currentAnimation13);
	clearTimeout(currentAnimation14);
	clearTimeout(currentAnimation15);
	clearTimeout(currentAnimation16);
	canMove = false;
    return;	  
  } //if
}// animateEnemy4

// animate enemy left to right
// boxes - array of grid boxes that include animation
// index - current location of animation
// direction - current direction of animation
// enemy - type of enemy displayed
function animateEnemy5(boxes, index, direction){///////////////////
	
  if(counter == 0){
    currentLocationOfEnemy5 = enemyStart5;
  } // if
  
  // exits function if no animation
  if(boxes.length <= 0){ return;}
   if(currentLevel == 1){ return;}
    if(currentLevel == 2){ return;}
  
  // update the images
  if(direction == "right"){
	boxes[index].classList.add("enemy2right");
  } else if (direction == "left"){
	boxes[index].classList.add("enemy2left");
  } else if (direction == "up"){
	boxes[index].classList.add("enemy2up");
  } else if (direction == "down"){
	boxes[index].classList.add("enemy2down");
  } //else
  
  // remove images from other boxes
  for(i = 0; i < boxes.length; i++){
	if(i != index){
	  boxes[i].classList.remove("enemy2left");
	  boxes[i].classList.remove("enemy2right");
	  boxes[i].classList.remove("enemy2up");
	  boxes[i].classList.remove("enemy2down");
	} //if
  } //for
  
  // moving right
  if(direction == "right"){
	if(counter >= 1){

		currentLocationOfEnemy5++;
	} // if
	
	// turn around if hit right side of animation
	if(index == boxes.length - 1){
	  //currentLocationOfEnemy = currentLocationOfEnemy + 1;
	  index--;
	  direction = "left";
    } else{
	  index++;
    } //else
	
  // moving left
  }  else if (direction == "left"){
	if(counter >= 1){

		currentLocationOfEnemy5--;
	} //if 
	
	// turn around if hit left side of animation
    if(index == 0){
	 // currentLocationOfEnemy = currentLocationOfEnemy - 1;
	  index++;
	  direction = "right";
	} else{
		index--;
	} //else
		
  }else if (direction == "up"){
	if(counter >= 1){
		currentLocationOfEnemy5 = currentLocationOfEnemy5 - widthOfBoard;
	} //if 
	
	// turn around if hit left side of animation
    if(index == 0){
	 // currentLocationOfEnemy = currentLocationOfEnemy - 1;
	 index++;
	  direction = "down";
	} else{
	  index--;
	 
	} //else
	
  } else if (direction == "down"){
	  if (counter >= 1){
		currentLocationOfEnemy5 = currentLocationOfEnemy5 + widthOfBoard;
	  }
	// turn around if hit left side of animation
    if(index == boxes.length - 1){

	 // currentLocationOfEnemy = currentLocationOfEnemy - 1;
	  index--;
	  direction = "up";
	} else{
		index++;
	} //else
		
  }// else


  currentAnimation5 = setTimeout(function(){
	  animateEnemy5(boxes, index, direction);
  }, 750);
   
   //counter++;

  // if enemy runs into player, end the game

  if(currentLocationOfHorse == currentLocationOfEnemy5){
	document.getElementById("lose").style.display = "block";
	startLocation1 = originalLocation1;
	startLocation2 = originalLocation2;
	startLocation3 = originalLocation3;
	clearTimeout(currentProjectile3);
	clearTimeout(currentProjectile2);
	clearTimeout(currentProjectile1);
	clearTimeout(currentAnimation1);
	clearTimeout(currentAnimation2);
	clearTimeout(currentAnimation3);
	clearTimeout(currentAnimation4);
	clearTimeout(currentAnimation5);
	clearTimeout(currentAnimation6);
	clearTimeout(currentAnimation7);
	clearTimeout(currentAnimation8);
	clearTimeout(currentAnimation9);
	clearTimeout(currentAnimation10);
	clearTimeout(currentAnimation11);
	clearTimeout(currentAnimation12);
	clearTimeout(currentAnimation13);
	clearTimeout(currentAnimation14);
	clearTimeout(currentAnimation15);
	clearTimeout(currentAnimation16);
	canMove = false;
    return;	  
  } //if
}// animateEnemy5

// animate enemy left to right
// boxes - array of grid boxes that include animation
// index - current location of animation
// direction - current direction of animation
// enemy - type of enemy displayed
function animateEnemy6(boxes, index, direction){///////////////////
	
  if(counter == 0){
    currentLocationOfEnemy6 = enemyStart6;
  } // if
  
  // exits function if no animation
  if(boxes.length <= 0){ return;}
  if(currentLevel == 2){ return;}
  if(currentLevel == 0){ return;}
  // update the images
  if(direction == "right"){
	boxes[index].classList.add("enemy2right");
  } else if (direction == "left"){
	boxes[index].classList.add("enemy2left");
  } else if (direction == "up"){
	boxes[index].classList.add("enemy2up");
  } else if (direction == "down"){
	boxes[index].classList.add("enemy2down");
  } //else
  
  // remove images from other boxes
  for(i = 0; i < boxes.length; i++){
	if(i != index){
	  boxes[i].classList.remove("enemy2left");
	  boxes[i].classList.remove("enemy2right");
	  boxes[i].classList.remove("enemy2up");
	  boxes[i].classList.remove("enemy2down");
	} //if
  } //for
  
  // moving right
  if(direction == "right"){
	if(counter >= 1){
     currentLocationOfEnemy6++;
	} // if
	
	// turn around if hit right side of animation
	if(index == boxes.length - 1){
	  //currentLocationOfEnemy = currentLocationOfEnemy + 1;
	  index--;
	  direction = "left";
    } else{
	  index++;
    } //else
	
  // moving left
  }  else if (direction == "left"){
	if(counter >= 1){

		currentLocationOfEnemy6--;
	} //if 
	
	// turn around if hit left side of animation
    if(index == 0){
	 // currentLocationOfEnemy = currentLocationOfEnemy - 1;
	  index++;
	  direction = "right";
	} else{
		index--;
	} //else
		
  }else if (direction == "up"){
	if(counter >= 1){
		currentLocationOfEnemy6 = currentLocationOfEnemy6 - widthOfBoard;
		
	} //if 
	
	// turn around if hit left side of animation
    if(index == 0){
	 // currentLocationOfEnemy = currentLocationOfEnemy - 1;
	 direction = "down";
	 index++;
	 
	} else{
	  index--;
	 
	} //else
	
  } else if (direction == "down"){
	  if (counter >= 1){
		currentLocationOfEnemy6 = currentLocationOfEnemy6 + widthOfBoard;
	
	  }
	// turn around if hit left side of animation
    if(index == boxes.length - 1){
	 direction = "up";
	  index--;
	
	} else{
		index++;
	} //else
		
  }// else

   // if enemy runs into player, end the game

  if(currentLocationOfHorse == currentLocationOfEnemy6){
	document.getElementById("lose").style.display = "block";
	startLocation1 = originalLocation1;
	startLocation2 = originalLocation2;
	startLocation3 = originalLocation3;
	clearTimeout(currentProjectile3);
	clearTimeout(currentProjectile2);
	clearTimeout(currentProjectile1);
	clearTimeout(currentAnimation1);
	clearTimeout(currentAnimation2);
	clearTimeout(currentAnimation3);
	clearTimeout(currentAnimation4);
	clearTimeout(currentAnimation5);
	clearTimeout(currentAnimation6);
	clearTimeout(currentAnimation7);
	clearTimeout(currentAnimation8);
	clearTimeout(currentAnimation9);
	clearTimeout(currentAnimation10);
	clearTimeout(currentAnimation11);
	clearTimeout(currentAnimation12);
	clearTimeout(currentAnimation13);
	clearTimeout(currentAnimation14);
	clearTimeout(currentAnimation15);
	clearTimeout(currentAnimation16);
	canMove = false;
    return;	  
  } //if 


  currentAnimation6 = setTimeout(function(){
	  counter++;
	  animateEnemy6(boxes, index, direction);
  }, 750);
   
   //counter++;


}// animateEnemy6

// animate enemy left to right
// boxes - array of grid boxes that include animation
// index - current location of animation
// direction - current direction of animation
// enemy - type of enemy displayed
function animateEnemy7(boxes, index, direction){///////////////////
	
  if(counter == 0){
    currentLocationOfEnemy7 = enemyStart7;
  } // if
  
  // exits function if no animation
  if(boxes.length <= 0){ return;}
  if(currentLevel == 2){ return;}
  if(currentLevel == 0){ return;}
  
  // update the images
  if(direction == "right"){
	boxes[index].classList.add("enemy2right");
  } else if (direction == "left"){
	boxes[index].classList.add("enemy2left");
  } else if (direction == "up"){
	boxes[index].classList.add("enemy2up");
  } else if (direction == "down"){
	boxes[index].classList.add("enemy2down");
  } //else
  
  // remove images from other boxes
  for(i = 0; i < boxes.length; i++){
	if(i != index){
	  boxes[i].classList.remove("enemy2left");
	  boxes[i].classList.remove("enemy2right");
	  boxes[i].classList.remove("enemy2up");
	  boxes[i].classList.remove("enemy2down");
	} //if
  } //for
  
  // moving right
  if(direction == "right"){
	if(counter >= 1){

		currentLocationOfEnemy7++;
	} // if
	
	// turn around if hit right side of animation
	if(index == boxes.length - 1){
	  //currentLocationOfEnemy = currentLocationOfEnemy + 1;
	  index--;
	  direction = "left";
    } else{
	  index++;
    } //else
	
  // moving left
  }  else if (direction == "left"){
	if(counter >= 1){

		currentLocationOfEnemy7--;
	} //if 
	
	// turn around if hit left side of animation
    if(index == 0){
	 // currentLocationOfEnemy = currentLocationOfEnemy - 1;
	  index++;
	  direction = "right";
	} else{
		index--;
	} //else
		
  }else if (direction == "up"){
	if(counter >= 1){
		currentLocationOfEnemy7 = currentLocationOfEnemy7 - widthOfBoard;
	} //if 
	
	// turn around if hit left side of animation
    if(index == 0){
	 // currentLocationOfEnemy = currentLocationOfEnemy - 1;
	 index++;
	  direction = "down";
	} else{
	  index--;
	 
	} //else
	
  } else if (direction == "down"){
	  if (counter >= 1){
		currentLocationOfEnemy7 = currentLocationOfEnemy7 + widthOfBoard;
	  }
	// turn around if hit left side of animation
    if(index == boxes.length - 1){

	 // currentLocationOfEnemy = currentLocationOfEnemy - 1;
	  index--;
	  direction = "up";
	} else{
		index++;
	} //else
		
  }// else




  currentAnimation7 = setTimeout(function(){
	  animateEnemy7(boxes, index, direction);
  }, 750);
   
   //counter++;

  // if enemy runs into player, end the game

  if(currentLocationOfHorse == currentLocationOfEnemy7){
	document.getElementById("lose").style.display = "block";
	startLocation1 = originalLocation1;
	startLocation2 = originalLocation2;
	startLocation3 = originalLocation3;
	clearTimeout(currentProjectile3);
	clearTimeout(currentProjectile2);
	clearTimeout(currentProjectile1);
	clearTimeout(currentAnimation1);
	clearTimeout(currentAnimation2);
	clearTimeout(currentAnimation3);
	clearTimeout(currentAnimation4);
	clearTimeout(currentAnimation5);
	clearTimeout(currentAnimation6);
	clearTimeout(currentAnimation7);
	clearTimeout(currentAnimation8);
	clearTimeout(currentAnimation9);
	clearTimeout(currentAnimation10);
	clearTimeout(currentAnimation11);
	clearTimeout(currentAnimation12);
	clearTimeout(currentAnimation13);
	clearTimeout(currentAnimation14);
	clearTimeout(currentAnimation15);
	clearTimeout(currentAnimation16);
	canMove = false;
    return;	  
  } //if
}// animateEnemy7

// animate enemy left to right
// boxes - array of grid boxes that include animation
// index - current location of animation
// direction - current direction of animation
// enemy - type of enemy displayed
function animateEnemy8(boxes, index, direction){///////////////////
	
  if(counter == 0){
    currentLocationOfEnemy8 = enemyStart8;
  } // if
  
  // exits function if no animation
  if(boxes.length <= 0){ return;}
    if(currentLevel == 2){ return;}
  if(currentLevel == 0){ return;}
  // update the images
  if(direction == "right"){
	boxes[index].classList.add("enemy2right");
  } else if (direction == "left"){
	boxes[index].classList.add("enemy2left");
  } else if (direction == "up"){
	boxes[index].classList.add("enemy2up");
  } else if (direction == "down"){
	boxes[index].classList.add("enemy2down");
  } //else
  
  // remove images from other boxes
  for(i = 0; i < boxes.length; i++){
	if(i != index){
	  boxes[i].classList.remove("enemy2left");
	  boxes[i].classList.remove("enemy2right");
	  boxes[i].classList.remove("enemy2up");
	  boxes[i].classList.remove("enemy2down");
	} //if
  } //for
  
  // moving right
  if(direction == "right"){
	if(counter >= 1){

		currentLocationOfEnemy8++;
	} // if
	
	// turn around if hit right side of animation
	if(index == boxes.length - 1){
	  //currentLocationOfEnemy = currentLocationOfEnemy + 1;
	  index--;
	  direction = "left";
    } else{
	  index++;
    } //else
	
  // moving left
  }  else if (direction == "left"){
	if(counter >= 1){

		currentLocationOfEnemy8--;
	} //if 
	
	// turn around if hit left side of animation
    if(index == 0){
	 // currentLocationOfEnemy = currentLocationOfEnemy - 1;
	  index++;
	  direction = "right";
	} else{
		index--;
	} //else
		
  }else if (direction == "up"){
	if(counter >= 1){
		currentLocationOfEnemy8 = currentLocationOfEnemy8 - widthOfBoard;
	} //if 
	
	// turn around if hit left side of animation
    if(index == 0){
	 // currentLocationOfEnemy = currentLocationOfEnemy - 1;
	 index++;
	  direction = "down";
	} else{
	  index--;
	 
	} //else
	
  } else if (direction == "down"){
	  if (counter >= 1){
		currentLocationOfEnemy8 = currentLocationOfEnemy8 + widthOfBoard;
	  }
	// turn around if hit left side of animation
    if(index == boxes.length - 1){

	 // currentLocationOfEnemy = currentLocationOfEnemy - 1;
	  index--;
	  direction = "up";
	} else{
		index++;
	} //else
		
  }// else

  
  currentAnimation8 = setTimeout(function(){
	  animateEnemy8(boxes, index, direction);
  }, 750);
   
   //counter++;

  // if enemy runs into player, end the game

  if(currentLocationOfHorse == currentLocationOfEnemy8){
	document.getElementById("lose").style.display = "block";
	startLocation1 = originalLocation1;
	startLocation2 = originalLocation2;
	startLocation3 = originalLocation3;
	clearTimeout(currentProjectile3);
	clearTimeout(currentProjectile2);
	clearTimeout(currentProjectile1);
	clearTimeout(currentAnimation1);
	clearTimeout(currentAnimation2);
	clearTimeout(currentAnimation3);
	clearTimeout(currentAnimation4);
	clearTimeout(currentAnimation5);
	clearTimeout(currentAnimation6);
	clearTimeout(currentAnimation7);
	clearTimeout(currentAnimation8);
	clearTimeout(currentAnimation9);
	clearTimeout(currentAnimation10);
	clearTimeout(currentAnimation11);
	clearTimeout(currentAnimation12);
	clearTimeout(currentAnimation13);
	clearTimeout(currentAnimation14);
	clearTimeout(currentAnimation15);
	clearTimeout(currentAnimation16);
	canMove = false;
    return;	  
  } //if
}// animateEnemy8

// animate enemy left to right
// boxes - array of grid boxes that include animation
// index - current location of animation
// direction - current direction of animation
// enemy - type of enemy displayed
function animateEnemy9(boxes, index, direction){///////////////////
	
  if(counter == 0){
    currentLocationOfEnemy9 = enemyStart9;
  } // if
  
  // exits function if no animation
  if(boxes.length <= 0){ return;}
    if(currentLevel == 2){ return;}
  if(currentLevel == 0){ return;}
  // update the images
  if(direction == "right"){
	boxes[index].classList.add("enemy2right");
  } else if (direction == "left"){
	boxes[index].classList.add("enemy2left");
  } else if (direction == "up"){
	boxes[index].classList.add("enemy2up");
  } else if (direction == "down"){
	boxes[index].classList.add("enemy2down");
  } //else
  
  // remove images from other boxes
  for(i = 0; i < boxes.length; i++){
	if(i != index){
	  boxes[i].classList.remove("enemy2left");
	  boxes[i].classList.remove("enemy2right");
	  boxes[i].classList.remove("enemy2up");
	  boxes[i].classList.remove("enemy2down");
	} //if
  } //for
  
  // moving right
  if(direction == "right"){
	if(counter >= 1){

		currentLocationOfEnemy9++;
	} // if
	
	// turn around if hit right side of animation
	if(index == boxes.length - 1){
	  //currentLocationOfEnemy = currentLocationOfEnemy + 1;
	  index--;
	  direction = "left";
    } else{
	  index++;
    } //else
	
  // moving left
  }  else if (direction == "left"){
	if(counter >= 1){

		currentLocationOfEnemy9--;
	} //if 
	
	// turn around if hit left side of animation
    if(index == 0){
	 // currentLocationOfEnemy = currentLocationOfEnemy - 1;
	  index++;
	  direction = "right";
	} else{
		index--;
	} //else
		
  }else if (direction == "up"){
	if(counter >= 1){
		currentLocationOfEnemy9 = currentLocationOfEnemy9 - widthOfBoard;
	} //if 
	
	// turn around if hit left side of animation
    if(index == 0){
	 // currentLocationOfEnemy = currentLocationOfEnemy - 1;
	 index++;
	  direction = "down";
	} else{
	  index--;
	 
	} //else
	
  } else if (direction == "down"){
	  if (counter >= 1){
		currentLocationOfEnemy9 = currentLocationOfEnemy9 + widthOfBoard;
	  }
	// turn around if hit left side of animation
    if(index == boxes.length - 1){

	 // currentLocationOfEnemy = currentLocationOfEnemy - 1;
	  index--;
	  direction = "up";
	} else{
		index++;
	} //else
		
  }// else

  currentAnimation9 = setTimeout(function(){
	  animateEnemy9(boxes, index, direction);
  }, 750);
   
   //counter++;

  // if enemy runs into player, end the game

  if(currentLocationOfHorse == currentLocationOfEnemy9){
	document.getElementById("lose").style.display = "block";
	startLocation1 = originalLocation1;
	startLocation2 = originalLocation2;
	startLocation3 = originalLocation3;
	clearTimeout(currentProjectile3);
	clearTimeout(currentProjectile2);
	clearTimeout(currentProjectile1);
	clearTimeout(currentAnimation1);
	clearTimeout(currentAnimation2);
	clearTimeout(currentAnimation3);
	clearTimeout(currentAnimation4);
	clearTimeout(currentAnimation5);
	clearTimeout(currentAnimation6);
	clearTimeout(currentAnimation7);
	clearTimeout(currentAnimation8);
	clearTimeout(currentAnimation9);
	clearTimeout(currentAnimation10);
	clearTimeout(currentAnimation11);
	clearTimeout(currentAnimation12);
	clearTimeout(currentAnimation13);
	clearTimeout(currentAnimation14);
	clearTimeout(currentAnimation15);
	clearTimeout(currentAnimation16);
	canMove = false;
    return;	  
  } //if
}// animateEnemy9

// animate enemy left to right
// boxes - array of grid boxes that include animation
// index - current location of animation
// direction - current direction of animation
// enemy - type of enemy displayed
function animateEnemy10(boxes, index, direction){///////////////////
	
  if(counter == 0){
    currentLocationOfEnemy10 = enemyStart10;
  } // if
  
  // exits function if no animation
  if(boxes.length <= 0){ return;}
    if(currentLevel == 2){ return;}
  if(currentLevel == 0){ return;}
  // update the images
  if(direction == "right"){
	boxes[index].classList.add("enemy2right");
  } else if (direction == "left"){
	boxes[index].classList.add("enemy2left");
  } else if (direction == "up"){
	boxes[index].classList.add("enemy2up");
  } else if (direction == "down"){
	boxes[index].classList.add("enemy2down");
  } //else
  
  // remove images from other boxes
  for(i = 0; i < boxes.length; i++){
	if(i != index){
	  boxes[i].classList.remove("enemy2left");
	  boxes[i].classList.remove("enemy2right");
	  boxes[i].classList.remove("enemy2up");
	  boxes[i].classList.remove("enemy2down");
	} //if
  } //for
  
  // moving right
  if(direction == "right"){
	if(counter >= 1){

		currentLocationOfEnemy10++;
	} // if
	
	// turn around if hit right side of animation
	if(index == boxes.length - 1){
	  //currentLocationOfEnemy = currentLocationOfEnemy + 1;
	  index--;
	  direction = "left";
    } else{
	  index++;
    } //else
	
  // moving left
  }  else if (direction == "left"){
	if(counter >= 1){

		currentLocationOfEnemy10--;
	} //if 
	
	// turn around if hit left side of animation
    if(index == 0){
	 // currentLocationOfEnemy = currentLocationOfEnemy - 1;
	  index++;
	  direction = "right";
	} else{
		index--;
	} //else
		
  }else if (direction == "up"){
	if(counter >= 1){
		currentLocationOfEnemy10 = currentLocationOfEnemy10 - widthOfBoard;
	} //if 
	
	// turn around if hit left side of animation
    if(index == 0){
	 // currentLocationOfEnemy = currentLocationOfEnemy - 1;
	 index++;
	  direction = "down";
	} else{
	  index--;
	 
	} //else
	
  } else if (direction == "down"){
	  if (counter >= 1){
		currentLocationOfEnemy10 = currentLocationOfEnemy10 + widthOfBoard;
	  }
	// turn around if hit left side of animation
    if(index == boxes.length - 1){

	 // currentLocationOfEnemy = currentLocationOfEnemy - 1;
	  index--;
	  direction = "up";
	} else{
		index++;
	} //else
		
  }// else


  currentAnimation10 = setTimeout(function(){
	  animateEnemy10(boxes, index, direction);
  }, 750);
   
   //counter++;

  // if enemy runs into player, end the game

  if(currentLocationOfHorse == currentLocationOfEnemy10){
	document.getElementById("lose").style.display = "block";
	startLocation1 = originalLocation1;
	startLocation2 = originalLocation2;
	startLocation3 = originalLocation3;
	clearTimeout(currentProjectile3);
	clearTimeout(currentProjectile2);
	clearTimeout(currentProjectile1);
	clearTimeout(currentAnimation1);
	clearTimeout(currentAnimation2);
	clearTimeout(currentAnimation3);
	clearTimeout(currentAnimation4);
	clearTimeout(currentAnimation5);
	clearTimeout(currentAnimation6);
	clearTimeout(currentAnimation7);
	clearTimeout(currentAnimation8);
	clearTimeout(currentAnimation9);
	clearTimeout(currentAnimation10);
	clearTimeout(currentAnimation11);
	clearTimeout(currentAnimation12);
	clearTimeout(currentAnimation13);
	clearTimeout(currentAnimation14);
	clearTimeout(currentAnimation15);
	clearTimeout(currentAnimation16);
	canMove = false;
    return;	  
  } //if
}// animateEnemy10

// animate enemy left to right
// boxes - array of grid boxes that include animation
// index - current location of animation
// direction - current direction of animation
// enemy - type of enemy displayed
function animateEnemy11(boxes, index, direction){///////////////////
	
  if(counter == 0){
    currentLocationOfEnemy11 = enemyStart11;
  } // if
  
  // exits function if no animation
  if(boxes.length <= 0){ return;}
  if(currentLevel == 0){ return;}
  if(currentLevel == 1){ return;}
  
  // update the images
  if(direction == "right"){
	boxes[index].classList.add("enemy2right");
  } else if (direction == "left"){
	boxes[index].classList.add("enemy2left");
  } else if (direction == "up"){
	boxes[index].classList.add("enemy2up");
  } else if (direction == "down"){
	boxes[index].classList.add("enemy2down");
  } //else
  
  // remove images from other boxes
  for(i = 0; i < boxes.length; i++){
	if(i != index){
	  boxes[i].classList.remove("enemy2left");
	  boxes[i].classList.remove("enemy2right");
	  boxes[i].classList.remove("enemy2up");
	  boxes[i].classList.remove("enemy2down");
	} //if
  } //for
  
  // moving right
  if(direction == "right"){
	if(counter >= 1){

		currentLocationOfEnemy11++;
	} // if
	
	// turn around if hit right side of animation
	if(index == boxes.length - 1){
	  //currentLocationOfEnemy = currentLocationOfEnemy + 1;
	  index--;
	  direction = "left";
    } else{
	  index++;
    } //else
	
  // moving left
  }  else if (direction == "left"){
	if(counter >= 1){

		currentLocationOfEnemy11--;
	} //if 
	
	// turn around if hit left side of animation
    if(index == 0){
	 // currentLocationOfEnemy = currentLocationOfEnemy - 1;
	  index++;
	  direction = "right";
	} else{
		index--;
	} //else
		
  }else if (direction == "up"){
	if(counter >= 1){
		currentLocationOfEnemy11 = currentLocationOfEnemy11 - widthOfBoard;
	} //if 
	
	// turn around if hit left side of animation
    if(index == 0){
	 // currentLocationOfEnemy = currentLocationOfEnemy - 1;
	 index++;
	  direction = "down";
	} else{
	  index--;
	 
	} //else
	
  } else if (direction == "down"){
	  if (counter >= 1){
		currentLocationOfEnemy11 = currentLocationOfEnemy11 + widthOfBoard;
	  }
	// turn around if hit left side of animation
    if(index == boxes.length - 1){

	 // currentLocationOfEnemy = currentLocationOfEnemy - 1;
	  index--;
	  direction = "up";
	} else{
		index++;
	} //else
		
  }// else

  

counter++;
  currentAnimation11 = setTimeout(function(){
	  animateEnemy11(boxes, index, direction);
  }, 750);
   
   //counter++;

  // if enemy runs into player, end the game

  if(currentLocationOfHorse == currentLocationOfEnemy11){
	document.getElementById("lose").style.display = "block";
	startLocation1 = originalLocation1;
	startLocation2 = originalLocation2;
	startLocation3 = originalLocation3;
	clearTimeout(currentProjectile3);
	clearTimeout(currentProjectile2);
	clearTimeout(currentProjectile1);
	clearTimeout(currentAnimation1);
	clearTimeout(currentAnimation2);
	clearTimeout(currentAnimation3);
	clearTimeout(currentAnimation4);
	clearTimeout(currentAnimation5);
	clearTimeout(currentAnimation6);
	clearTimeout(currentAnimation7);
	clearTimeout(currentAnimation8);
	clearTimeout(currentAnimation9);
	clearTimeout(currentAnimation10);
	clearTimeout(currentAnimation11);
	clearTimeout(currentAnimation12);
	clearTimeout(currentAnimation13);
	clearTimeout(currentAnimation14);
	clearTimeout(currentAnimation15);
	clearTimeout(currentAnimation16);
	canMove = false;
    return;	  
  } //if
}// animateEnemy11

// animate enemy left to right
// boxes - array of grid boxes that include animation
// index - current location of animation
// direction - current direction of animation
// enemy - type of enemy displayed
function animateEnemy12(boxes, index, direction){///////////////////
	
  if(counter == 0){
    currentLocationOfEnemy12 = enemyStart12;
  } // if
  
  // exits function if no animation
  if(boxes.length <= 0){ return;}
    if(currentLevel == 0){ return;}
  if(currentLevel == 1){ return;}
  
  // update the images
  if(direction == "right"){
	boxes[index].classList.add("enemy2right");
  } else if (direction == "left"){
	boxes[index].classList.add("enemy2left");
  } else if (direction == "up"){
	boxes[index].classList.add("enemy2up");
  } else if (direction == "down"){
	boxes[index].classList.add("enemy2down");
  } //else
  
  // remove images from other boxes
  for(i = 0; i < boxes.length; i++){
	if(i != index){
	  boxes[i].classList.remove("enemy2left");
	  boxes[i].classList.remove("enemy2right");
	  boxes[i].classList.remove("enemy2up");
	  boxes[i].classList.remove("enemy2down");
	} //if
  } //for
  
  // moving right
  if(direction == "right"){
	if(counter >= 1){

		currentLocationOfEnemy12++;
	} // if
	
	// turn around if hit right side of animation
	if(index == boxes.length - 1){
	  //currentLocationOfEnemy = currentLocationOfEnemy + 1;
	  index--;
	  direction = "left";
    } else{
	  index++;
    } //else
	
  // moving left
  }  else if (direction == "left"){
	if(counter >= 1){

		currentLocationOfEnemy12--;
	} //if 
	
	// turn around if hit left side of animation
    if(index == 0){
	 // currentLocationOfEnemy = currentLocationOfEnemy - 1;
	  index++;
	  direction = "right";
	} else{
		index--;
	} //else
		
  }else if (direction == "up"){
	if(counter >= 1){
		currentLocationOfEnemy12 = currentLocationOfEnemy12 - widthOfBoard;
	} //if 
	
	// turn around if hit left side of animation
    if(index == 0){
	 // currentLocationOfEnemy = currentLocationOfEnemy - 1;
	 index++;
	  direction = "down";
	} else{
	  index--;
	 
	} //else
	
  } else if (direction == "down"){
	  if (counter >= 1){
		currentLocationOfEnemy12 = currentLocationOfEnemy12 + widthOfBoard;
	  }
	// turn around if hit left side of animation
    if(index == boxes.length - 1){

	 // currentLocationOfEnemy = currentLocationOfEnemy - 1;
	  index--;
	  direction = "up";
	} else{
		index++;
	} //else
		
  }// else

  


  currentAnimation12 = setTimeout(function(){
	  animateEnemy12(boxes, index, direction);
  }, 750);
   
   //counter++;

  // if enemy runs into player, end the game

  if(currentLocationOfHorse == currentLocationOfEnemy12){
	document.getElementById("lose").style.display = "block";
	startLocation1 = originalLocation1;
	startLocation2 = originalLocation2;
	startLocation3 = originalLocation3;
	clearTimeout(currentProjectile3);
	clearTimeout(currentProjectile2);
	clearTimeout(currentProjectile1);
	clearTimeout(currentAnimation1);
	clearTimeout(currentAnimation2);
	clearTimeout(currentAnimation3);
	clearTimeout(currentAnimation4);
	clearTimeout(currentAnimation5);
	clearTimeout(currentAnimation6);
	clearTimeout(currentAnimation7);
	clearTimeout(currentAnimation8);
	clearTimeout(currentAnimation9);
	clearTimeout(currentAnimation10);
	clearTimeout(currentAnimation11);
	clearTimeout(currentAnimation12);
	clearTimeout(currentAnimation13);
	clearTimeout(currentAnimation14);
	clearTimeout(currentAnimation15);
	clearTimeout(currentAnimation16);
	canMove = false;
    return;	  
  } //if
}// animateEnemy12

// animate enemy left to right
// boxes - array of grid boxes that include animation
// index - current location of animation
// direction - current direction of animation
// enemy - type of enemy displayed
function animateEnemy13(boxes, index, direction){///////////////////
	
  if(counter == 0){
    currentLocationOfEnemy13 = enemyStart13;
  } // if
  
  // exits function if no animation
  if(boxes.length <= 0){ return;}
    if(currentLevel == 0){ return;}
  if(currentLevel == 1){ return;}
  
  // update the images
  if(direction == "right"){
	boxes[index].classList.add("enemy2right");
  } else if (direction == "left"){
	boxes[index].classList.add("enemy2left");
  } else if (direction == "up"){
	boxes[index].classList.add("enemy2up");
  } else if (direction == "down"){
	boxes[index].classList.add("enemy2down");
  } //else
  
  // remove images from other boxes
  for(i = 0; i < boxes.length; i++){
	if(i != index){
	  boxes[i].classList.remove("enemy2left");
	  boxes[i].classList.remove("enemy2right");
	  boxes[i].classList.remove("enemy2up");
	  boxes[i].classList.remove("enemy2down");
	} //if
  } //for
  
  // moving right
  if(direction == "right"){
	if(counter >= 1){

		currentLocationOfEnemy13++;
	} // if
	
	// turn around if hit right side of animation
	if(index == boxes.length - 1){
	  //currentLocationOfEnemy = currentLocationOfEnemy + 1;
	  index--;
	  direction = "left";
    } else{
	  index++;
    } //else
	
  // moving left
  }  else if (direction == "left"){
	if(counter >= 1){

		currentLocationOfEnemy13--;
	} //if 
	
	// turn around if hit left side of animation
    if(index == 0){
	 // currentLocationOfEnemy = currentLocationOfEnemy - 1;
	  index++;
	  direction = "right";
	} else{
		index--;
	} //else
		
  }else if (direction == "up"){
	if(counter >= 1){
		currentLocationOfEnemy13 = currentLocationOfEnemy13 - widthOfBoard;
	} //if 
	
	// turn around if hit left side of animation
    if(index == 0){
	 // currentLocationOfEnemy = currentLocationOfEnemy - 1;
	 index++;
	  direction = "down";
	} else{
	  index--;
	 
	} //else
	
  } else if (direction == "down"){
	  if (counter >= 1){
		currentLocationOfEnemy13 = currentLocationOfEnemy13 + widthOfBoard;
	  }
	// turn around if hit left side of animation
    if(index == boxes.length - 1){

	 // currentLocationOfEnemy = currentLocationOfEnemy - 1;
	  index--;
	  direction = "up";
	} else{
		index++;
	} //else
		
  }// else

  


  currentAnimation13 = setTimeout(function(){
	  animateEnemy13(boxes, index, direction);
  }, 750);
   
   //counter++;

  // if enemy runs into player, end the game

  if(currentLocationOfHorse == currentLocationOfEnemy13){
	document.getElementById("lose").style.display = "block";
	startLocation1 = originalLocation1;
	startLocation2 = originalLocation2;
	startLocation3 = originalLocation3;
	clearTimeout(currentProjectile3);
	clearTimeout(currentProjectile2);
	clearTimeout(currentProjectile1);
	clearTimeout(currentAnimation1);
	clearTimeout(currentAnimation2);
	clearTimeout(currentAnimation3);
	clearTimeout(currentAnimation4);
	clearTimeout(currentAnimation5);
	clearTimeout(currentAnimation6);
	clearTimeout(currentAnimation7);
	clearTimeout(currentAnimation8);
	clearTimeout(currentAnimation9);
	clearTimeout(currentAnimation10);
	clearTimeout(currentAnimation11);
	clearTimeout(currentAnimation12);
	clearTimeout(currentAnimation13);
	clearTimeout(currentAnimation14);
	clearTimeout(currentAnimation15);
	clearTimeout(currentAnimation16);
	canMove = false;
    return;	  
  } //if
}// animateEnemy13

// animate enemy left to right
// boxes - array of grid boxes that include animation
// index - current location of animation
// direction - current direction of animation
// enemy - type of enemy displayed
function animateEnemy14(boxes, index, direction){///////////////////
	
  if(counter == 0){
    currentLocationOfEnemy14 = enemyStart14;
  } // if
  
  // exits function if no animation
  if(boxes.length <= 0){ return;}
    if(currentLevel == 0){ return;}
  if(currentLevel == 1){ return;}
  
  // update the images
  if(direction == "right"){
	boxes[index].classList.add("enemy2right");
  } else if (direction == "left"){
	boxes[index].classList.add("enemy2left");
  } else if (direction == "up"){
	boxes[index].classList.add("enemy2up");
  } else if (direction == "down"){
	boxes[index].classList.add("enemy2down");
  } //else
  
  // remove images from other boxes
  for(i = 0; i < boxes.length; i++){
	if(i != index){
	  boxes[i].classList.remove("enemy2left");
	  boxes[i].classList.remove("enemy2right");
	  boxes[i].classList.remove("enemy2up");
	  boxes[i].classList.remove("enemy2down");
	} //if
  } //for
  
  // moving right
  if(direction == "right"){
	if(counter >= 1){

		currentLocationOfEnemy14++;
	} // if
	
	// turn around if hit right side of animation
	if(index == boxes.length - 1){
	  //currentLocationOfEnemy = currentLocationOfEnemy + 1;
	  index--;
	  direction = "left";
    } else{
	  index++;
    } //else
	
  // moving left
  }  else if (direction == "left"){
	if(counter >= 1){

		currentLocationOfEnemy14--;
	} //if 
	
	// turn around if hit left side of animation
    if(index == 0){
	 // currentLocationOfEnemy = currentLocationOfEnemy - 1;
	  index++;
	  direction = "right";
	} else{
		index--;
	} //else
		
  }else if (direction == "up"){
	if(counter >= 1){
		currentLocationOfEnemy14 = currentLocationOfEnemy14 - widthOfBoard;
	} //if 
	
	// turn around if hit left side of animation
    if(index == 0){
	 // currentLocationOfEnemy = currentLocationOfEnemy - 1;
	 index++;
	  direction = "down";
	} else{
	  index--;
	 
	} //else
	
  } else if (direction == "down"){
	  if (counter >= 1){
		currentLocationOfEnemy14 = currentLocationOfEnemy14 + widthOfBoard;
	  }
	// turn around if hit left side of animation
    if(index == boxes.length - 1){

	 // currentLocationOfEnemy = currentLocationOfEnemy - 1;
	  index--;
	  direction = "up";
	} else{
		index++;
	} //else
		
  }// else

  


  currentAnimation14 = setTimeout(function(){
	  animateEnemy14(boxes, index, direction);
  }, 750);
   
   //counter++;

  // if enemy runs into player, end the game

  if(currentLocationOfHorse == currentLocationOfEnemy14){
	document.getElementById("lose").style.display = "block";
	startLocation1 = originalLocation1;
	startLocation2 = originalLocation2;
	startLocation3 = originalLocation3;
	clearTimeout(currentProjectile3);
	clearTimeout(currentProjectile2);
	clearTimeout(currentProjectile1);
	clearTimeout(currentAnimation1);
	clearTimeout(currentAnimation2);
	clearTimeout(currentAnimation3);
	clearTimeout(currentAnimation4);
	clearTimeout(currentAnimation5);
	clearTimeout(currentAnimation6);
	clearTimeout(currentAnimation7);
	clearTimeout(currentAnimation8);
	clearTimeout(currentAnimation9);
	clearTimeout(currentAnimation10);
	clearTimeout(currentAnimation11);
	clearTimeout(currentAnimation12);
	clearTimeout(currentAnimation13);
	clearTimeout(currentAnimation14);
	clearTimeout(currentAnimation15);
	clearTimeout(currentAnimation16);
	canMove = false;
    return;	  
  } //if
}// animateEnemy14

// animate enemy left to right
// boxes - array of grid boxes that include animation
// index - current location of animation
// direction - current direction of animation
// enemy - type of enemy displayed
function animateEnemy15(boxes, index, direction){///////////////////
	
  if(counter == 0){
    currentLocationOfEnemy15 = enemyStart15;
  } // if
  
  // exits function if no animation
  if(boxes.length <= 0){ return;}
    if(currentLevel == 0){ return;}
  if(currentLevel == 1){ return;}
  
  // update the images
  if(direction == "right"){
	boxes[index].classList.add("enemy2right");
  } else if (direction == "left"){
	boxes[index].classList.add("enemy2left");
  } else if (direction == "up"){
	boxes[index].classList.add("enemy2up");
  } else if (direction == "down"){
	boxes[index].classList.add("enemy2down");
  } //else
  
  // remove images from other boxes
  for(i = 0; i < boxes.length; i++){
	if(i != index){
	  boxes[i].classList.remove("enemy2left");
	  boxes[i].classList.remove("enemy2right");
	  boxes[i].classList.remove("enemy2up");
	  boxes[i].classList.remove("enemy2down");
	} //if
  } //for
  
  // moving right
  if(direction == "right"){
	if(counter >= 1){

		currentLocationOfEnemy15++;
	} // if
	
	// turn around if hit right side of animation
	if(index == boxes.length - 1){
	  //currentLocationOfEnemy = currentLocationOfEnemy + 1;
	  index--;
	  direction = "left";
    } else{
	  index++;
    } //else
	
  // moving left
  }  else if (direction == "left"){
	if(counter >= 1){

		currentLocationOfEnemy15--;
	} //if 
	
	// turn around if hit left side of animation
    if(index == 0){
	 // currentLocationOfEnemy = currentLocationOfEnemy - 1;
	  index++;
	  direction = "right";
	} else{
		index--;
	} //else
		
  }else if (direction == "up"){
	if(counter >= 1){
		currentLocationOfEnemy15 = currentLocationOfEnemy15 - widthOfBoard;
	} //if 
	
	// turn around if hit left side of animation
    if(index == 0){
	 // currentLocationOfEnemy = currentLocationOfEnemy - 1;
	 index++;
	  direction = "down";
	} else{
	  index--;
	 
	} //else
	
  } else if (direction == "down"){
	  if (counter >= 1){
		currentLocationOfEnemy15 = currentLocationOfEnemy15 + widthOfBoard;
	  }
	// turn around if hit left side of animation
    if(index == boxes.length - 1){

	 // currentLocationOfEnemy = currentLocationOfEnemy - 1;
	  index--;
	  direction = "up";
	} else{
		index++;
	} //else
		
  }// else


  currentAnimation15 = setTimeout(function(){
	  animateEnemy15(boxes, index, direction);
  }, 750);
   
   //counter++;

  // if enemy runs into player, end the game

  if(currentLocationOfHorse == currentLocationOfEnemy15){
	document.getElementById("lose").style.display = "block";
	startLocation1 = originalLocation1;
	startLocation2 = originalLocation2;
	startLocation3 = originalLocation3;
	clearTimeout(currentProjectile3);
	clearTimeout(currentProjectile2);
	clearTimeout(currentProjectile1);
	clearTimeout(currentAnimation1);
	clearTimeout(currentAnimation2);
	clearTimeout(currentAnimation3);
	clearTimeout(currentAnimation4);
	clearTimeout(currentAnimation5);
	clearTimeout(currentAnimation6);
	clearTimeout(currentAnimation7);
	clearTimeout(currentAnimation8);
	clearTimeout(currentAnimation9);
	clearTimeout(currentAnimation10);
	clearTimeout(currentAnimation11);
	clearTimeout(currentAnimation12);
	clearTimeout(currentAnimation13);
	clearTimeout(currentAnimation14);
	clearTimeout(currentAnimation15);
	clearTimeout(currentAnimation16);
	canMove = false;
    return;	  
  } //if
}// animateEnemy15

// animate enemy left to right
// boxes - array of grid boxes that include animation
// index - current location of animation
// direction - current direction of animation
// enemy - type of enemy displayed
function animateEnemy16(boxes, index, direction){///////////////////
	
  if(counter == 0){
    currentLocationOfEnemy15 = enemyStart15;
  } // if
  
  // exits function if no animation
  if(boxes.length <= 0){ return;}
    if(currentLevel == 0){ return;}
  if(currentLevel == 1){ return;}
  
  // update the images
  if(direction == "right"){
	boxes[index].classList.add("enemy2right");
  } else if (direction == "left"){
	boxes[index].classList.add("enemy2left");
  } else if (direction == "up"){
	boxes[index].classList.add("enemy2up");
  } else if (direction == "down"){
	boxes[index].classList.add("enemy2down");
  } //else
  
  // remove images from other boxes
  for(i = 0; i < boxes.length; i++){
	if(i != index){
	  boxes[i].classList.remove("enemy2left");
	  boxes[i].classList.remove("enemy2right");
	  boxes[i].classList.remove("enemy2up");
	  boxes[i].classList.remove("enemy2down");
	} //if
  } //for
  
  // moving right
  if(direction == "right"){
	if(counter >= 1){

		currentLocationOfEnemy16++;
	} // if
	
	// turn around if hit right side of animation
	if(index == boxes.length - 1){
	  //currentLocationOfEnemy = currentLocationOfEnemy + 1;
	  index--;
	  direction = "left";
    } else{
	  index++;
    } //else
	
  // moving left
  }  else if (direction == "left"){
	if(counter >= 1){

		currentLocationOfEnemy16--;
	} //if 
	
	// turn around if hit left side of animation
    if(index == 0){
	 // currentLocationOfEnemy = currentLocationOfEnemy - 1;
	  index++;
	  direction = "right";
	} else{
		index--;
	} //else
		
  }else if (direction == "up"){
	if(counter >= 1){
		currentLocationOfEnemy16 = currentLocationOfEnemy16 - widthOfBoard;
	} //if 
	
	// turn around if hit left side of animation
    if(index == 0){
	 // currentLocationOfEnemy = currentLocationOfEnemy - 1;
	 index++;
	  direction = "down";
	} else{
	  index--;
	 
	} //else
	
  } else if (direction == "down"){
	  if (counter >= 1){
		currentLocationOfEnemy16 = currentLocationOfEnemy16 + widthOfBoard;
	  }
	// turn around if hit left side of animation
    if(index == boxes.length - 1){

	 // currentLocationOfEnemy = currentLocationOfEnemy - 1;
	  index--;
	  direction = "up";
	} else{
		index++;
	} //else
		
  }// else
  currentAnimation16 = setTimeout(function(){
	  animateEnemy16(boxes, index, direction);
  }, 750);
   
   //counter++;

  // if enemy runs into player, end the game

  if(currentLocationOfHorse == currentLocationOfEnemy16){
	document.getElementById("lose").style.display = "block";
	startLocation1 = originalLocation1;
	startLocation2 = originalLocation2;
	startLocation3 = originalLocation3;
	clearTimeout(currentProjectile3);
	clearTimeout(currentProjectile2);
	clearTimeout(currentProjectile1);
	clearTimeout(currentAnimation1);
	clearTimeout(currentAnimation2);
	clearTimeout(currentAnimation3);
	clearTimeout(currentAnimation4);
	clearTimeout(currentAnimation5);
	clearTimeout(currentAnimation6);
	clearTimeout(currentAnimation7);
	clearTimeout(currentAnimation8);
	clearTimeout(currentAnimation9);
	clearTimeout(currentAnimation10);
	clearTimeout(currentAnimation11);
	clearTimeout(currentAnimation12);
	clearTimeout(currentAnimation13);
	clearTimeout(currentAnimation14);
	clearTimeout(currentAnimation15);
	clearTimeout(currentAnimation16);
	canMove = false;
    return;	  
  } //if
}// animateEnemy16


