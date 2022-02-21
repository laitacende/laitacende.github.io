$("#hamburger").on('click', function() {
    $(this).toggleClass('open');
    $(".overlay").slideToggle().css({"display": "flex", "justify-content": "center",
    "align-items": "center", "align-content": "center"});
});
let sticky = $(".main-nav").offset().top + 80;
window.onscroll = function() {
    if (window.pageYOffset > sticky) {
        $(".main-nav").addClass("sticky");
    } else {
        $(".main-nav").removeClass("sticky");
    }
};