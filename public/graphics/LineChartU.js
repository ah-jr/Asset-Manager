//======================================================================
//              Nome: LineChart
//      Versão Atual: 1.0
//         Descrição: Implementação do gráfico de linhas
//           Criação: 03/06/2021 Airton Junior
//======================================================================

class LineChart{
    constructor(element, height, width, values){
        this.canvas    = document.getElementById(element);
        this.values    = values;
        this.paintMode = STRAIGHT;
        this.resize(height, width);
    }

    resize(height, width, border = 20){
        this.height    = height;
        this.width     = width;

        this.drawRect = {top    : border, 
            bottom : this.height - border, 
            left   : border,
            right  : this.width - border,
            height : this.height - 2*border,
            width  : this.width - 2*border }
    }

    //==================================================================
    //            Método: UpdateValues
    //         Descrição: Recria o vetor de valores
    //           Criação: 03/06/2021 Airton Junior
    //==================================================================
    
    updateValues(values){
        this.values = values;
    }

    //==================================================================
    //            Método: Paint
    //         Descrição: Realiza a pintura
    //           Criação: 03/06/2021 Airton Junior
    //==================================================================

    paint(){
        var ctx = this.canvas.getContext('2d');
        ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        var size = this.values.length;
        var max = Number.MIN_VALUE;
        var min = Number.MAX_VALUE;

        for(var i=0;i<size;i++){
            max = Math.max(this.values[i][0], max);
            min = Math.min(this.values[i][0], min);
        }
        var amplitude = (max - min);

        if (amplitude != 0){
            var ratio = this.drawRect.height/amplitude;
            var values = this.values.map(x => (this.drawRect.bottom - (x[0] - min) * ratio));
        }
        else var values = this.values.map(x => (this.height/2));

        if (size > 1){
            var step = this.drawRect.width/(size-1);
            ctx.strokeStyle = '#00CFFF';
            ctx.lineWidth = 3;

            switch(this.paintMode){
                case STRAIGHT: {
                    var point = [this.drawRect.left, values[0]];
                    ctx.beginPath();
                    ctx.moveTo(point[0], point[1]);

                    for (i=0;i<size-1;i++){
                        point = [point[0] + step, values[i+1]]; 
                        ctx.lineTo(point[0], point[1]);
                    }
                    ctx.closePath;
                    ctx.stroke();
                    break;
                }
                case INTERPOLATED: {
                    var points = [];
                    points.push(this.drawRect.left);
                    points.push(values[0])
    
                    for (i=0;i<size-1;i++){
                        points.push(points[2*i] + step);
                        points.push(values[i+1]);
                    }
                    drawCurve(ctx, points);
                    break;
                }
            }
        }
    }
}
