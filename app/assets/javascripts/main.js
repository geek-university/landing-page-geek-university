$(document).ready(function () {
    var email = $("#subscription_email");
    var subscribeButton = $("#subscribe-button");

    email.focus().bind('change focus blur keyup keypress click timer', function () {
        if (isCorrectEmail(email.val())) {
            subscribeButton.removeAttr("disabled");
        } else {
            subscribeButton.attr("disabled", "disabled");
        }
    });

    setInterval(function () {
        email.trigger('timer')
    }, 500);

    function isCorrectEmail(email) {
        var re = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+(?:[A-Z]{2}|com|org|net|edu|gov|mil|biz|info|mobi|name|aero|asia|jobs|museum)\b/;
        return re.test(email);
    }

    subscribeButton.click(function () {
        if (isCorrectEmail(email.val())) {
            $.post('/subscriptions', {"subscription[email]": email.val()}, function (response) {
                $("#thank-you").fadeIn();
                email.val('');
                setTimeout(function () {
                    $('#thank-you').fadeOut();
                }, 3000);
            });
        }
        return false;
    });
});

$(document).ready(function () {
    if (window.innerWidth >= 1400) {
        var imgObjects = [
            {id: "background", src: "/assets/background2.jpg", xRange: 10, yRange: 10, top: -50, left: -50 },
            {id: "footer", src: "/assets/gorod3.png", xRange: 160, yRange: 140, left: -80, bottom: -70, invert: true, width: "2000" },
            {id: "oblako1", src: "/assets/oblako_1.png", xRange: 10, yRange: 10, top: 0, left: 0  },
            {id: "oblako2", src: "/assets/oblako_2.png", xRange: 10, yRange: 10, top: 0, left: 0  },
            {id: "parashutist", src: "/assets/parashutist2.png", xRange: 10, yRange: 10, top: 0, left: 0  },
            {id: "vosdushnii-shar", src: "/assets/vosdushnii_shar3.png", xRange: 10, yRange: 10, top: 0, left: 0  },
            {id: "oblako-text", src: "/assets/oblako-text.png", xRange: 30, yRange: 30, top: 350, left: 1230  }
        ];
        for (var i = 0; i < imgObjects.length; i++) {
            var imgObject = imgObjects[i];
            var img = new Image();
            (function (imgObject) {
                img.onload = function () {
                    var id = "#" + imgObject.id;
                    $(id).prepend($(this)).css({
                        opacity: 0,
                        left: imgObject.left,
                        top: imgObject.top,
                        bottom: imgObject.bottom,
                        width: imgObject.width,
                        zIndex: imgObject.zIndex,
                        position: imgObject.position
                    }).addClass("plax-item")
                        .plaxify({"xRange": imgObject.xRange, "yRange": imgObject.yRange, invert: true})
                        .animate({
                            opacity: 1
                        }, getRandomInt(1000, 2000), "swing");

                    /*                    image.animate({
                     opacity: 1,
                     width: img.width
                     }, getRandomInt(1000, 2000), "swing", function () {
                     var endless = function () {
                     image.animate({
                     width: getRandomInt(imgObject.width - 15, imgObject.width + 15),
                     paddingTop: getRandomInt(-10, 10)
                     }, getRandomInt(600, 1000), "swing", function () {
                     endless()
                     })
                     };
                     endless();
                     }
                     );*/
                }
            }(imgObject));
            img.src = imgObject.src;
        }
        $.plax.enable()
    }

    function getRandomInt(min, max) {
        return Math.floor(Math.random() * (max - min + 1) + min);
    }
});