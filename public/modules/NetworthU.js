class NetworthModule{
    constructor(name, title){
        this.name = name;
        this.title = title;
        this.canvasID = 'expense-ratio-canvas';
        this.DOM = this.createDOM();
        this.setMouseDown();
        this.setStyle();
        this.setMaximize();
    }
    createDOM(){
        var content = `<div id="balance-data"></div>`;
        var header  = `<button class = "maximize" id = "NMAX">MAX</button>`;
        var DOM_modularStructure = createModuleDOM(this.name, this.title, header, content);

        $('#dashboard').append(DOM_modularStructure);
        return document.getElementById(this.name);
    }
    setMouseDown(){
        this.DOM.onmousedown = function(e){
            dragType = NETWORTH_TYPE;
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
        this.DOM.style.backgroundColor = '#eaeaea';
        this.DOM.style.width           = '30%';
        this.DOM.style.height          = '40%';
        this.DOM.style.position        = 'absolute';
        this.DOM.style.border          = '1px solid';
        this.DOM.style.borderColor     = '#81818138';
        this.DOM.style.borderRadius    = '8px';
        this.DOM.style.boxShadow       = '0 0 10px gray';
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
    
        for (var i=0; i<user.expenses.length; i++){
            totalExpenses += parseInt(user.expenses[i].amount)
        }
            
        var codeBlock = 
        '<div>' + 
            '<h2> Balance: </h2>'+
            '<div><h1> R$' + totalExpenses + '</h1></div>'+
            '<h2> Income: </h2>'+
            '<div class = "positive-value"><h1> R$' + totalExpenses + '</h1></div>'+
            '<h2> Expenses: </h2>'+
            '<div class = "negative-value"><h1> R$' + totalExpenses + '</h1></div>'+
            
        '</div>'
           
        $('#balance-data').empty();
        $('#balance-data').append(codeBlock);
    }
}