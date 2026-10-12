import { supabase } from '../config/supabase-client.js';

// ==================================================
// 1. DOM ELEMENT SELECTION
// ==================================================
const authBackBtn = document.getElementById('authBackBtn');
const progressBarFill = document.getElementById('progressBarFill');
const progressStepText = document.getElementById('progressStepText');
const progressPercentText = document.getElementById('progressPercentText');
const phaseSubtitleText = document.getElementById('phaseSubtitleText');

const phase1 = document.getElementById('phase1');
const phase2 = document.getElementById('phase2');
const phase3 = document.getElementById('phase3');
const phase4 = document.getElementById('phase4');
const phase5 = document.getElementById('phase5');
const phase6 = document.getElementById('phase6');

const firstNameInput = document.getElementById('firstName');
const lastNameInput = document.getElementById('lastName');
const usernameInput = document.getElementById('usernameInput');
const emailInput = document.getElementById('userEmail');
const passwordInput = document.getElementById('userPassword');
const togglePasswordBtn = document.getElementById('togglePasswordBtn');
const termsCheck = document.getElementById('termsCheck');
const validationAlert = document.getElementById('validationAlert');

const btnNextPhase1 = document.getElementById('btnNextPhase1');
const btnNextPhase2 = document.getElementById('btnNextPhase2');
const btnVerifyOtp = document.getElementById('btnVerifyOtp');
const btnNextPhase4 = document.getElementById('btnNextPhase4');
const btnSetPassword = document.getElementById('btnSetPassword');
const btnSaveAvatar = document.getElementById('btnSaveAvatar');

const segments = [
    document.getElementById('seg-1'),
    document.getElementById('seg-2'),
    document.getElementById('seg-3'),
    document.getElementById('seg-4')
];
const strengthStatusText = document.getElementById('strengthStatusText');

const otpBoxes = document.querySelectorAll('.otp-box-input');
const sentEmailDisplay = document.getElementById('sentEmailDisplay');
const timerDisplay = document.getElementById('timerDisplay');
const resendOtpBtn = document.getElementById('resendOtpBtn');

// Global Onboarding State
let currentStep = 1;
let firstName = '';
let lastName = '';
let username = '';
let userEmail = '';
let isUsernameAvailable = false;
let isOAuthUser = false;
let timerInterval = null;
let selectedAvatarUrl = '/src/assets/images/avatars/avatar-1.svg';

// ==================================================
// 2. HELPER FUNCTIONS & PROGRESS BAR
// ==================================================
// ==================================================
// HELPER FUNCTIONS & THEME SVGs
// ==================================================
const alertIcons = {
    error: `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#f87171" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" style="vertical-align: middle; margin-right: 8px; flex-shrink: 0;"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="8" x2="12" y2="12"></line><line x1="12" y1="16" x2="12.01" y2="16"></line></svg>`,
    success: `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#34d399" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" style="vertical-align: middle; margin-right: 8px; flex-shrink: 0;"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg>`
};

function showAlert(message, isError = true) {
    if (!validationAlert) return;
    validationAlert.style.display = 'flex';
    validationAlert.style.alignItems = 'center';
    validationAlert.style.background = isError ? 'rgba(239, 68, 68, 0.15)' : 'rgba(16, 185, 129, 0.15)';
    validationAlert.style.borderColor = isError ? 'rgba(239, 68, 68, 0.3)' : 'rgba(16, 185, 129, 0.3)';
    validationAlert.style.color = isError ? '#f87171' : '#34d399';
    
    const icon = isError ? alertIcons.error : alertIcons.success;
    validationAlert.innerHTML = `${icon}<span>${message}</span>`;
}

function hideAlert() {
    if (validationAlert) validationAlert.style.display = 'none';
}

