let canvas = document.getElementById("canvas");
let ctx = canvas.getContext("2d");

canvas.height = 512;
canvas.width = 448;

const sprite = document.getElementById ("sprite");
const mur = document.getElementById ("murs")
let ball = document.getElementById("balls")

let colors = ["#FFF"]

let color;



const  filas = 6
const columnes = 12;
const ampleMur = 30;
const alturaMur = 14;
const margeTMur = 80;
const margeEMur = 30;
const sepMurs = 2;


const murs = []
const ESTAT_MUR = {
    DESTRUIT: 0,
    SHOW: 1
}

for(let c=0; c<columnes; c++){
    murs [c] = [];
    for (let f=0; f<filas; f++){
        let r  = Math.floor(Math.random()*3)
        const murX = margeEMur+c*(ampleMur+sepMurs)
        const murY = margeTMur+f*(alturaMur+sepMurs)
        murs  [c][f] = {
            x: murX,
            y: murY,
            status: ESTAT_MUR.SHOW,
            color: r,

        }
    }
}



let radiPilota = 6;
let x = canvas.width / 2
let y = canvas.height - 35


let dx = 2
let dy = -2


let amplePala = 60;
let alturaPala = 20;

let sensibilitat = 6;
let dreta = false;
let esquerra = false;

let palaX = (canvas.width - amplePala) / 2;
let palaY = canvas.height - alturaPala - 10;

let vidas = 3;


function pintarPilota(color){
    ctx.beginPath();
    ctx.arc(x, y, radiPilota, 0, Math.PI*2);
    ctx.fillStyle = color;
    ctx.fill ();
    ctx.closePath();
}


function pintarPala (){
    ctx.drawImage(
        sprite,
        0,
        0,   
        169,
        77,
        palaX,
        palaY,
        amplePala,
        alturaPala
    )
}


function pintarMurs (){
    for(let c=0; c<columnes; c++){
        for (let f=0; f<filas; f++){
            const murActual = murs[c][f];
            if (murActual.status == ESTAT_MUR.DESTRUIT){
                continue;
            }
            let clipX = murActual.color * 150
            ctx.drawImage(
                mur,
                clipX,
                0,
                100,
                100,
                murActual.x,
                murActual.y,
                ampleMur,
                alturaMur
            )
        }
    }
}


function deteccioColisio(){
    for(let c=0; c<columnes; c++){
        for (let f=0; f<filas; f++){
            const murActual = murs[c][f];
            if (murActual.status == ESTAT_MUR.DESTRUIT){
                continue;
            }
            
            const mateixaXMur = x > murActual.x && x < murActual.x + ampleMur;
            const mateixaYMur = y > murActual.y && y < murActual.y + alturaMur

            if(mateixaXMur && mateixaYMur){
                dy = - dy;
                murActual.status = ESTAT_MUR.DESTRUIT

                var audio = document.getElementById("audio2");
                audio.play();
            }

        }
    }
}


function movimentPilota (){
    if(x + dx >= canvas.width || x + dx <= 0){
        dx = -dx
    }
    if(y + dy <= 0){
        dy = -dy
    }

    if( y == palaY && x >= palaX && x <= palaX+amplePala){
        dy = -dy
    }else if(y > canvas.height){
        vidas--

        var audio = document.getElementById("audio");
        audio.play();
    
        if(vidas == 0){
            console.log("GAME OVER")
            document.location.reload();
        }

        dx = 2;
        dy = -2
        x = canvas.width / 2
        y = canvas.height - 30
    }
        
    x += dx;
    y += dy;
}


function movimentPala (){
    if (dreta && palaX < canvas.width - amplePala){
        palaX += sensibilitat
    }else if (esquerra && palaX > 0){
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
        if(event.key == 'm'){
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
    console.log("Hi");
    borrarPantalla();
    pintarPilota(color);
    pintarPala();
    pintarMurs();
    deteccioColisio();
    movimentPilota();
    movimentPala();
    ctx.fillText("Vidas: " +vidas ,12,12);
    window.requestAnimationFrame(pintarCanvas);
}
pintarCanvas();
inicialitzadorEvents();

document.getElementById("pilotes").addEventListener("click",function(){
    color =  document.getElementById("pilota").value
    console.log(color)
    pintarPilota(color)
})