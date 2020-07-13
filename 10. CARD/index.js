const row = 4;
const column = 3;
const colors = [ 'red', 'red', 'orange', 'orange', 'yellow', 'yellow', 'green', 'green', 'blue', 'blue', 'purple', 'purple' ];
let colorCandidate = colors.slice();
let color = [];
let clickFlag = true; // 카드를 미리 보여주는 동안 클릭할 수 없게 설정하는 변수
let clickCard = []; // 클릭된 카드를 비교
let pairedCard = [];
let startTime;

const shuffleColor = () => {
    // 컬러를 랜덤으로 섞어준다 Fisher–Yates shuffle 알고리즘
    for(let i = 0; colorCandidate.length > 0; i++){
        color = color.concat(colorCandidate.splice(Math.floor(Math.random() * colorCandidate.length), 1));
    }
    console.log('shuffle');
}

const cardSetting = (row, column) => {
    clickFlag = false;
    for(let i = 0; i < row * column; i++){
        const card = document.createElement('div');
        card.className='card'; // card.classList.add('card');
        const cardInner = document.createElement('div');
        cardInner.className='card-inner'
        const cardFront = document.createElement('div');
        cardFront.className='card-front'
        const cardBack = document.createElement('div');
        cardBack.className='card-back';
        cardBack.style.backgroundColor = color[i];
        cardInner.appendChild(cardFront);
        cardInner.appendChild(cardBack);
        card.appendChild(cardInner); 
        card.addEventListener("click", () => {
            if(clickFlag && !pairedCard.includes(card)){ // pairedCard에 포함이 되지 않으면 클릭이 가능하다! 
                card.classList.toggle('flipped');
                clickCard.push(card);
                if(clickCard.length === 2){
                    if(clickCard[0].querySelector('.card-back').getAttribute('style') === clickCard[1].querySelector('.card-back').getAttribute('style')){
                        pairedCard.push(clickCard[0]);
                        pairedCard.push(clickCard[1]);
                        clickCard = [];
                        if(pairedCard.length === row * column){
                            setTimeout(() => {
                                let endTime = new Date();
                                const gameTime = (endTime - startTime) / 1000;
                                alert(`성공하셨습니다. ${gameTime}초 걸렸습니다!`)
                                document.querySelector('#wrapper').innerHTML = '';
                                colorCandidate = colors;
                                color = [];
                                pairedCard = [];
                                shuffleColor();
                                cardSetting(row, column);
                            }, 1000)
                        }
                    } else {
                        clickFlag = false;
                        setTimeout(() => {
                            clickCard[0].classList.remove('flipped');
                            clickCard[1].classList.remove('flipped');
                            clickFlag = true;
                            clickCard = [];
                        }, 1000)
                    }
                   
                } 
            }
        });
        document.querySelector('#wrapper').appendChild(card);
    }
    // 게임 시작 전 미리 카드를 볼 수 있도록 타이머 설정
    document.querySelectorAll('.card').forEach((card, index) => {
        setTimeout(() => {
            card.classList.add('flipped');
        }, 1000 + 100 * index);
        setTimeout(() => {
            card.classList.remove('flipped');
            clickFlag = true;
            startTime = new Date();
        }, 3000);
    });
}

shuffleColor();
cardSetting(row, column);

