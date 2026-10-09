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

setTimeout(() => {
    const searchInput = document.getElementById('globalSiteSearch');
    const searchResults = document.getElementById('globalSearchResults');
    
    let masterSearchIndex = null;

    // Automatically load and parse syllabus files into a unified search array
    async function loadMasterIndex() {
        if (masterSearchIndex) return masterSearchIndex;

        try {
            // List all your syllabus files here
            const syllabusFiles = [
                { path: '/html-syllabus.json', category: 'HTML' },
                { path: '/java-syllabus.json', category: 'Java' },
                { path: '/python-syllabus.json', category: 'Python' }
            ];

            let index = [
                { title: 'Home Dashboard', category: 'General', url: 'index.html' },
                { title: 'All Courses & Modules', category: 'Courses', url: 'src/pages/courses.html' },
                { title: 'Quizzes & Final Exams', category: 'Assessment', url: 'src/pages/courses/exam.html' },
                { title: 'Certificates & Credentials', category: 'General', url: 'src/pages/certificate.html' }
            ];

            for (let file of syllabusFiles) {
                const response = await fetch(file.path);
                const data = await response.json();
                
                // Loop through chapters and topics automatically
                if (data.chapters) {
                    data.chapters.forEach(chapter => {
                        chapter.topics.forEach(topic => {
                            index.push({
                                title: `${topic.title} (${chapter.chapter_title})`,
                                category: file.category,
                                url: `src/pages/courses/${file.category.toLowerCase()}/${topic.file.replace('.md', '.html')}`
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

    if (searchInput && searchResults) {
        let debounceTimer;

        searchInput.addEventListener('input', function() {
            clearTimeout(debounceTimer);
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

                    matches.forEach(item => {
                        const row = document.createElement('div');
                        row.style.cssText = 'padding: 10px 14px; cursor: pointer; border-bottom: 1px solid #f1f5f9; display: flex; justify-content: space-between; align-items: center;';

                        const titleSpan = document.createElement('span');
                        titleSpan.textContent = item.title;
                        titleSpan.style.cssText = 'font-size: 13px; font-weight: 500; color: #1e293b;';

                        const catBadge = document.createElement('span');
                        catBadge.textContent = item.category;
                        catBadge.style.cssText = 'font-size: 11px; padding: 2px 6px; border-radius: 4px; background-color: #e0e7ff; color: #4338ca; white-space: nowrap;';

                        row.appendChild(titleSpan);
                        row.appendChild(catBadge);

                        row.onmouseover = () => row.style.backgroundColor = '#f8fafc';
                        row.onmouseout = () => row.style.backgroundColor = '#ffffff';
                        
                        row.onclick = () => {
                            window.location.href = '/' + item.url.replace(/^\/+/, '');
                        };

                        fragment.appendChild(row);
                    });

                    searchResults.appendChild(fragment);
                } else {
                    searchResults.style.display = 'block';
                    searchResults.innerHTML = '<div style="padding: 12px 14px; font-size: 13px; color: #64748b; text-align: center;">No matching topics found</div>';
                }
            }, 30);
        });

        document.addEventListener('click', function(e) {
            if (!searchInput.contains(e.target) && !searchResults.contains(e.target)) {
                searchResults.style.display = 'none';
            }
        });
    }
}, 100);