function updateProgress(step) {
    currentStep = step;
    hideAlert();

    if (isOAuthUser) {
        // OAuth 4-Step Sequence: 1. Name -> 2. Username -> 3. Password -> 4. Avatar
        const oauthTitles = { 
            1: "Step 1 of 4: Confirm Name",
            4: "Step 2 of 4: Choose Username", 
            5: "Step 3 of 4: Create Password", 
            6: "Step 4 of 4: Personalize Avatar" 
        };
        const oauthPercentages = { 1: "25%", 4: "50%", 5: "75%", 6: "100%" };

        if (progressStepText) {
            if (step === 1) progressStepText.innerText = "Step 1 of 4";
            else if (step === 4) progressStepText.innerText = "Step 2 of 4";
            else if (step === 5) progressStepText.innerText = "Step 3 of 4";
            else progressStepText.innerText = "Step 4 of 4";
        }
        if (progressPercentText) progressPercentText.innerText = oauthPercentages[step] || "100%";
        if (progressBarFill) progressBarFill.style.width = oauthPercentages[step] || "100%";
        if (phaseSubtitleText) phaseSubtitleText.innerText = oauthTitles[step] || "Complete Profile";
    } else {
        const titles = {
            1: "Step 1: Personal Details",
            2: "Step 2: Email & Authentication",
            3: "Step 3: Verify OTP Code",
            4: "Step 4: Choose Username",
            5: "Step 5: Create Password",
            6: "Step 6: Personalize Avatar"
        };
        const percentages = { 1: "16%", 2: "33%", 3: "50%", 4: "66%", 5: "83%", 6: "100%" };

        if (progressStepText) progressStepText.innerText = `Step ${step} of 6`;
        if (progressPercentText) progressPercentText.innerText = percentages[step];
        if (progressBarFill) progressBarFill.style.width = percentages[step];
        if (phaseSubtitleText) phaseSubtitleText.innerText = titles[step];
    }

    const phases = [phase1, phase2, phase3, phase4, phase5, phase6];
    phases.forEach((phase, index) => {
        if (phase) {
            if (index + 1 === step) phase.classList.add('active');
            else phase.classList.remove('active');
        }
    });
}

// ==================================================
// 3. OAUTH REDIRECT INTERCEPTOR
// ==================================================
// ==================================================
// OAUTH REDIRECT INTERCEPTOR (STEP-BY-STEP SOCIAL FLOW)
// ==================================================
async function checkOAuthSession() {
    const { data: { session } } = await supabase.auth.getSession();

    if (session && session.user) {
        const user = session.user;
        const metadata = user.user_metadata || {};

        // If they already completed setup previously, redirect to workspace
        if (metadata.username && metadata.username !== 'pending_setup') {
            window.location.href = '../pages/courses.html';
            return;
        }

        isOAuthUser = true;

        // Extract social metadata
        const googleFirstName = metadata.given_name || metadata.custom_first_name || (metadata.full_name ? metadata.full_name.split(' ')[0] : 'User');
        const googleSurname = metadata.family_name || metadata.custom_last_name || (metadata.full_name ? metadata.full_name.split(' ').slice(1).join(' ') : '');
        const socialAvatar = metadata.picture || metadata.avatar_url;

        firstName = googleFirstName;
        lastName = googleSurname;

        if (firstNameInput) firstNameInput.value = firstName;
        if (lastNameInput) lastNameInput.value = googleSurname;

        // Setup the separate social avatar container for Phase 6 later
        const defaultWrapper = document.getElementById('defaultAvatarWrapper');
        const defaultBtn = document.getElementById('defaultSocialAvatarBtn');
        const defaultImg = document.getElementById('defaultSocialAvatarImg');

        if (socialAvatar && defaultWrapper && defaultBtn && defaultImg) {
            defaultImg.src = socialAvatar;
            defaultBtn.setAttribute('data-avatar', socialAvatar);
            defaultWrapper.style.display = 'block';
            
            // Make social DP active by default and clear local grid active state
            document.querySelectorAll('.avatar-option').forEach(c => c.classList.remove('active'));
            defaultBtn.classList.add('active');
            selectedAvatarUrl = socialAvatar;

            defaultBtn.addEventListener('click', () => {
                document.querySelectorAll('.avatar-option').forEach(c => c.classList.remove('active'));
                defaultBtn.classList.add('active');
                selectedAvatarUrl = socialAvatar;
            });
        }

        // Start OAuth users at Phase 1 (First & Surname confirmation)
        updateProgress(1);
        showAlert('Social account linked! Please confirm your name below.', false);
    }
}

