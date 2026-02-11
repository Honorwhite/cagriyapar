document.addEventListener('DOMContentLoaded', () => {
    const appointmentForm = document.getElementById('appointmentForm');
    const formResponse = document.getElementById('formResponse');
    const submitBtn = document.getElementById('submitBtn');
    const submitBtnText = submitBtn.querySelector('span');

    // API URL - Change this to your production API URL if different
    const API_URL = 'https://randevu-backend-cagri.vercel.app/api/randevu'; // Example Vercel URL
    // For local testing: const API_URL = 'http://localhost:3000/api/randevu';

    if (appointmentForm) {
        appointmentForm.addEventListener('submit', async (e) => {
            e.preventDefault();

            // Reset UI
            formResponse.style.display = 'none';
            formResponse.className = '';
            submitBtn.disabled = true;
            submitBtnText.textContent = 'Gönderiliyor...';

            try {
                // Get reCAPTCHA token
                const token = await grecaptcha.execute('6Lejz2csAAAAAB5S4391S10BSzcZCSLkWqfGYtfb', {
                    action: 'contact_form'
                });

                // Get form data
                const formData = new FormData(appointmentForm);
                const data = Object.fromEntries(formData.entries());
                data.captcha = token;

                // Send request
                const response = await fetch(API_URL, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(data)
                });

                const result = await response.json();

                if (result.success) {
                    // Success
                    formResponse.textContent = result.message;
                    formResponse.style.backgroundColor = '#d4edda';
                    formResponse.style.color = '#155724';
                    formResponse.style.border = '1px solid #c3e6cb';
                    formResponse.style.display = 'block';
                    appointmentForm.reset();
                } else {
                    // Error from server
                    throw new Error(result.message || 'Bir hata oluştu.');
                }

            } catch (error) {
                console.error('Form hatası:', error);
                formResponse.textContent = error.message || 'Mesaj iletilemedi. Lütfen daha sonra tekrar deneyin veya telefonla arayın.';
                formResponse.style.backgroundColor = '#f8d7da';
                formResponse.style.color = '#721c24';
                formResponse.style.border = '1px solid #f5c6cb';
                formResponse.style.display = 'block';
            } finally {
                submitBtn.disabled = false;
                submitBtnText.textContent = 'Gönder';
            }
        });
    }
});
