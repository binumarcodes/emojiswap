const canvas = document.querySelector('canvas');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const c = canvas.getContext('2d')

const mouse = {
    x: innerWidth / 2,
    y: innerHeight / 2
}

addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    init()
})

const gravity = 0.005
const friction = 0.99

class Particle {
    constructor(x, y, radius, color, velocity) {
        this.x = x;
        this.y = y;
        this.radius = radius
        this.color = color
        this.velocity = velocity
        this.alpha = 1
    }

    draw() {
        c.save()
        c.globalAlpha = this.alpha
        c.beginPath()
        c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
        c.fillStyle = this.color
        c.fill()
        c.closePath()
        c.restore()
    }

    update() {
        this.draw()
        this.velocity.x *= friction
        this.velocity.y *= friction
        this.velocity.y += gravity
        this.x += this.velocity.x
        this.y += this.velocity.y
        this.alpha -= 0.005;
    }
}

let particles
function init() {
    particles = []

}

function animate() {
    requestAnimationFrame(animate)
    c.fillStyle = 'rgba(0, 0, 0, 0.05'
    c.fillRect(0, 0, canvas.width, canvas.height)

    particles.forEach((particle, i) => {
        if(particle.alpha > 0) {
            particle.update()
        } else {
            particles.splice(i, 1)
        }
    })
}

init();
animate();


addEventListener('click', (event)=>{
     mouse.x = event.clientX;
     mouse.y = event.clientY;

     const particleCount = 400

    const angleIncrement = Math.PI * 2 / particleCount

    for(let i = 0; i < 400; i++) {
        particles.push(new Particle(mouse.x, mouse.y, 5, 'blue', {
            x: Math.cos(angleIncrement * i) * Math.random(),
            y: Math.sin(angleIncrement * i) * Math.random()
        })
        )
    }

    console.log(particles)
})