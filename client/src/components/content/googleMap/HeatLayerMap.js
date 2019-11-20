/* global google */
import React, {useEffect, useState} from "react";
import {GoogleApiWrapper, Map, HeatMap} from "google-maps-react";
// import {GOOGLE_API_DEV_KEY} from "../../../env";

const dataURL = "https://data.mo.gov/resource/rzpp-6ftc.json?$limit=1";
const geocodeURL = "https://maps.googleapis.com/maps/api/geocode/json?address=";
const API_KEY = "AIzaSyCJsRP-UHO0Q9_jnbx-Oi5DWipA2oO-dh4";

export const HeatLayerMap = ({API_KEY}) =>
{
  const [heatMapPoints, setHeatMapPoints] = useState([]);
  const [isDataLoaded, setIsDataLoaded] = useState(false);

  useEffect(() =>
  {
    // getHeatMapPoints();

    // getGeocodeCoords(geocodeURL, key, promise);
    fetchData(dataURL)
      .then(data =>
      {
        // console.log(data);
        return extractAddresses(data);
      })
      .then(addresses =>
      {
        // console.log(addresses);
        // getGeocodeCoords(geocodeURL, API_KEY, addresses);

        return getGeocodeCoords(geocodeURL, API_KEY, addresses);
      })
      .catch(err => console.log(err));
  }, []);

  // const getHeatMapPoints = async () =>
  // {
  //   const data = await fetchData(dataURL);
  //   const addresses = await extractAddresses(data);
  //   await getGeocodeCoords(geocodeURL, API_KEY, addresses);
  //   // const addresses = await getGeocodeCoords(geocodeURL, key, addresses);
  // };

  const fetchData = async URL =>
  {
    const res = await fetch(URL);
    const data = await res.json();

    console.log("Retrieved " + data.length + " records from the dataset");
    return data;
  };

  const extractAddresses = data =>
  {
    let addresses = [];

    for (let obj of data)
    {
      let address =
        obj["street_address"] +
        ", " +
        obj["city"] +
        ", " +
        obj["state"] +
        " " +
        obj["zip"];

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

      if (data.results[0])
      {
        // console.log("Data: ", data);
        let lat = Number(data.results[0].geometry.location["lat"]);
        let lng = Number(data.results[0].geometry.location["lng"]);

        heatMapData.push({lat: lat, lng: lng});
      }
    }

    // console.log("HeatMapData: ", heatMapData);
    // console.log("HeatMapPoints: ", heatMapPoints);
    setHeatMapPoints(heatMapData);
    setIsDataLoaded(true);
    // return heatMapPoints;
  };

  const gradient = [
    "rgba(51, 204, 51, 0)",
    "rgba(74, 181, 45, 1)",
    "rgba(96, 159, 40, 1)",
    "rgba(119, 136, 34, 1)",
    "rgba(142, 113, 28, 1)",
    "rgba(164, 91, 23, 1)",
    "rgba(187, 68, 17, 1)",
    "rgba(210, 45, 11, 1)",
    "rgba(232, 23, 6, 1)",
    "rgba(255, 0, 0, 1)",
  ];

  const getHeatMap = () =>
  {
    if (isDataLoaded)
    {
      return (
        <HeatMap
          positions={heatMapPoints}
          gradient={gradient}
          radius={10}
          opacity={0.7}/>
      );
    }
  };

  return (
    <>
      <Map
        google={google}
        // style={style}
        initialCenter={{
          lat: 38.5517,
          lng: -92.3341
        }}
        zoom={7}>
        {getHeatMap()}
      </Map>
    </>
  );
};

export default GoogleApiWrapper({
  apiKey: API_KEY,
  libraries: ["visualization"]
})(HeatLayerMap);
