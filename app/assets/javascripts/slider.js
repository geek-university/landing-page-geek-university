$(function ($) {
    var slideshowSpeed = 3000;

    var images = [
        "/assets/0c.jpg",
        "/assets/1c.jpg",
        "/assets/2c.jpg",
        "/assets/3c.jpg",
        "/assets/4c.jpg",
        "/assets/5c.jpg",
        "/assets/6c.jpg",
        "/assets/7c.jpg",
        "/assets/10c.jpg",
        "/assets/11c.jpg"
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
                    var $newImage = $("<img/>").attr("id", "image" + index).attr("src", imgObject).addClass("inactive").fadeTo(0, 0);
                    $slider.append($newImage);

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