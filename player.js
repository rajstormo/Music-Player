
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
    title: "Kalla Changa",
    artists: [
      "Ninja"
    ],
    thumbnail: "./images/kalla-changa.jpg",
    file: "./Music/Kalla Changa.mp3"
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

//variables
let songIndex = 0;
let isSongPlaying = false;
let song = document.getElementById("song");
let nightMode = false;
let prevSongIndex = -1;
let displaySongList = false;
let progressBar = document.getElementById("progress-bar");

//methods
function playPauseSong() {
  if (prevSongIndex != songIndex) {
    song.pause();
    isSongPlaying = false;
    song.src = songs[songIndex].file;
  }

  console.log(song.duration);

  if (!isSongPlaying) {
    isSongPlaying = true;
    $("#play-song").attr("src", "./images/pause-solid.svg");
    song.play();
  }
  else {
    isSongPlaying = false;
    $("#play-song").attr("src", "./images/play-solid.svg");
    song.pause();
  }
}

function displaySongsList() {
  let ulElement = `<ul id=songs-list> </ul>`
  $("#select-song").append(ulElement);

  let counter = 0;
  $.each(songs, function (index, s) {
    let liElement = `
  <li id=${counter} onclick="loadSongDetails(this.id); changeBackground()"> 
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

function changeBackground() {
  $(`#${songIndex} h3, #${songIndex} p`).css("color","#00A97F");  

  if (!nightMode) 
    $(`#${prevSongIndex} h3, #${prevSongIndex} p`).css("color","#000");  
  else 
    $(`#${prevSongIndex} h3, #${prevSongIndex} p`).css("color","#fff");  
}

function loadSongDetails(idx) {
  prevSongIndex = songIndex;
  songIndex = idx;

  if (songIndex > 9)
    songIndex = 0;
  if (songIndex < 0)
    songIndex = 9;
  
  let imageUrl = songs[songIndex].thumbnail; 
  $("#thumbnail-container #image, #background").attr("src", imageUrl);
  $("body").css("background",`url(${imageUrl}) no-repeat center center/cover`);
  $("#song-name").text(songs[songIndex].title); 
  $("#artist-name").text(songs[songIndex].artists.toString());
  
  playPauseSong();
}

function showHideDisplaySongList() {
  if (!displaySongList) {
    displaySongList = true;
    $("#select-song").css("display", "block");
    $("#main").css({ "height": "500px" });
    $("#thumbnail-container, #slider-controls, #player-controls").css("display", "none");
    $("#header").css("margin-bottom",0); 
  }
  else {
    displaySongList = false;
    $("#select-song").css("display", "none");
    $("#slider-controls, #player-controls").css("display", "flex");
    $("#thumbnail-container").css("display", "block");
    $("#header h2").text("MUSIC PLAYER");
    $("#main").css("height", "auto");
    $("#header").css("margin-bottom",20); 
  }
}

function playNextSong() {
  loadSongDetails(songIndex + 1);
  changeBackground();
}

function playPrevSong() {
  loadSongDetails(songIndex - 1);
}

function updateProgressBar() {
  progressBar.max = song.duration;
  progressBar.value = song.currentTime;
  $("#current-time").text(formatTime(Math.floor(song.currentTime)));
  $("#duration-time").text((formatTime(Math.floor(song.duration))));
}

function changeProgressBar() {
  song.currentTime = progressBar.value;
}

function formatTime(seconds) {
  let min = Math.floor((seconds / 60));
  let sec = Math.floor(seconds - (min * 60));
  if (sec < 10) {
    sec = `0${sec}`;
  };
  return `${min}:${sec}`;
};

function switchMode() {
  if (!nightMode) {
    nightMode = true;
    $("#switch-mode").attr("src","./images/sun-solid.svg");
    $("#main").css("background-image","linear-gradient(to bottom, #303030, #252525, #1b1b1b, #111111, #000000)");
    $("#progress-bar").css("background-color","#fff");
    $("#main h3, #main p").css("color","#fff");
    $(`#${songIndex} h3, #${songIndex} p`).css("color","#00A97F");  
    $("#prev-song, #play-song, #next-song").css("filter","invert(100%)");    
  } 
  else {
    nightMode = false;
    $("#switch-mode").attr("src","./images/moon-solid.svg");
    $("#main").css("background-image","linear-gradient(to top,#eee,#eee)");
    $("#progress-bar").css("background-color","#000");
    $("#main h3, #main p").css("color","#000");
    $(`#${songIndex} h3, #${songIndex} p`).css("color","#00A97F");  
    $("#prev-song, #play-song, #next-song").css("filter","invert(0)");
  }
}


$(document).ready(start);

function start() {
  //Display the songs list in background(initially hidden)
  displaySongsList();

  //Events 
  $("#menu-bar").click(function() {
    showHideDisplaySongList();
  });

  $("#play-song").click(function () {
    $("li:first-child h3, li:first-child p").css({"color":"#00A97F"});
    loadSongDetails(songIndex);
  });

  $("#next-song").click(function () {
    playNextSong();
  })

  $("#prev-song").click(function () {
    playPrevSong();
  })

  $("#progress-bar").change(function () {
    changeProgressBar();
  });

  //switch b/w day and night mode
  $("#header #switch-mode").click(function() {
    switchMode();
  });

  //when the current song ends playing, play the next Song
  song.addEventListener("ended", function () {
    playNextSong();
  });

  setInterval(updateProgressBar, 500);
} 
