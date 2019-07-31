var budgetController = (function(){
    
})();


var UIcontroller = (function(){
    
    var DOMstrings = {
        inputType: '.add__type',
        inputDescription: '.add__description',
        inputValue: '.add__value',
        inputBtn: '.add__btn'
    };
    
    return {
        getInput: function (){
            return {
            type: document.querySelector(DOMstrings.inputType).value, // inc or exp
            description: document.querySelector(DOMstrings.inputDescription).value,
            value: document.querySelector(DOMstrings.inputValue).value  
            };
        },
        getDOMstrings: function(){
            return DOMstrings;
        }
        
    };
    
})();


var appController = (function(bdgtCtrl, UIctrl){
    
    var DOMs = UIctrl.getDOMstrings();
    
    var ctrlAddItem = function(){
        
        // 1. Get the field input data
        var input = UIctrl.getInput();
        console.log(input)
        
        // 2. Add item to the budget controller
        
        // 3. Add item to the UI
        
        // 4. Calculate the budget
        
        // 5. Display the budget on the UI
        
    }
    
    document.querySelector(DOMs.inputBtn).addEventListener('click', ctrlAddItem);
    
    document.addEventListener('keypress', function(event){
        
        if(event.keyCode === 13 || event.which === 13){
            ctrlAddItem()
           };
    })
                                                        
})(budgetController, UIcontroller);