import React from 'react';
import GoogleMap from "./HeatLayerMap";
// import MarkerMap from "./MarkerMap";

const MapPage = () =>
{
  return (
    <div className="mapContainerWrapper">
      <GoogleMap/>
      {/*<MarkerMap/>*/}
    </div>);
};

export default MapPage;
