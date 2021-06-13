class ExpenseRatioModule{
    constructor(name, title){
        this.name = name;
        this.title = title;
        this.canvasID = 'expense-ratio-canvas';
        this.cellID = '005-cell';
        this.DOM = this.createDOM();
        this.setMouseDown();
        this.setStyle();
        this.setMaximize();

        this.canvasElement = document.getElementById(this.canvasID);
        this.pieChart = new PieChart(this.canvasID, 
                                     $(this.canvasElement).width()/2, 
                                     $(this.canvasElement).height()/2, 
                                     Math.min($(this.canvasElement).height(), $(this.canvasElement).width())/2 - 10, 
                                     []);
        this.resize();
    }
    createDOM(){
        var content = `<canvas id="` + this.canvasID + `" width="400" height="400"></canvas>`;
        var header  = `<button class = "maximize" id = "CMAX">MAX</button>`;
        var DOM_modularStructure = createModuleDOM(this.name, this.title, header, content);

        $('#dashboard').append(DOM_modularStructure);
        return document.getElementById(this.name);
    }
    setMouseDown(){
        this.DOM.onmousedown = function(e){
            dragType = EXPENSE_RATIO_TYPE;
            if(!UI.chartFullscreen){
                this.DOM.style.zIndex = "3";
                dragValue = this;
                oldPosition = [dragValue.DOM.offsetLeft, dragValue.DOM.offsetTop];
                xOffset = dragValue.DOM.offsetLeft - e.pageX ;
                yOffset = dragValue.DOM.offsetTop - e.pageY ;
                dragging = true;
            }
        }.bind(this);
    }
    setStyle(){
        this.DOM.style.zIndex          = '2';
        this.DOM.style.backgroundColor = '#f2f2f2';
        this.DOM.style.position        = 'absolute';
        this.DOM.style.border          = '1px solid';
        this.DOM.style.borderColor     = '#f2f2f2';
        this.DOM.style.borderRadius    = '3px';
        this.DOM.style.boxShadow       = '0 0 4px #b0b0b0';
        this.DOM.style.transform       = 'translate(-50%, -50%)';
    }
    setMaximize(){
        $('#CMAX').click(function(event){
            if (!UI.chartFullscreen)
            {
                hideModules(this.DOM.parentElement)
                this.DOM.style.transition = "0.2s ease";
                this.DOM.style.height     = "98%"
                this.DOM.style.width      = "98%"
                this.DOM.style.top        = "50%"
                this.DOM.style.left       = "50%"
                this.DOM.zIndex           = "20";
                UI.chartFullscreen        = true;
            }
            else{
                showModules()
                this.DOM.style.height = "40%"
                this.DOM.style.width  = "30%"
                this.DOM.style.top    = user.UI[1][1]
                this.DOM.style.left   = user.UI[1][0]
                this.DOM.zIndex       = "1";
                UI.chartFullscreen    = false;
                setTimeout(() => {this.DOM.style.transition = "0s";}, 210);
            }
        }.bind(this))
    }
    resize(){
        this.DOM.style.height = $("#"+this.cellID).height();
        this.DOM.style.width  = $("#"+this.cellID).width();
        this.DOM.style.left   = $("#"+this.cellID).position().left + $("#"+this.cellID).width()  * 0.5;
        this.DOM.style.top    = $("#"+this.cellID).position().top  + $("#"+this.cellID).height() * 0.5

        this.canvasElement.width = $("#" + this.name + "-content").width();
        this.canvasElement.height = $("#" + this.name + "-content").height();
        this.pieChart.resize(this.canvasElement.width/2, 
                             this.canvasElement.height/2, 
                             Math.min(this.canvasElement.height, this.canvasElement.width)/2 - 10);
    }
}