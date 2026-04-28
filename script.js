
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
    heart.style.setProperty('--tx', ((Math.random() - 0.5) * 100) + 'px');
    heartsContainer.appendChild(heart);
    setTimeout(() => heart.remove(), 1500);
}

giftBox.addEventListener('click', function() {

    if (audio && audio.paused) {
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


const message = "كل عام وأنتي مصدر النور بحياتي. عملت هالموقع خصوصاً إلك لحتى تضل ذكرى محفورة باسمك فيصلية للأبد... بحبك ❤️";
let i = 0;
let typewriterTimeout;

function typeWriter() {
    if (i < message.length) {
        typewriterElement.innerHTML += message.charAt(i);
        i++;
        typewriterTimeout = setTimeout(typeWriter, 70);
    } else {
        setTimeout(() => {
            psMessage.classList.remove('hidden');
        }, 1000);
    }
}

function startTypewriter() {
    clearTimeout(typewriterTimeout);
    i = 0;
    typewriterElement.innerHTML = '';
    psMessage.classList.add('hidden');
    typeWriter();
}


function launchConfetti() {
    const duration = 3000;
    const end = Date.now() + duration;
    const colors = ['#ff007f', '#ff758c', '#ffffff', '#ffd700'];

    (function frame() {
        confetti({
            particleCount: 3,
            angle: 60,
            spread: 55,
            origin: { x: 0 },
            colors: colors
        });

        confetti({
            particleCount: 3,
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


function checkPassword() {
    const inputField = document.getElementById("password-input");
    const password = inputField.value;
    const correctPassword = "ali";

    if (password === correctPassword) {
        document.getElementById("password-screen").style.display = "none";
        document.getElementById("main-content").style.display = "block";
        if (audio) {
            audio.volume = 0.3;
            if (audio.paused) {
                audio.play().catch(() => console.log("المتصفح حظر التشغيل التلقائي"));
            }
        }
    } else {
        inputField.value = "";
        inputField.focus();
        inputField.style.animation = 'none';
        inputField.offsetHeight;
        inputField.style.animation = 'shake 0.5s';
    }
}


document.addEventListener('keydown', function(e) {
    if (e.key === 'Enter') {
   
        const lockScreen = document.getElementById("password-screen");
        if (lockScreen.style.display !== "none") {
            checkPassword();
        }
    }
});
