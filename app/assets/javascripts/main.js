$(function ($) {
    var $email = $("#subscription_email");
    var $submit = $("#subscribe-button");


    $email.focus().bind('change focus blur keyup keypress click timer', function () {
        $submit.attr("disabled", !isCorrectEmail($email.val()));
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
    if (window.innerWidth >= 1500) {
        var imgObjects = [
            {id: "city-far", src: "/assets/city-far2.png", xRange: 40, yRange: 20, invert: true},
            {id: "footer", src: "/assets/gorodwin-c.png", xRange: 140, yRange: 100, invert: true},
            {id: "oblako1", src: "/assets/oblako1-15-400.png", xRange: 30, yRange: 30, top: 475, left: 200 },
            {id: "parashutist", src: "/assets/parashutist-15-150.png", xRange: 20, yRange: 20, top: 80, left: 100 },
            {id: "vosdushnii-shar", src: "/assets/vosdushnii_shar4.png", xRange: 10, yRange: 10, top: 10, left: 1500 },
            {id: "about-cloud", src: "/assets/about-cloud3.png", xRange: 20, yRange: 20, top: 350, left: 1230 }
        ];
        for (var i = 0; i < imgObjects.length; i++) {
            var imgObject = imgObjects[i];
            var img = new Image();
            (function (imgObject) {
                var id = "#" + imgObject.id;
                $(id).hide();
                img.onload = function () {
                    $(id).show();
                    $(id).prepend($(this)).css({
                        opacity: 0,
                        left: imgObject.left,
                        top: imgObject.top
                    }).addClass("plax-item")
                        .plaxify({"xRange": imgObject.xRange, "yRange": imgObject.yRange, invert: true})
                        .animate({
                            opacity: 1
                        }, getRandomInt(1000, 2000), "swing");
                }
            }(imgObject));

            img.src = imgObject.src;
        }
        //$('#background').plaxify({invert: true})
        $('#left-eye').plaxify();
        $('#right-eye').plaxify();
        $.plax.enable();

        function getRandomInt(min, max) {
            return Math.floor(Math.random() * (max - min + 1) + min);
        }
    } else {
        //shitty code
        var img = new Image();
        img.onload = function() {
            $("#about-cloud").prepend($(this));
        };
        img.src = "/assets/about-cloud3.png";
    }
});