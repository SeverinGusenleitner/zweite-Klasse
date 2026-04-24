
class NumberGuessingGame{
    private inputEl:HTMLInputElement;
    private resetEl:HTMLButtonElement;
    private guessEl:HTMLButtonElement;
    private feedbackEl: HTMLParagraphElement; 
    private randomNum = this.getRandomNum();
    private guess:number = 0;
    constructor(inputId:string = "input",resetId:string = "reset-btn", guessId:string ="guess-btn", feedbackId:string = "feedback"){
        this.inputEl = document.getElementById(inputId) as HTMLInputElement;
        this.resetEl = document.getElementById(resetId) as HTMLButtonElement;
        this.guessEl = document.getElementById(guessId) as HTMLButtonElement;
        this.feedbackEl = document.getElementById(feedbackId) as HTMLParagraphElement
        this.guessEl.addEventListener("click",()=> {
            this.guess = this.inputEl.valueAsNumber;
            this.giveFeedback();
        })
        this.resetEl.addEventListener("click",()=>this.reset());
        this.inputEl.value = "0";
    }
    private giveFeedback(){
        if(this.guess  === this.randomNum){
            this.feedbackEl.textContent = "you guessed correctly!";
        }else if(this.guess < this.randomNum){
            this.feedbackEl.textContent = "Higher!";
        }else{
            this.feedbackEl.textContent = "Lower!";
        }
    }
    private getRandomNum():number{
        return Math.floor(Math.random()*99)+1;
    }
    private reset(){
        this.guess = 0;
        this.randomNum = this.getRandomNum();
        this.feedbackEl.innerHTML = "";
        this.inputEl.value = "0";
    }
}
const game = new NumberGuessingGame();