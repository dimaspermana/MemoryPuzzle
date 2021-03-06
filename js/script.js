var puzzleItems = [ "bug", "dinosaur", "octopus", "crab", "sheep", "whale", "bug", "dinosaur", "octopus", "crab", "sheep", "whale" ];
var activePuzzle = "";
var started = false;
var foundPuzzle = [];
var countdownTime;
var counter;
var level;
initPuzzleItems();

$(document).on("click", ".puzzle-item", function() {
	if(started) {
		$(this).addClass("active");
		if(activePuzzle == "") {
			activePuzzle = $(this).data("puzzle");
			$(this).addClass("temp_found");
		} else if((activePuzzle != "") && (activePuzzle == $(this).data("puzzle")) && (!$(this).hasClass("temp_found"))) {
			$("."+activePuzzle).addClass("found");
			$(".puzzle-item").removeClass("active");
			activePuzzle = "";
			$(".puzzle-item").removeClass("temp_found");
		} else if(activePuzzle != "" && activePuzzle != $(this).data("puzzle")) {
			setTimeout(function(){
				$(".puzzle-item").removeClass("active");
				activePuzzle = "";
				$(".puzzle-item").removeClass("temp_found");
			},300);
		}
		if($(".found").length == 12) {
			if(level == "beginner") {
				$(".overlay-content .content-wrapper p").html("TRY MEDIUM LEVEL.");
			} else if(level == "medium"){
				$(".overlay-content .content-wrapper p").html("TRY EXPERT LEVEL.");
			} else if(level == "expert"){
				$(".overlay-content .content-wrapper p").html("YOU ARE AN EXPERT!");
			}
			$(".overlay-content .content-wrapper h1").html("CONGRATULATIONS!");
			$(".overlay-content").addClass("active");
			clearInterval(counter);
		}
	}
});

$(".start-game").on("click", function() {
	if($("input[type=radio]").is(":checked")) {
		started = true;
		level = $("input[type=radio]:checked").val();
		if(level == "beginner") {
			countdownTime = 51;
		} else if(level == "medium") {
			countdownTime = 31;
		} else if(level == "expert") {
			countdownTime = 16;
		}
		counter = setInterval(timer, 1000);
		$(".level-container").hide();
	}
});

$(".new-game").on("click", function() {
	initPuzzleItems();
	$(".countdown").html("");
	$(".level-container").show();
	$("input[type=radio]").prop("checked", false);
	$(".puzzle-item").removeClass("active found");
	$(".overlay-content .content-wrapper p").html("");
	activePuzzle = "";
	started = false;
	$(".overlay-content").removeClass("active");
});


function shuffle(array) {
	var currentIndex = array.length, temporaryValue, randomIndex;

	while (0 !== currentIndex) {
		randomIndex = Math.floor(Math.random() * currentIndex);
		currentIndex -= 1;

		temporaryValue = array[currentIndex];
		array[currentIndex] = array[randomIndex];
		array[randomIndex] = temporaryValue;
	}
	return array;
}

function initPuzzleItems() {
	var randomizeItems = shuffle(puzzleItems);
	$(".puzzle-container").html("");
	for(i = 0; i < randomizeItems.length; i++) {
		$(".puzzle-container").append("<div class=\"puzzle-item "+randomizeItems[i]+"\" data-puzzle=\""+randomizeItems[i]+"\"></div>");
	}
}

function timer()
{
	countdownTime = countdownTime-1;
	if (countdownTime <= 0)
	{
		$(".overlay-content .content-wrapper h1").html("TIME'S UP!");
		$(".overlay-content").addClass("active");
		clearInterval(counter);
	}
	$(".countdown").html(countdownTime);
}
