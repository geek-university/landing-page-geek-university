$(function ($) {
    var $email = $("#subscription_email");
    var $submit = $("#subscribe_button");
    var $thank_you = $("#thank_you");
    var $incorrect_email = $("#incorrect_email");

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

$(function ($) {
    var slideshowSpeed = 3000;

    var images = [
        {
            "alt": "0",
            "src": "/assets/0.jpg"
        },
        {
            "alt": "1",
            "src": "/assets/1.jpg"
        },
        {
            "alt": "2",
            "src": "/assets/2.jpg"
        },
        {
            "alt": "3",
            "src": "/assets/3.jpg"
        },
        {
            "alt": "4",
            "src": "/assets/4.jpg"
        },
        {
            "alt": "5",
            "src": "/assets/5.jpg"
        },
        {
            "alt": "6",
            "src": "/assets/6.jpg"
        }
    ];

    var $slider = $("#slider");

    var currentImageIndex = 0;
    var slideshowNotStartedYet = true;
    var interval;

    function startLoadingImages() {
        for (var i = 0; i < images.length; i++) {
            var imageObject = images[i];
            var imageToLoad = new Image();
            (function (imgObject, index) {
                imageToLoad.onload = function() {
                    var $newImageContainer = $("<li></li>").attr("id", "imageContainer" + index).addClass("inactive").fadeTo(0, 0);
                    var $newImage = $(this).attr("id", "image" + index);
                    $newImageContainer.append($newImage);
                    $slider.append($newImageContainer);

                    if (slideshowNotStartedYet) {
                        slideshowNotStartedYet = false;
                        startSlideshow();
                    }
                }
            }(imageObject, i));
            imageToLoad.alt = imageObject.alt;
            imageToLoad.src = imageObject.src;
        }
    }

    startLoadingImages();

    function startSlideshow() {
        $(".previousActive").removeClass("previousActive").addClass("inactive");
        $(".active").removeClass("active").addClass("previousActive");

        var loadedImages = $slider.children();
        currentImageIndex %= loadedImages.length;

        var newImage = $(loadedImages[currentImageIndex]);
        newImage.removeClass("inactive").addClass("active");
        newImage.fadeTo(0, 0);
        newImage.fadeTo(1000, 1);

        currentImageIndex++;

        setTimeout(startSlideshow, slideshowSpeed);
    }
});