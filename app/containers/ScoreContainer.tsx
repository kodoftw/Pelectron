import React, { useState, useEffect } from 'react';

import Score from '../components/Score/Score';
import { MessageType } from '../models/Messages';

const ScoreContainer: React.FC = () => {
  const [score, setScore] = useState(0);

  useEffect(() => {
    window.addEventListener(MessageType.OnBulletPadCollision, () => {
      setScore(score => score + 1);
    });
  }, []);

  return <Score score={score} />;
};

export default ScoreContainer;
