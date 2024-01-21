import { useRef, useState } from "react";
import styles from "./customerData.module.css";
import { checkFields } from "../../../lib/checkfields";

export const CustomerData = (props) => {
  const [message, setMessage] = useState(props.edit ? "Altere os dados necessários" : "Digite os dados do cliente");

  const name = useRef();
  const email = useRef();
  const phone = useRef();

  console.log(props);

  function sendData() {
    const nameVal = name.current?.value;
    const emailVal = email.current?.value;
    const phoneVal = phone.current?.value;

    const result = checkFields(nameVal, emailVal, phoneVal);
    setMessage(result.message);

    if (!result.success) return;

    const options = {
      method: props.edit ? "PUT" : "POST",
      body: JSON.stringify({
        id: props.edit ? props.edit.id : null,
        name: nameVal,
        email: emailVal,
        phone: phoneVal,
      }),
      headers: { "Content-Type": "application/json" },
    };

    fetch("http://localhost:3001/customers", options)
      .then((res) => res.json())
      .then((res) => {
        console.log(res);
        setMessage(res.message);
      })
      .catch(console.log);
  }

  return (
    <div className={styles.container}>
      <h3>PÁGINA DO CLIENTE</h3>
      {/*Ajeitar propriedades dos labels*/}
      <div className={styles.form_container}>
        <label>Nome</label>
        <input ref={name} type="text" defaultValue={props.edit?.name} /><br />

        <label>Email</label>
        <input ref={email} type="text" defaultValue={props.edit?.email} /><br />

        <label>Telefone</label>
        <input ref={phone} type="number" defaultValue={props.edit?.phone} />
      </div>

      <span className={styles.message}>{message}</span>
      <button className={styles.button} onClick={sendData}>{props.edit ? "EDITAR" : "ADICIONAR"}</button>
    </div>
  );
};
