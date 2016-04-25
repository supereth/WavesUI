$(window).on("load resize", function(e){
// GUI elements dynamic sizing
	var $wrapH = $('#wrapper').height(),
		$wrapW = $('#wrapper').width(),
		$headerH = $('header').height(),
		$tabsH = $('#tabs').height(),
		$mainBodyH = $wrapH - $headerH - $tabsH,
		$lb = $('#mBLeftBar'),
        $lbW = $('#mBLeftBar').width(),
		$mbBodyH = $('#mainBody').height(),
		$mbBodyW = $wrapW - $lbW;
	$('#mainBody').css('height', $mainBodyH);
	$('#mBLeftBar').css('height', $mainBodyH);
	$('#mBBody').css('width', $mbBodyW);
});

var $wrapW = $('#wrapper').width();
        
// Left bar active on load
$(window).load(function(){
    if ($('input[type=radio][name=tabs-Icons]:checked').val() == 'mBB-wallet' || $('input[type=radio][name=tabs-Icons]:checked').val() == 'mBB-history') {
            $('#mBLeftBar').css('display', 'none');
            $('#mBBody').css('width', $wrapW);
            $('#mBB-wallet').css('text-align', 'center');
    } else {
            $('#mBLeftBar').css('display', 'table-cell');    
    }
});

// Fix for misalignment of some tab contents at resize
$(window).resize(function(){
    if ($('input[type=radio][name=tabs-Icons]:checked').val() == 'mBB-wallet' || $('input[type=radio][name=tabs-Icons]:checked').val() == 'mBB-history') {
            $('#mBBody').css('width', $wrapW);
            $('#mBB-wallet').css('text-align', 'center');
    } else {
            $('#mBLeftBar').css('display', 'table-cell');    
    }
});

$(document).ready(function(){
	// Show/hide different sections on tab activation
    $('input[type=radio]').click(function(){
       // $('.mBB-content, .LBmBB-content').fadeOut(200).delay(500);
        $('#' + $(this).val()).fadeIn(800);
		$('#LB' + $(this).val()).fadeIn(800);
        
        // Displays left bar depending on tab activated
        if ($('input[type=radio][name=tabs-Icons]:checked').val() == 'mBB-wallet' || $('input[type=radio][name=tabs-Icons]:checked').val() == 'mBB-history') {
            $('#mBLeftBar').css('display', 'none');
            $('#mBB-wallet').css('text-align', 'center');
        } else {
            $('#mBLeftBar').css('display', 'table-cell');
        }
	});
});

/* FOR LATER REFINEMENT-
 if ($('input[type=radio][name=tabs-Icons]').val() == 'mBB-wallet' && (window.matchMedia('(max-width: 1024px)')).matches) { };
*/