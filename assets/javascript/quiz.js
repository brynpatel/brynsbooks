(function(){
  // Functions
  function buildQuiz(){
    // variable to store the HTML output
    const output = [];

    // for each question...
    myQuestions.forEach(
      (currentQuestion, questionNumber) => {

        // variable to store the list of possible answers
        const answers = [];

        // and for each available answer...
        for(letter in currentQuestion.answers){

          // ...add an HTML radio button
          answers.push(
            `<label>
              <input type="radio" name="question${questionNumber}" value="${letter}">
              ${letter} :
              ${currentQuestion.answers[letter]}
            </label>`
          );
        }

        // add this question and its answers to the output
        output.push(
          `<div class="slide">
            <div class="question"> ${currentQuestion.question} </div>
            <div class="answers"> ${answers.join("")} </div>
            <div class="feedback"> </div>
          </div>`
        );
      }
    );

    // finally combine our output list into one string of HTML and put it on the page
    quizContainer.innerHTML = output.join('');
  }

  function showResults(){

    // gather answer containers from our quiz
    const answerContainers = quizContainer.querySelectorAll('.answers');
    const feedbackContainers = quizContainer.querySelectorAll('.feedback');

    // keep track of user's answers
    let numCorrect = 0;

    // for each question...
    myQuestions.forEach( (currentQuestion, questionNumber) => {

      // find selected answer
      const answerContainer = answerContainers[questionNumber];
      const feedbackContainer = feedbackContainers[questionNumber]
      const selector = `input[name=question${questionNumber}]:checked`;
      const userAnswer = (answerContainer.querySelector(selector) || {}).value;

      // if answer is correct
      if(userAnswer === currentQuestion.correctAnswer){
        // add to the number of correct answers
        numCorrect++;
        feedbackContainer.textContent = "Well done! very impressive.";


        // color the answers green
        answerContainers[questionNumber].style.color = 'lightgreen';
      }
      // if answer is wrong or blank
      else{
        // color the answers red
        answerContainers[questionNumber].style.color = 'red';
        feedbackContainer.textContent = "Sorry, you're answer was incorrect. The correct answer was " + currentQuestion.correctAnswer;
      }
    });

    // show number of correct answers out of total
    resultsContainer.innerHTML = `${numCorrect} out of ${myQuestions.length}`;
  }

  function showSlide(n) {
    slides[currentSlide].classList.remove('active-slide');
    slides[n].classList.add('active-slide');
    currentSlide = n;
    if(currentSlide === 0){
      previousButton.style.display = 'none';
    }
    else{
      previousButton.style.display = 'inline-block';
    }
    if(currentSlide === slides.length-1){
      nextButton.style.display = 'none';
      submitButton.style.display = 'inline-block';
    }
    else{
      nextButton.style.display = 'inline-block';
      submitButton.style.display = 'none';
    }
  }

  function showNextSlide() {
    showSlide(currentSlide + 1);
  }

  function showPreviousSlide() {
    showSlide(currentSlide - 1);
  }

  // Variables
  const quizContainer = document.getElementById('quiz');
  const resultsContainer = document.getElementById('results');
  const submitButton = document.getElementById('submit');
  const myQuestions = [

    {
      question: "Who wrote Harry Potter?",
      answers: {
        a: "JK Rowling",
        b: "Cressida Cowel",
        c: "Jake Rowling"
      },
      correctAnswer: "a"
    },
    {
      question: "How many book are their in existence(roughly as of 2017)?",
      answers: {
        a: "over 7.63 billion",
        b: "over 146 million",
        c: "over 129 million"
      },
      correctAnswer: "c"
    },
    {
      question: "What is bibliosmia?",
      answers: {
        a: "To love the smell of old books",
        b: "To be able to work out the title of a book from smell alone",
        c: "To be able to memorise entire books",
        d: "A fear of books"
      },
      correctAnswer: "a"
    },
  {
    question: "What is the length of the longest sentence ever written?",
    answers: {
      a: "1359 words",
      b: "823 words",
      c: "628 words",
      d: "783 words"
    },
    correctAnswer: "b"
  },
  {
    question: "What is the age of the girl Alice (from Alice in wonderland) is based on?",
    answers: {
      a: "9",
      b: "12",
      c: "10",
      d: "11"
    },
    correctAnswer: "c"
  },
  {
    question: "What is Tsundoku?",
    answers: {
      a: "To buy books but not read them",
      b: "To go to the library once a month without borrowing anything",
      c: "To love japanese literature",
      d: "To be able to memorise entire books"
    },
    correctAnswer: "a"
  },
  {
    question: "Which famous author had a fake book shelf?",
    answers: {
      a: "Charles Dickens",
      b: "Ernest Hemmingway",
      c: "CS Lewis",
      d: "Roal Dahl"
    },
    correctAnswer: "a"
  },
  {
    question: "What branch of books are proven to make people nicer?",
    answers: {
      a: "Audiobooks",
      b: "E-books",
      c: "Fiction",
      d: "Non-fiction"
    },
    correctAnswer: "c"
  },
  {
    question: "What is the most read book in the world?",
    answers: {
      a: "The Holy Bible",
      b: "Quotations from Chairman Mao Tse-Tung",
      c: "Harry Potter and the deathly Hallows",
      d: "Harry Potter and the philosiphers stone"
    },
    correctAnswer: "a"
  },
  {
    question: "On average, how many books are published a year?",
    answers: {
      a: "755,755",
      b: "1 million",
      c: "300,001",
      d: "726 million"
    },
    correctAnswer: "a"
  }
  ];
  // Kick things off
  buildQuiz();

  // Pagination
  const previousButton = document.getElementById("previous");
  const nextButton = document.getElementById("next");
  const slides = document.querySelectorAll(".slide");
  let currentSlide = 0;

  // Show the first slide
  showSlide(currentSlide);

  // Event listeners
  submitButton.addEventListener('click', showResults);
  previousButton.addEventListener("click", showPreviousSlide);
  nextButton.addEventListener("click", showNextSlide);
})();
