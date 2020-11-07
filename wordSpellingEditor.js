// @ts-check

let givenAns = "Welcome home!";
let userAns = "Wecome home!";

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

//console.log("changes: " + levCalc(givenAns, userAns));

/*const sentAssess = (answerKey, userAnswer) => {
	if (typeof answerKey == "string") answerKey = [answerKey];
  if (answerKey.includes(userAnswer)) return "correct";
  else {
  	let splitAnsKey = [];
  	for (let answer of answerKey) {
    	for (let i in answer) {
      	console.log(answer[i]);
      	if (answer[i] == "!") answer = answer.substr(0,i) + " " + answer[i] + " " + answer.substr(i+1); 
      }
  	splitAnsKey.push(answer.split(" "));
  	}
    console.log(splitAnsKey);
    let splitUserRes = userAnswer.split(" ");
    console.log("User res: " + splitUserRes);
    //for (let answer of splitAnswers) 
    
 }
 }


console.log(sentAssess(givenAns, userAns));
*/