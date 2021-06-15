function initMouse(){
    document.onmousemove = function(e){
        if(dragging){
            showCells();
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
            var targetValue;

            for (i = 0; i<cells.length; i++){
                if(Math.abs(cells[i].offsetLeft - dragValue.DOM.offsetLeft) < cellWidth/2 && 
                   Math.abs(cells[i].offsetTop - dragValue.DOM.offsetTop) < cellHeight/2)
                {
                    cells[i].style.backgroundColor = "white";

                    targetValue = getModuleObjectByCellID(cells[i].id);
                    if (targetValue != null) targetValue.cellID = dragValue.cellID;
                    
                    dragValue.cellID = cells[i].id;
                }
            }
            if (targetValue != null) targetValue.resize();
            dragValue.resize();

            $.ajax({
                method: 'POST',
                url: "/index",
                data: {
                    type : REQ_UI_MOVE_WINDOW,
                    windowCell: parseInt(dragValue.cellID.substring(0, 3)),
                    windowType: dragValue.type,
                    ajax: 1
                },
                success: function(status){
                    user = status
                }
            }) 

            if (targetValue != null){
                $.ajax({
                    method: 'POST',
                    url: "/index",
                    data: {
                        type : REQ_UI_MOVE_WINDOW,
                        windowCell: parseInt(targetValue.cellID.substring(0, 3)),
                        windowType: targetValue.type,
                        ajax: 1
                    },
                    success: function(status){
                        user = status
                    }
                })   
            }
              
            dragValue = null;
            dragging = false;
            hideCells();
        }
        else{
            
        }
    }
}
