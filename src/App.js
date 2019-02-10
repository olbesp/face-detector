import React from 'react';

import Navigation from 'components/Navigation';
import Logo from 'components/Logo';
import styles from './App.module.scss';

export default function App() {
  return (
    <div className={styles.App}>
      <Navigation />
      <Logo />
    </div>
  );
}
