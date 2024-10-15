function createChart(...intervals)
{
    var canvas = document.createElement("canvas");
    canvas.width = 600;
    canvas.height = 600;
    var ctx = canvas.getContext("2d");
    var w = canvas.width/2;
    var year = new Date(intervals[0][0]).getFullYear();
    ctx.textAlign = "center";
    ctx.font = "14pt Arial";
    ctx.fillText(year,w,w);
    ctx.font = "8pt Arial";
    var months = ["Январь","Февраль","Март","Апрель","Май","Июнь","Июль","Август","Сентябрь","Октябрь","Ноябрь","Декабрь"];
    for(let i=0; i<12; i++)
    {
        ctx.beginPath();
        ctx.lineWidth = 20;
        let angle = dateToAngle(`${year}-${i+1}-01`, year);
        let textAngle = - angle - Math.PI/2 - Math.PI/12;
        ctx.fillText(months[i], w*(1 - 0.6*Math.sin(textAngle)), w*(1 - 0.6*Math.cos(textAngle)));
        ctx.arc(w, w, 0.8*w - ctx.lineWidth, angle, angle + Math.PI/300);
        ctx.stroke();
    }

    ctx.strokeStyle = "grey";
    ctx.lineWidth = 15;
    ctx.beginPath();
    ctx.arc(w, w, 0.8*w - ctx.lineWidth, 0, 2*Math.PI);
    ctx.stroke();

    for(let interval of intervals)
    {
        let angle1 = dateToAngle(interval[0],year);
        let angle2 = dateToAngle(interval[1],year)
        ctx.strokeStyle = "green";
        ctx.beginPath();
        ctx.arc(w, w, 0.8*w - ctx.lineWidth, angle1, angle2);
        ctx.stroke();

        let textAngle = 3*Math.PI/2 - (angle1+angle2)/2;
        ctx.font = "bold 10pt Arial";
        ctx.fillStyle = "green";
        
        ctx.fillText(interval[2], w*(1 - 0.9*Math.sin(textAngle)), w*(1 - 0.9*Math.cos(textAngle)));

    }

     
    function dateToAngle(str, year)
    {
        var date = new Date(str);

        var yearStart = new Date(0);
        yearStart.setFullYear(year);

        var yearEnd = new Date(0);
        yearEnd.setFullYear(year + 1);

        var fraction = (date - yearStart) / (yearEnd - yearStart);

        return 2*Math.PI*fraction + Math.PI/2;
    }

    return canvas;
}
    
