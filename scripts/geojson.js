async function getData(url) {
    const response = await fetch(url);
    return response.json();
}

const geojson = await getData('./walks.geojson');

// Example of filtering based on property
// var filter = { "County": "DEVON" };
// var geojsonFeatures = [];
// for (var i = 0; i < geojson['features'].length; i++) {
//     var geojsonFeature = geojson['features'][i];
//     if (geojsonFeature["properties"]["County"].toUpperCase() == "DEVON") {
//         geojsonFeatures.push(geojsonFeature);
//     }
// };

var geojsonFeatures = [];
for (var i = 0; i < geojson['features'].length; i++) {
    geojsonFeatures.push(geojson['features'][i]);
};

export var geojsonFeatures;