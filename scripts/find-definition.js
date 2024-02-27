let selectedText = '';

window.addEventListener("mouseup", (e) => {
  selectedText = window.getSelection().toString();
  console.log(selectedText);
  findDef();
  
});

async function findDef() {
  const response = await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${selectedText}`);
  let wordData = await response.json();
  let wordVariations = wordData[0].meanings;
  let defs = [];
  
  //at each array indeces of wordData[0].meanings, create a dictionary of all defs. 
  for (let i=0; i < wordVariations.length; i++) {
    let typeAndDefintion = listDefinitions(wordVariations[i]);
    defs.push(typeAndDefintion);
  }
  console.log(defs);
  defs.forEach((element) => {
    printDefinitions(element);
  });
}


function listDefinitions (definitionObject) {
  
  const UsageAndDefintions = {};
  let partOfSpeechValue = definitionObject.partOfSpeech;
  
  UsageAndDefintions[partOfSpeechValue] = definitionObject.definitions;
  return UsageAndDefintions;
}

function printDefinitions (definitionToPrint) {
  //prints out the word type, ie `verb` or `noun`.
  const wordType = Object.keys(definitionToPrint)[0];
  console.log("wordtype", wordType);

  const arrayOfDefs = Object.values(definitionToPrint)[0];
  
  //prints out all the definitions
  for (let i=0; i<arrayOfDefs.length; i++) {
    console.log(arrayOfDefs[i].definition);
  }
  
}



