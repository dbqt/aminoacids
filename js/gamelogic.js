var url = "data.json";
// Score.
var score = 0;
var totalQuestion = 0;
var loaded_data;

var right_answer;
var answered;

function UpdateScore()
{
	 document.getElementById("score").innerHTML = "score: " + score + "/" + totalQuestion;
}

function StartGame()
{
	UpdateScore();
	LoadAllQuestions();
	answered = false;
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
	document.getElementById("next_button").innerHTML="";
	answered = false;
	// Reset Buttons.
	for (var i = 0; i < 4; i++) {
		$("#answer"+i).removeClass("success alert");
	}

	// Get random number between 0 and lenght of loaded_data.
	var random = Math.floor(Math.random() * loaded_data.molecules.length);
	// Get random question type.
	var question_type = Math.floor(Math.random() * 12);
	// Get random number between 0 and 3.
	right_answer = Math.floor(Math.random() * 4);

	// Load image question.
	if(question_type == 0 || question_type == 1 || question_type == 2)
	{
		document.getElementById("question").innerHTML="<img class=\"question_image\" src=\""
														+loaded_data.molecules[random].imgsource
														+"\"></img>";
	}
	else if(question_type == 3 || question_type == 4 || question_type == 5)
	{
		document.getElementById("question").innerHTML="<h3>"+loaded_data.molecules[random].longname+"</h3>";
	}
	else if(question_type == 6 || question_type == 7 || question_type == 8)
	{
		document.getElementById("question").innerHTML="<h3>"+loaded_data.molecules[random].shortname+"</h3>";
	}
	else if(question_type == 9 || question_type == 10 || question_type == 11)
	{
		document.getElementById("question").innerHTML="<h3>"+loaded_data.molecules[random].shortshortname+"</h3>";
	}

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
				if(question_type == 0 || question_type == 7 || question_type == 10)
				{
					document.getElementById("answer"+i).innerHTML = loaded_data.molecules[random].longname;
				}
				else if(question_type == 3 || question_type == 6 || question_type == 9)
				{
					document.getElementById("answer"+i).innerHTML="<img class=\"question_image\" src=\""
														+loaded_data.molecules[random].imgsource
														+"\"></img>"
				}
				else if(question_type == 2 || question_type == 4 || question_type == 11)
				{
					document.getElementById("answer"+i).innerHTML = loaded_data.molecules[random].shortname;
				}
				else if(question_type == 1 || question_type == 5 || question_type == 8)
				{
					document.getElementById("answer"+i).innerHTML = loaded_data.molecules[random].shortshortname;
				}
				done = true;
			} 
			// Else, put an unused random answer.
			else {
				// Get random answer.
				var r = Math.floor(Math.random() * loaded_data.molecules.length);
				// Check whether answer is usable now (not used) before putting it on the button.
				if(takens.indexOf(r) == -1)
				{
					if(question_type == 0 || question_type == 7 || question_type == 10)
					{
						document.getElementById("answer"+i).innerHTML = loaded_data.molecules[r].longname;
					}
					else if(question_type == 3 || question_type == 6 || question_type == 9)
					{
						document.getElementById("answer"+i).innerHTML="<img class=\"question_image\" src=\""
															+loaded_data.molecules[r].imgsource
															+"\"></img>"
					}
					else if(question_type == 2 || question_type == 4 || question_type == 11)
					{
						document.getElementById("answer"+i).innerHTML = loaded_data.molecules[r].shortname;
					}
					else if(question_type == 1 || question_type == 5 || question_type == 8)
					{
						document.getElementById("answer"+i).innerHTML = loaded_data.molecules[r].shortshortname;
					}
					takens.push(r);
					done = true;
				}
			}

		}
	};
}

function Answer(number)
{
	if(!answered)
	{
		answered = true;
		if(number == right_answer)
		{
			score++;
		}
		else
		{
			// Make button red.
			$("#answer"+number).addClass("alert");
		}

		// Make right answer button green.
		$("#answer"+right_answer).addClass("success");
		totalQuestion++;
		// Load next question and update score.
		UpdateScore();
		
		document.getElementById("next_button").innerHTML="<button class=\"expand\" onclick=\"ChangeQuestion()\">Next</button>";
		//setTimeout( function(){ ChangeQuestion(); }, 2750 );
	}
	
}