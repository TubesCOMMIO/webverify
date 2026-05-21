// Function to update the UI based on loaded variables
function initializeVerificationUI() {
    if (typeof GLOBAL_AUTH_SETTINGS !== 'undefined') {
        document.getElementById('display-server-name').innerText = GLOBAL_AUTH_SETTINGS.serverName;
    } else {
        console.warn("Retrying configuration linkage selection...");
        setTimeout(initializeVerificationUI, 50); // Small fallback delay loop
        return;
    }

    // Parse the standard search query string parameters (?code=...)
    const urlParams = new URLSearchParams(window.location.search);
    const authCode = urlParams.get('code');

    if (authCode) {
        const profileBadge = document.getElementById('user-profile-badge');
        const usernameField = document.getElementById('user-username');
        
        usernameField.innerText = "Code received! Verifying...";
        profileBadge.style.visibility = 'visible';

        const actionBtn = document.getElementById('auth-action-trigger');
        actionBtn.innerText = "Processing Backend Verification...";
        actionBtn.style.backgroundColor = "#e67e22";
        actionBtn.disabled = true;
    }
}

// Execute logic when document is interactive/ready
if (document.readyState === "loading") {
    window.addEventListener('DOMContentLoaded', initializeVerificationUI);
} else {
    initializeVerificationUI();
}

// Trigger OAuth URL redirection using the link stored in the configuration file
document.getElementById('auth-action-trigger').addEventListener('click', () => {
    if (typeof GLOBAL_AUTH_SETTINGS !== 'undefined' && GLOBAL_AUTH_SETTINGS.authUrl) {
        window.location.href = GLOBAL_AUTH_SETTINGS.authUrl;
    } else {
        alert("Configuration Error: The authorization configurations were not detected yet.");
    }
});
