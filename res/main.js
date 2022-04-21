const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");


canvas.width = window.innerWidth
canvas.height = window.innerHeight

let gravity = 0.5

//const playerImg = new Image();
//playerImg.src = "./media/img/PPR.png"

class Player {
    constructor() {
        this.position = {
            x: 100,
            y: 100
        }
        this.velocity = {
            x:0,
            y:1
        }
        this.width = 10
        this.height = 10
    }

    draw(){
        ctx.fillStyle = 'red'
        ctx.fillRect(this.position.x,
                     this.position.y,
                     this.height,
                     this.width)
    }
    update(){
        this.position.y += this.velocity.y
        this.draw()

        if (this.position.y +this.height +
            this.velocity.y <= canvas.height)
            this.velocity.y += gravity
        else this.velocity.y = 0
    }
}


const player = new Player()


function animate() {
    requestAnimationFrame(animate)
    ctx.clearRect(0,0, canvas.width, canvas.height)
    player.update()
}

animate()
