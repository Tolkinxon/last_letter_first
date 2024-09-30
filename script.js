// Get references to the HTML elements
const startButton = document.getElementById('start-recognition');
const output = document.getElementById('recognized-text');

// Create a new instance of webkitSpeechRecognition
const recognition = new window.webkitSpeechRecognition();

// Set the language and properties
recognition.lang = 'en-US';
recognition.interimResults = false;
recognition.maxAlternatives = 1;

// Event when speech recognition gets a result
recognition.onresult = function(event) {
  const transcript = event.results[0][0].transcript;
  output.textContent = transcript;
};

// Event for handling errors
recognition.onerror = function(event) {
  console.error('Recognition error:', event.error);
};

// Event for when recognition ends
recognition.onend = function() {
  console.log('Recognition ended.');
};

// Start recognition when the button is clicked
startButton.addEventListener('click', () => {
  recognition.start();
});
