import styles from "./navbar.module.css";
import AppLogo from "../../images/logo10.jpg";
export const Navbar = () => {
  return (
    <div className={styles.nav_container}>
      <div className={styles.logocont}>
        <img src={AppLogo}></img>
      </div>
      <div className={` ${styles.logocont}`}>
        <h1>PicNest</h1>
      </div>
    </div>
  );
};
