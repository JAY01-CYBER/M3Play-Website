// DOWNLOAD BUTTON
function download() {
  window.open("https://github.com/JAY01-CYBER/M3-Play/releases");
}

function github() {
  window.open("https://github.com/JAY01-CYBER/M3-Play");
}

// AUTO SLIDER
const slider = document.getElementById("slider");

setInterval(() => {
  slider.scrollBy({
    left: 230,
    behavior: "smooth"
  });

  if (slider.scrollLeft + slider.clientWidth >= slider.scrollWidth) {
    slider.scrollTo({ left: 0 });
  }
}, 2500);

// COUNTER
let count = 0;
let target = 10000;

let interval = setInterval(() => {
  count += 200;
  document.getElementById("downloads").innerText = count + "+";

  if (count >= target) clearInterval(interval);
}, 50);
