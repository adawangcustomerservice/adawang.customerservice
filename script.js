// Store form data
let formData = {
    fullname: '',
    email: '',
    phone: '',
    reference: '',
    amount: '',
    paymentmethod: '',
    notes: '',
    receipt: null,
    tacCode: ''
};

let currentStep = 1;
let generatedTAC = '';
const ADMIN_EMAIL = 'admin@adawang.com'; // TUKAR DENGAN EMAIL ANDA SEBENAR

// Initialize on page load
document.addEventListener('DOMContentLoaded', function() {
    setupFileUpload();
    setupFileUploadModal();
    setupNumericInput();
    updateSubmitDate();
});

// Update submit date in success page
function updateSubmitDate() {
    const now = new Date();
    const dateString = now.toLocaleDateString('ms-MY', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
    });
    const submitDateElement = document.getElementById('submitDate');
    if (submitDateElement) {
        submitDateElement.textContent = dateString;
    }
}

// File upload handling - Main Form
function setupFileUpload() {
    const fileUploadArea = document.getElementById('fileUploadArea');
    if (!fileUploadArea) return;
    
    const fileInput = document.getElementById('receipt');

    // Click to upload
    fileUploadArea.addEventListener('click', function() {
        fileInput.click();
    });

    // Drag and drop
    fileUploadArea.addEventListener('dragover', function(e) {
        e.preventDefault();
        fileUploadArea.style.borderColor = '#764ba2';
        fileUploadArea.style.background = 'rgba(118, 75, 162, 0.1)';
    });

    fileUploadArea.addEventListener('dragleave', function() {
        fileUploadArea.style.borderColor = '#667eea';
        fileUploadArea.style.background = 'rgba(102, 126, 234, 0.05)';
    });

    fileUploadArea.addEventListener('drop', function(e) {
        e.preventDefault();
        fileUploadArea.style.borderColor = '#667eea';
        fileUploadArea.style.background = 'rgba(102, 126, 234, 0.05)';
        
        const files = e.dataTransfer.files;
        if (files.length > 0) {
            fileInput.files = files;
            handleFileSelect();
        }
    });

    // File input change
    fileInput.addEventListener('change', handleFileSelect);
}

// File upload handling - Modal Form
function setupFileUploadModal() {
    const fileUploadArea = document.getElementById('fileUploadAreaModal');
    if (!fileUploadArea) return;
    
    const fileInput = document.getElementById('receiptModal');

    // Click to upload
    fileUploadArea.addEventListener('click', function() {
        fileInput.click();
    });

    // Drag and drop
    fileUploadArea.addEventListener('dragover', function(e) {
        e.preventDefault();
        fileUploadArea.style.borderColor = '#764ba2';
        fileUploadArea.style.background = 'rgba(118, 75, 162, 0.1)';
    });

    fileUploadArea.addEventListener('dragleave', function() {
        fileUploadArea.style.borderColor = '#667eea';
        fileUploadArea.style.background = 'rgba(102, 126, 234, 0.05)';
    });

    fileUploadArea.addEventListener('drop', function(e) {
        e.preventDefault();
        fileUploadArea.style.borderColor = '#667eea';
        fileUploadArea.style.background = 'rgba(102, 126, 234, 0.05)';
        
        const files = e.dataTransfer.files;
        if (files.length > 0) {
            fileInput.files = files;
            handleFileSelectModal();
        }
    });

    // File input change
    fileInput.addEventListener('change', handleFileSelectModal);
}

function handleFileSelect() {
    const fileInput = document.getElementById('receipt');
    const filePreview = document.getElementById('filePreview');
    const file = fileInput.files[0];

    filePreview.innerHTML = '';

    if (file) {
        if (!validateFile(file)) return;

        formData.receipt = file;
        displayFilePreview(file, filePreview);
        showMessage('✓ Fail berjaya dimuat naik', 'success');
    }
}

function handleFileSelectModal() {
    const fileInput = document.getElementById('receiptModal');
    const filePreview = document.getElementById('filePreviewModal');
    const file = fileInput.files[0];

    filePreview.innerHTML = '';

    if (file) {
        if (!validateFile(file)) {
            fileInput.value = '';
            return;
        }

        displayFilePreview(file, filePreview);
        showMessage('✓ Fail berjaya dimuat naik', 'success');
    }
}

