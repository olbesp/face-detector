import React from 'react';
import Tilt from 'react-tilt';
import styles from './styles.module.scss';

export default function Logo() {
  return (
    <div className={styles.Logo}>
      <Tilt
        className={[styles.Logo__tilt, 'Tilt'].join(' ')}
        options={{ max: 55 }}
        style={{ height: 150, width: 150 }}
      >
        <div className={[styles.Logo__content, 'Tilt-inner'].join(' ')}>
          <span className={styles.Logo__content__text}>Face</span>
          <span className={styles.Logo__content__text}>Detector</span>
        </div>
      </Tilt>
    </div>
  );
}
