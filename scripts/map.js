// Dialog Modal
// https://developer.mozilla.org/en-US/docs/Web/HTML/Element/dialog
// Could be useful for modal search function

const cancelButton = document.getElementById("cancel");
const dialog = document.getElementById("introMessage");

function openCheck(dialog) {
    if (dialog.open) {
        console.log("Dialog open");
    } else {
        console.log("Dialog closed");
    }
}

dialog.showModal();

// Form cancel button closes the dialog box
cancelButton.addEventListener("click", () => {
    dialog.close("animalNotChosen");
    openCheck(dialog);
});





//Map Stuff
import { geojsonFeatures } from "./geojson.js";

var map = L.map('map').setView([53.436992, -1.869135], 6);
L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(map);

/*Legend specific*/
var legend = L.control({ position: "bottomleft" });

legend.onAdd = function (map) {
    var div = L.DomUtil.create("div", "legend");
    div.innerHTML += "<h4>Key</h4>";
    div.innerHTML += '<p>😀 0-4 km</p>';
    div.innerHTML += '<p>😮‍💨 4-9 km</p>';
    div.innerHTML += '<p>🥵 9+ km</p>';
    return div;
};
legend.addTo(map);


function onEachFeature(feature, layer) {
    // does this feature have a property named popupContent?
    if (feature.properties && feature.properties.popupContent) {
        layer.bindPopup(feature.properties.popupContent, { autoPan: true, autoPanPaddingTopLeft: 0, closeButton: false, keepInView: true });
    }
}


var myLayer = new L.MarkerClusterGroup();
// var myLayer = L.geoJSON().addTo(map);
for (var i = 0; i < geojsonFeatures.length; i++) {
    var geojsonFeature = geojsonFeatures[i];
    var walkLength = Math.round(geojsonFeature['properties']['Length (km)'] * 10) / 10
    if (walkLength < 4) {
        var emojiHTML = '<p>😀</p>'
    } else if (walkLength < 9) {
        var emojiHTML = '<p>😮‍💨</p>'
    } else {
        var emojiHTML = '<p>🥵</p>'
    }
    var geojsonMarkerOptions = {
        icon: L.divIcon({
            html: emojiHTML,
            iconSize: 50
        }),
        // radius: 20,
        fillColor: geojsonFeature['properties']['marker-color'],
        color: geojsonFeature['properties']['marker-color'],
        // weight: 1,
        // opacity: 1,
        // fillOpacity: 0.5,
        // icon: fontAwesomeIcon
    };
    var popupContent = (`<div id="popup-card">
        <h1>${geojsonFeature['properties']['Name']}</h1>
        <p><b>Place: </b>${geojsonFeature['properties']['Town']}, ${geojsonFeature['properties']['County']}</p>
        <p><b>Length: </b>${walkLength}km</p>
        <a href=${geojsonFeature['properties']['website']} target="_blank" rel="noopener noreferrer"><img src=${geojsonFeature['properties']['image']} alt=""></a>
        </div>
    </div>`)
    geojsonFeature.properties.popupContent = popupContent
    L.geoJSON(geojsonFeature, {
        onEachFeature: onEachFeature,
        pointToLayer: function (feature, latlng) {
            return new L.Marker(latlng, geojsonMarkerOptions);
        }
    }).addTo(myLayer);
}

map.addLayer(myLayer);









