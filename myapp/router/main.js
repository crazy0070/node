var request = require('request');
var rp = require('request-promise');

var result = 'none';
module.exports =  function(app,fs){
 
	setInterval(resultAPI ,5000); 
	// app.get('/',function(req,res){

		


	// 	res.render('index',{
	// 		title: 'test',
	// 		length:5
	// 	});
	// });


	// app.get('/api/binance',function(req,res){
	// 	var base_url ='https://api.binance.com/api/v1/ticker/24hr?symbol=ETHBTC';
	// 	request(base_url, function (error, response, body) {
	// 	  if(error) console.log('error:', error); // Print the error if one occurred
	// 	  res.json(body);
	// 	});
	// });

	// app.get('/api/upbit',function(req,res){
	// 	var base_url ='https://crix-api-endpoint.upbit.com/v1/crix/candles/minutes/30?code=CRIX.UPBIT.KRW-ETH&count=1&to=';
	// 	request(base_url, function (error, response, body) {
	// 	  if(error) console.log('error:', error); // Print the error if one occurred
	// 	  res.json(body);
	// 	});
	// });

	function resultAPI(){
		result = getTestPrice();
		console.log(result);
	}


	function getTestPrice(){
		result ='none';
		var base_url ='https://api.binance.com/api/v1/ticker/24hr?symbol=ETHBTC';
		var options = {
	    	uri: base_url, 
		    headers: {
		        'User-Agent': 'Request-Promise'
		    },
		    json: true // Automatically parses the JSON string in the response
		};

		rp(options)
		    .then(function (repos) { 
		        
		        result += repos;
		        //console.log(repos);
		    })
		    .catch(function (err) {
		        console.log(err);
		    });


		base_url ='https://crix-api-endpoint.upbit.com/v1/crix/candles/minutes/30?code=CRIX.UPBIT.KRW-ETH&count=1&to=';
		
		options = {
	    	uri: base_url, 
		    headers: {
		        'User-Agent': 'Request-Promise'
		    },
		    json: true // Automatically parses the JSON string in the response
		};

		rp(options)
		    .then(function (repos) { 

		        result += repos;
		        //console.log(repos);
		    })
		    .catch(function (err) {
		        console.log(err);
		    });


		return result;
		// var base_url ='https://api.binance.com/api/v1/ticker/24hr?symbol=ETHBTC';
		// var result ='';
		// request(base_url, function (error, response, body) {
		//   if(error) console.log('error:', error); // Print the error if one occurred
		//   result += body;
		//   console.log('11111-1');
		// });

		// console.log('start...222');
		// base_url ='https://crix-api-endpoint.upbit.com/v1/crix/candles/minutes/30?code=CRIX.UPBIT.KRW-ETH&count=1&to=';
		// request(base_url, function (error, response, body) {
		//   if(error) console.log('error:', error); // Print the error if one occurred
		//   result += body;
		//   console.log('22222-2');
		// });
		// console.log('end...'+result);

		//return result;


	}

	function getVinacePrice(){

		var base_url ='https://api.binance.com/api/v1/ticker/24hr?symbol=ETHBTC';
		request(base_url, function (error, response, body) {
		  if(error) console.log('error:', error); // Print the error if one occurred
		  return body;
		});
	}

	function getUpbitPrice(){

		var base_url ='https://crix-api-endpoint.upbit.com/v1/crix/candles/minutes/30?code=CRIX.UPBIT.KRW-ETH&count=1&to=';
		request(base_url, function (error, response, body) {
		  if(error) console.log('error:', error); // Print the error if one occurred
		  return body;
		});
	}
}