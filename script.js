// Smooth Scroll for Navigation Links
document.querySelectorAll('nav.navbar a').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        if (targetId.startsWith("#") && document.querySelector(targetId)) {
            const targetElement = document.querySelector(targetId);
            targetElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    });
});

// Typewriter Effect for the Profession Text
const typewriterText = ["Web Developer", "Frontend Designer", "UI / UX Designer"];
let typewriterIndex = 0;
let charIndex = 0;
const typewriterElement = document.querySelector('.home .text-animation span');

function typeWriter() {
    if (charIndex < typewriterText[typewriterIndex].length) {
        typewriterElement.textContent += typewriterText[typewriterIndex][charIndex++];
        setTimeout(typeWriter, 150);
    } else {
        setTimeout(erase, 2000); // Wait some time and start erasing
    }
}

function erase() {
    if (charIndex > 0) {
        // Remove character before the current charIndex position then decrease charIndex
        typewriterElement.textContent = typewriterElement.textContent.substring(0, --charIndex);
        setTimeout(erase, 100);
    } else {
        // After erase, reset to start typing next text
        typewriterIndex = (typewriterIndex + 1) % typewriterText.length;
        setTimeout(typeWriter, 200);
    }
}

document.addEventListener('DOMContentLoaded', typeWriter);

const canvas = document.getElementById('spaceCanvas');
const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let stars = []; // Array to hold stars
const numberOfStars = 150; // Number of stars

class Star {
    constructor(x, y, size, velocity) {
        this.x = x;
        this.y = y;
        this.size = size;
        this.velocity = velocity;
    }

    draw() {
        ctx.fillStyle = '#bbbbff'; // Light bluish color for stars
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
    }

    update(mouse) {
        this.x -= this.velocity.x;
        this.y -= this.velocity.y;

        // Wrap stars around the canvas
        if (this.x < 0) this.x = canvas.width;
        if (this.y < 0) this.y = canvas.height;
        if (this.x > canvas.width) this.x = 0;
        if (this.y > canvas.height) this.y = 0;

        this.draw();

        // Draw lines to nearby stars and mouse cursor
        const dx = mouse.x - this.x;
        const dy = mouse.y - this.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        if (distance < 150) {
            ctx.strokeStyle = '#4444dd'; // Dark blue color for lines
            ctx.lineWidth = 0.5;
            ctx.beginPath();
            ctx.moveTo(this.x, this.y);
            ctx.lineTo(mouse.x, mouse.y);
            ctx.stroke();
        }
    }
}

let mouse = {
    x: undefined,
    y: undefined
};

function initStars() {
    stars = [];
    for (let i = 0; i < numberOfStars; i++) {
        let x = Math.random() * canvas.width;
        let y = Math.random() * canvas.height;
        let size = Math.random() * 2;
        let velocity = { x: 0, y: 0.3 + Math.random() * 0.5 };
        stars.push(new Star(x, y, size, velocity));
    }
}

function animate() {
    ctx.fillStyle = '#000022'; // Fill canvas with dark blue to create trail effect
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    stars.forEach(star => star.update(mouse));
    requestAnimationFrame(animate);
}

window.addEventListener('mousemove', function(e) {
    mouse.x = e.clientX;
    mouse.y = e.clientY;
});

window.addEventListener('resize', function() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    initStars();
});

initStars();
animate();


document.addEventListener('DOMContentLoaded', () => {
    const serviceBoxes = document.querySelectorAll('.service-box');
    serviceBoxes.forEach(box => {
        box.addEventListener('mouseenter', () => {
            stars.forEach(star => {
                // Calculate direction towards the center of the box
                const boxRect = box.getBoundingClientRect();
                const boxCenterX = boxRect.left + boxRect.width / 2;
                const boxCenterY = boxRect.top + boxRect.height / 2;
                const dx = boxCenterX - star.x;
                const dy = boxCenterY - star.y;
                const distance = Math.sqrt(dx * dx + dy * dy);
                
                // Update velocity to move star towards the box center
                star.velocity.x = dx / distance * 0.5; // Adjust speed factor as needed
                star.velocity.y = dy / distance * 0.5;
            });
        });

        box.addEventListener('mouseleave', () => {
            // Restore original star velocities
            initStars();
        });
    });

    // Continue with star animation and initialization as previously set up
    initStars();
    animate();
});


document.addEventListener('DOMContentLoaded', () => {
    const serviceBoxes = document.querySelectorAll('.service-box');

    serviceBoxes.forEach(box => {
        const infoDiv = box.querySelector('.service-info');
        const image = box.querySelector('img');

        box.addEventListener('mouseenter', () => {
            infoDiv.style.opacity = '1'; // Show the text
            image.style.transform = 'scale(1.1)'; // Scale the image
        });

        box.addEventListener('mouseleave', () => {
            infoDiv.style.opacity = '0'; // Hide the text
            image.style.transform = 'scale(1)'; // Reset the image scale
        });
    });
});

document.getElementById('menu-icon').addEventListener('click', function() {
    var nav = document.querySelector('.navbar');
    nav.classList.toggle('active'); // Toggle visibility of navbar
});


