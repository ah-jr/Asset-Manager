function addExpensePopUp() {
    var x = document.getElementById("addExpense");
    if (x.style.display === "none") {
        x.style.display = "block";
    } else {
        x.style.display = "none";
    }
} 

function BRdate(data){
    var split = data.split('-');
    data_formatada = split[2] + "/" + split[1] + "/" + split[0];
    return data_formatada;
}

function rand(max) {
    return Math.random() * max;
}