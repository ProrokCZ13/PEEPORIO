const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");


canvas.width = window.innerWidth
canvas.height = window.innerHeight

let gravity = 0.5;
let onLand = 1;
let key = {
    right: {
        pressed: false
    },
    left: {
        pressed: false
    }
};
//textura platforem
//const textureImg = new Image();
//textureImg.src = "../media/img/Textura.jpg"
//const pattern = ctx.createPattern(textureIMG, 'repeat');


//pozadí
const background = new Image();
background.src = "../media/img/background.jpg"


//hráč
const playerImg = new Image();
playerImg.src = "../media/img/PPR.png"


class Player {
    constructor() {
        this.position = {
            x: 100,
            y: 100
        }
        this.velocity = {
            x: 0,
            y: 1
        }
        this.width = 10
        this.height = 10
    }

    draw() {
        ctx.fillStyle = 'blue'
        ctx.fillRect(this.position.x,
            this.position.y,
            this.height,
            this.width)
    }

    update() {
        this.position.y += this.velocity.y
        this.position.x += this.velocity.x
        this.draw()

        if (this.position.y + this.height +
            this.velocity.y <= canvas.height)
            this.velocity.y += gravity
        else this.velocity.y = 0
    }
}

//platfroma
class Platform {
    constructor({x, y, h, w}) {
        this.position = {
            x,
            y
        }
        this.width = w
        this.height = h
    }

    draw() {
        ctx.fillStyle = 'orange'
        ctx.fillRect(this.position.x,
            this.position.y,
            this.width,
            this.height)

    }
}

const player = new Player()
//generace platforem
const platforms = [new Platform({x: 0, y: 700, h: 500, w: 400}),
                   new Platform({x: 500, y: 700, h: 500, w: 400}),
                   new Platform({x: 900, y: 700, h: 500, w: 400}),
                   new Platform({x: 1500, y: 700, h: 500, w: 400}),
                   new Platform({x: 2000, y: 700, h: 500, w: 400}),
                   new Platform({x: 2500, y: 520, h: 20, w: 100}),
                   new Platform({x: 2700, y: 510, h: 20, w: 100}),
                   new Platform({x: 3000, y: 700, h: 500, w: 400}),
                   new Platform({x: 3500, y: 700, h: 500, w: 400}),
                   new Platform({x: 4000, y: 700, h: 500, w: 400}),
                   new Platform({x: 5000, y: 700, h: 500, w: 400}),
                   new Platform({x: 6000, y: 700, h: 500, w: 400}),
                   new Platform({x: 7000, y: 700, h: 500, w: 400}),
                   new Platform({x: 8000, y: 700, h: 500, w: 400}),
                   new Platform({x: 9000, y: 700, h: 500, w: 400}),
                   new Platform({x: 10000, y: 700, h: 500, w: 400}),

]

function animate() {
    requestAnimationFrame(animate)
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    player.update()
    platforms.forEach(platform => {
        platform.draw()
    })


    //pohyb && sidescroll
    if (key.right.pressed && player.position.x < 400) {
        player.velocity.x = 5
    } else if (key.left.pressed && player.position.x > 100) {
        player.velocity.x = -5
    } else player.velocity.x = 0

    //kolize s platformou osa y
    platforms.forEach(platform => {
        if (player.position.y + player.height <= platform.position.y
            && player.position.y + player.height + player.velocity.y >= platform.position.y
            && player.position.x + player.width >= platform.position.x
            && player.position.x <= platform.position.x + platform.width) {
            player.velocity.y = 0
            onLand = 1;
        }
    })
    /*kolize s platformou osa x
    if (player.position.x + player.width <= platform.position.x
        && player.position.x >= platform.position.x + platform.width) {
        player.velocity.x = 0
    }*/
    //sidescroll
    if (key.right.pressed) {
        platforms.forEach(platform => {
            platform.position.x -= 5
        })
    } else if (key.left.pressed) {
        platforms.forEach(platform => {
            platform.position.x += 5
        })

    }
}

animate()
//pohyb
window.addEventListener('keydown', ({keyCode}) => {
    switch (keyCode) {
        //W
        case 87:
            if (onLand === 1){
                player.velocity.y -= 20
                onLand = 0;
            }
            break

        //A
        case 65 || 37:
            key.left.pressed = true
            break
        //S
        case 83 || 40:

            break
        //D
        case 68 || 39:
            key.right.pressed = true
            break

    }


})

window.addEventListener('keyup', ({keyCode}) => {
    switch (keyCode) {
        //W
        case 87:
            player.velocity.y += 7
            break

        //A
        case 65 || 37:
            key.left.pressed = false
            break
        //S
        case 83 || 40:

            break
        //D
        case 68 || 39:
            key.right.pressed = false
            break

    }


})
