function updateDashboard(){
    //Check to either show/hide modules:
    if (expenses.length != 0){
        chart[0].style.display = "block"
        eList[0].style.display = "block"
        networth.style.display = "block"
        for(i = 0; i<expenses.length; i++){
            if(expenses[i] != null){
                chartData.push(expenses[i].amount)
                chartLabels.push(expenses[i].title)
                chartColor.push("rgba(" + rand(255) + ", " + rand(255) + ", " + rand(255) + ", 1)")
            }
        }
    }
    else{
        chart[0].style.display = "none"
        eList[0].style.display = "none"
        networth.style.display = "none"
    }
    
    totalExpenses = 0;
    for (i=0; i<user.expenses.length; i++){
        totalExpenses += parseInt(user.expenses[i].amount)
    }

    eList[0].style.left = user.UI[0][0]
    eList[0].style.top = user.UI[0][1]
    chart[0].style.left = user.UI[1][0]
    chart[0].style.top = user.UI[1][1]
    networth.style.left = user.UI[2][0]
    networth.style.top = user.UI[2][1]
    evolution.style.left = user.UI[3][0]
    evolution.style.top = user.UI[3][1]

    $('#chart-container').empty()
    $('#chart-container').append('<canvas id="myChart"></canvas>')
    //Chart definitions:
    var myChart = new Chart(ctx, {
        type: 'pie',
        data: {
            labels: chartLabels,
            datasets: [{
                label: '# of Votes',
                data: chartData,
                backgroundColor: chartColor,
                borderColor: chartColor,
                borderWidth: 1
            }]
        },
        options: {
            legend: {
                    position: 'bottom',
                    labels: {
                        fontSize: 20, //change the size of the labels
                        boxWidth: 20,
                        boxHeight: 20
                    }
            },
            layout: {
                padding:{
                    left: 0,
                    right: 0,
                    top: 0,
                    bottom: 0
                }
            } 
        }
    });
}


function rand(max) {
    return Math.random() * max;
  }
  