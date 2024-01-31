import { useEffect, useState } from "react";
import { Options } from "./options";
import styles from "./table.module.css";

export const Table = (props) => {
  const [content, setContent] = useState(<Loading />);

  function fetchData() {
    fetch(`${process.env.REACT_APP_SERVER}/customers/${props.search}`)
      .then((res) => res.json())
      .then((res) => {
        setContent(
          <TableData
            customers={res}
            setModal={props.setModal}
            refresh={fetchData}
          />
        );
      })
      .catch((error) => {
        setContent(<Error message={error} />);
      });
  }

  useEffect(() => {
    fetchData();
  }, [props.search, props.visible]);

  return (
    <table className={styles.table}>
      <thead>
        <tr style={{ borderTopRightRadius: 15, borderTopLeftRadius: 15 }}>
          <th style={{ borderTopLeftRadius: 15, flex: 0.25 }}>⚙</th>
          <th>NOME</th>
          <th>EMAIL</th>
          <th style={{ borderTopRightRadius: 15 }}>TELEFONE</th>
        </tr>
      </thead>

      {content}
    </table>
  );
};

const Loading = () => (
  <div className={styles.loading}>
    <img src="/icons/loading.svg" alt="Loading" />
  </div>
);

const TableData = (props) => {
  return (
    <tbody>
      {props.customers.map((customer, index) => (
        <tr key={index}>
          <td>
            <Options
              id={customer.id}
              refresh={props.refresh}
              edit={() => props.setModal(customer)}
            />
          </td>
          <td>{customer.name}</td>
          <td>{customer.email}</td>
          <td>{`+${customer.phone.slice(0, 2)} ${customer.phone.slice(2)}`}</td>
        </tr>
      ))}
    </tbody>
  );
};

const Error = (props) => (
  <div className={styles.error}>
    <img src="/icons/error.svg" alt="Erro" />
    <p>ERRO</p>
    <p>{props.message}</p>
  </div>
);
