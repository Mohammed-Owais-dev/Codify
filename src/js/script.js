/**
 * ==========================================================================
 * CODIFY - CORE INTERACTIVE ENGINE & RUNTIME PIPELINE LAYER
 * Fully Optimized, Unified, and Repaired
 * ==========================================================================
 */

document.addEventListener('DOMContentLoaded', () => {
    
    // ----------------------------------------------------------------------
    // 1. DYNAMIC GLOBAL CORE DOM SELECTORS
    // ----------------------------------------------------------------------
    const menuToggle = document.getElementById('menuToggle');
    const navLinks = document.getElementById('navLinks');
    const sidebarToggle = document.getElementById('sidebarToggle');
    const sidebarToggleMobile = document.getElementById('sidebarToggleMobile');
    const sidebarNav = document.getElementById('sidebarNav');
    
    const contentTitle = document.getElementById('contentTitle');
    const contentDescription = document.getElementById('contentDescription');
    const breadcrumbCurrent = document.getElementById('breadcrumbCurrent');
    const topicLinks = document.querySelectorAll('.topic-link');

    // ----------------------------------------------------------------------
    // 2. MOBILE TOP NAV hamburger DROPDOWN INTERACTION
    // ----------------------------------------------------------------------
    if (menuToggle && navLinks) {
        const toggleMobileMenu = (e) => {
            e.stopPropagation();
            menuToggle.classList.toggle('active');
            navLinks.classList.toggle('active');
        };

        menuToggle.addEventListener('click', toggleMobileMenu);
        menuToggle.addEventListener('touchstart', toggleMobileMenu, { passive: true });

        // Auto-close dropdown when a link is clicked
        navLinks.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                menuToggle.classList.remove('active');
                navLinks.classList.remove('active');
            });
        });
    }

    // ----------------------------------------------------------------------
    // 3. SIDEBAR LOCKING COLUMN & DYNAMIC RETRACTION MANAGERS
    // ----------------------------------------------------------------------
    function toggleSidebarView(e) {
        if (!sidebarNav) return;
        if (e) e.stopPropagation();
        
        if (window.innerWidth > 768) {
            // Desktop Split: Toggle structural layout metrics (25% / 75% vs 0% / 100%)
            sidebarNav.classList.toggle('collapsed');
            document.querySelector('.page-wrapper')?.classList.toggle('sidebar-is-collapsed');
        } else {
            // Mobile Overlay: Toggle off-canvas left drawer sliders
            sidebarNav.classList.toggle('active');
        }

        // Synchronize display text toggles seamlessly
        [sidebarToggle, sidebarToggleMobile].forEach(btn => {
            if (!btn) return;
            const toggleIcon = btn.querySelector('.toggle-icon');
            if (toggleIcon) {
                toggleIcon.textContent = sidebarNav.classList.contains('active') ? '✕ Close Index' : '☰ Course Index';
            }
        });
    }

    if (sidebarToggle) sidebarToggle.addEventListener('click', toggleSidebarView);
    if (sidebarToggleMobile) sidebarToggleMobile.addEventListener('click', toggleSidebarView);

    // Click Outside Dismissal Engine
    document.addEventListener('click', (e) => {
        if (menuToggle && navLinks && !menuToggle.contains(e.target) && !navLinks.contains(e.target)) {
            menuToggle.classList.remove('active');
            navLinks.classList.remove('active');
        }
        if (sidebarNav && sidebarNav.classList.contains('active') &&
            (!sidebarToggle || !sidebarToggle.contains(e.target)) && 
            (!sidebarToggleMobile || !sidebarToggleMobile.contains(e.target)) && 
            !sidebarNav.contains(e.target)) {
            
            sidebarNav.classList.remove('active');
            const toggleIcon = sidebarToggle?.querySelector('.toggle-icon') || sidebarToggleMobile?.querySelector('.toggle-icon');
            if (toggleIcon) toggleIcon.textContent = '☰ Course Index';
        }
    });

    // ----------------------------------------------------------------------
    // 4. SIDEBAR CHAPTER NAVIGATION ACCORDIONS (SVG SAFE FIX)
    // ----------------------------------------------------------------------
    document.querySelectorAll('.tree-node').forEach(node => {
        node.addEventListener('click', () => {
            const branch = node.parentElement;
            if (!branch) return;

            // Simply toggle class — CSS handles all smooth rotation & sliding physics!
            branch.classList.toggle('expanded');
        });
    });

    // ----------------------------------------------------------------------
    // 5. ACTIVE MULTI-PAGE PATH AUTO-HIGHLIGHTER ROUTER
    // ----------------------------------------------------------------------
    const currentFile = window.location.pathname.substring(window.location.pathname.lastIndexOf('/') + 1);
    
    document.querySelectorAll('.tree-leaves a, .tree-children a, .topic-link').forEach(link => {
        const hrefAttr = link.getAttribute('href');
        if (hrefAttr && currentFile !== '' && hrefAttr.includes(currentFile)) {
            link.classList.add('active');
            
            // Auto-expand active chapter category panels on system initialization
            let parentBranch = link.closest('.tree-branch');
            if (parentBranch) parentBranch.classList.add('expanded');
        }
    });

    topicLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            // Only use single-page prevention if intentionally handling localized DOM switches
            if (link.getAttribute('href').startsWith('#')) {
                e.preventDefault();
                topicLinks.forEach(l => l.classList.remove('active'));
                link.classList.add('active');

                const dynamicTitle = link.getAttribute('data-title') || link.textContent;
                if (contentTitle) contentTitle.textContent = dynamicTitle;
                if (breadcrumbCurrent) breadcrumbCurrent.textContent = dynamicTitle;
            }

            if (sidebarNav && sidebarNav.classList.contains('active')) {
                sidebarNav.classList.remove('active');
            }
        });
    });

    // ----------------------------------------------------------------------
    // 6. CYBER IMMERSIVE MODULAR IMAGE LIGHTBOX
    // ----------------------------------------------------------------------
    const lightbox = document.getElementById('imageLightbox');
    const lightboxTarget = document.getElementById('lightboxTarget');
    const lightboxClose = document.getElementById('lightboxClose');
    const clickableImages = document.querySelectorAll('.clickable-img');

    if (lightbox && lightboxTarget) {
        clickableImages.forEach(img => {
            img.addEventListener('click', () => {
                lightboxTarget.src = img.src;
                lightboxTarget.alt = img.alt;
                lightbox.classList.add('active');
            });
        });

        const closeLightbox = () => { lightbox.classList.remove('active'); };
        if (lightboxClose) lightboxClose.addEventListener('click', closeLightbox);
        lightbox.addEventListener('click', (e) => { if (e.target === lightbox) closeLightbox(); });
    }

    // ----------------------------------------------------------------------
    // 7. COMPILER PIPELINE EXECUTION SIMULATOR CONSOLE
    // ----------------------------------------------------------------------
    const simBtn = document.getElementById('simBtn');
    const consoleBox = document.getElementById('simConsole');
    
    if (simBtn && consoleBox) {
        const steps = [
            { id: 'step1', text: '> Loading "hello.py" text stream into system memory buffer layer...' },
            { id: 'step2', text: '> Running lexical analysis parser tree algorithms... Syntax verification checks cleanly verified. Dispatching data tokens to compilation process...' },
            { id: 'step3', text: '> Building virtual runtime structures. Compiling operational byte maps. Saved bytecode cache to: "__pycache__/hello.cpython-312.pyc" safely.' },
            { id: 'step4', text: '> PVM dynamic translation processing running actively. Directing structural instructions out to physical motherboard processor interfaces...\n\n[Console Output Log]: "Hello, World!"' }
        ];
        let currentPhase = -1;

        simBtn.addEventListener('click', () => {
            if (currentPhase >= steps.length - 1) {
                document.querySelectorAll('.sim-step').forEach(s => s.classList.remove('active'));
                currentPhase = -1;
            }
            currentPhase++;
            const targetStep = document.getElementById(steps[currentPhase].id);
            if (targetStep) targetStep.classList.add('active');
            consoleBox.innerText = steps[currentPhase].text;
            simBtn.innerText = (currentPhase === steps.length - 1) ? "Restart Script Simulation" : "Advance Next Stage";
        });
    }

    // ----------------------------------------------------------------------
    // 8. RUNTIME TOKENIZER IDENTIFIER VARIABLE SCRIPT VALIDATOR
    // ----------------------------------------------------------------------
    const validateBtn = document.getElementById('validateBtn');
    const identifierInput = document.getElementById('identifierInput');
    const validationFeedback = document.getElementById('validationFeedback');

    if (validateBtn && identifierInput && validationFeedback) {
        validateBtn.addEventListener('click', () => {
            const val = identifierInput.value.trim();
            validationFeedback.className = "validation-feedback";

            const keywords = ['False', 'None', 'True', 'and', 'as', 'assert', 'async', 'await', 'break', 'class', 'continue', 'def', 'del', 'elif', 'else', 'except', 'finally', 'for', 'from', 'global', 'if', 'import', 'in', 'is', 'lambda', 'nonlocal', 'not', 'or', 'pass', 'raise', 'return', 'try', 'while', 'with', 'yield'];

            if (!val) {
                validationFeedback.innerText = "Please input a text sequence to analyze.";
                validationFeedback.className = "validation-feedback feedback-invalid";
                return;
            }
            if (keywords.includes(val)) {
                validationFeedback.innerText = `✗ "${val}" is an official Python Keyword. You cannot use it as a custom identifier.`;
                validationFeedback.className = "validation-feedback feedback-invalid";
                return;
            }

            const identifierRegex = /^[a-zA-Z_][a-zA-Z0-9_]*$/;
            if (identifierRegex.test(val)) {
                validationFeedback.innerText = `✓ "${val}" is a valid identifier. It follows all Python syntax naming rules perfectly.`;
                validationFeedback.className = "validation-feedback feedback-valid";
            } else {
                validationFeedback.innerText = /^[0-9]/.test(val) 
                    ? `✗ Invalid. "${val}" starts with a numeric digit. Identifiers must begin with an alphabetic character or underscore.`
                    : `✗ Invalid name structure. Identifiers cannot contain spaces, dashes, or special punctuation marks.`;
                validationFeedback.className = "validation-feedback feedback-invalid";
            }
        });
    }

    // ----------------------------------------------------------------------
    // 9. HIGH-PERFORMANCE GLOBAL AUTOMATED CODE CLIPBOARD MANAGEMENT
    // ----------------------------------------------------------------------
    document.querySelectorAll('.copy-btn').forEach(btn => {
        btn.addEventListener('click', async () => {
            const container = btn.closest('.cyber-code-container') || btn.closest('.code-box');
            const codeEl = container?.querySelector('code') || container?.querySelector('pre');
            if (!codeEl) return;
            try {
                await navigator.clipboard.writeText(codeEl.textContent.trim());
                const oldText = btn.innerText;
                btn.innerText = "✓ Copied!";
                setTimeout(() => { btn.innerText = oldText; }, 2000);
            } catch (err) { console.error("Clipboard failure: ", err); }
        });
    });
});

