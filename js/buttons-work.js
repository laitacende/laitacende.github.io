;(_ => {
    function hide() {
        $("#web-work").addClass("hidden")
        $("#ux-work").addClass("hidden");
        $("#android-work").addClass("hidden");
        $("#java-work").addClass("hidden");

        // remove active class
        $("#web").removeClass("active-button");
        $("#ux").removeClass("active-button");
        $("#android").removeClass("active-button");
        $("#java").removeClass("active-button");
    }


    $("#web").click(_ => {
        // add hidden to the others
        hide();
        $("#web-work").removeClass("hidden");
        $(this).addClass("active-button");
    });

    $("#ux").click(_ => {
        hide();
        $("#ux-work").removeClass("hidden");
        $(this).addClass("active-button");
    });

    $("#android").click(_ => {
        hide();
        $("#android-work").removeClass("hidden");
        $(this).addClass("active-button");
    });

    $("#java").click(_ => {
        hide();
        $("#java-work").removeClass("hidden");
        $(this).addClass("active-button");
    });

})();