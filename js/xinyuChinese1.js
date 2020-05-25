var one = new Word("一", "yī", "one", "default", "default");
var two = new Word("二", "èr", "two", "default", "default");
var three = new Word("三", "sān", "three", "default", "default");
var four = new Word("四", "sì", "four", "default", "default");
var five = new Word("五", "wǔ", "five", "default", "default");
var six = new Word("六", "liù", "six", "default", "default");
var seven = new Word("七", "qī", "seven", "default", "default");
var eight = new Word("八", "bā", "eight", "default", "default");
var nine = new Word("九", "jiǔ", "nine", "default", "default");
var ten = new Word("十", "shí", "ten", "default", "default");

var questionCount= 0; //keeps track of how many questions have been answered so that game can end.
var currentQuestions = []; //array that holds the randomized question order
var questionsInRound = 10; //number of questions to ask. should match the lengnth of the word name array
var numbersMandarin = ['one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine', 'ten'];

var numberCorrect = 0;
var numberWrong = 0;
var currentOption = "optionDualEnglish"

var quizGame = document.getElementById("quizGame");
var results = document.getElementById("results");
var resultsScreen = document.getElementById("resultsScreen");
var showAnswer = document.getElementById("showAnswer");
var closeThis = document.getElementById("closeThis");
var correct = document.getElementById("correct");
var incorrect = document.getElementById("incorrect");

var options = document.getElementById("options");
var dualEnglish = document.getElementById("optionDualEnglish");
var hanziEnglish = document.getElementById("optionHanziEnglish");
var hanziPinyin = document.getElementById("optionHanziPinyin");

var choiceEnglish = document.getElementsByClassName("choiceEnglish");
var choiceHanzi = document.getElementsByClassName("choiceHanzi");
var choicePinyin = document.getElementsByClassName("choicePinyin");
var choiceImage = document.getElementsByClassName("choiceImage");

var questEnglish = document.getElementsByClassName("questEnglish");
var questHanzi = document.getElementsByClassName("questHanzi");
var questPinyin = document.getElementsByClassName("questPinyin");
var questImage = document.getElementsByClassName("questImage");


document.getElementById("choiceOne").addEventListener("click", function(){checkAnswer(document.getElementById("choiceOneEnglish").innerHTML)});
document.getElementById("choiceTwo").addEventListener("click", function(){checkAnswer(document.getElementById("choiceTwoEnglish").innerHTML)});
document.getElementById("choiceThree").addEventListener("click", function(){checkAnswer(document.getElementById("choiceThreeEnglish").innerHTML)});
document.getElementById("choiceFour").addEventListener("click", function(){checkAnswer(document.getElementById("choiceFourEnglish").innerHTML)});
document.getElementById("startGame").addEventListener("click", function(){startGame(document.getElementById("startGame"))});
document.getElementById("resultsScreen").addEventListener("click", function(){startGame(document.getElementById("resultsScreen"))});

document.getElementById("optionDualEnglish").addEventListener("click", function(){optionDualEnglish(document.getElementById("optionDualEnglish"))});
document.getElementById("optionHanziEnglish").addEventListener("click", function(){optionHanziEnglish(document.getElementById("optionHanziEnglish"))});
document.getElementById("optionHanziPinyin").addEventListener("click", function(){optionHanziPinyin(document.getElementById("optionHanziPinyin"))});

document.getElementById("closeThis").addEventListener("click", function(){hideElement(document.getElementById("showAnswer"))});

//temporary
quizGame.style.display = "none";
resultsScreen.style.display = "none";

//displays game screen, hides current screen, randomizes the question list, resets score display.
function startGame(currentScreen)
{
	currentScreen.style.display = "none";
	quizGame.style.display = "grid";
	window.currentQuestions = randomizeChoices(numbersMandarin.length, questionsInRound);
	console.log("new questions:" + currentQuestions);
	document.getElementById("incorrect").innerHTML = 'Incorrect: ' + numberWrong + " ";
	document.getElementById("correct").innerHTML = 'Correct: ' + numberCorrect + " ";
	incorrect.style.backgroundColor = "white";
	correct.style.backgroundColor = "white";
	learn();
	options.style.display = "none";
}

//Displays end screen score board, hides game screen, resets correct/incorrect
function gameEnd()
{
	quizGame.style.display = "none";
	results.innerHTML = 'Correct: ' + numberCorrect + " " + 'Incorrect: ' + numberWrong + " ";
	resultsScreen.style.display = "block";
	window.numberCorrect = 0;
	window.numberWrong = 0;
	options.style.display = "inline-block";
}

