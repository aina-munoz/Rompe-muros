let canvas = document.getElementById("canvas");
let ctx = canvas.getContext("2d");

canvas.height = 512;
canvas.width = 448;


let radiPilota = 12;
let x = canvas.width / 2
let y = canvas.height - 30


let dx = 3
let dy = -3


let amplePala = 50;
let alturaPala = 10;

let sensibilitat = 8;
let dreta = false;
let esquerra = false;

let palaX = (canvas.width - amplePala) / 2;
let palaY = canvas.height - alturaPala - 10;


function pintarPilota(){
    ctx.beginPath();
    ctx.arc(x, y, radiPilota, 0, Math.PI*2);
    ctx.fillStyle = "#FFF";
    ctx.fill();
    ctx.closePath();
}


function pintarPala(){
    ctx.fillStyle = "#FFF";
    ctx.fillRect(palaX, palaY, amplePala, alturaPala);
}


function pintarMurs(){

}


function deteccioColisio(){

}


function movimentPilota(){
    if(x + dx >= canvas.width || x + dx <= 0){
        dx = -dx
    }
    if(y + dy <= 0){
        dy = -dy
    }

    if(y + dy > canvas.height){
        console.log("GAME OVER")
        document.location.reload();
    }

    x += dx;
    y += dy;
}


function movimentPala(){
    if(dreta && palaX < canvas.width - amplePala){
        palaX += sensibilitat
    }else if(esquerra && palaX > 0){
        palaX -= sensibilitat
    }
}


function borrarPantalla(){
    canvas.height = 512;
    canvas.width = 448;
}


function inicialitzadorEvents(){
    document.addEventListener('keydown', pulsar);
    document.addEventListener('keyup', soltar);

    function pulsar(event){
        if(event.key == 'ArrowRight' || event.key == 'd'){
            dreta = true;
        }
        if(event.key == 'ArrowLeft' || event.key == 'a'){
            esquerra = true;
        }
        if(event.key == 'q'){
            amplePala = amplePala*2;
        }
        if(event.key == 'e'){
            amplePala = amplePala/2;
        }
        if(event.key == 'z'){
            radiPilota = radiPilota*2;
        }
        if(event.key == 'c'){
            radiPilota = radiPilota/2;
        }
        if(event.key == 'i'){
            sensibilitat = sensibilitat*2;
        }
        if(event.key == 'p'){
            sensibilitat = sensibilitat/2;
        }
        if(event.key == 'k'){
            dx = dx*2;
            dy = dy*2;
        }
        if(event.key == 'ñ'){
            dx = dx/2;
            dy = dy/2;
        }
        if(event.key == '0'){
            let dx2 = dx;
            let dy2 = dy
            dx = 0;
            dy = 0;
            setTimeout(() => {
                dx = dx2;
                dy = dy2;
            }, 3000)
        }
    }

    function soltar(event){
        if(event.key == 'ArrowRight' || event.key == 'd'){
            dreta = false;
        }
        if(event.key == 'ArrowLeft' || event.key == 'a'){
            esquerra = false;
        }
    }
}



function pintarCanvas(){
    console.log("Hola");
    borrarPantalla();
    pintarPilota();
    pintarPala();
    pintarMurs();
    deteccioColisio();
    movimentPilota();
    movimentPala();
    window.requestAnimationFrame(pintarCanvas);
}


pintarCanvas();
inicialitzadorEvents();