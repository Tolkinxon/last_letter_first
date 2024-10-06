const startButton = document.getElementById('start-recognition');
const outputRobot = document.getElementById('recognized-text-robot');
const outputPerson = document.getElementById('recognized-text-person');
const result = document.querySelector('.result')
const fail = document.querySelector('.fail')

const recognition = new window.webkitSpeechRecognition();

recognition.lang = 'en-US';
recognition.interimResults = false;
recognition.maxAlternatives = 1;

recognition.onresult = function(event) {
  const transcript = event.results[0][0].transcript;

  outputPerson.textContent = transcript;
  setTimeout(robotsTurn(transcript.toLowerCase().at(-1)), 10000) 
};

recognition.onerror = function(event) {
  console.error('Recognition error:', event.error);
};

recognition.onend = function() {
  console.log('Recognition ended.');
};



startButton.addEventListener('click', () => {
  recognition.start();
});

function robotsTurn (lastLetter) {
  let firstLetterWords = words[lastLetter]
  let prevRobotsWords = JSON.parse(getItem('robotsWords')) || []

  for(let word of firstLetterWords) {
    if(!(prevRobotsWords.some(item => item == word))){
      prevRobotsWords.push(word)
      setItem('robotsWords', prevRobotsWords)
      outputRobot.textContent = word;
      return 
    }
  }

  result.style.display = 'none'
  fail.style.display = 'block'
  fail.textContent = 'Robot failed'
  setItem('robotsWords', [])

  return   
} 

// function checkRobot(){
//   let prevRobotsWords = JSON.parse(getItem('robotsWords')) || []

//   if(prevRobotsWords.some(item => item == outputRobot.textContent.toLocaleLowerCase())){
 
  
//   }
// }

