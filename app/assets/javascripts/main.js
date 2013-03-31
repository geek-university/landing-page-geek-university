$(function () {
    $('#new_subscription')
        .bind('ajax:success', function (e, data, status, xhr) {
            $('#thank-you-div').html(data);
            $('#subscription_email').val("");
        })
        .bind('ajax:error', function (e, xhr, status, error) {
            console.log("error json: " + xhr.responseText);
        });
});

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
                setTimeout(function() {
                    $('#thank-you').fadeOut();
                }, 4000);
            });
        }
        return false;
    });
});

$(document).ready(function () {
    if (window.innerWidth >= 1400) {
        var images = [
            {src: "/assets/oblako_1.png", id: "oblako1", width: 400 },
            {src: "/assets/oblako_2.png", id: "oblako2", width: 300 },
            {src: "/assets/parashutist.png", id: "parashutist", width: 200},
            {src: "/assets/vosdushnii_shar.png", id: "vosdushnii-shar", width: 150}
        ];
        for (var i = 0; i < images.length; i++) {
            var img = images[i];
            var imgObj = new Image();
            (function (img) {
                imgObj.onload = function (e) {
                    var image = $(this).width(50).css("opacity", 0);
                    $("#" + img.id).append(image);

                    image.animate({
                            opacity: 1,
                            width: img.width
                        }, getRandomInt(1000, 2000), "swing", function () {
                            var endless = function () {
                                image.animate({
                                    width: getRandomInt(img.width - 15, img.width + 15),
                                    paddingTop: getRandomInt(-10, 10)
                                }, getRandomInt(600, 1000), "swing", function () {
                                    endless()
                                })
                            };
                            endless();
                        }
                    );


                }
            }(img));

            imgObj.src = img.src;
        }
    }

    $(".parallax-layer").parallax({
        mouseport: $('#parallax')
    }, {
        xparallax: 0.2,
        yparallax: 0.2,
        xorigin: 0.5,
        yorigin: 0.5
    }, {
        xparallax: 0.2,
        yparallax: -0.1,
        xorigin: 0.5,
        yorigin: 1.0
    }, {
        xparallax: 0.1,
        yparallax: -0.08,
        xorigin: 0.07,
        yorigin: 0.6
    }, {
        xparallax: 0.05,
        yparallax: -0.05,
        xorigin: 1,
        yorigin: 0.1
    }, {
        xparallax: 0.05,
        yparallax: -0.1,
        xorigin: 0.1,
        yorigin: 0.1
    }, {
        xparallax: 0.1,
        yparallax: -0.12,
        xorigin: 1,
        yorigin: 0.4
    })

    function getRandomInt(min, max) {
        return Math.floor(Math.random() * (max - min + 1) + min);
    }
});