//constructor for new words
function Word(hanzi, pinyin, english, image, value)
{
	// console.log("Cunstructing object");
	// console.log(hanzi, pinyin, english, image, value);
	// console.log("--------------------------------------------------------");
	this.hanzi = hanzi;
	this.pinyin = pinyin;
	this.english = english;
	this.image = image;
	this.value = value;
}

//takes in inner html of the english part of a choice.
//Adjusts the score based on number of correct/incorrect answers, checks the answer (using english section for both), and starts next question with learn().
function checkAnswer(userChoice)
{
	var question = document.getElementById("questionEnglish").innerHTML;
	var answer = userChoice;
	if (question === answer)
	{
		console.log("Correct!", question, answer);
		numberCorrect = numberCorrect + 1;
		document.getElementById("correct").innerHTML = 'Correct: ' + numberCorrect + " ";
		correct.style.backgroundColor = "hsl(100, 100%, 80%)";//green
		incorrect.style.backgroundColor = "white";
	}
	else
	{
		console.log("Wrong!", answer);
		showCorrectAnswer()
		numberWrong = numberWrong + 1;
		document.getElementById("incorrect").innerHTML = 'Incorrect: ' + numberWrong + " ";
		incorrect.style.backgroundColor = "hsl(0, 100%, 70%)";//red
		correct.style.backgroundColor = "white";
	}
	learn();
}

// This function takes in an html element of a answer option or question and a string for a word. 
// It then changes the inner html of that that element's hanzi, english, pinyin, image, and value to the word entered.
function assignWord(currentWord, choiceNumber)
{
	//console.log("Choice number object is: " + choiceNumber);
	choiceNumber = wordStringToObject(choiceNumber);
	switch(currentWord)
	{
		case "choiceOne":
		case 1: 
			//console.log("Case one " + currentWord);
			setHanzi(document.getElementById("choiceOneHanzi"), choiceNumber);
			setPinyin(document.getElementById("choiceOnePinyin"), choiceNumber);
			setEnglish(document.getElementById("choiceOneEnglish"), choiceNumber);
			setImage(document.getElementById("choiceOneImage"), choiceNumber);
			break;

		case "choiceTwo":
		case 2:
			//console.log("Case Two " + currentWord);
			setHanzi(document.getElementById("choiceTwoHanzi"), choiceNumber);
			setPinyin(document.getElementById("choiceTwoPinyin"), choiceNumber);
			setEnglish(document.getElementById("choiceTwoEnglish"), choiceNumber);
			setImage(document.getElementById("choiceTwoImage"), choiceNumber);
			break;

		case "choiceThree":
		case 3:
			//console.log("Case three " + currentWord);
			setHanzi(document.getElementById("choiceThreeHanzi"), choiceNumber);
			setPinyin(document.getElementById("choiceThreePinyin"), choiceNumber);
			setEnglish(document.getElementById("choiceThreeEnglish"), choiceNumber);
			setImage(document.getElementById("choiceThreeImage"), choiceNumber);
			break;

		case "choiceFour":
		case 4:
			//console.log("Case four " + currentWord);
			setHanzi(document.getElementById("choiceFourHanzi"), choiceNumber);
			setPinyin(document.getElementById("choiceFourPinyin"), choiceNumber);
			setEnglish(document.getElementById("choiceFourEnglish"), choiceNumber);
			setImage(document.getElementById("choiceFourImage"), choiceNumber);
			break;

		case "question":
			//console.log("Case question " + currentWord);
			setHanzi(document.getElementById("questionHanzi"), choiceNumber);
			setPinyin(document.getElementById("questionPinyin"), choiceNumber);
			setEnglish(document.getElementById("questionEnglish"), choiceNumber);
			setImage(document.getElementById("questionImage"), choiceNumber);
			break;
		default:
			console.log("no element choice found for "  + currentWord);
	}
}


