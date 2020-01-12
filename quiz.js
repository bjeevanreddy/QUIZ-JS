var name = sessionStorage.getItem('name');
document.getElementById('username').innerHTML = name;
document.getElementById('end').style.display = 'none';
if (name === 'null') {
    window.location.href = 'feedback.html';
}
var timer = setInterval(countdown, 1000);

var minutes = 1;
var seconds = 60;
countdown();
function countdown() {
    if (seconds < 10) {
        document.getElementById("seconds").innerHTML = "0" + (--seconds);
    }
    else {
        document.getElementById("seconds").innerHTML = --seconds;
    }
    if (minutes >= 0 || minutes < 10) {
        document.getElementById("minutes").innerHTML = "0" + minutes;
    }
    else {
        document.getElementById("minutes").innerHTML = minutes;
    }

    if (minutes == 0 && seconds == 0) {
        stoptime();
        submittest();
    }
    if (seconds == 0) {
        seconds = 60;
        minutes = minutes - 1;
    }
}
function gotofinalpage() {
    window.location.href = 'feedback.html';
    sessionStorage.removeItem('name');
}
function stoptime() {
    clearInterval(timer);
    minutes = 0;
    seconds = 0;
}
var questions = [
    {
        question: "What is the capital of china?",
        options: ["beijing", "shishang", "xiiping", "None"],
        ans: "beijing"
    },
    {
        question: "What is the value of 2+2",
        options: ["2", "34", "4", "0"],
        ans: "4"
    },
    {
        question: "Which one of the followiing is an IDE?",
        options: ["VSCODE", "Lenovo", "Dell", "LG"],
        ans: "VSCODE"
    },
    {
        question: "Not a string function?",
        options: ["concat()", "toString()", "split()", "round()"],
        ans: "round()"
    },
    {
        question: "Who is the strongest?",
        options: [
            "Superman",
            "The Hulk",
            "WonderWoman",
            "Batman"
        ],
        ans: "Superman"
    },
    {
        question: "What is the best seraching engine?",
        options: [
            "Google",
            "Bing",
            "Mozilla",
            "IE"
        ],
        ans: "Google"
    },
    {
        question: "Where is Waldo really?",
        options: [
            "Antarctica",
            "Exploring the Pacific Ocean",
            "Sitting in a tree",
            "Minding his own business, so stop asking"
        ],
        ans: "d"
    },
    {
        question: "Which of the following is database?",
        options: ["sql", "java", "c#", "None"],
        ans: "sql"
    },
    {
        question: "What among the following is attribute to h1 tag in HTMl?",
        options: ["style", "id", "value", "All The Above"],
        ans: "All The Above"
    },
    {
        question: "Which one of the following is highest grossing film ?",
        options: ["aquman", "Justice League", "Joker", "Avengers-Endgame"],
        ans: "Avengers-Endgame"
    }
];
var box = document.getElementById("qbox");
var table = document.getElementById("table");
for (let i = 0; i < questions.length; i++) {
    var head = document.createElement('H1');
    var data = document.createTextNode((i + 1) + "." + questions[i].question);
    head.setAttribute("id", "question");
    head.appendChild(data);
    box.appendChild(head);
    for (let op = 0; op < 4; op++) {
        var radio = document.createElement('INPUT');
        radio.setAttribute("type", "radio");
        radio.setAttribute("name", "question" + i);
        radio.setAttribute("value", questions[i].options[op]);
        radio.setAttribute("id", "option" + op);
        var span = document.createElement("SPAN");
        var radiodata = document.createTextNode(questions[i].options[op]);
        span.appendChild(radiodata);
        var breakline = document.createElement("BR");
        box.appendChild(radio);
        box.appendChild(span);
        box.appendChild(breakline);

    }
    var hr = document.createElement('HR');
    box.appendChild(hr);
}
function submittest() {
    stoptime();
    sessionStorage.removeItem('name');
    var ans_value;
    var correctanswers = 0;
    var notanswered = 0;
    var wronganswers = 0;
    var answered = 0
    var result;
    for (var i = 0; i < questions.length; i++) {
        res = document.querySelector('input[name=question' + i + ']:checked');
        var result = (res) ? res.value : 'null';
        if (result !== 'null') {
            answered++;
            if (questions[i].ans === result) {
                correctanswers = correctanswers + 1;
            }
            else {
                wronganswers++;
            }
        }
        else {
            notanswered++;
        }
    }
    document.getElementById("box").style.display = 'none';
    document.getElementById('answered').innerHTML = answered;
    document.getElementById('correct').innerHTML = correctanswers;
    document.getElementById('incorrect').innerHTML = wronganswers;
    var score = correctanswers * 10 - wronganswers * 2;
    document.getElementById('Percentage').innerHTML = score + " (" + (score / (answered * 10)) * 100 + " %)";
    if (notanswered === (questions.length)) {
        document.getElementById('Percentage').innerHTML = "Fail";
    }
    document.getElementById('report').style.display = 'block';
    document.getElementById('end').style.display = 'block';
    var chart = new CanvasJS.Chart("chartContainer", {
        animationEnabled: true,
        title: {
            text: "Complete Report Analysis"
        },
        data: [{
            type: "pie",
            startAngle: 240,
            yValueFormatString: "0",
            indexLabel: "{label} {y}",
            dataPoints: [
                { y: answered, label: "Answered" },
                { y: wronganswers, label: "Incorrect" },
                { y: correctanswers, label: "Correct" },
                { y: notanswered, label: "Not Answerd" }
            ]
        }]
    });
    chart.render();
    //document.getElementById('pie').innerHTML=chart;
}