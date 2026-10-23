// components.js - Codify Shared Components, Global Search Engine, & Navbar Auth Management

import { supabase } from '/src/js/config/supabase-client.js';

const currentPath = window.location.pathname;

// 1. Sign Out Logic (Exposed Globally)
window.handleSignOut = async function () {
    try {
        const { error } = await supabase.auth.signOut();
        if (error) throw error;
        localStorage.clear();
        window.location.href = '/login';
    } catch (error) {
        console.error('Error signing out:', error.message);
    }
};

// 2. Toggle Dropdown Menu Visibility (Prevents navigation & closes search)
window.toggleProfileMenu = function (event) {
    if (event) {
        event.preventDefault();
        event.stopPropagation();
    }

    // Close search dropdown if open
    const searchResults = document.getElementById('globalSearchResults');
    if (searchResults) searchResults.style.display = 'none';

    const dropdown = document.getElementById('profileDropdownMenu');
    if (dropdown) {
        dropdown.classList.toggle('active');
    }
};

// 3. Close Dropdown when clicking outside
document.addEventListener('click', (event) => {
    const profileMenu = document.getElementById('userProfileMenu');
    const dropdown = document.getElementById('profileDropdownMenu');

    if (profileMenu && dropdown && !profileMenu.contains(event.target)) {
        dropdown.classList.remove('active');
    }
});

// 4. Inject the Top Navigation Bar & Global Search matching Codify Theme (Fixed Position)
document.getElementById('navbar-placeholder').innerHTML = `
    <header class="codify-main-header" style="position: fixed; top: 0; left: 0; width: 100%; z-index: 1000;">
        <div class="codify-header-container">
            <div class="codify-left-group">
                <div class="codify-logo" onclick="window.location.href='/'" role="button" tabindex="0" aria-label="Codify Homepage">
                    <img src="/src/assets/logos/main-logo.svg" alt="Codify Logo" class="logo-icon">
                    <span class="logo-text">Codify</span>
                </div>
            </div>

            <button class="codify-mobile-menu-toggle" id="codifyMobileMenuToggle" type="button" aria-label="Open navigation menu" aria-controls="navLinks" aria-expanded="false"><span></span><span></span><span></span></button>

            <nav class="codify-center-nav" id="codifyCenterNav" aria-label="Main navigation menu">
                <ul class="codify-nav-links" id="navLinks">
                    <li><a href="/" class="${currentPath === '/' || currentPath === '/index.html' ? 'active-link' : ''}">Home</a></li>
                    <li><a href="/courses" class="${currentPath.startsWith('/courses') ? 'active-link' : ''}">Courses</a></li>
                    <li><a href="/quick-notes" class="${currentPath.startsWith('/quick-notes') ? 'active-link' : ''}">Quick Notes</a></li>
                    <li><a href="/exam" class="${currentPath === '/exam' ? 'active-link' : ''}">Exams</a></li>
                    <li><a href="/certificate" class="${currentPath === '/certificate' ? 'active-link' : ''}">Certificates</a></li>
                    <li><a href="/about" class="${currentPath === '/about' ? 'active-link' : ''}">About</a></li>
                    <li><a href="/contact" class="${currentPath === '/contact' ? 'active-link' : ''}">Contact</a></li>
                </ul>
            </nav>

            <div class="codify-right-group">
                <!-- Codify Themed Search Box with Glassmorphism Dropdown & Keyboard SVG Icon -->
                <div class="codify-search-box">
                    <svg class="search-box-icon" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
                        <circle cx="11" cy="11" r="8"></circle>
                        <path d="m21 21-4.3-4.3"></path>
                    </svg>
                    <input type="text" id="globalSiteSearch" placeholder="Search everything..." autocomplete="off" aria-label="Global Search">
                    <span class="search-kbd-icon" title="Quick Search Shortcut">
                        <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                            <rect width="20" height="16" x="2" y="4" rx="2" ry="2"></rect>
                            <path d="M6 8h.001"></path>
                            <path d="M10 8h.001"></path>
                            <path d="M14 8h.001"></path>
                            <path d="M18 8h.001"></path>
                            <path d="M6 12h.001"></path>
                            <path d="M10 12h.001"></path>
                            <path d="M14 12h.001"></path>
                            <path d="M18 12h.001"></path>
                            <path d="M7 16h10"></path>
                        </svg>
                    </span>
                    
                    <!-- Structured Glassmorphism Dropdown Results -->
                    <div id="globalSearchResults" class="codify-search-dropdown"></div>
                </div>

                <div class="codify-auth-group" id="authNavGroup">
                    <a href="/login" class="codify-btn-outline" title="Login">Login</a>
                    <a href="/signup" class="codify-btn-outline" title="Signup">Signup</a>
                </div>
            </div>
        </div>
    </header>
`;

