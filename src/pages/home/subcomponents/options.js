import styles from "./options.module.css";

export const Options = (props) => {
  function del() {
    const options = {
      method: "DELETE",
      body: JSON.stringify({ id: props.id }),
      headers: { "Content-type": "application/json" },
    };

    fetch(`${process.env.REACT_APP_SERVER}/customers`, options)
      .then((res) => res.json())
      .then(props.refresh)
      .catch(console.log);
  }

  return (
    <div className={styles.container}>
      <img src="/icons/edit.svg" onClick={props.edit} />
      <img src="/icons/delete.svg" onClick={del} />
    </div>
  );
};
