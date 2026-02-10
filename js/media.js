/**
 * Media Controller for Alex's Portfolio
 * Manages audio playlist and video player
 * Loads tracks dynamically from data/music.json
 */
const media = {
    audio: new Audio(),
    currentTrackIndex: 0,
    playlist: [],

    async init() {
        await this.loadPlaylist();
        this.setupEventListeners();
        this.updateTrackDisplay();
        this.populateTrackSelector();
        console.log(`Media controller initialized with ${this.playlist.length} tracks`);
    },

    async loadPlaylist() {
        try {
            const res = await fetch('data/music.json');
            const tracks = await res.json();
            if (tracks && tracks.length > 0) {
                this.playlist = tracks.map(t => ({
                    name: t.title + (t.genre ? ` [${t.genre}]` : ''),
                    src: t.url
                }));
            }
        } catch (e) {
            console.log('Could not load music.json');
        }
    },

    populateTrackSelector() {
        const trackSelect = document.querySelector('.radio-track-select');
        if (!trackSelect) return;
        trackSelect.innerHTML = '';
        this.playlist.forEach((track, i) => {
            const opt = document.createElement('option');
            opt.value = i;
            opt.textContent = track.name;
            trackSelect.appendChild(opt);
        });
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

        // Auto-advance to next track
        this.audio.onended = () => {
            const next = (this.currentTrackIndex + 1) % this.playlist.length;
            this.switchTrack(next);
        };
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
        // Sync selector
        const trackSelect = document.querySelector('.radio-track-select');
        if (trackSelect) trackSelect.value = index;
    },

    updateTrackDisplay() {
        const marquee = document.querySelector('.radio-track-name');
        if (marquee && this.playlist.length > 0) {
            marquee.innerText = this.playlist[this.currentTrackIndex].name;
        }
    }
};

document.addEventListener('DOMContentLoaded', () => media.init());
