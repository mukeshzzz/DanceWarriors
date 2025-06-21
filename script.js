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