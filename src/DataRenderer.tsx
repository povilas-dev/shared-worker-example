import {useEffect} from 'react';

const WORKER_ID = 'my-custom-worker';

export const DataRenderer = ({
  record,
  componentName,
}: {
  record: Record<string, string>;
  componentName: string;
}) => {
  useEffect(() => {
    if (!window[WORKER_ID]) {
      window[WORKER_ID] = new Worker(
        new URL('./dedicated-worker', import.meta.url),
        {
          type: 'module',
        }
      );
    }
    window[WORKER_ID].postMessage({type: 'set', componentName, data: {record}});

    window[WORKER_ID].addEventListener('message', (e) => {
      if (e.data.type === 'get' && e.data.componentName === componentName)
        console.log(WORKER_ID, e.data);
    });
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
                if (window[WORKER_ID])
                  window[WORKER_ID].postMessage({type: 'get', componentName});
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
