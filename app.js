const app = () => {
    const song = document.querySelector('.song');
    const play = document.querySelector('.play');
    const replay = document.querySelector('.replay');
    const outline = document.querySelector('.moving-outline circle');
    const video = document.querySelector('.vid-container video');

    // Sounds
    const sounds = document.querySelectorAll('.sound-picker button');
    // Time display
    const timeDisplay = document.querySelector('.time-display');
    const timeSelect = document.querySelectorAll('.time-select button');
    // Get length of outline fo svg circle
    const outlineLength = outline.getTotalLength();
    // console.log(outlineLength);
    // Duration
    let fakeDuration = 600;

    outline.style.strokeDasharray = outlineLength;
    outline.style.strokeDashoffset = outlineLength;

    // Pick different sounds
    sounds.forEach(sound => {
        sound.addEventListener('click', function() {
            song.src = this.getAttribute('data-sound');
            video.src = this.getAttribute('data-video');
            checkPlaying(song);
        });
    });

    // Play sound
    play.addEventListener('click', function() {
        checkPlaying(song);
    });
    // Restart sound
    replay.addEventListener('click', function() {
        restartSong(song);
    });

    const restartSong = song =>{
        let currentTime = song.currentTime;
        song.currentTime = 0;
    }

    // Select sound
    timeSelect.forEach(option => {
        option.addEventListener('click', function() {
            fakeDuration = this.getAttribute('data-time');
            timeDisplay.textContent = `${Math.floor(fakeDuration / 60)}:${Math.floor(fakeDuration % 60)}`;
        });
    });

    // Create a function to stop playing sounds
    const checkPlaying = song => {
        if(song.paused) {
            song.play();
            video.play();
            play.src = './svg/pause.svg';
        } else {
            song.pause();
            video.pause();
            play.src = './svg/play.svg';
        }
    }

    // Animate circle
    song.ontimeupdate = () => {
        let currentTime = song.currentTime;
        let elapsed = fakeDuration - currentTime;
        let seconds = Math.floor(elapsed % 60);
        let minutes = Math.floor(elapsed / 60);

        // Animate progress circle
        let progress = outlineLength - (currentTime / fakeDuration) * outlineLength;
        outline.style.strokeDashoffset = progress;
        // Animate text
        timeDisplay.textContent = `${minutes}:${seconds}`;

        if(currentTime >= fakeDuration) {
            song.pause();
            song.currentTime = 0;
            play.src = './svg/play.svg';
            video.pause();
        }
    };
};

app();