// These functions take in the an html element and a word object and replace the inner html of the element with the object data.
function setEnglish(currentWord, newWord)
{
	currentWord.innerHTML = newWord.english;
	// console.log("eng: ", newWord.english);
	// console.log("inner html: ", currentWord.innerHTML);
	// console.log("new word: ", newWord);
	// console.log("current word: ", currentWord);
	// console.log("--------------------------------------------------------");
}
// These functions take in the an html element and a word object and replace the inner html of the element with the object data.
function setHanzi(currentWord, newWord)
{
	currentWord.innerHTML = newWord.hanzi;
	// console.log("hanzi: ", newWord.hanzi);
	// console.log("inner html: ", currentWord);
	// console.log("new word: ", newWord);
	// console.log("current word: ", currentWord);
	// console.log("--------------------------------------------------------");
}
// These functions take in the an html element and a word object and replace the inner html of the element with the object data.
function setPinyin(currentWord, newWord)
{
	currentWord.innerHTML = newWord.pinyin;
	// console.log("pinyin: ", newWord.pinyin);
	// console.log("inner html: ", currentWord);
	// console.log("new word: ", newWord);
	// console.log("current word: ", currentWord);
	// console.log("--------------------------------------------------------");
}
// These functions take in the an html element and a word object and replace the inner html of the element with the object data.
function setImage(currentWord, newWord)
{
	currentWord.innerHTML = newWord.image;
	// console.log("image: ", newWord.image);
	// console.log("inner html: ", currentWord);
	// console.log("new word: ", newWord);
	// console.log("current word: ", currentWord);
	// console.log("--------------------------------------------------------");
}
// These functions take in the an html element and a word object and replace the inner html of the element with the object data.
function setValue(currentWord, newWord)
{
	currentWord.innerHTML = newWord.value;
	// console.log("value: ", newWord.value);
	// console.log("inner html: ", currentWord);
	// console.log("new word: ", newWord);
	// console.log("current word: ", currentWord);
	// console.log("--------------------------------------------------------");
}


// Takes in the string for whatever word is needed and converts it to the object for that word.
function wordStringToObject(theString)
{
	switch(theString)
	{
		case "one":
			return(one);

		case "two":
			return(two);

		case "three":
			return(three);

		case "four":
			return(four);

		case "five":
			return(five);

		case "six":
			return(six);

		case "seven":
			return(seven);

		case "eight":
			return(eight);

		case "nine":
			return(nine);

		case "ten":
			return(ten);
	}

}

//Takes in the total number of questions/choices and the desired number of questions/choices for a round, 
//and returns a list of random questions/choices(word names) from that list using the fisher - yates shuffle.
function randomizeChoices(totalWordNumber, roundWordNumber)
{
	var temp;
	var potentialNumbers = [];
	//Fill array with numbers for each index up to the size of total word number.
	for (x = 0; x < totalWordNumber; x++)
	{
		potentialNumbers[x] = x;
	}
	//shuffle the numbers in the array using fisher yates shuffle
	for (x = (totalWordNumber-1); x >= 0; x--)
	{
		var y = Math.floor(Math.random() * totalWordNumber);
		temp = potentialNumbers[x];
		potentialNumbers[x] = potentialNumbers[y];
		potentialNumbers[y] = temp
	}
	//put the shuffled numbers in an array the size of roundWordNumber.
	var finalNumbers = [];
	for (x = 0; x < roundWordNumber; x++)
	{
		finalNumbers[x] = potentialNumbers[x];
	}
	return finalNumbers;
}


//Takes in a word set array, number of questions to be asked and returns an array of random question names without repeats.
function ranodomQuestion(words, questionNumber)
{
	var currentQuestions = randomizeChoices(words.legnth, questionNumber[0]);
	//console.log(words.legnth + " " + currentQuestions + " " + words);

}


//Takes in a question, array of word names, and returns an array of random words that must include the answer to the question without repeats.
function ranodomChoice()
{

} 

//-----------------------------Make this function use a word array argument instead of just numbers one.
//assigns random word to the question and random words to the choices while making sure one choice is correct.
function learn()
{
	// console.log((questionCount) + " " + questionsInRound);

	//end the game if all the questions in this round have been answered
	if ((questionCount) === questionsInRound)
	{
		questionCount = 0;
		gameEnd();
		return;
	}

	assignWord("question", numbersMandarin[currentQuestions[questionCount]])//Sets the question to the word from the randomized list
	choiceOrder = randomizeChoices(4, 4)
	// console.log("order set");
	var y = currentQuestions.length-1;
	var correctAnswerIsOption = 0;

	//set the words for each choice of answer. x is the index to step through the randomized answer choice order. y is the number of questions.
	for(x = 0; x < 4; x++)
	{
		//reset y if its less than the number of questions.
		if (y < 0) 
		{
			y = currentQuestions.length-1;
			console.log("Resetting Y");
		}
		// console.log("numbersmanderin currentqetions Y is " + numbersMandarin[currentQuestions[y]] + "| currentQuestionsY is " + currentQuestions[y] + "| Y is: " + y);

		//Set the answer choice data.
		assignWord(choiceOrder[x]+1, numbersMandarin[currentQuestions[y]]);

		//Make sure the correct answer is an option
		if (numbersMandarin[currentQuestions[questionCount]] != numbersMandarin[currentQuestions[y]])
		{
			correctAnswerIsOption = correctAnswerIsOption + 1;
			// console.log("Number of not answers: " + correctAnswerIsOption);
		}
		if (correctAnswerIsOption >= 4) 
		{
			assignWord(choiceOrder[x]+1, numbersMandarin[currentQuestions[questionCount]]);
		}

		y = y-1;
	}
	window.questionCount = questionCount + 1;

}

