import { useRef, useState } from "react";
import styles from "./customerData.module.css";
import { checkFields } from "../../../lib/checkfields";

export const CustomerData = (props) => {
  const [message, setMessage] = useState(
    props.edit ? "Altere os dados necessários" : "Digite os dados do cliente"
  );

  const name = useRef();
  const email = useRef();
  const phone = useRef();
  const x = useRef();
  const y = useRef();

  function sendData() {
    const nameVal = name.current?.value;
    const emailVal = email.current?.value;
    const phoneVal = phone.current?.value;
    const xVal = x.current?.value;
    const yVal = y.current?.value;

    const result = checkFields(nameVal, emailVal, phoneVal, xVal, yVal);
    setMessage(result.message);

    if (!result.success) return;

    const options = {
      method: props.edit ? "PUT" : "POST",
      body: JSON.stringify({
        id: props.edit ? props.edit.id : null,
        x_location: parseInt(xVal),
        y_location: parseInt(yVal),
        name: nameVal,
        email: emailVal,
        phone: phoneVal,
      }),
      headers: { "Content-Type": "application/json" },
    };

    fetch(`${process.env.REACT_APP_SERVER}/customers`, options)
      .then((res) => res.json())
      .then((res) => {
        setMessage(res.message);
      })
      .catch((error) => {
        console.error(error);
        setMessage(`Erro ao ${props.edit ? "editar" : "adicionar"} cliente`);
      });
  }

  return (
    <div className={styles.container}>
      <h3>PÁGINA DO CLIENTE</h3>
      <div className={styles.form_container}>
        <label>Nome</label>
        <input ref={name} type="text" defaultValue={props.edit?.name} />
        <br />

        <label>Email</label>
        <input ref={email} type="text" defaultValue={props.edit?.email} />
        <br />

        <label>Telefone</label>
        <input ref={phone} type="number" defaultValue={props.edit?.phone} />
        <br />

        <div className={styles.location}>
            <label>X</label>
            <input
              ref={x}
              type="number"
              defaultValue={props.edit?.x_location}
            />
            <label>Y</label>
            <input
              ref={y}
              type="number"
              defaultValue={props.edit?.y_location}
            />
        </div>
      </div>

      <span className={styles.message}>{message}</span>
      <button className={styles.button} onClick={sendData}>
        {props.edit ? "EDITAR" : "ADICIONAR"}
      </button>
    </div>
  );
};
