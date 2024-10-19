const startButton = document.getElementById('start-recognition');
const outputRobot = document.getElementById('recognized-text-robot');
const outputPerson = document.getElementById('recognized-text-person');
const result = document.querySelector('.result')
const fail = document.querySelector('.fail')

  person.style.display = 'block';
  robot.style.display = 'none'

const recognition = new window.webkitSpeechRecognition();

recognition.lang = 'en-US';
recognition.interimResults = false;
recognition.maxAlternatives = 1;

recognition.onresult = function(event) {
  const transcript = event.results[0][0].transcript;

  
  let prevWords = JSON.parse(getItem('prevWords')) || []
 
  if(!(prevWords.some(item => item == transcript))){
      prevWords.push(word)
      setItem('prevWords', prevWords)

      person.style.display = 'block';
      robot.style.display = 'none'

      outputPerson.textContent = transcript;
    
      robotsTurn(transcript.toLowerCase().at(-1)) 
  } else {
    result.style.display = 'none'
    fail.style.display = 'block'
    fail.textContent = 'person failed'
    setItem('robotsWords', [])
  }
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
  let prevWords = JSON.parse(getItem('prevWords')) || []

  for(let word of firstLetterWords) {
    if(!(prevWords.some(item => item == word))){
      prevWords.push(word)
      setItem('prevWords', prevWords)
      setTimeout(()=>{

         person.style.display = 'none';
         robot.style.display = 'block'

        outputRobot.textContent = word;
      },3000)
      return 
    }
  }

  result.style.display = 'none'
  fail.style.display = 'block'
  fail.textContent = 'Robot failed'
  setItem('robotsWords', [])

  return   
} 



