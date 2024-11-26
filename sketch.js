let fortuneTeller;
let button;
let fortune = '';
let isShaking = false;
let shakeAmount = 0;
let fadeIn = 0;
let imgX, imgY; // 이미지 위치 변수
let targetX, targetY; // 목표 위치 변수
let easing = 0.05; // 부드러운 움직임을 위한 계수

const fortunes = [
  "대길 - 모든 일이 순조롭게 풀릴 것입니다! 🌟",
  "길 - 긍정적인 기운이 가득합니다 ✨",
  "중길 - 차근차근 진행하면 좋은 결과가 있을 것입니다 🌈",
  "소길 - 작은 행운이 찾아올 것입니다 🍀"
];

function preload() {
  // 점쟁이 이미지 로드 (이미지 파일은 별도로 준비해야 합니다)
  fortuneTeller = loadImage('https://fluidaim.github.io/kinmaton_prototype/assets/kinmaton.png');
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  
  // 초기 이미지 위치 설정
  imgX = windowWidth/2;
  imgY = windowHeight/3;
  targetX = imgX;
  targetY = imgY;
  
  // 버튼 생성
  button = createButton('점괘 뽑기');
  button.position(windowWidth/2 - 50, windowHeight - 100);
  button.mousePressed(drawFortune);
  button.class('fortune-button');
  
  // 텍스트 설정
  textAlign(CENTER, CENTER);
  textSize(min(windowWidth, windowHeight) * 0.03);
}

function draw() {
  background(245);
  
  // 모바일 틸트 값으로 목표 위치 업데이트
  if (window.DeviceOrientationEvent) {
    targetX = windowWidth/2 + (rotationY || 0) * 2;
    targetY = windowHeight/3 + (rotationX || 0) * 2;
    
    // 이동 범위 제한
    targetX = constrain(targetX, windowWidth/2 - 50, windowWidth/2 + 50);
    targetY = constrain(targetY, windowHeight/3 - 50, windowHeight/3 + 50);
  }
  
  // 부드러운 움직임 적용
  imgX += (targetX - imgX) * easing;
  imgY += (targetY - imgY) * easing;
  
  imageMode(CENTER);
  
  // 화면 흔들기 효과
  if (isShaking) {
    translate(random(-shakeAmount, shakeAmount), random(-shakeAmount, shakeAmount));
    shakeAmount *= 0.9; // 흔들림 감소
    
    if (shakeAmount < 0.1) {
      isShaking = false;
    }
  }
  
  // 업데이트된 위치에 이미지 그리기
  let imgWidth = min(windowWidth, windowHeight) * 0.4;
  let imgHeight = imgWidth * 1.5;
  image(fortuneTeller, imgX, imgY, imgWidth, imgHeight);
  
  // 점괘 텍스트 표시 (페이드 인 효과)
  if (fortune !== '') {
    if (fadeIn < 255) {
      fadeIn += 5;
    }
    
    fill(0, 0, 0, fadeIn);
    text(fortune, windowWidth/2, windowHeight/2 + 100);
  }
}

function drawFortune() {
  // 흔들기 효과 시작
  isShaking = true;
  shakeAmount = 5;

  // 페이드 인 효과 초기화
  fadeIn = 0;
  
  // 랜덤 점괘 선택
  fortune = random(fortunes);

  // 진동 효과
  navigator.vibrate([100, 30, 100, 30]);
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  imgX = windowWidth/2;
  imgY = windowHeight/3;
  targetX = imgX;
  targetY = imgY;
  button.position(windowWidth/2 - 50, windowHeight - 100);
  textSize(min(windowWidth, windowHeight) * 0.03);
}
