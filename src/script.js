const canvas = document.getElementById('animationCanvas');
const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const rainDrops = [];
const clouds = [];
const rainColor = '#00FFFF';
const cloudColor = '#808080';
const smileyColor = '#FFFF00';
const dropCount = 500;
const cloudCount = 5;

function createRain() {
    for (let i = 0; i < dropCount; i++) {
        rainDrops.push({
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            speed: 2 + Math.random() * 3,
            length: 5 + Math.random() * 5
        });
    }
}

function createClouds() {
    for (let i = 0; i < cloudCount; i++) {
        clouds.push({
            x: i * (canvas.width / cloudCount) + Math.random() * (canvas.width / cloudCount),
            y: Math.random() * 50,
            radius: 50 + Math.random() * 30
        });
    }
}

function drawRain() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    rainDrops.forEach(drop => {
        ctx.beginPath();
        ctx.moveTo(drop.x, drop.y);
        ctx.lineTo(drop.x, drop.y + drop.length);
        ctx.strokeStyle = rainColor;
        ctx.lineWidth = 2;
        ctx.stroke();
    });
}

function updateRain() {
    rainDrops.forEach(drop => {
        drop.y += drop.speed;
        if (drop.y > canvas.height) {
            drop.y = -drop.length;
            drop.x = Math.random() * canvas.width;
        }
    });
}

function drawClouds() {
    clouds.forEach(cloud => {
        ctx.beginPath();
        ctx.arc(cloud.x, cloud.y, cloud.radius, Math.PI * 0.5, Math.PI * 1.5);
        ctx.arc(cloud.x + cloud.radius, cloud.y - cloud.radius, cloud.radius, Math.PI * 1, Math.PI * 1.85);
        ctx.arc(cloud.x + cloud.radius * 2, cloud.y - cloud.radius, cloud.radius, Math.PI * 1.15, Math.PI * 2);
        ctx.arc(cloud.x + cloud.radius * 3, cloud.y, cloud.radius, Math.PI * 1.5, Math.PI * 0.5);
        ctx.fillStyle = cloudColor;
        ctx.fill();
    });
}

function drawSadFace() {
    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;
    const radius = 100;

    // Face
    ctx.beginPath();
    ctx.arc(centerX, centerY, radius, 0, Math.PI * 2, true);
    ctx.fillStyle = smileyColor;
    ctx.fill();
    ctx.stroke();

    // Eyes
    ctx.beginPath();
    ctx.arc(centerX - 30, centerY - 30, 10, 0, Math.PI * 2, true);
    ctx.arc(centerX + 30, centerY - 30, 10, 0, Math.PI * 2, true);
    ctx.fillStyle = '#000';
    ctx.fill();

    // Sad Mouth
    ctx.beginPath();
    ctx.arc(centerX, centerY + 40, 30, 0, Math.PI, true); // Adjusted to create a frown
    ctx.strokeStyle = '#000';
    ctx.lineWidth = 5;
    ctx.stroke();
}

function animate() {
    drawRain();
    drawClouds();
    drawSadFace();
    updateRain();
    requestAnimationFrame(animate);
}

createRain();
createClouds();
animate();

// Add play/pause functionality
const backgroundMusic = document.getElementById('backgroundMusic');
const playPauseButton = document.getElementById('playPauseButton');

playPauseButton.addEventListener('click', () => {
    if (backgroundMusic.paused) {
        backgroundMusic.play();
        playPauseButton.textContent = 'Pause Music';
    } else {
        backgroundMusic.pause();
        playPauseButton.textContent = 'Play Music';
    }
});