document.addEventListener('DOMContentLoaded', () => {
    checkOAuthSession();

    document.querySelectorAll('.avatar-option').forEach(card => {
        card.addEventListener('click', () => {
            document.querySelectorAll('.avatar-option').forEach(c => c.classList.remove('active'));
            card.classList.add('active');
            selectedAvatarUrl = card.getAttribute('data-avatar');
        });
    });
});

document.querySelectorAll('.btn-google-signup').forEach(btn => {
    btn.addEventListener('click', () => handleOAuth('google'));
});
document.querySelectorAll('.btn-github-signup').forEach(btn => {
    btn.addEventListener('click', () => handleOAuth('github'));
});

async function handleOAuth(provider) {
    const fName = firstNameInput ? firstNameInput.value.trim() : '';
    const lName = lastNameInput ? lastNameInput.value.trim() : '';
    const { error } = await supabase.auth.signInWithOAuth({
        provider,
        options: {
            redirectTo: `${window.location.origin}/src/auth/signup.html`,
            data: { custom_first_name: fName, custom_last_name: lName }
        }
    });
    if (error) showAlert(`OAuth Error: ${error.message}`, true);
}

// ==================================================
// 4. STEP NAVIGATION & FORM VALIDATION
// ==================================================
if (authBackBtn) {
    authBackBtn.addEventListener('click', (e) => {
        if (currentStep > 1) {
            e.preventDefault();
            if (isOAuthUser && currentStep === 4) return;
            updateProgress(currentStep - 1);
        }
    });
}

if (btnNextPhase1) {
    btnNextPhase1.addEventListener('click', () => {
        firstName = firstNameInput ? firstNameInput.value.trim() : '';
        lastName = lastNameInput ? lastNameInput.value.trim() : '';
        if (!firstName) { showAlert('Please enter your First Name to continue.', true); return; }

        if (isOAuthUser) {
            // Social users jump directly to Username (Phase 4) as Step 2
            updateProgress(4); 
        } else {
            updateProgress(2);
        }
    });
}

// ==================================================
// PHASE 2: SEND OTP & CHECK EMAIL STATUS
// ==================================================
if (btnNextPhase2) {
    btnNextPhase2.addEventListener('click', async () => {
        userEmail = emailInput ? emailInput.value.trim().toLowerCase() : '';
        if (!userEmail || !userEmail.includes('@')) { 
            showAlert('Please enter a valid email address.', true); 
            return; 
        }

        btnNextPhase2.disabled = true;
        try {
            // 1. Call the secure Postgres function to check if fully registered
            const { data: status, error: rpcError } = await supabase.rpc('check_email_status', { 
                email_input: userEmail 
            });

            if (rpcError) throw rpcError;

            console.log("🔍 Database Status Result:", status);

            // 2. Block ONLY if they have fully completed a prior registration
            if (status.exists && status.is_fully_registered) {
                showAlert(`An account with this email already exists. <a href="login.html" style="color: #00aaff; text-decoration: underline; font-weight: 700;">Log in instead</a>`, true);
                btnNextPhase2.disabled = false;
                return;
            }

            // 3. If they abandoned the flow earlier (username is null), let them reuse the email and send a fresh OTP!
            const { error: otpError } = await supabase.auth.signInWithOtp({
                email: userEmail,
                options: { shouldCreateUser: true }
            });
            
            if (otpError) throw otpError;
            
            if (sentEmailDisplay) sentEmailDisplay.innerText = userEmail;
            updateProgress(3);
            start2MinTimer();
        } catch (err) { 
            showAlert(`${err.message}`, true); 
        } finally { 
            btnNextPhase2.disabled = false; 
        }
    });
}

function start2MinTimer() {
    let timeLeft = 120;
    if (resendOtpBtn) resendOtpBtn.disabled = true;
    clearInterval(timerInterval);
    timerInterval = setInterval(() => {
        timeLeft--;
        const mins = String(Math.floor(timeLeft / 60)).padStart(2, '0');
        const secs = String(timeLeft % 60).padStart(2, '0');
        if (timerDisplay) timerDisplay.innerText = `${mins}:${secs}`;
        if (timeLeft <= 0) {
            clearInterval(timerInterval);
            if (timerDisplay) timerDisplay.innerText = "00:00";
            if (resendOtpBtn) resendOtpBtn.disabled = false;
        }
    }, 1000);
}

