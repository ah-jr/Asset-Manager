function initMouse(){
    document.onmousemove = function(e){
        if(dragging){
            dragValue.DOM.style.left = (e.pageX + xOffset) + "px";
            dragValue.DOM.style.top = (e.pageY + yOffset) + "px";
            dashboard.style.backgroundColor = "rgb(197, 197, 197)"
            page.style.backgroundColor = "rgb(97, 97, 97)"
            for (i = 0; i<cells.length; i++){
                if(Math.abs(cells[i].offsetLeft - dragValue.DOM.offsetLeft) < cellWidth/2 && 
                   Math.abs(cells[i].offsetTop - dragValue.DOM.offsetTop) < cellHeight/2)
                {
                    cells[i].style.backgroundColor = "#e0f3ff"
                }
                else cells[i].style.backgroundColor = "white"
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
            dragValue.DOM.style.zIndex = "1"
            dashboard.style.backgroundColor = "white"
            page.style.backgroundColor = "rgb(221, 221, 221)"
            var wWidth = dashboard.offsetWidth
            var wHeight = dashboard.offsetHeight
            var changed = false

            for (i = 0; i<cells.length; i++){
                if(Math.abs(cells[i].offsetLeft - dragValue.DOM.offsetLeft) < cellWidth/2 && 
                   Math.abs(cells[i].offsetTop - dragValue.DOM.offsetTop) < cellHeight/2)
                {
                    cells[i].style.backgroundColor = "white"
                    dragValue.DOM.style.left = 100 - (100 * (wWidth - cells[i].offsetLeft) / wWidth) + "%" 
                    dragValue.DOM.style.top = 100 - (100 * (wHeight - cells[i].offsetTop) / wHeight) + "%" 
                    dragValue.cellID = cells[i].id;
                    changed = true
                }
            }

            if(!changed){
                dragValue.DOM.style.left = oldPosition[0]
                dragValue.DOM.style.top = oldPosition[1]
            } 

            $.ajax({
                method: 'POST',
                url: "/index",
                data: {
                    type : REQ_UI_MOVE_WINDOW,
                    windowCell: parseInt(dragValue.cellID.substring(0, 3)),
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
}
