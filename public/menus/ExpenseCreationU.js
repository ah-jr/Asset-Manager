class ExpenseCreationMenu{
    constructor(){
        this.create();
        this.addExpenseButton  = document.getElementById("addExpenseButton");
        this.addExpensionPopUp = document.getElementById("addExpensePopUp");
        this.addExpensionPopUp.style.display = "none";

        this.setAddExpense();
        this.setMouseInteraction();
    }
    create(){
        var DOM_structure = `
        <button id= "addExpenseButton"></button>

        <div id="addExpensePopUp" style="text-align:center;" onsubmit= "return false">
            <form id= "addE">
                <select name="insert-type" id="insert-type">
                    <option value="expense">Expense</option>
                    <option value="income">Income</option>
                </select>
                <input type = "text" class = "textInput" id = "title" name = "title" placeholder= "Title" required>
                <input type = "number" step="0.01" class = "textInput" id = "amount" name = "amount" placeholder= "Amount" required>
                <input type = "date" class = "textInput" id = "date" name = "date" placeholder= "date" required>
                <button type='submit' class = "button" id = "submit">Add</button>
            </form>
        </div>
        `;
        
        $('#addExpenseMenu').append(DOM_structure);
    }
    setAddExpense(){
        var index = 0;
        // Ao adicionar uma nova despesa
        $(document).ready(function(){
            $('#addE').submit(function(event){
                index += 1;
                var type;
                var title  = $("#title").val();
                var amount = $("#amount").val();
                var date   = $("#date").val();

                if ($("#insert-type option:selected").index() == 0)
                    type = REQ_ADD_EXPENSE;
                else if ($("#insert-type option:selected").index() == 1) 
                    type = REQ_ADD_INCOME;
                else   
                    type = undefined;
                    
                $.ajax({
                    method: 'POST',
                    url: "/index",
                    data: {
                        type:     type,
                        title:    title,
                        amount:   amount,
                        value:    1,
                        date:     date,
                        ajax:     1
                    },
                    success: function(status){
                        user        = status;                        
                        updateDashboard();
                    }
                });
            });
        });
    }
    setMouseInteraction(){
        this.addExpenseButton.onmouseover = function(){
            this.addExpenseButton.style.width = "3em";
            this.addExpenseButton.style.height = "3em";
        }.bind(this);
        this.addExpenseButton.onmouseleave = function(){
            this.addExpenseButton.style.width = "2.5em";
            this.addExpenseButton.style.height = "2.5em";
    
        }.bind(this);
        this.addExpenseButton.onmousedown = function(){
            this.addExpensePopUp();
        }.bind(this);
        this.addExpenseButton.onmouseup = function(){
            this.addExpenseButton.style.left = "50%";
        }.bind(this);
    }
    addExpensePopUp() {
        if (this.addExpensionPopUp.style.display === "none") {
            this.addExpensionPopUp.style.display = "block";
        } else {
            this.addExpensionPopUp.style.display = "none";
        }
    } 
    
}