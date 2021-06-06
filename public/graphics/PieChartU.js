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
            this.Paint(canvasCursorX, canvasCursorY);
        }
    }

    //==================================================================
    //            Método: UpdateValues
    //         Descrição: Recria o vetor de valores
    //           Criação: 02/06/2021 Airton Junior
    //==================================================================
    
    UpdateValues(values){
        this.values = values;
    }

    //==================================================================
    //            Método: Paint
    //         Descrição: Realiza a pintura do PieChart
    //           Criação: 02/06/2021 Airton Junior
    //==================================================================

    Paint(mouseX = 0, mouseY = 0){
        var ctx = this.canvas.getContext('2d');
        ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
       
        var size = this.values.length;
        var total = 0;

        for (i=0;i<size;i++){
           total = total + parseInt(this.values[i][0]); 
        }

        var minAngle = (2/total)*Math.PI;
    
        ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        var start = 1.5*Math.PI;
        var finish = start;

        var selectedStart  = 1.5*Math.PI;
        var selectedFinish = selectedStart; 
        var selectedIndex  = 0;

        // Desenha todos as seções:
        for (i=0;i<size;i++){
            finish = finish + minAngle*parseInt(this.values[i][0]);
            ctx.fillStyle = this.values[i][1];

            ctx.shadowBlur = 0; 
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.radius, start, finish);
            ctx.lineTo(this.x, this.y);
            ctx.closePath();

            if (ctx.isPointInPath(mouseX, mouseY)){
                selectedStart  = start;
                selectedFinish = finish;
                selectedIndex  = i;   
            }
            ctx.fill();

            start = finish;       
        } 
        // Desenha a seção em hover: 
            
        if (selectedStart != selectedFinish){
            ctx.fillStyle = brighten(this.values[selectedIndex][1], 15);
        
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