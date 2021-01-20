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