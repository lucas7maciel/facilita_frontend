import { useEffect, useRef, useState } from "react";
import styles from "./path.module.css";

const Movement = (props) => (
  <div>
    <hr />
    <span>Para a casa de Id: {props.move.id}</span>
    <br />
    <span>
      X: {props.move.x_location}, Y: {props.move.y_location}
    </span>
  </div>
);

export const Path = () => {
    const pathContainer = useRef()
  const [data, setData] = useState({});

  useEffect(() => {
    pathContainer.current?.focus()

    fetch(`${process.env.REACT_APP_SERVER}/path`)
      .then((res) => res.json())
      .then(setData)
      .catch(console.log);
  }, []);

  return (
    <div className={styles.container} ref={pathContainer}>
      <span className={styles.title}>Caminho</span>
      <div className={styles.moves_container}>
        {data.path
          ? data.path.map((move, index) => <Movement key={index} move={move} />)
          : null}
      </div>
      <span className={styles.total}>
        Distância: {data.total ? data.total.toFixed(2) : "Não Informada"}
      </span>
    </div>
  );
};
