let audioEnabled = false;

function initializeAudio() {
    audioEnabled = true;
    document.querySelector('.btn').innerText = "EXPLORE";
    checkVisibility(); 
}

const sections = document.querySelectorAll('.section');
const audios = {
    'hero': document.getElementById('audio-hero'),
    'peaks': document.getElementById('audio-peaks'),
    'deep': document.getElementById('audio-deep')
};

const observerOptions = {
    threshold: 0.6 // Focus on the section when 60% visible
};

const observer = new IntersectionObserver((entries) => {
    if (!audioEnabled) return;
    
    entries.forEach(entry => {
        const id = entry.target.id;
        const audio = audios[id];

        if (entry.isIntersecting) {
            fadeAudioIn(audio);
        } else {
            fadeAudioOut(audio);
        }
    });
}, observerOptions);

sections.forEach(section => observer.observe(section));

function fadeAudioIn(audio) {
    if (!audio) return;
    audio.volume = 0;
    audio.play();
    let fadeIn = setInterval(() => {
        if (audio.volume < 0.4) { // Max volume 40% for background ambience
            audio.volume += 0.02;
        } else {
            clearInterval(fadeIn);
        }
    }, 50);
}

function fadeAudioOut(audio) {
    if (!audio) return;
    let fadeOut = setInterval(() => {
        if (audio.volume > 0.02) {
            audio.volume -= 0.02;
        } else {
            audio.pause();
            clearInterval(fadeOut);
        }
    }, 50);
}

// Helper to start audio if page loads halfway down
function checkVisibility() {
    sections.forEach(section => {
        const rect = section.getBoundingClientRect();
        if (rect.top >= 0 && rect.top <= window.innerHeight) {
            fadeAudioIn(audios[section.id]);
        }
    });
}
