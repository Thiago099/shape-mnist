import './style.css'
import { drawPolygon } from './utils/draw.js'
import { canvas2Blob } from './utils/canvas2blob';

import JSZip from 'jszip';
import FileSaver from 'file-saver';



// drawPolygon(14,14,20,20,45,6,'#f0f')
// drawRectangle(14,14,10,10,7,'#000')
// drawEllipse(14,14,10,10,45,'#00f')

// random background color
const canvas = document.getElementById('out')
var size = 28
canvas.width = size
canvas.height = size
const ctx = canvas.getContext('2d')
const randomizeButton = document.getElementById('randomize-button')
const metadata = document.getElementById('metadata')
randomizeButton.addEventListener('click', generateExample)

const dimensions = document.getElementById('dimensions')

dimensions.addEventListener('change', ()=>{
    size = dimensions.value
    canvas.width = size
    canvas.height = size
    generateExample()
})
generateExample()

function generateExample()
{
    const shapeMetadata = randomize(ctx)
    metadata.innerHTML = JSON.stringify(shapeMetadata, null, 2).replace(/\n/g, '<br>').replace(/ /g, '&nbsp;')
    metadata.scrollTop = 0
}


const amount = document.getElementById('amount')
const downloadButton = document.getElementById('download-button')
downloadButton.addEventListener('click', download)
function download()
{
    const zip = new JSZip();
    const canvas = document.createElement('canvas')
    canvas.width = size
    canvas.height = size
    const ctx = canvas.getContext('2d')
    for(var i = 0; i < amount.value; i++)
    {
        const shapeMetadata = randomize(ctx)
        zip.file(i+'.jpg',canvas2Blob(canvas));
        zip.file(i+'.json',JSON.stringify(shapeMetadata));
    }
    zip.generateAsync({ type: 'blob' }).then(function (content) {
        FileSaver.saveAs(content, 'shape-mnist-x'+amount.value+'.zip');
    });
}





function randomize(ctx)
{
    ctx.fillStyle = '#' + Math.floor(Math.random() * 16777215).toString(16)
    ctx.fillRect(0,0,size,size)
    const result = []
    // random number of elements
    var n = Math.floor(Math.random() * 10) + 1

    // for each element
    for (let i = 0; i < n; i++) {
        // random position
        const x = Math.floor(Math.random() * size)
        const y = Math.floor(Math.random() * size)
        // random size
        const w = Math.floor(Math.random() * (size-5)) + 5
        const h = Math.floor(Math.random() * (size-5)) + 5
        // random angle
        const a = Math.floor(Math.random() * 360)
        // random color
        const c = '#' + Math.floor(Math.random() * 16777215).toString(16)
        // number of sides
        const s = Math.floor(Math.random() * 6) + 3
        // draw shape
        const shapeMetadata = drawPolygon(x, y, w, h, a, s , c,ctx)
        result.push(shapeMetadata)//JSON.stringify(shapeMetadata, null, 2).replace(/\n/g, '<br>').replace(/ /g, '&nbsp;')
    }
    return result;
}