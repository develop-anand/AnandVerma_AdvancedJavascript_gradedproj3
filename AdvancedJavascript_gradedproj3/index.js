
let Limit = 60;


let dummyArray = [
  "The application should have some dummy text which the user will type character by character",
  "And the time limit for a user to do the typing test will be 60 seconds",
  "The dummy text should be displayed over the html page",
  "The page should also have an input box or area to take the input from the user.",
  "Analyze the input based on the dummy text displayed."
];


let timer_text = document.querySelector(".curr_time");
let accuracy_text = document.querySelector(".curr_accuracy");
let error_text = document.querySelector(".curr_errors");
let cpm_text = document.querySelector(".curr_cpm");
let wpm_text = document.querySelector(".curr_wpm");
let quote_text = document.querySelector(".quote");
let input_area = document.querySelector(".input_area");
let restart_btn = document.querySelector(".restart_btn");
let cpm_group = document.querySelector(".cpm");
let wpm_group = document.querySelector(".wpm");
let error_group = document.querySelector(".errors");
let accuracy_group = document.querySelector(".accuracy");

let remainingTime = Limit;
let timeElapsed = 0;
let total_errors = 0;
let errors = 0;
let accuracy = 0;
let characterInput = 0;
let current_quote = "";
let quoteNo = 0;
let timer = null;

function updateQuote() {
  quote_text.textContent = null;
  current_quote = dummyArray[quoteNo];

  
  current_quote.split('').forEach(char => {
    const charSpan = document.createElement('span')
    charSpan.innerText = char
    quote_text.appendChild(charSpan)
  })

  
  if (quoteNo < dummyArray.length - 1)
    quoteNo++;
  else
    quoteNo = 0;
}

function processCurrentText() {

  
  curr_input = input_area.value;
  curr_input_array = curr_input.split('');

  
  characterInput++;

  errors = 0;

  quoteSpanArray = quote_text.querySelectorAll('span');
  quoteSpanArray.forEach((char, index) => {
    let typedChar = curr_input_array[index]

    
    if (typedChar == null) {
      char.classList.remove('correct_char');
      char.classList.remove('incorrect_char');

      
    } else if (typedChar === char.innerText) {
      char.classList.add('correct_char');
      char.classList.remove('incorrect_char');

      
    } else {
      char.classList.add('incorrect_char');
      char.classList.remove('correct_char');

      
      errors++;
    }
  });

  
  error_text.textContent = total_errors + errors;

  
  let correctCharacters = (characterInput - (total_errors + errors));
  let accuracyVal = ((correctCharacters / characterInput) * 100);
    accuracy_text.textContent = Math.round(accuracyVal);

  
  if (curr_input.length == current_quote.length) {
    updateQuote();

    
    total_errors += errors;

    
    input_area.value = "";
  }
}

function updateTimer() {
  if (remainingTime > 0) {
    
    remainingTime--;

    
    timeElapsed++;

    
    timer_text.textContent = remainingTime + "s";
  }
  else {
    
    finishTyping();
  }
}

function finishTyping() {
  
  clearInterval(timer);

  
  input_area.disabled = true;

  
  quote_text.textContent = "Click on restart to start a new game.";

  
  restart_btn.style.display = "block";

  
  cpm = Math.round(((characterInput / timeElapsed) * 60));
  wpm = Math.round((((characterInput / 5) / timeElapsed) * 60));

  
  cpm_text.textContent = cpm;
  wpm_text.textContent = wpm;

  
  cpm_group.style.display = "block";
  wpm_group.style.display = "block";
}


function startTyping() {

  resetValues();
  updateQuote();

  // clear old and start a new timer
  clearInterval(timer);
  timer = setInterval(updateTimer, 1000);
}

function resetValues() {
  remainingTime = Limit;
  timeElapsed = 0;
  errors = 0;
  total_errors = 0;
  accuracy = 0;
  characterInput = 0;
  quoteNo = 0;
  input_area.disabled = false;

  input_area.value = "";
  quote_text.textContent = 'Click on the area below to start the game.';
  accuracy_text.textContent = 100;
  timer_text.textContent = remainingTime + 's';
  error_text.textContent = 0;
  restart_btn.style.display = "none";
  cpm_group.style.display = "none";
  wpm_group.style.display = "none";
}