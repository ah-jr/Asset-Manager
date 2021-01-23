function updateNetworth(){
    var totalExpenses = 0


    for (i=0; i<user.expenses.length; i++){
        totalExpenses += parseInt(user.expenses[i].amount)
    }
        
    var codeBlock = 
    '<div>' + 
        '<h2> Balance: </h2>'+
        '<div><h1> R$' + totalExpenses + '</h1></div>'+
        '<h2> Income: </h2>'+
        '<div class = "positive-value"><h1> R$' + totalExpenses + '</h1></div>'+
        '<h2> Expenses: </h2>'+
        '<div class = "negative-value"><h1> R$' + totalExpenses + '</h1></div>'+
        
    '</div>'
        

   
    var newBlock = codeBlock
    $('#balance-data').empty()
    $('#balance-data').append(newBlock)
}

function networthWindow(){
    $('#NMAX').click(function(event){
        var window = document.getElementById("networth")
        if (!UI.networthFullscreen)
        {
            hideModules(window.parentElement)
            window.style.transition = "0.2s ease";
            window.style.height = "98%"
            window.style.width = "98%"
            window.style.top = "50%"
            window.style.left = "50%"
            window.zIndex = "20";
            UI.networthFullscreen = true;
        }
        else{
            window.style.height = ""
            window.style.width = "30%"
            window.style.top = user.UI[2][1]
            window.style.left = user.UI[2][0]
            window.zIndex = "1";
            UI.networthFullscreen = false;
            showModules()
            setTimeout(() => {window.style.transition = "0s";}, 210);
        }
    })
}
