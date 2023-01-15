import { useState } from 'react';

import Runway from './Runway';
import Carosuel from './Carosuel';

const CAPACITY = 10;

const VirtualBar = () => {
  // const [] = useState();
  return (
    <div>
      <Runway>
        <Carosuel />
        <Carosuel />
        <Carosuel />
        <Carosuel />
        <Carosuel />
      </Runway>
    </div>
  );
};

export default VirtualBar;
