import React from 'react';
import styles from './styles.module.scss';

export default function Navigation() {
  return (
    <nav className={styles.Navigation}>
      <p className={styles.Navigation__link}>Sign Out</p>
    </nav>
  );
}
