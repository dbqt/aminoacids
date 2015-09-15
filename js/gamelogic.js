var url = "data.json";
// Score.
var score = 0;
var totalQuestion = 0;
var loaded_data;

var right_answer;

function UpdateScore()
{
	 document.getElementById("score").innerHTML = "score: " + score + "/" + totalQuestion;
}

function StartGame()
{
	UpdateScore();
	LoadAllQuestions();
}

function LoadAllQuestions()
{
	$.getJSON('data.json', function(data) {
        loaded_data = data;
        ChangeQuestion();
    });
}

function ChangeQuestion()
{
	// Reset Buttons.
	for (var i = 0; i < 4; i++) {
		$("#answer"+i).removeClass("success alert");
	}

	// Get random number between 0 and lenght of loaded_data.
	var random = Math.floor(Math.random() * loaded_data.molecules.length);
	// Get random number between 0 and 3.
	right_answer = Math.floor(Math.random() * 4);

	// Load image question.
	document.getElementById("question").src = loaded_data.molecules[random].imgsource;

	// Temp variables.
	var takens = [-2];
	takens.push(random);

	// For each answer button.
	for (var i = 0; i < 4; i++) {
		// Find a suitable answer to display.
		var done = false;
		while(!done)
		{
			// If this (i) button is the right one, put the right answer.
			if(right_answer == i){
				document.getElementById("answer"+i).innerHTML = loaded_data.molecules[random].longname;
				done = true;
			} 
			// Else, put an unused random answer.
			else {
				// Get random answer.
				var r = Math.floor(Math.random() * loaded_data.molecules.length);
				// Check whether answer is usable now (not used) before putting it on the button.
				if(takens.indexOf(r) == -1)
				{
					document.getElementById("answer"+i).innerHTML = loaded_data.molecules[r].longname;
					takens.push(r);
					done = true;
				}
			}

		}
	};
}

function Answer(number)
{
	if(number == right_answer)
	{
		// Make button green.
		$("#answer"+number).addClass("success");
		score++;
	}
	else
	{
		// Make button red.
		$("#answer"+number).addClass("alert");
	}
	totalQuestion++;
	// Load next question and update score.
	UpdateScore();

	setTimeout( function(){ ChangeQuestion(); }, 1250 );
	
}