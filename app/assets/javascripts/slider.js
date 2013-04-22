$(function ($) {
    var slideshowSpeed = 4500;

    var images = [
        {src: "/assets/0c.jpg", width: 1000, height: 1000},
        {src: "/assets/1c.jpg", width: 628, height: 628},
        {src: "/assets/2c.jpg", width: 1000, height: 1000},
        {src: "/assets/3c.jpg", width: 937, height: 937},
        {src: "/assets/4c.jpg", width: 1000, height: 1000},
/*        {src: "/assets/5c.jpg", width: 762, height: 762},*/
        {src: "/assets/6c.jpg", width: 911, height: 911},
        {src: "/assets/7c.jpg", width: 1000, height: 1000},
/*        {src: "/assets/8c.jpg", width: 463, height: 463},*/
        {src: "/assets/9c.jpg", width: 763, height: 763},
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

    startLoadingImages();

    function startSlideshow() {
        $(".previousActive").removeClass("previousActive").addClass("inactive");
        $(".active").removeClass("active").addClass("previousActive");

        var loadedImages = $slider.children();
        currentImageIndex %= loadedImages.length;

        var newImage = $(loadedImages[currentImageIndex]);
        newImage.removeClass("inactive").addClass("active");
        newImage.transition({opacity: 0}, 0);
        newImage.transition({opacity: 1}, 1000);

        currentImageIndex++;

        setTimeout(startSlideshow, slideshowSpeed);
    }
});