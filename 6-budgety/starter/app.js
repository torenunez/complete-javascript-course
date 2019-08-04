var budgetController = (function(){
    
    var Expense = function(id, description, value){
        this.id = id;
        this.description = description;
        this.value = value;
        this.pct = -1;
    };
    
    Expense.prototype.calcPct = function(totalIncome){
        if (totalIncome > 0){
            this.pct = Math.round((this.value / totalIncome)*100);
        } else {
            this.pct = -1;   
        }
    };
    
    Expense.prototype.getPct = function(){
        return this.pct;
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
        
        deleteItem: function(type, id){
            var ids, index;
            
            ids = database.allItems[type].map(function(current){
                return current.id
            });
            
            index = ids.indexOf(id);
            
            if (index !== -1){
                database.allItems[type].splice(index,1);
            }
            
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
        
        calculatePercentages: function(){
            var allPct = database.allItems.exp.forEach(function(cur){
                cur.calcPct(database.totals.inc);
            })
            return allPct;
        },
        
        getPercentages: function(){
            
            var allPerc = database.allItems.exp.map(function(cur){
                return cur.getPct()
            });
            
            return allPerc;
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
        percentageLabel: '.budget__expenses--percentage',
        container: '.container',
        expensesPctLabel: '.item__percentage',
        dateLabel: '.budget__title--month'
    };
    
    var formatNumber = function(num, type){
        
        var numSplit, int, dec;
            
        numSplit = Math.abs(num).toFixed(2).split('.');
            
        int = numSplit[0];
        
        if (int.length > 3){
            int = int.substr(0, int.length - 3) + ', '+ int.substr(int.length - 3, 3);
        }
            
        dec = numSplit[1];
        
        return (type == 'exp' ? '-' : '+') + ' ' + int + '.' + dec;     
    };
    
    var nodeListForEach = function(list, callback){
        for (var i = 0; i < list.length; i++){
            callback(list[i], i);
        }  
    };
    
    return {
        getInput: function (){
            return {
            type: document.querySelector(DOMstrings.inputType).value, // inc or exp
            description: document.querySelector(DOMstrings.inputDescription).value,
            value: parseFloat(document.querySelector(DOMstrings.inputValue).value) 
            };
        },
        
        displayMonth: function(){
            var now, monidx, months;
            now = new Date();
            monidx = now.getMonth();
            months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
            year = now.getFullYear();
            document.querySelector(DOMstrings.dateLabel).textContent = months[monidx] + ', ' +year;
            
        },
        
        changedType: function(){
          
            var fields = document.querySelectorAll(
                DOMstrings.inputType +','+
                DOMstrings.inputDescription +','+
                DOMstrings.inputValue);
            
            nodeListForEach(fields, function(cur){
               cur.classList.toggle('red-focus'); 
            });
            
        
            document.querySelector(DOMstrings.inputBtn).classList.toggle('red');
            
        },
        
        getDOMstrings: function(){
            return DOMstrings;
        },
        
        addListItem: function (obj, type){
            
            var html, newHTML, element;
            
            // Create HTML string with %placeholder text%
            if (type === 'inc'){
                element = DOMstrings.incomeContainer;
                html = '<div class="item clearfix" id="inc-%id%"><div class="item__description">%description%</div><div class="right clearfix"><div class="item__value">%value%</div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div>';
            
            } else if (type === 'exp') {
                element = DOMstrings.expensesContainer;
                html = '<div class="item clearfix" id="exp-%id%"><div class="item__description">%description%</div><div class="right clearfix"><div class="item__value">%value%</div><div class="item__percentage">21%</div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div>';
        
            }
        
            // Replace the placeholder text with real data
            newHTML = html.replace('%id%', obj.id);
            newHTML = newHTML.replace('%description%', obj.description);            
            newHTML = newHTML.replace('%value%', formatNumber(obj.value, type));
            
            // Insert HTML into the DOM
            document.querySelector(element).insertAdjacentHTML('beforeend', newHTML);
            
        },
        
        deleteListItem: function(selectorID){
            var element;
            element = document.getElementById(selectorID);
            element.parentNode.removeChild(element);
            
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
            
            var budsign;
            
            obj.budget >= 0 ? budsign = 'inc' : budsign = 'exp';
            
            document.querySelector(DOMstrings.budgetLabel).textContent = formatNumber(obj.budget, budsign);
            document.querySelector(DOMstrings.incomeLabel).textContent = formatNumber(obj.totalInc, 'inc');
            document.querySelector(DOMstrings.expensesLabel).textContent = formatNumber(obj.totalExp, 'exp');
            if (obj.percentage > 0){
                document.querySelector(DOMstrings.percentageLabel).textContent = obj.percentage + ' %';   
            } else {
                document.querySelector(DOMstrings.percentageLabel).textContent = '--';   
            }
        },
        
        displayPcts: function(pcts){

            var fields = document.querySelectorAll(DOMstrings.expensesPctLabel);
        
            nodeListForEach(fields, function(cur, idx){
                if (pcts[idx] > 0){
                    cur.textContent = pcts[idx] + ' %';   
                } else {
                    cur.textContent = '--';   
                }
            });
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
        
        document.querySelector(DOMs.container).addEventListener('click', ctrlDeleteItem);
        
        document.querySelector(DOMs.inputType).addEventListener('change', UIctrl.changedType);
    }
    
    var updateBudget = function(){
        
        // Calculate the budget
        bdgtCtrl.calculateBudget();
        
        // Return the budget
        var budget = bdgtCtrl.getBudget();
        
        // Display the budget on the UI
        UIctrl.displayBudget(budget);
        
    };
    
    var updatePercentages = function(){
        bdgtCtrl.calculatePercentages();
        var percentages = bdgtCtrl.getPercentages();
        UIctrl.displayPcts(percentages);
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

            // Calculate and update budget and percentages
            updateBudget();
            updatePercentages();
        }        
    };
    
    
    var ctrlDeleteItem = function(event){
        var itemID, splitID, type, ID;
        
        itemID = event.target.parentNode.parentNode.parentNode.parentNode.id;
        
        if (itemID){
            splitID = itemID.split('-');
            type = splitID[0];
            ID = parseInt(splitID[1]);
        };

        bdgtCtrl.deleteItem(type,ID);
        
        UIctrl.deleteListItem(itemID);
        
        updateBudget();
        
        updatePercentages();
    };
    
    
    
    return {
        init: function(){
            
            var intialObj = {
                budget: 0,
                totalInc: 0,
                totalExp: 0,
                percentage: -1
            }
            
            console.log('Application has started.');
            UIctrl.displayMonth();
            UIctrl.displayBudget(intialObj);
            setupEventListeners();
        }
    }                                                    
})(budgetController, UIcontroller);


appController.init();