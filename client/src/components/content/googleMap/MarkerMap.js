/* global google */
import React, {useEffect, useState} from "react";
import {GoogleApiWrapper, InfoWindow, Map, Marker} from "google-maps-react";
// import {GOOGLE_API_DEV_KEY} from "../../../env";

const dataURL = "https://data.mo.gov/resource/rzpp-6ftc.json?$limit=1";
const geocodeURL = "https://maps.googleapis.com/maps/api/geocode/json?address=";
const API_KEY = "AIzaSyCJsRP-UHO0Q9_jnbx-Oi5DWipA2oO-dh4";

export const MarkerMap = ({API_KEY}) =>
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

      if (data.results)
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

  const getMarker = () =>
  {
    if (true)
    {
      return (
        <Marker
          position={{lat: 38.9515, lng: -92.3286}}
          title={"A Title"}/>
      );
    }
  };

  return (
    <>
      <Map
        google={google}
        initialCenter={{
          lat: 38.5517,
          lng: -92.3341
        }}
        zoom={7}>
        {/*{getMarker()}*/}
        <Marker
          position={{lat: 38.9515, lng: -92.3286}}
          title={"A Title"}/>
        {/*<InfoWindow*/}
        {/*  marker={{lat: 38.9515, lng: -92.3286}}*/}
        {/*  visible={true}>*/}
        {/*  <div>*/}
        {/*    <h4>Name</h4>*/}
        {/*  </div>*/}
        {/*</InfoWindow>*/}
      </Map>
    </>
  );
};

export default GoogleApiWrapper({
  apiKey: API_KEY,
  libraries: ["visualization"]
})(MarkerMap);
