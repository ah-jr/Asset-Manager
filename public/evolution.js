function renderEvolutionChart(data, labels) {
    
    var ctx = document.getElementById("evolutionChart").getContext('2d');
    evolutionData = [user.expenses[0].amount, 14000, 12000, 15000, 18000, 19000, 23122];

    var evolutionChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: labels,
            datasets: [{
                label: 'This week',
                data: data,
            }]
        },
    });
}