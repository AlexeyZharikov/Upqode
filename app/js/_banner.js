$('.slider').slick({
    arrows: true,
    prevArrow: $('.fa-chevron-left'),
    nextArrow: $('.fa-chevron-right'),
    autoplay: true,
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1
});

let player
 function onYouTubeIframeAPIReady() {
   player = new YT.Player('player', {
     events: {
       'onStateChange': onPlayerStateChange,
     }
   });
 }

 
 
 