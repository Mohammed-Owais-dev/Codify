// components.js

// 1. Inject the Top Navigation Bar (with a theme-matched global search bar)
document.getElementById('navbar-placeholder').innerHTML = `
    <header class="codify-main-header">
        <div class="codify-header-container">

            <div class="codify-left-group">
                <div class="codify-logo" onclick="window.location.href='/index.html'" role="button" tabindex="0" aria-label="Codify Homepage">
                    <img src="/src/assets/logos/main-logo.svg" alt="Codify Logo" class="logo-icon">
                    <span class="logo-text">Codify</span>
                </div>
            </div>

            <!-- Global Search Container matching Codify theme -->
            <div class="codify-search-container" style="position: relative; flex: 0 1 280px; margin: 0 20px;">
                <div style="position: relative; display: flex; align-items: center;">
                    <svg style="position: absolute; left: 12px; width: 16px; height: 16px; color: #888;" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                        <circle cx="11" cy="11" r="8"></circle>
                        <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                    </svg>
                    <input type="text" id="globalSiteSearch" placeholder="Search global topics, courses..." aria-label="Global Search" style="width: 100%; padding: 8px 12px 8px 36px; border-radius: 8px; border: 1px solid var(--border-color, #e2e8f0); background-color: var(--bg-input, #f8fafc); color: var(--text-color, #1e293b); font-size: 14px; outline: none; transition: all 0.2s ease;">
                </div>
                <div id="globalSearchResults" class="codify-search-dropdown" style="position: absolute; top: calc(100% + 6px); left: 0; right: 0; background: #ffffff; border: 1px solid #e2e8f0; border-radius: 8px; box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.1); display: none; z-index: 1000; max-height: 280px; overflow-y: auto;"></div>
            </div>

            <nav class="codify-center-nav" id="centerNav" aria-label="Main navigation menu">
                <button class="drawer-close-btn" id="drawerCloseBtn" aria-label="Close menu">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                        <line x1="18" y1="6" x2="6" y2="18"></line>
                        <line x1="6" y1="6" x2="18" y2="18"></line>
                    </svg>
                </button>

                <ul class="codify-nav-links" id="navLinks">
                    <li><a href="index.html" class="active-link" aria-current="page">Home</a></li>
                    <li><a href="src/pages/courses.html">Courses</a></li>
                    <li><a href="src/pages/courses/exam.html">Quizzes &amp; Exams</a></li>
                    <li><a href="src/pages/certificate.html">Certificates</a></li>
                    <li><a href="src/pages/contact.html">Contact</a></li>
                </ul>
            </nav>

            <div class="codify-right-group">
                <button class="menu-toggle" id="menuToggle" aria-label="Toggle navigation menu" aria-expanded="false">
                    <span></span>
                    <span></span>
                    <span></span>
                </button>

                <div class="codify-auth-group" id="authNavGroup">
                    <a href="src/auth/login.html" class="codify-btn-outline" title="Login">
                        <svg class="auth-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                            <path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4"></path>
                            <polyline points="10 17 15 12 10 7"></polyline>
                            <line x1="15" y1="12" x2="3" y2="12"></line>
                        </svg>
                        <span class="auth-text">Login</span>
                    </a>
                    <a href="src/auth/signup.html" class="codify-btn-outline" title="Signup">
                        <svg class="auth-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                            <path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
                            <circle cx="8.5" cy="7" r="4"></circle>
                            <line x1="20" y1="8" x2="20" y2="14"></line>
                            <line x1="23" y1="11" x2="17" y2="11"></line>
                        </svg>
                        <span class="auth-text">Signup</span>
                    </a>
                </div>
            </div>

        </div>
    </header>
`;

// 2. Inject the Footer & Engineer Modal
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

    <div class="modal-overlay" id="engineerModal" aria-hidden="true">
        <div class="modal-card">
            <button class="modal-close-btn" id="closeEngineerModal" aria-label="Close">✕</button>

            <div style="text-align: center; margin-bottom: 20px;">
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
                    <svg class="auth-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" style="width: 16px; height: 16px; vertical-align: middle; margin-right: 4px;">
                        <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                        <polyline points="22,6 12,13 2,6"></polyline>
                    </svg> Email
                </a>
                <a href="#" id="engGithub" class="codify-btn-outline" target="_blank">💻 GitHub</a>
            </div>
        </div>
    </div>
