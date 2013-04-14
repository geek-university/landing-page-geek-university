$(function ($) {
    var slideshowSpeed = 3000;

    var images = [
        "/assets/0.jpg",
        "/assets/1.jpg",
        "/assets/2.jpg",
        "/assets/3.jpg",
        "/assets/4.jpg",
        "/assets/5.jpg",
        "/assets/6.jpg",
        "/assets/7.jpg",
        "/assets/8.jpg",
        "/assets/9.jpg",
        "/assets/11.jpg",
        "/assets/12.jpg"
    ];

    var $slider = $("#slider");

    var currentImageIndex = 0;
    var slideshowNotStartedYet = true;

    function startLoadingImages() {
        for (var i = 0; i < images.length; i++) {
            var imageObject = images[i];
            var imageToLoad = new Image();
            (function (imgObject, index) {
                imageToLoad.onload = function () {
                    var $newImageContainer = $("<li></li>").attr("id", "imageContainer" + index).css('background-image', 'url(' + imgObject + ')').addClass("inactive").fadeTo(0, 0);
                    $slider.append($newImageContainer);

                    if (slideshowNotStartedYet) {
                        slideshowNotStartedYet = false;
                        startSlideshow();
                    }
                }
            }(imageObject, i));
            imageToLoad.src = imageObject;
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