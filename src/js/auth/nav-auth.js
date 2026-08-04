import { supabase } from '../config/supabase-client.js';

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

// 2. Toggle Dropdown Menu Visibility
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

// 4. Render Dynamic Navbar Authentication State with Profile Picture
async function renderNavbarAuth() {
    const authNavGroup = document.getElementById('authNavGroup');
    if (!authNavGroup) return;

    try {
        // Fetch current session
        const { data: { session } } = await supabase.auth.getSession();
        const user = session?.user;

        if (user) {
            // Fetch avatar_url alongside display_name and username from Supabase
            const { data: profile } = await supabase
                .from('profiles')
                .select('avatar_url, first_name, display_name, username')
                .eq('id', user.id)
                .maybeSingle();

            const userMetaData = user.user_metadata || {};

            // Prioritize Database Storage Avatar -> Auth Metadata -> Google Avatar
            const avatarUrl = profile?.avatar_url || userMetaData.avatar_url || userMetaData.picture;

            // Name & Username Handle formatting
            const emailPrefix = user.email ? user.email.split('@')[0] : 'user';
            const firstName = profile?.first_name || userMetaData.first_name || userMetaData.given_name;
            const displayName = profile?.display_name?.trim() || firstName || userMetaData.full_name || emailPrefix;
            const username = profile?.username ? `@${profile.username}` : `@${displayName.toLowerCase().replace(/\s+/g, '')}`;

            // Initial letter fallback if image is missing
            const dpInitial = displayName.charAt(0).toUpperCase();

            // Construct Avatar HTML (Image if present, otherwise Initial Badge)
            const btnAvatarHtml = avatarUrl
                ? `<img src="${avatarUrl}" alt="${displayName}" style="width: 36px; height: 36px; border-radius: 50%; object-fit: cover; border: 2px solid #00aaff;">`
                : `<span class="initial-badge">${dpInitial}</span>`;

            const dropdownHeaderAvatarHtml = avatarUrl
                ? `<img src="${avatarUrl}" alt="${displayName}" style="width: 42px; height: 42px; border-radius: 50%; object-fit: cover;">`
                : `${dpInitial}`;

            // Inject Profile Dropdown HTML
            authNavGroup.innerHTML = `
                <div class="user-profile-menu" id="userProfileMenu">
                    <button class="profile-avatar-btn" onclick="toggleProfileMenu(event)" aria-label="User Profile">
                        ${btnAvatarHtml}
                    </button>

                    <div class="profile-dropdown-menu" id="profileDropdownMenu">
                        <div class="dropdown-header">
                            <div class="dropdown-avatar-small">${dropdownHeaderAvatarHtml}</div>
                            <div class="dropdown-user-details">
                                <span class="dropdown-user-name">${displayName}</span>
                                <span class="dropdown-user-handle" style="font-size: 0.78rem; color: #00aaff; font-weight: 600;">${username}</span>
                                <span class="dropdown-user-email">${user.email}</span>
                            </div>
                        </div>

                        <div class="dropdown-body">
                            <a href="/src/profile/profile.html" class="dropdown-item">
                                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                                    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                                    <circle cx="12" cy="7" r="4"></circle>
                                </svg>
                                View Profile
                            </a>

                            <a href="/src/pages/courses.html" class="dropdown-item">
                                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                                    <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"></path>
                                    <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"></path>
                                </svg>
                                Enrolled Courses
                            </a>

                            <a href="/src/pages/certificate.html" class="dropdown-item">
                                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                                    <circle cx="12" cy="8" r="7"></circle>
                                    <polyline points="8.21 13.89 7 23 12 20 17 23 15.79 13.88"></polyline>
                                </svg>
                                Certificates
                            </a>

                            <a href="/src/profile/account-settings.html" class="dropdown-item">
                                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                                    <circle cx="12" cy="12" r="3"></circle>
                                    <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"></path>
                                </svg>
                                Account Settings
                            </a>

                            <div class="dropdown-divider"></div>

                            <button class="dropdown-item logout-btn" onclick="handleSignOut()">
                                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                                    <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path>
                                    <polyline points="16 17 21 12 16 7"></polyline>
                                    <line x1="21" y1="12" x2="9" y2="12"></line>
                                </svg>
                                Sign Out
                            </button>
                        </div>
                    </div>
                `;
        } else {
            // Unauthenticated Guest state
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

// Single auth change listener
supabase.auth.onAuthStateChange((event) => {
    if (['SIGNED_IN', 'SIGNED_OUT', 'TOKEN_REFRESHED', 'USER_UPDATED'].includes(event)) {
        renderNavbarAuth();
    }
});

// Run immediately when DOM is ready
document.addEventListener('DOMContentLoaded', renderNavbarAuth);