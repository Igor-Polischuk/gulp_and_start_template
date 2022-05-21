export default function slider(){
    const slideLine = document.querySelector('.slides'),
        nextBtn = document.querySelector('.next__btn'),
        prevBtn = document.querySelector('.prev__btn'),
        slides = document.querySelectorAll('.slide'),
        slide = document.querySelector('.slide'),
        slideTotal = slides.length;
    
    let offset = 0;
    let current = 1;
    let dots = [];
    
    dots = createDots('.slider__dots', slideTotal, dots);

    slideLine.style.width = +window.getComputedStyle(slide).width.replace(/\D/gi, '') * slideTotal + 'px';
    let slideWidth = window.getComputedStyle(slide).width;

    nextBtn.addEventListener('click', () => {
        if (slideTotal - current === 1) {
            return;
        }
        if (current % 2 === 0){
            dots.forEach(dot => dot.classList.remove('active', 'go-right', 'go-left'));
            dots[current / 2].classList.add('active', 'go-right');
        }
        offset -= +slideWidth.replace(/px/ig, '') + 50;
        slideLine.style.transform = `translateX(${offset}px)`;
        current++;
    });

    prevBtn.addEventListener('click', () => {
        if (offset === 0){
            return;
        }
        console.log(offset);

        dots.forEach(dot => dot.classList.remove('active', 'go-right', 'go-left'));
        dots[Math.floor(current / 2) - 1].classList.add('active', 'go-left');

        offset += +slideWidth.replace(/px/ig, '') + 50;
        slideLine.style.transform = `translateX(${offset}px)`;
        current--;
    });

    dots.forEach(dot => {
        dot.addEventListener('click', e => {
            dots.forEach((item, i) => {
                if (e.target === item){
                    dots.forEach(dot => dot.classList.remove('active', 'go-right', 'go-left'));
                    dots[i].classList.add('active');
                    
                    if (current < i * 2){
                        dots[i].classList.add('go-right');
                    } else if(current > i * 2){
                        dots[i].classList.add('go-left');
                    }
                    
                    offset = (+slideWidth.replace(/px/ig, '') + 50) * i * -2;
                    slideLine.style.transform = `translateX(${offset}px)`;

                    current = i * 2 + 1;
                }
            });
        });
    });
}

function createDots(parentSlector, length, dotArr){
    const dotsParent = document.querySelector(parentSlector);

    for (let i = 0; i < Math.floor(length / 2); i++){
        const dot = document.createElement('div');
        dot.classList.add('dot');
        if (i === 0){
            dot.classList.add('active');
        }
        dotsParent.append(dot);
        dotArr.push(dot);
    }
    return dotArr;
}