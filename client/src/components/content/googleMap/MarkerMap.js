/* global google */
import React, {useEffect, useState} from "react";
import {GoogleApiWrapper, Map, Marker, InfoWindow} from "google-maps-react";
import {API_KEY} from "./APIKeys";
// import {GOOGLE_API_DEV_KEY} from "../../../env";

const uuidv4 = require("uuid/v4");
const dataURL = "https://data.mo.gov/resource/ghmj-sbt9.json?$limit=60"; // 90 records
const geocodeURL = "https://maps.googleapis.com/maps/api/geocode/json?address=";
const centerOfMO = {lat: 38.4852778, lng: -92.6191666};

export const MarkerMap = () =>
{
  const [points, setPoints] = useState([]);

  useEffect(() =>
  {
    fetchData(dataURL)
      .then(data =>
      {
        let addresses = [];
        let infoText = [];

        for (let obj of data)
        {
          let address = (
            obj["physical_address"] +
            ", " +
            obj["city"] +
            ", " +
            obj["state"] +
            " " +
            obj["zip"]);

          addresses.push(address);

          const countiesServed = toPascalCase(obj["counties_served"]);

          infoText.push({
            name: obj["facility_name"],
            address: address,
            facility_phone: obj["facility_telephone"],
            helpline_phone: obj["helpline_hotline_telephone"],
            website: obj["website_url"],
            hours: obj["days_and_hours_of_operations"],
            countiesServed: countiesServed,
          });
        }

        // console.log("Addresses: ", addresses);
        return {addresses: addresses, infoText: infoText};
      })
      .then(info =>
      {
        return getGeocodeCoords(geocodeURL, API_KEY, info);
      })
      .catch(err => console.log(err));
  }, []);

  const fetchData = async URL =>
  {
    const res = await fetch(URL);
    const data = await res.json();

    console.log("Retrieved " + data.length + " records from the dataset");
    return data;
  };

  const getGeocodeCoords = async (URL, key, info) =>
  {
    let pointInfo = [];

    for (let i = 0; i < info.addresses.length; i++)
    {
      if (i % 2 === 0)
      {const encodedAddr = encodeURI(info.addresses[i]);
      const geocodeReq = URL + encodedAddr + "&key=" + key;
      // console.log("Request: ", geocodeReq);

      const res = await fetch(geocodeReq);
      const data = await res.json();

      if (data.results[0])
      {
        // console.log("Data: ", data);
        let lat = Number(data.results[0].geometry.location["lat"]);
        let lng = Number(data.results[0].geometry.location["lng"]);

        pointInfo.push({
          infoKey: uuidv4(),
          isVisible: false,
          infoText: info.infoText[i],
          position: {lat: lat, lng: lng}
        });
      }}
    }
    // console.log("PointInfo: ", pointInfo);
    // pointInfo = ([
    //   {
    //     "infoKey": "5ba2f2ee-fb87-471d-944e-0ebaf999b3a8",
    //     "isVisible": false,
    //     "infoText": {
    //       "name": "Barton County Health Department",
    //       "address": "1301 East 12th Street, Lamar, MO 64759-2182",
    //       "facility_phone": "417-682-3363",
    //       "helpline_phone": "No helpline/hotline available",
    //       "website": "No website available",
    //       "hours": "Mon-Fri - 8:00am-5:00pm",
    //       "countiesServed": "Barton"
    //     },
    //     "position": {
    //       "lat": 37.4921814,
    //       "lng": -94.25917419999999
    //     }
    //   },
    //   {
    //     "infoKey": "b9bfaa91-866d-48c0-8d34-e0effe244282",
    //     "isVisible": false,
    //     "infoText": {
    //       "name": "Bates County Health Center",
    //       "address": "501 North Orange Street, Butler, MO 64730",
    //       "facility_phone": "660-679-6108",
    //       "helpline_phone": "No helpline/hotline available",
    //       "website": "http://www.batescountyhealthcenter.org",
    //       "hours": "Mon-Fri - 8:30am-4:30pm",
    //       "countiesServed": "Bates"
    //     },
    //     "position": {
    //       "lat": 38.263167,
    //       "lng": -94.34250480000001
    //     }
    //   }
    // ]);
    setPoints(pointInfo);
  };

  const toPascalCase = (str) =>
  {
    let casedWords = [];
    let strings = str.split(", ");

    for (let string of strings)
    {
      const lowerLetters = string.slice(1).toLowerCase();
      const pascalCased = string[0].toUpperCase().concat(lowerLetters);
      casedWords.push(pascalCased);
    }

    return casedWords.join(", ");
  };

  const toggleInfoWindow = (selectionIndex) =>
  {
    setPoints(points.map((point, index) =>
    {
      point.isVisible = index === selectionIndex;
      return point;
    }));
  };

  const onClickMap = () =>
  {
    setPoints(points.map(point =>
    {
      point.isVisible = false;
      return point;
    }));
  };

  return (
    <Map
      google={google}
      initialCenter={centerOfMO}
      zoom={7}
      onClick={onClickMap}>
      {points.map((point, index) => (
        <Marker
          key={uuidv4()}
          position={point.position}
          title={point.infoText.name}
          onClick={toggleInfoWindow.bind(null, index)}/>))}
      {points.map(point => (
        <InfoWindow
          key={point.infoKey}
          position={point.position}
          pixelOffset={new google.maps.Size(0, -42)}
          visible={point.isVisible}>
          <div className="infoWindow">
            <h5>{point.infoText.name}</h5>
            <h6>{point.infoText.address}</h6>
            <div className="infoWindowBody">
              <p><b>Facility phone:</b>&nbsp;{point.infoText.facility_phone}</p>
              <p><b>Helpline:</b>&nbsp;{point.infoText.helpline_phone}</p>
              <p><b>Hours:</b>&nbsp;{point.infoText.hours}</p>
              <p>
                <b>Website:</b>&nbsp;
                {point.infoText.website.substring(0, 4) === "http" ?
                  <a target="_blank" rel="noopener noreferrer"
                     href={point.infoText.website}>{point.infoText.website}</a> :
                  point.infoText.website}
              </p>
              <p><b>Counties served</b>:&nbsp;{point.infoText.countiesServed}  </p>
            </div>
          </div>
        </InfoWindow>))}
    </Map>
  );
};

export default GoogleApiWrapper({
  apiKey: API_KEY,
  libraries: ["visualization"]
})(MarkerMap);
