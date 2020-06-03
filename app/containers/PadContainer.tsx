import React, { useEffect, useState } from 'react';

import Pad from '../components/Pad/Pad';
import PadEntity from '../entities/Pad.entity';
import { PadPosition } from '../models/Pad';
import InputHandler, { Keybinds } from '../services/InputHandler';

type PadContainerProps = {
  pad: PadEntity | undefined;
  inputHandler: InputHandler;
};

const PadContainer: React.FC<PadContainerProps> = ({ pad, inputHandler }) => {
  const [padPosition, setPadPosition] = useState<PadPosition | undefined>();

  useEffect(() => {
    inputHandler.registerKeybindAction([Keybinds.Left, Keybinds.A], () => {
      pad?.MoveLeft();
      setPadPosition(pad?.Position);
    });
    inputHandler.registerKeybindAction([Keybinds.Right, Keybinds.D], () => {
      pad?.MoveRight();
      setPadPosition(pad?.Position);
    });
    setPadPosition(pad?.Position);
  }, [pad]);

  return <Pad pad={pad} position={padPosition} />;
};

export default PadContainer;
