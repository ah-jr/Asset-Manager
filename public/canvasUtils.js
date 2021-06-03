function brighten(color, amount){
    var red   = Math.min(parseInt(color.substring(1, 3), 16) + amount, 255).toString(16);   
    var green = Math.min(parseInt(color.substring(3, 5), 16) + amount, 255).toString(16);   
    var blue  = Math.min(parseInt(color.substring(5, 7), 16) + amount, 255).toString(16);   
    return '#' + red + green + blue;
}