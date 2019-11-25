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
  const [emailIsVerified, setEmailIsVerified] = useState(false);
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
    // TODO Complete email verification
    const URL = "/api/user/email/check";
    axios.get(URL)
      .then(res =>
      {
      })
      .catch(() => console.warn(`Can’t access GET '${URL}'`));
  }, []);

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

  const onSubmitEmail = e =>
  {
    e.preventDefault();
  };

  const onSubmitReminder = e =>
  {
    e.preventDefault();

    const URL = "/api/email/schedule";
    const dateTime = dayjs(schedule.date + schedule.time, "YYYY-MM-DDHH:mm");
    const signedBody = email.body
      + "<br/><br/><small>Sent via LifeSource https://taskanize.herokuapp.com</small>";

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
        if (res.data.statusCode === 202)
        {
          console.log("Email sent");
        }
      })
      .catch(() => console.warn(`Can’t access PUT '${URL}'`));
  };

  return (
    <>
      <h2>Set a Reminder</h2>
      <br/>
      <p>You'll receive a reminder email containing your message at the date and time you schedule.
        Scheduling for a past date or time will result in the reminder getting sent immediately.</p>

      {emailIsVerified ? null :
        <div className="emailRequestBox">
          <p>Hey, {localStorage.getItem("currentUser")}, it looks like we don't have an email
            address on file for you. Please provide us
            with your email address. Once it has been verified, you can use the reminder
            utility.</p>
          <br/>
          <div className="emailRequestForm">
            <Form onSubmit={onSubmitEmail}>
              <InputGroup>
                <Label size="sm">Your Email:&nbsp;</Label>
                <Input type="text" bsSize="sm"/>
              </InputGroup>
              <Button size="sm" className="bg-success">Submit</Button>
            </Form>
          </div>
        </div>}

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
            maxLength=""
            bsSize="sm"
            value={email.to}
            onChange={onChangeAddress}/>
        </InputGroup>
        <InputGroup>
          <Label size="sm">Message:</Label>
          <Input
            type="textarea"
            maxLength=""
            bsSize="sm"
            value={email.body}
            onChange={onChangeBody}/>
        </InputGroup>
        <Button size="sm" className="bg-success">Submit</Button>
      </Form>
    </>);
};

export default Reminder;
