let pongAnim, pongGame;
function startPong(){
  if(pongGame) pongGame.stop();
  pongGame = new PongGame('pong-canvas');
  pongGame.start();
}
function stopPong(){
  if(pongGame) pongGame.stop();
}
function PongGame(canvasId){
  const canvas = document.getElementById(canvasId);
  const ctx = canvas.getContext('2d');
  const W = canvas.width, H = canvas.height;
  let running = false;
  const paddleH = 54, paddleW = 8;
  let playerY = (H-paddleH)/2, aiY = (H-paddleH)/2;
  let ballX = W/2, ballY = H/2, ballR = 7;
  let ballVX = 4*(Math.random()<0.5?1:-1), ballVY = 2.3*(Math.random()<0.5?1:-1);
  let scorePlayer = 0, scoreAI = 0;
  let up = false, down = false;
  document.addEventListener('keydown', onKey);
  document.addEventListener('keyup', onKey);
  function onKey(e){
    if(e.keyCode===38) up = e.type==='keydown';
    if(e.keyCode===40) down = e.type==='keydown';
  }
  function draw(){
    ctx.clearRect(0,0,W,H);
    ctx.fillStyle = '#101a2b';
    ctx.fillRect(0,0,W,H);
    ctx.strokeStyle = '#0070d1';
    ctx.setLineDash([7,8]);
    ctx.beginPath(); ctx.moveTo(W/2,0); ctx.lineTo(W/2,H); ctx.stroke(); ctx.setLineDash([]);
    ctx.fillStyle = '#bfc6d1';
    ctx.fillRect(16,playerY,paddleW,paddleH);
    ctx.fillRect(W-24,aiY,paddleW,paddleH);
    ctx.beginPath(); ctx.arc(ballX,ballY,ballR,0,2*Math.PI);
    ctx.fillStyle = '#43b047'; ctx.shadowColor = '#43b047'; ctx.shadowBlur = 8;
    ctx.fill(); ctx.shadowBlur = 0;
    ctx.save();
    ctx.globalAlpha = 0.55;
    ctx.fillStyle = '#222b3a';
    ctx.fillRect(W/2-70, 16, 140, 36);
    ctx.globalAlpha = 1;
    ctx.font = 'bold 1.6rem Poppins,Arial';
    ctx.textAlign = 'center';
    ctx.lineWidth = 4; ctx.strokeStyle = '#fff';
    ctx.strokeText(scorePlayer, W/2-32, 41);
    ctx.strokeText(scoreAI, W/2+32, 41);
    ctx.fillStyle = '#43b047';
    ctx.fillText(scorePlayer, W/2-32, 41);
    ctx.fillText(scoreAI, W/2+32, 41);
    ctx.restore();
  }
  function update(){
    if(up) playerY -= 6;
    if(down) playerY += 6;
    playerY = Math.max(0,Math.min(H-paddleH,playerY));
    if(ballY < aiY+paddleH/2) aiY -= 4.2;
    else if(ballY > aiY+paddleH/2) aiY += 4.2;
    aiY = Math.max(0,Math.min(H-paddleH,aiY));
    ballX += ballVX; ballY += ballVY;
    if(ballY-ballR<0 || ballY+ballR>H) ballVY *= -1;
    if(ballX-ballR<24 && ballY>playerY && ballY<playerY+paddleH){
      ballVX = Math.abs(ballVX);
      ballVY += (Math.random()-0.5)*1.2;
    }
    if(ballX+ballR>W-24 && ballY>aiY && ballY<aiY+paddleH){
      ballVX = -Math.abs(ballVX);
      ballVY += (Math.random()-0.5)*1.2;
    }
    if(ballX<0){ scoreAI++; resetBall(-1); }
    if(ballX>W){ scorePlayer++; resetBall(1); }
  }
  function resetBall(dir){
    ballX = W/2; ballY = H/2;
    ballVX = 4*dir; ballVY = 2.3*(Math.random()<0.5?1:-1);
  }
  function loop(){
    if(!running) return;
    update();
    draw();
    pongAnim = requestAnimationFrame(loop);
  }
  this.start = function(){
    running = true;
    loop();
  }
  this.stop = function(){
    running = false;
    cancelAnimationFrame(pongAnim);
    document.removeEventListener('keydown', onKey);
    document.removeEventListener('keyup', onKey);
  }
}
