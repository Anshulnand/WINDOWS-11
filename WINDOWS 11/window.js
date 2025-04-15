const winstart = document.querySelector(".start");
const window2 = document.querySelector(".nwindow2");

//START MENU
function winshow() {
  window2.classList.toggle("active");
}

winstart.addEventListener("click", (e) => {
  e.stopPropagation(); // Prevent the click event from propagating to the document
  winshow();
});

window2.addEventListener("click", (e) => {
  e.stopPropagation(); // Prevent the click event from propagating to the document
});

document.addEventListener("click", () => {
  if (window2.classList.contains("active")) {
    winshow();
    icon.classList.remove("activetrans");
  }
});

function dispdate() {
  let currentdate = new Date();
  let day = currentdate.getDate();
  let month = currentdate.getMonth() + 1;
  let year = currentdate.getFullYear();

  day = (day < 10 ? "0" : "") + day;
  month = (month < 10 ? "0" : "") + month;
  let x = day + "-" + month + "-" + year;
  document.getElementById("date").innerHTML = x;
}

window.onload = dispdate();

function disptime() {
  let currenttime = new Date();
  let hour = currenttime.getHours();
  let min = currenttime.getMinutes();
  let sec = currenttime.getSeconds();

  hour = (hour < 10 ? "0" : "") + hour;
  min = (min < 10 ? "0" : "") + min;
  sec = (sec < 10 ? "0" : "") + sec;

  let y = hour + ":" + min + ":" + sec;
  document.getElementById("time").innerHTML = y;
}
window.onload = function () {
  disptime();
  setInterval(disptime, 1000);
};

let dragwindow = document.querySelector(".dragwindow");
let titlebar = document.querySelector(".titlebar");
let offsetx;
let offsety;
titlebar.addEventListener("mousedown", function (e) {
  offsetx = e.clientX - dragwindow.offsetLeft;
  offsety = e.clientY - dragwindow.offsetTop;
  document.addEventListener("mousemove", dragin);
  document.addEventListener("mouseup", dragout);
});

//DRAGIN
function dragin(e) {
  let x = e.clientX - offsetx;
  let y = e.clientY - offsety;
  dragwindow.style.left = x + "px";
  dragwindow.style.top = y + "px";
}

function dragout() {
  document.removeEventListener("mousemove", dragin);
  document.removeEventListener("mouseup", dragout);
}

function centerwindow() {
  dragwindow.style.left = "30%";
  dragwindow.style.top = "100px";
}
//FOLDER
let folder = document.querySelector(".filexp");
document.addEventListener("DOMContentLoaded", folderopen);
function folderopen() {
  folder.addEventListener("click", (e) => {
    centerwindow();
    dragwindow.classList.add("active");
  });
  //FOLDER CROSS
  let cross = document.querySelector(".cross");
  cross.addEventListener("click", () => {
    folder.classList.remove("activetrans");
    dragwindow.classList.remove("active");
    dragwindow.classList.remove("maximise");
    iconq.classList.remove("activetrans");
  });
  //FOLDER NAME

  //FOLDER MAX
  let max = document.querySelector(".max");
  max.addEventListener("click", (e) => {
    e.stopPropagation();
    if (!dragwindow.classList.contains("maximise")) {
      dragwindow.style.left = "0";
      dragwindow.style.top = "0";
      dragwindow.classList.add("maximise");
    } else {
      dragwindow.classList.remove("maximise");
      centerwindow();
    }
  });
}

//MINIMISE
let min = document.querySelector(".minus");
function minimisefunc() {
  min.addEventListener("click", (e) => {
    e.stopPropagation();

    dragwindow.classList.add("minimise");
    dragwindow.classList.remove("active");
    dragwindow.classList.remove("minimise");
    newicon.addEventListener("click", () => {
      dragwindow.classList.add("active");
    });
  });
}
document.addEventListener("DOMContentLoaded", minimisefunc);

//ICON STAYS ON
let icon = document.querySelectorAll(".icon");
function iconfunc() {
  icon.forEach((e) => {
    e.addEventListener("click", (x) => {
      e.classList.add("activetrans");
      x.stopPropagation();
    });
  });
  document.addEventListener("click", () => {
    icon.forEach((e) => {
      e.classList.remove("activetrans");
      console.log("troggered");
    });
  });
}
document.addEventListener("DOMContentLoaded", iconfunc);

