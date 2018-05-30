// Trivia Game starts once window loads
$(document).ready(function () {

    // Question bank with correct answers to choose from.
    var bank = [
        {
            q: "In database programming, SQL is an acronym for what?",
            ch: ["Some Questionable Language", "Structured Query Language", "Stand Queue Later", "Silly Quick Laugh"],
            co: "Structured Query Language",
            img: "assets/images/computers.gif"
        },
        {
            q: "What was the first console video game that allowed the game to be saved?",
            ch: ["Mario Bros.", "Mega Man", "Tetris", "The Legend of Zelda"],
            co: "The Legend of Zelda",
            img: "assets/images/zelda.gif"
        },
        {
            q: "On the hit show Seinfeld what was Kramer’s first name?",
            ch: ["Cosmos", "Kramer", "Jerry", "George"],
            co: "Cosmos",
            img: "assets/images/kramer.gif"
        },
        {
            q: "The first movie of the Fast and Furious franchise was released in what year?",
            ch: ["2000", "2001", "2004", "2007"],
            co: "2001",
            img: "assets/images/ff.gif"
        },
        {
            q: "Which is not one of the four houses at Hogwarts School of Witchcraft and Wizardry?",
            ch: ["Gryffindor", "Dormchester", "Ravenclaw", "Hufflepuff"],
            co: "Dormchester",
            img: "assets/images/snape.gif"
        },
        {
            q: "What was the first music video played on MTV?",
            ch: ["Video Killed the Radio Star", "Mr. Roboto", "Whip It", "Safety Dance"],
            co: "Video Killed the Radio Star",
            img: "assets/images/mtv.gif"
        },
        {
            q: "What song by Michael Jackson contains the lyrics “Annie are you OK?",
            ch: ["Beat It", "P.Y.T.", "Smooth Criminal", "Thriller"],
            co: "Smooth Criminal",
            img: "assets/images/michael.gif"
        },
        {
            q: "What does HTTP stand for in a website address?",
            ch: ["Help Technology Teach People", "Here To Test People", "HyperText Transfer Protocol", "Hacking Tech True Purpose"],
            co: "HyperText Transfer Protocol",
            img: "assets/images/webpage.gif"
        },
        {
            q: "In the original Gameboy game, which of these Pokemon was not a starter?",
            ch: ["Bulbasaur", "Pikachu", "Charmander", "Squirtle"],
            co: "Pikachu",
            img: "assets/images/pikachu.gif"
        },
        {
            q: "In the original Super Mario Bros. on NES, which item gives Mario special ability?",
            ch: ["Green Mushroom", "Feather", "Red Mushroom", "Fire Flower"],
            co: "Fire Flower",
            img: "assets/images/mario.gif"
        },
    ];

    // Set perimeters for start of game
    var correctCount = 0;
    var wrongCount = 0;
    var unansweredCount = 0;
    var allCount = correctCount + wrongCount + unansweredCount;
    var qCount = bank.length;
    var userPicked = "";
    var running = false;
    var timer = 15;
    var intervalId;
    var index;
    var answer;
    var newArr = [];
    var qHolder = [];

    // After page loads, have only start button appear
    $('#resetBtn').hide();
    // Click to start function
    $('#startBtn').on("click", function () {
        $('#startBtn').hide();
        displayQuest();
        start();
        for (var i = 0; i < bank.length; i++) {
            qHolder.push(bank[i]);
        }
    })

    // Start the countdown timer
    function start() {
        if (!running) {
            intervalId = setInterval(decrement, 1000);
            running = true;
        }
    }

    // Stop the countdown timer
    function stop() {
        clearInterval(intervalId);
        running = false;
    }

    // Pull timer into the page
    function decrement() {
        $('#timerDis').html("Time Remaining: " + timer + " seconds");
        timer--;
        // Function to stop timer when it reaches 0
        if (timer === 0) {
            unansweredCount++;
            stop();
            $('#answerDis').html("Took too long... Should of picked " + answer.choices[answer.correct]);
            showGif();
        }
    }

    // Picking a random question from array
    function displayQuest() {
        index = Math.floor(Math.random() * bank.length);
        answer = bank[index];

        // Display the question and choices in window and loop through all
        $('#questionDis').html(answer.q);

        // User must complete all questions to end
        for (var i = 0; i < answer.choices.length; i++) {
            let userChoice = $('<div>');
            userChoice.addClass("answerChoice");
            userChoice.html(answer.choices[i]);
            userChoice.attr("data-guessvalue", i);
            $('#answerDis').append(userChoice);
        }

        // Be able to click on answer followed by correct answer displayed
        $('.answerChoice').on('click', function () {
            userPicked = $(this).attr("data-guessvalue");

            // Guess outcomes of right or wrong
            if (userPicked === answer.correct) {
                stop();
                correctCount++;
                userPicked = "";
                $("#answerDis").html("You got THAT right!");
                indexGif();
            } else {
                stop();
                wrongCount++;
                userPicked = "";
                $('#answerDis').html("Can't believe you didn't know that. Should of picked " + answer.choices[answer.correct]);
                showGif();
            }
        })
    }

    // Show GIF on answer screen
    function showGif() {
        $('#answerDis').append("<img src=" + answer.img + ">");
        newArr.push(answer);
        bank.splice(index, 1);

        let hidePic = setTimeout(function () {
            $('#answerDis').empty();
            timer = 15;

            if (allCount === qCount) {
                $("#questionDis").empty();
                $("#questionDis").html("<h3>Game Over!  Here's how you did: </h3>");
                $("#answerDis").append("<h4> Right: " + correctCount + "</h4>");
                $("#answerDis").append("<h4> Wrong: " + wrongCount + "</h4>");
                $("#answerDis").append("<h4> Out of Time: " + unanswerCount + "</h4>");
                $("#resetBtn").show();
                correctCount = 0;
                wrongCount = 0;
                unanswerCount = 0;
            } else {
                runTimer();
                displayQuest();

            }
        }, 3000);
    }

    $("#resetBtn").on("click", function () {
        $("#resetBtn").hide();
        $("#answerDis").empty();
        $("#questionDis").empty();
        for (var i = 0; i < holder.length; i++) {
            bank.push(holder[i]);
        }
        runTimer();
        displayQuestion();

    })

})