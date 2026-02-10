/**
 * Media Controller for Alex's Portfolio
 * Manages audio playlist and video player
 */
const media = {
    audio: new Audio(),
    currentTrackIndex: 0,
    playlist: [
        { name: "Retro Hits Mix 2026.mp3", src: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3" },
        { name: "Cyberpunk Dreams.mp3", src: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3" },
        { name: "Vaporwave Vibes.mp3", src: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3" }
    ],

    init() {
        this.setupEventListeners();
        this.updateTrackDisplay();
        console.log('Media controller initialized');
    },

    setupEventListeners() {
        const playBtn = document.querySelector('.radio-play');
        const pauseBtn = document.querySelector('.radio-pause');
        const stopBtn = document.querySelector('.radio-stop');
        const volumeSlider = document.querySelector('.radio-volume');
        const trackSelect = document.querySelector('.radio-track-select');
        const video = document.querySelector('.retro-video');

        if (playBtn) playBtn.onclick = () => this.play();
        if (pauseBtn) pauseBtn.onclick = () => this.pause();
        if (stopBtn) stopBtn.onclick = () => this.stop();

        if (volumeSlider) {
            volumeSlider.oninput = (e) => {
                this.audio.volume = e.target.value / 100;
            };
        }

        if (trackSelect) {
            trackSelect.onchange = (e) => {
                this.switchTrack(parseInt(e.target.value));
            };
        }

        if (video) {
            video.onclick = () => {
                if (video.paused) video.play();
                else video.pause();
            };
        }
    },

    play() {
        if (!this.audio.src) this.switchTrack(0);
        this.audio.play();
    },

    pause() {
        this.audio.pause();
    },

    stop() {
        this.audio.pause();
        this.audio.currentTime = 0;
    },

    switchTrack(index) {
        this.currentTrackIndex = index;
        const track = this.playlist[index];
        this.audio.src = track.src;
        this.updateTrackDisplay();
        this.play();
    },

    updateTrackDisplay() {
        const marquee = document.querySelector('.radio-track-name');
        if (marquee) {
            marquee.innerText = this.playlist[this.currentTrackIndex].name;
        }
    }
};

document.addEventListener('DOMContentLoaded', () => media.init());
