var start = document.getElementById('start');
var ok = document.getElementById('ok');
var left = document.getElementById('leftTriangle');
var right = document.getElementById('rightTriangle');
var trainig = document.getElementById('training');
var closer = document.getElementById('closer');
var gameBlock = document.getElementById('gameBlock');
var fakeOk = document.getElementById('fakeOk');
var countsForAnswer = '';
var countsForQuestion = '';
var memoSettings = {
    time: null,
    countsQuantity: 5,
    set: function (val) {
        this.countsQuantity = val;
    }
};
gameBlock.style.display = 'none';
(function getCountsForAnswer() {
    var counts = document.getElementById('counts');
    counts.addEventListener('click', function (event) {
        var clickedCount = event.target;
        var answer = document.getElementById('answer');
        answer.style.color = 'blue';
        if (clickedCount.className === 'count') {
            countsForAnswer += clickedCount.textContent;
            answer.textContent += clickedCount.textContent;
        }
        else
            return null;
    });
})();
(function addHandlersToSettings() {
    var spans = document.getElementsByTagName('span');
    for (var i = 0; i < spans.length; i++) {
        if (spans[i].dataset.setstime) {
            spans[i].addEventListener('click', getSetTimeValueAndHighlight);
        }
    }
})();
function getSetTimeValueAndHighlight() {
    var spans = document.getElementsByTagName('span');
    for (var i = 0; i < spans.length; i++) {
        if (spans[i].dataset.setstime) {
            spans[i].style.color = '#c1bfbf';
        }
    }
    if (this.dataset.setstime == '1' || this.dataset.setstime == '2' || this.dataset.setstime == '3') {
        memoSettings.time = Number(this.dataset.setstime);
        switch (this.dataset.setstime) {
            case '3':
                this.style.color = 'green';
                break;
            case '2':
                this.style.color = 'yellow';
                break;
            case '1':
                this.style.color = 'red';
                break;
        }
    }
    ;
}
function increaseQuantityValue() {
    var quantity = document.getElementById('quantityValue');
    var newQuantityValue = quantity.textContent;
    var newValue = Number(newQuantityValue);
    if (newValue <= 11) {
        newValue++;
        memoSettings.set(newValue);
        var increasedValue = String(newValue);
        quantity.textContent = increasedValue;
    }
    else
        return null;
}
function decreaseQuantityValue() {
    var quantity = document.getElementById('quantityValue');
    var newQuantityValue = quantity.textContent;
    var newValue = Number(newQuantityValue);
    if (newValue > 5) {
        newValue--;
        memoSettings.set(newValue);
        var increasedValue = String(newValue);
        quantity.textContent = increasedValue;
    }
    else
        return null;
}
function createAndShowQuestion() {
    ok.style.display = 'block';
    fakeOk.style.display = 'none';
    countsForAnswer = '';
    countsForQuestion = '';
    var questionField = document.getElementById('question');
    var counts = document.getElementById('counts');
    counts.style.visibility = 'hidden';
    if (memoSettings.time === null) {
        questionField.textContent = 'Choose a "Time!"';
        questionField.style.color = 'red';
        setTimeout(function () { questionField.textContent = ''; }, 3000);
    }
    else {
        var answer = document.getElementById('answer');
        answer.textContent = '';
        var quantity = memoSettings.countsQuantity;
        var time = memoSettings.time * 1000;
        for (var i = 0; i < quantity; i++) {
            var count = String(Math.floor(Math.random() * 10));
            countsForQuestion += count;
        }
        ;
        questionField.textContent = countsForQuestion;
        questionField.style.color = 'orange';
        setTimeout(function () {
            questionField.textContent = '';
            counts.style.visibility = 'visible';
        }, time);
    }
}
function compareCountsCombinations() {
    if (countsForAnswer.length == 0 && countsForQuestion.length == 0) {
        return null;
    }
    var win = document.getElementById('win');
    var fail = document.getElementById('fail');
    var winValue = Number(win.textContent);
    var failValue = Number(fail.textContent);
    var result = (countsForAnswer == countsForQuestion);
    if (result) {
        winValue++;
        var winToWrite = String(winValue);
        win.textContent = winToWrite;
        win.style.color = 'green';
        ok.style.display = 'none';
        fakeOk.style.display = 'block';
    }
    else {
        failValue++;
        var failToWrite = String(failValue);
        fail.textContent = failToWrite;
        fail.style.color = 'red';
        ok.style.display = 'none';
        fakeOk.style.display = 'block';
    }
}
function startTrainig() {
    this.parentElement.style.display = 'none';
    gameBlock.style.display = 'flex';
}
right.addEventListener('click', increaseQuantityValue);
left.addEventListener('click', decreaseQuantityValue);
start.addEventListener('click', createAndShowQuestion.bind(memoSettings));
ok.addEventListener('click', compareCountsCombinations);
closer.addEventListener('click', startTrainig);
trainig.addEventListener('click', startTrainig);
