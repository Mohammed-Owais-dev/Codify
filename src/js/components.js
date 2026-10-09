const currentPath = window.location.pathname;

document.getElementById('navbar-placeholder').innerHTML = `
    <header class="codify-main-header">
        <div class="codify-header-container">
            <div class="codify-left-group">
                <div class="codify-logo" onclick="window.location.href='/'" role="button" tabindex="0" aria-label="Codify Homepage">
                    <img src="/src/assets/logos/main-logo.svg" alt="Codify Logo" class="logo-icon">
                    <span class="logo-text">Codify</span>
                </div>
            </div>

            <nav class="codify-center-nav" aria-label="Main navigation menu">
            <ul class="codify-nav-links" id="navLinks">
                <li><a href="/">Home</a></li>
                <li><a href="/courses">Courses</a></li>
                <li><a href="/exam">Quizzes &amp; Exams</a></li>
                <li><a href="/certificate">Certificates</a></li>
                <li><a href="/contact">Contact</a></li>
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
// 2. Inject the Footer & Engineer Modal (Clean Structure & SVG Icons)
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

// 3. Dynamic Clean-URL Syllabus Search Engine Setup with Arrow Key Support
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

        // Keydown listener for Arrow navigation, Enter selection, and ⌘K
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

        // Global shortcut (⌘K) to focus search
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