// Accessible mobile navigation toggle
const mobileMenuToggle = document.getElementById('codifyMobileMenuToggle');
const mainHeader = document.querySelector('.codify-main-header');
if (mobileMenuToggle && mainHeader) {
    mobileMenuToggle.addEventListener('click', () => {
        const isOpen = mainHeader.classList.toggle('mobile-nav-open');
        mobileMenuToggle.setAttribute('aria-expanded', String(isOpen));
        mobileMenuToggle.setAttribute('aria-label', isOpen ? 'Close navigation menu' : 'Open navigation menu');
    });

    document.querySelectorAll('#navLinks a').forEach(link => {
        link.addEventListener('click', () => {
            mainHeader.classList.remove('mobile-nav-open');
            mobileMenuToggle.setAttribute('aria-expanded', 'false');
            mobileMenuToggle.setAttribute('aria-label', 'Open navigation menu');
        });
    });

    document.addEventListener('click', event => {
        if (mainHeader.classList.contains('mobile-nav-open') && !mainHeader.contains(event.target)) {
            mainHeader.classList.remove('mobile-nav-open');
            mobileMenuToggle.setAttribute('aria-expanded', 'false');
            mobileMenuToggle.setAttribute('aria-label', 'Open navigation menu');
        }
    });

    document.addEventListener('keydown', event => {
        if (event.key === 'Escape') {
            mainHeader.classList.remove('mobile-nav-open');
            mobileMenuToggle.setAttribute('aria-expanded', 'false');
            mobileMenuToggle.setAttribute('aria-label', 'Open navigation menu');
        }
    });
}

// Inject custom cyberpunk scrollbar & badge styling dynamically
const cyberScrollStyle = document.createElement('style');
cyberScrollStyle.textContent = `
    #globalSearchResults::-webkit-scrollbar {
        width: 6px;
    }
    #globalSearchResults::-webkit-scrollbar-track {
        background: rgba(13, 27, 42, 0.5);
        border-radius: 8px;
    }
    #globalSearchResults::-webkit-scrollbar-thumb {
        background: rgba(0, 170, 255, 0.4);
        border-radius: 8px;
    }
    #globalSearchResults::-webkit-scrollbar-thumb:hover {
        background: rgba(0, 170, 255, 0.7);
    }
    #engAvatar.has-photo {
        padding: 0;
        overflow: hidden;
    }
    #engAvatar .eng-avatar-img {
        width: 100%;
        height: 100%;
        object-fit: cover;
        object-position: center top;
        display: block;
    }
    .eng-badge-wrapper {
        margin: 10px;
        display: inline-block;
    }
    .team-leader-badge {
        background: linear-gradient(90deg, rgba(0, 170, 255, 0.2), rgba(0, 119, 255, 0.3));
        border: 1px solid rgba(0, 170, 255, 0.6);
        color: #00aaff;
        font-size: 0.7rem;
        font-weight: 800;
        padding: 3px 10px;
        border-radius: 999px;
        text-transform: uppercase;
        letter-spacing: 0.5px;
        box-shadow: 0 0 10px rgba(0, 170, 255, 0.25);
    }
`;
document.head.appendChild(cyberScrollStyle);

// 5. Inject the Footer & Engineer Modal
document.getElementById('footer-placeholder').innerHTML = `
    <footer class="codify-footer">
        <div>
            Built with precision for future developers • Developed by
            <span class="team-hover-wrapper" tabindex="0" role="button" aria-haspopup="true" aria-expanded="false">
                <span class="team-trigger">Codify Team</span>

                <div class="team-popover" role="tooltip">
                    <div class="popover-header">Core Engineers</div>
                    <ul class="team-list">
                        <li class="team-member interactive" onclick="openEngineerModal('owais')" style="font-weight: 700;">
                            <span class="member-dot"></span><span class="member-name">Mohammed Owais</span> <span class="student-id">(24030-CM-193)</span>
                        </li>
                        <li class="team-member interactive" onclick="openEngineerModal('dhanush')">
                            <span class="member-dot"></span><span class="member-name">M. Dhanush</span> <span class="student-id">(24030-CM-188)</span>
                        </li>
                        <li class="team-member interactive" onclick="openEngineerModal('feroz')">
                            <span class="member-dot"></span><span class="member-name">MD. Feroz Basha</span> <span class="student-id">(24030-CM-190)</span>
                        </li>
                        <li class="team-member interactive" onclick="openEngineerModal('basha')">
                            <span class="member-dot"></span><span class="member-name">M. Basha</span> <span class="student-id">(24030-CM-189)</span>
                        </li>
                        <li class="team-member interactive" onclick="openEngineerModal('prasad')">
                            <span class="member-dot"></span><span class="member-name">M. Prasad</span> <span class="student-id">(24030-CM-196)</span>
                        </li>
                    </ul>
                </div>
            </span>
        </div>
    </footer>

    <!-- ENGINEER MODAL -->
    <div class="modal-overlay" id="engineerModal" aria-hidden="true">
        <div class="modal-card">
            <button class="modal-close-btn" id="closeEngineerModal" aria-label="Close">✕</button>
            
            <div class="eng-modal-profile">
                <div id="engAvatar" class="eng-avatar"></div>
                <h2 id="engName" class="eng-name">Name</h2>
                <div id="engBadgeContainer" class="eng-badge-wrapper" style="display: none;">
                    <span id="engBadge" class="team-leader-badge"></span>
                </div>
                <p id="engId" class="eng-id" style="margin-top: 8px;">ID</p>
                <span id="engRole" class="eng-role">Role</span>
            </div>

            <div class="eng-bio-box">
                <p id="engBio">Bio goes here...</p>
            </div>

            <div class="eng-actions">
                <a href="#" id="engEmail" class="codify-btn-outline">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" width="16" height="16" style="vertical-align: middle; margin-right: 6px;"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline></svg> Email
                </a>
                <a href="#" id="engGithub" class="codify-btn-outline" target="_blank">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" width="16" height="16" style="vertical-align: middle; margin-right: 6px;"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path></svg> GitHub
                </a>
            </div>
        </div>
    </div>
`;

