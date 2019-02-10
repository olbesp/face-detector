import React from 'react';

import Navigation from 'components/Navigation';
import Logo from 'components/Logo';
import ImageLinkForm from 'components/ImageLinkForm';
import styles from './App.module.scss';

export default function App() {
  return (
    <div className={styles.App}>
      <Navigation />
      <Logo />
      <ImageLinkForm />
    </div>
  );
}
