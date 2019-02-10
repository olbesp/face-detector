import React from 'react';
import styles from './styles.module.scss';

export default function ImageLinkForm() {
  return (
    <div className={styles.ImageLinkForm}>
      <p className={styles.ImageLinkForm__description}>
        This app will detect faces in your pictures.
      </p>
      <div className={styles.ImageLinkForm__form}>
        <div className={styles.ImageLinkForm__form_inner}>
          <input type="text" className={styles.ImageLinkForm__form__input} />
          <button className={styles.ImageLinkForm__form__button} type="submit">
            Detect
          </button>
        </div>
      </div>
    </div>
  );
}
