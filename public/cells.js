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

function hideCells(){
    cells = document.getElementsByClassName('cell');
    for(var i = 0; i < cells.length; i++){
        cells[i].style.display = "none";
    }
}

function showCells(){
    cells = document.getElementsByClassName('cell');
    for(var i = 0; i < cells.length; i++){
        cells[i].style.display = "block";
    }
}

function isCellOccupied(ID){
    if (ID >= cellNumX*cellNumY || ID < 0) return 1;

    cellID = ID.toString().padStart(3, "0") + '-cell';
    for (var i = 0; i<moduleList.length; i++){
        if (moduleList[i].cellID === cellID) return 1;
    }   
    return 0;
}

function isThereCellToTheRight(ID){
    if ((ID+1)%cellNumX == 0) return false;
    else return true; 
}

function isThereCellToTheLeft(ID){
    if (ID%cellNumX == 0) return false;
    else return true; 
}