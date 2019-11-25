// /* global google */
// import React, {useEffect, useState} from "react";
// import {GoogleApiWrapper, Map, HeatMap} from "google-maps-react";
// import {API_KEY} from "./APIKeys";
// // import {GOOGLE_API_DEV_KEY} from "../../../env";
//
// const dataURL = "https://data.mo.gov/resource/rzpp-6ftc.json?$limit=0";
// const geocodeURL = "https://maps.googleapis.com/maps/api/geocode/json?address=";
// const centerOfMO = {lat: 38.4852778, lng: -92.6191666};
//
// export const HeatLayerMap = () =>
// {
//   const [heatMapPoints, setHeatMapPoints] = useState([]);
//
//   useEffect(() =>
//   {
//     fetchData(dataURL)
//       .then(data =>
//       {
//         // console.log(data);
//         return extractAddresses(data);
//       })
//       .then(addresses =>
//       {
//         return getGeocodeCoords(geocodeURL, API_KEY, addresses);
//       })
//       .catch(err => console.log(err));
//   }, []);
//
//   const fetchData = async URL =>
//   {
//     const res = await fetch(URL);
//     const data = await res.json();
//
//     console.log("Retrieved " + data.length + " records from the dataset");
//     return data;
//   };
//
//   const extractAddresses = data =>
//   {
//     let addresses = [];
//
//     for (let obj of data)
//     {
//       let address =
//         obj["street_address"] +
//         ", " +
//         obj["city"] +
//         ", " +
//         obj["state"] +
//         " " +
//         obj["zip"];
//
//       addresses.push(address);
//     }
//     // console.log("Addresses: ", addresses);
//     return addresses;
//   };
//
//   const getGeocodeCoords = async (URL, key, addresses) =>
//   {
//     let heatMapData = [];
//
//     for (let address of addresses)
//     {
//       const encodedAddr = encodeURI(address);
//       const geocodeReq = URL + encodedAddr + "&key=" + key;
//       // console.log("Request: ", geocodeReq);
//
//       const res = await fetch(geocodeReq);
//       const data = await res.json();
//
//       if (data.results[0])
//       {
//         // console.log("Data: ", data);
//         let lat = Number(data.results[0].geometry.location["lat"]);
//         let lng = Number(data.results[0].geometry.location["lng"]);
//
//         heatMapData.push({lat: lat, lng: lng});
//       }
//     }
//     // console.log("HeatMapData: ", heatMapData);
//     // setHeatMapPoints(heatMapData);
//     setHeatMapPoints([
//       {"lat": 38.5940287, "lng": -90.3356761},
//       {"lat": 38.4453942, "lng": -91.00840540000002},
//       {"lat": 37.8205285, "lng": -92.2140202},
//       {"lat": 39.7410386, "lng": -92.4654951},
//       {"lat": 38.4110817, "lng": -90.5774617},
//       {"lat": 38.2439669, "lng": -90.5583429},
//       {"lat": 38.6736347, "lng": -90.3168927},
//       {"lat": 38.066493, "lng": -91.4035802},
//       {"lat": 36.7163192, "lng": -93.37444029999999},
//       {"lat": 38.5082837, "lng": -90.33457399999999},
//       {"lat": 39.75648580000001, "lng": -94.84781009999999},
//       {"lat": 37.6281992, "lng": -91.5242485},
//       {"lat": 37.147393, "lng": -93.2736535},
//       {"lat": 38.960812, "lng": -92.333382},
//       {"lat": 37.2946849, "lng": -89.5662201},
//       {"lat": 38.6415501, "lng": -90.251635},
//       {"lat": 37.129503, "lng": -92.255663},
//       {"lat": 39.0451224, "lng": -94.4102126},
//       {"lat": 36.972547, "lng": -93.72194619999999},
//       {"lat": 37.6104363, "lng": -93.40847769999999},
//       {"lat": 38.6728173, "lng": -90.3887448},
//       {"lat": 37.67861389999999, "lng": -92.65743739999999},
//       {"lat": 39.0345715, "lng": -94.5372221},
//       {"lat": 38.0153756, "lng": -92.75639129999999},
//       {"lat": 38.6503972, "lng": -90.19562859999999},
//       {"lat": 38.6440649, "lng": -90.2545597},
//       {"lat": 36.8754052, "lng": -89.5908321},
//       {"lat": 38.6263418, "lng": -90.2870543},
//       {"lat": 40.1946889, "lng": -92.5856161},
//       {"lat": 38.5798279, "lng": -90.2403348},
//       {"lat": 38.3692358, "lng": -93.77815},
//       {"lat": 36.9983675, "lng": -91.0157327},
//       {"lat": 38.8661054, "lng": -91.91645059999999},
//       {"lat": 37.1365384, "lng": -93.2912169},
//       {"lat": 39.0128199, "lng": -94.5936016}
//     ]);
//   };
//
//   const gradient = [
//     "rgba(51, 204, 51, 0)",
//     "rgba(74, 181, 45, 1)",
//     "rgba(96, 159, 40, 1)",
//     "rgba(119, 136, 34, 1)",
//     "rgba(142, 113, 28, 1)",
//     "rgba(164, 91, 23, 1)",
//     "rgba(187, 68, 17, 1)",
//     "rgba(210, 45, 11, 1)",
//     "rgba(232, 23, 6, 1)",
//     "rgba(255, 0, 0, 1)",
//   ];
//
//   return (
//     <>
//       <Map
//         google={google}
//         initialCenter={centerOfMO}
//         zoom={7}>
//         {(heatMapPoints.length > 0) ?
//           <HeatMap
//             positions={heatMapPoints}
//             gradient={gradient}
//             radius={10}
//             opacity={0.7}/> :
//           <></>}
//       </Map>
//     </>
//   );
// };
//
// export default GoogleApiWrapper({
//   apiKey: API_KEY,
//   libraries: ["visualization"]
// })(HeatLayerMap);
