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
  
  const definitionElement = document.createElement("div");
  defs.forEach((element) => {
    definitionElement.append(printDefinitions(element));
  });
  console.log(definitionElement);
  dialogueBox(definitionElement);
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
  const wordTypeElement = document.createElement("div");
  const wordType = document.createElement("h5");
  wordType.innerText = Object.keys(definitionToPrint)[0];
  wordTypeElement.append(wordType);

  const arrayOfDefs = Object.values(definitionToPrint)[0];
  console.log('arrayofdefs', arrayOfDefs)
  for (let i = 0; i < arrayOfDefs.length; i++) {
    let def = document.createElement("p");
    def.innerText = arrayOfDefs[i].definition;
    console.log('each def', arrayOfDefs[i].definition);
    wordTypeElement.append(def);
  }

  return wordTypeElement
  
}

//read in array of definitions and print to dialogueBox
//dialogue box show up, but not with the definitions. its blank
function dialogueBox (definitionElement) {
  var popup = document.createElement("dialog");

  popup.append(definitionElement);
 
  // console.log("popup text", popup.innerHTML);
  
  var button = document.createElement("button");
  button.textContent = "Close";
  popup.appendChild(button);
  button.addEventListener("click", function() {
    popup.close();
  });
  document.body.append(popup);
  popup.showModal();
}



