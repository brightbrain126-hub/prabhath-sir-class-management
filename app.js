// Web Audio API භාවිතයෙන් Click සද්දයක් ලබා දීම
function playClickSound() {
    try {
        const AudioContext = window.AudioContext || window.webkitAudioContext;
        if (AudioContext) {
            const ctx = new AudioContext();
            const osc = ctx.createOscillator();
            const gain = ctx.createGain();

            osc.type = 'sine';
            osc.frequency.setValueAtTime(600, ctx.currentTime);
            gain.gain.setValueAtTime(0.05, ctx.currentTime);

            osc.connect(gain);
            gain.connect(ctx.destination);

            osc.start();
            osc.stop(ctx.currentTime + 0.08);
        }
    } catch (e) {
        console.log("Audio not supported or allowed yet");
    }
}

// Login සහ Register Tabs මාරු කිරීමේ Function එක
function switchTab(tab) {
    playClickSound();

    const loginSection = document.getElementById('loginFormSection');
    const registerSection = document.getElementById('registerFormSection');
    const loginBtn = document.getElementById('loginTabBtn');
    const registerBtn = document.getElementById('registerTabBtn');

    if (tab === 'login') {
        loginSection.style.display = 'block';
        registerSection.style.display = 'none';
        loginBtn.classList.add('active');
        registerBtn.classList.remove('active');
    } else if (tab === 'register') {
        loginSection.style.display = 'none';
        registerSection.style.display = 'block';
        registerBtn.classList.add('active');
        loginBtn.classList.remove('active');
    }
}

// Login Submit Form
function handleLogin(event) {
    event.preventDefault();
    playClickSound();
    alert("Login Successful!");
}

// Registration Submit Form
function handleRegister(event) {
    event.preventDefault();
    playClickSound();
    alert("Registration Successful! Now you can Login.");
    switchTab('login');
}