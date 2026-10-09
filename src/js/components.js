// components.js

// 1. Inject the Top Navigation Bar (including a professional search bar)
document.getElementById('navbar-placeholder').innerHTML = `
    <header class="codify-main-header">
        <div class="codify-header-container">

            <div class="codify-left-group">
                <div class="codify-logo" onclick="window.location.href='/index.html'" role="button" tabindex="0" aria-label="Codify Homepage">
                    <img src="/src/assets/logos/main-logo.svg" alt="Codify Logo" class="logo-icon">
                    <span class="logo-text">Codify</span>
                </div>
            </div>

            <!-- Professional Search Bar Container -->
            <div class="codify-search-wrapper" style="position: relative; flex: 0 1 250px; margin: 0 15px;">
                <input type="text" id="siteSearchInput" placeholder="Search courses, exams..." aria-label="Search" style="width: 100%; padding: 8px 12px; border-radius: 6px; border: 1px solid #ccc; font-size: 14px;">
                <div id="siteSearchResults" class="search-dropdown-results" style="position: absolute; top: 100%; left: 0; right: 0; background: #fff; border: 1px solid #ddd; border-radius: 6px; margin-top: 4px; box-shadow: 0 4px 12px rgba(0,0,0,0.1); display: none; z-index: 1000; max-height: 200px; overflow-y: auto;"></div>
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

// 3. Search Bar Functionality Setup
setTimeout(() => {
    const searchInput = document.getElementById('siteSearchInput');
    const searchResults = document.getElementById('siteSearchResults');

    // Define searchable items (Add your site pages/courses here)
    const searchableItems = [
        { title: 'Home', url: 'index.html' },
        { title: 'Courses', url: 'src/pages/courses.html' },
        { title: 'Quizzes & Exams', url: 'src/pages/courses/exam.html' },
        { title: 'Certificates', url: 'src/pages/certificate.html' },
        { title: 'Contact Us', url: 'src/pages/contact.html' },
        { title: 'Login', url: 'src/auth/login.html' },
        { title: 'Signup', url: 'src/auth/signup.html' }
    ];

    if (searchInput && searchResults) {
        searchInput.addEventListener('input', function() {
            const query = this.value.toLowerCase().trim();
            searchResults.innerHTML = '';

            if (query.length === 0) {
                searchResults.style.display = 'none';
                return;
            }

            const filtered = searchableItems.filter(item => item.title.toLowerCase().includes(query));

            if (filtered.length > 0) {
                searchResults.style.display = 'block';
                filtered.forEach(item => {
                    const div = document.createElement('div');
                    div.textContent = item.title;
                    div.style.padding = '8px 12px';
                    div.style.cursor = 'pointer';
                    div.style.borderBottom = '1px solid #f0f0f0';
                    div.onmouseover = () => div.style.background = '#f8f9fa';
                    div.onmouseout = () => div.style.background = '#fff';
                    div.onclick = () => {
                        window.location.href = item.url;
                    };
                    searchResults.appendChild(div);
                });
            } else {
                searchResults.style.display = 'block';
                const div = document.createElement('div');
                div.textContent = 'No results found';
                div.style.padding = '8px 12px';
                div.style.color = '#888';
                searchResults.appendChild(div);
            }
        });

        // Hide dropdown when clicking outside
        document.addEventListener('click', function(e) {
            if (!searchInput.contains(e.target) && !searchResults.contains(e.target)) {
                searchResults.style.display = 'none';
            }
        });
    }
}, 100);