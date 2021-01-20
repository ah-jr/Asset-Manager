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