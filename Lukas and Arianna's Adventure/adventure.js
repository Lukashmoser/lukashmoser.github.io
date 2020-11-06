const levels  = [ 
  // level 0
  ["flag", "rock", "", "", "", 
   "fenceside", "rock", "", "", "rider",
   "", "tree", "animate", "animate", "animate",
   "", "water", "", "", "",
   "", "fence", "", "charup", "",],
   
  //level 1
  [],
   
  //level 2
  []
   
  ]; // end of levels
  
var currentLevel = 0; // starting level
var riderOn = false; // is the rider on?
var gridBoxes ;
var currentLocationOfHorse = 0;
var currentAnimation // allows 1 animation per level

// start game
window.addEventListener("load", function() {
  gridBoxes = document.querySelectorAll("#gameBoard div");
  loadLevel();
});

// load current levels 0 - maxlevel
function loadLevel(){
  let levelMap = levels[currentLevel];
  let animateBoxes;
  riderOn = false;
  
  // load board
  for(var i = 0; i < gridBoxes.length; i++){
	gridBoxes[i].className = levelMap[i];
	if(levelMap[i].includes("mainCharacter")) currentLocationOfHorse = i;
  } // for
  
  animateBoxes = document.querySelectorAll(".animate");
  
  animateEnemy(animateBoxes, 0, "right");
  
}

// animate enemy left to right
// boxes - array of grid boxes that include animation
// index - current location of animation
// direction - current direction of animation
function animateEnemy(boxes, index, direction){
  
  // exits function if no animation
  if(boxes.length <= 0){ return;}
  
  // update the images
  if(direction == "right"){
	boxes[index].classList.add("enemyright");
  } else{
	boxes[index].classList.add("enemyleft");
  }
  
  // remove images from other boxes
  for(i = 0; i < boxes.length; i++){
	if(i != index){
	  boxes[i].classList.remove("enemyleft");
	  boxes[i].classList.remove("enemyright");
	}
  }
  
  // moving right
  if(direction == "right"){
	// turn around if hit right side of animation
	if(index == boxes.length - 1){
	  index--;
	  direction = "left";
    } else{
	  index++;
    }
	
  // moving left
  } else{
	// turn around if het left side of animation
    if(index == 0){
	  index++;
	  direction = "right";
	} else{
		index--;
	}
  }// else
  
  currentAnimation = setTimeout(function(){
	  animateEnemy(boxes, index, direction);
  }, 750);
  
}// animateEnemy