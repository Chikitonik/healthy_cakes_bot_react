import React, { useEffect, useCallback, useState } from "react";
import { useTelegram } from "../../hooks/useTelegram";
import "./Form.css";

const Form = () => {
  const [country, setCountry] = useState("");
  const [street, setStreet] = useState("");
  const [subject, setSubject] = useState("");
  const { tg } = useTelegram();

  const onSendData = useCallback(() => {
    const data = {
      country,
      street,
      subject,
    };
    tg.sendData(JSON.stringify(data));
  }, [country, street, subject]);

  useEffect(() => {
    tg.onEvent("mainButtonClicked", "kkkk");
    return () => {
      tg.offEvent("mainButtonClicked", "kkkkkkkkkk");
    };
  }, [onSendData]);

  //   useEffect(() => {
  //     tg.onEvent("mainButtonClicked", onSendData);
  //     return () => {
  //       tg.offEvent("mainButtonClicked", onSendData);
  //     };
  //   }, [onSendData]);

  //   useEffect(() => {
  //     tg.MainButton.setParams({
  //       text: "Send data",
  //     });
  //   }, []);

  useEffect(() => {
    if (!street || !country) {
      tg.MainButton.hide();
    } else {
      tg.MainButton.show();
    }
  }, [country, street]);

  const onChangeCountry = (e) => {
    setCountry(e.target.value);
  };
  const onChangeStreet = (e) => {
    setStreet(e.target.value);
  };
  const onChangeSubject = (e) => {
    setSubject(e.target.value);
  };

  return (
    <div className={"form"}>
      <h3>Input Your data</h3>
      <input
        className={"input"}
        type="text"
        placeholder={"country"}
        value={country}
        onChange={onChangeCountry}
      />
      <input
        className={"input"}
        type="text"
        placeholder={"street"}
        value={street}
        onChange={onChangeStreet}
      />
      <select className={"select"} value={subject} onChange={onChangeSubject}>
        <option value={"person"}>person</option>
        <option value={"organization"}>organization</option>
      </select>
    </div>
  );
};

export default Form;
