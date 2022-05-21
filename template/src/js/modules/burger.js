export default function burger(){
    const burger = document.querySelector('.burger'),
          burgerMenu = document.querySelector('.burger__menu');

    burger.addEventListener('click', () => {
        burger.classList.toggle('active');
        burgerMenu.classList.toggle('active');
        document.body.classList.toggle('no-scroll');
    });
}