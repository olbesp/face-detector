import React from 'react';
import styles from './styles.module.scss';

export default function FaceRecognition({ src, frames }) {
  return (
    <div className={styles.FaceRecognition}>
      <img src={src} alt="" className={styles.FaceRecognition__image} />
      {frames.length > 0 &&
        frames.map((frame, i) => (
          <div
            key={i}
            className={styles.FaceRecognition__frame}
            style={{
              top: `${frame.top_row * 100}%`,
              left: `${frame.left_col * 100}%`,
              right: `${100 - frame.right_col * 100}%`,
              bottom: `${100 - frame.bottom_row * 100}%`
            }}
          />
        ))}
    </div>
  );
}
