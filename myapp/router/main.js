var request = require('request');
var rp = require('request-promise');
 
var upbitResult = new Array(); 
var binaceResult = new Array();  



var binaceCoinList = ['EOSBTC','TRXBTC','BTCBTC','ADABTC','STEEMBTC','GTOBTC','STORMBTC','XRPBTC',
'ICXBTC','ETHBTC','QTUMBTC','BCCBTC','SNTBTC','XLMBTC','NEOBTC','GRSBTC','GNTBTC',
'XMRBTC','WAVESBTC','ETCBTC','OMGBTC','XEMBTC','BTGBTC','MCOBTC','STORJBTC','POWRBTC',
'LTCBTC','LSKBTC','KMDBTC','STRATBTC','PIVXBTC','ARKBTC','MTLBTC','DASHBTC','ZECBTC','BTCUSDT'];

var upbitCoinList = ['KRW-EOS','KRW-TRX','KRW-BTC','KRW-ADA','KRW-STEEM','KRW-GTO','KRW-STORM','KRW-XRP',
'KRW-ICX','KRW-ETH','KRW-QTUM','KRW-BCC','KRW-SNT','KRW-XLM','KRW-NEO','KRW-GRS','KRW-GNT',
'KRW-XMR','KRW-WAVES','KRW-ETC','KRW-OMG','KRW-XEM','KRW-BTG','KRW-MCO','KRW-STORJ','KRW-POWR',
'KRW-LTC','KRW-LSK','KRW-KMD','KRW-STRAT','KRW-PIVX','KRW-ARK','KRW-MTL','KRW-DASH','KRW-ZEC'];
 
var coin = {}; 
var result ={};
/*var result ={ 'symbol': '',
			   'list' :[ 'krw' ,'usd', 'btc', 'krwusd','premium']			   
			}; */
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
	    	coin['KRWUSD'] = repos[0].basePrice;    
	    })
	    .catch(function (err) {
	    //    console.log(err);
	    });

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

		 //console.log(binaceCoinList[idx] +' >>> '+coin[binaceCoinList[idx]]);   
 
		}

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

		//console.log(upbitCoinList[idx] +' >>> '+coin[upbitCoinList[idx]]);  
		
		}
		console.log('');  
		
		for(var b=0;b<upbitCoinList.length;b++){
			 var code = upbitCoinList[b].substr(upbitCoinList[b].lastIndexOf('-')+1);
			 var list ={};
			 var KRW = coin['KRW-'+code]; //업비트 원화
			 var BTC = coin[code+'BTC']; //바이낸스 BTC			 
			 var USD = (BTC * coin['BTCUSDT']).toFixed(2); //바이낸스 달라
			 var KRWUSD = Math.round(BTC * coin['BTCUSDT'] * coin['KRWUSD']); // 바이낸스 원화
			 var PREMIUM = 0;

			 list['KRW']=KRW; //업비트 원화
			 list['USD']=USD; //바이낸스 달라
			 list['BTC']=BTC; //바이낸스 BTC
			 list['KRWUSD']= KRWUSD; // 바이낸스 원화
			 list['PREMIUM']= KRW - KRWUSD +' ('+ (((KRW - KRWUSD)/KRWUSD) * 100).toFixed(2)+'%)'; // 프리미엄 
			 result[code] = list;
		}
		console.log(result);  
		app.get('/',function(req,res){
			res.send(result);
		});
   		

	} 


}