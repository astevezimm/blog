function offset() {
    $(".content").css("margin-top", $(".header").height());
    const iframe = $("iframe");
    if (iframe)
        iframe.height(iframe.width() * 0.625);
}
offset();
$(window).resize(offset);
$(".navbar-toggler").click(() => setTimeout(offset, 300));
