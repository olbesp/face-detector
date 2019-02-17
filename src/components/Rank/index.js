import React from 'react';
import styles from './styles.module.scss';

export default function Rank({ name, entries }) {
  return (
    <div className={styles.Rank}>
      <div>{`Hi ${name}, your rank is`}</div>
      <div>{entries}</div>
    </div>
  );
}
