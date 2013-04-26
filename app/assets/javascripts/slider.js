$(function ($) {
    var slideshowSpeed = 4500;
    var changeAnimationTime = 600;

    var images = [
        {src: "/assets/0cbgd.jpg", width: 1000, height: 1000, minWidth: 769, maxWidth: Number.POSITIVE_INFINITY},
/*        {src: "/assets/1cbgd.jpg", width: 628, height: 628, minWidth: 321, maxWidth: Number.POSITIVE_INFINITY},*/
        {src: "/assets/2cbgd.jpg", width: 1000, height: 1000, minWidth: 321, maxWidth: Number.POSITIVE_INFINITY},
        {src: "/assets/2sbgd.jpg", width: 1000, height: 1000, minWidth: 0, maxWidth: 320},
        {src: "/assets/3cbgd.jpg", width: 937, height: 937, minWidth: 321, maxWidth: Number.POSITIVE_INFINITY},
        {src: "/assets/4cbgd.jpg", width: 1000, height: 1000, minWidth: 321, maxWidth: Number.POSITIVE_INFINITY},
/*        {src: "/assets/5cbgd.jpg", width: 762, height: 762, minWidth: 0, maxWidth: Number.POSITIVE_INFINITY},*/
        {src: "/assets/6cbgd.jpg", width: 911, height: 911, minWidth: 769, maxWidth: Number.POSITIVE_INFINITY},
        {src: "/assets/7cbgd.jpg", width: 1000, height: 1000, minWidth: 769, maxWidth: Number.POSITIVE_INFINITY},
/*        {src: "/assets/8cbgd.jpg", width: 463, height: 463, minWidth: 0, maxWidth: Number.POSITIVE_INFINITY},*/
        {src: "/assets/9cbgd.jpg", width: 763, height: 763, minWidth: 321, maxWidth: Number.POSITIVE_INFINITY}
    ];

    var width = $("#info_container").width();

    var $slider = $("#slider");

    var currentImageIndex;
    var slideshowNotStartedYet = true;

    function startLoadingImages() {
        for (var i = 0; i < images.length; i++) {
            var imageObject = images[i];
            if (imageObject.minWidth <= width && width <= imageObject.maxWidth) {
                var imageToLoad = new Image();
                (function (imgObject, index) {
                    imageToLoad.onload = function () {
                        var $newImage = $("<img/>").attr("width", imgObject.width).attr("height", imgObject.height).attr("src", imgObject.src).addClass("inactive").transition({opacity: 0}, 0);
                        $slider.append($newImage);

                        if (slideshowNotStartedYet) {
                            slideshowNotStartedYet = false;
                            startSlideshow();
                        }
                    }
                }(imageObject, i));
                imageToLoad.src = imageObject.src;
            }
        }
    }

    startLoadingImages();

    function startSlideshow() {
        var loadedImages = $slider.children();
        if (loadedImages.length != 1 || !currentImageIndex) {
            if (!currentImageIndex) {
                currentImageIndex = 0;
            }
            $(".previousActive").removeClass("previousActive").addClass("inactive");
            $(".active").removeClass("active").addClass("previousActive");

            currentImageIndex %= loadedImages.length;

            var newImage = $(loadedImages[currentImageIndex]);
            newImage.removeClass("inactive").addClass("active");
            newImage.transition({opacity: 0}, 0);
            newImage.transition({opacity: 1}, changeAnimationTime);

            currentImageIndex++;
        }

        setTimeout(startSlideshow, slideshowSpeed);
    }
});