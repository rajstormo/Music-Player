
const songs = [
  {
    title: "8 Parche",
    artists: ['Baani Sandhu', ' Gur Sidhu'],
    thumbnail: "./images/8Parche.jpg",
    file: "./Music/8 parche.mp3"
  },
  {
    title: "Amplifier",
    artists: ['Imran Khan'],
    thumbnail: "./images/amplifier.jpg",
    file: "./Music/Amplifier.mp3"
  },
  {
    title: "Teri Meri Kahani",
    artists: [
      "Yo Yo Honey Singh",
      "Chirantan Bhatt",
    ],
    thumbnail: "./images/teriMeri.jpg",
    file: "./Music/Teri Meri Kahaani.mp3"
  },
  {
    title: "Dance Like",
    artists: [
      "Harrdy Sandhu"
    ],
    thumbnail: "./images/danceLike.jpg",
    file: "./Music/Dance Like.mp3"
  },
  {
    title: "Daru Badnaam",
    artists: [
      "Kamal Kahlon",
      "Param Singh"
    ],
    thumbnail: "./images/daruBadnam.jpg",
    file: "./Music/Daru Badnam.mp3"
  },
  {
    title: "Kya Baat Ay",
    artists: [
      "Harrdy Sandhu"
    ],
    thumbnail: "./images/kyaBaatAy.jpg",
    file: "./Music/Kya Baat Ay.mp3"
  },
  {
    title: "Satisfya",
    artists: [
      "Imran Khan"
    ],
    thumbnail: "./images/satisfya.jpg",
    file: "./Music/Satisfya.mp3"
  },
  {
    title: "Taki Taki",
    artists: [
      "DJ Snake"
    ],
    thumbnail: "./images/takiTaki.jpg",
    file: "./Music/Taki-Taki.mp3"
  },
  {
    title: "Photo",
    artists: [
      "Karan Sehmbi"
    ],
    thumbnail: "./images/photo.jpg",
    file: "./Music/Photo.mp3"
  },
  {
    title: "High Rated Gabru",
    artists: [
      "Guru Randhawa"
    ],
    thumbnail: "./images/highRated.jpg",
    file: "./Music/High Rated Gabru Song.mp3"
  },
]


let songIndex = 0;
let isSongPlaying = false;
let song = document.getElementById("song");
let prevSongIndex = -1;
let displaySongList = false;

function playPauseSong() {
  if (prevSongIndex != songIndex) {
    song.pause();
    isSongPlaying = false;
    $(`#${prevSongIndex}`).attr("src", "./images/play-solid.svg");
    song.src = songs[songIndex].file;
  }
  
  if (!isSongPlaying) {
    console.log("playing");
    isSongPlaying = true;
    $(`#${songIndex}`).attr("src", "./images/pause-solid.svg");
    $("#play-song").attr("src","./images/pause-solid.svg");
    song.play();
  }
  else {
    isSongPlaying = false;
    $(`#${songIndex}`).attr("src", "./images/play-solid.svg");
    $("#play-song").attr("src","./images/play-solid.svg");
    $("#image").css("transform","scale(1)");
    song.pause();
  }
}

function loadSongDetails(idx) {
  prevSongIndex = songIndex; 
  songIndex = idx;

  if (songIndex > 9)
    songIndex = 0;
  if (songIndex < 0)
    songIndex = 9;

  $("#thumbnail-container #image, #background").attr("src", songs[songIndex].thumbnail);
  $("#song-name").text(songs[songIndex].title);
  $("#artist-name").text(songs[songIndex].artists.toString());
  
  playPauseSong();
}

function displaySongsList() {  
  let ulElement = `<ul id=songs-list> </ul>`
  $("#select-song").append(ulElement);

  let counter = 0;
  $.each(songs, function (index, s) {
    let liElement = `
    <li id=${counter} onclick="loadSongDetails(this.id)"> 
      <img src="${s.thumbnail}"/>
      <div class="details">
        <h3> ${s.title} </h3>
        <p> ${s.artists.toString()} </p>
      </div>
    </li>`
    $("#songs-list").append(liElement);
    counter++;
  });
}

function playNextSong() {
  loadSongDetails(songIndex+1);
}

function playPrevSong() {
  loadSongDetails(songIndex-1);
}


$(document).ready(start);


function start() {

  displaySongsList();
  $("#menu-bar").click(function() {
    if (!displaySongList) {
      displaySongList = true;
      $("#select-song").css("display","block");
      $("#main").css({ "height": "500px" });
      $("#thumbnail-container, #slider-controls, #player-controls").css("display", "none");
      $("#header p").text("MUSIC LIST");
    }
    else {
      displaySongList = false;
      $("#select-song").css("display","none");
      $("#slider-controls, #player-controls").css("display", "flex");
      $("#thumbnail-container").css("display","block");
      $("#header p").text("MUSIC PLAYER");
      $("#main").css("height","auto");
    }
  });

  $("#play-song").click(function() {
    loadSongDetails(songIndex);
  });

  $("#next-song").click(function() {
    playNextSong();
  })

  $("#prev-song").click(function() {
    playPrevSong();
  })

}
