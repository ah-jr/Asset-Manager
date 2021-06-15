class NetworthModule{
    constructor(name, title){
        this.name = name;
        this.title = title;
        this.type = NETWORTH_TYPE;
        this.canvasID = 'expense-ratio-canvas';
        this.cellID = '004-cell';
        this.DOM = this.createDOM();
        this.setMouseDown();
        this.setStyle();
        this.setMaximize();
        this.resize();
    }
    createDOM(){
        var content = `<div id="balance-data" style = "height : 100%;"></div>`;
        var header  = `<button class = "maximize" id = "NMAX">MAX</button>`;
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
        this.DOM.style.zIndex          = '2';
        this.DOM.style.backgroundColor = '#f2f2f2';
        this.DOM.style.position        = 'absolute';
        this.DOM.style.border          = '1px solid';
        this.DOM.style.borderColor     = '#c2c2c2';
        this.DOM.style.borderRadius    = '8px';
        //this.DOM.style.boxShadow       = '0 0 4px #b0b0b0';
        this.DOM.style.transform       = 'translate(-50%, -50%)';
    }
    setMaximize(){
        $('#NMAX').click(function(event){
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
                this.DOM.style.height = "40%"
                this.DOM.style.width  = "30%"
                this.DOM.style.top    = user.UI[2][1]
                this.DOM.style.left   = user.UI[2][0]
                this.DOM.zIndex       = "1";
                UI.chartFullscreen    = false;
                showModules();
                setTimeout(() => {this.DOM.style.transition = "0s";}, 210);
            }
        }.bind(this))
    }
    updateNetworth(){
        totalExpenses = 0;
        totalIncome   = 0;
    
        for (var i=0; i<user.expenseCount; i++){
            totalExpenses += parseInt(user.expenses[i].amount)
        }

        for (var i=0; i<user.incomeCount; i++){
            totalIncome += parseInt(user.incomes[i].amount)
        }
            
        var codeBlock = 
            '<h2> Balance: </h2>'+
            '<div><h1><b> R$' + (totalIncome - totalExpenses) + '</b></h1></div>'+
            '<h2> Income: </h2>'+
            '<div class = "positive-value"><h1><b> R$' + totalIncome + '</b></h1></div>'+
            '<h2> Expenses: </h2>'+
            '<div class = "negative-value"><h1><b> R$' + totalExpenses + '</b></h1></div>';
                       
        $('#balance-data').empty();
        $('#balance-data').append(codeBlock);
    }
    resize(animate = true){
        if(animate) this.DOM.style.transition = '0.2s ease';

        this.DOM.style.height = $("#"+this.cellID).height();
        this.DOM.style.width  = $("#"+this.cellID).width();
        this.DOM.style.left   = $("#"+this.cellID).position().left + $("#"+this.cellID).width()  * 0.5;
        this.DOM.style.top    = $("#"+this.cellID).position().top  + $("#"+this.cellID).height() * 0.5;

        if(animate) setTimeout(() => {this.DOM.style.transition = "0s"}, 210);
    }
}