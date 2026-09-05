// 随机背景图
(function () {
    var bgImages = [
        '/img/bg/bg1.webp',
        '/img/bg/bg2.webp',
        '/img/bg/bg3.webp',
        '/img/bg/bg4.webp',
        '/img/bg/bg5.webp',
        '/img/bg/bg6.webp'
    ];
    var randomBg = bgImages[Math.floor(Math.random() * bgImages.length)];
    var img = new Image();
    img.onload = function () {
        document.body.style.backgroundImage = 'url(' + randomBg + ')';
        document.body.classList.add('has-bg');
    };
    img.src = randomBg;
})();
