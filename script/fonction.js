var max_y = screen.height * 0.45;
var max_x = screen.width;
var m_y = max_y;
var m_x = 1;
var m_x_monstre1 = screen.width * 0.5;
var m_lock = 0;
var m_nbSaut = 0;
var m_direction = 0;
var gravite;
var m_niveau = 1;
var m_hauteurSaut = 30;
var m_vitesseMonstre = 2;
setInterval(methodeGravite, 20);
setInterval(methodeLevel, 30);
function zxcKeyPress(zxc) {
  var touche = String.fromCharCode(zxc);

  if (touche === "W") {
    if (m_lock === 0) {
      m_lock = 1;
      m_y = m_y - 60;
    }

    var d = document.getElementById("personne1");
    d.style.position = "absolute";
    d.style.left = m_x + "px";
    d.style.top = m_y + "px";
  }
  if (touche === "D") {
    m_direction = 2;
    m_x = m_x + 10;
    var d = document.getElementById("personne1");

    d.src = "shrek/shrek_mini_rightv2.png";
    d.style.position = "absolute";
    d.style.left = m_x + "px";
    d.style.top = m_y + "px";
  }

  if (touche === "A") {
    m_direction = -2;
    m_x = m_x - 10;
    var d = document.getElementById("personne1");

    d.src = "shrek/shrek_mini_left.png";
    d.style.position = "absolute";
    d.style.left = m_x + "px";
    d.style.top = m_y + "px";
  }
}

function zxcSetDiv(zxc) {
  zxcObj = zxc;
  document.onkeydown = function(evt) {
    zxcKeyPress(evt ? evt.keyCode : event.keyCode);
  };

  zxc.onmouseout = function() {
    document.onkeydown = null;
  };
}
function methodeInitialize() {
  m_y = max_y;
  if (m_niveau === 5) {
    m_x_monstre1 = screen.width * 2;
  } else {
    m_x_monstre1 = screen.width * 0.5;
  }
  m_x = 1;
  var d = document.getElementById("personne1");
  d.style.position = "absolute";

  d.src = "shrek/shrek_mini_happy.png";
  d.style.left = m_x + "px";
  d.style.top = m_y + "px";
}
function hitBox(source, target) {
  /* Box model detection, return true on collision */
  return !(
    source.offsetTop + source.offsetHeight < target.offsetTop ||
    source.offsetTop > target.offsetTop + target.offsetHeight ||
    source.offsetLeft + source.offsetWidth < target.offsetLeft ||
    source.offsetLeft > target.offsetLeft + target.offsetWidth
  );
}

function methodeLevel() {
  max_y = screen.height * 0.45; //fix zoom
  max_x = screen.width;
  m_x_monstre1 = m_x_monstre1 - m_vitesseMonstre;
  if (m_x >= max_x) {
    methodeNiveauSup();
  }
  var d_personne = document.getElementById("personne1");
  d_personne.style.position = "absolute";
  d_personne.style.left = m_x + "px";
  d_personne.style.top = m_y + "px";

  var d_monstre1 = document.getElementById("monstre1");
  d_monstre1.style.position = "absolute";
  d_monstre1.style.left = m_x_monstre1 + "px";

  var d_trou = document.getElementById("trou1");

  if (hitBox(d_personne, d_monstre1)) {
    methodeInitialize();
  }
  if (hitBox(d_personne, d_trou)) {
    methodeInitialize();
  }
}
