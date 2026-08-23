// Login Check Function
function checkLogin() {
    const user = document.getElementById('username').value;
    const pass = document.getElementById('password').value;

    // Apnar pochondo moto username ar password dite paren
    if(user === "atik" && pass === "atik") {
        document.getElementById('login-ui').style.display = 'none';
        document.getElementById('downloader-ui').style.display = 'block';
    } else {
        alert("Oops! Wrong information. Please try again.");
    }
}

// Main Video Downloader Function
async function startDownload() {
    const url = document.getElementById('videoUrl').value;
    const status = document.getElementById('status');

    if(!url) {
        status.innerText = "Error: Please paste a link first!";
        status.style.color = "#ff4d4d";
        return;
    }

    status.innerText = "⏳ Processing link... please wait.";
    status.style.color = "#ffffff";

    try {
        // Ekhane amra Termux-e chalu kora local server-ke call korchi
        const response = await fetch("http://127.0.0.1:5000/download", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ url: url })
        });

        const data = await response.json();
        
        if(data.download_url) {
            status.innerHTML = `
                <div style="margin-top: 15px; padding: 10px; border: 1px solid #00ff00; border-radius: 10px;">
                    <p style="color: #00ff00; margin-bottom: 5px;">Video Found!</p>
                    <a href="${data.download_url}" target="_blank" 
                       style="display: inline-block; padding: 8px 15px; background: #00ff00; color: #000; text-decoration: none; border-radius: 5px; font-weight: bold;">
                       Click to Save Video
                    </a>
                </div>
            `;
        } else {
            status.innerText = "❌ Error: Could not fetch video link.";
            status.style.color = "#ff4d4d";
        }
    } catch (error) {
        status.innerText = "⚠️ API Error: Make sure Termux server is running!";
        status.style.color = "#ffcc00";
        console.error("Error connecting to API:", error);
    }
}

// Enter key press korle jate login ba download hoy
document.addEventListener('keypress', function (e) {
    if (e.key === 'Enter') {
        if(document.getElementById('login-ui').style.display !== 'none') {
            checkLogin();
        } else {
            startDownload();
        }
    }
});