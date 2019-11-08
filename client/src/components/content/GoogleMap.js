/* global google */
import React, {useEffect, useState} from "react";
import {GoogleApiWrapper, Map, HeatMap} from "google-maps-react";

const dataURL = "https://data.mo.gov/resource/rzpp-6ftc.json?$limit=2";
const geocodeURL = "https://maps.googleapis.com/maps/api/geocode/json?address=";
const key = "AIzaSyBs3W7SqoAJRYmDrDNzaud13gIG7BpjjNY";

export const GoogleMap = () =>
{
  // const [state, setState] = useState([]);
  // const [isDataLoaded, setIsDataLoaded] = useState(false);

  useEffect(() =>
  {
    // getData(dataURL)
    //   .then(data =>
    //   {
    //     // console.log(data);
    //     return extractAddresses(data)
    //   })
    //   .then(addresses =>
    //   {
    //     // console.log(addresses);
    //     return getGeocodeCoords(geocodeURL, key, addresses);
    //   })
    //   // .then(heatMapData =>
    //   // {
    //   //   console.log(heatMapData);
    //   //   createMap(heatMapData)
    //   // })
    //   .catch(err => console.log(err));
  }, []);

  // const trigger = () =>
  // {
  //   getData(dataURL)
  //     .then(data =>
  //     {
  //       // console.log(data);
  //       return extractAddresses(data)
  //     })
  //     .then(addresses =>
  //     {
  //       // console.log("Addresses: ", addresses);
  //       return getGeocodeCoords(geocodeURL, key, addresses);
  //     })
  //     // .then(heatMapData =>
  //     // {
  //     //   console.log(heatMapData);
  //     //   createMap(heatMapData)
  //     // })
  //     .catch(err => console.log(err));
  // };

  const getData = async (URL) =>
  {
    const res = await fetch(URL);
    const data = await res.json();

    console.log("Retrieved " + data.length + " records from the dataset");
    return data;
  };

  const extractAddresses = (data) =>
  {
    let addresses = [];

    for (let obj of data)
    {
      let address = obj["street_address"]
        + ", "
        + obj["city"]
        + ", "
        + obj["state"]
        + " "
        + obj["zip"];

      addresses.push(address);
    }

    // console.log("Addresses: ", addresses);
    return addresses;
  };

  const getGeocodeCoords = async (URL, key, addresses) =>
  {
    let heatMapData = [];

    for (let address of addresses)
    {
      const encodedAddr = encodeURI(address);
      const geocodeReq = URL + encodedAddr + "&key=" + key;
      // console.log("Request: ", geocodeReq);

      const res = await fetch(geocodeReq);
      const data = await res.json();

      if (data.results)
      {
        // console.log("Data: ", data);
        let lat = Number(data.results[0].geometry.location["lat"]);
        let long = Number(data.results[0].geometry.location["lng"]);

        heatMapData.push(new google.maps.LatLng(lat, long));
      }
    }

    // console.log("HeatMapData: ", heatMapData);
    // setState(heatMapData);
    // setIsDataLoaded(true);
    return heatMapData;
  };

  // const createMap = (heatMapData) =>
  // {
  //   let mapProp = {
  //     center: new google.maps.LatLng(columbiaCoords.lat, columbiaCoords.long),
  //     zoom: 6,
  //   };
  //
  //   let map = new google.maps.Map(document.getElementById("googleMap"), mapProp);
  //
  //   const heatMap = new google.maps.visualization.HeatmapLayer({
  //     data: heatMapData
  //   });
  //
  //   heatMap.setMap(map);
  // };

  return (
    <Map
      google={google}
      // style={style}
      initialCenter={{
        lat: 38.5517,
        lng: -92.3341
      }}
      zoom={7}>
      <HeatMap
        positions={[{lat: 39.0997, lng: -94.5786}]}
        gradient={2}
        radius={20}
        opacity={1}
      />
      {/*{isDataLoaded ?*/}
      {/*  <HeatMap*/}
      {/*    positions={state}*/}
      {/*    gradient={2}*/}
      {/*    radius={20}*/}
      {/*    opacity={1}*/}
      {/*  />*/}
      {/*  : <p>""</p>}*/}
    </Map>
  );
};

export default GoogleApiWrapper({
  apiKey: "AIzaSyBs3W7SqoAJRYmDrDNzaud13gIG7BpjjNY",
  libraries: ['visualization']
})(GoogleMap);
