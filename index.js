// @ts-check

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
addQuestion("Paulina / sich das Bein verstauchen / als er einen Welpen tritt", "Paulina verstaucht sich das Bein, als er einen Welpen tritt.", 4);

console.log(questionArray);
let questionList = `<ol>`;
for (let item of questionArray) {
	console.log(item.question);
    let questionText = `<li> ${item.question} <br> <input type="text" class="answerBox"> <br><br> </li>`;
    questionList = questionList + questionText;
}
questionList = questionList +`</ol><button id="submit" onclick="scoreExercise">Check your work!</button>`;
document.getElementById("questions").innerHTML = questionList;
console.log(questionList);