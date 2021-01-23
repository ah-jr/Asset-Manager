function chartWindow(){
    $('#CMAX').click(function(event){
        var window = document.getElementsByClassName("chart")
        if (!UI.chartFullscreen)
        {
            hideModules(window[0].parentElement)
            window[0].style.transition = "0.2s ease";
            window[0].style.height = "98%"
            window[0].style.width = "98%"
            window[0].style.top = "50%"
            window[0].style.left = "50%"
            window[0].zIndex = "20";
            UI.chartFullscreen = true;
        }
        else{
            showModules()
            window[0].style.height = "40%"
            window[0].style.width = "30%"
            window[0].style.top = user.UI[1][1]
            window[0].style.left = user.UI[1][0]
            window[0].zIndex = "1";
            UI.chartFullscreen = false;
            setTimeout(() => {window[0].style.transition = "0s";}, 210);
        }
    })
}

function renderChart(){
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