function validateFile(file) {
    // Validate file size (5MB max)
    if (file.size > 5 * 1024 * 1024) {
        showMessage('❌ Saiz fail tidak boleh melebihi 5MB', 'error');
        return false;
    }

    // Validate file type
    const allowedTypes = ['image/jpeg', 'image/png', 'application/pdf'];
    if (!allowedTypes.includes(file.type)) {
        showMessage('❌ Format fail tidak disokong. Sila gunakan JPG, PNG atau PDF', 'error');
        return false;
    }

    return true;
}

function displayFilePreview(file, container) {
    const fileSize = (file.size / 1024).toFixed(2);
    const fileIcon = file.type === 'application/pdf' ? '📄' : '🖼️';
    
    const previewHTML = `
        <div class="file-preview-item">
            <div class="file-info-text">
                <span class="file-icon">${fileIcon}</span>
                <div>
                    <div class="file-name">${file.name}</div>
                    <div class="file-size">${fileSize} KB</div>
                </div>
            </div>
            <button type="button" class="remove-file" onclick="removeFile(this)">Buang</button>
        </div>
    `;
    
    container.innerHTML = previewHTML;
}

function removeFile(button) {
    const container = button.closest('.file-preview-item').parentElement;
    container.innerHTML = '';
    
    const receipt = document.getElementById('receipt');
    const receiptModal = document.getElementById('receiptModal');
    
    if (receipt) receipt.value = '';
    if (receiptModal) receiptModal.value = '';
    if (container === document.getElementById('filePreview')) {
        formData.receipt = null;
    }
    
    showMessage('🗑️ Fail telah dibuang', 'info');
}

// Setup numeric input for TAC
function setupNumericInput() {
    const tacInput = document.getElementById('taccode');
    if (tacInput) {
        tacInput.addEventListener('input', function() {
            this.value = this.value.replace(/[^0-9]/g, '').slice(0, 6);
        });
    }
}

// Step navigation
function nextStep() {
    if (currentStep === 1) {
        // Validate step 1
        const fullname = document.getElementById('fullname').value.trim();
        const email = document.getElementById('email').value.trim();
        const phone = document.getElementById('phone').value.trim();
        const reference = document.getElementById('reference').value.trim();
        const amount = document.getElementById('amount').value.trim();
        const paymentmethod = document.getElementById('paymentmethod').value;

        if (!fullname || !email || !phone || !reference || !amount || !paymentmethod) {
            showMessage('⚠️ Sila lengkapkan semua medan yang diperlukan', 'error');
            return;
        }

        if (!isValidEmail(email)) {
            showMessage('⚠️ Sila masukkan email yang sah', 'error');
            return;
        }

        if (!isValidPhone(phone)) {
            showMessage('⚠️ Sila masukkan nombor telefon yang sah (10-11 digit)', 'error');
            return;
        }

        if (isNaN(amount) || parseFloat(amount) <= 0) {
            showMessage('⚠️ Sila masukkan jumlah bayaran yang sah', 'error');
            return;
        }

        // Save data
        formData.fullname = fullname;
        formData.email = email;
        formData.phone = phone;
        formData.reference = reference;
        formData.amount = parseFloat(amount).toFixed(2);
        formData.paymentmethod = paymentmethod;

        // Update payment summary
        document.getElementById('summaryAmount').textContent = 'RM ' + formData.amount;
        document.getElementById('summaryMethod').textContent = formData.paymentmethod;
        document.getElementById('summaryRef').textContent = formData.reference;

        // Update payment instructions
        document.getElementById('instructionAmount').textContent = formData.amount;
        document.getElementById('instructionMethod').textContent = formData.paymentmethod;
        document.getElementById('instructionRef').textContent = formData.reference;

        // Update progress bar
        updateProgressBar(2);
        
        currentStep = 2;
        showStep(2);
        showMessage('✓ Maklumat berjaya disimpan', 'success');
    }
}

function prevStep() {
    if (currentStep > 1) {
        currentStep--;
        updateProgressBar(currentStep);
        showStep(currentStep);
    }
}

function updateProgressBar(step) {
    document.querySelectorAll('.progress-item').forEach((item, index) => {
        item.classList.remove('active', 'completed');
        if (index + 1 < step) {
            item.classList.add('completed');
        } else if (index + 1 === step) {
            item.classList.add('active');
        }
    });
}

