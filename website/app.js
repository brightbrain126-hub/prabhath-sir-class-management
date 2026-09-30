// Global Variables
let selectedGradeNum = null;
let selectedSubjectName = null;

// 🔊 CLICK SOUND FUNCTION
function playClickSound() {
    try {
        const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
        const osc = audioCtx.createOscillator();
        const gain = audioCtx.createGain();

        osc.type = 'sine';
        osc.frequency.setValueAtTime(800, audioCtx.currentTime);
        gain.gain.setValueAtTime(0.1, audioCtx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.01, audioCtx.currentTime + 0.08);

        osc.connect(gain);
        gain.connect(audioCtx.destination);

        osc.start();
        osc.stop(audioCtx.currentTime + 0.08);
    } catch (e) {
        console.log("Audio not supported");
    }
}

// 1. LOGIN FUNCTION
function handleLogin(event) {
    if (event) event.preventDefault();

    const usernameVal = document.getElementById('username').value.trim();
    const passwordVal = document.getElementById('password').value.trim();

    if (usernameVal === "" || passwordVal === "") {
        alert("කරුණාකර Username සහ Password ඇතුළත් කරන්න.");
        return false;
    }

    playClickSound();
    document.getElementById('login-section').classList.add('hidden');
    document.getElementById('grade-selection').classList.remove('hidden');

    return false;
}

// 2. GRADE SELECT FUNCTION
function selectGrade(grade) {
    playClickSound();
    selectedGradeNum = grade;
    
    document.getElementById('grade-selection').classList.add('hidden');
    document.getElementById('subject-selection').classList.remove('hidden');
    
    document.getElementById('selected-grade-title').innerText = `Grade ${grade} - Select Subject`;

    const subjectGrid = document.querySelector('#subject-selection .grid');

    // Grade 6 සිට 11 දක්වා ප්‍රධාන විෂයන් 5
    if (grade >= 6) {
        subjectGrid.innerHTML = `
            <button class="grid-btn" onclick="showSubjectOptions('Geography')">Geography</button>
            <button class="grid-btn" onclick="showSubjectOptions('Civics')">Civics</button>
            <button class="grid-btn" onclick="showSubjectOptions('Health')">Health</button>
            <button class="grid-btn" onclick="showSubjectOptions('English')">English</button>
            <button class="grid-btn" onclick="showSubjectOptions('History')">History</button>
        `;
    } else {
        // Grade 1 සිට 5 දක්වා
        subjectGrid.innerHTML = `
            <button class="grid-btn" onclick="showSubjectOptions('Mathematics')">Mathematics</button>
            <button class="grid-btn" onclick="showSubjectOptions('English')">English</button>
            <button class="grid-btn" onclick="showSubjectOptions('Science')">Science</button>
            <button class="grid-btn" onclick="showSubjectOptions('Sinhala')">Sinhala</button>
        `;
    }
}

// 3. SHOW OPTIONS (Class Recordings / Online Games)
function showSubjectOptions(subject) {
    playClickSound();
    selectedSubjectName = subject;

    // Grade 1 English තේරුවොත් කෙළින්ම Lessons ටික පෙන්වීම
    if (selectedGradeNum === 1 && subject === 'English') {
        document.getElementById('subject-selection').classList.add('hidden');
        document.getElementById('lesson-selection').classList.remove('hidden');
        return;
    }

    document.getElementById('subject-selection').classList.add('hidden');
    const contentSec = document.getElementById('content-section');
    contentSec.classList.remove('hidden');

    contentSec.innerHTML = `
        <h2>Grade ${selectedGradeNum} - ${selectedSubjectName}</h2>
        <p style="margin-bottom: 20px; color: #666;">කරුණාකර ඔබට අවශ්‍ය කොටස තෝරන්න:</p>

        <div class="grid" style="max-width: 500px; margin: 0 auto;">
            <button class="grid-btn" style="background: #17a2b8;" onclick="showPaymentForm()">
                📹 Class Recordings
            </button>
            <button class="grid-btn" style="background: #ffc107; color: #000;" onclick="startMcqPaper()">
                🎮 Online Games (MCQ Paper)
            </button>
        </div>

        <button onclick="goBackToSubjects()" class="btn back-btn" style="max-width: 250px; margin-top: 30px;">
            ⬅️ Back to Subjects
        </button>
    `;
}

// 4. SHOW PAYMENT FORM FOR RECORDINGS
function showPaymentForm() {
    playClickSound();
    const contentSec = document.getElementById('content-section');

    contentSec.innerHTML = `
        <div style="max-width: 450px; margin: 0 auto; text-align: left;">
            <h2 style="text-align: center;">Payment Slip Upload</h2>
            <p style="text-align: center; color: #666; font-weight: bold; margin-bottom: 20px;">
                Grade ${selectedGradeNum} - ${selectedSubjectName} (Recordings Access)
            </p>
            
            <form onsubmit="handlePaymentSubmit(event)">
                <div class="form-group">
                    <label>Student Name:</label>
                    <input type="text" id="studentName" required>
                </div>
                
                <div class="form-group">
                    <label>Upload Slip (Image / PDF):</label>
                    <input type="file" id="slipFile" accept="image/*,.pdf" required style="border: none; padding: 5px 0;">
                </div>
                
                <button type="submit" class="btn" style="background: #28a745;">
                    Submit Payment Slip
                </button>
            </form>

            <button onclick="showSubjectOptions('${selectedSubjectName}')" class="btn back-btn">
                ⬅️️ Back
            </button>
        </div>
    `;
}

