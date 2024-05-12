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

