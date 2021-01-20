function createBlock(){
    var codeBlock = []
    for (i=0; i<user.cont; i++){
        codeBlock[i] = 
        '<div class = "expense" style="display: table-row;">' + 
            '<div style=" display: table-cell;">' +
                '<form action = "/index" method = "POST">' +
                    '<button type = "submit" name = "remove" class= "removeButton" value = "'+ i + '" ></button>' + 
                '</form>' + 
            '</div>' +
            '<div style="display: table-cell;">' +
                '<h5><b>' + user.expenses[i].title + '&nbsp</b></h5>' +
                '<div class="negative-value"><h4> R$' + user.expenses[i].amount + '</h4></div>' +
            '</div>' +
            '<div style="display: table-cell;">' +
                '<p>&nbsp(' + BRdate(user.expenses[i].date) + ')</p>' +
            '</div>' +
        '</div>'
    }
   
    var newBlock = codeBlock.join('')
    $('#ELcontent').empty()
    $('#ELcontent').append(newBlock)
}


function expenseWindow(){
    $('#ELMAX').click(function(event){
        var window = document.getElementsByClassName("expenses-list")
        if (!UI.expenseFullscreen)
        {
            hideModules(window[0].parentElement)
            window[0].style.transition = "0.2s ease";
            window[0].style.height = "98%"
            window[0].style.width = "98%"
            window[0].style.top = "50%"
            window[0].style.left = "50%"
            window[0].zIndex = "20";
            UI.expenseFullscreen = true;
            UI.expenseDraggable = false;
        }
        else{
            window[0].style.height = ""
            window[0].style.width = "30%"
            window[0].style.top = user.UI[0][1]
            window[0].style.left = user.UI[0][0]
            window[0].zIndex = "1";
            UI.expenseFullscreen = false;
            UI.expenseDraggable = true;
            showModules()
            setTimeout(() => {window[0].style.transition = "0s";}, 210);
        }
    })
}
