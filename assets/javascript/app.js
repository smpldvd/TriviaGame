// Trivia Game starts once window loads
$(document).ready(function () {

    // Question bank with correct answers to choose from.
    var bank = [
        {
            q: "In database programming, SQL is an acronym for what?",
            cho: ["Some Questionable Language", "Structured Query Language", "Stand Queue Later", "Silly Quick Laugh"],
            cor: 1,
            img: "assets/images/computer.gif"
        },
        {
            q: "What was the first console video game that allowed the game to be saved?",
            cho: ["Mario Bros.", "Mega Man", "Tetris", "The Legend of Zelda"],
            cor: 3,
            img: "assets/images/zelda.gif"
        },
        {
            q: "On the hit show Seinfeld what was Kramer’s first name?",
            cho: ["Cosmos", "Kramer", "Jerry", "George"],
            cor: 0,
            img: "assets/images/kramer.gif"
        },
        {
            q: "The first movie of the Fast and Furious franchise was released in what year?",
            cho: ["2000", "2001", "2004", "2007"],
            cor: 1,
            img: "assets/images/ff.gif"
        },
        {
            q: "Which is not one of the four houses at Hogwarts School of Witchcraft and Wizardry?",
            cho: ["Gryffindor", "Dormchester", "Ravenclaw", "Hufflepuff"],
            cor: 1,
            img: "assets/images/snape.gif"
        },
        {
            q: "What was the first music video played on MTV?",
            cho: ["Video Killed the Radio Star", "Mr. Roboto", "Whip It", "Safety Dance"],
            cor: 0,
            img: "assets/images/mtv.gif"
        },
        {
            q: "What song by Michael Jackson contains the lyrics “Annie are you OK?",
            cho: ["Beat It", "P.Y.T.", "Smooth Criminal", "Thriller"],
            cor: 2,
            img: "assets/images/michael.gif"
        },
        {
            q: "What does HTTP stand for in a website address?",
            cho: ["Help Technology Teach People", "Here To Test People", "HyperText Transfer Protocol", "Hacking Tech True Purpose"],
            cor: 2,
            img: "assets/images/webpage.gif"
        },
        {
            q: "In the original Gameboy game, which of these Pokemon was not a starter?",
            cho: ["Bulbasaur", "Pikachu", "Charmander", "Squirtle"],
            cor: 1,
            img: "assets/images/pikachu.gif"
        },
        {
            q: "In the original Super Mario Bros. on NES, which item gives Mario special ability?",
            cho: ["Green Mushroom", "Feather", "Red Mushroom", "Fire Flower"],
            cor: 3,
            img: "assets/images/mario.gif"
        },
    ];

    // Set perimeters for start of game
    var rightCount = 0;
    var wrongCount = 0;
    var unansCount = 0;
    // var allCount = rightCount + wrongCount + unansCount;
    var qCount = bank.length;
    var userPick = "";
    var run = false;
    var timer = 15;
    var intervalId;
    var index;
    var stor;
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
        if (!run) {
            intervalId = setInterval(decrement, 1000);
            run = true;
        }
    }

    // Stop the countdown timer
    function stop() {
        clearInterval(intervalId);
        run = false;
    }

    // Pull timer into the page
    function decrement() {
        timer--;
        $('#timerDis').html("Time Remaining: " + timer + " seconds");
        // Start of trivia; condition for out of time
        if (timer === 0) {
            stop();
            unansCount++;
            $('#answerDis').html("<p>Took too long... Should of picked " + stor.cho[stor.cor] + "</p>");
            showGif();
        }
    }

    // Picking a random question from array
    function displayQuest() {
        index = Math.floor(Math.random() * bank.length);
        stor = bank[index];
        // console.log(stor);

        // Display the question and choices in window and loop through all
        $('#questionDis').html(stor.q);

        // User must complete all questions to end
        for (var i = 0; i < stor.cho.length; i++) {
            let userChoice = $("<div>");
            userChoice.addClass("answerChoice");
            userChoice.html(stor.cho[i]);
            userChoice.attr("data-guessvalue", i);
            $('#answerDis').append(userChoice);
        }

        // Be able to click on answer followed by correct answer displayed
        $('.answerChoice').on('click', function () {
            userPick = parseInt($(this).attr("data-guessvalue"));

            // Guess outcomes of right or wrong
            if (userPick === stor.cor && timer > 0) {
                stop();
                rightCount++;
                userPicked = "";
                $("#answerDis").html("<p>You got THAT right!</p>");
                showGif();
            }
            // Function to stop timer when it reaches 0
            else {
                stop();
                wrongCount++;
                userPicked = "";
                $('#answerDis').html("<p>Can't believe you didn't know that. Should of picked " + stor.cho[stor.cor] + "</p>");
                showGif();
            }
        })
    }

    // Show GIF on answer div for 5 seconds
    function showGif() {
        $('#answerDis').append("<img src=" + stor.img + ">");
        newArr.push(stor);
        bank.splice(index, 1);

        // Dumps current question and go to next
        let hidePic = setTimeout( function () {
            $('#answerDis').empty();
            timer = 15;

            // Score shown after all questions have been answered
            if ((rightCount + wrongCount + unansCount) === qCount) {
                $("#questionDis").empty();
                $("#questionDis").html("<h3>It's finally over!  Here's your tally count: </h3>");
                $("#answerDis").append("<h4> Right: " + rightCount + "</h4>");
                $("#answerDis").append("<h4> Wrong: " + wrongCount + "</h4>");
                $("#answerDis").append("<h4> Out of Time: " + unansCount + "</h4>");
                $("#resetBtn").show();
                rightCount = 0;
                wrongCount = 0;
                unansCount = 0;
            } else {
                start();
                displayQuest();

            }
        }, 5000);
    }

    // At score screen, show reset button to go again
    $("#resetBtn").on("click", function () {
        $("#resetBtn").hide();
        $("#answerDis").empty();
        $("#questionDis").empty();
        for (var i = 0; i < qHolder.length; i++) {
            bank.push(qHolder[i]);
        }
        start();
        displayQuest();

    })

})