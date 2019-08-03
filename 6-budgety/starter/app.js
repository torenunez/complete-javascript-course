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
        },
        budget: 0, 
        percentage: -1
    };
    
    var calculateTotal = function(type){
        var sum = 0;
        database.allItems[type].forEach(function(c){
            sum += c.value;
        });
        database.totals[type] = sum;
        
    };
    
    
    return {
        addItem: function(type, des, val){
            var newitem, ID;
            
            if (database.allItems[type].length > 0){
                ID = database.allItems[type][database.allItems[type].length - 1].id + 1; 
            } else {
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
        
        calculateBudget: function(){
            
            // calculate total income and expenses
            calculateTotal('exp');
            calculateTotal('inc');
            
            // calculate the budget
            database.budget = database.totals.inc - database.totals.exp;
            
            // calculate percent income spent
            if (database.totals.inc > 0){
                database.percentage = Math.round((database.totals.exp / database.totals.inc) * 100);
            } else {
                database.percentage = -1;   
            }   
        },
        
        getBudget: function(){
            return {
                budget: database.budget,
                totalInc: database.totals.inc,
                totalExp: database.totals.exp,
                percentage: database.percentage
            }
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
        inputBtn: '.add__btn',
        incomeContainer: '.income__list',
        expensesContainer: '.expenses__list',
        budgetLabel: '.budget__value',
        incomeLabel: '.budget__income--value',
        expensesLabel: '.budget__expenses--value',
        percentageLabel: '.budget__expenses--percentage'
    };
    
    return {
        getInput: function (){
            return {
            type: document.querySelector(DOMstrings.inputType).value, // inc or exp
            description: document.querySelector(DOMstrings.inputDescription).value,
            value: parseFloat(document.querySelector(DOMstrings.inputValue).value) 
            };
        },
        
        getDOMstrings: function(){
            return DOMstrings;
        },
        
        addListItem: function (obj, type){
            
            var html, newHTML, element;
            
            // Create HTML string with %placeholder text%
            if (type === 'inc'){
                element = DOMstrings.incomeContainer;
                html = '<div class="item clearfix" id="income-%id%"><div class="item__description">%description%</div><div class="right clearfix"><div class="item__value">%value%</div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div>';
            
            } else if (type === 'exp') {
                element = DOMstrings.expensesContainer;
                html = '<div class="item clearfix" id="expense-%id%"><div class="item__description">%description%</div><div class="right clearfix"><div class="item__value">%value%</div><div class="item__percentage">21%</div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div>';
        
            }
        
            // Replace the placeholder text with real data
            newHTML = html.replace('%id%', obj.id);
            newHTML = newHTML.replace('%description%', obj.description);            
            newHTML = newHTML.replace('%value%', obj.value);
            
            // Insert HTML into the DOM
            document.querySelector(element).insertAdjacentHTML('beforeend', newHTML);
            
        },
        
        clearFields: function(){
            var fields, fieldsArray;
            
            fields = document.querySelectorAll(DOMstrings.inputDescription + ', ' + DOMstrings.inputValue);
            
            fieldsArray = Array.prototype.slice.call(fields);
            
            fieldsArray.forEach(function(current){ //, index, array){ works without the last two forEach arguments
                current.value = "";
            })
            
            fieldsArray[0].focus();
        },
        
        displayBudget: function(obj){
            document.querySelector(DOMstrings.budgetLabel).textContent = obj.budget;
            document.querySelector(DOMstrings.incomeLabel).textContent = obj.totalInc;
            document.querySelector(DOMstrings.expensesLabel).textContent = obj.totalExp;
            if (obj.percentage > 0){
                document.querySelector(DOMstrings.percentageLabel).textContent = obj.percentage + ' %';   
            } else {
                document.querySelector(DOMstrings.percentageLabel).textContent = '--';   
            }
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
    
    var updateBudget = function(){
        
        // Calculate the budget
        bdgtCtrl.calculateBudget();
        
        // Return the budget
        var budget = bdgtCtrl.getBudget();
        
        // Display the budget on the UI
        UIctrl.displayBudget(budget);
        
    };
    
    var ctrlAddItem = function(){
        
        var input, newItem
        
        // Get the field input data
        input = UIctrl.getInput();
        
        if (input.description !== "" && !isNaN(input.value) && input.value > 0){
            // Add item to the budget controller
            newItem = bdgtCtrl.addItem(input.type, input.description, input.value);

            // Add item to the UI
            UIctrl.addListItem(newItem, input.type);
            UIctrl.clearFields();

            // Calculate and update budget
            updateBudget();
        }         
    }
    
    return {
        init: function(){
            
            var intialObj = {
                budget: 0,
                totalInc: 0,
                totalExp: 0,
                percentage: -1
            }
            
            console.log('Application has started.');
            UIctrl.displayBudget(intialObj);
            setupEventListeners();
        }
    }                                                    
})(budgetController, UIcontroller);


appController.init();