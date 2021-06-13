function updateDashboard(){
    ExpenseList.updateList();
    IncomeList.updateList();
    Networth.updateNetworth();

    // UI definitions:
    IncomeList.cellID    = user.UI[0].toString().padStart(3, "0") + '-cell';
    ExpenseList.cellID   = user.UI[1].toString().padStart(3, "0") + '-cell';
    Networth.cellID      = user.UI[2].toString().padStart(3, "0") + '-cell';
    IncomeRatios.cellID  = user.UI[3].toString().padStart(3, "0") + '-cell';
    ExpenseRatios.cellID = user.UI[4].toString().padStart(3, "0") + '-cell';
    Evolution.cellID     = user.UI[5].toString().padStart(3, "0") + '-cell';

    //Check to either show/hide modules:
    if ((user.expenses.length != 0) || (user.incomes.length != 0)){

        ExpenseRatios.DOM.style.display = "block";
        ExpenseList.DOM.style.display   = "block";
        Networth.DOM.style.display      = "block";
        Evolution.DOM.style.display     = "block";
        IncomeRatios.DOM.style.display  = "block";
        IncomeList.DOM.style.display    = "block";

        var incomeValues  = [];
        var expenseValues  = [];
        var evolutionValues = [];

        for(i = 0; i<user.expenses.length; i++){
            if(user.expenses[i] != null){

                var red   = Math.floor(Math.random() * 255);
                var green = Math.floor(Math.random() * 255);
                var blue  = Math.floor(Math.random() * 255);
                var color = '#' + red.toString(16).padStart(2, "0") + green.toString(16).padStart(2, "0") + blue.toString(16).padStart(2, "0");
            
                expenseValues.push([user.expenses[i].amount, color]);
                evolutionValues.push([-1 * user.expenses[i].amount, user.expenses[i].date]);
            }
        }

        for(i = 0; i<user.incomes.length; i++){
            if(user.incomes[i] != null){

                var red   = Math.floor(Math.random() * 255);
                var green = Math.floor(Math.random() * 255);
                var blue  = Math.floor(Math.random() * 255);
                var color = '#' + red.toString(16).padStart(2, "0") + green.toString(16).padStart(2, "0") + blue.toString(16).padStart(2, "0");
            
                incomeValues.push([user.incomes[i].amount, color]);
                evolutionValues.push([user.incomes[i].amount, user.incomes[i].date]);
            }
        }

        ExpenseRatios.resize();
        ExpenseList.resize();
        IncomeList.resize();
        IncomeRatios.resize();
        Networth.resize();
        Evolution.resize();  

        ExpenseRatios.pieChart.UpdateValues(expenseValues);
        ExpenseRatios.pieChart.Paint();

        IncomeRatios.pieChart.UpdateValues(incomeValues);
        IncomeRatios.pieChart.Paint();

        Evolution.lineChart.UpdateValues(evolutionValues);
        Evolution.lineChart.Paint();
    }
    else{
        ExpenseRatios.DOM.style.display = "none";
        ExpenseList.DOM.style.display   = "none";
        Networth.DOM.style.display      = "none";
        Evolution.DOM.style.display     = "none";
        IncomeRatios.DOM.style.display  = "none";
        IncomeList.DOM.style.display    = "none";
    }
    
    totalExpenses = 0;
    for (i=0; i<user.expenses.length; i++){
        totalExpenses += parseInt(user.expenses[i].amount);
    }
}

  