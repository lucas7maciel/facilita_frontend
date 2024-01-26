import { useState } from "react";
import { SearchSection } from "../../components/searchsection";
import { PageModal } from "../../components/pageModal";
import { CustomerData } from "./subcomponents/customerData";
import { Table } from "./subcomponents/table";
import styles from "./index.module.css";
import { Path } from "./subcomponents/path";
import { exportSheet } from "../../lib/exportSheet";

export const Home = () => {
  const [search, setSearch] = useState("");
  const [modal, setModal] = useState({ visible: false, page: null });

  return (
    <>
      <div className={styles.container}>
        <SearchSection
          setSearch={setSearch}
          search={search}
          addUser={() =>
            setModal({ visible: true, page: <CustomerData edit={null} /> })
          }
        />

        <Table
          search={search}
          visible={modal.visible}
          setModal={(customer) =>
            setModal({ visible: true, page: <CustomerData edit={customer} /> })
          }
        />

        <div className={styles.options}>
          <button
            className={styles.local}
            onClick={() => setModal({ visible: true, page: <Path /> })}
          >
            LOCALIZAÇÃO
          </button>
          <button
            className={styles.sheet}
            style={{backgroundImage: "url(/icons/download.svg)"}}
            onClick={() => exportSheet()}
          >
            PLANILHA
          </button>
        </div>
      </div>

      {modal.visible ? (
        <PageModal
          content={modal.page}
          hide={() => setModal({ visible: false })}
        />
      ) : null}
    </>
  );
};
