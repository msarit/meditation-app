const app = () => {
    const song = document.querySelector('.song');
    const play = document.querySelector('.play');
    const outline = document.querySelector('.moving-outline circle');
    const video = document.querySelector('.vid-container video');
    // Sounds
    const sounds = document.querySelectorAll('.sound-picker button');
    // Time Display
    const timeDisplay = document.querySelector('.time-display');
    // Duration Buttons
    const timeSelect = document.querySelectorAll('.time-select button');
    // Outline Length
    const outlineLength = outline.getTotalLength();
    // Initial Duration
    let fakeDuration = 120;

    outline.style.strokeDasharray = outlineLength;
    outline.style.strokeDashoffset = outlineLength;

    // Pick different sounds and their video
    sounds.forEach(sound => {
        sound.addEventListener('click', function(){
            song.src = this.getAttribute("data-sound");
            video.src = this.getAttribute("data-video");
            checkPlaying(song);
        })
    })

    // Play sound
    play.addEventListener('click', () => {
        checkPlaying(song);
    });

    // Select sound duration
    timeSelect.forEach(option => {
        option.addEventListener('click', function(){
            fakeDuration = this.getAttribute("data-time");
            timeDisplay.textContent = `${Math.floor(fakeDuration/60)}:${Math.floor(fakeDuration%60)}`;
        });
    });

    // Create function to stop and play sounds
    const checkPlaying = song => {
        if (song.paused){
            song.play();
            video.play();
            play.src = './svg/pause.svg';
        } else {
            song.pause();
            video.pause();
            play.src = './svg/play.svg';
        }
    };

    // Circle Animation
    song.ontimeupdate = () => {
        let currentTime = song.currentTime;
        let elaspsedTime = fakeDuration - currentTime;
        let seconds = Math.floor(elaspsedTime % 60);
        let minutes = Math.floor(elaspsedTime / 60);

        let progress = outlineLength - (currentTime / fakeDuration) * outlineLength;
        outline.style.strokeDashoffset = progress;

        timeDisplay.textContent = `${minutes}:${seconds}`;

        if (currentTime >= fakeDuration){
            song.pause();
            song.currentTime = 0;
            play.src = './svg/play.svg';
            video.pause();
        }
    };
    
};

app();