

let currentSong = new Audio();

async function getSongs() {
    let a = await fetch("http://127.0.0.1:5500/song/")
    let response = await a.text();
    console.log(response)
    let div = document.createElement("div")
    div.innerHTML = response;
    let as = div.getElementsByTagName("a")

    let songs = [];

    for (let index = 0; index < as.length; index++) {
        const element = as[index];
        if (element.href.endsWith(".mp3")) {
            songs.push(element.href.split('/').pop())
        }

    }
    return songs;
}

const playMusic = (track) =>{
    // let audio = new Audio("/song/" + track)

    currentSong.src = "/song/" + track;
    currentSong.play();
     play.src = "pause.svg";
     document.querySelector(".songinfo").innerHTML = track
     document.querySelector(".songtime").innerHTML = "00:00 / 00:00"
};

async function main() {

    // Get the list of all songs 

    let songs = await getSongs()

    console.log(songs)

    // Show all the sing in playlist

    let songUL = document.querySelector(".songList").getElementsByTagName("ul")[0];
    for (const song of songs) {
        songUL.innerHTML = songUL.innerHTML + `<li>
                            <img class="invert" src="music.svg" alt="">
                            <div class="info">
                                <div>${song.replaceAll("%20", "")}</div>
                                <div>Pathania Band</div>
                            </div>
                            <div class="playnow">
                                <span>Play Now</span>
                                <img class="invert" src="play.svg" alt="">
                            </div></li>`;
    }

    // Attach an event listener to each song

    Array.from(document.querySelector(".songList").getElementsByTagName("li")).forEach(e=>
    {
        e.addEventListener("click", element =>{
            console.log(e.querySelector(".info").firstElementChild.innerHTML)
            playMusic(e.querySelector(".info").firstElementChild.innerHTML.trim())
        })
    })

    //Attach an event listener to play, next and previous

    play.addEventListener("click",()=>{
        if(currentSong.paused){
            currentSong.play()
            play.src = "pause.svg"
        }
        else{
            currentSong.pause()
            play.src = "play.svg"
        }
    })

    // // Play the first song
    // var audio = new Audio(songs[0]);
    // audio.play();

    // audio.addEventListener("loadeddata", () => {
    //     let duration = audio.duration;
    //     console.log(audio.duration, audio.currentSrc, audio.currentTime);

    //     // The duration variable now holds the duration (in seconds) of the audio clip
    // });


    // Listen for time update event

    currentSong.addEventListener("timeupdate", ()=>{
        console.log(currentSong.currentTime, currentSong.duration);
    })

}
main()







// let currentSong = new Audio();

// async function getSongs() {
//     let a = await fetch("http://127.0.0.1:5500/song/");
//     let response = await a.text();
//     let div = document.createElement("div");
//     div.innerHTML = response;
//     let as = div.getElementsByTagName("a");

//     let songs = [];
//     for (let index = 0; index < as.length; index++) {
//         const element = as[index];
//         if (element.href.endsWith(".mp3")) {
//             songs.push(element.href.split('/').pop());
//         }
//     }
//     return songs;
// }

// const playMusic = (track) => {
//     currentSong.src = "/song/" + track;
//     currentSong.play();
//     play.src = "pause.svg";
//     document.querySelector(".songinfo").innerHTML = track;
//     document.querySelector(".songtime").innerHTML = "00:00 / 00:00";

//     // Ensure seekbar is visible
//     document.querySelector(".seekbar").style.display = "block";
// };

// async function main() {
//     let songs = await getSongs();
//     let songUL = document.querySelector(".songList").getElementsByTagName("ul")[0];
//     for (const song of songs) {
//         songUL.innerHTML = songUL.innerHTML + `<li>
//                             <img class="invert" src="music.svg" alt="">
//                             <div class="info">
//                                 <div>${song.replaceAll("%20", "")}</div>
//                                 <div>Pathania Band</div>
//                             </div>
//                             <div class="playnow">
//                                 <span>Play Now</span>
//                                 <img class="invert" src="play.svg" alt="">
//                             </div></li>`;
//     }

//     Array.from(document.querySelector(".songList").getElementsByTagName("li")).forEach(e => {
//         e.addEventListener("click", element => {
//             playMusic(e.querySelector(".info").firstElementChild.innerHTML.trim());
//         });
//     });

//     play.addEventListener("click", () => {
//         if (currentSong.paused) {
//             currentSong.play();
//             play.src = "pause.svg";
//         } else {
//             currentSong.pause();
//             play.src = "play.svg";
//         }
//     });

//     // Seekbar functionality
//     currentSong.addEventListener("timeupdate", () => {
//         const seekbar = document.querySelector(".seekbar .circle");
//         const duration = currentSong.duration;
//         const currentTime = currentSong.currentTime;
//         const progressPercent = (currentTime / duration) * 100;
//         seekbar.style.left = `${progressPercent}%`;
//         document.querySelector(".songtime").innerHTML = `${formatTime(currentTime)} / ${formatTime(duration)}`;
//     });

//     currentSong.addEventListener("loadedmetadata", () => {
//         const duration = currentSong.duration;
//         document.querySelector(".songtime").innerHTML = `00:00 / ${formatTime(duration)}`;
//     });
// }

// function formatTime(time) {
//     const minutes = Math.floor(time / 60);
//     const seconds = Math.floor(time % 60);
//     return `${minutes}:${seconds.toString().padStart(2, "0")}`;
// }

// main();
