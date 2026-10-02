function handleLogin(event) {
    event.preventDefault();
    const id = document.getElementById('loginId').value;
    const pass = document.getElementById('loginPassword').value;

    if (id && pass) {
        // සාර්ථක පිවිසීමෙන් පසු Subject Selection පිටුවට යැවීම
        window.location.href = "subject-selection.html";
    } else {
        alert("කරුණාකර සියලුම තොරතුරු නිවැරදිව පුරවන්න.");
    }
}

function toggleModal(show) {
    const modal = document.getElementById('regModal');
    if (show) {
        modal.classList.remove('hidden');
    } else {
        modal.classList.add('hidden');
    }
}

function handleRegister(event) {
    event.preventDefault();
    alert("ලියාපදිංචිය සාර්ථකයි! දැන් ඔබට පිවිසිය හැක.");
    toggleModal(false);
}