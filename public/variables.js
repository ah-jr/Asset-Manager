function initVariables(){
    class UIMode{
        constructor(cF, eF, nF, evF){
            this.chartFullscreen = cF;
            this.expenseFullscreen = eF;
            this.networthFullscreen = nF;
            this.evolutionFullscreen = evF;
        }
    }
    UI = new UIMode(false, false, false, false)

    // Elementos DOM globais
    dashboard = document.getElementById("dashboard");
    page      = document.getElementById("page");
    cells     = document.getElementsByClassName('cell');
  
    // Variáves de interação com o mouse
    dragType = null;
    dragValue = {};
    dragging = false;
    oldPosition = [];
    xOffset = 0;
    yOffset = 0;
    draggin = false;

    // Variáveis de interesse global: (talvez façam parte de um Manager no futuro)
    totalExpenses = 0;

    // Módulos
    ExpenseRatios = {};
    Evolution     = {};
    ExpenseList   = {};
    Networth      = {};

    // Menus
    ExpenseMenu = {};
};