var budgetController = (function(){
    
    var Expense = function(id, description, value){
        this.id = id;
        this.description = description;
        this.value = value;
    };
    
    var Income = function(id, description, value){
        this.id = id;
        this.description = description;
        this.value = value;
    };
    
    var database = {
        allItems: {
            exp: [],
            inc: []
        },
        totals: {
            exp: 0,
            inc: 0
        }
    };
    
    return {
        addItem: function(type, des, val){
            var newitem, ID;
            
            if (database.allItems[type].length > 0){
                ID = database.allItems[type][database.allItems[type].length - 1].id + 1; 
            } else {
                console.log(database.allItems.length)
                ID = 0;
            }
            
            if (type==='exp'){
                newItem = new Expense(ID, des, val)
            } else if (type==='inc') {
                newItem = new Income(ID, des, val)      
            }
            
            database.allItems[type].push(newItem);
            return newItem;
        },
        
        testing: function(){
            return database;
        }
    }
    
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
    
    
    var setupEventListeners = function(){
        
        var DOMs = UIctrl.getDOMstrings();
        
        document.querySelector(DOMs.inputBtn).addEventListener('click', ctrlAddItem);
        
        document.addEventListener('keypress', function(event){
            if(event.keyCode === 13 || event.which === 13){
                ctrlAddItem()
            };
        })    
    }
    
    var ctrlAddItem = function(){
        
        var input, newItem
        
        // 1. Get the field input data
        input = UIctrl.getInput();
        
        // 2. Add item to the budget controller
        newItem = bdgtCtrl.addItem(input.type, input.description, input.value);
        
        // 3. Add item to the UI
        
        // 4. Calculate the budget
        
        // 5. Display the budget on the UI
        
    }
    
    return {
        init: function(){
            console.log('Application has started.');
            setupEventListeners();
        }
    }                                                    
})(budgetController, UIcontroller);


appController.init();