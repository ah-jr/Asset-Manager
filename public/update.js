function updateDashboard(){
    ExpenseList.updateList();
    Networth.updateNetworth();

    //Check to either show/hide modules:
    if (user.expenses.length != 0){

        ExpenseRatios.DOM.style.display = "block";
        ExpenseList.DOM.style.display   = "block";
        Networth.DOM.style.display      = "block";
        Evolution.DOM.style.display     = "block";

        var pieChartValues  = [];
        var lineChartValues = [];

        for(i = 0; i<user.expenses.length; i++){
            if(user.expenses[i] != null){

                var red   = Math.floor(Math.random() * 255);
                var green = Math.floor(Math.random() * 255);
                var blue  = Math.floor(Math.random() * 255);
                var color = '#' + red.toString(16).padStart(2, "0") + green.toString(16).padStart(2, "0") + blue.toString(16).padStart(2, "0");
            
                pieChartValues.push([user.expenses[i].amount, color]);
                lineChartValues.push([user.expenses[i].amount, user.expenses[i].date]);
            }
        }

        ExpenseRatios.pieChart.UpdateValues(pieChartValues);
        ExpenseRatios.pieChart.Paint();

        Evolution.lineChart.UpdateValues(lineChartValues);
        Evolution.lineChart.Paint();
    }
    else{
        ExpenseRatios.DOM.style.display = "none";
        ExpenseList.DOM.style.display   = "none";
        Networth.DOM.style.display      = "none";
        Evolution.DOM.style.display     = "none";
    }
    
    totalExpenses = 0;
    for (i=0; i<user.expenses.length; i++){
        totalExpenses += parseInt(user.expenses[i].amount);
    }

    // UI definitions:
    ExpenseList.DOM.style.left   = user.UI[0][0];
    ExpenseList.DOM.style.top    = user.UI[0][1];
    ExpenseRatios.DOM.style.left = user.UI[1][0];
    ExpenseRatios.DOM.style.top  = user.UI[1][1];
    Networth.DOM.style.left      = user.UI[2][0];
    Networth.DOM.style.top       = user.UI[2][1];
    Evolution.DOM.style.left     = user.UI[3][0];
    Evolution.DOM.style.top      = user.UI[3][1];
}

  