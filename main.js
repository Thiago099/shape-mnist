import './style.css'
import { drawPolygon } from './draw.js'

// drawPolygon(14,14,20,20,45,6,'#f0f')
// drawRectangle(14,14,10,10,7,'#000')
// drawEllipse(14,14,10,10,45,'#00f')

// random background color
const canvas = document.getElementById('out')
canvas.width = 28
canvas.height = 28
const ctx = canvas.getContext('2d')
const randomizeButton = document.getElementById('randomize-button')
const metadata = document.getElementById('metadata')
randomizeButton.addEventListener('click', randomize)
randomize();
function randomize()
{
    ctx.fillStyle = '#' + Math.floor(Math.random() * 16777215).toString(16)
    ctx.fillRect(0,0,28,28)
    
    // random number of elements
    var n = Math.floor(Math.random() * 10) + 1

    console.log(n)
    // for each element
    for (let i = 0; i < n; i++) {
        // random position
        const x = Math.floor(Math.random() * 28)
        const y = Math.floor(Math.random() * 28)
        // random size
        const w = Math.floor(Math.random() * 20) + 5
        const h = Math.floor(Math.random() * 20) + 5
        // random angle
        const a = Math.floor(Math.random() * 360)
        // random color
        const c = '#' + Math.floor(Math.random() * 16777215).toString(16)
        // number of sides
        const s = Math.floor(Math.random() * 6) + 3
        // draw shape
        const shapeMetadata = drawPolygon(x, y, w, h, a, s , c,ctx)
        metadata.innerHTML += JSON.stringify(shapeMetadata, null, 2).replace(/\n/g, '<br>').replace(/ /g, '&nbsp;')
    }
}