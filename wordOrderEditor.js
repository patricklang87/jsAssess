// @ts-check

let phrase1 = ["I", "am", "what", "I", "am", "and", "that's", "what", "I", "am", "I"];
let phrase2 = ["this", "is", "the", "craziest", "thing"];

//for this to work properly, for each nonmatching index you need to look ahead to where the matchin item is located in phrase 2, place it in the correct position, and delete it up ahead.


const sentCorrector = (phrase1, phrase2) => {
  if (phrase1 == phrase2) return "correct";
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
    document.getElementById("words").innerHTML = editedPhrase;
    return (errorCount);
  }
}

//console.log(sentCorrector(phrase1, phrase2));