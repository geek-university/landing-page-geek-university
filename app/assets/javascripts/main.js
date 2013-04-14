$(function ($) {
    var $email = $("#subscription_email");
    var $submit = $("subscribe_button");
    var $thank_you = $("#thank_you");
    var $incorrect_email = $("#incorrect-email");

    function isCorrectEmail(email) {
        var re = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+(?:[A-Z]{2}|com|org|net|edu|gov|mil|biz|info|mobi|name|aero|asia|jobs|museum)\b/;
        return re.test(email);
    }

    $submit.click(function () {
        if (isCorrectEmail($email.val())) {
            $.post('/subscriptions', {"subscription[email]": $email.val()}, function (response) {
                $thank_you.fadeIn();
                $email.val('');
                setTimeout(function () {
                    $thank_you.fadeOut();
                }, 3000);
            });
        } else {
            $incorrect_email.fadeIn();
            setTimeout(function () {
                $incorrect_email.fadeOut();
            }, 3000);
        }
        return false;
    });
});