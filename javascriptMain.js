var model = {

    // model/controller
    questions: myQuestions, // load data
    index: 0, // start array index at 0
    count: myQuestions.length, // get a count of questions.

    // bind model to view:
    num: ko.observable(myQuestions[0].num),
    number: ko.observable(myQuestions[0].number),
    question: ko.observable(myQuestions[0].question),
    answerA: ko.observable(myQuestions[0].answers.a),
    answerB: ko.observable(myQuestions[0].answers.b),
    answerC: ko.observable(myQuestions[0].answers.c),
    answerD: ko.observable(myQuestions[0].answers.d),
    answerGiven: 0, // current answer.

    // controller functions:
    next: function () // next question.
    {
        this.questions[this.index].answerGiven = this.answerGiven; // question on view to model.
        document.getElementById("answer_" + this.answerGiven).checked = false; // uncheck radio for answer.
        this.index++; // go to the next questions

        if (this.index >= 9) {
            this.showQuestion(); // show next questions on the view.
            // if index > count we have reached the end of the quiz
            $("#next").hide(); // hide next button
            $("#submit").show(); // show submit button on view.
            return;
        }
        $("#previous").show(); // shew previous button on view if not already visible.
        this.showQuestion(); // show next questions on the view.
    },

    prev: function () // goto previous questions.
    {
        this.questions[this.index].answerGiven = ""; // reset answer
        this.index--; // decrement index of question.
        if (this.index === 0)
            // if first question hide previous button.
            $("#previous").hide();
        this.showQuestion(); // show question on view.
    },

    showQuestion: function () // show question on view.
    {
        this.num(this.questions[this.index].num);
        this.number(this.questions[this.index].number);
        this.question(this.questions[this.index].question);
        this.answerA(this.questions[this.index].answers.a);
        this.answerB(this.questions[this.index].answers.b);
        this.answerC(this.questions[this.index].answers.c);
        this.answerD(this.questions[this.index].answers.d);
    },
    answerClick: function (
        val // answer selected on view.
    ) {
        this.answerGiven = val;
    },

    gradeQuiz: function () // grade quiz
    {
        var right = 0; // number righ starts with 0.
        var report =
            `<table class="table table-striped table-dark"><tr><th>Questions</th><th>Correct Answer</th><th>Your Answer</th><th>Result</th></tr>`;
        this.questions.forEach((element) => { // loop through each question and answers.
            report +=
                "<tr><td>" +
                element.question +
                " </td><td>" +
                element.correctAnswer +
                "</td><td>" +
                element.answerGiven;

            if (element.answerGiven == element.correctAnswer) { // if answer is correct increment right by one.
                report += ".  </td><td><font color='green'>Correct</font></td></tr>";
                right++;
            } else {
                report += ". </td><td> <font color='red'>Incorrect</font></td></tr>";
            }
        });
        report += "</table>";

        var score = (right / this.count) * 100;

        // construct output:
        var grade = `<b>Score:</b> ${score}% <br/><b>Rank:</b> `;

        var restart = `<div id="restart"><button type="button" class="btn btn-danger" id="number" onclick="restartQuiz()">Restart</button></div>`;

        // determine grade
        if (right < 6) {
            grade += "Beginner";
        } else if (right > 5 && right < 9) {
            grade += "Novice";
        } else if (right > 8) {
            grade += "Expert";
        }
        // display results on view.
        $("#results").html(grade + report + restart);
        $("#results").css("left", "200px");
        $("#width").css("left", "60%");
        $("#width").css("text-align", "left");
        $("#beginQuiz").hide();
    },
};

function restartQuiz () {
    // reloads and resets quiz
    location.reload();
}  