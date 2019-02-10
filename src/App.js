import React, { useState } from 'react';
import Clarifai from 'clarifai';

import Particles from 'react-particles-js';
import Navigation from 'components/Navigation';
import Logo from 'components/Logo';
import ImageLinkForm from 'components/ImageLinkForm';
import FaceRecognition from 'components/FaceRecognition';
import Rank from 'components/Rank';
import styles from './App.module.scss';

const app = new Clarifai.App({
  apiKey: process.env.REACT_APP_CLARIFAI_API_KEY
});

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

export default function App() {
  const [input, setInput] = useState('');
  const [imgUrl, setImgUrl] = useState('');
  const [frames, setFrames] = useState([]);

  const onSubmit = () => {
    setImgUrl(input);
    setFrames([]);
    app.models
      .predict(Clarifai.FACE_DETECT_MODEL, input)
      .then(response => {
        const { regions } = response.outputs[0].data;
        const boundingBoxes = regions.map(
          region => region.region_info.bounding_box
        );
        setFrames(boundingBoxes);
      })
      .catch(error => {
        console.log(error);
      });
  };

  return (
    <div className={styles.App}>
      <Particles className={styles.App__particles} params={particlesOptions} />
      <Navigation />
      <Logo />
      <div className={styles.App__content}>
        <Rank />
        <ImageLinkForm
          onChange={e => setInput(e.target.value)}
          value={input}
          onSubmit={onSubmit}
        />
      </div>
      <FaceRecognition src={imgUrl} frames={frames} />
    </div>
  );
}
