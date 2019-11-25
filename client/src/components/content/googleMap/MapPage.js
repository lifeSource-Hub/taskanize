import React from 'react';
import MarkerMap from "./MarkerMap";

const MapPage = () =>
{
  return (
    <>
      <p>The map markers are positioned using data retrieved from data.mo.gov. After
        extracting the addresses, I use another API to get the coordinates required for Google map
        markers. A separate component is used for the info window which appears when a marker is
        clicked. The content of the info window is also extracted from the retrieved data.</p>
      <p>I chose <i>Pregnancy Assistance Providers</i> for my dataset because it provides good information, is
        consistent, has enough records, and is local.</p>
      <hr/>
      <h4>Missouri Pregnancy Assistance Providers</h4>
      <div className="mapContainerWrapper">
        <MarkerMap/>
      </div>
    </>);
};

export default MapPage;
