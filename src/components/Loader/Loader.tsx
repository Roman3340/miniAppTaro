import React from "react";
import styles from "./styles.module.css";

const AstroLoader = () => {
  return (
    <div className={styles.loader}>
      <div className={styles.outerRing}>
        <div className={styles.star}></div>
      </div>
      <div className={styles.stars}>
        {[...Array(8)].map((_, i) => (
        <div
            key={i}
            className={styles.starPoint}
            style={{ ['--i' as any]: i } as React.CSSProperties}
        ></div>
        ))}

      </div>
    </div>
  );
};

export default AstroLoader;
