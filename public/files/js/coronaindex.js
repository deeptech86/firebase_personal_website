function updateMap() {
  fetch("https://api.rootnet.in/covid19-in/stats/latest")
    .then((response) => response.json())
    .then((rsp) => {
      console.log(rsp.data.regional);
      var mapboxClient = mapboxSdk({ accessToken: mapboxgl.accessToken });

      var map = new mapboxgl.Map({
        container: "map",
        style: "mapbox://styles/mapbox/streets-v11",
        center: [82.77, 21.129], //This is the coordinates of India to display its map by default
        zoom: 4,
        attributionControl: false,
      });

      //This will render the map of India by default
      map.addControl(new mapboxgl.AttributionControl(), "top-left");

      rsp.data.regional.forEach((element) => {
        let totalConfirmed = element.totalConfirmed;

        let deaths = element.deaths;
        let discharged = element.discharged;
        let statename = element.loc;

        // forwardGeocode
        mapboxClient.geocoding
          .forwardGeocode({
            query: statename,
            autocomplete: false,
            limit: 1,
          })
          .send()
          .then(function (response) {
            if (
              response &&
              response.body &&
              response.body.features &&
              response.body.features.length
            )
              var feature = response.body.features[0];

            var popup = new mapboxgl.Popup({
              offset: 25,
              closeOnClick: false,
            }).setText(`total cases: ${totalConfirmed}`);

            if (totalConfirmed > 300000) {
              color = "rgb(255,0,0)";
            } else {
              color = `rgb(${totalConfirmed / 1000},0,0)`;
            }

            console.log(`${color}`);

            //This adds marker to the map
            new mapboxgl.Marker({ color: color })
              .setLngLat(feature.center)
              .setPopup(popup)
              .addTo(map);
          });
      });
    });
}

updateMap();
// let interval = 20000;
// setInterval(updateMap, interval);
