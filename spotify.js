
let songs;
let currFolder;
let currentSong = new Audio();


function convertSecondsToMinutesSeconds(totalSeconds) {
    // Ensure totalSeconds is an integer (removing milliseconds)
    totalSeconds = Math.floor(totalSeconds);

    // Calculate minutes and seconds
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;

    // Format seconds to ensure two digits
    const formattedSeconds = seconds < 10 ? '0' + seconds : seconds;

    // Return the formatted string
    return `${minutes}:${formattedSeconds}`;
}

async function getSongs(folder) {
    currFolder = folder
    let a = await fetch(`http://127.0.0.1:5500/${folder}/`)
    let response = await a.text();
    let div = document.createElement("div")
    div.innerHTML = response;
    let as = div.getElementsByTagName("a")

    songs = [];

    for (let index = 0; index < as.length; index++) {
        const element = as[index];
        if (element.href.endsWith(".mp3")) {
            // songs.push(element.href.split(`/${folder}/`)[1]) 
              songs.push(element.href.split(`/${folder}/`).pop())
        }

    }
   
        // Show all the sing in playlist

        let songUL = document.querySelector(".songList").getElementsByTagName("ul")[0];
        songUL.innerHTML = ""
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

}

const playMusic = (track, pause=false) =>{
    // let audio = new Audio("/song/" + track)

    currentSong.src = `/${currFolder}/` + track;

    if(!pause){
        currentSong.play();   
        play.src = "pause.svg";
    }
     document.querySelector(".songinfo").innerHTML = decodeURI(track)
     document.querySelector(".songtime").innerHTML = "00:00 / 00:00"

     
};

async function main() {

    // Get the list of all songs 

    await getSongs("song/ap")
    playMusic(songs[0],true)


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
        document.querySelector(".songtime").innerHTML =  `${convertSecondsToMinutesSeconds(currentSong.currentTime)}/${convertSecondsToMinutesSeconds(currentSong.duration)}`
        document.querySelector(".circle").style.left = (currentSong.currentTime/currentSong.duration) * 100 +"%";
    })

    // add an event listener to seekbar

    document.querySelector(".seekbar").addEventListener("click", e=>{
        let percent = (e.offsetX/e.target.getBoundingClientRect().width) * 100
        document.querySelector(".circle").style.left = percent + "%";
        currentSong.currentTime = (currentSong.duration) * percent/100
    })

    // add an event listener for menu

    document.querySelector(".menu").addEventListener("click", ()=>{
        document.querySelector(".left").style.left = "0"
    })

    // add an event listener for close
    document.querySelector(".close").addEventListener("click", ()=>{
        document.querySelector(".left").style.left = "-120%"
    })

    // Add an event Listener to previous

    previous.addEventListener("click", ()=>{
        console.log("Previous Clicked");
        console.log(currentSong);
        let index = songs.indexOf(currentSong.src.split("/").slice(-1)[0])
        if ((index-1)>= length){
            playMusic(songs[index-1])
        }
    })

// Add an event Listener to next

    next.addEventListener("click", ()=>{
        currentSong.pause()
        console.log("Next Clicked");

        let index = songs.indexOf(currentSong.src.split("/").slice(-1)[0])
        if ((index+1)< songs.length){
            playMusic(songs[index+1])
        }
        
    })

    
    
    // ADD an event to volume

    document.querySelector(".range").getElementsByTagName("input")[0].addEventListener("change", (e)=>{
        console.log("Setting volume to", e.target.value, "/100")
        currentSong.volume = parseInt(e.target.value)/100
    })

    // Load the playlist whenever card is clicked

    // document.getElementsByClassName(".card").forEach(e=>{
    //     e.addEventListener("click", async item=>{

    //         let folder = item.currentTarget.dataset.folder;
    
    //         await getSongs(`song/${folder}`);
    //         if(songs.length>0) playMusic(songs[0])
            
    //     })
    // })


    document.querySelectorAll(".card").forEach(e => {
        e.addEventListener("click", async item => {
            let folder = item.currentTarget.dataset.folder;
            await getSongs(`song/${folder}`);
            if (songs.length > 0) playMusic(songs[0]);
        });
    });

}
main()
