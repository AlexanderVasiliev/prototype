import React from 'react';
import type { FC } from 'react';

import { Logging, useActionHandler } from '../log';
import { Placement } from '../log/placement';

interface IPageProps {
  
}

enum Places {
  SN = 'SN',
  SM = 'SM',
  B = 'B',
  H = 'H',
}

enum ActionTypes {
  CLICK = 'click',
}

const actions = new Map([
  [[Places.SN, Places.H], () => {}]
]);

const Button = () => {
  const action = useActionHandler();

  return <button onClick={() => action(ActionTypes.CLICK, { hello: 'world' })}>button</button>
};

export const Page: FC<IPageProps> = () => {
  return (
    <Logging actions={actions}>
      <Placement place={Places.SN}>
        <Placement place={Places.SM}/>
        <Placement place={Places.B}>
          <Placement place={Places.H}>
            <Button />
          </Placement>
        </Placement>
      </Placement>
      <Placement place={Places.H}>
        <Placement place={Places.SM}/>
      </Placement>
      <Placement place={Places.B}>
        <Placement place={Places.H}/>
      </Placement>
      <Placement place={Places.SN}/>
    </Logging>
  );
};

