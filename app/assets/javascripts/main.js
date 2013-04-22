$(function ($) {
    var $email = $("#subscription_email");
    var $submit = $("#subscribe_button");
    var $message = $("#message");

    $message.css("opacity", 0);

    function isCorrectEmail(email) {
        var re = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+(?:[A-Z]{2}|com|org|net|edu|gov|mil|biz|info|mobi|name|aero|asia|jobs|museum)\b/i;
        return re.test(email);
    }

    $submit.click(function () {
        $submit.attr('disabled', 'disabled');
        if (isCorrectEmail($email.val())) {
            $.post('/subscriptions', {"subscription[email]": $email.val()}, function (response) {
                $message.text("На указанную почту было отправлено письмо");
                $message.css("backgroundColor", "green");
                $message.css("visibility", "visible").transition({opacity : 1}, 200);
                $email.val('');
                setTimeout(function () {
                    $message.transition({opacity : 0}, 200, function() {
                        $message.css("visibility", "hidden");
                        $submit.removeAttr('disabled');
                    });
                }, 3000);
            });
        } else {
            $message.text("Email введён неверно");
            $message.css("backgroundColor", "red");
            $message.css("visibility", "visible").transition({opacity : 1}, 200);
            setTimeout(function () {
                $message.transition({opacity : 0}, 200, function() {
                    $message.css("visibility", "hidden");
                    $submit.removeAttr('disabled');
                });
            }, 3000);
        }
        return false;
    });

    $('input').placeholder();
});