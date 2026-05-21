// Check address parameters for authorized codes instantly on DOM load
window.addEventListener('DOMContentLoaded', () => {
    // Render the server name directly from the centralized config file
    if (typeof GLOBAL_AUTH_SETTINGS !== 'undefined') {
        document.getElementById('display-server-name').innerText = GLOBAL_AUTH_SETTINGS.serverName;
    }

    // Parse the standard search query string parameters (?code=...)
    const urlParams = new URLSearchParams(window.location.search);
    const authCode = urlParams.get('code');

    if (authCode) {
        const profileBadge = document.getElementById('user-profile-badge');
        const usernameField = document.getElementById('user-username');
        
        // Update browser status to signify authorization code received
        usernameField.innerText = "Code received! Verifying...";
        profileBadge.style.visibility = 'visible';

        const actionBtn = document.getElementById('auth-action-trigger');
        actionBtn.innerText = "Processing...";
        actionBtn.style.backgroundColor = "#e67e22";
        actionBtn.disabled = true;

        /* NOTE: Because authorization codes must be exchanged on a backend 
           server using your Client Secret, you will pass this 'authCode' to 
           your bot API backend here to fetch profile data and join the guild.
           
           Example structure:
           fetch('https://your-backend-api.com/verify', {
               method: 'POST',
               headers: { 'Content-Type': 'application/json' },
               body: JSON.stringify({ code: authCode })
           })
        */
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
