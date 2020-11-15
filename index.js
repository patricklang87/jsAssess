// @ts-check

/*  These are my attempted import files -- they are not yet functional
import { sepPunctuation, tokenize, wordOrderEdits } from './textPrep.js';
import { sentCorrector as editWordOrder } from './wordOrderEditor.js';
import { levCalc as editSpelling } from './wordSpellingEditor.js';
*/

// textPrep.js

const sepPunctuation = (str) => {
    //may have to adjust punctuation. previous regex picked up umlauts: /[^/w/s]/g
    let punctuation = str.match(/[,.":;()]/g);
    console.log(punctuation);
    if (punctuation != null) {
    let alreadyCovered = [];
    for (let i of punctuation) {
        console.log(str, i);
      if (!alreadyCovered.includes(i)) {
          if (i == ".") str = str.replace(new RegExp(/\./, 'g'), " " + i + " ");
        else  str = str.replace(new RegExp(i, 'g'), " " + i + " ");
      }
      alreadyCovered.push(i);
    }
    str = str.replace(/\s+/g, " ");
    str = str.substr(0, str.length - 1);
  }
    return str;
  }
  
  // console.log(sepPunctuation(phrase));
  
const tokenize = (str) => {
      let tokens = str.split(" ");
    return tokens;
  }

  const prepSentence = (str) => {
    let sepStr = sepPunctuation(str);
    let tokenStr = tokenize(sepStr);
    return tokenStr;
  }
  
  
const wordOrderEdits = (corSent, userSent) => {
    if (userSent == corSent) return "correct";
    else {
        let corSentPrep = tokenize(sepPunctuation(corSent));
      let userSentPrep = tokenize(sepPunctuation(userSent));
      console.log(corSentPrep, userSentPrep);
      for (let index in corSentPrep) {
      console.log(index);
          if (userSentPrep[index] != corSentPrep[index]) {
            if (corSentPrep.includes(userSentPrep[index])) {
              userSentPrep.splice(index, 0, corSentPrep[index]);
                      console.log(userSentPrep);          
          }
        }
      }
    }
  }

  // wordOrderEditor.js 

const sentCorrector = (phrase1, phrase2) => {
    if (phrase1 == phrase2) return 0;
    else {
      let editedPhrase = phrase2;
      let errorCount = 0;
      for (let index in editedPhrase) {
        console.log("index: " + index);
        if (phrase1[index] == undefined) {
            // if the submitted answer is too long, this removes words from the end
          editedPhrase.splice(index, 1);
          errorCount++;
        } else if (editedPhrase[index] != phrase1[index]) {
  
          if (editedPhrase.slice(index).includes(phrase1[index])) {
              //if the submission contains misplaced words included in the correct answer
            let editedPhraseP1 = editedPhrase.slice(0, index);
            let editedPhraseP2 = editedPhrase.slice(index);
  
            editedPhraseP2.splice(editedPhraseP2.indexOf(phrase1[index]), 1);
            console.log("EditedPhraseP2 after: " + editedPhraseP2);
            editedPhrase = editedPhraseP1.concat(editedPhraseP2);
            //insert the correct word at the correct index
            editedPhrase.splice(index, 0, phrase1[index]);
            errorCount++;
          } else {
              //if the submission contains words absent from the correct answer
            editedPhrase.splice(index, 1, phrase1[index]);
            errorCount++;
          }
        }
      }
      //if the submitted answer is too short, this adds the correct words to the end
      if (editedPhrase.length < phrase1.length) {
        for (let index in phrase1) {
          if (editedPhrase[index] == undefined) {
            editedPhrase.splice(index, 0, phrase1[index]);
            errorCount++;
          }
          console.log(editedPhrase);
        }
      }
      //document.getElementById("words").innerHTML = editedPhrase;
      return errorCount;
    }
  }

  // wordSpellingEditor.js

const levCalc = (givenAns, userAns) => {
	if (typeof givenAns != "string") return "please provide string.";
    else if (givenAns == userAns) return "match";
    else {
    	let lenID = 0;
      let userEdit = userAns;
      let editCount = 0;
    	if (userAns.length > givenAns.length) lenID = userAns.length;
    	else lenID = givenAns.length;
    	console.log("lenID: " + lenID);
      do {
      for (let i = 0; i < lenID; i++) {
      	console.log(i);
      	// check for inversions
        if (userEdit[i] != givenAns[i]) {
        	if (userEdit[i+1] == givenAns[i] && userEdit[i] == givenAns[i+1]) {
          	userEdit = userEdit.substr(0, i)  + givenAns[i] + givenAns[i+1] + userEdit.substr(i+2);
          	console.log("invert " + userEdit);
          	editCount ++;
        	}
        	//check for omissions
        	else if (userEdit[i] == givenAns[i+1]) {
        		userEdit = userEdit.substr(0, i) + givenAns[i] + userEdit.substr(i); 
        		console.log("omission " + userEdit);
        		editCount ++;
        	}
        	// check for false insertions
        	else if (userEdit[i+1] == givenAns[i]) {
        		userEdit = userEdit.substr(0, i) + userEdit.substr(i+1);
          	console.log("false insertion " + userEdit);
          	editCount ++;
        	}
        	//check if missing final character
        	else if (userEdit[i] == undefined) {
          	console.log(i, userEdit[i]);
        		userEdit = userEdit + givenAns[i];
        		editCount ++;
          	console.log("missing final char " + userEdit);
        	}
          //check if too long
        	else if (givenAns[i] == undefined) {
          	console.log(i, userEdit[i]);
        		userEdit = userEdit.substr(0, i) + userEdit.substr(i+1);
        		editCount ++;
          	console.log("excess final char " + userEdit);
        	}
          //if simply different
          else {
          	userEdit = userEdit.substr(0, i) + givenAns[i]  + userEdit.substr(i+1);
          	editCount ++;
            console.log("simply wrong " + userEdit);
          }
        }
      }
      }
      while (userEdit != givenAns);
	  console.log(userEdit);
	  document.getElementById("words").innerHTML = userEdit;  
	  return editCount;	
	  
	}  
	
}


// the actual index.js files

let questionArray = [];

function Question(question, answer, maxPoints) {
    this.question = question;
    this.answer = answer;
    this.maxPoints = maxPoints;
}

let addQuestion = (question, answer, maxPoints) => {
	questionArray.push(new Question(question, answer, maxPoints)); 
}

addQuestion("Henny / sich die Finger abschneiden / im Baumarkt", "Henny schneidet sich die Finger im Baumarkt ab.", 3);
addQuestion("Felix / sich den Rücken verletzen / beim Fegen", "Felix verletzt sich den Rücken beim Fegen.", 3)
addQuestion("Paulina / sich das Bein verstauchen / als sie einen Welpen tritt", "Paulina verstaucht sich das Bein, als er einen Welpen tritt.", 4);

//this should be changed so it reflects best practices in HTML
let questionList = `<ol>`;
for (let item of questionArray) {
    let questionText = `<li><p>${item.question} (Points: ${item.maxPoints}) <br> <input type="text" class="answerBox" value="${item.answer}"></p></li>`;
    questionList = questionList + questionText;
}
questionList = questionList +`</ol>`;
document.getElementById("questions").innerHTML = questionList;

const scoreExercise = () => {
    let score = 0;
    console.log("begin score exercise");
    let userAnswers = document.getElementsByClassName("answerBox");

    console.log("user Answers: " + userAnswers[0].value);
    console.log("user Answers: " + userAnswers[1].value);
    console.log("user Answers: " + userAnswers[2].value);
    console.log("User Answers length: " + userAnswers.length);

    // the following block simply check to make sure answers are available
    let userAnsList = `<ol>`;
    for (let answer of userAnswers) {
        let dispAnswer = `<li>${answer.value}</li>`;
        userAnsList += dispAnswer;
    }
    userAnsList += `</ol>`;
    document.getElementById("displayAnswers").innerHTML = userAnsList; 

    // Here I begin to deal with the answers

    for (let index = 0; index < userAnswers.length; index++) {
        if (userAnswers[index].value == questionArray[index].answer)  {
            console.log(index + "; user answer: " + userAnswers[index].value + "; question Array: " + questionArray[index].answer + true);
            console.log(questionArray[index].maxPoints);
            score += questionArray[index].maxPoints;
        }
        else {
            //console.log(index + "; user answer: " + userAnswers[index] + "; question Array: " + questionArray[index].answer + false);
            let pointsAwarded = 0;
            let preppedUserAnswers = prepSentence(userAnswers[index].value);
            let preppedQuestionAnswer = prepSentence(questionArray[index].answer);
            console.log("token User Answer: " + preppedUserAnswers + "; token Correct Answer: " + preppedQuestionAnswer);
            let errorCount = sentCorrector(preppedQuestionAnswer, preppedUserAnswers);
            if (errorCount >= questionArray[index].maxPoints) pointsAwarded = 0;
            else pointsAwarded = questionArray[index].maxPoints - errorCount;
            console.log("errorCount: " + errorCount + "; points Awarded: " + pointsAwarded);
            score += pointsAwarded;
          } 
      
        
    }
    console.log(score);
    return score;
}

/*  Here I tried the check whether my import files work. They don't yet. 
const checkImport = (wordA, wordB) => {
    let amount = editSpelling(wordA, wordB);
    document.getElementById("checkImport").innerHTML = amount;
}
*/