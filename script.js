$.ajax({
    url: 'themoviedb_data.json',
    dataType: 'json',
    type: 'get',
    cache: false,
    success: function(data) {
        console.log(" Page " + data.page);

        for (i = 0; i < data.results.length; i++) {
            console.log(" poster_path " + data.results[i].poster_path);
            console.log(" adult " + data.results[i].adult);
            console.log(" overview " + data.results[i].overview);
            console.log(" release_date " + data.results[i].release_date);

            for (j = 0; j < data.results[i].genre_ids.length; j++) {
                console.log(" genre_ids " + (j + 1) + " :" + data.results[i].genre_ids[[j]]);
            }

            console.log(" id " + data.results[i].id);
            console.log(" original_title " + data.results[i].original_title);
            console.log(" original_language " + data.results[i].original_language);
            console.log(" title " + data.results[i].title);
            console.log(" backdrop_path " + data.results[i].backdrop_path);
            console.log(" popularity " + data.results[i].popularity);
            console.log(" vote_count " + data.results[i].vote_count);
            console.log(" video " + data.results[i].video);
            console.log(" vote_average " + data.results[i].vote_average);
        }
        console.log(" total_results  " + data.total_results);
        console.log(" total_pages  " + data.total_pages);
    }
});

(function collectJSON() {

    var xmlhttp = new XMLHttpRequest();
    xmlhttp.open("GET", "themoviedb_data.json", false);
    xmlhttp.send();
    if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
        var result = xmlhttp.responseText;
        var jsResult = JSON.parse(result);
    }

    for (var i = 0; i < 10; i++) {
        var results = [i];
        results[i] = Math.floor(Math.random() * 100);
        var temp = "https://image.tmdb.org/t/p/w500" + jsResult.results[i + Math.floor(Math.random() * 10)].poster_path;
        document.getElementById("image1").setAttribute("src", temp);
        var temp = "https://image.tmdb.org/t/p/w500" + jsResult.results[i + Math.floor(Math.random() * 10)].poster_path;
        document.getElementById("image2").setAttribute("src", temp);
        var temp = "https://image.tmdb.org/t/p/w500" + jsResult.results[i + Math.floor(Math.random() * 10)].poster_path;
        document.getElementById("image3").setAttribute("src", temp);
        var temp = "https://image.tmdb.org/t/p/w500" + jsResult.results[i + Math.floor(Math.random() * 10)].poster_path;
        document.getElementById("image4").setAttribute("src", temp);
    }

    //  var randomImage = jsResult.results[0].backdrop_path;
    //  $(#randImg).attr("src", randomImage);


    var questions = [{
        question: "Which Brad Pitt Movie is based on a famous novel by Chuck Palahniuk?",
        choices: [jsResult.results[0].original_title, jsResult.results[1].original_title, jsResult.results[2].original_title, jsResult.results[3].original_title, jsResult.results[4].original_title],
        correctAnswer: 1
    }, {
        question: "On which date was the movie se7en released?",
        choices: [jsResult.results[1].release_date, jsResult.results[0].release_date, jsResult.results[2].release_date, jsResult.results[5].release_date, jsResult.results[6].release_date],
        correctAnswer: 3
    }, {
        question: "What is the average user rating for Inglourious Basterds?",
        choices: [jsResult.results[2].vote_average, jsResult.results[8].vote_average, jsResult.results[4].vote_average, jsResult.results[0].vote_average, jsResult.results[7].vote_average],
        correctAnswer: 2
    }];

    var trackingQuestionNumber = 0;
    var selectedByUser = [];
    var quiz = $('#quiz');

    showNextQuestion();

    $('#next').on('click', function(e) {
        e.preventDefault();

        if (quiz.is(':animated')) {
            return false;
        }
        choose();

        if (isNaN(selectedByUser[trackingQuestionNumber])) {
            alert('Please make a selection!');
        } else {
            trackingQuestionNumber++;
            showNextQuestion();
        }
    });

    $('#back').on('click', function(e) {
        e.preventDefault();

        if (quiz.is(':animated')) {
            return false;
        }
        choose();
        trackingQuestionNumber--;
        showNextQuestion();
    });

    $('#tryAgain').on('click', function(e) {
        e.preventDefault();

        if (quiz.is(':animated')) {
            return false;
        }
        trackingQuestionNumber = 0;
        selectedByUser = [];
        showNextQuestion();
        $('#tryAgain').hide();
    });

    function createQuestions(index) {
        var qElement = $('<div>', {
            id: 'question'
        });

        var header = $('<h2>Question ' + (index + 1) + ':</h2>');
        qElement.append(header);

        var question = $('<p>').append(questions[index].question);
        qElement.append(question);

        var radioButtons = createRadioButtons(index);
        qElement.append(radioButtons);

        return qElement;
    }

    function createRadioButtons(index) {
        var radioList = $('<ul>');
        var item;
        var input = '';
        for (var i = 0; i < questions[index].choices.length; i++) {
            item = $('<li>');
            input = '<input type="radio" name="answer" value=' + i + ' />';
            input += questions[index].choices[i];
            item.append(input);
            radioList.append(item);
        }
        return radioList;
    }

    function choose() {
        selectedByUser[trackingQuestionNumber] = +$('input[name="answer"]:checked').val();
    }

    function showNextQuestion() {
        quiz.fadeOut(function() {
            $('#question').remove();

            if (trackingQuestionNumber < questions.length) {
                var nextQuestion = createQuestions(trackingQuestionNumber);
                quiz.append(nextQuestion).fadeIn();
                if (!(isNaN(selectedByUser[trackingQuestionNumber]))) {
                    $('input[value=' + selectedByUser[trackingQuestionNumber] + ']').prop('checked', true);
                }

                if (trackingQuestionNumber === 1) {
                    $('#back').show();
                } else if (trackingQuestionNumber === 0) {

                    $('#back').hide();
                    $('#next').show();
                }
            } else {
                var scoreElem = displayScore();
                quiz.append(scoreElem).fadeIn();
                $('#next').hide();
                $('#back').hide();
                $('#tryAgain').show();
            }
        });
    }

    function displayScore() {
        var score = $('<p>', {
            id: 'question'
        });

        var numCorrect = 0;
        for (var i = 0; i < selectedByUser.length; i++) {
            if (selectedByUser[i] === questions[i].correctAnswer) {
                numCorrect++;
            }
        }

        score.append("Out of " + questions.length + " you answered " + numCorrect + " questions correctly!");
        return score;
    }
})();