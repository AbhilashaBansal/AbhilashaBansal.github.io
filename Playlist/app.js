//throwing some errors
// let durations = [3.97, 3.93, 3.36, 4.54, 3.56];
// let list_duration = document.getElementsByClassName("aud");


const add_btns = document.getElementsByClassName("add");
const available = document.getElementById("available");
const play_body = document.getElementById("play-body");
let songs_in_playlist = [];
let current_song_id = "";
let playing = false;

let song_urls = ["http://mysound.ge/track/2584/taylor-swift-style"];

function removeElement(arr, elt) {
    let index = arr.indexOf(elt);
    arr.splice(index, 1);    
}

//for adding songs to playlist
for(let i=0; i<add_btns.length; i++){
    add_btns[i].addEventListener("click", function(e){
        //remove the song from table one
        let song = e.target.parentNode.parentNode;
        console.log(song);
        song.style.display = "none";

        //extracting song properties
        let title = song.getElementsByClassName("title")[0].textContent;
        let artist = song.getElementsByClassName("artist")[0].textContent;
        let duration = song.getElementsByClassName("dur")[0].textContent;
        let audio_src = song.getElementsByClassName("title")[0].children[0];
        //add song to table two
        let tr = document.createElement('tr');
        tr.className = song.id;
        console.log(audio_src.src);
        tr.innerHTML = "<td>" + title + "<audio style='display:none;' src='" + audio_src.src + "'></audio></td> <td>" + artist + "</td> <td>" + duration + "</td> <td><button class='del'>Delete</button></td>";   
        play_body.appendChild(tr);

        //for deleting songs from playlist
        let del_btns = document.getElementsByClassName("del");
        // console.log(del_btns);
        del_btns[del_btns.length-1].addEventListener("click", function(e){
            let s_to_delete = e.target.parentNode.parentNode;
            s_to_delete.remove();
            //adding it back to table 1
            song.style.display = "table-row";
            
            //checking if this was the song currently playing
            if(current_song_id==song.id){
                current_song_id = "";
            }

            //deleting from the list of songs in queue
            removeElement(songs_in_playlist, song.id);
        });

        //updating list of songs currently in queue
        songs_in_playlist.push(song.id);
        console.log(songs_in_playlist);
    });
}

let play = document.getElementById("play");
let pause = document.getElementById("pause");
let next = document.getElementById("next");
let prev = document.getElementById("prev"); 

//plays next song in queue
function playNext(){
    let index = songs_in_playlist.indexOf(current_song_id);
    let elt1 = document.getElementsByClassName(current_song_id)[0].backgroundColor = "rgb(215, 247, 237)";
    if(index == (songs_in_playlist.length-1)){

        index = 0;
    }
    else{
        index += 1;
    }
    current_song_id = songs_in_playlist[index];
    let elt = document.getElementsByClassName(current_song_id)[0].children[0].children[0];
    playAudio(elt);
}

//start playing
function playAudio(x){
    x.play();
    x.parentNode.parentNode.style.backgroundColor = "deepskyblue";
    // playing = true;
    setTimeout(() => {
        console.log(x.ended);
        if(x.ended){
            x.parentNode.parentNode.style.backgroundColor = "rgb(215, 247, 237)";
            // console.log(x.parentNode.parentNode.style.backgroundColor);
            playNext();
        }
    }, x.duration*1000 + 5000);
}
function pauseAudio(x){
    x.pause();
    // playing = false;
}

play.addEventListener("click", play_fn);

function play_fn(){
    console.log(songs_in_playlist);
    if(songs_in_playlist.length==0){
        alert("There are no songs in the playlist!");
    }

    else if(current_song_id==""){
        current_song_id = songs_in_playlist[0];
        console.log(current_song_id);
        console.log(songs_in_playlist);
        console.log(document.getElementsByClassName(current_song_id)[0]);
        let elt = document.getElementsByClassName(current_song_id)[0].children[0].children[0];
        playAudio(elt);
    }
    else{
        let elt = document.getElementsByClassName(current_song_id)[0].children[0].children[0];
        playAudio(elt);
    }
};

pause.addEventListener("click", function(e){
    if(songs_in_playlist.length == 0 || current_song_id==""){
        alert("No song is playing!");
    }
    else{
        let elt = document.getElementsByClassName(current_song_id)[0].children[0].children[0];
        pauseAudio(elt);
    }
});

//play next
next.addEventListener("click", function(e){
    if(songs_in_playlist.length == 0){
        alert("There are no songs in the playlist!");
    }
    else if(current_song_id==""){
        play_fn();
    }
    else{
        let elt = document.getElementsByClassName(current_song_id)[0].children[0].children[0];
        elt.pause();
        elt.load();
        elt.parentNode.parentNode.style.backgroundColor = "rgb(215, 247, 237)";
        elt.ended = true;
        playNext();
    }
});

//play previous song
prev.addEventListener("click", function(e){
    if(songs_in_playlist.length == 0){
        alert("There are no songs in the playlist!");
    }

    else if(current_song_id == ""){
        current_song_id = songs_in_playlist[songs_in_playlist.length-1];
        play_fn();
    }

    else{
        let index = songs_in_playlist.indexOf(current_song_id);
        if(index==0){
            let elt1 = document.getElementsByClassName(current_song_id)[0].children[0].children[0];
            pauseAudio(elt1);
            elt1.load();
            elt1.parentNode.parentNode.style.backgroundColor = "rgb(215, 247, 237)";
            current_song_id = songs_in_playlist[songs_in_playlist.length-1];
            let elt = document.getElementsByClassName(current_song_id)[0].children[0].children[0];
            playAudio(elt);
        }
        else{
            let elt = document.getElementsByClassName(current_song_id)[0].children[0].children[0];
            elt.load();
            elt.parentNode.parentNode.style.backgroundColor = "rgb(215, 247, 237)";
            current_song_id = songs_in_playlist[index-1];
            play_fn();
        }
    }
});






