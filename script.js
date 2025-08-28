    // Elements
    const htmlEl = document.documentElement;
    const hero = document.getElementById("home");
    const fab = document.getElementById("themeFab");
    const fabIconWrap = document.getElementById("themeFabIcon");

    // Put the hero image according to theme
    function setHeroBackgroundForTheme(mode) {
      hero.style.backgroundImage = mode === "dark"
        ? "url('assets/black.png')"
        : "url('assets/white.png')";
      hero.classList.toggle("text-light", mode === "dark");
      hero.classList.toggle("text-dark", mode === "light");
    }

    // Apply theme + swap icon
    function setTheme(mode) {
      htmlEl.setAttribute("data-bs-theme", mode);
      setHeroBackgroundForTheme(mode);
      fabIconWrap.innerHTML =
        mode === "light"
          ? '<i class="fa-solid fa-moon"></i>'
          : '<i class="bi bi-sun-fill"></i>';
      localStorage.setItem("dw-bs-theme", mode);
    }

    // Init theme
    setTheme(localStorage.getItem("dw-bs-theme") || "dark");

    // Toggle handler
    fab.addEventListener("click", () => {
      const next = htmlEl.getAttribute("data-bs-theme") === "dark" ? "light" : "dark";
      setTheme(next);
    });

  const form = document.getElementById("contactForm");
  const toast = document.getElementById("toast");
  const sendBtn = document.getElementById("sendBtn");
  const btnText = document.getElementById("btnText");
  const btnLoader = document.getElementById("btnLoader");

  function showToast(message, type = "success") {
    toast.textContent = message;
    toast.style.backgroundColor = type === "error" ? "#ff3b30" : "#1c1c1e";
    toast.classList.add("show");
    setTimeout(() => toast.classList.remove("show"), 4000);
  }

  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    // Start loading state
    btnText.textContent = "Sending...";
    btnLoader.classList.remove("d-none");
    sendBtn.disabled = true;

    // Wait for 1s before actually sending
    await new Promise(resolve => setTimeout(resolve, 1000));

    const name = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim();
    const message = document.getElementById("message").value.trim();

    const payload = {
      content:
        "```" +
        `📩 DanceWarriors User Request:\n\n` +
        `Name     : ${name}\n` +
        `Email    : ${email}\n` +
        `Message  : ${message}` +
        "```"
    };


    const webhookURL = "https://discord.com/api/webhooks/1398705815912714251/n10B50rZ5nxMnhmvj6u-dZ1zPScFYJUzncnlSr_mFdpLLA2s9-G6SwBvwRxpLQSWU4RE"; // 🔴 Replace with your real webhook URL

    try {
      const response = await fetch(webhookURL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });

      if (response.ok) {
        showToast("✅ Message sent successfully!");
        form.reset();

        // 🎉 Confetti animation
        confetti({ particleCount: 150, spread: 80, origin: { y: 0.6 } });
      } else {
        showToast("❌ Failed to send message.", "error");
      }
    } catch (error) {
      showToast("⚠️ An error occurred. See console.", "error");
      console.error("Discord webhook error:", error);
    }

    // Reset button
    btnText.textContent = "Send Message";
    btnLoader.classList.add("d-none");
    sendBtn.disabled = false;
  });

