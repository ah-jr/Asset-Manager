var addButton = document.getElementById("addButton")
var chart = document.getElementsByClassName("chart")
var eList = document.getElementsByClassName("expenses-list")
var networth = document.getElementById("networth")
var dashboard = document.getElementById("dashboard")
var page = document.getElementById("page")
var ctx = document.getElementById('myChart');
var cell = document.getElementsByClassName('cell')
var evolution = document.getElementById('evolution')


class UIMode{
    constructor(cF, eF, nF, evF){
        this.chartFullscreen = cF;
        this.expenseFullscreen = eF;
        this.networthFullscreen = nF;
        this.evolutionFullscreen = evF;
    }
}

var UI = new UIMode(false, false, false, false)

var dragging = false

var chartData = []
var chartColor = []
var chartLabels = []
var pieChartValues = [];

var ExpensePieChart = {};

var evolutionData = []
var evolutionLabels =  []

var totalExpenses = 0