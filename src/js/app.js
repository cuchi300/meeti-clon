document.addEventListener('DOMContentLoaded', function() {
    iniciarApp();
})

function iniciarApp(){
    navegacionFija();
}

function navegacionFija() {
    const header = document.querySelector('.header');
    const hero = document.querySelector('.hero');
    const body = document.querySelector('body');

    window.addEventListener('scroll', function() {
        if(hero.getBoundingClientRect().bottom < 0) {
            header.classList.add('fijo');
            body.classList.add('body-scroll');
        } else{
            header.classList.remove('fijo');
            body.classList.remove('body-scroll');
        }
    })
}