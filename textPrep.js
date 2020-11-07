// @ts-check

let exclaimation = `I will, "I guess," let them know what I mean!!`;
let phrase = `Ich bin sehr lange gelaufen.`;

const sepPunctuation = (str) => {
  let punctuation = str.match(/[^\w\s]/g);
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
  return str;
}

// console.log(sepPunctuation(phrase));

export const tokenize = (str) => {
	let tokens = str.split(" ");
  return tokens;
}


export const wordOrderEdits = (corSent, userSent) => {
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