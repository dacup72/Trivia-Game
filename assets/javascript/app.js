
window.onload = function() {
	clock.reset();
	clock.start();
	game.start();
	$("#answer1").click(function() {
		answer1Clicked = true;
		game.answer();
		console.log(answer1Clicked);
	});
	$("#answer2").click(function() {
		answer2Clicked = true;
		game.answer();
		console.log(answer2Clicked);
	});
	$("#answer3").click(function() {
		answer3Clicked = true;
		game.answer();
		console.log(answer3Clicked);
	});
	$("#answer4").click(function() {
		answer4Clicked = true;
		game.answer();
		console.log(answer4Clicked);
	});
};


var questionsArray = ["island 1", "island 2", "island 3", "island 4"];
var answers1 = ["answer 1", "answer 2", "answer 3", "answer 4"];
var answers2 = ["answer 1", "answer 2", "answer 3", "answer 4"];
var answers3 = ["answer 1", "answer 2", "answer 3", "answer 4"];
var answers4 = ["answer 1", "answer 2", "answer 3", "answer 4"];
var questionsAnswered = 0;
var answer1Clicked = false;
var answer2Clicked = false;
var answer3Clicked = false;
var answer4Clicked = false;

var clockRunning = false;
var correctAnswers = 0;
var wrongAnswers = 0;
var gameRunning = false;


var clock = {
	time: 60,
	reset: function() {
		clock.time = 60;
		$("#clockDisplay").html("01:00");
	},
	start: function() {
		if (!clockRunning) {
			intervalId = setInterval(clock.count, 1000);
			clockRunning = true;
		};
	},
	stop: function() {
		clearInterval(intervalId);
		clockRunning = false;
	},
	count: function() {
		clock.time--;
		$("#clockDisplay").html(clock.time);
		var convertedTime = clock.timeConverter(clock.time);
		$("#clockDisplay").html(convertedTime);
		if (clock.time === 0) {
			clock.stop();
			game.popupWrong();
		};
	},
	timeConverter: function(t) {
		var minutes = Math.floor(t / 60);
		var seconds = t - (minutes * 60);
		if (seconds < 10) {
			seconds = "0" + seconds;
		}
		if (minutes === 0) {
			minutes = "00";
		}
		else if (minutes < 10) {
			minutes = "0" + minutes;
		}
		return minutes + ":" + seconds;
	},
};

var game = {
	start: function() {
		correctAnswers = 0;
 		wrongAnswers = 0;
 		percent = 0;
 		questionsAnswered = 0;
 		game.question();
	},
	question: function() {
		gameRunning = true;
		if (questionsAnswered === 0) {
			$("#questionDisplay").html(questionsArray[0]);
			$("#answer1").html(answer1[0]);
			$("#answer2").html(answer1[1]);
			$("#answer3").html(answer1[2]);
			$("#answer4").html(answer1[3]);
			clock.reset();
			clock.start();
			// 3 CORRECT
		};
		if (questionsAnswered === 1) {
			$("#questionDisplay").html(questionsArray[1]);
			$("#answer1").html(answer2[0]);
			$("#answer2").html(answer2[1]);
			$("#answer3").html(answer2[2]);
			$("#answer4").html(answer2[3]);
			clock.reset();
			clock.start();
			// 1 CORRECT
		};
		if (questionsAnswered === 2) {
			$("#questionDisplay").html(questionsArray[2]);
			$("#answer1").html(answer3[0]);
			$("#answer2").html(answer3[1]);
			$("#answer3").html(answer3[2]);
			$("#answer4").html(answer3[3]);
			clock.reset();
			clock.start();
			// 3 CORRECT
		};
		if (questionsAnswered === 3) {
			$("#questionDisplay").html(questionsArray[3]);
			$("#answer1").html(answer4[0]);
			$("#answer2").html(answer4[1]);
			$("#answer3").html(answer4[2]);
			$("#answer4").html(answer4[3]);
			clock.reset();
			clock.start();
			// 4 CORRECT
		};
	},
	answer: function() {
		if (questionsAnswered === 0 && answer3Clicked === true) {
			game.popupCorrect();
			answer3Clicked = false;
		}
		if (questionsAnswered === 1 && answer1Clicked === true) {
			game.popupCorrect();
			answer1Clicked = false;
		}
		if (questionsAnswered === 2 && answer3Clicked === true) {
			game.popupCorrect();
			answer3Clicked = false;
		}
		if (questionsAnswered === 3 && answer4Clicked === true) {
			game.popupCorrect();
			answer4Clicked = false;
		}
		if (questionsAnswered === 4) {
			game.popupFinal();
		}
		else {
			game.popupWrong();
			answer1Clicked = false;
			answer2Clicked = false;
			answer3Clicked = false;
			answer4Clicked = false;
		};
	},
	popupCorrect: function() {
		clock.stop();
		gameRunning = false;
		$(".box-popup-correct").css("opacity", 1);
		$(".container").css("opacity", 0.5);
		correctAnswers++;
		questionsAnswered++;
		setTimeout(function() {
			$(".box-popup-correct").css("opacity", 0);
			$(".container").css("opacity", 1);
			game.question();
		}, 3000);
	},
	popupWrong: function() {
		clock.stop();
		gameRunning = false;
		$(".box-popup-wrong").css("opacity", 1);
		$(".container").css("opacity", 0.5);
		wrongAnswers++;
		questionsAnswered++;
		setTimeout(function() {
			$(".box-popup-wrong").css("opacity", 0);
			$(".container").css("opacity", 1);
			game.question();
		}, 3000);
	},
	popupFinal: function() {
		clock.stop();
		gameRunning = false;
		$(".box-popup-final").css("opacity", 1);
		$(".container").css("opacity", 0.5);
		$("#correctAnswersDisplay").html("<h4>Correct answers: <h4>" + correctAnswers);
		$("#wrongAnswersDisplay").html("<h4>Wrong answers: <h4>" + wrongAnswers);
		$("#percentDisplay").html("<h4>Percent: %<h4>" + (4 / correctAnswers) * 100);
		$("#buttonRestart").click(function() {
			game.start();
			$(".container").css("opacity", 1);
			$(".box-popup-final").css("opacity", 0);
		});	
	},
};
