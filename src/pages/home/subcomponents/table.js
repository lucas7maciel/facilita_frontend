import { useEffect, useState } from "react";
import { Options } from "./options";
import styles from "./table.module.css";

export const Table = (props) => {
  const [customers, setCustomers] = useState([{name: "Carregando...", phone: "Carregando...", email: "Carregando..."}]);

  function fetchData() {
    fetch(`${process.env.REACT_APP_SERVER}/customers/${props.search}`)
      .then((res) => res.json())
      .then(setCustomers)
      .catch((error) => {
        console.error(error)
        setCustomers([{name: "Erro", email: "Cheque o console", phone: "Erro"}])
      });
  }

  useEffect(() => {
    fetchData();
  }, [props.search, props.visible]);

  return (
    <tbody className={styles.table}>
      <tr style={{borderTopRightRadius: 15, borderTopLeftRadius: 15}}>
        <th style={{ borderTopLeftRadius: 15, flex: 0.25 }}>+</th>
        <th>NOME</th>
        <th>EMAIL</th>
        <th style={{ borderTopRightRadius: 15 }}>TELEFONE</th>
      </tr>

      {customers.map((customer, index) => (
        <tr key={index}>
          <td style={{ flex: 0.25 }}>
            <Options
              id={customer.id}
              refresh={fetchData}
              edit={() => props.setModal(customer)}
            />
          </td>
          <td>{customer.name}</td>
          <td>{customer.email}</td>
          <td>{customer.phone}</td>
        </tr>
      ))}
    </tbody>
  );
};
