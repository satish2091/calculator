class Calculator{
    constructor(previousoperandTextElement,currentoperandandTextElement){
        this.previousoperandTextElement=previousoperandTextElement
        this.currentoperandandTextElement=currentoperandandTextElement
        this.clear()
    }

    clear(){
        this.currentoperand=''
        this.previousoperand=''
        this.operation = null
    }

    delete(){
        this.currentoperand = this.currentoperand.toString().slice(0,-1)
    }

    appendNumber(number){
        if(number ==='.' && this.currentoperand.includes('.'))return
        this.currentoperand= this.currentoperand.toString()+number.toString()
    }
    chooseOperation( operation){
        if(this.currentoperand ==='')return
        if(this.previousoperand !== ''){
            this.compute()
        }
        this.operation=operation
        this.previousoperand=this.currentoperand
        this.currentoperand=''
    }

    compute(){
        let computation
        const prev=parseFloat(this.previousoperand)
        const current=parseFloat(this.currentoperand)
        if(isNaN(prev) || isNaN(current)) return
        switch(this.operation){
            case '+':
                computation = prev+current;
                break;

                case '-':
                    computation = prev-current;
                    break;
                case '/':
                    computation = prev/current;
                    break;

                case '*':
                        computation = prev*current;
                        break;
                default:
                    return
        }

        this.currentoperand=computation
        this.operation=undefined
        this.previousoperand=''

    }

    getdisplaynumber(number){
        const stringnumber = number.toString()
        const integerdigits= parseFloat(stringnumber.split('.')[0])
        const decimaldigits= stringnumber.split('.')[1]
        let integerdisplay
        if(isNaN(integerdigits)){
            integerdisplay=''
        }
        else{
            integerdisplay=integerdigits.toLocaleString('en',{
                maximumFractionDigits:0
            })
        }
        if(decimaldigits !=null){
            return `${integerdisplay} .${decimaldigits}`
        }
        else{
            return integerdigits
        }

    }

    updateDisplay(){
        this.currentoperandandTextElement.innerText=this.currentoperand
        this.getdisplaynumber(this.currentoperand)
        if(this.operation !=null){
            this.previousoperandTextElement.innerText=
            `${this.previousoperand} ${this.operation}`
        }
        else{
            this.previousoperandTextElement.innerText=' '
        }
    }
}



const numberButtons=document.querySelectorAll('[data-number]')
const operationButtons=document.querySelectorAll('[data-operation]')
const equallButtons=document.querySelector('[data-equals]')
const deleteButtons=document.querySelector('[data-delete]')
const allclearButtons=document.querySelector('[data-allclear]')
const previousoperandTextElement=document.querySelector('[data-previous-operand]')
const currentoperandandTextElement=document.querySelector('[data-current-operand]')
 

const calculator = new Calculator(previousoperandTextElement,currentoperandandTextElement)

numberButtons.forEach(button =>{
    button.addEventListener('click',()=>{
        calculator.appendNumber(button.innerText)
        calculator.updateDisplay()
    })
})

operationButtons.forEach(button =>{
    button.addEventListener('click',()=>{
        calculator.chooseOperation(button.innerText)
        calculator.updateDisplay()
    })
})


equallButtons.addEventListener('click',button =>{
    calculator.compute()
    calculator.updateDisplay()
})


allclearButtons.addEventListener('click',button =>{
    calculator.clear()
    calculator.updateDisplay()
})


deleteButtons.addEventListener('click',button =>{
    calculator.delete()
    calculator.updateDisplay()
})