// Keep the engineer dialog outside footer stacking contexts so its backdrop
// blurs every page layer, including the fixed top navigation on the home page.
const engineerModalElement = document.getElementById('engineerModal');
if (engineerModalElement && engineerModalElement.parentElement !== document.body) {
    document.body.appendChild(engineerModalElement);
}

const teamDatabase = {
    'owais': {
        name: 'Mohammed Owais',
        badge: 'Project Lead & Architect',
        initials: 'MO',
        photo: '/src/assets/images/mohammed-owais.webp',
        id: '24030-CM-193',
        role: 'Lead Architect & Full-Stack Developer',
        bio: 'Bringing the platform to life from scratch, Mohammed single-handedly drives Codify from concept to deployment. He oversees everything from creative ideation and intuitive front-end UI design to rigorous testing, maintenance, robust back-end architecture, APIs, database connectivity, and security protocols.',
        email: 'mailto:mohdowais.28.01.2009@gmail.com',
        github: 'https://github.com/mohammed-owais-dev'
    },
    'dhanush': {
        name: 'M. Dhanush',
        badge: '',
        initials: 'MD',
        photo: '/src/assets/images/m-dhanush.webp',
        id: '24030-CM-188',
        role: 'Lead QA & Systems Testing Engineer',
        bio: 'Dhanush spearheads quality assurance and rigorous testing protocols across Codify. By meticulously identifying bugs, evaluating interface responsiveness, and validating user workflows, he ensures a seamless, secure, and bulletproof learning experience for every student.',
        email: 'mailto:dhanush@codify.com',
        github: 'https://github.com/mdhanush'
    },
    'feroz': {
        name: 'Feroz',
        badge: '',
        initials: 'FZ',
        photo: '/src/assets/images/feroz.webp',
        id: '24030-CM-190',
        role: 'Lead Curriculum & Technical Notes Writer',
        bio: 'Feroz leads the creation of comprehensive learning materials and rapid revision notes for Codify. By breaking down complex computer science concepts into clear, structured, and student-friendly chapters, he empowers learners to master technical tracks efficiently.',
        email: 'mailto:feroz@codify.com',
        github: 'https://github.com/feroz'
    },
    'basha': {
        name: 'Basha',
        badge: '',
        initials: 'BS',
        photo: '/src/assets/images/basha.webp',
        id: '24030-CM-189',
        role: 'Lead Assessment & Exam Content Developer',
        bio: 'Basha designs and formulates rigorous evaluation materials and exam questions for Codify. By crafting challenging scenario-based quizzes and comprehensive tests, he ensures students can accurately measure their mastery and readiness across every course track.',
        email: 'mailto:basha@codify.com',
        github: 'https://github.com/basha'
    },
    'prasad': {
        name: 'Prasad',
        badge: '',
        initials: 'PR',
        photo: '/src/assets/images/prasad.webp',
        id: '24030-CM-196',
        role: 'Lead Quick Notes & Revision Content Writer',
        bio: 'Prasad crafts concise, high-impact quick notes and rapid revision cards for Codify. By distilling complex chapters into streamlined, high-yield summary points, he enables students to review critical concepts and master technical tracks swiftly.',
        email: 'mailto:prasad@codify.com',
        github: 'https://github.com/prasad'
    }
};

const engModal = document.getElementById('engineerModal');
const closeEngBtn = document.getElementById('closeEngineerModal');

window.openEngineerModal = function (memberKey) {
    const engineer = teamDatabase[memberKey];
    if (!engineer) return;

    // Avatar: show photo if available, otherwise fall back to initials
    const avatarEl = document.getElementById('engAvatar');
    avatarEl.textContent = '';
    avatarEl.classList.remove('has-photo');

    if (engineer.photo) {
        const img = document.createElement('img');
        img.src = engineer.photo;
        img.alt = engineer.name;
        img.className = 'eng-avatar-img';
        img.loading = 'lazy';
        img.onerror = () => {
            avatarEl.classList.remove('has-photo');
            avatarEl.textContent = engineer.initials;
        };
        avatarEl.classList.add('has-photo');
        avatarEl.appendChild(img);
    } else {
        avatarEl.textContent = engineer.initials;
    }
    document.getElementById('engName').textContent = engineer.name;

    const badgeContainer = document.getElementById('engBadgeContainer');
    const badgeEl = document.getElementById('engBadge');

    if (engineer.badge) {
        badgeEl.textContent = engineer.badge;
        badgeContainer.style.display = 'block';
    } else {
        badgeContainer.style.display = 'none';
    }

    document.getElementById('engId').textContent = `Student ID: ${engineer.id}`;
    document.getElementById('engRole').textContent = engineer.role;
    document.getElementById('engBio').textContent = engineer.bio;

    const emailLink = document.getElementById('engEmail');

    const recipient = engineer.email.replace(/^mailto:/i, '');

    emailLink.href =
        `https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(recipient)}`;

    emailLink.target = '_blank';
    emailLink.rel = 'noopener noreferrer';

    document.getElementById('engGithub').href = engineer.github;

    engModal.classList.add('show');
    document.body.style.overflow = 'hidden';
};

function closeEngineerModal() {
    engModal.classList.remove('show');
    document.body.style.overflow = '';
}

