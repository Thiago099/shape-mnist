
function projectPoint(x,y,ctx)
{
    const matrix = ctx.getTransform();
    return {
        x: matrix.a * x + matrix.c * y + matrix.e,
        y: matrix.b * x + matrix.d * y + matrix.f,
    };
}

function drawRotated(x,y,width,height, angle,ctx,callback)
{
    angle = angle * Math.PI / 180
    const newWidth = Math.abs(width * Math.cos(angle)) + Math.abs(height * Math.sin(angle));
    const newHeight = Math.abs(width * Math.sin(angle)) + Math.abs(height * Math.cos(angle));
    var surface = document.createElement('canvas')
    var sctx = surface.getContext('2d')
    surface.width = newWidth
    surface.height = newHeight
    sctx.translate(newWidth/2,newHeight/2)
    sctx.rotate(angle)
    sctx.translate(-width/2,-height/2)
    const centerX =x-newWidth/2;
    const centerY = y-newHeight/2;
    callback(sctx,centerX,centerY)
    ctx.drawImage(surface,centerX,centerY)
}

export function drawPolygon(x,y,w,h,angle,sides,color,ctx)
{
    const points = []
    drawRotated(x,y,w,h,angle,ctx,(ctx,centerX,centerY) =>{
        var numberOfSides = sides,
        Xcenter = w/2,
        Ycenter = h/2;


        ctx.beginPath();
        const x0 = Xcenter +  Xcenter * Math.cos(0)
        const y0 = Ycenter +  Ycenter *  Math.sin(0)
        ctx.moveTo(x0, y0);          

        for (var i = 1; i <= numberOfSides;i += 1) {
            const xi = Xcenter + Xcenter * Math.cos(i * 2 * Math.PI / numberOfSides)
            const yi = Ycenter + Ycenter * Math.sin(i * 2 * Math.PI / numberOfSides)
            var {x:xout,y:yout} = projectPoint(xi,yi,ctx);
            points.push({x:xout+centerX,y:yout+centerY})
            ctx.lineTo(xi, yi);
        }
        ctx.fillStyle = color;
        ctx.fill();
    })
    return {points,color}
}