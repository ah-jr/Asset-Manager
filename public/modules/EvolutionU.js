class EvolutionModule{
    constructor(name, title){
        this.name = name;
        this.title = title;
        this.type = EVOLUTION_TYPE;
        this.canvasID = 'evolution-canvas';
        this.cellID = '001-cell';
        this.DOM = this.createDOM();  
        this.setMouseDown();
        this.setStyle();
        this.setMaximize();
        this.setRenderSwitch();

        this.canvasElement = document.getElementById(this.canvasID);

        this.lineChart = new LineChart(this.canvasID, $(this.canvasElement).height(), $(this.canvasElement).width(), []);
        this.resize();
    }
    createDOM(){
        var content = `<canvas id="` + this.canvasID + `"></canvas>`;
        var header  = `<button class = "maximize" id = "EVMAX">MAX</button>
                       <button id = "switchChartRendering">Linha/Curva</button>`;
        var DOM_modularStructure = createModuleDOM(this.name, this.title, header, content);

        $('#dashboard').append(DOM_modularStructure);
        return document.getElementById(this.name);
    }
    setMouseDown(){
        this.DOM.onmousedown = function(e){
            if(!UI.chartFullscreen){
                this.DOM.style.zIndex = "3";
                dragValue = this;
                xOffset = dragValue.DOM.offsetLeft - e.pageX ;
                yOffset = dragValue.DOM.offsetTop - e.pageY ;
                dragging = true;
            }
        }.bind(this);
    }
    setStyle(){
        this.DOM.style.zIndex = '2';
        this.DOM.style.backgroundColor = 'f2f2f2';
        this.DOM.style.position = 'absolute';
        this.DOM.style.border = '1px solid';
        this.DOM.style.borderColor = '#c2c2c2';
        this.DOM.style.borderRadius = '8px';
        //this.DOM.style.boxShadow = '0 0 10px gray';
        this.DOM.style.transform = 'translate(-50%, -50%)';
    }
    setMaximize(){
        $('#EVMAX').click(function(event){
            if (!UI.chartFullscreen)
            {
                hideModules(this.DOM.parentElement)
                this.DOM.style.transition = "0.2s ease";
                this.DOM.style.height = "98%"
                this.DOM.style.width = "98%"
                this.DOM.style.top = "50%"
                this.DOM.style.left = "50%"
                this.DOM.zIndex = "20";
                UI.chartFullscreen = true;
            }
            else{
                showModules()
                this.DOM.style.height = "40%"
                this.DOM.style.width = "30%"
                this.DOM.style.top = user.UI[3][1]
                this.DOM.style.left = user.UI[3][0]
                this.DOM.zIndex = "1";
                UI.chartFullscreen = false;
                setTimeout(() => {this.DOM.style.transition = "0s";}, 210);
            }
        }.bind(this))
    }
    setRenderSwitch(){
        $('#switchChartRendering').click(function(event){
            switch(this.lineChart.paintMode){
                case STRAIGHT: 
                    this.currentPaintMode = INTERPOLATED;
                    break;
                case INTERPOLATED: 
                    this.currentPaintMode = STRAIGHT;
                    break
            }
            this.lineChart.Paint();
        }.bind(this));
    }
    resize(animate = true){
        if(animate) this.DOM.style.transition = '0.2s ease';

        this.DOM.style.height = $("#"+this.cellID).height();
        this.DOM.style.width  = $("#"+this.cellID).width();
        this.DOM.style.left   = $("#"+this.cellID).position().left + $("#"+this.cellID).width()  * 0.5;
        this.DOM.style.top    = $("#"+this.cellID).position().top  + $("#"+this.cellID).height() * 0.5;
        
        this.canvasElement.width = $("#" + this.name + "-content").width();
        this.canvasElement.height = $("#" + this.name + "-content").height();
        this.lineChart.resize(this.canvasElement.height, this.canvasElement.width);
        this.lineChart.paint(); 

        if(animate) setTimeout(() => {this.DOM.style.transition = "0s"}, 210);
    }
}