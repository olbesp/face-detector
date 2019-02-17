import React from 'react';
import Particles from 'react-particles-js';

import styles from './styles.module.scss';

const Background = React.memo(({ isGlobal }) => {
  const particlesOptions = {
    particles: {
      number: {
        value: 80,
        density: {
          enable: true,
          value_area: 800
        }
      }
    }
  };

  return (
    <Particles
      className={isGlobal ? styles.Background_global : styles.Background_local}
      params={particlesOptions}
    />
  );
});

export default Background;
