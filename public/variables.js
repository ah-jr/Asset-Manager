function initVariables(){
    class UIMode{
        constructor(cF, eF, nF, evF){
            this.chartFullscreen     = cF;
            this.expenseFullscreen   = eF;
            this.networthFullscreen  = nF;
            this.evolutionFullscreen = evF;
        }
    }
    UI = new UIMode(false, false, false, false)

    // Elementos DOM globais
    dashboard  = document.getElementById("dashboard");
    page       = document.getElementById("page");
    cells      = document.getElementsByClassName('cell');
    cellsDiv   = document.getElementById('cells');
  
    // Variáves de interação com o mouse
    dragType    = null;
    dragValue   = {};
    dragging    = false;
    oldPosition = [];
    xOffset     = 0;
    yOffset     = 0;
    draggin     = false;

    // Variáveis de interesse global: (talvez façam parte de um Manager no futuro)
    totalExpenses = 0;
    totalIncome   = 0;

    // Variáveis referentes à Grid
    dashboardHeight = 0;
    dashboardWidth  = 0;
    cellHeight      = 0;
    cellWidth       = 0;   
    cellNumX        = user.cellNum[0];    
    cellNumY        = user.cellNum[1];    
    cellCount       = 0;

    // Módulos
    ExpenseRatios = {};
    IncomeRatios  = {};
    Evolution     = {};
    ExpenseList   = {};
    IncomeList    = {};
    Networth      = {};

    // Menus
    ExpenseMenu = {};
};