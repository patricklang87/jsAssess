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

//this should be changed so it reflects best practices in HTML
let questionList = `<ol>`;
for (let item of questionArray) {
    let questionText = `<li><p>${item.question} (Points: ${item.maxPoints}) <br> <input type="text" class="answerBox"></p></li>`;
    questionList = questionList + questionText;
}
questionList = questionList +`</ol>`;
document.getElementById("questions").innerHTML = questionList;

const scoreExercise = () => {
    let userAnswers = document.getElementsByClassName("answerBox");
    let userAnsList = `<ol>`;
    for (let answer of userAnswers) {
    		console.log(answer.value);
        let dispAnswer = `<li>${answer.value}</li>`;
        userAnsList += dispAnswer;
    }
    userAnsList += `</ol>`;
    document.getElementById("displayAnswers").innerHTML = userAnsList; 
}