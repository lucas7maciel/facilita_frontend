import styles from "./index.module.css";

export const SearchSection = (props) => {
  return (
    <div className={styles.container}>
      <div className={styles.search_section}>
        <input
          type="text"
          style={{ backgroundImage: "url('/icons/search.svg')" }}
          value={props.search}
          onChange={(evt) => props.setSearch(evt.target.value)}
        />
        <img src="./icons/add.svg" alt="Add Customer" onClick={props.addUser} />
      </div>
      <div className={styles.logo}>
        <span>FACILITA</span>
      </div>
    </div>
  );
};
