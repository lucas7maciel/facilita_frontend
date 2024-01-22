import { useEffect, useState } from "react";
import styles from "./path.module.css";

const Movement = (props) => (
  <>
    <span style={{ fontWeight: "bold" }}>{props.step}º passo</span>
    <br />
    <span>Para a casa de Id: {props.move.id}</span>
    <br />
    <span>
      Distância: {props.move.distance.toFixed(2)} ({props.move.x_location},{" "}
      {props.move.y_location})
    </span>
    {!props.last ? <hr /> : null}
  </>
);

export const Path = () => {
  const [message, setMessage] = useState("Carregando...");
  const [data, setData] = useState({});

  useEffect(() => {
    fetch(`${process.env.REACT_APP_SERVER}/path`)
      .then((res) => res.json())
      .then((res) => {
        setData(res);
        setMessage(`Distância: ${res.total.toFixed(2)}`);
      })
      .catch(() => {
        setMessage("Erro ao carregar caminho");
      });
  }, []);

  return (
    <div className={styles.container}>
      <span className={styles.title}>Caminho</span>
      <div className={styles.moves_container}>
        {data.path
          ? data.path.map((move, index) => (
              <Movement key={index} step={index + 1} move={move} last={data.path.length - 1 == index} />
            ))
          : null}
      </div>
      <span className={styles.total}>{message}</span>
    </div>
  );
};