// 5. START FREE MCQ PAPER (10 QUESTIONS)
function startMcqPaper() {
    playClickSound();
    const contentSec = document.getElementById('content-section');

    // Sample 10 Questions
    const questions = [
        { q: "1. What is the capital of Sri Lanka?", options: ["Colombo", "Sri Jayawardenepura Kotte", "Kandy", "Galle"], ans: 1 },
        { q: "2. Which color is in Sri Lankan National Flag?", options: ["Yellow", "Purple", "Pink", "Black"], ans: 0 },
        { q: "3. How many letters are in English Alphabet?", options: ["24", "25", "26", "27"], ans: 2 },
        { q: "4. Water formula is?", options: ["CO2", "H2O", "O2", "N2"], ans: 1 },
        { q: "5. Which is a planet?", options: ["Sun", "Moon", "Earth", "Star"], ans: 2 },
        { q: "6. 5 + 7 = ?", options: ["10", "11", "12", "13"], ans: 2 },
        { q: "7. Largest ocean in the world?", options: ["Indian", "Pacific", "Atlantic", "Arctic"], ans: 1 },
        { q: "8. Sri Lanka gained independence in?", options: ["1948", "1950", "1972", "1980"], ans: 0 },
        { q: "9. Opposite word for 'Big'?", options: ["Large", "Small", "Tall", "High"], ans: 1 },
        { q: "10. Which is a fruit?", options: ["Carrot", "Apple", "Potato", "Onion"], ans: 1 }
    ];

    let questionsHTML = `
        <h2>Grade ${selectedGradeNum} - ${selectedSubjectName} (MCQ Paper)</h2>
        <p style="color: #28a745; font-weight: bold; margin-bottom: 20px;">🎉 Free MCQ Practice Paper</p>
        <form id="mcqForm" style="text-align: left; max-width: 600px; margin: 0 auto;">
    `;

    questions.forEach((item, index) => {
        questionsHTML += `
            <div style="margin-bottom: 20px; background: #f8f9fa; padding: 15px; border-radius: 8px;">
                <p style="font-weight: bold; margin-bottom: 10px;">${item.q}</p>
        `;
        item.options.forEach((opt, optIndex) => {
            questionsHTML += `
                <label style="display: block; margin-bottom: 5px; cursor: pointer;">
                    <input type="radio" name="q${index}" value="${optIndex}" required> ${opt}
                </label>
            `;
        });
        questionsHTML += `</div>`;
    });

    questionsHTML += `
            <button type="button" class="btn" style="background: #28a745;" onclick="calculateMcqScore()">Submit Answers</button>
        </form>
        <div id="quizResult" style="margin-top: 20px; font-size: 20px; font-weight: bold; color: #003366;"></div>
        <button onclick="showSubjectOptions('${selectedSubjectName}')" class="btn back-btn" style="max-width: 250px; margin-top: 20px;">⬅️ Back</button>
    `;

    contentSec.innerHTML = questionsHTML;
}

// 6. CALCULATE MCQ SCORE
function calculateMcqScore() {
    playClickSound();
    const correctAnswers = [1, 0, 2, 1, 2, 2, 1, 0, 1, 1]; // Answer Keys
    let score = 0;

    for (let i = 0; i < 10; i++) {
        const selected = document.querySelector(`input[name="q${i}"]:checked`);
        if (selected && parseInt(selected.value) === correctAnswers[i]) {
            score++;
        }
    }

    const resultDiv = document.getElementById('quizResult');
    resultDiv.innerHTML = `🎯 ඔයාගේ ලකුණු ප්‍රමාණය: 10 න් ${score} යි!`;
}

// 7. LESSON LOAD FUNCTION
function loadLesson(fileName, lessonTitle) {
    playClickSound();
    document.getElementById('lesson-selection').classList.add('hidden');
    
    const contentSec = document.getElementById('content-section');
    contentSec.classList.remove('hidden');

    contentSec.innerHTML = `
        <div>
            <h2 style="color: #003366; margin-bottom: 15px;">Grade 1 English - ${lessonTitle}</h2>
            
            <div style="margin: 15px 0; width: 100%; height: 650px; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 15px rgba(0,0,0,0.1); background: #fff;">
                <iframe src="${fileName}" style="width: 100%; height: 100%; border: none;"></iframe>
            </div>

            <button onclick="goBackToLessons()" class="btn back-btn" style="max-width: 250px; margin: 10px auto 0 auto;">
                ⬅️ Back to Lessons
            </button>
        </div>
    `;
}

// 8. PAYMENT SLIP SUBMIT FUNCTION
function handlePaymentSubmit(event) {
    event.preventDefault();
    const name = document.getElementById('studentName').value;
    alert(`ස්තූතියි ${name}! ඔයාගේ Grade ${selectedGradeNum} - ${selectedSubjectName} සඳහා Payment Slip එක ලැබුණා.`);
    location.reload();
}

// 9. BACK BUTTON NAVIGATION
function goBackToLessons() {
    playClickSound();
    document.getElementById('content-section').classList.add('hidden');
    document.getElementById('lesson-selection').classList.remove('hidden');
}

function goBackToSubjects() {
    playClickSound();
    document.getElementById('content-section').classList.add('hidden');
    document.getElementById('lesson-selection').classList.add('hidden');
    document.getElementById('subject-selection').classList.remove('hidden');
}

function goBackToGrades() {
    playClickSound();
    document.getElementById('subject-selection').classList.add('hidden');
    document.getElementById('grade-selection').classList.remove('hidden');
    selectedGradeNum = null;
    selectedSubjectName = null;
}