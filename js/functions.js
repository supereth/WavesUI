"use strict";

var server = 'http://52.58.115.4:6869';

var balance = 0;


function loadBlockheight() {


	$.getJSON(server+'/blocks/height', function(result) {

		$("#blockheight").html('Block Height: '+result.height);

	});

}


function loadBalance () {


	$.getJSON(server+'/addresses/', function(response) {

		balance = 0;

		var account = 0;

		$.each(response, function(key, value) {

			$.each(value, function(innerkey, innervalue) {

				$.getJSON(server+'/addresses/balance/'+innervalue, function(balanceResult) {

					balance = balance + balanceResult.balance;

					$("#wavesbalance").html(balance)

					$("#balancespan").html(balance +' Waves');

					$('.balancewaves').html(balance + ' Waves');

					if(typeof(Storage) !== "undefined") {

						var storageKey = 'waves-'+innervalue;
					    
						localStorage.innervalue = balanceResult.balance;

					} else {
					    // Sorry! No Web Storage support.. Let's not save it
					}

				});

				account++;

			});

		});
	});


}

function loadHistory() {

	var signatures = [];
	var appContainer;

	$.getJSON(server+'/addresses/', function(response) {

		balance = 0;

		$.each(response, function(key, value) {

			$.each(value, function(innerkey, innervalue) {

				$.getJSON(server+'/transactions/address/'+innervalue, function(transactionHistory) {

					

					$.each(transactionHistory[0], function(historyKey, historyValue) {

						

						if(historyValue.timestamp > 0) {

							if(signatures.indexOf(historyValue.signature) < 0) {

								signatures.push(historyValue.signature);

								appContainer += '<tr>';
								appContainer += '<td>'+historyValue.timestamp+'</td>';
								appContainer += '<td>'+historyValue.type+'</td>';
								appContainer += '<td>'+historyValue.sender+'</td>';
								appContainer += '<td>'+historyValue.recipient+'</td>';
								appContainer += '<td>'+historyValue.fee+'</td>';
								appContainer += '<td>'+historyValue.amount+' Waves</td>';

								appContainer += '</tr>';

							}
							
							
							
						}


					});

					

				});

			});


		});

		
	});


	

	setTimeout(function() {

		$("#transactionhistory").html(appContainer);

	}, 1000);






}



function loadAccount() {


	var appContainer;
	var welcomeJumbo = '<h2>Your Balance</h2>';

	appContainer = welcomeJumbo;	

	appContainer = '<div class="row"><div class="col-md-12"><h2>Balance: <span class="balancewaves"></span></div></div>';

	$.getJSON(server+'/addresses/', function(response) {

		appContainer += '<div class="container"><h2>Your Wallet</h2>';

		appContainer += '<table class="table table-striped">';
		appContainer += '<thead><tr><th>Key</th><th>Value</th></tr></thead>';
		appContainer += '<tbody>';

		$.each(response, function(key, value) {

			$.each(value, function(innerkey, innervalue) {

				appContainer += '<tr><td>';
				appContainer += innerkey;
				appContainer += '</td><td>';
				appContainer += innervalue;
				appContainer += '</td></tr>';

			});

			

		});

		appContainer += '<tbody>';




		appContainer += '</div>';

		appContainer += '<button class="btn btn-primary" id="newAddress">New Address</button>';

		
		$("#app").html(appContainer);
		$('.balancewaves').html($("#balancespan").html());

		$("#newAddress").on("click", function() {

			$.post(server+'/addresses/', function(createAddress) {

				$(".wavesNavbar").removeClass('active');

				$("#walletpage").addClass('active');

				loadWallet();

			});

		});


	});



}

function loadWallet() {

	var appContainer;

	$.getJSON(server+'/addresses/', function(response) {

		appContainer += '<h2>Your Wallet</h2><div class="wavesTable">';

		appContainer += '<table>';
		appContainer += '<thead><tr><th>Key</th><th>Value</th></tr></thead>';
		appContainer += '<tbody>';

		$.each(response, function(key, value) {

			$.each(value, function(innerkey, innervalue) {

				appContainer += '<tr><td>';
				appContainer += innerkey;
				appContainer += '</td><td>';
				appContainer += innervalue;
				appContainer += '</td></tr>';

			});

			

		});

		appContainer += '<tbody>';

		appContainer += '</div>';

		appContainer += '<button class="btn btn-primary" id="newAddress">New Address</button>';

		
		$("#walletContainer").html(appContainer);

		$("#newAddress").on("click", function() {

			$.post(server+'/addresses/', function(createAddress) {

				loadWallet();

			});

		});


	});

}

