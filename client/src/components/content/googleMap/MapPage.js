import React from 'react';
import MarkerMap from "./MarkerMap";

const MapPage = () =>
{
  return (
    <>
      <p>This page, more than any other on this site, serves only to showcase the ability to
        retrieve online data, process it, and display the results using the Google Maps API. I
        chose <i><b>Pregnancy Assistance Providers</b></i> for my dataset because it provides good
        information and its records are consistent.</p>
      <p>The map markers are positioned using data retrieved from data.mo.gov. After
        extracting the addresses, I use another API to get the coordinates required for Google map
        markers. A separate component is used for the info window which appears when a marker is
        clicked. The content of the info window is also extracted from the retrieved data.</p>
      <hr/>
      <h4>Missouri Pregnancy Assistance Providers</h4>
      <div className="mapContainerWrapper">
        <MarkerMap/>
      </div>
      <br/>
      <p className="note"><b>Note:</b> There are 90 locations provided in the dataset, but not all are marked on the map.
        This reduces loading time and helps us keep costs down.</p>
    </>);
};

export default MapPage;
