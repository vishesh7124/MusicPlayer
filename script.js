console.log("Welcome to Spotify ! ")

// Initialize the variables 
let total =7
let songIndex =0;
let masterPlay = document.getElementById('masterPlay')
let myProgressBar = document.getElementById('myProgressBar')
let gif = document.getElementById('gif')
let songItems = Array.from(document.getElementsByClassName('songItem'))
let songInfo = document.getElementById('songInfo')
let songItemContainer = document.getElementById('songItemContainer')
let songs =[
    {songName: "GOAT", filePath: "./songs/GOAT.mp3",coverPath: "./covers/cover1.jpg"},
    {songName: "Alone", filePath: "./songs/Alone.mp3",coverPath: "./covers/cover2.jpg"},
    {songName: "Homicide", filePath: "./songs/Homicide.mp3",coverPath: "./covers/cover3.jpg"},
    {songName: "Satisfy", filePath: "./songs/Satisfy.mp3",coverPath: "./covers/cover4.jpg"},
    {songName: "Levels", filePath: "./songs/Levels.mp3",coverPath: "./covers/cover5.jpeg"},
    {songName: "Arcade", filePath: "./songs/Arcade.mp3",coverPath: "./covers/cover6.jpg"},
    {songName: "OG", filePath: "./songs/OG.mp3",coverPath: "./covers/cover7.png"},
];
const searchInput = document.querySelector('[data-search]')

let audioElement = new Audio(songs[0].filePath);
songInfo.innerText = songs[0].songName

var currentTime =""
var play = ""



// declare function 

// seconds to time 

var convertTime = function(time)
{    
    var mins = Math.floor(time / 60);
    if (mins < 10) {
      mins = '0' + String(mins);
    }
    var secs = Math.floor(time % 60);
    if (secs < 10) {
      secs = '0' + String(secs);
    }

    return mins + ':' + secs;
}

// update song 

const updtSng = ()=>{
    songItems.forEach((element,i)=>{
        element.getElementsByTagName('img')[0].src = songs[i].coverPath
        element.getElementsByTagName('span')[0].innerText= songs[i].songName
        var audioElement1 = new Audio(songs[i].filePath)
        audioElement1.onloadedmetadata = function(){
    
            document.getElementsByClassName('timeStamp')[i].innerText = convertTime(parseInt(audioElement1.duration))
        }
    
    })

}


// add cvr 

const addCvr = ()=>{
    newCvr = document.getElementById('newCvr').files[0]
    newCvrURL = URL.createObjectURL(newCvr)
    
    songs[total-1].coverPath = newCvrURL

    updtSng()

    document.querySelector('.lblCvr').style.display=  "none"

}

// add new song 

const addSng = ()=>{
    newSng = document.getElementById('newSng').files[0]
    newName = newSng.name.split(".")[0]
    newSngURL = URL.createObjectURL(newSng)
    
    songs.push({songName:newName,filePath:newSngURL})
    total+=1
    newDiv= document.createElement("div")   
    newDiv.setAttribute("class","songItem")
    newDiv.innerHTML = ` <img alt=${total} >
    <span class = "songName"></span>
    <span class="songlistplay"><span class="timeStamp"></span><i id = ${total-1} class="songItemPlay fa-regular fa-circle-play"></i> </span>`
    
    songItemContainer.append(newDiv)
    songItems.push(newDiv)
    
    updtSng()
    playPause()
    
}

// play and pause

const playPause = ()=>{
    Array.from(document.getElementsByClassName('songItemPlay')).forEach((element)=>{
        element.addEventListener('click',(e)=>{
            songIndex = parseInt(e.target.id)
            makeAllPlays()
            songInfo.innerText = songs[songIndex].songName
            audioElement.src = songs[songIndex].filePath
            if (play ==0 ||   currentTime<=0){
                audioElement.ontimeupdate = function(){
                    currentTime =parseInt(audioElement.currentTime)    
        
                }
                
                audioElement.play();
                makePause(masterPlay)
                makePause(e.target)
                play =1
                
                
                
                
            }
            
            else  {
                audioElement.pause();
                makePlay(masterPlay)
                makePlay(e.target)
    
                audioElement.currentTime= currentTime
                play =0
            }
            
            
        })
    })

}   


const makeAllPlays = ()=>{
    Array.from(document.getElementsByClassName('songItemPlay')).forEach((element)=>{
        element.classList.remove('fa-circle-pause')
        element.classList.add('fa-circle-play')
    })
}

const makePlay = (element)=>{
    element.classList.remove("fa-circle-pause")
    element.classList.add("fa-circle-play")
    gif.style.opacity =0

}

const makePause = (element)=>{
    element.classList.remove("fa-circle-play")
    element.classList.add("fa-circle-pause")
    gif.style.opacity =1
}

// calling functions 

updtSng()
playPause()



// Listen to events     

// Update seekbar & audio time

audioElement.addEventListener('timeupdate',()=>{
    
    progress = parseInt((audioElement.currentTime/audioElement.duration)*100)
    myProgressBar.value = progress
    if (progress ==100){
        makePlay(masterPlay)
        makePlay(songItemPlay)
    }
    
})

myProgressBar.addEventListener('change',()=>{
    audioElement.currentTime = (myProgressBar.value * audioElement.duration)/100
})







// play, next & previous

masterPlay.addEventListener("click",()=>{
    if (audioElement.paused || audioElement.currentTime<=0){
        audioElement.play();
        makePause(masterPlay)

        songItemPlay = document.getElementById(songIndex)
        makePause(songItemPlay)
        
    }
    else{
        audioElement.pause();
        makePlay(masterPlay)

        songItemPlay = document.getElementById(songIndex)

        makePlay(songItemPlay)
        
    }
})

document.getElementById('previous').addEventListener('click',()=>{
    if(songIndex===0){
        songIndex=0
    }
    else{
        songItemPlay = document.getElementById(songIndex)
        makePlay(songItemPlay)
        songIndex -=1
    }
    songItemPlay = document.getElementById(songIndex)
    makePause(songItemPlay)
    makePause(masterPlay)

    songInfo.innerText = songs[songIndex].songName
    audioElement.src = songs[songIndex].filePath
    audioElement.play()
    audioElement.currentTime=0
})
document.getElementById('next').addEventListener('click',()=>{
    if(songIndex>=total-1){
        makeAllPlays()
        songIndex=0
    }
    else{
        songItemPlay = document.getElementById(songIndex)
        makePlay(songItemPlay)
        songIndex +=1
    }
    songItemPlay = document.getElementById(songIndex)
    makePause(songItemPlay)
    makePause(masterPlay)

    songInfo.innerText = songs[songIndex].songName
    audioElement.src = songs[songIndex].filePath
    audioElement.play()
    audioElement.currentTime=0
})

// search 
console.log(songItems)

searchInput.addEventListener("input",(e)=>{
    const value = e.target.value.toLowerCase()
    songItems.forEach(song=>{
        const isVisible = song.getElementsByTagName('span')[0].innerText.toLowerCase().includes(value)
        song.classList.toggle('hide',!isVisible)
        
    })

})


// adding new song and cover

document.getElementById('newSng').addEventListener("change",()=>{
    addSng()
    document.querySelector(".lblCvr").style.display = "block"
})



document.getElementById("newCvr").addEventListener("change",()=>{
    addCvr()
})