function showStep(step) {
    // Hide all steps
    document.querySelectorAll('.form-step').forEach(el => {
        el.classList.remove('active');
    });

    // Show current step
    document.getElementById('step' + step).classList.add('active');

    // Scroll to top
    window.scrollTo(0, 0);
}

// Open Payment Confirmation Modal
function openPaymentModal() {
    const modal = document.getElementById('paymentModal');
    document.getElementById('modalAmount').textContent = formData.amount;
    document.getElementById('modalPaymentMethod').textContent = formData.paymentmethod;
    modal.classList.add('show');
}

function closePaymentModal() {
    document.getElementById('paymentModal').classList.remove('show');
}

function confirmPayment() {
    closePaymentModal();
    showLoading(true);

    setTimeout(() => {
        showLoading(false);
        openUploadModal();
    }, 1000);
}

// Upload After Payment Modal
function openUploadModal() {
    const modal = document.getElementById('uploadAfterPaymentModal');
    modal.classList.add('show');
}

function closeUploadModal() {
    document.getElementById('uploadAfterPaymentModal').classList.remove('show');
}

function uploadReceipt() {
    const fileInput = document.getElementById('receiptModal');
    const file = fileInput.files[0];
    const notes = document.getElementById('notesModal').value.trim();

    if (!file) {
        showMessage('⚠️ Sila pilih fail untuk dimuatkan', 'error');
        return;
    }

    showLoading(true);

    setTimeout(() => {
        formData.receipt = file;
        formData.notes = notes;

        showLoading(false);
        closeUploadModal();

        // Proceed to TAC step
        generatedTAC = generateTAC();
        sendEmailWithTAC(formData.email, formData.fullname, generatedTAC);

        document.getElementById('displayEmail').textContent = formData.email;
        updateProgressBar(3);

        currentStep = 3;
        showStep(3);

        showMessage('✓ Resit berjaya dimuat naik! Kod TAC telah dihantar ke email anda', 'success');
    }, 1500);
}

function skipUpload() {
    closeUploadModal();
    
    showMessage('💬 Sila hubungi Live Chat kami untuk bantuan memuat naik resit pembayaran', 'info');

    // Still proceed to TAC verification (without receipt)
    generatedTAC = generateTAC();
    sendEmailWithTAC(formData.email, formData.fullname, generatedTAC);

    document.getElementById('displayEmail').textContent = formData.email;
    updateProgressBar(3);

    currentStep = 3;
    showStep(3);
}

// Verify TAC
function verifyTAC() {
    const enteredTAC = document.getElementById('taccode').value.trim();

    if (!enteredTAC) {
        showMessage('⚠️ Sila masukkan kod TAC', 'error');
        return;
    }

    if (enteredTAC.length !== 6) {
        showMessage('⚠️ Kod TAC mesti 6 digit', 'error');
        return;
    }

    if (enteredTAC === generatedTAC) {
        showLoading(true);

        // Send all data to admin email
        setTimeout(() => {
            sendSubmissionToAdmin();
            showLoading(false);
            
            // Update progress bar
            updateProgressBar(4);
            
            currentStep = 4;
            showStep(4);
            
            // Generate reference number
            const refNumber = 'REF-' + Date.now();
            document.getElementById('refNumber').textContent = refNumber;
            
            showMessage('✓ Permohonan berjaya dihantar ke admin!', 'success');
        }, 1500);
    } else {
        showMessage('❌ Kod TAC tidak tepat. Sila cuba lagi', 'error');
    }
}

function resendTAC(e) {
    e.preventDefault();
    
    showLoading(true);
    
    setTimeout(() => {
        generatedTAC = generateTAC();
        sendEmailWithTAC(formData.email, formData.fullname, generatedTAC);
        
        showLoading(false);
        showMessage('✓ Kod TAC telah dihantar semula ke ' + formData.email, 'success');
    }, 1500);
}

// Reset form
function resetForm() {
    formData = {
        fullname: '',
        email: '',
        phone: '',
        reference: '',
        amount: '',
        paymentmethod: '',
        notes: '',
        receipt: null,
        tacCode: ''
    };

    currentStep = 1;
    generatedTAC = '';

    document.getElementById('customerForm').reset();
    document.getElementById('tacForm').reset();
    document.getElementById('filePreview').innerHTML = '';
    document.getElementById('filePreviewModal').innerHTML = '';
    
    // Reset progress bar
    updateProgressBar(1);

    showStep(1);
    showMessage('✓ Borang telah direset', 'success');
}

