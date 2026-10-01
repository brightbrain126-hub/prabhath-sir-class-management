// Background Slideshow
const bgImages = [
    './image15.jpg',
    './image13.png',
    './image12.jpg',
    './image11.jpg',
    './image10.jpg',
    './image9.jpg',
    './image8.jpg',
    './image7.png',
    './image6.jpg',
    './image5.jpg',
    './image4.png',
    './image3.png',
    './image2.jpg',
    './image1.png'
];

let currentBgIndex = 0;
function changeBackground() {
    const bgDiv = document.getElementById('bgSlide');
    if (bgDiv && bgImages.length > 0) {
        bgDiv.style.backgroundImage = `url('${bgImages[currentBgIndex]}')`;
        currentBgIndex = (currentBgIndex + 1) % bgImages.length;
    }
}
changeBackground();
setInterval(changeBackground, 4000);

// Tab Switch Logic
function switchTab(tab) {
    const loginForm = document.getElementById('loginForm');
    const registerForm = document.getElementById('registerForm');
    const loginBtn = document.getElementById('loginTabBtn');
    const registerBtn = document.getElementById('registerTabBtn');

    if (tab === 'login') {
        loginForm.classList.remove('hidden');
        registerForm.classList.add('hidden');
        loginBtn.classList.add('active');
        registerBtn.classList.remove('active');
    } else {
        loginForm.classList.add('hidden');
        registerForm.classList.remove('hidden');
        loginBtn.classList.remove('active');
        registerBtn.classList.add('active');
    }
}

// Login Handler
function handleLogin(event) {
    event.preventDefault();
    const id = document.getElementById('loginId').value;
    const pass = document.getElementById('loginPassword').value;

    if (id && pass) {
        alert("සාර්ථකව ඇතුළු විය! (Login Successful)");
        // Redirect logic:
        window.location.href = "alphabet.html";
    } else {
        alert("කරුණාකර සියලුම තොරතුරු ඇතුළත් කරන්න.");
    }
}

// Register Handler
function handleRegister(event) {
    event.preventDefault();
    const name = document.getElementById('regName').value;
    const phone = document.getElementById('regPhone').value;
    const pass = document.getElementById('regPassword').value;

    if (name && phone && pass) {
        alert("ලියාපදිංචිය සාර්ථකයි! දැන් ඇතුළු වන්න.");
        switchTab('login');
    } else {
        alert("කරුණාකර සියලුම තොරතුරු ඇතුළත් කරන්න.");
    }
}