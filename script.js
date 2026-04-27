
const giftScene = document.getElementById('giftScene');
const giftBox = document.getElementById('giftBox');
const card = document.getElementById('card');
const openBtn = document.getElementById('openBtn');
const typewriterElement = document.getElementById('typewriter');
const psMessage = document.getElementById('psMessage');
const audio = document.getElementById('birthdayAudio');
const heartsContainer = document.getElementById('heartsContainer');


const hearts = ['❤️', '💖', '💕'];
let lastHeartTime = 0;

document.addEventListener('mousemove', (e) => {
    const now = Date.now();
    if (now - lastHeartTime > 150) { 
        createHeart(e.clientX, e.clientY);
        lastHeartTime = now;
    }
});

function createHeart(x, y) {
    const heart = document.createElement('div');
    heart.className = 'floating-mouse-heart';
    heart.textContent = hearts[Math.floor(Math.random() * hearts.length)];
    heart.style.left = x + 'px';
    heart.style.top = y + 'px';
    heart.style.fontSize = (Math.random() * 10 + 10) + 'px';
    heart.style.setProperty('--tx', ((Math.random() - 0.5) * 50) + 'px');
    heartsContainer.appendChild(heart);
    setTimeout(() => heart.remove(), 1200);
}

giftBox.addEventListener('click', function() {

    if (audio) {
        audio.play().catch(() => console.log("المتصفح انتظر التفاعل"));
    }
    

    giftBox.classList.add('open');
    

    setTimeout(() => {
        giftScene.style.opacity = '0';
        giftScene.style.pointerEvents = 'none';
        
        card.style.opacity = '1';
        card.style.pointerEvents = 'auto';
        card.style.transform = 'scale(1)';
        
        launchConfetti();
    }, 800);
});

openBtn.addEventListener('click', function() {
    card.classList.add('flipped');
    setTimeout(startTypewriter, 900);
    launchConfetti();
});


const message = "كل عام وأنتي مصدر النور بحياتي. عملت هالموقع خصوصاً إلك لحتى تضل ذكرى محفورة باسمك للأبد... بحبك ❤️";
let i = 0;

function typeWriter() {
    if (i < message.length) {
        typewriterElement.innerHTML += message.charAt(i);
        i++;
        setTimeout(typeWriter, 70);
    } else {
        setTimeout(() => {
            psMessage.classList.remove('hidden');
        }, 1000);
    }
}

function startTypewriter() {
    i = 0;
    typewriterElement.innerHTML = '';
    typeWriter();
}


function launchConfetti() {
    confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#ff007f', '#ff758c', '#ffffff', '#ffd700']
    });
}

function launchConfetti() {
    const duration = 3000; 
    const end = Date.now() + duration;


    const colors = ['#ff007f', '#ff758c', '#ffffff', '#ffd700'];

    (function frame() {

        confetti({
            particleCount: 2,
            angle: 60,
            spread: 55,
            origin: { x: 0 },
            colors: colors
        });
        
   
        confetti({
            particleCount: 2,
            angle: 120,
            spread: 55,
            origin: { x: 1 },
            colors: colors
        });


        if (Date.now() < end) {
            requestAnimationFrame(frame);
        }
    }());
}