function optionDualEnglish()
{
	questEnglish[0].style.display = "none";
	questHanzi[0].style.display = "flex";
	questPinyin[0].style.display = "flex";
	questImage[0].style.display = "none";
	currentOption = "optionDualEnglish";

	for(var i=0; i < choiceEnglish.length; i++) 
	{ 
		choiceEnglish[i].style.display = "flex";
		choiceHanzi[i].style.display = "none";
		choicePinyin[i].style.display = "none";
		choiceImage[i].style.display = "none";
	}
}

function optionHanziEnglish()
{
	questEnglish[0].style.display = "none";
	questHanzi[0].style.display = "flex";
	questPinyin[0].style.display = "none";
	questImage[0].style.display = "none";
	currentOption = "optionHanziEnglish";

	for(var i=0; i < choiceEnglish.length; i++) 
	{ 
		choiceEnglish[i].style.display = "flex";
		choiceHanzi[i].style.display = "none";
		choicePinyin[i].style.display = "none";
		choiceImage[i].style.display = "none";
	}
}

function optionHanziPinyin()
{
	questEnglish[0].style.display = "none";
	questHanzi[0].style.display = "flex";
	questPinyin[0].style.display = "none";
	questImage[0].style.display = "none";
	currentOption = "optionHanziPinyin";

	for(var i=0; i < choiceEnglish.length; i++) 
	{ 
		choiceEnglish[i].style.display = "none";
		choiceHanzi[i].style.display = "none";
		choicePinyin[i].style.display = "flex";
		choiceImage[i].style.display = "none";
	}
}

function optionImageDual()
{
	questEnglish[0].style.display = "none";
	questHanzi[0].style.display = "none";
	questPinyin[0].style.display = "none";
	questImage[0].style.display = "flex";
	currentOption = "optionImageDual";

	for(var i=0; i < choiceEnglish.length; i++) 
	{ 
		choiceEnglish[i].style.display = "none";
		choiceHanzi[i].style.display = "flex";
		choicePinyin[i].style.display = "flex";
		choiceImage[i].style.display = "none";
	}
}

function hideElement(currentElement)
{
	currentElement.style.display = "none";
}

function showCorrectAnswer()
{
	DualEnglishAnswer = "<p id='correctedAnswer'>" + questHanzi[0].innerHTML + " (" + questPinyin[0].innerHTML + ")" + " means: " + questEnglish[0].innerHTML + "</p>";
	HanziEnglishAnswer = "<p id='correctedAnswer'>" + questHanzi[0].innerHTML + " means: " + questEnglish[0].innerHTML + "</p>";
	HanziPinyinAnswer = "<p id='correctedAnswer'>" + questHanzi[0].innerHTML + " is pronounced: " + questPinyin[0].innerHTML + "</p>";
	ImageDualAnswer = "<p id='correctedAnswer'>" + questImage[0].innerHTML + "<br>" + questHanzi[0].innerHTML + " (" + questPinyin[0].innerHTML + ")" + "</p>";
	switch(currentOption)
	{
		case "optionDualEnglish":
			showAnswer.innerHTML = "<p id='closeThis'>X</p>" + DualEnglishAnswer;
			break;
		case "optionHanziEnglish":
			showAnswer.innerHTML = "<p id='closeThis'>X</p>" + HanziEnglishAnswer;
			break;
		case "optionHanziPinyin":
			showAnswer.innerHTML = "<p id='closeThis'>X</p>" + HanziPinyinAnswer;
			break;
		case "optionImageDual":
			showAnswer.innerHTML = "<p id='closeThis'>X</p>" + ImageDualAnswer;
			break;
	}

	
	document.getElementById("closeThis").addEventListener("click", function(){hideElement(document.getElementById("showAnswer"))});
	showAnswer.style.display = "block";
	closeThis.style.display = "block";
}