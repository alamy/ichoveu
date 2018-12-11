var map;
function initMap() {
	setTimeout(function(){
		console.log(document.getElementById('map'));
		map = new google.maps.Map(document.getElementById('map'), {
			center: {lat: -8.0578380, lng: -34.8828970},
			zoom: 11,
		});
		setTimeout(function(){
			$.ajax(
			{
				url: "overflow_json.php",
				dataType: 'JSON',
				crossDomain: true,
				success: function(data,text,xhr)
				{
					$.each(data.Sensor, function( index, value ) {
						      // sensores 11,12,13\
						      if (value.Codigo == '11' || value.Codigo == '12' || value.Codigo == '13') {
						      	if (value.Valor > '10') {
						      		var contentString = "<div class='infobox_title'><span>"+ 'Ponto de alagamento' +"</span></div>";
						      		var infowindow = new google.maps.InfoWindow({
						      			content: contentString,
						      		});

						      		var geoloc = value.Localizacao.split(',');
						      		var latlng = new google.maps.LatLng(geoloc[0], geoloc[1]);
						      		var marker = new google.maps.Marker({
						      			position: latlng,
						      			map: map,
						      		});

						      		infowindow.open(map, marker);
						      		marker.addListener('click', function() {
						      			infowindow.open(map, marker);
						      		});

						      	}
						        // console.log(value.Codigo, value.Valor, value.Localizacao, value.Descricao);
						    };
						});
					},
					error: function()
					{
					}
				});

					google.maps.event.addListenerOnce(map, 'idle', function() {
						google.maps.event.trigger(map, 'resize');
						map.setCenter(new google.maps.LatLng(-8.0578380, -34.8828970));
					});
				}, 3000);
			}, 2000);
		}

