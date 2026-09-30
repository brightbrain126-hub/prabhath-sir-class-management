// Web Audio API kanggo efek swara UI
function playSound() {
    const ctx = new (window.AudioContext || window.webkitAudioContext)();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    
    osc.type = 'sine';
    osc.frequency.setValueAtTime(587.33, ctx.currentTime); // Swara Tone D5
    gain.gain.setValueAtTime(0.1, ctx.currentTime);
    
    osc.connect(gain);
    gain.connect(ctx.destination);
    
    osc.start();
    osc.stop(ctx.currentTime + 0.15);
}

// Fungsi pindah tab Login lan Register
function switchTab(tab) {
    playSound();
    const loginSection = document.getElementById('loginFormSection');
    const registerSection = document.getElementById('registerFormSection');
    const loginBtn = document.getElementById('loginTabBtn');
    const registerBtn = document.getElementById('registerTabBtn');

    if (tab === 'login') {
        loginSection.style.display = 'block';
        registerSection.style.display = 'none';
        loginBtn.classList.add('active');
        registerBtn.classList.remove('active');
    } else {
        loginSection.style.display = 'none';
        registerSection.style.display = 'block';
        registerBtn.classList.add('active');
        loginBtn.classList.remove('active');
    }
}

// Proses submit Login
function handleLogin(event) {
    event.preventDefault();
    playSound();
    alert("Login berhasil!");
}

// Proses submit Registration
function handleRegister(event) {
    event.preventDefault();
    playSound();
    alert("Registration berhasil! Silakan Login.");
    switchTab('login');
}