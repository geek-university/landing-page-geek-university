$(function () {
    var shareLinks = {
        vk: function (url, title, img, text) {
            // max link length 3079
            var link = 'http://vkontakte.ru/share.php?';
            link += 'url=' + encodeURIComponent(url);
            link += '&title=' + encodeURIComponent(title);
            if (text) link += '&description=' + encodeURIComponent(text.slice(0, 537));
            if (img) link += '&image=' + encodeURIComponent(img);
            return link + '&noparse=true';
        },
        fb: function (url, title, img, text) {
            var link = 'http://www.facebook.com/sharer.php?s=100';
            link += '&p[url]=' + encodeURIComponent(url);
            link += '&p[title]=' + encodeURIComponent(title);
            if (img) link += '&p[images][0]=' + encodeURIComponent(img);
            if (text) link += '&p[summary]=' + encodeURIComponent(text);
            return link;
        },
        twitter: function (url, title, img, text) {
            var link = 'http://twitter.com/share?';
            link += 'text=' + encodeURIComponent(title + " - " + text);
            link += '&url=' + encodeURIComponent(url);
            link += '&counturl=' + encodeURIComponent(url);
            return link;
        },
        google: function (url) {
            var link = 'https://plus.google.com/share?';
            link += 'url=' + encodeURIComponent(url);
            return link;
        }
    };


    function init() {
        var $socialWrap = $('.share_links');
        var url = "http://geek-university.org";

        $socialWrap.on('click', 'a', function () {
            var socialName = this.className;

            var shareObj = {
                title: "Geek University",
                img: url + $("#logo").attr("src"),
                desc: "открытый онлайн университет"
            };

            if (shareLinks[socialName]) {
                // Get share link.
                var link = shareLinks[socialName](url, $.trim(shareObj.title), shareObj.img, $.trim(shareObj.desc));
                // Fix VK link length.
                if (socialName === 'vk' && link.length >= 3080) link = shareLinks.vk(url, $.trim(shareObj.title), shareObj.img);

                openNewWindow(link);
            }
            return false;
        });
    }

    // Open new window in center of browser.
    function openNewWindow(url) {
        var width = 600,
            height = 500,
            top = parseInt((window.screenY || window.screenTop || 0) + ((window.outerHeight || $(window).height()) - height) / 2),
            left = parseInt((window.screenX || window.screenLeft || 0) + ((window.outerWidth || $(window).width()) - width) / 2),
            options = [
                'top=' + (top > 0 ? top : 0),
                'left=' + (left > 0 ? left : 0),
                'width=' + width,
                'height=' + height,
                'status=0',
                'toolbar=0'
            ];

        window.open(url, '', options.join(','));
        return false;
    }

    init()
});