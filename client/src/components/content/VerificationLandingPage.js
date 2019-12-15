import React, {useEffect, useState} from "react";
import axios from "axios";

const VerificationLandingPage = () =>
{
  const [response, setResponse] = useState("");

  useEffect(() =>
  {
    const URL = "/api/user/email/verify";
    const token = {token: new URLSearchParams(document.location.search).get("token")};

    axios.post(URL, token)
      .then(res => setResponse("Your email has been verified"))
      .catch(err =>
      {
        if (err.response.status === 400 || err.response.status === 500)
        {
          setResponse(err.response.data);
        }
      });
  }, []);


  return (
    <p className="verificationResponse">{response}</p>);
};

export default VerificationLandingPage;
