import React, { useState, Fragment } from 'react';
import Clarifai from 'clarifai';

import Background from 'components/Background';
import Navigation from 'components/Navigation';
import Logo from 'components/Logo';
import ImageLinkForm from 'components/ImageLinkForm';
import FaceRecognition from 'components/FaceRecognition';
import Rank from 'components/Rank';
import Signin from 'components/Signin';
import styles from './App.module.scss';

const app = new Clarifai.App({
  apiKey: process.env.REACT_APP_CLARIFAI_API_KEY
});

export default function App() {
  const [input, setInput] = useState('');
  const [imgUrl, setImgUrl] = useState('');
  const [frames, setFrames] = useState([]);
  const [route] = useState('signin');

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
      <Background isGlobal />
      <Navigation />
      <Logo />
      {route === 'signin' ? (
        <Signin />
      ) : (
        <Fragment>
          <div className={styles.App__content}>
            <Rank />
            <ImageLinkForm
              onChange={e => setInput(e.target.value)}
              value={input}
              onSubmit={onSubmit}
            />
          </div>
          <FaceRecognition src={imgUrl} frames={frames} />
        </Fragment>
      )}
    </div>
  );
}
