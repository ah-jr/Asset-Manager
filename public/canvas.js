//======================================================================
//              Nome: PieChart
//      Versão Atual: 1.0
//         Descrição: Implementação do gráfico estilo "pizza"
//           Criação: 02/06/2021 Airton Junior
//======================================================================

class PieChart{
    constructor(element, x, y, radius, values){
        this.canvas = document.getElementById(element);
        this.x = x;
        this.y = y;
        this.radius = radius;
        this.values = values;
        this.canvas.addEventListener('click', ClickEvent.bind(this), false);

        function ClickEvent(e){
            var canvasCursorX = e.pageX - $('#' + element).offset().left;
            var canvasCursorY = e.pageY - $('#' + element).offset().top;
            this.Paint(3, canvasCursorX, canvasCursorY);
        }
    }
    
    //==================================================================
    //            Método: Paint
    //         Descrição: Realiza a pintura do PieChart
    //           Criação: 02/06/2021 Airton Junior
    //==================================================================

    Paint(count, mouseX = 0, mouseY = 0){
        var ctx = this.canvas.getContext('2d');
        ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        
        var angle = (2/count)*Math.PI;
        var start = 0;
        var finish = angle;
    
        var selectedStart  = 0;
        var selectedFinish = 0; 

        var red, green, blue;
    
        // Desenha todos as seções:
        for (i=0;i<count;i++){
            red   = Math.floor(Math.random() * 255);
            green = Math.floor(Math.random() * 255);
            blue  = Math.floor(Math.random() * 255);
    
            ctx.fillStyle = 'rgb(' + red + ', ' + green + ', ' + blue + ')';
    
            ctx.shadowBlur = 0; 
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.radius, start, finish);
            ctx.lineTo(this.x, this.y);
            ctx.closePath();
    
            if (ctx.isPointInPath(mouseX, mouseY)){
                selectedStart  = start;
                selectedFinish = finish;   
            }
            
            ctx.fill();
    
            start  = finish;
            finish = finish + angle;        
        } 
        // Desenha a seção em hover: 
        if (selectedStart != selectedFinish)
        {
            red   = Math.floor(Math.random() * 255);
            green = Math.floor(Math.random() * 255);
            blue  = Math.floor(Math.random() * 255);
    
            ctx.fillStyle = 'rgb(' + red + ', ' + green + ', ' + blue + ')';
        
            ctx.shadowColor = 'black';
            ctx.shadowBlur = 10;   
    
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.radius, selectedStart, selectedFinish);
            ctx.lineTo(this.x, this.y);
            ctx.closePath();
            ctx.fill();    
        }
    }
}