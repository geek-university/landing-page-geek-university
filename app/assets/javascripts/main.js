$(function ($) {
    var $email = $("#subscription_email");
    var $submit = $("#subscribe-button");

    $email.focus().bind('change focus blur keyup keypress click timer', function () {
        if (isCorrectEmail($email.val())) {
            $submit.removeAttr("disabled");
        } else {
            $submit.attr("disabled", "disabled");
        }
    });

    setInterval(function () {
        $email.trigger('timer')
    }, 500);

    function isCorrectEmail(email) {
        var re = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+(?:[A-Z]{2}|com|org|net|edu|gov|mil|biz|info|mobi|name|aero|asia|jobs|museum)\b/;
        return re.test(email);
    }

    $submit.click(function () {
        if (isCorrectEmail($email.val())) {
            $.post('/subscriptions', {"subscription[email]": $email.val()}, function (response) {
                $("#thank-you").fadeIn();
                $email.val('');
                setTimeout(function () {
                    $('#thank-you').fadeOut();
                }, 3000);
            });
        }
        return false;
    });
});

$(function ($) {
    var imgObjects = [
        //{id: "background", src: "/assets/background_old.jpg", xRange: 10, yRange: 10, top: -50, left: -50 },
        {id: "footer", src: "/assets/gorod3.png", xRange: 160, yRange: 140,invert: true},
        {id: "oblako1", src: "/assets/oblako2.png", xRange: 30, yRange: 30, top: 600, left: 200  },
        {id: "parashutist", src: "/assets/parashutist4.png", xRange: 10, yRange: 10, top: 100, left: 100  },
        {id: "vosdushnii-shar", src: "/assets/vosdushnii_shar4.png", xRange: 10, yRange: 10, top: 10, left: 1400  },
        {id: "about-cloud", src: "/assets/about-cloud.png", xRange: 30, yRange: 30, top: 350, left: 1230  }
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
                    position: "absolute"
                }).addClass("plax-item")
                    .plaxify({"xRange": imgObject.xRange, "yRange": imgObject.yRange, invert: true})
                    .animate({
                        opacity: 1
                    }, getRandomInt(1000, 2000), "swing");
            }
        }(imgObject));
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
        img.src = imgObject.src;
    }
    $('#background').plaxify()
    $.plax.enable()

    function getRandomInt(min, max) {
        return Math.floor(Math.random() * (max - min + 1) + min);
    }
});