const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
const nameInput = document.getElementById('name');
const downloadBtn = document.getElementById('download-btn');

const image = new Image();
image.src = 'cert.jpg';
image.onload = function () {
    drawImage();
}

function drawImage() {
    
    ctx.drawImage(image, 0, 0, canvas.width, canvas.height);
    ctx.font = '300% myFont';
    ctx.fillStyle = 'black';
    ctx.fillText(nameInput.value, 500, 390);
    ctx.textAlign = 'center';
    

    let draw_color = "black";
    let draw_width = "1";
    let is_drawing = false;

    canvas.addEventListener("touchstart", start, false);
    canvas.addEventListener("touchmove", draw, false);
    canvas.addEventListener("mousedown", start, false);
    canvas.addEventListener("mousemove", draw, false);

    canvas.addEventListener("touchend", stop, false);
    canvas.addEventListener("mouseup", stop, false);
    canvas.addEventListener("mouseout", stop, false);


    function start(event){
        is_drawing = true;
        ctx.beginPath();
        ctx.moveTo(event.clientX - canvas.offsetLeft, 
                    event.clientY - canvas.offsetTop)
        event.preventDefault();
    }

    function draw(event){
        if (is_drawing){
            ctx.lineTo(event.clientX - canvas.offsetLeft, 
                event.clientY - canvas.offsetTop);
            ctx.strokeStyle = draw_color;
            ctx.lineWidth = draw_width;
            ctx.lineCap = "round";
            ctx.lineJoin = "round";
            ctx.stroke();
        }
        event.preventDefault();
    }

    function stop(event){
        if (is_drawing){
            ctx.closePath();
            is_drawing = false;
        }
        event.preventDefault();
    }
}

function clear_canvas(){
    window.location.reload(true);
}

nameInput.addEventListener('input', function(){
    drawImage();
})

downloadBtn.addEventListener('click', function(){
    downloadBtn.href = canvas.toDataURL('image/png');
    downloadBtn.download = 'Certificate -' + nameInput.value+'.png';
})



