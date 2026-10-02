// LocalStorage / Cloud sync helper storage keys
const STORAGE_KEY_STUDENTS = "brightbrain_students_v2";

// Default sample data if empty
function initDefaultData() {
    if (!localStorage.getItem(STORAGE_KEY_STUDENTS)) {
        const defaultStudents = [
            { id: "STU1001", name: "Prabhath Perera", grade: "7", phone: "0766980516", parent: "Sunil Perera", pass: "123456", slip: "No Slip", status: "Approved" },
            { id: "STU1002", name: "Kamal Silva", grade: "5", phone: "0771234567", parent: "Nimal Silva", pass: "1234", slip: "No Slip", status: "Pending" }
        ];
        localStorage.setItem(STORAGE_KEY_STUDENTS, JSON.stringify(defaultStudents));
    }
}
initDefaultData();

// Student Login Function
function handleLogin(event) {
    event.preventDefault();
    const inputId = document.getElementById('loginId').value.trim();
    const inputPass = document.getElementById('loginPassword').value.trim();

    let students = JSON.parse(localStorage.getItem(STORAGE_KEY_STUDENTS)) || [];
    let student = students.find(s => (s.id === inputId || s.phone === inputId) && s.pass === inputPass);

    if (student) {
        localStorage.setItem("current_student", JSON.stringify(student));
        alert("පිවිසීම සාර්ථකයි!");
        window.location.href = "subject_selection.html";
    } else {
        alert("වැරදි Student ID එකක් හෝ මුරපදයකි! කරුණාකර පරීක්ෂා කරන්න.");
    }
}

// Student Registration Function
function openRegModal() { document.getElementById('regModal').classList.remove('hidden'); }
function closeRegModal() { document.getElementById('regModal').classList.add('hidden'); }

function handleRegister(event) {
    event.preventDefault();
    let name = document.getElementById('regName').value;
    let grade = document.getElementById('regGrade').value;
    let phone = document.getElementById('regPhone').value;
    let parent = document.getElementById('regParent').value;
    let pass = document.getElementById('regPass').value;

    let students = JSON.parse(localStorage.getItem(STORAGE_KEY_STUDENTS)) || [];
    let newId = "STU" + (1000 + students.length + 1);

    let newStudent = {
        id: newId,
        name: name,
        grade: grade,
        phone: phone,
        parent: parent,
        pass: pass,
        slip: "No Slip",
        status: "Pending"
    };

    students.push(newStudent);
    localStorage.setItem(STORAGE_KEY_STUDENTS, JSON.stringify(students));
    alert("ලියාපදිංචිය සාර්ථකයි! ඔබේ Student ID එක: " + newId);
    closeRegModal();
    document.getElementById('regForm').reset();
}

// Subject Selection Redirection
function selectSubject(subjectName) {
    localStorage.setItem("selected_subject", subjectName);
    window.location.href = "classroom.html";
}

// Classroom Initialization
if (window.location.pathname.includes("classroom.html")) {
    let currentStudent = JSON.parse(localStorage.getItem("current_student"));
    let subject = localStorage.getItem("selected_subject") || "පංතිය";
    if (currentStudent) {
        document.getElementById('classroomTitle').innerText = subject + " පංතිය";
        document.getElementById('studentWelcome').innerText = "සාදරයෙන් පිළිගනිමු, " + currentStudent.name + " (" + currentStudent.id + ")";
    }
}

// Upload Payment Slip
function uploadPaymentSlip() {
    let fileInput = document.getElementById('slipFileInput');
    if (fileInput.files.length > 0) {
        let fileName = fileInput.files[0].name;
        let currentStudent = JSON.parse(localStorage.getItem("current_student"));
        
        let students = JSON.parse(localStorage.getItem(STORAGE_KEY_STUDENTS)) || [];
        let index = students.findIndex(s => s.id === currentStudent.id);
        if (index !== -1) {
            students[index].slip = fileName;
            students[index].status = "Pending Approval";
            localStorage.setItem(STORAGE_KEY_STUDENTS, JSON.stringify(students));
            localStorage.setItem("current_student", JSON.stringify(students[index]));
        }

        document.getElementById('slipStatusMsg').innerText = "Slip එක සාර්ථකව Upload විය! Admin අනුමැතිය බලාපොරොත්තු වන්න.";
    } else {
        alert("කරුණාකර මුලින් Slip පින්තූරයක් තෝරන්න.");
    }
}

function playVideo() {
    let currentStudent = JSON.parse(localStorage.getItem("current_student"));
    if (currentStudent && currentStudent.status === "Approved") {
        alert("වීඩියෝ පාඩම වාදනය වේ...");
    } else {
        alert("ඔබේ ගෙවීම් පත්‍රිකාව තවම Admin විසින් අනුමත කර (Approved) නැත!");
    }
}

// Admin Panel Load Data
if (window.location.pathname.includes("admin.html")) {
    loadAdminTables();
}

function loadAdminTables() {
    let students = JSON.parse(localStorage.getItem(STORAGE_KEY_STUDENTS)) || [];
    let tbody = document.getElementById('adminStudentTableBody');
    if (!tbody) return;
    tbody.innerHTML = "";

    students.forEach((stu, idx) => {
        let tr = document.createElement('tr');
        tr.innerHTML = `
            <td class="p-3 font-semibold">${stu.id}</td>
            <td class="p-3">${stu.name}</td>
            <td class="p-3">Grade ${stu.grade}</td>
            <td class="p-3">${stu.phone}</td>
            <td class="p-3">${stu.pass}</td>
            <td class="p-3"><span class="text-xs bg-slate-200 px-2 py-1 rounded">${stu.slip}</span></td>
            <td class="p-3"><span class="font-bold ${stu.status === 'Approved' ? 'text-emerald-600' : 'text-amber-600'}">${stu.status}</span></td>
            <td class="p-3 space-x-1">
                <button onclick="approveStudent(${idx})" class="bg-emerald-600 text-white px-2.5 py-1 rounded text-xs font-semibold hover:bg-emerald-700">Approve</button>
                <button onclick="deleteStudent(${idx})" class="bg-red-500 text-white px-2.5 py-1 rounded text-xs font-semibold hover:bg-red-600">Delete</button>
            </td>
        `;
        tbody.appendChild(tr);
    });

    // MCQ Marks Report Table Mock
    let marksTbody = document.getElementById('adminMarksTableBody');
    if (marksTbody) {
        marksTbody.innerHTML = `
            <tr>
                <td class="p-3">STU1001</td>
                <td class="p-3">Prabhath Perera</td>
                <td class="p-3">Grade 7</td>
                <td class="p-3">MCQ Paper 01</td>
                <td class="p-3 font-bold text-emerald-600">100%</td>
            </tr>
        `;
    }
}

function approveStudent(index) {
    let students = JSON.parse(localStorage.getItem(STORAGE_KEY_STUDENTS)) || [];
    students[index].status = "Approved";
    localStorage.setItem(STORAGE_KEY_STUDENTS, JSON.stringify(students));
    loadAdminTables();
    alert("ශිෂ්‍යයා අනුමත කරන ලදී!");
}

function deleteStudent(index) {
    let students = JSON.parse(localStorage.getItem(STORAGE_KEY_STUDENTS)) || [];
    students.splice(index, 1);
    localStorage.setItem(STORAGE_KEY_STUDENTS, JSON.stringify(students));
    loadAdminTables();
}