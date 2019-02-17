import React from 'react';

import styles from './styles.module.scss';

export default function Alert({ content, disableAlert }) {
  let component = null;
  let textContent = content;

  const hideAlert = () => {
    disableAlert();
    component = null;
  };

  if (textContent) {
    if (typeof content !== 'string') {
      textContent = content.toString();
    }
    component = (
      <div className={styles.container} onClick={hideAlert}>
        <div className={styles.Alert}>
          <div className={styles.Alert__content}>{textContent}</div>
        </div>
      </div>
    );
  }

  return component;
}