`;

// 3. Global Search Logic Setup across all Pages & Topics
setTimeout(() => {
    const searchInput = document.getElementById('globalSiteSearch');
    const searchResults = document.getElementById('globalSearchResults');

    // Comprehensive global index of your site pages and topics
    const globalDatabase = [
        { title: 'Home Dashboard', category: 'General', url: 'index.html' },
        { title: 'All Courses & Modules', category: 'Courses', url: 'src/pages/courses.html' },
        { title: 'Quizzes & Final Exams', category: 'Assessment', url: 'src/pages/courses/exam.html' },
        { title: 'Certificates & Credentials', category: 'General', url: 'src/pages/certificate.html' },
        { title: 'Contact Support Team', category: 'General', url: 'src/pages/contact.html' },
        { title: 'User Login', category: 'Authentication', url: 'src/auth/login.html' },
        { title: 'Create Account (Signup)', category: 'Authentication', url: 'src/auth/signup.html' }
        // Add any extra topic or lesson pages below as you build them:
        // { title: 'Python Programming Basics', category: 'Courses', url: 'src/pages/courses/python.html' },
    ];

    if (searchInput && searchResults) {
        // Add focus effects matching standard input field interaction
        searchInput.addEventListener('focus', () => {
            searchInput.style.borderColor = '#6366f1'; // Codify accent border color
            searchInput.style.backgroundColor = '#ffffff';
        });
        
        searchInput.addEventListener('blur', () => {
            searchInput.style.borderColor = '#e2e8f0';
            searchInput.style.backgroundColor = '#f8fafc';
        });

        searchInput.addEventListener('input', function() {
            const query = this.value.toLowerCase().trim();
            searchResults.innerHTML = '';

            if (query.length === 0) {
                searchResults.style.display = 'none';
                return;
            }

            const matches = globalDatabase.filter(item => 
                item.title.toLowerCase().includes(query) || 
                item.category.toLowerCase().includes(query)
            );

            if (matches.length > 0) {
                searchResults.style.display = 'block';
                matches.forEach(item => {
                    const row = document.createElement('div');
                    row.style.padding = '10px 14px';
                    row.style.cursor = 'pointer';
                    row.style.borderBottom = '1px solid #f1f5f9';
                    row.style.display = 'flex';
                    row.style.justifyContent = 'space-between';
                    row.style.alignItems = 'center';

                    const titleSpan = document.createElement('span');
                    titleSpan.textContent = item.title;
                    titleSpan.style.fontSize = '13px';
                    titleSpan.style.fontWeight = '500';
                    titleSpan.style.color = '#1e293b';

                    const catBadge = document.createElement('span');
                    catBadge.textContent = item.category;
                    catBadge.style.fontSize = '11px';
                    catBadge.style.padding = '2px 6px';
                    catBadge.style.borderRadius = '4px';
                    catBadge.style.backgroundColor = '#e0e7ff';
                    catBadge.style.color = '#4338ca';

                    row.appendChild(titleSpan);
                    row.appendChild(catBadge);

                    row.onmouseover = () => row.style.backgroundColor = '#f8fafc';
                    row.onmouseout = () => row.style.backgroundColor = '#ffffff';
                    
                    row.onclick = () => {
                        window.location.href = '/' + item.url.replace(/^\/+/, '');
                    };

                    searchResults.appendChild(row);
                });
            } else {
                searchResults.style.display = 'block';
                const emptyRow = document.createElement('div');
                emptyRow.textContent = 'No matching pages or topics found';
                emptyRow.style.padding = '12px 14px';
                emptyRow.style.fontSize = '13px';
                emptyRow.style.color = '#64748b';
                emptyRow.style.textAlign = 'center';
                searchResults.appendChild(emptyRow);
            }
        });

        // Hide results when clicking outside
        document.addEventListener('click', function(e) {
            if (!searchInput.contains(e.target) && !searchResults.contains(e.target)) {
                searchResults.style.display = 'none';
            }
        });
    }
}, 100);