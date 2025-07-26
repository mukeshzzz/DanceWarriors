const hamburger = document.getElementById('hamburger');
const navLinks = document.querySelector('.nav-links');

hamburger.addEventListener('click', () => {
  hamburger.classList.toggle('toggle');
  navLinks.classList.toggle('active');
});

document.querySelectorAll('.nav-links a').forEach(link => {
  link.addEventListener('click', () => {
    const hamburger = document.getElementById('hamburger');
    const nav = document.querySelector('.nav-links');
    hamburger.classList.remove('active');
    nav.classList.remove('active');
  });
});


  const videos = document.querySelectorAll("video");

  videos.forEach(video => {
    video.addEventListener("play", () => {
      videos.forEach(otherVideo => {
        if (otherVideo !== video) {
          otherVideo.pause();
        }
      });
    });
  });




const form = document.getElementById("contactForm");
const toast = document.getElementById("toast");

function showToast(message, type = "success") {
  toast.textContent = message;
  toast.style.backgroundColor = type === "error" ? "#ff3b30" : "#1c1c1e";
  toast.classList.add("show");
  setTimeout(() => {
    toast.classList.remove("show");
  }, 4000);
}

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const name = document.getElementById("name").value.trim();
  const email = document.getElementById("email").value.trim();
  const message = document.getElementById("message").value.trim();

  const payload = {
    content:
      "```" +
      `📩 DanceWarriors User Request:\n\n` +
      `Name     :     ${name}\n` +
      `Email    :     ${email}\n` +
      `Message  :     ${message}` +
      "```"
  };

  const webhookURL = "YOUR_WEBHOOK_URL"; // replace with your real webhook URL

  try {
    const response = await fetch(webhookURL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(payload)
    });

    if (response.ok) {
      showToast("✅ Message sent successfully!");
      form.reset();

      // 🎉 Trigger confetti on success only
      confetti({
        particleCount: 150,
        spread: 80,
        origin: { y: 0.6 }
      });
    } else {
      showToast("❌ Failed to send message.", "error");
    }
  } catch (error) {
    showToast("⚠️ An error occurred. See console.", "error");
    console.error("Discord webhook error:", error);
  }
});
