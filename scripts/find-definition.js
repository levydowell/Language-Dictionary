let selectedText = '';

//Event listener on mouseup event to save the selected(highlighted) text to `selectedText`.
window.addEventListener("mouseup", (e) => {
  selectedText = window.getSelection().toString();
  console.log(selectedText);
  findDef();
  
});

/**
 * Async function that fetches the `selectedText` definition from API.
 * Uses helper functions to isolate needed info and print to console.
 */
async function findDef() {
  const response = await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${selectedText}`);
  let wordData = await response.json();
  let wordVariations = wordData[0].meanings;
  //array containing objects with word type: definition[] pairs
  let defs = [];
  
  //at each array indeces of wordData[0].meanings, create a dictionary of all defs. 
  for (let i=0; i < wordVariations.length; i++) {
    let typeAndDefintion = listDefinitions(wordVariations[i]);
    console.log(typeAndDefintion)
    defs.push(typeAndDefintion);
  }
  console.log(defs);
  defs.forEach((element) => {
    printDefinitions(element);
  });
}

/**
 * Create an object to contain a word type: definition pair. 
 * @param {*} definitionObject an object with a attribute containing the word type, i.e noun, 
 * and a value containing a list of definitions.
 * @returns The `definitionObject` with needed info.
 */
function listDefinitions (definitionObject) {
  
  const UsageAndDefintions = {};
  let partOfSpeechValue = definitionObject.partOfSpeech;
  
  UsageAndDefintions[partOfSpeechValue] = definitionObject.definitions;
  return UsageAndDefintions;
}

/**
 * Print the word type and associated definitions to the console.
 * @param {*} definitionToPrint An object with word type: definition[] pairs.
 */
function printDefinitions (definitionToPrint) {
  // Object.keys returns list of keys, and there is only one key passed(the word type), so you need to access definitionToPrint[0];
  const wordType = Object.keys(definitionToPrint)[0];
  console.log(wordType);

  const arrayOfDefs = Object.values(definitionToPrint)[0];
  dialogueBox(arrayOfDefs);
  //prints out all the definitions
  // for (let i=0; i<arrayOfDefs.length; i++) {
  //   console.log(arrayOfDefs[i].definition);
  // }
  
}

//read in array of definitions and print to dialogueBox
//dialogue box show up, but not with the definitions. its blank
function dialogueBox (arrayOfDefs) {
  var popup = document.createElement("dialog");
  popup.innerText = "some popup";
  for (let i=0; i<arrayOfDefs.length; i++) {
    let tempDef = document.createElement("p");
    tempDef.innerText = arrayOfDefs[i];
    popup.appendChild(tempDef);
    // popup.innerText += arrayOfDefs[i].definition;
  }
  console.log("popup text", popup.innerText);
  // popup.textContent = "This is a dialog";
  var button = document.createElement("button");
  button.textContent = "Close";
  popup.appendChild(button);
  button.addEventListener("click", function() {
    popup.close();
  });
  document.body.appendChild(popup);
  popup.showModal();
}



