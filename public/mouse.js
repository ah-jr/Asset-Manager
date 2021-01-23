addButton.onmouseover = function(){
    addButton.style.width = "3em"
    addButton.style.height = "3em"
}
addButton.onmouseleave = function(){
    addButton.style.width = "2.5em"
    addButton.style.height = "2.5em"

}
addButton.onmousedown = function(){
    addExpensePopUp()
}
addButton.onmouseup = function(){
    addButton.style.left = "50%"
}



chart[0].onmousedown = function(e){
    dragType = 1;
    if(!UI.chartFullscreen){
        chart[0].style.zIndex = "3"
        dragValue = chart[0]
        oldPosition = [dragValue.offsetLeft, dragValue.offsetTop]
        xOffset = dragValue.offsetLeft - e.pageX ;
        yOffset = dragValue.offsetTop - e.pageY ;
        dragging = true;
    }
}

eList[0].onmousedown = function(e){
    dragType = 0;
    if(!UI.expenseFullscreen){
        eList[0].style.zIndex = "3"
        dragValue = eList[0]
        oldPosition = [dragValue.offsetLeft, dragValue.offsetTop]
        xOffset = dragValue.offsetLeft - e.pageX ;
        yOffset = dragValue.offsetTop - e.pageY ;
        dragging = true;
    }
}

networth.onmousedown = function(e){
    dragType = 2;
    if(!UI.networthFullscreen){
        networth.style.zIndex = "3"
        dragValue = networth
        oldPosition = [dragValue.offsetLeft, dragValue.offsetTop]
        xOffset = dragValue.offsetLeft - e.pageX ;
        yOffset = dragValue.offsetTop - e.pageY ;
        dragging = true;
    }
}

evolution.onmousedown = function(e){
    dragType = 3;
    if(!UI.evolutionFullscreen){
        evolution.style.zIndex = "3"
        dragValue = evolution
        oldPosition = [dragValue.offsetLeft, dragValue.offsetTop]
        xOffset = dragValue.offsetLeft - e.pageX ;
        yOffset = dragValue.offsetTop - e.pageY ;
        dragging = true;
    }
}

document.onmousemove = function(e){
    if(dragging){
        dragValue.style.left = (e.pageX + xOffset) + "px";
        dragValue.style.top = (e.pageY + yOffset) + "px";
        dashboard.style.backgroundColor = "rgb(197, 197, 197)"
        page.style.backgroundColor = "rgb(97, 97, 97)"
        for (i = 0; i<cell.length; i++){
            if(Math.abs(cell[i].offsetLeft - dragValue.offsetLeft) < 150 && Math.abs(cell[i].offsetTop - dragValue.offsetTop) < 150)
            {
                cell[i].style.backgroundColor = "#e0f3ff"
            }
            else cell[i].style.backgroundColor = "white"
        }
    }
    else{
        dashboard.style.backgroundColor = "white"
        page.style.backgroundColor = "rgb(221, 221, 221)"
    }
}

document.onmouseup = function(e){
    if(dragging)
    {
        dragValue.style.zIndex = "1"
        dashboard.style.backgroundColor = "white"
        page.style.backgroundColor = "rgb(221, 221, 221)"
        var wWidth = dashboard.offsetWidth
        var wHeight = dashboard.offsetHeight
        var changed = false

        for (i = 0; i<cell.length; i++){
            if(Math.abs(cell[i].offsetLeft - dragValue.offsetLeft) < 150 && Math.abs(cell[i].offsetTop - dragValue.offsetTop) < 150)
            {
                cell[i].style.backgroundColor = "white"
                dragValue.style.left = 100 - (100 * (wWidth - cell[i].offsetLeft) / wWidth) + "%" 
                dragValue.style.top = 100 - (100 * (wHeight - cell[i].offsetTop) / wHeight) + "%" 
                changed = true
            }
        }

        if(!changed){
            dragValue.style.left = oldPosition[0]
            dragValue.style.top = oldPosition[1]
        } 

    
        $.ajax({
            method: 'POST',
            url: "/index",
            data: {
                windowLeft: dragValue.style.left,
                windowTop: dragValue.style.top,
                windowType: dragType,
                ajax: 1
            },
            success: function(status){
                user = status
                expenses = user.expenses
            }
        })
    
        
        dragValue = null
        dragging = false
    }
    else{
        
    }
}