// START ICON AT THE TASKBAR
let newicon = document.querySelector("#newicon");
let iconclick = document.querySelectorAll(".iconclick");
let iconq = document.querySelector(".iconq");
let clickedElement;
let dragcontent = document.querySelector(".dragcontent");
let titletext=document.querySelector('.titletext');
iconclick.forEach((e) => {
  e.addEventListener("click", () => {
    const appName = e.querySelector("p").textContent.toLowerCase();

    newicon.innerHTML = e.querySelector("img").outerHTML;
    iconq.classList.add("activetrans");

    if (appName === "settings") {
      // Show the settings menu
      settingsmenu.classList.add("active");

      // Update title and content (optional)
      dragcontent.innerHTML = e.querySelector("img").outerHTML;
      titletext.innerHTML = e.querySelector("p").innerHTML;
    } else {
      // Show the regular draggable window
      dragwindow.style.left = "30%";
      dragwindow.style.top = "100px";
      dragwindow.classList.add("active");
      winshow();

      dragcontent.innerHTML = e.querySelector("img").outerHTML;
      titletext.innerHTML = e.querySelector("p").innerHTML;
    }
  });
});


//WIFI
let wifibox = document.querySelector(".wifibox");
let wifiwindow = document.querySelector(".wifiwindow");
function wifiwinshow() {
  wifiwindow.classList.toggle("active");
}

wifibox.addEventListener("click", (e) => {
  e.stopPropagation();
  langmenu.classList.remove("active");
  wifiwinshow();
});
wifiwindow.addEventListener("click", (e) => {
  e.stopPropagation();
});
document.addEventListener("click", () => {
  if (wifiwindow.classList.contains("active")) {
    wifiwinshow();
  }
});
//shodesktop
let showdesk = document.querySelector(".showdesk");
showdesk.addEventListener("click", () => {
  wifiwindow.classList.remove("active");
  langmenu.classList.remove("active");
  folder.classList.remove("activetrans");
  dragwindow.classList.remove("active");
  dragwindow.classList.remove("maximise");
  iconq.classList.remove("activetrans");
});
//INSIDE WIFI

let wifirecList = document.querySelectorAll(".wifiblock");
wifirec = document.querySelector(".wifirec");
wifirecList.forEach((e) => {
  e.addEventListener("click", (x) => {
    x.currentTarget.classList.toggle("active");
    wifirec.style.font = "18px";
  });
});

//brightness
let brightslider = document.querySelector("#brightslider");
brightslider.addEventListener("input", (event) => {
  const brightslideval = event.target.value / 50;
  adjustbrightess(brightslideval);
});
function adjustbrightess(value) {
  document.body.style.filter = `brightness(${value})`;
}

let hoverdetail = document.querySelector(".hoverdetail");

//add hoverdetail on icon hover

//languagemenu
let langbut = document.querySelector("#langbut");
let langmenu = document.querySelector(".language");
langbut.addEventListener("click", (e) => {
  e.stopPropagation();
  console.log("work");
  langmenu.classList.toggle("active");
  wifiwindow.classList.remove("active");
});
document.addEventListener("click", () => {
  langmenu.classList.remove("active");
});


//SETTINGS MENU
let settingbut = document.getElementById("settingbut");
let settingsmenu = document.getElementById("settingsmenu");
settingbut.addEventListener("click", () => {
  
  settingsmenu.classList.add("active");

});
let minusset= document.querySelector('.minusset');
let crossset=document.querySelector('.crossset');
 crossset.addEventListener('click',()=>
 {
  iconq.classList.remove("activetrans");
  settingsmenu.classList.remove("active");
 })
 minusset.addEventListener('click',()=>
 {
  settingsmenu.classList.add('minimise');
  settingsmenu.classList.remove("active");
  settingsmenu.classList.remove('minimise');
 })

 window.addEventListener("load", () => {
  setTimeout(() => {
    const startup = document.getElementById("startup");
    if (startup) {
      startup.style.display = "none";
    }
  }, 2500); // Matches animation time
});
