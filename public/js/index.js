function offset() {
    const height = window.innerHeight <= 600 ? 0 : $(".header").height(); 
    $(".content").css("margin-top", height);
    const iframe = $("iframe");
    if (iframe)
        iframe.height(iframe.width() * 0.625);
}
offset();
$(window).resize(offset);
$(".navbar-toggler").click(() => setTimeout(offset, 300));

function styleEvenPosts() {
    const posts = $(".post");
    if (posts) {
        const size = window.innerWidth;
        const postsPerRow = size >= 1200 ? 4 : size >= 992 ? 3 : size >= 768 ? 2 : 1;
        for (let post = 0, row = 0; post < posts.length; row++)
            for (let col = 0; post < posts.length && col < postsPerRow; col++, post++) {
                if (row % 2 && !(col % 2) || !(row % 2) && col % 2)
                    posts[post].classList.add("post-even");
                else
                    posts[post].classList.remove("post-even");
            }
    }
}
styleEvenPosts();
$(window).resize(styleEvenPosts);