function loadPeers() {

	var appContainer;
	var welcomeJumbo = '<div class="jumbotron"><h2>All Waves Peers</h2></div>';

	appContainer = welcomeJumbo;

	$.getJSON(server+'/peers/all', function(response) {

		appContainer += '<div class="container"><h2>Your peers</h2><button class="btn btn-primary" id="updatePeers">Update</button>';

		appContainer += '<table class="table table-striped">';
		appContainer += '<thead><tr><th>Key</th><th>Value</th></tr></thead>';
		appContainer += '<tbody>';

		$.each(response, function(key, value) {

			$.each(value, function(innerkey, innervalue) {

				appContainer += '<tr><td>';
				appContainer += innerkey;
				appContainer += '</td><td>';
				appContainer += innervalue.address;
				appContainer += '</td></tr>';

			});

			

		});

		appContainer += '<tbody>';

		appContainer += '</div>';
		
		$("#app").html(appContainer);

		$("#updatePeers").on("click", function() {
			loadPeers();
		});


	});


}

function createTransactionTable (valueValue) {

	var appContainer;

	$.each(valueValue, function(transactionKey, transactionValue) {


		appContainer += '<table class="table"></table>';

		appContainer += '<thead><tr><th>Type</th><th>Fee</th><th>Timestamp</th><th>Amount</th><th>Sender</th><th>Recipient</th></tr></thead>';

		appContainer += '<tbody><tr><td>'+transactionValue.type+'</td><td>'+transactionValue.fee+'</td><td>'+transactionValue.timestamp+'</td><td>'+transactionValue.amount+'</td><td>'+transactionValue.sender+'</td><td>'+transactionValue.recipient+'</td></tr></tbody>';

		appContainer += '</table>';

		return appContainer;



	});

}

function loadBlock() {


	var appContainer;
	var welcomeJumbo = '<div class="jumbotron"><h2>Welcome to Waves Demo Platform</h2></div>';

	appContainer = welcomeJumbo;

	$.getJSON(server+'/blocks/last', function(response) {

		appContainer += '<div class="container"><h2>Latest Block</h2><button class="btn btn-primary" id="updateBlock">Update</button>';

		appContainer += '<table class="table table-striped">';
		appContainer += '<thead><tr><th>Key</th><th>Value</th></tr></thead>';
		appContainer += '<tbody>';

		$.each(response, function(key, value) {

		
				appContainer += '<tr><td>';
				appContainer += key;
				appContainer += '</td><td>';
				appContainer += value;
				appContainer += '</td></tr>';


		});

		appContainer += '</tbody>';

		appContainer += '</div>';
		
		$("#app").html(appContainer);
		
		$("#updateBlock").on("click", function() {
			loadBlock();
		});


	});


}


function loadConsensus() {


	var appContainer;
	var welcomeJumbo = '<div class="jumbotron"><h2>Waves Consensus</h2></div>';

	appContainer = welcomeJumbo;

	$.getJSON(server+'/consensus/algo', function(response) {

		appContainer += '<div class="container"><h2>Consensus Type</h2>';

		appContainer += '<table class="table table-striped">';
		appContainer += '<thead><tr><th>Key</th><th>Value</th></tr></thead>';
		appContainer += '<tbody>';

		$.each(response, function(key, value) {

			appContainer += '<tr><td>';
			appContainer += key;
			appContainer += '</td><td>';
			appContainer += value;
			appContainer += '</td></tr>';

		});

		appContainer += '</tbody>';
		appContainer += '</table>';

		
		appContainer += '<h2>Current Target</h2><button class="btn btn-primary" id="updateTarget">Update</button>';


		appContainer += '<table class="table table-striped">';
		appContainer += '<thead><tr><th>Key</th><th>Value</th></tr></thead>';
		appContainer += '<tbody>';

		$.getJSON(server+'/consensus/basetarget', function (response_target) {


			$.each(response_target, function(key, value) {

				appContainer += '<tr><td>';
				appContainer += key;
				appContainer += '</td><td>';
				appContainer += value;
				appContainer += '</td></tr>';

			});

			appContainer += '</tbody>';
			appContainer += '</table>';

			appContainer += '</div>';

			$("#app").html(appContainer);

			$("#updateTarget").on("click", function() {
				loadConsensus();
			});



		});
		


	});

}



