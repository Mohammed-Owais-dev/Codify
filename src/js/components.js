// components.js - Codify Shared Components, Global Search Engine, & Navbar Auth Management

import { supabase } from '/src/js/config/supabase-client.js';

const currentPath = window.location.pathname;

// 1. Sign Out Logic (Exposed Globally)
window.handleSignOut = async function() {
    try {
        const { error } = await supabase.auth.signOut();
        if (error) throw error;
        localStorage.clear();
        window.location.href = '/src/auth/login.html';
    } catch (error) {
        console.error('Error signing out:', error.message);
    }
};

// 2. Toggle Dropdown Menu Visibility with Smooth State Check
window.toggleProfileMenu = function(event) {
    if (event) event.stopPropagation();
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

            <nav class="codify-center-nav" aria-label="Main navigation menu">
                <ul class="codify-nav-links" id="navLinks">
                    <li><a href="/" class="${currentPath === '/' || currentPath === '/index.html' ? 'active-link' : ''}">Home</a></li>
                    <li><a href="/src/pages/courses.html" class="${currentPath.startsWith('/src/pages/courses') ? 'active-link' : ''}">Courses</a></li>
                    <li><a href="/src/pages/courses/exam.html" class="${currentPath === '/src/pages/courses/exam.html' ? 'active-link' : ''}">Quizzes &amp; Exams</a></li>
                    <li><a href="/src/pages/certificate.html" class="${currentPath === '/src/pages/certificate.html' ? 'active-link' : ''}">Certificates</a></li>
                    <li><a href="/src/pages/contact.html" class="${currentPath === '/src/pages/contact.html' ? 'active-link' : ''}">Contact</a></li>
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
                    <a href="/src/auth/login.html" class="codify-btn-outline" title="Login">Login</a>
                    <a href="/src/auth/signup.html" class="codify-btn-outline" title="Signup">Signup</a>
                </div>
            </div>
        </div>
    </header>
`;

// Inject custom cyberpunk scrollbar styling and dropdown activation rules dynamically
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
    #profileDropdownMenu.active {
        opacity: 1 !important;
        visibility: visible !important;
        transform: translateY(0) scale(1) !important;
    }
`;
document.head.appendChild(cyberScrollStyle);

// 5. Inject the Footer & Engineer Modal (Clean Structure & SVG Icons)
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
                            <span class="member-dot"></span>Mohammed Owais <span class="student-id">(24030-CM-193)</span>
                        </li>
                        <li class="team-member interactive" onclick="openEngineerModal('dhanush')">
                            <span class="member-dot"></span>M. Dhanush <span class="student-id">(24030-CM-189)</span>
                        </li>
                        <li class="team-member interactive" onclick="openEngineerModal('feroz')">
                            <span class="member-dot"></span>MD. Feroz Basha <span class="student-id">(24030-CM-190)</span>
                        </li>
                        <li class="team-member interactive" onclick="openEngineerModal('basha')">
                            <span class="member-dot"></span>M. Basha <span class="student-id">(24030-CM-189)</span>
                        </li>
                        <li class="team-member interactive" onclick="openEngineerModal('prasad')">
                            <span class="member-dot"></span>M. Prasad <span class="student-id">(24030-CM-196)</span>
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
                <p id="engId" class="eng-id">ID</p>
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

const teamDatabase = {
    'owais': { name: 'Mohammed Owais', initials: 'MO', id: '24030-CM-193', role: 'Lead Engineer & Architect', bio: 'Mohammed is responsible for the core architecture of Codify, focusing on front-end performance, database design, and overall system scalability.', email: 'mailto:owais@codify.com', github: 'https://github.com/mohammedowais' },
    'dhanush': { name: 'M. Dhanush', initials: 'MD', id: '24030-CM-189', role: 'Full-Stack Developer', bio: 'Dhanush specializes in interactive UI design and seamless API integrations, ensuring students have a smooth learning experience.', email: 'mailto:dhanush@codify.com', github: 'https://github.com/dhanush' },
    'feroz': { name: 'MD. Feroz Basha', initials: 'FB', id: '24030-CM-190', role: 'Backend & Authentication Lead', bio: 'Feroz manages secure user authentication, database row-level security, and the backend tracking logic for course progress.', email: 'mailto:feroz@codify.com', github: 'https://github.com/feroz' },
    'basha': { name: 'M. Basha', initials: 'MB', id: '24030-CM-189', role: 'Content & UI Developer', bio: 'Basha focuses on creating structured, easy-to-understand interactive course material and maintaining the site styling.', email: 'mailto:basha@codify.com', github: 'https://github.com/basha' },
    'prasad': { name: 'M. Prasad', initials: 'MP', id: '24030-CM-196', role: 'Systems Tester & QA', bio: 'Prasad rigorously tests platform features, catches bugs, and optimizes performance metrics to keep Codify running at 100%.', email: 'mailto:prasad@codify.com', github: 'https://github.com/prasad' }
};

const engModal = document.getElementById('engineerModal');
const closeEngBtn = document.getElementById('closeEngineerModal');

window.openEngineerModal = function (memberKey) {
    const engineer = teamDatabase[memberKey];
    if (!engineer) return;

    document.getElementById('engAvatar').textContent = engineer.initials;
    document.getElementById('engName').textContent = engineer.name;
    document.getElementById('engId').textContent = `Student ID: ${engineer.id}`;
    document.getElementById('engRole').textContent = engineer.role;
    document.getElementById('engBio').textContent = engineer.bio;
    document.getElementById('engEmail').href = engineer.email;
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

// 6. Render Dynamic Navbar Authentication State & Profile Dropdown (Reading from auth.users metadata)
async function renderNavbarAuth() {
    const authNavGroup = document.getElementById('authNavGroup');
    if (!authNavGroup) return;

    try {
        const { data: { session } } = await supabase.auth.getSession();
        const user = session?.user;

        if (user) {
            // Read user properties directly from auth.users metadata (user_metadata)
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
                    <button class="profile-avatar-btn" onclick="toggleProfileMenu(event)" aria-label="User Profile" style="background: none; border: none; padding: 0; cursor: pointer; display: flex; align-items: center;">
                        ${btnAvatarHtml}
                    </button>

                    <div class="profile-dropdown-menu" id="profileDropdownMenu" style="position: absolute; top: calc(100% + 12px); right: 0; width: 280px; background: rgba(13, 27, 42, 0.95); border: 1px solid rgba(0, 170, 255, 0.35); border-radius: 16px; backdrop-filter: blur(16px); box-shadow: 0 15px 35px rgba(0, 0, 0, 0.7), 0 0 20px rgba(0, 170, 255, 0.15); padding: 16px; display: flex; flex-direction: column; z-index: 3000; opacity: 0; visibility: hidden; transform: translateY(-10px) scale(0.98); transition: opacity 0.25s ease, transform 0.25s cubic-bezier(0.16, 1, 0.3, 1), visibility 0.25s ease;">
                        
                        <!-- Dropdown Header -->
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
                            <a href="/src/pages/account/profile.html" class="dropdown-item" style="display: flex; align-items: center; gap: 12px; padding: 10px 12px; border-radius: 10px; color: #cbd5e1; text-decoration: none; font-size: 0.9rem; font-weight: 600; transition: all 0.2s ease;">
                                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#00aaff" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>
                                Profile Settings
                            </a>

                            <a href="/src/pages/certificate.html" class="dropdown-item" style="display: flex; align-items: center; gap: 12px; padding: 10px 12px; border-radius: 10px; color: #cbd5e1; text-decoration: none; font-size: 0.9rem; font-weight: 600; transition: all 0.2s ease;">
                                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#00aaff" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="8" r="6"></circle><path d="M15.477 12.89 17 22l-5-3-5 3 1.523-9.11"></path></svg>
                                Achievements
                            </a>

                            <a href="/src/pages/account/activity.html" class="dropdown-item" style="display: flex; align-items: center; gap: 12px; padding: 10px 12px; border-radius: 10px; color: #cbd5e1; text-decoration: none; font-size: 0.9rem; font-weight: 600; transition: all 0.2s ease;">
                                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#00aaff" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"></polyline></svg>
                                Activity
                            </a>

                            <a href="/src/pages/account/account-security.html" class="dropdown-item" style="display: flex; align-items: center; gap: 12px; padding: 10px 12px; border-radius: 10px; color: #cbd5e1; text-decoration: none; font-size: 0.9rem; font-weight: 600; transition: all 0.2s ease;">
                                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#00aaff" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect><path d="M7 11V7a5 5 0 0 1 10 0v4"></path></svg>
                                Account Security
                            </a>

                            <div class="dropdown-divider" style="height: 1px; background: rgba(0, 170, 255, 0.15); margin: 8px 0;"></div>

                            <a href="/src/auth/login.html" class="dropdown-item" style="display: flex; align-items: center; gap: 12px; padding: 10px 12px; border-radius: 10px; color: #cbd5e1; text-decoration: none; font-size: 0.9rem; font-weight: 600; transition: all 0.2s ease;">
                                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#00aaff" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M16 17l5-5-5-5"></path><path d="M21 12H9"></path><path d="M12 3H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h7"></path></svg>
                                Switch Account
                            </a>

                            <button class="dropdown-item logout-btn" onclick="handleSignOut()" style="display: flex; align-items: center; gap: 12px; padding: 10px 12px; border-radius: 10px; color: #f87171; text-decoration: none; font-size: 0.9rem; font-weight: 600; background: transparent; border: none; width: 100%; text-align: left; cursor: pointer; transition: all 0.2s ease;">
                                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#ef4444" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path><polyline points="16 17 21 12 16 7"></polyline><line x1="21" y1="12" x2="9" y2="12"></line></svg>
                                Logout
                            </button>
                        </div>
                    </div>
                </div>
            `;
        } else {
            authNavGroup.innerHTML = `
                <a href="/src/auth/login.html" class="codify-btn-outline">Login</a>
                <a href="/src/auth/signup.html" class="codify-btn-outline">Signup</a>
            `;
        }
    } catch (error) {
        console.error('Navbar Auth initialization failed:', error);
    } finally {
        authNavGroup.classList.add('ready');
    }
}

// 7. Global Search Engine Setup (Syllabus Indexing)
setTimeout(() => {
    const searchInput = document.getElementById('globalSiteSearch');
    const searchResults = document.getElementById('globalSearchResults');
    
    let masterSearchIndex = null;
    let currentFocus = -1;

    async function loadMasterIndex() {
        if (masterSearchIndex) return masterSearchIndex;

        try {
            const syllabusFiles = [
                { path: '/src/data/html-syllabus.json', category: 'html', name: 'HTML' },
                { path: '/src/data/java-syllabus.json', category: 'java', name: 'Java' },
                { path: '/src/data/python-syllabus.json', category: 'python', name: 'Python' },
                { path: '/src/data/c-syllabus.json', category: 'c', name: 'C' },
                { path: '/src/data/cpp-syllabus.json', category: 'cpp', name: 'Cpp' }
            ];

            let index = [
                { title: 'Home Dashboard', category: 'General', url: '/index.html' },
                { title: 'All Courses & Modules', category: 'Courses', url: '/courses' },
                { title: 'Quizzes & Final Exams', category: 'Assessment', url: '/src/pages/courses/exam.html' },
                { title: 'Certificates & Credentials', category: 'General', url: '/src/pages/certificate.html' },
                { title: 'Contact Support Team', category: 'General', url: '/src/pages/contact.html' }
            ];

            for (let file of syllabusFiles) {
                const response = await fetch(file.path);
                const data = await response.json();
                
                if (data.chapters) {
                    index.push({
                        title: `${data.course_title || file.name} Course Hub`,
                        category: file.name,
                        url: `/courses/${file.category}`
                    });

                    data.chapters.forEach(chapter => {
                        chapter.topics.forEach(topic => {
                            const lessonId = topic.id || topic.file.split('/').pop().split('-')[0];
                            index.push({
                                title: `${topic.title} (${chapter.chapter_title})`,
                                category: file.name,
                                url: `/courses/${file.category}/${lessonId}`
                            });
                        });
                    });
                }
            }

            masterSearchIndex = index;
            return masterSearchIndex;
        } catch (error) {
            console.error('Error building search index from syllabi:', error);
            return [];
        }
    }

    function addActive(rows) {
        if (!rows || rows.length === 0) return;
        removeActive(rows);
        if (currentFocus >= rows.length) currentFocus = 0;
        if (currentFocus < 0) currentFocus = rows.length - 1;
        
        rows[currentFocus].classList.add('search-item-active');
        rows[currentFocus].scrollIntoView({ block: 'nearest' });
    }

    function removeActive(rows) {
        for (let i = 0; i < rows.length; i++) {
            rows[i].classList.remove('search-item-active');
        }
    }

    if (searchInput && searchResults) {
        let debounceTimer;

        searchInput.addEventListener('input', function() {
            clearTimeout(debounceTimer);
            currentFocus = -1;
            const query = this.value.toLowerCase().trim();

            debounceTimer = setTimeout(async () => {
                searchResults.innerHTML = '';

                if (query.length === 0) {
                    searchResults.style.display = 'none';
                    return;
                }

                const database = await loadMasterIndex();
                const keywords = query.split(/\s+/);

                const matches = database.filter(item => {
                    const searchableText = `${item.title} ${item.category}`.toLowerCase();
                    return keywords.every(kw => searchableText.includes(kw));
                });

                if (matches.length > 0) {
                    searchResults.style.display = 'block';
                    const fragment = document.createDocumentFragment();

                    matches.forEach((item, idx) => {
                        const row = document.createElement('div');
                        row.className = 'search-result-row';

                        const titleSpan = document.createElement('span');
                        titleSpan.textContent = item.title;
                        titleSpan.className = 'search-result-title';

                        const catBadge = document.createElement('span');
                        catBadge.textContent = item.category;
                        catBadge.className = 'search-result-badge';

                        row.appendChild(titleSpan);
                        row.appendChild(catBadge);

                        row.onmouseover = () => {
                            currentFocus = idx;
                            addActive(searchResults.children);
                        };
                        row.onmouseout = () => {
                            removeActive(searchResults.children);
                        };
                        
                        row.onclick = () => {
                            window.location.href = item.url;
                        };

                        fragment.appendChild(row);
                    });

                    searchResults.appendChild(fragment);
                } else {
                    searchResults.style.display = 'block';
                    searchResults.innerHTML = '<div class="search-no-results">No matching course topics found</div>';
                }
            }, 30);
        });

        searchInput.addEventListener('keydown', function(e) {
            const rows = searchResults.children;
            if (searchResults.style.display === 'block' && rows.length > 0) {
                if (e.key === 'ArrowDown') {
                    currentFocus++;
                    addActive(rows);
                    e.preventDefault();
                } else if (e.key === 'ArrowUp') {
                    currentFocus--;
                    addActive(rows);
                    e.preventDefault();
                } else if (e.key === 'Enter') {
                    e.preventDefault();
                    if (currentFocus > -1 && rows[currentFocus]) {
                        rows[currentFocus].click();
                    }
                }
            }
        });

        document.addEventListener('keydown', (e) => {
            if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
                e.preventDefault();
                searchInput.focus();
            }
        });

        document.addEventListener('click', function(e) {
            if (!searchInput.contains(e.target) && !searchResults.contains(e.target)) {
                searchResults.style.display = 'none';
            }
        });
    }
}, 100);

// Single auth change listener
supabase.auth.onAuthStateChange((event) => {
    if (['SIGNED_IN', 'SIGNED_OUT', 'TOKEN_REFRESHED', 'USER_UPDATED'].includes(event)) {
        renderNavbarAuth();
    }
});

// Run renderNavbarAuth when DOM is ready
document.addEventListener('DOMContentLoaded', renderNavbarAuth);