
//Initializing the game object properties
var gameItem = {
  currentLetter: "",

  userGues: [],
  incorrectGuesses: [],
  correctGuesses: [],
  correctGuessesInOrder: [],

  capitalsArray: ["PARIS", "PRAGUE", "COPENHAGAN", "ATHENS", "DUBLIN", "ROME", "MONACO", "AMSTERDAM", "OSLO", "LISBON", "MADRID", "LONDON"],
  randomWord: "",
  capitalLetters:[],

  isMatch: null,
  isRepeat: null,

  guessesRemaining: 15,
  loseCount: 0,
  winCount:0,

  generateWord: function(){
    //Generate a random number from 0-11
    var random_num = Math.random() * 12;
    random_num = Math.floor(random_num);

    //Assign randomWord to a word from the array whose index was chosen randomly.
    //Split the string into an array containing the individual letters of the randomly chosen word
    this.randomWord = this.capitalsArray[random_num];
    this.capitalLetters = this.randomWord.split("");

    //Shows that a randomly chosen Europian capital name was converted into an array containing each of its letters.
    console.log(this.randomWord + " " + this.capitalLetters);

    //Since this function will only run on a win/loss, reset the guesses arrays
    this.allGuesses = [];
    this.incorrectGuesses = [];
    this.correctGuesses = [];
    this.correctGuessesInOrder = [];
    this.guessesRemaining = 15;
  },

  checkRepeat: function(){
    var repeatCounter = -1;

    //Loop for the number of guesses previously made amount of times.
    //If the current letter equals one from the array of allGuesses, the counter variable counts up one.
    for (var i=0; i < this.allGuesses.length; i++){
      if (this.currentLetter == this.allGuesses[i]){
        repeatCounter++;
      }
    }
    //If counter is zero, the global isRepeat variable becomes false (signifying no matches found)
    //Otherwise a match was found and isRepeat becomes true.
    if (repeatCounter == 0){
      this.isRepeat = false;
    }
    else{
      this.isRepeat = true;
    }
  },
  checkMatch: function(){
    var matchCounter = 0;

    //Loop for the Europian capital names length amount of times.
    //If the guessed letter is equal to the the Europian capital letter at a given index, the counter variable counts up one.
    for (var i=0; i < this.capitalLetters.length; i++){
      if (this.currentLetter == this.capitalLetters[i]){
        matchCounter++;
      }
    }
    //If counter is zero, the global isMatch variable becomes false (signifying no matches found)
    //Otherwise a match was found and isMatch becomes true.
    if (matchCounter == 0){
      this.isMatch = false;
    }
    else{
      this.isMatch = true;
    }
  },
  match_repeatComparison: function(){
    //If the same key is pressed twice, it is removed from allGuesses.
    if (this.isRepeat == true){
      this.allGuesses.pop(this.currentLetter);
    }
    //Letter has not been guessed and was a wrong guess, put the currentLetter in incorrectGuesses.
    if (this.isRepeat == false && this.isMatch == false){
      this.incorrectGuesses.push(this.currentLetter);
      this.guessesRemaining--;
    }
    //Letter has not been guessed and was a correct guess, put the currentLetter in correctGuesses.
    if (this.isRepeat == false && this.isMatch == true){
      this.correctGuesses.push(this.currentLetter);
      this.guessesRemaining--;
    }
  },
  revealCapital: function(){
    //If there are no correctGuesses,
    //For the number of letters in the bands name, fill the displayed guesses with an underscore.
    if (this.correctGuesses.length == 0){
      for (var i =0; i<this.capitalLetters.length; i++){
        this.correctGuessesInOrder[i] = "_";
      }
    }
    else {
      //For the length of the Europian capital name,
      for (var i=0; i<this.capitalLetters.length; i++){
        //If the displayed guess is not the same as capitalletters at index i,
        if (this.correctGuessesInOrder[i] != this.capitalLetters[i]){
          //Loop for correctGuesses length number of times,
          for (var j=0; j<this.correctGuesses.length; j++){
            //If the correctGuesses at j is equal to capitalLetters at i, the displayedGuess becomes the capitalletters at index i
            if (this.correctGuesses[j] == this.capitalLetters[i]){
              this.correctGuessesInOrder[i] = this.capitalLetters[i];
            }
            //Otherwise the displayedGuess at index i (corresponding to the Europian capital letter's indexes) becomes an underscore.
            else {
              this.correctGuessesInOrder[i] = "_";
            }
          }
        }
      }
    }
//how the elements displayed
    document.getElementById("current-word").innerHTML = this.correctGuessesInOrder.join(" ");
    document.getElementById("num-wins").innerHTML = ("Wins: " + this.winCount + "  ");
    document.getElementById("letters-guessed").innerHTML = this.incorrectGuesses;
    document.getElementById("guesses-remaining").innerHTML = this.guessesRemaining;
  },
  checkProgress: function(){
    var counter = 0;

    //Loop a number of times equal to the length of the Europian capital name. 
    //If a guess is equal to the the Europian capital letter at the same index, add 1 to the counter.
    for (var i=0; i<this.capitalLetters.length; i++){
      if (this.correctGuessesInOrder[i] == this.capitalLetters[i]){
        counter++;
      }
    }

    //If the counter is the length of the Europian capital name, the user has won.
    if (counter == this.capitalLetters.length){
      this.winCount++;
      this.generateWord();
    }
    //If the number of guesses remaining is zero, the user has lost.
    if (this.guessesRemaining == 0){
      this.loseCount++;
      this.generateWord();
    }
  }
}

var userStartedGameOnce = false;

//On every keyup...
document.onkeyup = function(q) {

  //currentLetter is grabbed from the keyboard and converted to upper case.
  //Then the letter is pushed into the allGuesses array
  gameItem.currentLetter = String.fromCharCode(q.keyCode).toUpperCase();

  //If the user presses the space button upon loading the page, start the game.
  if (gameItem.currentLetter == " " && userStartedGameOnce == false){


    gameItem.generateWord();

    userStartedGameOnce = true;

  }

  gameItem.allGuesses.push(gameItem.currentLetter);

  console.log("Current Letter: " + gameItem.currentLetter + "\n" + "Capital Letters: " + gameItem.capitalLetters + "\n" + "All Guesses: " + gameItem.allGuesses);


  //Checks to see if the letter has been typed before.
  //Checks to see if the letter matches with one in the band name.
  gameItem.checkRepeat();
  gameItem.checkMatch();


  //This function determines which array to push the currentLetter into.
  gameItem.match_repeatComparison();

  console.log("Correct Guesses: " + gameItem.correctGuesses);
  console.log("Incorrect Guesses: " + gameItem.incorrectGuesses);
  console.log("Guesses Remaining:" + gameItem.guessesRemaining);

  //Reveals the band name as it is being guessed.
  gameItem.revealCapital();
  console.log(gameItem.correctGuessesInOrder);

  //Check to see if the game is still in progress or if a win/lose has happened
  gameItem.checkProgress();
}
