
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
        },
        {
            "alt": "7",
            "src": "/assets/7.jpg"
        },
        {
            "alt": "8",
            "src": "/assets/8.jpg"
        },
        {
            "alt": "9",
            "src": "/assets/9.jpg"
        },
        {
            "alt": "10",
            "src": "/assets/10.jpg"
        },
        {
            "alt": "11",
            "src": "/assets/11.jpg"
        },
        {
            "alt": "12",
            "src": "/assets/12.jpg"
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
                    var $newImageContainer = $("<li></li>").attr("id", "imageContainer" + index).css('background-image', 'url('+imgObject.src+')').addClass("inactive").fadeTo(0, 0);
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