otpBoxes.forEach((box, index) => {
    box.addEventListener('input', (e) => {
        if (e.target.value.length === 1 && index < otpBoxes.length - 1) otpBoxes[index + 1].focus();
    });
    box.addEventListener('keydown', (e) => {
        if (e.key === 'Backspace' && !box.value && index > 0) otpBoxes[index - 1].focus();
    });
    box.addEventListener('paste', (e) => {
        const pasteData = (e.clipboardData || window.clipboardData).getData('text').trim();
        if (/^\d{6}$/.test(pasteData)) {
            e.preventDefault();
            pasteData.split('').forEach((char, i) => { if (otpBoxes[i]) otpBoxes[i].value = char; });
        }
    });
});

if (resendOtpBtn) {
    resendOtpBtn.addEventListener('click', async () => {
        await supabase.auth.signInWithOtp({ email: userEmail });
        start2MinTimer();
    });
}

if (btnVerifyOtp) {
    btnVerifyOtp.addEventListener('click', async () => {
        let token = '';
        otpBoxes.forEach(box => token += box.value);
        if (token.length !== 6) { showAlert('Please enter all 6 digits of your verification code.', true); return; }

        try {
            const { error } = await supabase.auth.verifyOtp({ email: userEmail, token: token, type: 'email' });
            if (error) throw error;
            clearInterval(timerInterval);

            const fName = firstNameInput ? firstNameInput.value.trim() : 'User';
            const lName = lastNameInput ? lastNameInput.value.trim() : '';
            const fullName = `${fName} ${lName}`.trim();

            // Mark user as verified with initial details upon correct OTP entry
            await supabase.auth.updateUser({
                data: {
                    first_name: fName,
                    surname: lName,
                    display_name: fullName,
                    otp_verified: true, // <--- Tracks that OTP was successfully passed
                    username: null,
                    avatar_url: '/src/assets/images/avatars/avatar-1.svg'
                }
            });

            updateProgress(4);
        } catch (err) { showAlert(`Verification failed: ${err.message}`, true); }
    });
}

// Phase 4 Username Live Availability Check
let usernameTimeout = null;
if (usernameInput) {
    usernameInput.addEventListener('input', () => {
        clearTimeout(usernameTimeout);
        let val = usernameInput.value.trim().toLowerCase();
        usernameInput.value = val;

        if (!val || val.length < 3 || val.length > 20 || !/^[a-z0-9._]+$/.test(val)) {
            showAlert('Username must be 3-20 characters long and contain only letters, numbers, dots, or underscores.', true);
            isUsernameAvailable = false;
            return;
        }

        usernameTimeout = setTimeout(async () => {
            try {
                // Call our secure Postgres function to check username in auth.users metadata
                const { data: usernameExists, error } = await supabase.rpc('check_username_exists', { 
                    username_input: val 
                });

                if (error) throw error;

                if (usernameExists) {
                    showAlert(`Username <strong>@${val}</strong> is already taken.`, true);
                    isUsernameAvailable = false;
                } else {
                    showAlert(`<strong>@${val}</strong> is available!`, false);
                    isUsernameAvailable = true;
                }
            } catch (err) {
                console.error('Username check error:', err);
            }
        }, 400);
    });
}

if (btnNextPhase4) {
    btnNextPhase4.addEventListener('click', () => {
        username = usernameInput ? usernameInput.value.trim() : '';
        if (!username || !isUsernameAvailable) { 
            showAlert('Please choose a valid and available username.', true); 
            return; 
        }
        updateProgress(5); // Moves to Password Creation (Step 3 for social)
    });
}

