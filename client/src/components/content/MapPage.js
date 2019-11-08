import React from 'react';
import GoogleMap from "./GoogleMap";

// const scrip = document.createElement("script");
// scrip.setAttribute("src", "https://maps.googleapis.com/maps/api/js?key=AIzaSyBs3W7SqoAJRYmDrDNzaud13gIG7BpjjNY&libraries=visualization");
// window.document.body.appendChild(scrip);
// <script src="https://maps.googleapis.com/maps/api/js?key=AIzaSyBs3W7SqoAJRYmDrDNzaud13gIG7BpjjNY&libraries=visualization"></script>
// <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.4.1/jquery.min.js"></script>

const MapPage = () =>
{
  return (
    <div className="mapContainerWrapper">
      <GoogleMap/>
    </div>);
};

export default MapPage;
