let fortuneTeller;
let button;
let fortune = '';
let isShaking = false;
let shakeAmount = 0;
let fadeIn = 0;

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
  
  // 버튼 생성 및 중앙 정렬
  button = createButton('점괘 뽑기');
  button.position(windowWidth/2 - 50, windowHeight - 100);
  button.mousePressed(drawFortune);
  button.class('fortune-button');
  
  textAlign(CENTER, CENTER);
  textSize(min(windowWidth, windowHeight) * 0.03); // 화면 크기에 비례한 텍스트 크기
}

function draw() {
  background(245);
  
  imageMode(CENTER);
  
  // 화면 흔들기 효과
  if (isShaking) {
    translate(random(-shakeAmount, shakeAmount), random(-shakeAmount, shakeAmount));
    shakeAmount *= 0.9; // 흔들림 감소
    
    if (shakeAmount < 0.1) {
      isShaking = false;
    }
  }
  
  // 이미지 크기를 화면 크기에 비례하게 조정
  let imgWidth = min(windowWidth, windowHeight) * 0.4;
  let imgHeight = imgWidth * 1.5;
  image(fortuneTeller, windowWidth/2, windowHeight/3, imgWidth, imgHeight);
  
  if (fortune !== '') {
    if (fadeIn < 255) {
      fadeIn += 5;
    }
    
    fill(0, 0, 0, fadeIn);
    text(fortune, windowWidth/2, windowHeight/2 + imgHeight/2);
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

// 윈도우 크기 변경 시 캔버스 리사이즈
function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  button.position(windowWidth/2 - 50, windowHeight - 100);
  textSize(min(windowWidth, windowHeight) * 0.03);
}
