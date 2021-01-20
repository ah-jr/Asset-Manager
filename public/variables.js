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
    constructor(cF, eF, nF, evF, cD, eD, nD, evD){
        this.chartFullscreen = cF;
        this.expenseFullscreen = eF;
        this.networthFullscreen = nF;
        this.evolutionFullscreen = evF;
        this.chartDraggable = cD;
        this.expenseDraggable = eD;
        this.networthDraggable = nD;
        this.evolutionDraggable = evD;
    }
}

var UI = new UIMode(false, false, false, false, true, true, true, true)

var dragging = false

var chartData = []
var chartColor = []
var chartLabels = []

var evolutionData = []
var evolutionLabels =  ["sunday", "monday", "tuesday", "wednesday", "thursday", "friday", "saturday"];

var totalExpenses = 0