// ----------------------------------------------------------------------
// 10. PHYSICAL INLINE HOOK ATTACHMENTS (STANDALONE ARCHITECTURE)
// ----------------------------------------------------------------------
function showKeywordDef(name, description) {
    const consoleBox = document.getElementById('keywordConsole');
    if (consoleBox) {
        consoleBox.style.display = "block";
        consoleBox.innerHTML = `<strong>Term [${name}]:</strong> ${description}`;
    }
}

// ----------------------------------------------------------------------
    // 11. PROFESSIONAL LIVE ENGINE SITE-SEARCH ENGINE (HUD MODAL SYSTEM)
    // ----------------------------------------------------------------------
    
    // Comprehensive Index Mapping Database containing all contents across site platforms
    const siteContentDatabase = [
        { title: "Home Dashboard", url: "/index.html", category: "System", keywords: "welcome landing campus learn cs main", desc: "The foundational entryway launchpad containing information summary streams for Codify courses." },
        { title: "Course Curriculum Overview", url: "/course.html", category: "Dashboard", keywords: "tracks selection menu python java database system architecture modules modules", desc: "Comprehensive collection platform to navigate tracks, access evaluations, and launch learning nodes." },
        { title: "1.1 History of Python", url: "/src/courses/python/chapter-1/1.1-history-of-python.html", category: "Python basics", keywords: "guido van rossum abc language programming origins 1991 standard general intent", desc: "Discover the chronological origin story and design paradigms established during Python's creation matrix." },
        { title: "1.2 Python Core Features", url: "/src/courses/python/chapter-1/1.2-list-python-features.html", category: "Python basics", keywords: "batteries included open source platform independent high level dynamic interpretation object oriented readable syntax libraries", desc: "Analyze technical capabilities including automatic platform management vectors, object bindings, and implicit compilation workflows." },
        { title: "1.3 Applications of Python", url: "/src/courses/python/chapter-1/1.3-list-and-explian-applications-of-python.html", category: "Python basics", keywords: "web development artificial intelligence data science machine learning automation scraping django framework statistics flask scripts api desktop apps", desc: "Breakdown structural systems leveraging computational toolkits across neural networking models, automation frameworks, and web architectures." },
        { title: "1.4 Explaining Python IDLE", url: "/src/courses/python/chapter-1/1.4-explain-python-idle.html", category: "Python basics", keywords: "integrated development learning environment script window interactive shell debugger syntax check shortcut execution keys run module f5 save print statements text editor", desc: "Master configuration controls across standard interactive shells, syntax debugging highlights, and compilation output pipelines." },
        { title: "1.5 Running Python Scripts", url: "/src/courses/python/chapter-1/1.5-explain-process-of-running-python-scripts.html", category: "Python basics", keywords: "compilation steps source code conversion interpreter execution layer dynamic pvm virtual machine engine runtimes compilation bytecode file format pyc path logic variables", desc: "Track low-level mechanics mapping operations from structural plaintext definitions into optimized bytecode maps interpreted inside hardware states." },
        { title: "1.6 Identifiers, Keywords & Indentation Rules", url: "/src/courses/python/chapter-1/1.6-explain-identifier-keywords-indentation.html", category: "Python basics", keywords: "variable naming definitions case sensitive keywords blocks system scope space code structural indentation errors indentationerror tokens logic validation tester tools definitions functions class structure formatting parameters alignment", desc: "Examine strict semantic conventions regulating structural layout boundaries, namespace parameters, and naming safety formats within scope stacks." }
    ];

    const searchOverlay = document.getElementById('searchOverlayModal');
    const inputTrigger = document.getElementById('siteSearchTrigger');
    const modalInput = document.getElementById('modalSearchInput');
    const modalClose = document.getElementById('modalSearchClose');
    const resultsList = document.getElementById('searchResultsList');
    const statusBox = document.getElementById('searchResultsStatus');
    let focusedResultIndex = -1;

    if (searchOverlay && modalInput && resultsList && statusBox) {
        
        // Open Search Modal HUD Function
        const openSearchHUD = (e) => {
            if (e) e.preventDefault();
            searchOverlay.classList.add('active');
            searchOverlay.setAttribute('aria-hidden', 'false');
            setTimeout(() => { modalInput.focus(); }, 50);
            focusedResultIndex = -1;
        };

        // Close Search Modal HUD Function
        const closeSearchHUD = () => {
            searchOverlay.classList.remove('active');
            searchOverlay.setAttribute('aria-hidden', 'true');
            modalInput.value = "";
            resultsList.innerHTML = "";
            statusBox.style.display = "block";
            statusBox.innerText = "Start typing to search your course parameters...";
        };

        // Bind interactive activation entry listeners
        if (inputTrigger) {
            inputTrigger.addEventListener('click', openSearchHUD);
            inputTrigger.addEventListener('focus', openSearchHUD);
        }
        if (modalClose) modalClose.addEventListener('click', closeSearchHUD);

        // Highlight Matching Characters Function
        const textHighlightMatch = (text, query) => {
            if (!query) return text;
            const matchRegex = new RegExp(`(${query.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&')})`, 'gi');
            return text.replace(matchRegex, '<span class="search-match-hl">$1</span>');
        };

        // Live Processing Evaluation Query Engine
        modalInput.addEventListener('input', () => {
            const query = modalInput.value.trim().toLowerCase();
            resultsList.innerHTML = "";
            focusedResultIndex = -1;

            if (!query) {
                statusBox.style.display = "block";
                statusBox.innerText = "Start typing to search your course parameters...";
                return;
            }

            // Filter database array matches matching metrics across title, category tags or core text descriptors
            const resultsMatches = siteContentDatabase.filter(item => 
                item.title.toLowerCase().includes(query) ||
                item.category.toLowerCase().includes(query) ||
                item.keywords.toLowerCase().includes(query) ||
                item.desc.toLowerCase().includes(query)
            );

            if (resultsMatches.length === 0) {
                statusBox.style.display = "block";
                statusBox.innerText = `No site parameters discovered matching sequence: "${modalInput.value}"`;
                return;
            }

            statusBox.style.display = "none"; // Hide system message grid to give space for results lists

            // Injects dynamic matches directly into live UI list nodes
            resultsMatches.forEach((result, idx) => {
                const li = document.createElement('li');
                li.className = "search-result-item";
                li.setAttribute('data-index', idx);
                
                li.innerHTML = `
                    <a href="${result.url}">
                        <div class="result-item-title">
                            <span>${textHighlightMatch(result.title, query)}</span>
                            <span class="result-item-category">${textHighlightMatch(result.category, query)}</span>
                        </div>
                        <div class="result-item-desc">${textHighlightMatch(result.desc, query)}</div>
                    </a>
                `;
                resultsList.appendChild(li);
            });
        });

        // Sync Focus State Highlights during index keyboard tracking configurations
        const refreshItemKeyboardFocus = (itemsList) => {
            itemsList.forEach(item => item.classList.remove('selected'));
            if (focusedResultIndex >= 0 && focusedResultIndex < itemsList.length) {
                const focusedItem = itemsList[focusedResultIndex];
                focusedItem.classList.add('selected');
                focusedItem.scrollIntoView({ block: 'nearest' }); // Smooth view alignment tracking
            }
        };

        // Global Keydown Keyboard Event Manager for Search shortcuts (⌘K / ESC / Arrows / Enter)
        document.addEventListener('keydown', (e) => {
            // Open search on Ctrl+K / Cmd+K combo inputs
            if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
                e.preventDefault();
                openSearchHUD();
                return;
            }

            // Exit modal cleanly on hitting Escape key
            if (e.key === 'Escape' && searchOverlay.classList.contains('active')) {
                closeSearchHUD();
                return;
            }

            // Keyboard Arrow Actions logic context when search overlay module is running actively
            if (searchOverlay.classList.contains('active')) {
                const searchItems = resultsList.querySelectorAll('.search-result-item');
                if (searchItems.length === 0) return;

                if (e.key === 'ArrowDown') {
                    e.preventDefault();
                    focusedResultIndex = (focusedResultIndex + 1 >= searchItems.length) ? 0 : focusedResultIndex + 1;
                    refreshItemKeyboardFocus(searchItems);
                } else if (e.key === 'ArrowUp') {
                    e.preventDefault();
                    focusedResultIndex = (focusedResultIndex - 1 < 0) ? searchItems.length - 1 : focusedResultIndex - 1;
                    refreshItemKeyboardFocus(searchItems);
                } else if (e.key === 'Enter') {
                    if (focusedResultIndex >= 0 && focusedResultIndex < searchItems.length) {
                        e.preventDefault();
                        const targetedLink = searchItems[focusedResultIndex].querySelector('a');
                        if (targetedLink) targetedLink.click(); // Trigger routing choice sequence execution
                    }
                }
            }
        });
    }

