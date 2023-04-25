let songs = [
    {
        name: 'Despacito',
        path: 'song/Despacito.mp3',
        artist: 'artist 1',
        cover: 'image/despacito.png'
    },
    {
        name: 'Love_me_like_I_do',
        path: 'song/love-me.mp3',
        artist: 'artist 2',
        cover: 'image/love_me.jpg'
    },
    {
        name: 'Memories',
        path: 'song/Memories.mp3',
        artist: 'artist 3',
        cover: 'image/memoeies.jpg'
    },
    {
        name: 'on my way',
        path: 'song/on-my-way.mp3',
        artist: 'artist 4',
        cover: 'image/alan.png'
    },
    {
        name: 'Perfect',
        path: 'song/Perfect.mp3',
        artist: 'artist 5',
        cover: 'image/perfect.jpg'
    },
    {
        name: 'Shape_of_You',
        path: 'song/SHAPE OF YOU.mp3',
        artist: 'artist 6',
        cover: 'image/Shape.jpg'
    },
    {
        name: 'Dandelions',
        path: 'song/Dandelions.mp3',
        artist: 'artist 7',
        cover: 'image/Dandelion.webp'
    },
    {
        name: 'Talking to the Moon',
        path: 'song/talking to the moon.mp3',
        artist: 'artist 8',
        cover: 'image/moon.jpg'
    },
    {
        name: 'Cheap Thrills',
        path: 'song/cheap thrill.mp3',
        artist: 'artist 9',
        cover: 'image/cheap.jpg'
    },

]



//////////// carousel //////////////////

const carousel = [...document.querySelectorAll('.carousel img')];

let carouselImageIndex = 0;

const changeCarousel = () => {
    carousel[carouselImageIndex].classList.toggle('active');
    if(carouselImageIndex >= carousel.length - 1) {
        carouselImageIndex = 0;
    } else {
        carouselImageIndex++;
    }

    carousel[carouselImageIndex].classList.toggle('active');

}

setInterval(() => {
    changeCarousel();
}, 3000);

////////////// navigations /////////////

///////////// toggling music player ///////////////////

const musicPlayerSection = document.querySelector('.music-player-section');

let clickCount = 1;

musicPlayerSection.addEventListener('click', () => {
    if(clickCount >= 2){
        musicPlayerSection.classList.add('active');
        clickCount = 1;
        return;
    }
    clickCount++;
    setTimeout(() => {
        clickCount = 1;
    }, 250);
})

/////////back from music player /////////////

const backToHomeBtn = document.querySelector('.music-player-section .back-btn');

backToHomeBtn.addEventListener('click', () => {
    musicPlayerSection.classList.remove('active');
})

///////////////access playlist //////////

const playlistSection = document.querySelector('.playlist');
const navBtn = document.querySelector('.music-player-section .nav-btn');

navBtn.addEventListener('click', () => {
    playlistSection.classList.add('active');
})

//////////////// back from playlist to music ///////////////

const backToMusicPlayer = document.querySelector('.playlist .back-btn');

backToMusicPlayer.addEventListener('click', () => {
    playlistSection.classList.remove('active');
})

/////////// Music //////////////////

let currentMusic = 0;

const music = document.querySelector('#audio-source');

const seekBar = document.querySelector('.music-seek-bar');
const songName = document.querySelector('.current-song-name');
const artistName = document.querySelector('.artist-name');
const coverImage = document.querySelector('.cover');
const currentMusicTime = document.querySelector('.current-time');
const musicDuration = document.querySelector('.duration');

const queue = [...document.querySelectorAll('.queue')];

///// select button here 

const forwardBtn = document.querySelector('i.fa-forward');
const backwardBtn = document.querySelector('i.fa-backward');
const playBtn = document.querySelector('i.fa-play');
const pauseBtn = document.querySelector('i.fa-pause');
const repeatBtn = document.querySelector('span.fa-redo');
const volumeBtn = document.querySelector('span.fa-volume-up');

const volumeSlider = document.querySelector('.volume-slider');

////// playBtn click event

playBtn.addEventListener('click', () => {
    music.play();
    playBtn.classList.remove('active');
    pauseBtn.classList.add('active');
})

////// pause click event

pauseBtn.addEventListener('click', () => {
    music.pause();
    pauseBtn.classList.remove('active');
    playBtn.classList.add('active');
})

/////// function foe setting up music

const setMusic = (i) => {
    seekBar.value = 0;
    let song = songs[i];
    currentMusic = i;

    music.src = song.path;

    songName.innerHTML = song.name;
    artistName.innerHTML = song.artist;
    coverImage.src = song.cover;

    setTimeout(() => {
        seekBar.max = music.duration;
        musicDuration.innerHTML = formatTime(music.duration);
    }, 300);
    currentMusicTime.innerHTML = '00 : 00';
    queue.forEach(item => item.classList.remove('active'));
    queue[currentMusic].classList.add('active');
}

setMusic(0);

///// format  duration in 00:00 

const formatTime = (time) => {
    let min = Math.floor(time / 60);
    if(min < 10){
        min = `0` + min;
    }

    let sec = Math.floor(time % 60);
    if(sec < 10){
        sec = `0` + sec;
    }

    return `${min} : ${sec}`;
}

//// seekbar events


setInterval(() => {
    seekBar.value = music.currentTime;
    console.log(seekBar.value, music.currentTime)
    currentMusicTime.innerHTML = formatTime(music.currentTime);
    if(Math.floor(music.currentTime) == Math.floor(seekBar.max)){
        if(repeatBtn.className.includes('active')){
            setMusic(currentMusic);
            playBtn.click();
        } else {
            forwardBtn.click();
        }
    }
}, 500)

seekBar.addEventListener('change', () => {
    music.currentTime = seekBar.value;
})

//// forward btn

forwardBtn.addEventListener('click', () => {
    if(currentMusic >= songs.length - 1){
        currentMusic = 0;
    } else{
        currentMusic++;
    }
    setMusic(currentMusic);
    playBtn.click();
})

////// backward btn

backwardBtn.addEventListener('click', () => {
    if(currentMusic <= 0){
        currentMusic = songs.length - 1;
    } else{
        currentMusic--;
    }
    setMusic(currentMusic);
    playBtn.click();
})

///// repeat btn

repeatBtn.addEventListener('click', () => {
    repeatBtn.classList.toggle('active');
})

//volume section

volumeBtn.addEventListener('click', () => {
    volumeBtn.classList.toggle('active');
    volumeSlider.classList.toggle('active');
})

volumeSlider.addEventListener('input', () => {
    music.volume = volumeSlider.value;
})

queue.forEach((item, i) => {
    item.addEventListener('click', () => {
        setMusic(i);
        playBtn.click();
    })
})