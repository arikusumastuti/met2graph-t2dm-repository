// First swipe function
document.querySelector('#home').addEventListener('click', (e) => {
    document.querySelector('#home').style.top = '-100%';
    document.querySelector('main').classList.remove('d-none');
})