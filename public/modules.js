function hideModules(module){
    var modules = document.getElementsByClassName("module")
    for(i = 0; i<modules.length; i+=1)
    {
        if (modules[i] !== module) modules[i].style.display = "none";
    }
}

function showModules(){
    var modules = document.getElementsByClassName("module")
    for(i = 0; i<modules.length; i+=1)
    {
        modules[i].style.display = "block";
    }
}

function createModuleDOM (name, title, header, content){
    return  `
    <div class="module" id="` + name + `">
        <div class="module-container">
            <!-- Header -->
            <div id="`+ name +`-header">
                ` + header + `
            </div>   
            <!-- Title -->
            <div class="module-title">
                <h2><b>` + title + `</b></h2>
            </div>
            <!-- Content -->
            <div id="`+ name +`-content" style = "height: calc(100% - 100px);">
                ` + content + `
            </div>
        </div>
    </div>`;
}

function getModuleObjectByCellID(cellID){
    for (var i = 0; i<moduleList.length; i++){
        if (moduleList[i].cellID === cellID) return moduleList[i];
    }   
    return null;
}

function createModuleList(){
    moduleList = [ExpenseRatios,
                  IncomeRatios, 
                  Evolution, 
                  ExpenseList,
                  IncomeList,
                  Networth];
}