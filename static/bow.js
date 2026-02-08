const BLAZE = 0;
const CREEPER = 1;
const SKELETON = 2;
const SPIDER = 3;
const ZOMBIE = 4;

const situation = Math.floor(Math.random() * 5);
const situationToFilename = {
  0: "blaze",
  1: "creeper",
  2: "skeleton",
  3: "spider",
  4: "zombie",
};
const situationToValidRect = {
  0: {
    x: 0.55,
    y: 0.44,
    w: 0.06,
    h: 0.15,
  },
  1: {
    x: 0.37,
    y: 0.61,
    w: 0.025,
    h: 0.06,
  },
  2: {
    x: 0.26,
    y: 0.47,
    w: 0.05,
    h: 0.13,
  },
  3: {
    x: 0.45,
    y: 0.38,
    w: 0.05,
    h: 0.05,
  },
  4: {
    x: 0.54,
    y: 0.4,
    w: 0.05,
    h: 0.2,
  },
};
const imagePath = `./static/bow_situations/${situationToFilename[situation]}.png`;
const image = new Image();
image.src = imagePath;

function checkCorrectClick(e) {
  const r = document.getElementById("background").getBoundingClientRect();

  // pointer relative to container
  const px = e.clientX - r.left;
  const py = e.clientY - r.top;

  const cw = r.width;
  const ch = r.height;
  const iw = image.naturalWidth;
  const ih = image.naturalHeight;

  const scale = Math.max(cw / iw, ch / ih);
  const rw = iw * scale;
  const rh = ih * scale;

  const ox = (rw - cw) / 2;
  const oy = (rh - ch) / 2;

  // image-space coordinates
  const ix = (px + ox) / scale;
  const iy = (py + oy) / scale;

  // normalized image coordinates (0–1)
  const nx = ix / iw;
  const ny = iy / ih;

  const rect = situationToValidRect[situation];
  const hit =
    nx >= rect.x &&
    nx <= rect.x + rect.w &&
    ny >= rect.y &&
    ny <= rect.y + rect.h;

  if (hit) {
    document.getElementById("answer-status").innerText = "GOOD JOB MAN WOW";
  } else {
    document.getElementById("answer-status").innerText =
      "YOU FOOL. YOU ABSOLUTE BUFFOON.";
  }
}

function setup() {
  document.addEventListener("pointerdown", checkCorrectClick);
  document.getElementById("background").style.backgroundImage =
    `url('${imagePath}')`;
}

setup();
