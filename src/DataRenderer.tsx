import {useEffect} from 'react';

export const DataRenderer = ({record}: {record: Record<string, string>}) => {
  useEffect(() => {
    const myWorker = new SharedWorker(new URL('./worker', import.meta.url), {
      type: 'module',
    });
    myWorker.port.start();
    myWorker.port.postMessage({type: 'set', data: {record}});

    myWorker.port.onmessage = (e) => {
      console.log('Message received from worker', e.data);
    };
  }, []);
  return (
    <div>
      {Object.entries(record).map((entry) => {
        return (
          <div key={entry[0]} style={{display: 'flex', gap: '4px'}}>
            <div>{entry[0]}</div>
            <div>{entry[1]}</div>
          </div>
        );
      })}
    </div>
  );
};
