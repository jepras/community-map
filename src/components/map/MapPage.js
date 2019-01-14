import React, { Component } from "react";
import scriptLoader from "react-async-script-loader";
import TextField from "@material-ui/core/TextField";

class Map extends Component {
  constructor() {
    super();
    this.state = {
      zoom: 13,
      maptype: "roadmap",
      place_formatted: "",
      place_id: "",
      place_location: ""
    };
  }

  componentWillReceiveProps({ isScriptLoadSucceed }) {
    if (isScriptLoadSucceed) {
      var markers = [];

      var map = new window.google.maps.Map(document.getElementById("map"), {
        zoom: 12,
        center: { lat: 37.77493, lng: -122.41942 },
        mapTypeId: "roadmap"
      });

      // Create the search box and link it to the UI element.
      var input = document.getElementById("custom-css-outlined-input");
      var searchBox = new window.google.maps.places.SearchBox(input);

      // Bias the SearchBox results towards current map's viewport.
      map.addListener("bounds_changed", () => {
        searchBox.setBounds(map.getBounds());
      });

      // Listen for the event fired when the user selects a prediction and retrieve
      // more details for that place.
      searchBox.addListener("places_changed", () => {
        var places = searchBox.getPlaces();

        if (places.length === 0) {
          return;
        }

        // Clear out the old markers.
        markers.forEach(marker => {
          marker.setMap(null);
        });
        markers = [];

        // For each place, get the icon, name and location.
        var bounds = new window.google.maps.LatLngBounds();
        places.forEach(place => {
          let location = place.geometry.location;

          if (!place.geometry) {
            return;
          }
          var icon = {
            url: place.icon,
            size: new window.google.maps.Size(71, 71),
            origin: new window.google.maps.Point(0, 0),
            anchor: new window.google.maps.Point(17, 34),
            scaledSize: new window.google.maps.Size(25, 25)
          };

          // Create a marker for each place.
          markers.push(
            new window.google.maps.Marker({
              map: map,
              icon: icon,
              title: place.name,
              position: place.geometry.location
            })
          );

          if (place.geometry.viewport) {
            // Only geocodes have viewport.
            bounds.union(place.geometry.viewport);
          } else {
            bounds.extend(place.geometry.location);
          }

          this.setState({
            place_formatted: place.formatted_address,
            place_id: place.place_id,
            place_location: location.toString()
          });
        });
        map.fitBounds(bounds);
      });
    } else {
      alert("script not loaded");
    }
  }

  render() {
    console.log("props: ", this.props);
    console.log("state: ", this.state);
    console.log("zoom: ");

    return (
      <div style={{ width: "100%", height: "100%" }}>
        <div id="map" style={{ height: "100%", width: "100%" }} />
        <TextField
          label="Search for your city"
          variant="outlined"
          id="custom-css-outlined-input"
          style={{
            position: "absolute",
            top: "100px",
            left: "400px",
            background: "#fff",
            borderRadius: "5px"
          }}
        />
      </div>
    );
  }
}

export default scriptLoader([
  "https://maps.googleapis.com/maps/api/js?key=AIzaSyDM3X27Q1xyPBcudCNFATY9r5bZ6gUXhh0&libraries=places"
])(Map);
