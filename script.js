let currentStep = 1;

function showStep(step) {
    // Sembunyikan semua step
    document.querySelectorAll('.form-step').forEach(el => {
        el.classList.remove('active');
    });
    // Kemas kini Progress Bar lingkaran jinjang
    document.querySelectorAll('.progress-item').forEach((el, index) => {
        if (index + 1 <= step) {
            el.classList.add('active');
        } else {
            el.classList.remove('active');
        }
    });

    // Paparkan step semasa
    const activeStep = document.getElementById(`step${step}`);
    if (activeStep) {
        activeStep.classList.add('active');
    }

    // Gerakkan progress line fill
    const progressLine = document.getElementById('progressLine');
    if (progressLine) {
        progressLine.style.width = ((step - 1) / 3) * 100 + '%';
    }
}

function nextStep() {
    // Validasi form sebelum ke langkah seterusnya
    if (currentStep === 1) {
        const fullname = document.getElementById('fullname').value;
        const email = document.getElementById('email').value;
        const phone = document.getElementById('phone').value;
        const reference = document.getElementById('reference').value;
        const amount = document.getElementById('amount').value;
        const paymentmethod = document.getElementById('paymentmethod').value;

        if (!fullname || !email || !phone || !reference || !amount || !paymentmethod) {
            alert("Sila isi semua maklumat yang berbintang (*) sebelum meneruskan.");
            return;
        }
        
        // Kemas kini paparan email di Step 3
        const displayEmail = document.getElementById('displayEmail');
        if (displayEmail) {
            displayEmail.innerText = email;
        }
    }

    if (currentStep < 4) {
        currentStep++;
        showStep(currentStep);
    }
}

function prevStep() {
    if (currentStep > 1) {
        currentStep--;
        showStep(currentStep);
    }
}

function submitForm() {
    const receipt = document.getElementById('receipt').files[0];
    if (!receipt) {
        alert("Sila muat naik resit pembayaran anda terlebih dahulu.");
        return;
    }
    
    // Papar spinner loading sekejap untuk simulasi hantar data
    const spinner = document.getElementById('loadingSpinner');
    if (spinner) {
        spinner.style.display = 'flex';
        setTimeout(() => {
            spinner.style.display = 'none';
            currentStep = 3;
            showStep(currentStep);
        }, 1500);
    } else {
        currentStep = 3;
        showStep(currentStep);
    }
}

function verifyTAC() {
    const taccode = document.getElementById('taccode').value;
    if (taccode.length !== 6) {
        alert("Sila masukkan kod TAC 6-digit yang sah.");
        return;
    }

    const spinner = document.getElementById('loadingSpinner');
    if (spinner) {
        spinner.style.display = 'flex';
        setTimeout(() => {
            spinner.style.display = 'none';
            currentStep = 4;
            showStep(currentStep);
        }, 1500);
    } else {
        currentStep = 4;
        showStep(currentStep);
    }
}

// Event listener untuk file upload preview ringkas
document.addEventListener('DOMContentLoaded', () => {
    const fileInput = document.getElementById('receipt');
    const filePreview = document.getElementById('filePreview');
    
    if (fileInput && filePreview) {
        fileInput.addEventListener('change', (e) => {
            const file = e.target.files[0];
            if (file) {
                filePreview.innerHTML = `<p style="color: #2d3748; margin-top: 10px;"><b>Fail terpilih:</b> ${file.name} (${(file.size/1024/1024).toFixed(2)} MB)</p>`;
            }
        });
    }
});
