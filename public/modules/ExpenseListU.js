class ExpenseListModule{
    constructor(name, title){
        this.name = name;
        this.title = title;
        this.canvasID = 'expense-list-canvas';
        this.DOM = this.createDOM();
        this.setMouseDown();
        this.setStyle();
        this.setMaximize();
    }
    createDOM(){
        var content = ``;
        var header  = `<button class = "maximize" id = "ELMAX">MAX</button>`;
        var DOM_modularStructure = createModuleDOM(this.name, this.title, header, content);

        $('#dashboard').append(DOM_modularStructure);
        return document.getElementById(this.name);
    }
    setMouseDown(){
        this.DOM.onmousedown = function(e){
            dragType = EXPENSE_LIST_TYPE;
            if(!UI.chartFullscreen){
                this.DOM.style.zIndex = "3";
                dragValue   = this.DOM;
                oldPosition = [dragValue.offsetLeft, dragValue.offsetTop];
                xOffset     = dragValue.offsetLeft - e.pageX ;
                yOffset     = dragValue.offsetTop - e.pageY ;
                dragging    = true;
            }
        }.bind(this);
    }
    setStyle(){
        this.DOM.style.overflowY       = 'auto';
        this.DOM.style.zIndex          = '2';
        this.DOM.style.backgroundColor = '#f2f2f2';
        this.DOM.style.width           = '30%';
        this.DOM.style.height          = '40%';
        this.DOM.style.position        = 'absolute';
        this.DOM.style.border          = '1px solid';
        this.DOM.style.borderColor     = '#f2f2f2';
        this.DOM.style.borderRadius    = '3px';
        this.DOM.style.boxShadow       = '0 0 4px #b0b0b0';
        this.DOM.style.transform       = 'translate(-50%, -50%)'; 
    }
    setMaximize(){
        $('#ELMAX').click(function(event){
            if (!UI.chartFullscreen)
            {
                hideModules(this.DOM.parentElement);
                this.DOM.style.transition = "0.2s ease";
                this.DOM.style.height     = "98%";
                this.DOM.style.width      = "98%";
                this.DOM.style.top        = "50%";
                this.DOM.style.left       = "50%";
                this.DOM.zIndex           = "20";
                UI.chartFullscreen        = true;
            }
            else{
                this.DOM.style.height     = "40%";
                this.DOM.style.width      = "30%";
                this.DOM.style.top        = user.UI[0][1];
                this.DOM.style.left       = user.UI[0][0];
                this.DOM.zIndex           = "1";
                UI.chartFullscreen        = false;
                showModules();
                setTimeout(() => {this.DOM.style.transition = "0s";}, 210);
            }
        }.bind(this));
    }
    updateList(){
        var codeBlock = [];
        for (var i=0; i<user.expenseCount; i++){
            codeBlock[i] = 
            '<div class = "expense" style="display: table-row;">' + 
                '<div style=" display: table-cell;">' +
                    '<form action = "/index" method = "POST">' +
                        '<button type = "submit" name = "remove" class= "removeButton" value = "' + i + '" ></button>' + 
                        '<input type = "hidden" name = "type" value = "' + REQ_REMOVE_EXPENSE + '" />' +
                    '</form>' + 
                '</div>' +
                '<div style="display: table-cell;">' +
                    '<h5><b>' + user.expenses[i].title + '&nbsp</b></h5>' +
                    '<div class="negative-value"><h4> R$' + user.expenses[i].amount + '</h4></div>' +
                '</div>' +
                '<div style="display: table-cell;">' +
                    '<p>&nbsp(' + BRdate(user.expenses[i].date) + ')</p>' +
                '</div>' +
            '</div>';
        }
        var newBlock = codeBlock.join('');
        $('#' + this.name + '-content').empty();
        $('#' + this.name + '-content').append(newBlock);
    }
}