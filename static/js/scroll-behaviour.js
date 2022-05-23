let y = 0; // current scroll position
let scroll_limit = 1000; // scroll distance limit for animation
let time = 1200; // scroll animation duration


// changes the scrolling behavior for mouse scroll to a smoother one
window.addEventListener('wheel', function (e) {
    e.preventDefault();
    let delta = 300;
    if (e.deltaY < 0) {
        delta *= -1;
    }
    y += delta;

    let body = document.body;
    let html = document.documentElement;
    let height = Math.max( body.scrollHeight, body.offsetHeight, html.clientHeight, html.scrollHeight, html.offsetHeight ) - 900
    if (y < 0) {
        y = -100;
    } else if (y > height) {
        y = height;
    }
    if (y < window.scrollY - scroll_limit) {
        y = window.scrollY - scroll_limit;
    } else if (y > window.scrollY + scroll_limit) {
        y = window.scrollY + scroll_limit;
    }

    $('html, body').stop().animate({
        scrollTop: y
    }, {
        easing: 'easeOutCubic',
        duration: time
    });
}, {passive: false});
