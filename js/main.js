"use strict";

 initApp();

$(document).ready(function(){

    // Show/hide different sections on tab activation
    $('input[type=radio]').click(function(){

        $('.mBB-content, .LBmBB-content').fadeOut(200);
        $('#' + $(this).val()).fadeIn(800);
        $('#LB' + $(this).val()).fadeIn(800);

        var linkType = $(this).val();

        switch(linkType) {
            case 'mBB-portfolio':
                loadPayment();
            break;
        }
        
        // Displays left bar depending on tab activated
        if ($('input[type=radio][name=tabs-Icons]:checked').val() == 'mBB-wallet' || $('input[type=radio][name=tabs-Icons]:checked').val() == 'mBB-history') {
            $('#mBLeftBar').css('display', 'none');
            $('#mBB-wallet').css('text-align', 'center');
        } else {
            $('#mBLeftBar').css('display', 'table-cell');
        }
    });

});



function initApp() {
    loadHistory();
    loadBlockheight();
    loadBalance();
}