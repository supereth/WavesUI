"use strict";

 initApp();

$(document).ready(function(){

    getKeyPair('123');

    // Show/hide different sections on tab activation
    $('input[type=radio]').click(function(){

        $('.mBB-content, .LBmBB-content').fadeOut(200).delay(400);
        $('#' + $(this).val()).fadeIn(800);
        $('#LB' + $(this).val()).fadeIn(800);

        var linkType = $(this).val();

        switch(linkType) {
            case 'mBB-portfolio':
                loadPayment();
            break;
        }
    });

});



function initApp() {
    loadHistory();
    loadBlockheight();
    loadBalance();
}