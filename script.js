// Variables
let paymentProcessed = false;

// Inisialisasi - Tampilkan Pop-ups saat halaman dimuat
document.addEventListener('DOMContentLoaded', function() {
    // Tampilkan warning popup dulu
    showWarningPopup();
    
    // Tampilkan achievement popup setelah 3 detik
    setTimeout(showAchievementPopup, 3000);

    // Update summary saat user menginput data
    document.getElementById('borrowerName').addEventListener('change', updateSummary);
    document.getElementById('icNumber').addEventListener('change', updateSummary);
    document.getElementById('loanAmount').addEventListener('change', updateSummary);
});

// Pop-up Functions
function showWarningPopup() {
    const popup = document.getElementById('warningPopup');
    popup.classList.add('show');
}

function closeWarningPopup() {
    const popup = document.getElementById('warningPopup');
    popup.classList.remove('show');
}

function showAchievementPopup() {
    const popup = document.getElementById('achievementPopup');
    popup.classList.add('show');
}

function closeAchievementPopup() {
    const popup = document.getElementById('achievementPopup');
    popup.classList.remove('show');
}

// Update Payment Summary
function updateSummary() {
    const name = document.getElementById('borrowerName').value || '-';
    const ic = document.getElementById('icNumber').value || '-';
    const amount = parseFloat(document.getElementById('loanAmount').value) || 0;

    document.getElementById('summaryName').textContent = name;
    document.getElementById('summaryIC').textContent = ic;
    document.getElementById('summaryAmount').textContent = 'RM ' + amount.toFixed(2);
}

// Submit Payment
function submitPayment() {
    // Validasi
    const name = document.getElementById('borrowerName').value.trim();
    const ic = document.getElementById('icNumber').value.trim();
    const amount = parseFloat(document.getElementById('loanAmount').value);
    const confirmed = document.getElementById('confirmPayment').checked;

    // Validation checks
    if (!name) {
        alert('❌ Sila masukkan nama peminjam!');
        return;
    }

    if (!ic) {
        alert('❌ Sila masukkan nombor KP atau akaun!');
        return;
    }

    if (!amount || amount <= 0) {
        alert('❌ Sila masukkan jumlah bayaran yang sah!');
        return;
    }

    if (!confirmed) {
        alert('❌ Sila tandakan checkbox untuk mengesahkan pembayaran!');
        return;
    }

    // All validations passed
    showSuccessMessage(name, amount);
}

// Success Message
function showSuccessMessage(name, amount) {
    const successHTML = `
        <div class="popup-overlay show" id="successPopup">
            <div class="popup-content" style="text-align: center;">
                <div class="popup-header" style="background: linear-gradient(135deg, #4caf50 0%, #45a049 100%);">
                    <h2 style="color: white; margin: 0;">✅ Pembayaran Berjaya!</h2>
                </div>
                <div class="popup-body">
                    <p style="font-size: 16px; margin: 20px 0;">
                        Terima kasih <strong>${name}</strong>!
                    </p>
                    <p style="font-size: 24px; font-weight: bold; color: #4caf50; margin: 20px 0;">
                        RM ${amount.toFixed(2)}
                    </p>
                    <p style="color: #666; margin: 20px 0;">
                        Pembayaran anda telah diterima dan sedang diproses.
                    </p>
                    <p style="color: #999; font-size: 12px; margin: 20px 0;">
                        Anda akan menerima notifikasi emel dalam 2-3 jam.
                    </p>
                </div>
                <button class="popup-btn" onclick="closeSuccessAndReset()" style="margin: 0 25px 25px 25px; width: auto;">
                    Kembali ke Halaman Utama
                </button>
            </div>
        </div>
    `;

    document.body.insertAdjacentHTML('beforeend', successHTML);
}

// Close Success and Reset Form
function closeSuccessAndReset() {
    const popup = document.getElementById('successPopup');
    if (popup) {
        popup.remove();
    }

    // Reset form
    document.getElementById('borrowerName').value = '';
    document.getElementById('icNumber').value = '';
    document.getElementById('loanAmount').value = '';
    document.getElementById('confirmPayment').checked = false;

    updateSummary();
    
    // Scroll to top
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

// Open Live Chat (Crisp)
function openLiveChat() {
    if (window.$crisp) {
        window.$crisp.push(["do", "chat:open"]);
    } else {
        alert('💬 Fitur live chat sedang dimuatkan. Sila cuba lagi dalam beberapa s`

