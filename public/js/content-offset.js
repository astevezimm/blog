const offset = () => $(".content").css("margin-top", $(".header").height());
offset();
$(window).resize(offset);
$(".navbar-toggler").click(() => setTimeout(offset, 300));