if (togglePasswordBtn && passwordInput) {
    togglePasswordBtn.addEventListener('click', () => {
        const isPassword = passwordInput.type === 'password';
        passwordInput.type = isPassword ? 'text' : 'password';
        togglePasswordBtn.innerHTML = isPassword
            ? `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"></path><line x1="1" y1="1" x2="23" y2="23"></line></svg>`
            : `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path><circle cx="12" cy="12" r="3"></circle></svg>`;
    });
}

if (passwordInput) {
    passwordInput.addEventListener('input', () => {
        const val = passwordInput.value;
        let score = 0;
        if (val.length >= 8) score++;
        if (/[A-Z]/.test(val)) score++;
        if (/[0-9]/.test(val)) score++;
        if (/[^A-Za-z0-9]/.test(val)) score++;

        const colors = ['#ef4444', '#f59e0b', '#00aaff', '#10b981'];
        const textLabels = ['Weak', 'Fair', 'Good', 'Strong'];
        segments.forEach((seg, index) => {
            if (seg) seg.style.backgroundColor = (val.length > 0 && index < score) ? colors[score - 1] : 'rgba(255, 255, 255, 0.1)';
        });
        if (strengthStatusText) {
            strengthStatusText.innerText = val.length === 0 ? 'Enter password' : textLabels[Math.max(0, score - 1)];
            strengthStatusText.style.color = val.length === 0 ? '#64748b' : colors[Math.max(0, score - 1)];
        }
    });
}

if (btnSetPassword) {
    btnSetPassword.addEventListener('click', async () => {
        const pwd = passwordInput ? passwordInput.value : '';
        if (!pwd || pwd.length < 6) { showAlert('Password must be at least 6 characters long.', true); return; }
        if (termsCheck && !termsCheck.checked) { showAlert('You must agree to the Terms of Service.', true); return; }

        btnSetPassword.disabled = true;
        try {
            const { error } = await supabase.auth.updateUser({ password: pwd });
            if (error) throw error;

            // Move to Phase 6 (Avatar Selection & Finalize as Step 4)
            updateProgress(6);
        } catch (err) { 
            showAlert(`Failed to save password: ${err.message}`, true); 
        } finally { 
            btnSetPassword.disabled = false; 
        }
    });
}

if (btnSaveAvatar) {
    btnSaveAvatar.addEventListener('click', async () => {
        btnSaveAvatar.disabled = true;
        btnSaveAvatar.style.opacity = '0.7';

        try {
            const { data: { user }, error: userErr } = await supabase.auth.getUser();

            if (userErr || !user) {
                showAlert('Session expired. Please log in again.', true);
                btnSaveAvatar.disabled = false;
                btnSaveAvatar.style.opacity = '1';
                return;
            }

            if (termsCheck && !termsCheck.checked) {
                showAlert('You must agree to the Terms of Service to continue.', true);
                btnSaveAvatar.disabled = false;
                btnSaveAvatar.style.opacity = '1';
                return;
            }

            const finalFirstName = firstName || firstNameInput?.value.trim() || user?.user_metadata?.first_name || 'User';
            const finalLastName = lastName || lastNameInput?.value.trim() || user?.user_metadata?.surname || '';
            const finalUsername = usernameInput?.value.trim() || username;
            const finalAvatar = selectedAvatarUrl || '/src/assets/images/avatars/avatar-1.svg';

            // Push the remaining profile information and final choices to Auth metadata
            const { error: updateErr } = await supabase.auth.updateUser({
                data: { 
                    first_name: finalFirstName, 
                    surname: finalLastName, 
                    username: finalUsername, 
                    avatar_url: finalAvatar 
                }
            });

            if (updateErr) {
                console.error('Auth Metadata Update Error:', updateErr);
                showAlert(`Update Failed: ${updateErr.message}`, true);
                btnSaveAvatar.disabled = false;
                btnSaveAvatar.style.opacity = '1';
                return;
            }

            showAlert('Account configured! Redirecting...', false);
            setTimeout(() => {
                window.location.href = '../pages/courses.html';
            }, 800);

        } catch (err) {
            console.error('Avatar onboarding error:', err);
            showAlert(`Error: ${err.message}`, true);
            btnSaveAvatar.disabled = false;
            btnSaveAvatar.style.opacity = '1';
        }
    });
}