function loadPayment () {

	var	paymentForm = '<div id="wallet_accounts"><h2>Your Wallet</h2> <button class="btn btn-primary" id="newAddress">New Address</button></div>';
		paymentForm += '<div id="accounts_sender" class="wavesTable"><table><thead><tr><th>Address</th><th>Balance</th></thead><tbody id="accounts_table"></tbody></table></div><hr/>';
		paymentForm += '</div>';

		paymentForm += '<h2>Send Payment</h2><form id="paymentForm" style="height: 150px;">'+
						'<div class="form-group">'+
						  '  <label for="sender">Sender (choose from Your Accounts)</label>'+
						  '  <input type="text" class="form-control" id="sender" placeholder="Sender">'+
						  '</div>'+
						 '<div class="form-group">'+
						  '  <label for="recipient">Recipient</label>'+
						  '  <input type="text" class="form-control" id="recipient" placeholder="Recipient">'+
						  '</div>'+
						  '<div class="form-group">'+
						  ' <label for="sendamount">Amount</label>'+
						  '  <input type="number" class="form-control" id="sendamount" placeholder="Amount" min="0">'+
						  '</div>'+
						  '<p>Fee 1 Waves</p>'+
						  '<hr>'+
						  '<button class="btn btn-default" id="sendpayment">Submit</button>'+
						'</form>'+
						'<div class="alert alert-primary" id="payment_response"></div>';


		paymentForm += '</div>';


	$("#portfolio").html(paymentForm);


	$.getJSON(server+'/addresses/', function(response) {

		balance = 0;

		$.each(response, function(key, value) {

			$.each(value, function(innerkey, innervalue) {

				$.getJSON(server+'/addresses/balance/'+innervalue, function(balanceResult) {


					$("#accounts_table").append('<tr><td>'+innervalue +'</td><td>'+balanceResult.balance+' Waves</td></tr>');

				});

			});
		});
	});


	$("#sendpayment").on("click", function(e) {

		e.preventDefault();

		var amount = $("#sendamount").val();
		var recipient = $("#recipient").val();
		var sender = $("#sender").val();

		$("#sendpayment").on("click", function() {


			if(amount > 0) {

				if(recipient > '') {

					var number = Number(amount);

					$.ajax({
						url: server+'/payment',
					    data: JSON.stringify({
							"amount": number,
							"fee": 1,
							"sender": sender,
							"recipient": recipient
						}),
					    type: "POST",
					    success: function(successrequest){
				

					        $("#sendamount").val('');
					        $("#recipient").val('');
					        $("#sender").val('');

					        var messageTable = '<div class="wavesTable">'+
					        						'<table>'+
					        						'	<thead>'+
					        						'		<tr>'+
						        					'			<th>Key</th>'+
						        					'			<th>Value</th>'+
					        						'		</tr>'+
				        							'	</thead>'+
			        								'	<tbody>'+
			        								'		<tr>'+
						        					'			<th>Timestamp</th>'+
						        					'			<td>'+successrequest.timestamp+'</td>'+
					        						'		</tr>'+
					        						'		<tr>'+
						        					'			<th>Sender</th>'+
						        					'			<td>'+successrequest.sender+'</td>'+
					        						'		</tr>'+
					        						'		<tr>'+
						        					'			<th>Recipient</th>'+
						        					'			<td>'+successrequest.recipient+'</td>'+
					        						'		</tr>'+
					        						'		<tr>'+
						        					'			<th>Amount</th>'+
						        					'			<td>'+successrequest.amount+' Waves</td>'+
						        					'		</tr>'+
						        					'		<tr>'+
						        					'			<th>Fee</th>'+
						        					'			<td>'+successrequest.fee+' Waves</td>'+
						        					'		</tr>'+
						        					'		<tr>'+
						        					'			<th>Signature</th>'+
						        					'			<td>'+successrequest.signature+'</td>'+
						        					'		</tr>'+
			        								'	</tbody>'+
		        									'</table>'+
	        									'</div>';

					        $("#payment_response").html('<h3>Sending successfull</h3>'+messageTable);

					    },
					    error: function(response){
					        $("#payment_response").html(response.message);
					        console.log(response);
					    }
					});

					

				} else {
					alert ('Please insert a recipient');
				}

			} else {
				alert ('Please insert an amount higher than 0');
			}

		});


	});


	$("#newAddress").on("click", function() {

		$.post(server+'/addresses/', function(createAddress) {

			console.log(createAddress);

			$("#accounts_table").append('<tr><td>'+createAddress.address +'</td><td>0 Waves</td></tr>');


		});

	});


}

function loadDebug () {

	var debugPage = '<div class="container">'+
	'<div class="row"><h2>Settings File</h2>';

	debugPage += '<table class="table table-striped">';
	debugPage += '<thead><tr><th>Key</th><th>Value</th></tr></thead>';
	debugPage += '<tbody>';

	$.getJSON(server+'/debug/settings', function (response) {

		$.each(response, function(key, value) {

			debugPage += '<tr><td>';
			debugPage += key;
			debugPage += '</td><td>';
			debugPage += value;
			debugPage += '</td></tr>';

		});

		debugPage += '</tbody>';
		debugPage += '</table>';

		debugPage += '<h2>Info</h2>';

		debugPage += '<table class="table table-striped">';
		debugPage += '<thead><tr><th>Key</th><th>Value</th></tr></thead>';
		debugPage += '<tbody>';

		$.getJSON(server+'/debug/info', function (response_info) {

			$.each(response_info, function(key, value) {

				debugPage += '<tr><td>';
				debugPage += key;
				debugPage += '</td><td>';
				debugPage += value;
				debugPage += '</td></tr>';

			});


			debugPage += '</tbody>';
			debugPage += '</table>';


			$("#app").html(debugPage);

		});

	});


}