if (closeEngBtn) closeEngBtn.addEventListener('click', closeEngineerModal);
if (engModal) engModal.addEventListener('click', (e) => { if (e.target === engModal) closeEngineerModal(); });

// 6. Render Dynamic Navbar Authentication State & Profile Dropdown
async function renderNavbarAuth() {
    const authNavGroup = document.getElementById('authNavGroup');
    if (!authNavGroup) return;

    try {
        const { data: { session } } = await supabase.auth.getSession();
        const user = session?.user;

        if (user) {
            const userMetaData = user.user_metadata || {};
            const avatarUrl = userMetaData.avatar_url;
            const firstName = userMetaData.first_name || userMetaData.given_name || user.email.split('@')[0];
            const surname = userMetaData.surname || '';
            const fullName = `${firstName} ${surname}`.trim();
            const username = userMetaData.username ? `@${userMetaData.username}` : `@${user.email.split('@')[0]}`;
            const email = user.email || 'user@codify.com';
            const dpInitial = firstName.charAt(0).toUpperCase();

            const btnAvatarHtml = avatarUrl
                ? `<img src="${avatarUrl}" alt="${fullName}" style="width: 38px; height: 38px; border-radius: 50%; object-fit: cover; border: 2px solid #00aaff;">`
                : `<span class="initial-badge" style="width: 38px; height: 38px; border-radius: 50%; background: rgba(0,170,255,0.2); color: #00aaff; display: flex; align-items: center; justify-content: center; font-weight: 800; border: 2px solid #00aaff;">${dpInitial}</span>`;

            const dropdownHeaderAvatarHtml = avatarUrl
                ? `<img src="${avatarUrl}" alt="${fullName}" style="width: 60px; height: 60px; border-radius: 50%; object-fit: cover;">`
                : `${dpInitial}`;

            authNavGroup.innerHTML = `
                <div class="user-profile-menu" id="userProfileMenu" style="position: relative; display: inline-block;">
                    <button type="button" class="profile-avatar-btn" onclick="toggleProfileMenu(event)" aria-label="User Profile Menu" style="background: none; border: none; padding: 0; cursor: pointer; display: flex; align-items: center;">
                        ${btnAvatarHtml}
                    </button>

                    <div class="profile-dropdown-menu" id="profileDropdownMenu" style="position: absolute; top: calc(100% + 12px); right: 0; width: 280px; background: rgba(13, 27, 42, 0.95); border: 1px solid rgba(0, 170, 255, 0.35); border-radius: 16px; backdrop-filter: blur(16px); box-shadow: 0 15px 35px rgba(0, 0, 0, 0.7), 0 0 20px rgba(0, 170, 255, 0.15); padding: 16px; display: flex; flex-direction: column; z-index: 3000;">
                        
                        <div class="dropdown-header" style="display: flex; align-items: center; gap: 14px; padding-bottom: 12px; border-bottom: 1px solid rgba(0, 170, 255, 0.15); margin-bottom: 8px;">
                            <div class="dropdown-avatar-container" style="width: 60px; height: 60px; border-radius: 50%; overflow: hidden; border: 2px solid #00aaff; display: flex; align-items: center; justify-content: center; background: rgba(0, 170, 255, 0.15); color: #00aaff; font-weight: 800; font-size: 1.1rem; flex-shrink: 0;">
                                ${dropdownHeaderAvatarHtml}
                            </div>
                            <div class="dropdown-user-details" style="display: flex; flex-direction: column; overflow: hidden;">
                                <span class="dropdown-user-name" style="font-size: 1rem; font-weight: 800; color: #ffffff; white-space: nowrap; overflow: hidden; text-overflow: ellipsis;">${fullName}</span>
                                <span class="dropdown-user-handle" style="font-size: 0.82rem; color: #00aaff; font-weight: 700;">${username}</span>
                                <span class="dropdown-user-email" style="font-size: 0.75rem; color: #94a3b8; word-break: break-all; margin-top: 1px;">${email}</span>
                            </div>
                        </div>

                        <div class="dropdown-body" style="display: flex; flex-direction: column; gap: 4px;">
                            <a href="/profile" class="dropdown-item" style="display: flex; align-items: center; gap: 12px; padding: 10px 12px; border-radius: 10px; color: #cbd5e1; text-decoration: none; font-size: 0.9rem; font-weight: 600; transition: all 0.2s ease;">
                                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#00aaff" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>
                                Profile Settings
                            </a>

                            <a href="/certificate" class="dropdown-item" style="display: flex; align-items: center; gap: 12px; padding: 10px 12px; border-radius: 10px; color: #cbd5e1; text-decoration: none; font-size: 0.9rem; font-weight: 600; transition: all 0.2s ease;">
                                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#00aaff" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="8" r="6"></circle><path d="M15.477 12.89 17 22l-5-3-5 3 1.523-9.11"></path></svg>
                                Achievements
                            </a>

                            <a href="/activity" class="dropdown-item" style="display: flex; align-items: center; gap: 12px; padding: 10px 12px; border-radius: 10px; color: #cbd5e1; text-decoration: none; font-size: 0.9rem; font-weight: 600; transition: all 0.2s ease;">
                                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#00aaff" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"></polyline></svg>
                                Activity
                            </a>

                            <a href="/account-security" class="dropdown-item" style="display: flex; align-items: center; gap: 12px; padding: 10px 12px; border-radius: 10px; color: #cbd5e1; text-decoration: none; font-size: 0.9rem; font-weight: 600; transition: all 0.2s ease;">
                                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#00aaff" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect><path d="M7 11V7a5 5 0 0 1 10 0v4"></path></svg>
                                Account Security
                            </a>

                            <div class="dropdown-divider" style="height: 1px; background: rgba(0, 170, 255, 0.15); margin: 8px 0;"></div>

                            <button type="button" class="dropdown-item logout-btn" onclick="handleSignOut()" style="display: flex; align-items: center; gap: 12px; padding: 10px 12px; border-radius: 10px; color: #f87171; text-decoration: none; font-size: 0.9rem; font-weight: 600; background: transparent; border: none; width: 100%; text-align: left; cursor: pointer; transition: all 0.2s ease;">
                                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#ef4444" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path><polyline points="16 17 21 12 16 7"></polyline><line x1="21" y1="12" x2="9" y2="12"></line></svg>
                                Logout
                            </button>
                        </div>
                    </div>
                </div>
            `;
        } else {
            authNavGroup.innerHTML = `
                <a href="/login" class="codify-btn-outline">Login</a>
                <a href="/signup" class="codify-btn-outline">Signup</a>
            `;
        }
    } catch (error) {
        console.error('Navbar Auth initialization failed:', error);
    } finally {
        authNavGroup.classList.add('ready');
    }
}

