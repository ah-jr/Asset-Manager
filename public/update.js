function updateDashboard(){
    //Check to either show/hide modules:
    if (expenses.length != 0){
        chart[0].style.display = "block"
        eList[0].style.display = "block"
        networth.style.display = "block"
        evolution.style.display = "block"
        for(i = 0; i<expenses.length; i++){
            if(expenses[i] != null){
                chartData.push(expenses[i].amount)
                chartLabels.push(expenses[i].title)
                chartColor.push("rgba(" + rand(255) + ", " + rand(255) + ", " + rand(255) + ", 1)")
            }
        }
        
        renderChart()
        updateNetworth()
        renderEvolutionChart(evolutionData, evolutionLabels);

    }
    else{
        chart[0].style.display = "none"
        eList[0].style.display = "none"
        networth.style.display = "none"
        evolution.style.display = "none"
    }
    
    totalExpenses = 0;
    for (i=0; i<user.expenses.length; i++){
        totalExpenses += parseInt(user.expenses[i].amount)
    }

    // UI definitions:
    eList[0].style.left = user.UI[0][0]
    eList[0].style.top = user.UI[0][1]
    chart[0].style.left = user.UI[1][0]
    chart[0].style.top = user.UI[1][1]
    networth.style.left = user.UI[2][0]
    networth.style.top = user.UI[2][1]
    evolution.style.left = user.UI[3][0]
    evolution.style.top = user.UI[3][1]
}

  