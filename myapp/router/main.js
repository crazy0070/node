var request = require('request');
var rp = require('request-promise');
 
var upbitResult = new Array(); 
var binaceResult = new Array();  



var binaceCoinList = ['EOSBTC','TRXBTC','BTCBTC','ADABTC','STEEMBTC','GTOBTC','STORMBTC','XRPBTC',
'ICXBTC','ETHBTC','QTUMBTC','BCCBTC','SNTBTC','XLMBTC','NEOBTC','GRSBTC','GNTBTC',
'XMRBTC','WAVESBTC','ETCBTC','OMGBTC','XEMBTC','BTGBTC','MCOBTC','STORJBTC','POWRBTC',
'LTCBTC','LSKBTC','KMDBTC','STRATBTC','PIVXBTC','ARKBTC','MTLBTC','DASHBTC','ZECBTC'];

var upbitCoinList = ['KRW-EOS','KRW-TRX','KRW-BTC','KRW-ADA','KRW-STEEM','KRW-GTO','KRW-STORM','KRW-XRP',
'KRW-ICX','KRW-ETH','KRW-QTUM','KRW-BCC','KRW-SNT','KRW-XLM','KRW-NEO','KRW-GRS','KRW-GNT',
'KRW-XMR','KRW-WAVES','KRW-ETC','KRW-OMG','KRW-XEM','KRW-BTG','KRW-MCO','KRW-STORJ','KRW-POWR',
'KRW-LTC','KRW-LSK','KRW-KMD','KRW-STRAT','KRW-PIVX','KRW-ARK','KRW-MTL','KRW-DASH','KRW-ZEC'];
 
var coin = {}; 
var coin = {}; 
//obj.key3 = "value3";
//console.log( ' coin **********************' + Object.keys(coin).length);
//  https://quotation-api-cdn.dunamu.com/v1/forex/recent?codes=FRX.KRWUSD

module.exports =  function(app,fs,coin){
 	

	setInterval(getTestPrice ,3000);   

	function getTestPrice(){ 
		var base_url; 

		base_url ='https://quotation-api-cdn.dunamu.com/v1/forex/recent?codes=FRX.KRWUSD'; 
		var options = {
	    	uri: base_url, 
		    headers: {
		        'User-Agent': 'Request-Promise'
		    },
		    json: true // Automatically parses the JSON string in the response
		};

		rp(options)
	    .then(function (repos) {  
	    	console.log(repos[0].basePrice);
	    	coin['KRWUSD'] = repos[0].basePrice;    
	    })
	    .catch(function (err) {
	    //    console.log(err);
	    });
		console.log('KRWUSD' +' >>> '+coin['KRWUSD']); 
		console.log('');  

		for(var idx=0;idx<binaceCoinList.length;idx++){  
			base_url ='https://api.binance.com/api/v3/ticker/price?symbol='+binaceCoinList[idx];
			//console.log('base_url >>>>>>>>>>>>>>>>>>>>>>>>>>>>>'+base_url); 
			var options = {
		    	uri: base_url, 
			    headers: {
			        'User-Agent': 'Request-Promise'
			    },
			    json: true // Automatically parses the JSON string in the response
			};

			rp(options)
		    .then(function (repos) {  
		    	coin[repos.symbol] = repos.price; 
		    })
		    .catch(function (err) {
		    //    console.log(err);
		    });

		 console.log(binaceCoinList[idx] +' >>> '+coin[binaceCoinList[idx]]);   
 
		}

		console.log('');  

		for(var idx=0;idx<upbitCoinList.length;idx++){   

		    base_url ='https://crix-api-endpoint.upbit.com/v1/crix/candles/minutes/30?code=CRIX.UPBIT.'+upbitCoinList[idx]+'&count=1&to='; 
			options = {
		    	uri: base_url, 
			    headers: {
			        'User-Agent': 'Request-Promise'
			    },
			    json: true // Automatically parses the JSON string in the response
			};

			rp(options)
		    .then(function (repos) {    
		        var symbol = repos[0].code.substr(repos[0].code.lastIndexOf('.')+1); 
		        coin[symbol] = repos[0].tradePrice; 
		    })
		    .catch(function (err) {
		     //   console.log(err);
		    });  

		console.log(upbitCoinList[idx] +' >>> '+coin[upbitCoinList[idx]]);  
		
		}

		console.log('');  

		app.get('/',function(req,res){
			res.send(coin);
		});
   
	}  
}