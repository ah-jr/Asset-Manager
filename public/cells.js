function generateCells(width, height){
    var codeBlock = [];

    dashboardHeight = $(dashboard).height();
    dashboardWidth  = $(dashboard).width();
    
    cellCount  = 0;
    cellHeight = dashboardHeight / height;
    cellWidth  = dashboardWidth / width; 

    var cellLeft, cellTop;
    
    for (var i=0; i<height * width; i++){
        cellLeft = cellWidth  * (i  % (width))        + 0.5*cellWidth;
        cellTop  = cellHeight * Math.floor(i / width) + 0.5*cellHeight;
        
        codeBlock[i] =
        `<div class="cell" id="`+ cellCount.toString().padStart(3, "0") +`-cell" style="width: `+cellWidth+`; height: `+cellHeight+`; left: `+cellLeft+`; top: `+cellTop+`;"></div>`;
        cellCount += 1;
    }
        
    var newBlock = codeBlock.join('');
    $(cellsDiv).empty();
    $(cellsDiv).append(newBlock);
}
