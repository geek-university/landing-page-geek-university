$(function() {
    $('#new_subscription')
        .bind('ajax:success', function(e, data, status, xhr) {
            $('#thank-you-div').html(data);
            $('#subscription_email').val("");
        })
        .bind('ajax:error', function(e, xhr, status, error) {
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
            $.post('/subscriptions', {"subscription[email]" : email.val()}, function (response) {
                $("#subscribe-form").hide();

                $("#owl-with-letter").animate({
                    transform: "rotate(7deg)",
                    "-ms-transform": "rotate(7deg)",
                    "-moz-transform": "rotate(7deg)",
                    "-webkit-transform": "rotate(7deg)",
                    "-o-transform": "rotate(7deg)",
                    top: "400px",
                    left: "400px",
                    width: "10px",
                    height: "10px",
                    opacity: 0.4,
                    marginLeft: "0.6in",
                    fontSize: "3em",
                    borderWidth: "10px"
                }, 1500);
            });
        }
        return false;
    });
});

$(document).ready(function() {
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
        xparallax: 0.2,
        yparallax: -0.15,
        xorigin: 0.07,
        yorigin: 0.6
    }, {
        xparallax: 0.1,
        yparallax: -0.1,
        xorigin: 1,
        yorigin: 0.1
    }, {
        xparallax: 0.1,
        yparallax: -0.2,
        xorigin: 0.1,
        yorigin: 0.1
    }, {
        xparallax: 0.2,
        yparallax: -0.24,
        xorigin: 1,
        yorigin: 0.4
    })
});