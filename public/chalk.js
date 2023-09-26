const canvas = document.querySelector('canvas');

const slider = document.querySelector('.slider')

const ctx = canvas.getContext('2d');

const style = document.querySelector('[data="test"]');

const socket = io()

canvas.height = 535

canvas.width = 1000

let thickness = 25

let color = "black"

const getCurrentThickness = (e) => {
    return thickness = e;
}

const getCurrentColor = (e) => {
    return color = e
}

const setSlider=(x,color)=>{
    if(x<15){
        x= 10
    }
    else if(x<25){
        x= 20
    }
    else{
        x=25
    }
    style.innerHTML =`.slider::-webkit-slider-thumb { width: ${x}px !important; 
                                                     height:${x}px !important; 
                                                     background:${color}!important}`
}



let drawing = false;

const start = (e) => {
    drawing = true
    draw(e)
}
const stop = () => {
    drawing = false
    ctx.beginPath()
}
const drawer = (x1, y1, co, th, toemit) => {
    
    ctx.lineWidth = th;
    ctx.lineCap = "round";
    ctx.strokeStyle = co
    ctx.lineTo(x1, y1);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(x1, y1);
    if(!toemit){
        return
    }

    socket.emit("points",{
        x1,
        y1,
        co,
        th,
    })
}


const draw = (e) => {
    if (!drawing) {
        return
    }
    setSlider(thickness, color)
    // I used e.clientX - 50 because I found out that my margin of 50px was affecting my e.clientX and e.clientY values
    drawer(e.clientX - 50, e.clientY - 50, color, thickness, true)
}


canvas.addEventListener("mousedown", start)
canvas.addEventListener("mouseup", stop)
canvas.addEventListener("mousemove", draw)

socket.on('welcome',(data)=>{
    swal(data, {
        button: false,
        className:"font"
    });
})

socket.on("draw",(data)=>{
    drawer(data.x1,data.y1,data.co,data.th)
})

