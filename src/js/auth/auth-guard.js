// auth-guard.js
import { supabase } from '/supabase-client.js';

async function verifyAuthAndFetchProfile() {
    // Check session status
    const { data: { user }, error: authError } = await supabase.auth.getUser();

    if (authError || !user) {
        // User not logged in -> redirect to login page
        window.location.href = '/login.html';
        return null;
    }

    // Fetch user details from public.profiles table
    const { data: profile, error: profileError } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', user.id)
        .single();

    if (profileError) {
        console.error('Error loading profile context:', profileError.message);
    }

    return { user, profile };
}

// Global Sign Out function
export async function handleSignOut() {
    const { error } = await supabase.auth.signOut();
    if (!error) {
        window.location.href = '/login.html';
    }
}

// Execute session verification on file load
verifyAuthAndFetchProfile().then(context => {
    if (context && context.profile) {
        // Example: Display current user name dynamically on your UI elements if they exist
        const userNameDisplays = document.querySelectorAll('.user-display-name');
        userNameDisplays.forEach(el => el.textContent = context.profile.full_name || 'Student');
    }
});