import {useEffect, useRef} from 'react';

export const DataRenderer = ({
  record,
  workerName,
}: {
  record: Record<string, string>;
  workerName: string;
}) => {
  const workerRef = useRef<SharedWorker | null>(null);
  useEffect(() => {
    workerRef.current = new SharedWorker(new URL('./worker', import.meta.url), {
      type: 'module',
      name: workerName,
    });
    workerRef.current.port.start();
    workerRef.current.port.postMessage({type: 'set', data: {record}});

    workerRef.current.port.onmessage = (e) => {
      console.log(
        `WORKER "${workerName}": `,
        'Message received from worker',
        e.data
      );
    };
  }, []);
  return (
    <div>
      {Object.entries(record).map((entry) => {
        return (
          <div
            key={entry[0]}
            style={{display: 'flex', gap: '4px', alignItems: 'center'}}
          >
            <div>{entry[0]}</div>
            <div>{entry[1]}</div>
            <button
              onClick={() => {
                if (workerRef.current)
                  workerRef.current.port.postMessage({type: 'get'});
              }}
            >
              Get
            </button>
          </div>
        );
      })}
    </div>
  );
};
