// Trivia Game starts once window loads
window.onload = function () {

    // Question bank with correct answers to choose from.
    var questionAsk = [
        {
            quest: "In database programming, SQL is an acronym for what?",
            choices: ["Some Questionable Language", "Structured Query Language", "Stand Queue Later", "Silly Quick Laugh"],
            correct: "Structured Query Language",
            image: "assets/images/computers.gif"
        },
        {
            quest: "What was the first console video game that allowed the game to be saved?",
            choices: ["Mario Bros.", "Mega Man", "Tetris", "The Legend of Zelda"],
            correct: "The Legend of Zelda",
            image: "assets/images/zelda.gif"
        },
        {
            quest: "On the hit show Seinfeld what was Kramer’s first name?",
            choices: ["Cosmos", "Kramer", "Jerry", "George"],
            correct: "Cosmos",
            image: "assets/images/kramer.gif"
        },
        {
            quest: "The first movie of the Fast and Furious franchise was released in what year?",
            choices: ["2000", "2001", "2004", "2007"],
            correct: "2001",
            image: "assets/images/ff.gif"
        },
        {
            quest: "Which is not one of the four houses at Hogwarts School of Witchcraft and Wizardry?",
            choices: ["Gryffindor", "Dormchester", "Ravenclaw", "Hufflepuff"],
            correct: "Dormchester",
            image: "assets/images/snape.gif"
        },
        {
            quest: "What was the first music video played on MTV?",
            choices: ["Video Killed the Radio Star", "Mr. Roboto", "Whip It", "Safety Dance"],
            correct: "Video Killed the Radio Star",
            image: "assets/images/mtv.gif"
        },
        {
            quest: "What song by Michael Jackson contains the lyrics “Annie are you OK?",
            choices: ["Beat It", "P.Y.T.", "Smooth Criminal", "Thriller"],
            correct: "Smooth Criminal",
            image: "assets/images/michael.gif"
        },
        {
            quest: "What does HTTP stand for in a website address?",
            choices: ["Help Technology Teach People", "Here To Test People", "HyperText Transfer Protocol", "Hacking Tech True Purpose"],
            correct: "HyperText Transfer Protocol",
            image: "assets/images/webpage.gif"
        },
        {
            quest: "In the original Gameboy game, which of these Pokemon was not a starter?",
            choices: ["Bulbasaur", "Pikachu", "Charmander", "Squirtle"],
            correct: "Pikachu",
            image: "assets/images/pikachu.gif"
        },
        {
            quest: "In the original Super Mario Bros. on NES, which item gives Mario special ability?",
            choices: ["Green Mushroom", "Feather", "Red Mushroom", "Fire Flower"],
            correct: "Fire Flower",
            image: "assets/images/mario.gif"
        },
    ]

    // Set perimeters for start of game
    var correctCount = 0;
    var wrongCount = 0;
    var uncorrectedCount = 0;
    var userPicked = " ";
    var ans;
    var newArr = [];
    var holder = [];
    var running = false;
    var timer = 15;
    var intervalId;

    // After page loads, have only start button appear
    $('#reset').hide();
    // Click to start function
    $('#start').on("click", function() {
        $('#start').hide();
        displayQuest();
        runTimer();
        for (var i = 0; i < questionAsk.length; i++) {
            holder.push(questionAsk[i]);
        }
    })

    // Start the countdown timer
    function runTimer() {
        if (!running) {
            intervalId = setInterval(decrement, 1000);
            running = true;
        }
    }

    // Pull timer into the page
    function decrement() {
        $('#timeLeft').html('Time Remaining: ' + timer);
        timer--;
        // Function to stop timer when it reaches 0
        if (timer === 0) {
            uncorrectedCount++;
            stop();
            $('#correct').html("Took too long... The correct was " + ans.choices[ans.correct])
        }
    }

}