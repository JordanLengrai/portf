window.addEventListener('DOMContentLoaded', function() {
  const intro = document.getElementById('ps-intro');
  if(intro){
    if(!sessionStorage.getItem('ps_intro_seen')){
      setTimeout(() => {
        intro.classList.add('hide');
        setTimeout(()=>{ intro.style.display = 'none'; }, 800);
      }, 2500);
      sessionStorage.setItem('ps_intro_seen', '1');
    }else{
      intro.style.display = 'none';
    }
  }
});

const konami = [38,38,40,40,37,39,37,39,66,65];
let kIndex = 0;
document.addEventListener('keydown', function(e){
  if(e.keyCode === konami[kIndex]){
    kIndex++;
    if(kIndex === konami.length){
      showKonamiEgg();
      kIndex = 0;
    }
  }else{
    kIndex = 0;
  }
});

function showKonamiEgg(){
  const egg = document.getElementById('konami-egg');
  if(egg){
    egg.style.display = 'flex';
    egg.classList.add('show');
    startPong();
  }
}

if(document.getElementById('close-pong')){
  document.getElementById('close-pong').onclick = function(){
    document.getElementById('konami-egg').style.display = 'none';
    stopPong();
  }
}
