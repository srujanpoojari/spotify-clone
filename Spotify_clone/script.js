console.log("Welcome to Spotify");

let songIndex = 0 ;
let audioElement = new Audio('songs/1.mp3');
let masterPlay = document.getElementById('masterPlay');
let Progress = document.getElementById('Progress');
let songItems = Array.from(document.getElementsByClassName('songitem')); 

let songs = [
    {songname : "Thank you, next", filepath : "songs/1.mp3",coverpath : "cover1.jpg"},
    {songname : "Positions", filepath : "songs/2.mp3",coverpath : "cover1.jpg"},
    {songname : "One Last Time", filepath : "songs/3.mp3",coverpath : "cover1.jpg"},
    {songname : "7 rings", filepath : "songs/4.mp3",coverpath : "cover1.jpg"},
    {songname : "34 35", filepath : "songs/5.mp3",coverpath : "cover1.jpg"}
]
songItems.forEach((element, i )=>{
    element.getElementsByTagName("img")[0].src = songs[i].coverpath;
    element.getElementsByClassName("songName")[0].innerText = songs[i].songname;
})

masterPlay.addEventListener('click', ()=>{
    if(audioElement.paused || audioElement.currentTime<=0){
        audioElement.play();
        masterPlay.classList.remove('fa-play-circle');
        masterPlay.classList.add('fa-pause-circle');
    }
    else{
        audioElement.pause();
        masterPlay.classList.remove('fa-pause-circle');
        masterPlay.classList.add('fa-play-circle');
    }
})

audioElement.addEventListener('timeupdate',()=>{
    progress = parseInt((audioElement.currentTime/audioElement.duration)*100);
    Progress.value = progress;
})

Progress.addEventListener('change', ()=>{
    audioElement.currentTime = Progress.value * audioElement.duration /100;
})

const makeAllPlays = ()=>{
    Array.from(document.getElementsByClassName('songItemPlay')).forEach((element)=>{
        element.classList.remove('fa-pause-circle');
        element.classList.add('fa-play-circle');
    })

}
Array.from(document.getElementsByClassName('songItemPlay')).forEach((element)=>{
    element.addEventListener('click', (e)=>{
        console.log(e);
        console.log("hi");
        makeAllPlays();
        songIndex = parseInt(e.target.id);
        e.target.classList.remove('fa-play-circle');
        e.target.classList.add('fa-pause-circle');

        audioElement.src = `songs/${ songIndex}.mp3`;
        audioElement.currentTime = 0;
        audioElement.play();
        masterPlay.classList.remove('fa-play-circle');
        masterPlay.classList.add('fa-pause-circle');
    })
})

document.getElementById('forward').addEventListener('click',()=>{
    if(songIndex>=4){
        songIndex = 0;
    }
    else{
        songIndex = songIndex + 1;
    }
    audioElement.src = `songs/${songIndex+1}.mp3`;
    audioElement.currentTime = 0;
    audioElement.play();
    masterPlay.classList.remove('fa-play-circle');
    masterPlay.classList.add('fa-pause-circle');
})

document.getElementById('backward').addEventListener('click',()=>{
    if(songIndex<=0){
        songIndex = 4;
    }
    else{
        songIndex = songIndex - 1;
    }
    audioElement.src = `songs/${songIndex+1}.mp3`;
    audioElement.currentTime = 0;
    audioElement.play();
    masterPlay.classList.remove('fa-play-circle');
    masterPlay.classList.add('fa-pause-circle');
})