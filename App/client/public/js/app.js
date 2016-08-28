$(window).load( function() {
    if ( $('.currency').length ) {
        var currentCurrency = $('.currency').val().toUpperCase();
        var currentPrice = $('.price-val').text();

        $('.currency').change( function() {
            var nextCurrency = $(this).val().toUpperCase();
            updateProductPrice(nextCurrency, currentCurrency, currentPrice).then( function(response) {
                $('.price-val').text(response);
            }).catch( function(err) {
                console.log(err);
            })
        });
    } 
});

function updateProductPrice(nextCurrency, currentCurrency, currentPrice) {
    return new Promise ( function(resolve, reject) {
        var data = {nextCurrency: nextCurrency, currentCurrency: currentCurrency, currentPrice:currentPrice};
        $.ajax({
            method: 'POST',
            url: '/api/soap',
            data: data
        }).done( function(response) {
            resolve(response);
        }).fail( function(err) {
            reject(err);
        });
    });
}