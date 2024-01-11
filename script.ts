const start = document.getElementById('start');
const ok = document.getElementById('ok');
const left = document.getElementById('leftTriangle');
const right = document.getElementById('rightTriangle');
const trainig = document.getElementById('training');
const closer = document.getElementById('closer');
const gameBlock = document.getElementById('gameBlock');
const fakeOk = document.getElementById('fakeOk');

let countsForAnswer: string = '';
let countsForQuestion: string = '';
let memoSettings: any = {
    time: null,
    countsQuantity: 5,
    set: function(val: number): void{
        this.countsQuantity = val;
    }
};

gameBlock.style.display = 'none';

(function getCountsForAnswer(): void{
    let counts = document.getElementById('counts');
    counts.addEventListener('click', (event) => {        
        let clickedCount: any = event.target;
        let answer = document.getElementById('answer');
        answer.style.color = 'blue';
        if(clickedCount.className === 'count'){
            countsForAnswer += clickedCount.textContent;
            answer.textContent += clickedCount.textContent;            
        }else return null;
    });
})();

(function addHandlersToSettings(): void {
    let spans = document.getElementsByTagName('span');    
    for(let i = 0; i < spans.length; i++){
        if(spans[i].dataset.setstime){
            spans[i].addEventListener('click', getSetTimeValueAndHighlight);
        }
    }         
})();

function getSetTimeValueAndHighlight(): void {
    let spans = document.getElementsByTagName('span');    
    for(let i = 0; i < spans.length; i++){
        if(spans[i].dataset.setstime){
            spans[i].style.color = '#c1bfbf';
        }
    }
    if(this.dataset.setstime == '1' || this.dataset.setstime == '2' || this.dataset.setstime == '3'){        
        memoSettings.time = Number(this.dataset.setstime);
        switch(this.dataset.setstime){
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
    };    
}

function increaseQuantityValue(): void{    
    let quantity = document.getElementById('quantityValue');
    let newQuantityValue: string = quantity.textContent;    
    let newValue: number = Number(newQuantityValue);
    if(newValue <= 11){
        newValue++;
        memoSettings.set(newValue);
        let increasedValue = String(newValue);
        quantity.textContent = increasedValue;
    }else return null; 
}
function decreaseQuantityValue(): void{
    let quantity = document.getElementById('quantityValue');
    let newQuantityValue: string = quantity.textContent;
    let newValue: number = Number(newQuantityValue);
    if(newValue > 5){
        newValue--;
        memoSettings.set(newValue);
        let increasedValue = String(newValue);
        quantity.textContent = increasedValue;
    }else return null;
}

function createAndShowQuestion(): void{
    ok.style.display = 'block';
    fakeOk.style.display = 'none';
    
    countsForAnswer = '';
    countsForQuestion = '';
    let questionField = document.getElementById('question');
    let counts = document.getElementById('counts');
    counts.style.visibility = 'hidden';
    if(memoSettings.time === null){
        questionField.textContent = 'Choose a "Time!"'
        questionField.style.color = 'red';
        setTimeout(() => {questionField.textContent = ''}, 3000);
    }else {    
        let answer = document.getElementById('answer');
        answer.textContent = '';       
        let quantity = memoSettings.countsQuantity;
        let time = memoSettings.time * 1000;        
                   
        for(let i = 0; i < quantity; i++){
            let count = String(Math.floor(Math.random() * 10));
            countsForQuestion += count;        
        };
        questionField.textContent = countsForQuestion;
        questionField.style.color = 'orange';
        setTimeout(() => {
            questionField.textContent = '';
            counts.style.visibility = 'visible';
        }, time);
    }    
}

function compareCountsCombinations(){
    if(countsForAnswer.length == 0 && countsForQuestion.length == 0){
        return null
    }    
    const win = document.getElementById('win');
    const fail = document.getElementById('fail');
    let winValue: number = Number(win.textContent);
    let failValue: number = Number(fail.textContent);
    let result: boolean = (countsForAnswer == countsForQuestion);
    if(result){
        winValue++;
        let winToWrite: string = String(winValue);
        win.textContent = winToWrite;
        win.style.color = 'green';
        ok.style.display = 'none';
        fakeOk.style.display = 'block';        
    }else {
        failValue++;
        let failToWrite: string = String(failValue);
        fail.textContent = failToWrite;
        fail.style.color = 'red';
        ok.style.display = 'none';
        fakeOk.style.display = 'block';      
    }    
}

function startTrainig(): void{
    this.parentElement.style.display = 'none';
    gameBlock.style.display = 'flex';
}

right.addEventListener('click', increaseQuantityValue);
left.addEventListener('click', decreaseQuantityValue);
start.addEventListener('click', createAndShowQuestion.bind(memoSettings));
ok.addEventListener('click', compareCountsCombinations);
closer.addEventListener('click', startTrainig);
trainig.addEventListener('click', startTrainig);

