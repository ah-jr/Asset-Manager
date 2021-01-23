function renderEvolutionChart(data, labels) {
    
    var ctx = document.getElementById("evolutionChart").getContext('2d');
    evolutionData.push(user.expenses[user.expenses.length - 1].amount)
    evolutionLabels.push(user.expenses[user.expenses.length - 1].date)

    console.log(user.expenses[0].date)

    var evolutionChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: labels,
            datasets: [{
                label: 'This week',
                data: evolutionData,
                backgroundColor: 'rgba(255, 0, 0, 1)'
            }]
        },
    });
}

function evolutionWindow(){
    $('#EVMAX').click(function(event){
        var window = document.getElementById("evolution")
        if (!UI.evolutionFullscreen)
        {
            hideModules(window.parentElement)
            window.style.transition = "0.2s ease";
            window.style.height = "98%"
            window.style.width = "98%"
            window.style.top = "50%"
            window.style.left = "50%"
            window.zIndex = "20";
            UI.evolutionFullscreen = true;
        }
        else{
            showModules()
            window.style.height = "40%"
            window.style.width = "30%"
            window.style.top = user.UI[3][1]
            window.style.left = user.UI[3][0]
            window.zIndex = "1";
            UI.evolutionFullscreen = false;
            setTimeout(() => {window.style.transition = "0s";}, 210);
        }
    })
}