// 7. Global Search Engine: courses, lessons, quick notes, exams, and site pages
setTimeout(() => {
    const searchInput = document.getElementById('globalSiteSearch');
    const searchResults = document.getElementById('globalSearchResults');
    let masterSearchIndex = null;
    let currentFocus = -1;
    let debounceTimer;

    const staticPages = [
        { title: 'Home Dashboard', category: 'Home', url: '/', keywords: 'homepage dashboard start learning' },
        { title: 'All Courses', category: 'Courses', url: '/courses', keywords: 'course catalog learning modules' },
        { title: 'Quick Notes Library', category: 'Quick Notes', url: '/quick-notes', keywords: 'revision notes summaries chapters' },
        { title: 'Exams & Assessments', category: 'Exams', url: '/exam', keywords: 'test assessment final exam practice' },
        { title: 'Certificates', category: 'Certificates', url: '/certificate', keywords: 'credentials achievements awards' },
        { title: 'About Codify', category: 'About', url: '/about', keywords: 'about story mission developer technology platform features' },
        { title: 'Contact & Support', category: 'Support', url: '/contact', keywords: 'help contact feedback support team' },
        { title: 'My Profile', category: 'Account', url: '/profile', keywords: 'profile settings personal account' },
        { title: 'My Activity', category: 'Account', url: '/activity', keywords: 'progress history activity learning' },
        { title: 'Account Security', category: 'Account', url: '/account-security', keywords: 'password security login account' },
        { title: 'Login', category: 'Account', url: '/login', keywords: 'sign in authenticate' },
        { title: 'Sign Up', category: 'Account', url: '/signup', keywords: 'register create account' }
    ];

    const syllabusFiles = [
        { path: '/src/data/html-syllabus.json', slug: 'html', name: 'HTML' },
        { path: '/src/data/css-syllabus.json', slug: 'css', name: 'CSS' },
        { path: '/src/data/javascript-syllabus.json', slug: 'javascript', name: 'JavaScript' },
        { path: '/src/data/java-syllabus.json', slug: 'java', name: 'Java' },
        { path: '/src/data/python-syllabus.json', slug: 'python', name: 'Python' },
        { path: '/src/data/c-syllabus.json', slug: 'c', name: 'C' },
        { path: '/src/data/cpp-syllabus.json', slug: 'cpp', name: 'C++' }
    ];

    async function loadMasterIndex() {
        if (masterSearchIndex) return masterSearchIndex;
        const index = [...staticPages];

        const loaded = await Promise.allSettled(syllabusFiles.map(async course => {
            const response = await fetch(course.path);
            if (!response.ok) throw new Error('Could not load ' + course.path);
            return { course, data: await response.json() };
        }));

        loaded.forEach(result => {
            if (result.status !== 'fulfilled') {
                console.warn('A course could not be added to search:', result.reason);
                return;
            }

            const course = result.value.course;
            const data = result.value.data;
            const courseTitle = (data.course_title || course.name).replace(/\s+(Course|Index|Syllabus).*/i, '').trim() || course.name;
            const chapters = Array.isArray(data.chapters) ? data.chapters : [];

            index.push({
                title: course.name + ' Course',
                category: 'Courses',
                url: '/courses/' + course.slug,
                keywords: courseTitle + ' course learn lessons syllabus'
            });
            index.push({
                title: course.name + ' Quick Notes',
                category: 'Quick Notes',
                url: '/quick-notes/' + course.slug,
                keywords: courseTitle + ' revision notes summary'
            });
            index.push({
                title: course.name + ' Exam',
                category: 'Exams',
                url: '/exam/' + course.slug,
                keywords: courseTitle + ' assessment test questions final exam'
            });

            chapters.forEach((chapter, chapterIndex) => {
                const chapterNumber = chapter.chapter_number || chapterIndex + 1;
                const chapterTitle = chapter.chapter_title || ('Chapter ' + chapterNumber);

                index.push({
                    title: course.name + ': ' + chapterTitle,
                    category: 'Course Chapter',
                    url: '/courses/' + course.slug + '/' + chapterNumber + '.1',
                    keywords: courseTitle + ' chapter ' + chapterNumber + ' ' + chapterTitle + ' lesson'
                });
                index.push({
                    title: course.name + ' Quick Notes: Chapter ' + chapterNumber + ' — ' + chapterTitle,
                    category: 'Quick Notes',
                    url: '/quick-notes/' + course.slug + '/' + chapterNumber,
                    keywords: courseTitle + ' revision notes summary chapter ' + chapterNumber + ' ' + chapterTitle
                });

                (Array.isArray(chapter.topics) ? chapter.topics : []).forEach(topic => {
                    const topicTitle = topic.title || 'Untitled topic';
                    const filePath = typeof topic.file === 'string' ? topic.file : '';
                    const fileName = filePath.split('/').pop() || '';
                    const lessonId = topic.id || fileName.split('-')[0] || (chapterNumber + '.1');

                    index.push({
                        title: topicTitle,
                        category: course.name + ' Lesson',
                        url: '/courses/' + course.slug + '/' + lessonId,
                        keywords: courseTitle + ' ' + chapterTitle + ' ' + fileName.replace(/\.md$/i, '').replace(/[._-]/g, ' ') + ' lesson tutorial'
                    });
                });
            });
        });

        index.push(
            { title: 'My Certificates', category: 'Certificates', url: '/certificates/my-certificates.html', keywords: 'earned certificates credentials' },
            { title: 'Course Enrollment', category: 'Courses', url: '/courses', keywords: 'enroll enrollment join course' }
        );

        const seen = new Set();
        masterSearchIndex = index.filter(item => {
            if (!item.title || !item.url) return false;
            const key = (item.title + '|' + item.url).toLowerCase();
            if (seen.has(key)) return false;
            seen.add(key);
            item.searchText = (item.title + ' ' + item.category + ' ' + (item.keywords || '') + ' ' + item.url).toLowerCase();
            return true;
        });
        return masterSearchIndex;
    }

    function removeActive(rows) {
        Array.from(rows || []).forEach(row => row.classList.remove('search-item-active'));
    }

    function renderResults(matches, query) {
        searchResults.replaceChildren();
        if (!matches.length) {
            searchResults.style.display = 'block';
            const empty = document.createElement('div');
            empty.className = 'search-no-results';
            empty.textContent = 'No results found for "' + query + '"';
            searchResults.appendChild(empty);
            return;
        }

        searchResults.style.display = 'block';
        const fragment = document.createDocumentFragment();
        matches.slice(0, 30).forEach((item, idx) => {
            const row = document.createElement('button');
            row.type = 'button';
            row.className = 'search-result-row';
            row.style.cssText = 'width:100%;background:transparent;color:inherit;font:inherit;text-align:left;cursor:pointer;';
            row.setAttribute('role', 'option');
            row.setAttribute('aria-selected', 'false');

            const title = document.createElement('span');
            title.className = 'search-result-title';
            title.textContent = item.title;

            const badge = document.createElement('span');
            badge.className = 'search-result-badge';
            badge.textContent = item.category;
            row.append(title, badge);

            row.addEventListener('mouseenter', () => {
                removeActive(searchResults.children);
                currentFocus = idx;
                row.classList.add('search-item-active');
            });
            row.addEventListener('click', () => { window.location.href = item.url; });
            fragment.appendChild(row);
        });
        searchResults.appendChild(fragment);
    }

    if (searchInput && searchResults) {
        searchInput.setAttribute('role', 'combobox');
        searchInput.setAttribute('aria-controls', 'globalSearchResults');
        searchInput.setAttribute('aria-expanded', 'false');
        searchResults.setAttribute('role', 'listbox');

        searchInput.addEventListener('input', function () {
            clearTimeout(debounceTimer);
            currentFocus = -1;
            const query = this.value.toLowerCase().trim();
            const profileDropdown = document.getElementById('profileDropdownMenu');
            if (profileDropdown) profileDropdown.classList.remove('active');

            debounceTimer = setTimeout(async () => {
                if (!query) {
                    searchResults.replaceChildren();
                    searchResults.style.display = 'none';
                    searchInput.setAttribute('aria-expanded', 'false');
                    return;
                }

                searchResults.style.display = 'block';
                searchResults.innerHTML = '<div class="search-no-results">Searching Codify…</div>';
                searchInput.setAttribute('aria-expanded', 'true');

                const database = await loadMasterIndex();
                const words = query.split(/\s+/).filter(Boolean);
                const matches = database.map(item => {
                    const text = item.searchText || (item.title + ' ' + item.category + ' ' + (item.keywords || '') + ' ' + item.url).toLowerCase();
                    if (!words.every(word => text.includes(word))) return null;
                    const title = item.title.toLowerCase();
                    const score = (title === query ? 100 : 0)
                        + (title.startsWith(query) ? 30 : 0)
                        + (title.includes(query) ? 20 : 0)
                        + (item.category.toLowerCase().includes(query) ? 8 : 0);
                    return Object.assign({}, item, { score });
                }).filter(Boolean).sort((a, b) => b.score - a.score || a.title.localeCompare(b.title));

                renderResults(matches, query);
            }, 80);
        });

        searchInput.addEventListener('keydown', function (event) {
            const rows = searchResults.querySelectorAll('.search-result-row');
            if (searchResults.style.display !== 'block' || !rows.length) {
                if (event.key === 'Escape') {
                    searchResults.style.display = 'none';
                    searchInput.setAttribute('aria-expanded', 'false');
                }
                return;
            }

            if (event.key === 'ArrowDown') {
                currentFocus = (currentFocus + 1) % rows.length;
                removeActive(rows);
                rows[currentFocus].classList.add('search-item-active');
                rows[currentFocus].scrollIntoView({ block: 'nearest' });
                event.preventDefault();
            } else if (event.key === 'ArrowUp') {
                currentFocus = currentFocus <= 0 ? rows.length - 1 : currentFocus - 1;
                removeActive(rows);
                rows[currentFocus].classList.add('search-item-active');
                rows[currentFocus].scrollIntoView({ block: 'nearest' });
                event.preventDefault();
            } else if (event.key === 'Enter') {
                if (currentFocus >= 0 && rows[currentFocus]) {
                    event.preventDefault();
                    rows[currentFocus].click();
                } else if (rows.length === 1) {
                    event.preventDefault();
                    rows[0].click();
                }
            } else if (event.key === 'Escape') {
                searchResults.style.display = 'none';
                searchInput.setAttribute('aria-expanded', 'false');
                searchInput.blur();
            }
        });

        document.addEventListener('keydown', event => {
            if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === 'k') {
                event.preventDefault();
                searchInput.focus();
                searchInput.select();
            }
        });

        document.addEventListener('click', event => {
            if (!searchInput.contains(event.target) && !searchResults.contains(event.target)) {
                searchResults.style.display = 'none';
                searchInput.setAttribute('aria-expanded', 'false');
            }
        });
    }
}, 100);

