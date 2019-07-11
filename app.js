// local storage
// store a new value to local storage: localStorage.setItem('myName', 'Bill')
// retrieve a stored item using the geItem() method: var name = localStorage.getItem("myName")
// remove an item using removeItem() method: localStorage.removeItem('myName')
// clear all local storage: localStorage.clear()

// initialize variables
var questionID, question, choiceA, choiceB, choiceC, choiceD, questions, numQuestions, qInfo,
current = 0;
score = 0,
points = [];

var defaultQuestions = [
    {
        question: "Where are the three smallest bones in the human body?",
        choiceA: "middle ear",
        choiceB: "nose",
        choiceC: "toes",
        choiceD: "eyes",
        correct: "A"
    },
    {
        question: "What is the most abundant element in the Universe?",
        choiceA: "Helium",
        choiceB: "Oxygen",
        choiceC: "Lithium",
        choiceD: "Hydrogen",
        correct: "D"
    },
    {
        question: "Approximately how long does it take for light to travel from the Sun's surface to the Earth?",
        choiceA: "8 days",
        choiceB: "8 seconds",
        choiceC: "8 minutes",
        choiceD: "8 hours",
        correct: "C"
    },
    {
        question: "What is 10/2?",
        choiceA: "5",
        choiceB: "2",
        choiceC: "8",
        choiceD: "9",
        correct: "A"
    },
    {
        question: "Which planet has the most moons?",
        choiceA: "Saturn",
        choiceB: "Mars",
        choiceC: "Jupiter",
        choiceD: "Uranus",
        correct: "C"
    }];
    
    // reference HTML elements
    // var elQuiz = document.getElementById("quiz");
    var elQuizStatus = document.getElementById("quizStatus");
    
    var elQuestion = document.getElementById("question");
    var elChoiceA = document.getElementById("choiceA");
    var elChoiceB = document.getElementById("choiceB");
    var elChoiceC = document.getElementById("choiceC");
    var elChoiceD = document.getElementById("choiceD");
    var elChoices = document.getElementsByName('choices');
    
    // start quiz
    populateQuestions();
    renderQuestion();
    document.getElementById("submit").onclick = gradeQuestion;
    

    function populateQuestions(){
        // populate with default questions
        questions = defaultQuestions;
        // if local storage contains questions, add to question set
        if(localStorage.getItem("questions")){
            var storedQuestions = JSON.parse(localStorage.getItem("questions"));
            for(var i = 0; i < storedQuestions.length; i++){
                questions.push(storedQuestions[i]);
            }
        }
        numQuestions = questions.length;
    }
    
    function populateQuestionInfo(){
        // populate current question info from question list
        question = questions[current].question;
        qInfo = questions[current];
        choiceA = qInfo.choiceA;
        choiceB = qInfo.choiceB;
        choiceC = qInfo.choiceC;
        choiceD = qInfo.choiceD;
        correct = qInfo.correct;
    }
    
    function renderQuestion(){
        // display question on webpage
        questionID = current + 1;
        elQuizStatus.innerHTML = "Question " + (questionID) + " of " + (numQuestions);
        populateQuestionInfo();
        elQuestion.innerHTML = question;
        elChoiceA.innerHTML = choiceA;
        elChoiceB.innerHTML = choiceB;
        elChoiceC.innerHTML = choiceC;
        elChoiceD.innerHTML = choiceD;
    }

    function gradeQuestion(){
        if(getUserChoice()){
            if(userChoice == questions[current].correct){
                score++;
                points[current] = 1;
            }
            else{
                points[current] = 0;
            }
            // next question
            current++;
            renderQuestion();
        }
    }

    function getUserChoice(){
        for (var i = 0, length = elChoices.length; i < length; i++)
        {
            if (elChoices[i].checked)
            {
                userChoice = elChoices[i].value;
    
                // clear radio input for next question
                elChoices[i].checked = false;
    
                return true;
            }
        }
        // user didn't select an answer
        alert("Please select an answer before continuing");
        return false;
    }