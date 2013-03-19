$(function() {
    $('#new_subscription')
        .bind('ajax:success', function(e, data, status, xhr) {
            $('#thank-you-div').html(data);
            $('#subscription_email').val("");
        })
        .bind('ajax:error', function(e, xhr, status, error) {
            console.log("error json: " + xhr.responseText);
        });
});