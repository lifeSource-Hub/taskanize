import React, {useState, useEffect} from "react";
import axios from "axios";
import {
  Button,
  Form,
  InputGroup,
  Label,
  Input,
} from "reactstrap";
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";

dayjs.extend(customParseFormat);

const Reminder = () =>
{
  const [unverifiedAddr, setUnverifiedAddr] = useState("");
  const [userEmailIsVerified, setUserEmailIsVerified] = useState(null);
  const [scheduleFeedback, setScheduleFeedback] = useState("");
  const [schedule, setSchedule] = useState({
    date: "",
    time: "",
  });
  const [email, setEmail] = useState({
    from: "lifesourcedev@gmail.com",
    to: "",
    subject: `Reminder from ${localStorage.getItem("currentUser")}`,
    body: "",
  });

  useEffect(() =>
  {
    const URL = "/api/email/check";
    axios.get(URL)
      .then(res =>
      {
        setUserEmailIsVerified(res.data.verified);
      })
      .catch(() => console.warn(`Can’t access GET '${URL}'`));
  }, []);

  const onChangeUserEmail = e =>
  {
    e.persist();
    setUnverifiedAddr(e.target.value);
  };

  const onChangeDate = e =>
  {
    e.persist();
    setSchedule(schedule => ({...schedule, date: e.target.value}));
  };

  const onChangeTime = e =>
  {
    e.persist();
    setSchedule(schedule => ({...schedule, time: e.target.value}));
  };

  const onChangeAddress = e =>
  {
    e.persist();
    setEmail(email => ({...email, to: e.target.value}));
  };

  const onChangeBody = e =>
  {
    e.persist();
    setEmail(email => ({...email, body: e.target.value}));
  };

  const onSubmitUnverifiedAddr = e =>
  {
    e.preventDefault();
    const URL = "/api/email/verify/send";

    // TODO validate input
    if (unverifiedAddr)
    {
      const userRequest = {
        id: localStorage.getItem("userId"),
        address: unverifiedAddr,
      };

      axios.post(URL, userRequest)
        .then(res =>
        {
          // TODO change state to render email sent notice to user
        })
        .catch(() => console.warn(`Can’t access PUT '${URL}'`));
    }
  };

  const onSubmitReminder = e =>
  {
    e.preventDefault();
    setScheduleFeedback("");

    if (schedule.date === "" || schedule.time === "" || email.to === "" || email.body === "")
    {
      setScheduleFeedback("Required fields missing");
    }
    else
    {
      const URL = "/api/email/schedule";
      const dateTime = dayjs(schedule.date + schedule.time, "YYYY-MM-DDHH:mm");
      const signedBody = email.body
        + "<br/><br/><small>Sent via Taskanize: A LifeSource Application " +
        "https://taskanize.herokuapp.com</small>";

      const formattedEmail = {
        from: email.from,
        to: email.to,
        subject: email.subject,
        body: signedBody,
        sendAt: dateTime.unix()
      };
      // console.log(formattedEmail);

      axios.post(URL, formattedEmail)
        .then(res =>
        {
          if (res.status === 202)
          {
            setEmail(email => ({...email, body: ""}));
            setScheduleFeedback("Reminder scheduled!");
          }
        })
        .catch(() => console.warn(`Can’t access PUT '${URL}'`));
    }
  };

  // TODO refactor for cleaner code
  return (
    <>
      <h2>Set a Reminder</h2>
      <br/>
      {userEmailIsVerified ?
        <>
          <p>You'll receive a reminder email containing your message at the date and time you
            schedule.
            Scheduling for a past date or time will result in the reminder getting sent
            immediately.</p>
          <Form className="reminderForm" onSubmit={onSubmitReminder}>
            <InputGroup>
              <Label size="sm">Date:</Label>
              <Input
                type="date"
                bsSize="sm"
                value={schedule.date}
                onChange={onChangeDate}/>
              <Label size="sm">Time:</Label>
              <Input
                type="time"
                bsSize="sm"
                value={schedule.time}
                onChange={onChangeTime}/>
            </InputGroup>
            <InputGroup>
              <Label size="sm">To:</Label>
              <Input
                type="text"
                maxLength="50"
                bsSize="sm"
                value={email.to}
                onChange={onChangeAddress}/>
            </InputGroup>
            <InputGroup>
              <Label size="sm">Message:</Label>
              <Input
                type="textarea"
                maxLength="1500"
                bsSize="sm"
                value={email.body}
                onChange={onChangeBody}/>
            </InputGroup>
            <Button size="sm" className="bg-success">Submit</Button>
          </Form>
          <br/>
          <p className="scheduleFeedback">{scheduleFeedback}</p>
        </>
        : null}
      {userEmailIsVerified === false ?
        <div className="emailRequestBox">
          <p>Hey, {localStorage.getItem("currentUser")}, it looks like we don't have a verified
            email address on file for you. Please provide your email address below and we'll send a
            verification request. Once your email address has been verified you will be able to use
            the reminder utility.</p>
          <br/>
          <div className="emailRequestForm">
            <Form onSubmit={onSubmitUnverifiedAddr}>
              <InputGroup>
                <Label size="sm">Your Email:&nbsp;</Label>
                <Input
                  type="text"
                  bsSize="sm"
                  value={unverifiedAddr}
                  onChange={onChangeUserEmail}/>
              </InputGroup>
              <Button size="sm" className="bg-success">Submit</Button>
            </Form>
          </div>
        </div>
        : null}
    </>);
};

export default Reminder;
