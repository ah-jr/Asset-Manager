class ExpenseRatioModule{
    constructor(name, title){
        this.name = name;
        this.title = title;
        this.canvasID = 'expense-ratio-canvas';
        this.DOM = this.createDOM();
        this.setMouseDown();
        this.setStyle();
        this.setMaximize();
        this.pieChart = new PieChart(this.canvasID, 150, 150, 100, []);
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
                dragValue = this.DOM;
                oldPosition = [dragValue.offsetLeft, dragValue.offsetTop];
                xOffset = dragValue.offsetLeft - e.pageX ;
                yOffset = dragValue.offsetTop - e.pageY ;
                dragging = true;
            }
        }.bind(this);
    }
    setStyle(){
        this.DOM.style.zIndex          = '2';
        this.DOM.style.textAlign       = 'center';
        this.DOM.style.backgroundColor = '#eaeaea';
        this.DOM.style.width           = '30%';
        this.DOM.style.height          = '40%';
        this.DOM.style.position        = 'absolute';
        this.DOM.style.top             = '0%';
        this.DOM.style.left            = '0%';
        this.DOM.style.border          = '1px solid';
        this.DOM.style.borderColor     = '#81818138';
        this.DOM.style.borderRadius    = '8px';
        this.DOM.style.boxShadow       = '0 0 10px gray';
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
}