// ==========================================================================
// 13. HIGH-FIDELITY AUTOMATED DATA EXPORT ENGINE (COPY & DOWNLOAD BLOCKS)
// ==========================================================================
document.addEventListener('DOMContentLoaded', () => {
    const codeSource = document.getElementById('zenOfPythonSource');
    const copyTrigger = document.getElementById('zenCopyTrigger');
    const downloadTrigger = document.getElementById('zenDownloadTrigger');

    if (!codeSource) return;

    // A. Clean Asynchronous Secure Clipboard Handler
    if (copyTrigger) {
        copyTrigger.addEventListener('click', async () => {
            try {
                // Extract text directly from the specific code DOM node scope boundary
                const textContent = codeSource.textContent;
                await navigator.clipboard.writeText(textContent);
                
                // Active visual confirmation update state indicators
                const legacyLabel = copyTrigger.innerHTML;
                copyTrigger.innerHTML = `✓ Copied!`;
                copyTrigger.style.borderColor = "#2ea44f";
                copyTrigger.style.color = "#56d364";
                
                setTimeout(() => {
                    copyTrigger.innerHTML = legacyLabel;
                    copyTrigger.style.borderColor = "";
                    copyTrigger.style.color = "";
                }, 2000);
            } catch (error) {
                console.error("System pipeline execution fault tracing clipboard: ", error);
            }
        });
    }

    // B. Client-Side Virtual File Stream Generator (Download Engine)
    if (downloadTrigger) {
        downloadTrigger.addEventListener('click', () => {
            try {
                const rawText = codeSource.textContent;
                
                // Pack raw plaintext contents into an explicit script data array blob container
                const textBlob = new Blob([rawText], { type: 'text/plain' });
                
                // Build a virtual processing element route target inside runtime scope
                const downloadAnchor = document.createElement('a');
                
                // Convert the raw text storage array into an executable framework URL reference
                downloadAnchor.download = "zen_of_python.py";
                downloadAnchor.href = window.URL.createObjectURL(textBlob);
                downloadAnchor.style.display = "none";
                
                // Inject, fire click handler triggers, and systematically clean memory traces
                document.body.appendChild(downloadAnchor);
                downloadAnchor.click();
                
                document.body.removeChild(downloadAnchor);
                window.URL.revokeObjectURL(downloadAnchor.href);
                
                // Dynamic Download Completion Visual State Indicator
                const legacyDownloadLabel = downloadTrigger.innerHTML;
                downloadTrigger.innerHTML = `✓ Downloaded`;
                downloadTrigger.style.borderColor = "#2ea44f";
                downloadTrigger.style.color = "#56d364";
                
                setTimeout(() => {
                    downloadTrigger.innerHTML = legacyDownloadLabel;
                    downloadTrigger.style.borderColor = "";
                    downloadTrigger.style.color = "";
                }, 2000);
            } catch (err) {
                console.error("Critical failure during download engine initialization: ", err);
            }
        });
    }
});

