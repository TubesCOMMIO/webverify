    // Check url fragment tracking arrays for verified tokens instantly on DOM load
window.addEventListener('DOMContentLoaded', () => {
    // Render the server name directly from the centralized config file
    if (typeof GLOBAL_AUTH_SETTINGS !== 'undefined') {
        document.getElementById('display-server-name').innerText = GLOBAL_AUTH_SETTINGS.serverName;
    }

    const fragmentParams = new URLSearchParams(window.location.hash.substring(1));
    const accessToken = fragmentParams.get('access_token');

    if (accessToken) {
        // Fetch User profile info from Discord endpoint matrix API structures
        fetch('https://discord.com/api/v10/users/@me', {
            headers: { 'Authorization': `Bearer ${accessToken}` }
        })
        .then(response => response.json())
        .then(userData => {
            const profileBadge = document.getElementById('user-profile-badge');
            const usernameField = document.getElementById('user-username');
            const avatarImg = document.getElementById('user-avatar');

            // Render profile elements cleanly
            usernameField.innerText = userData.username;
            if (userData.avatar) {
                avatarImg.src = `https://cdn.discordapp.com/avatars/${userData.id}/${userData.avatar}.png`;
            } else {
                avatarImg.src = "https://discord.com/assets/c09a1f2c53b235ac17b4.png";
            }
            
            profileBadge.style.visibility = 'visible';
            
            // Transform layout button actions context into completion signals
            const actionBtn = document.getElementById('auth-action-trigger');
            actionBtn.innerText = "Verification Complete";
            actionBtn.style.backgroundColor = "#2ecc71";
            actionBtn.disabled = true;
        })
        .catch(err => console.error("Error connecting verification credentials:", err));
    }
});

// Trigger OAuth URL redirection using the link stored in the configuration file
document.getElementById('auth-action-trigger').addEventListener('click', () => {
    if (typeof GLOBAL_AUTH_SETTINGS !== 'undefined' && GLOBAL_AUTH_SETTINGS.authUrl) {
        window.location.href = GLOBAL_AUTH_SETTINGS.authUrl;
    } else {
        alert("Configuration Error: Authorization URL was not found.");
    }
});