// Generate 6-digit TAC
function generateTAC() {
    return Math.floor(100000 + Math.random() * 900000).toString();
}

// Email functions (Frontend simulation - in production use backend)
function sendEmailWithTAC(email, name, tac) {
    const emailContent = {
        to: email,
        subject: '🔐 Kod TAC Adawang - ' + tac,
        body: `
Assalammualaikum ${name},

Terima kasih telah menghantar maklumat pembayaran anda kepada Adawang.

📌 KOD TAC ANDA: ${tac}

⏰ Kod ini akan tamat dalam 15 minit
🔒 Jangan berkongsi kod ini dengan sesiapa

Jika anda tidak menghantarkan permohonan ini, sila abaikan email ini.

---
Tim Adawang Customer Service
Hubungi: support@adawang.com
Tel: 1-800-123-4567
        `
    };

    // Log to console (in production, send via backend API)
    console.log('📧 EMAIL TAC DIKIRIM:', emailContent);
    console.log('TAC Code Generated:', tac);
    
    // Store in localStorage for demo purposes
    localStorage.setItem('lastTAC', tac);
    localStorage.setItem('tacEmail', email);
}

function sendSubmissionToAdmin() {
    // Prepare submission data
    const submissionData = {
        to: ADMIN_EMAIL,
        subject: '📋 Permohonan Pembayaran Baru - ' + formData.reference,
        body: `
╔════════════════════════════════════════════════════════╗
║           MAKLUMAT PEMBAYARAN BARU DITERIMA           ║
╚════════════════════════════════════════════════════════╝

👤 MAKLUMAT PELANGGAN:
   Nama: ${formData.fullname}
   Email: ${formData.email}
   Telefon: ${formData.phone}

💳 DETAIL PEMBAYARAN:
   Nombor Rujukan: ${formData.reference}
   Jumlah: RM ${formData.amount}
   Kaedah: ${formData.paymentmethod}

📝 CATATAN TAMBAHAN:
   ${formData.notes || 'Tiada'}

📎 RESIT:
   ${formData.receipt 
     ? `Fail: ${formData.receipt.name}\n   Saiz: ${(formData.receipt.size / 1024).toFixed(2)} KB\n   Status: ✓ Disahkan oleh pelanggan`
     : 'Pelanggan memilih untuk hantar resit melalui Live Chat'}

⏰ TARIKH PENGHANTARAN:
   ${new Date().toLocaleString('ms-MY', {
       weekday: 'long',
       year: 'numeric',
       month: 'long',
       day: 'numeric',
       hour: '2-digit',
       minute: '2-digit',
       second: '2-digit'
   })}

---
Sila semak dan memproses permohonan ini dengan segera.
        `,
        attachments: formData.receipt ? {
            filename: formData.receipt.name,
            size: formData.receipt.size,
            type: formData.receipt.type
        } : null
    };

    // Log to console (in production, send via backend API)
    console.log('📧 EMAIL ADMIN DIKIRIM:', submissionData);
    console.log('📋 DATA LENGKAP:', formData);
}

// Validation functions
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

function isValidPhone(phone) {
    // Malaysian phone numbers: 10-11 digits
    const phoneRegex = /^[0-9]{10,11}$/;
    const cleanPhone = phone.replace(/[^\d]/g, '');
    return phoneRegex.test(cleanPhone);
}

// UI helper functions
function showMessage(message, type = 'info') {
    const alert = document.getElementById('messageAlert');
    alert.textContent = message;
    alert.className = 'message-alert show ' + type;

    setTimeout(() => {
        alert.classList.remove('show');
    }, 4000);
}

function showLoading(show) {
    const spinner = document.getElementById('loadingSpinner');
    if (show) {
        spinner.classList.add('show');
    } else {
        spinner.classList.remove('show');
    }
}

// Close modal when clicking outside
window.addEventListener('click', function(event) {
    const paymentModal = document.getElementById('paymentModal');
    const uploadModal = document.getElementById('uploadAfterPaymentModal');
    
    if (event.target === paymentModal) {
        closePaymentModal();
    }
    if (event.target === uploadModal) {
        closeUploadModal();
    }
});
