window.onload = function () {
    $("#greeting").fadeIn(1000);
    $(".work-pane").css({"visibility":"visible", "top":0});
    setTimeout(() => { $("body").css("overflow", "auto"); }, 1000);
};

