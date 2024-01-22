import * as XLSX from "xlsx";
import styles from "../pages/home/subcomponents/table.module.css";

export const exportSheet = () => {
  const ws = XLSX.utils.table_to_sheet(
    document.getElementsByClassName(styles.table)[0]
  );

  ws["!cols"] = [];
  ws["!cols"][0] = { hidden: true };
  const wb = XLSX.utils.book_new();

  XLSX.utils.book_append_sheet(wb, ws, "Servers");

  XLSX.writeFile(wb, "clientes.xls");
};