// ==========================================================================
// 14. INTERACTIVE TERMINAL HUD CONTROLLER & HYBRID DATA EXPORT ENGINE
// ==========================================================================
document.addEventListener('DOMContentLoaded', () => {
    const terminalTrigger = document.getElementById('zenTerminalTrigger');
    const outputPoem = document.getElementById('zenOutputPoem');
    const copyBtn = document.getElementById('zenCopyTrigger');
    const downloadBtn = document.getElementById('zenDownloadTrigger');

    // 1. Core Sandbox compilation execution display layout routine
    if (terminalTrigger && outputPoem) {
        terminalTrigger.addEventListener('click', () => {
            outputPoem.style.display = "block";
            terminalTrigger.closest('.zen-interactive-terminal')?.classList.add('compiled');
            terminalTrigger.style.borderColor = "#00aaff";
            terminalTrigger.style.boxShadow = "0 0 15px rgba(0, 170, 255, 0.15)";
        });
    }

    // Isolated Helper Function to safely parse pristine text parameters out of the template
    const extractCleanPhilosophyText = () => {
        if (!outputPoem) return "";
        // Clone the wrapper content node array to process filters safely in isolation
        const documentClone = outputPoem.cloneNode(true);
        // Eliminate the success log status banner element completely from the text stream mapping
        const successLogNode = documentClone.querySelector('.terminal-success-log');
        if (successLogNode) {
            documentClone.removeChild(successLogNode);
        }
        return documentClone.textContent.trim();
    };

    // 2. Clipboard API execution logic block
    if (copyBtn) {
        copyBtn.addEventListener('click', async (e) => {
            e.stopPropagation(); // Prevents clicking the copy button from firing the parent canvas click loop
            const cleanText = extractCleanPhilosophyText();
            if (!cleanText) return;

            try {
                await navigator.clipboard.writeText(cleanText);
                const originalLayout = copyBtn.innerHTML;
                copyBtn.innerHTML = `✓ Copied!`;
                copyBtn.style.borderColor = "#2ea44f";
                copyBtn.style.color = "#56d364";

                setTimeout(() => {
                    copyBtn.innerHTML = originalLayout;
                    copyBtn.style.borderColor = "";
                    copyBtn.style.color = "";
                }, 2000);
            } catch (err) {
                console.error("Failed to copy terminal buffer allocation layout streams: ", err);
            }
        });
    }

    // 3. Virtual Local text downloader logic block
    if (downloadBtn) {
        downloadBtn.addEventListener('click', (e) => {
            e.stopPropagation(); // Prevents triggering the console activation script logic loop 
            const cleanExportData = extractCleanPhilosophyText();
            if (!cleanExportData) return;

            try {
                const textBlob = new Blob([cleanExportData], { type: 'text/plain' });
                const virtualAnchor = document.createElement('a');
                
                virtualAnchor.download = "zen_of_python.py";
                virtualAnchor.href = window.URL.createObjectURL(textBlob);
                virtualAnchor.style.display = "none";
                
                document.body.appendChild(virtualAnchor);
                virtualAnchor.click();
                
                document.body.removeChild(virtualAnchor);
                window.URL.revokeObjectURL(virtualAnchor.href);

                const originalDownloadLayout = downloadBtn.innerHTML;
                downloadBtn.innerHTML = `✓ Downloaded`;
                downloadBtn.style.borderColor = "#2ea44f";
                downloadBtn.style.color = "#56d364";

                setTimeout(() => {
                    downloadBtn.innerHTML = originalDownloadLayout;
                    downloadBtn.style.borderColor = "";
                    downloadBtn.style.color = "";
                }, 2000);
            } catch (err) {
                console.error("Failed to generate file package downpour streams: ", err);
            }
        });
    }
});

