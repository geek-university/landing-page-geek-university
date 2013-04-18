$(function ($) {
    var $email = $("#subscription_email");
    var $submit = $("#subscribe_button");
    var $message = $("#message");

    $message.css("opacity", 0);

    function isCorrectEmail(email) {
        var re = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+(?:[A-Z]{2}|com|org|net|edu|gov|mil|biz|info|mobi|name|aero|asia|jobs|museum)\b/;
        return re.test(email);
    }

    $submit.click(function () {
        $submit.attr('disabled', 'disabled');
        if (isCorrectEmail($email.val())) {
            $.post('/subscriptions', {"subscription[email]": $email.val()}, function (response) {
                $message.text("На указанную почту было отправлено письмо");
                $message.css("backgroundColor", "green");
                $message.fadeIn();
                $email.val('');
                setTimeout(function () {
                    $message.fadeOut();
                    $submit.removeAttr('disabled');
                }, 3000);
            });
        } else {
            $message.text("Email введён неверно");
            $message.css("backgroundColor", "red");
            $message.css("visibility", "visible").animate({opacity : 1});
            setTimeout(function () {
                $message.animate({opacity : 0}, function() {
                    this.css("visibility", "hidden");
                });
                $submit.removeAttr('disabled');
            }, 3000);
        }
        return false;
    });
});