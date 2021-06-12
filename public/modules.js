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
    <div id="` + name + `">
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
    </div>`;
}