// ==========================================
        // CODE CONTAINER ACTIONS (COPY, DOWLOAD, RUN)
        // ==========================================

        function getCleanText(elementId) {
            // Extracts text without HTML tags for copying and downloading
            const el = document.getElementById(elementId);
            return el.innerText || el.textContent;
        }

        function copyCode(elementId, btnElement) {
            const codeText = getCleanText(elementId);
            navigator.clipboard.writeText(codeText).then(() => {
                const tooltip = btnElement.querySelector('.tooltip');
                tooltip.style.opacity = '1';
                setTimeout(() => { tooltip.style.opacity = '0'; }, 2000);
            }).catch(err => {
                console.error("Failed to copy text: ", err);
            });
        }

        function downloadCode(elementId, filename) {
            const codeText = getCleanText(elementId);
            const blob = new Blob([codeText], { type: 'text/plain' });
            const link = document.createElement('a');
            link.href = window.URL.createObjectURL(blob);
            link.download = filename;
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        }

        function runCode(outputId) {
            const outputEl = document.getElementById(outputId);
            // Toggle display
            if (outputEl.style.display === 'block') {
                outputEl.style.display = 'none';
            } else {
                outputEl.style.display = 'block';
            }
        }

        // ==========================================
        // QUIZ INTERACTIVE LOGIC
        // ==========================================
        function handleAnswer(btnElement, isCorrect, questionNumber) {
            const optionsContainer = btnElement.parentElement;

            // Lock all buttons so user can't click multiple times
            const allButtons = optionsContainer.querySelectorAll('.q-option');
            allButtons.forEach(btn => btn.classList.add('locked'));

            // Apply styling
            if (isCorrect) {
                btnElement.classList.add('correct');
            } else {
                btnElement.classList.add('incorrect');
                // Reveal the true answer if they got it wrong
                allButtons.forEach(btn => {
                    if (btn.getAttribute('onclick').includes('true')) {
                        btn.classList.add('correct');
                        btn.style.opacity = "0.7"; // Dim slightly to show it wasn't their choice
                    }
                });
            }

            // Show the "Next" button
            document.getElementById('next-' + questionNumber).style.display = 'block';
        }

        function nextQuestion(currentNumber) {
            document.getElementById('qb-' + currentNumber).classList.remove('active-question');
            document.getElementById('qb-' + (currentNumber + 1)).classList.add('active-question');
        }

        function finishQuiz() {
            document.getElementById('qb-5').classList.remove('active-question');
            document.getElementById('qb-complete').classList.add('active');
        }

        document.addEventListener('DOMContentLoaded', () => {
    // 1. Core DOM Object Selectors
    const lightbox = document.getElementById('globalLightbox');
    const lightboxImg = document.getElementById('lightboxTargetImg');
    const closeBtn = document.getElementById('closeLightbox');
    const hudBox = document.getElementById('lightboxHudBox');
    const dismissHudBtn = document.getElementById('dismissHudBtn');
    const pageImages = document.querySelectorAll('.content-image-wrapper img');

    // 2. Mechanics & Transformation States
    let currentZoom = 1.0;
    let translateX = 0;
    let translateY = 0;
    
    const ZOOM_STEP = 0.25;
    const MAX_ZOOM = 4.0;
    const MIN_ZOOM = 0.5;

    // Panning (Move) Specific States
    let isDragging = false;
    let startX = 0;
    let startY = 0;

    if (lightbox && lightboxImg) {
        
        // Unified UI Matrix Synchronizer Routine
        const applyTransformState = () => {
            lightboxImg.style.transform = `translate(${translateX}px, ${translateY}px) scale(${currentZoom})`;
        };

        // Zoom Execution Routines
        const performZoomIn = () => {
            if (currentZoom < MAX_ZOOM) {
                currentZoom += ZOOM_STEP;
                if (currentZoom > MAX_ZOOM) currentZoom = MAX_ZOOM;
                applyTransformState();
            }
        };

        const performZoomOut = () => {
            if (currentZoom > MIN_ZOOM) {
                currentZoom -= ZOOM_STEP;
                if (currentZoom < MIN_ZOOM) currentZoom = MIN_ZOOM;
                if (currentZoom === 1.0) {
                    translateX = 0;
                    translateY = 0;
                }
                applyTransformState();
            }
        };

        const resetTransformState = () => {
            currentZoom = 1.0;
            translateX = 0;
            translateY = 0;
            applyTransformState();
        };

        // --- MOVE/PAN ACTIVE LISTENERS ---
        lightboxImg.addEventListener('mousedown', (e) => {
            e.preventDefault(); 
            isDragging = true;
            lightboxImg.classList.add('dragging');
            startX = e.clientX - translateX;
            startY = e.clientY - translateY;
        });

        window.addEventListener('mousemove', (e) => {
            if (!isDragging) return;
            translateX = e.clientX - startX;
            translateY = e.clientY - startY;
            applyTransformState();
        });

        window.addEventListener('mouseup', () => {
            if (isDragging) {
                isDragging = false;
                lightboxImg.classList.remove('dragging');
            }
        });

        // Open Lightbox Hook
        pageImages.forEach(img => {
            img.addEventListener('click', () => {
                lightboxImg.src = img.src;
                lightboxImg.alt = img.alt;
                resetTransformState(); 
                
                // NEW BEHAVIOR: Always show the instruction box on fresh entrance
                if (hudBox) hudBox.classList.remove('hud-hidden');
                
                lightbox.classList.add('active');
                document.body.style.overflow = 'hidden'; 
            });
        });

        // Close/Dismiss Routine
        const dismissLightbox = () => {
            lightbox.classList.remove('active');
            document.body.style.overflow = ''; 
            setTimeout(() => { lightboxImg.src = ''; }, 400);
        };

        if (closeBtn) closeBtn.addEventListener('click', dismissLightbox);
        
        lightbox.addEventListener('click', (e) => {
            if (e.target === lightbox || e.target === closeBtn) {
                dismissLightbox();
            }
        });

        // NEW FEATURE ACTION: Hide the HUD shortcut container on click smoothly
        if (dismissHudBtn && hudBox) {
            dismissHudBtn.addEventListener('click', (e) => {
                e.stopPropagation(); // Stops parent container click triggers
                hudBox.classList.add('hud-hidden');
            });
        }

        if (hudBox) {
            hudBox.addEventListener('click', (e) => {
                e.stopPropagation();
            });
        }

        // Trackpad / Mouse Scroll Wheel Handling Engine
        lightbox.addEventListener('wheel', (e) => {
            e.preventDefault();
            if (e.deltaY < 0) {
                performZoomIn();
            } else {
                performZoomOut();
            }
        }, { passive: false });

        // Keyboard Shortcut Keys Intercept Map Loop
        document.addEventListener('keydown', (e) => {
            if (lightbox.classList.contains('active')) {
                if (e.key === 'Escape') dismissLightbox();
                if (e.key === '+' || e.key === '=') performZoomIn();
                if (e.key === '-') performZoomOut();
                if (e.key === '0') resetTransformState();
            }
        });
    }
});