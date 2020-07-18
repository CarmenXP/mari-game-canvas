let canvas= document.querySelector('canvas')
let ctx= canvas.getContext('2d')
ctx.font= "font-family:'Press Start 2P', cursive;"
//ctx.fillRect(0,0, canvas.width, canvas.height)

//Globals
let images={
    bg:'http://www.asdbassabresciana.it/wp-content/uploads/2017/03/thumb2-green-grass-football-turf-football-stadium-the-football-pitch.jpg',
    mario:'https://miro.medium.com/max/420/0*UnsiT5rG5W41Ymxt',
    goomba:'https://miro.medium.com/max/100/0*hecYvvrb0V0xXxkm.png'
}
let interval // si queremos apagar
let frames = 0 // si queremos contar
let enemies = []
//clases

class GameItem{
    constructor(config){
        this.x= config.x ? config.x:0
        this.y= config.y ? config.y:0
        this.width= config.width ? config.width: 60
        this.height= config.height ? config.height: 60
        this.img= new Image()
        this.img.src= config.image ? config.image : null
        this.img.onload= this.draw
    }

    draw = () => {
        ctx.drawImage(this.img,this.x,this.y,this.width,this.height)
    }
}

class Mario extends GameItem{
    constructor(config){
        super(config)// comunicación hacia arriba
    }
    moveLeft= () => {
        
        this.x-=56
        if(this.x<0) this.x=0
    }
    moveRigth = () =>{
        this.x+=56
        if(this.x+this.width>canvas.width) this.x=canvas.width-this.width 
        
    }

    crashWith = (item) => {  // es un boolean devuelve true o false
        return(this.x < item.x + item.width)&&(this.x + this.width > item.x)&&(this.y < item.y + item.height)&&(this.y + this.height > item.y);

    }
}

class Goomba extends GameItem{
    constructor(config){
        super(config)
        this.vy= config.vy ? config.vy : 1
    }
    draw = () => {
        this.y+=this.vy
        ctx.drawImage(this.img,this.x,this.y,this.width,this.height)
    }
}
//Instances

let backg= new GameItem({width:canvas.width,height:canvas.height, image:images.bg})
let mario= new Mario({x:0,y:450,image:images.mario})
enemies.push(new GameItem({x:100,image:images.goomba}))
// Main functions
function start(){
    interval= setInterval(update, 1000/60)
}

function update(){
    //tambien contamos
    frames++
    //aquí dibujamos
    //antes borramos
    ctx.clearRect(0,0,canvas.width,canvas.height)
    // redibujamos cada uno de los elemntos del videojuego (instancias)
    backg.draw()
    mario.draw()
    drawGoombas()
   if (frames%40 ===0) generateGoomba()
   checkCollition()
}
function stop(){
    clearInterval(interval)

}

//aux functions
//corazón del juego
function generateGoomba(){
    let x = Math.floor(Math.random()*canvas.width)
    let goomba= new Goomba({x,image: images.goomba, vy:2})
    enemies.push(goomba)
}

function drawGoombas(){
    enemies.forEach(goomba=>{
        goomba.draw()
    })

}

function checkCollition(){
    enemies.forEach(goomba=>{
        if (mario.crashWith(goomba)){
            stop()
        }
    })
}


//listeners
addEventListener('keydown', e=>{
    if(e.keyCode===37) mario.moveLeft()
    if(e.keyCode===39) mario.moveRigth()
})


start()

