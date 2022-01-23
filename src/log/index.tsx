import React, { createContext, useContext, useCallback } from 'react';

import { usePlace } from './placement';

interface IHandleAction {
  (actionType: string, path: string[], payload: Record<string, unknown>): void
}

const HandleLog = createContext<{ handleAction: IHandleAction }>({ handleAction: () => {} });

const useLogAction = (): IHandleAction => {
  const { handleAction } = useContext(HandleLog) ?? { handleAction: () => {} };

  return handleAction;
};

interface ILoggingProps {
  actions: Map<Array<string | number>, (actionType: string, payload: Record<string, unknown>) => void>;
}

const findAction = (actions: ILoggingProps['actions'], actionType: string, path: string[]) => {
  let result;
  actions.forEach((fn, key) => {
    // TODO (а можно ли использовать частичные пути или это не консистентно?)
  });
  return (payload: any) => {
    console.log(actions, actionType, path);
  };
};

export const Logging: React.FC<ILoggingProps> = ({ actions, children }) => {
  const handleAction = useCallback((actionType: string, path: string[], payload: Record<string, unknown>) => {
    const action = findAction(actions ,actionType, path);
    action(payload);
  }, [actions]);

  return <HandleLog.Provider value={{ handleAction }}>{children}</HandleLog.Provider>
};

export const useActionHandler = () => {
  const path = usePlace();
  const handleAction = useLogAction();

  return useCallback((actionType: string, payload: Record<string, unknown>) => {
    handleAction(actionType, path, payload);
  }, [path, handleAction]);
};