supabase.auth.onAuthStateChange((event) => {
    if (['SIGNED_IN', 'SIGNED_OUT', 'TOKEN_REFRESHED', 'USER_UPDATED'].includes(event)) {
        renderNavbarAuth();
    }
});

document.addEventListener('DOMContentLoaded', renderNavbarAuth);

// Floating, draggable control for hiding/showing the shared top navigation.
(() => {
    const header = document.querySelector('.codify-main-header');
    if (!header || document.getElementById('codifyNavVisibilityToggle')) return;
    const breadcrumb = currentPath.startsWith('/courses/')
        ? document.querySelector('.codify-breadcrumb-bar')
        : null;

    const style = document.createElement('style');
    style.id = 'codifyNavVisibilityStyles';
    style.textContent = `
        .codify-main-header {
            transition: transform .28s ease, opacity .28s ease;
            will-change: transform;
        }
        .codify-main-header.codify-nav-hidden {
            transform: translateY(calc(-100% - 2px));
            opacity: 0;
            pointer-events: none;
        }
        .codify-breadcrumb-bar.codify-nav-hidden {
            transform: translateY(calc(-100% - 2px));
            opacity: 0;
            pointer-events: none;
        }
        .codify-breadcrumb-bar {
            transition: transform .28s ease, opacity .28s ease;
        }
        #codifyNavVisibilityToggle {
            position: fixed;
            right: 22px;
            bottom: 22px;
            z-index: 2147483000;
            width: 46px;
            height: 46px;
            display: grid;
            place-items: center;
            padding: 0;
            border: 1px solid rgba(160,210,240,.28);
            border-radius: 15px;
            color: #eaf8ff;
            background: rgba(10,22,38,.34);
            box-shadow: 0 6px 22px rgba(0,0,0,.16);
            backdrop-filter: blur(18px) saturate(135%);
            -webkit-backdrop-filter: blur(18px) saturate(135%);
            cursor: grab;
            touch-action: none;
            user-select: none;
            transition: background .2s ease, border-color .2s ease, box-shadow .2s ease, transform .2s ease;
        }
        #codifyNavVisibilityToggle:hover {
            background: rgba(0,90,140,.38);
            border-color: #00aaff;
            box-shadow: 0 8px 26px rgba(0,0,0,.2);
        }
        #codifyNavVisibilityToggle:active { cursor: grabbing; }
        #codifyNavVisibilityToggle:focus-visible {
            outline: 2px solid #00aaff;
            outline-offset: 4px;
        }
        #codifyNavVisibilityToggle svg { width: 22px; height: 22px; pointer-events: none; }
        #codifyNavVisibilityToggle .codify-toggle-grip {
            position: absolute;
            top: 5px;
            left: 50%;
            width: 15px;
            height: 2px;
            border-radius: 2px;
            background: rgba(0,170,255,.65);
            transform: translateX(-50%);
            pointer-events: none;
        }
        @media (max-width: 600px) {
            #codifyNavVisibilityToggle { width: 44px; height: 44px; border-radius: 14px; }
        }
        @media (prefers-reduced-motion: reduce) {
            .codify-main-header, #codifyNavVisibilityToggle { transition: none !important; }
        }
    `;
    document.head.appendChild(style);

    const toggle = document.createElement('button');
    toggle.type = 'button';
    toggle.id = 'codifyNavVisibilityToggle';
    toggle.setAttribute('aria-controls', 'codifyCenterNav');
    toggle.setAttribute('aria-pressed', 'false');
    toggle.innerHTML = '<span class="codify-toggle-grip" aria-hidden="true"></span><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="3" y="4" width="18" height="16" rx="3"/><path d="M3 9h18"/><path d="m9 12-3 3 3 3"/><path d="m15 12 3 3-3 3"/></svg>';
    toggle.title = 'Hide top navigation — drag to move';
    toggle.setAttribute('aria-label', 'Hide top navigation. Drag to move this button.');
    document.body.appendChild(toggle);

    const visibilityStorageKey = 'codify-nav-hidden';
    try {
        if (localStorage.getItem(visibilityStorageKey) === 'true') {
            header.classList.add('codify-nav-hidden');
            breadcrumb?.classList.add('codify-nav-hidden');
        }
    } catch (_) {}

    const storageKey = 'codify-nav-toggle-position';
    const edgeGap = 12;

    // Keep the saved position, but restore it safely inside the viewport.
    function placeToggle(x, y) {
        const maxX = Math.max(edgeGap, innerWidth - toggle.offsetWidth - edgeGap);
        const maxY = Math.max(edgeGap, innerHeight - toggle.offsetHeight - edgeGap);
        toggle.style.left = Math.max(edgeGap, Math.min(x, maxX)) + 'px';
        toggle.style.top = Math.max(edgeGap, Math.min(y, maxY)) + 'px';
        toggle.style.right = 'auto';
        toggle.style.bottom = 'auto';
    }

    try {
        const saved = JSON.parse(localStorage.getItem(storageKey) || 'null');
        if (saved && Number.isFinite(saved.x) && Number.isFinite(saved.y)) {
            const maxX = Math.max(edgeGap, innerWidth - toggle.offsetWidth - edgeGap);
            const x = Math.abs(saved.x - edgeGap) <= Math.abs(maxX - saved.x) ? edgeGap : maxX;
            placeToggle(x, saved.y);
        }
    } catch (_) {}

    const updateToggleState = () => {
        const hidden = header.classList.contains('codify-nav-hidden');
        breadcrumb?.classList.toggle('codify-nav-hidden', hidden);
        toggle.setAttribute('aria-pressed', String(hidden));
        toggle.setAttribute('aria-label', hidden
            ? 'Show top navigation. Drag to move this button.'
            : 'Hide top navigation. Drag to move this button.');
        toggle.title = hidden ? 'Show top navigation — drag to move' : 'Hide top navigation — drag to move';

        // Use a clean browser-window SVG only; the icon stays the same in both states.
        toggle.innerHTML = '<span class="codify-toggle-grip" aria-hidden="true"></span><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.65" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="3" y="3.5" width="18" height="17" rx="2.5"/><path d="M3 8h18"/><path d="M6 5.8h.01M8.5 5.8h.01"/></svg>';
    };

    let pointerStart = null;
    let moved = false;
    let dragging = false;

    toggle.addEventListener('pointerdown', event => {
        if (event.button !== 0 && event.pointerType === 'mouse') return;
        const rect = toggle.getBoundingClientRect();
        pointerStart = { x: event.clientX, y: event.clientY, left: rect.left, top: rect.top };
        moved = false;
        dragging = true;
        toggle.setPointerCapture?.(event.pointerId);
    });

    toggle.addEventListener('pointermove', event => {
        if (!dragging || !pointerStart) return;
        const dx = event.clientX - pointerStart.x;
        const dy = event.clientY - pointerStart.y;
        if (Math.abs(dx) > 4 || Math.abs(dy) > 4) moved = true;
        if (!moved) return;
        placeToggle(pointerStart.left + dx, pointerStart.top + dy);
    });

    const finishDrag = () => {
        if (!dragging) return;
        dragging = false;
        if (moved) {
            const rect = toggle.getBoundingClientRect();
            const maxX = Math.max(edgeGap, innerWidth - toggle.offsetWidth - edgeGap);
            const maxY = Math.max(edgeGap, innerHeight - toggle.offsetHeight - edgeGap);

            // Snap only to the left or right side; keep the dragged vertical position.
            const leftDistance = Math.abs(rect.left - edgeGap);
            const rightDistance = Math.abs(maxX - rect.left);
            const x = leftDistance <= rightDistance ? edgeGap : maxX;
            placeToggle(x, rect.top);
            const snapped = toggle.getBoundingClientRect();
            try {
                localStorage.setItem(storageKey, JSON.stringify({ x: snapped.left, y: snapped.top }));
            } catch (_) {}
        }
    };
    toggle.addEventListener('pointerup', finishDrag);
    toggle.addEventListener('pointercancel', finishDrag);
    toggle.addEventListener('click', event => {
        if (moved) {
            event.preventDefault();
            event.stopPropagation();
            moved = false;
            return;
        }
        const hidden = header.classList.toggle('codify-nav-hidden');
        try { localStorage.setItem(visibilityStorageKey, String(hidden)); } catch (_) {}
        if (hidden) header.classList.remove('mobile-nav-open');
        const mobileToggle = document.getElementById('codifyMobileMenuToggle');
        if (mobileToggle) {
            mobileToggle.setAttribute('aria-expanded', 'false');
            mobileToggle.setAttribute('aria-label', 'Open navigation menu');
        }
        updateToggleState();
    });
    window.addEventListener('resize', () => {
        const rect = toggle.getBoundingClientRect();
        const maxX = Math.max(edgeGap, innerWidth - toggle.offsetWidth - edgeGap);
        const x = Math.abs(rect.left - edgeGap) <= Math.abs(maxX - rect.left) ? edgeGap : maxX;
        placeToggle(x, rect.top);
        const adjusted = toggle.getBoundingClientRect();
        try { localStorage.setItem(storageKey, JSON.stringify({ x: adjusted.left, y: adjusted.top })); } catch (_) {}
    });
    updateToggleState();
})();

