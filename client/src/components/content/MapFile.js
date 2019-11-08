import React, {useEffect} from 'react';

const kcmoCoords = {
  lat: 39.0997,
  long: -94.5786
};

const columbiaCoords = {
  lat: 38.9517,
  long: -92.3341
};

// const cavesURL = "https://data.mo.gov/resource/xsrw-xhjj.json?$select=location_1";


const MapFile = () =>
{
  return (
    <div>
      <h4>Google Map</h4>
      <div id="googleMap">
      </div>
      <p>Bottom</p>
    </div>);
};

export default MapFile;
