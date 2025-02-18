import {useEffect, useRef} from 'react';

const WORKER_ID: string = 'my-custom-worker';

//@ts-expect-error
let worker = window[WORKER_ID] as Worker | null;

if (!worker) {
  console.log('create worker!');
  worker = new Worker(new URL('./dedicated-worker', import.meta.url), {
    type: 'module',
  });
}

export const DataRenderer = ({
  record,
  componentName,
}: {
  record: Record<string, string>;
  componentName: string;
}) => {
  const isRecordSet = useRef(false);

  useEffect(() => {
    // Send the "set" message only if it hasn't been sent yet, workaround for React 18
    if (!isRecordSet.current) {
      worker.postMessage({type: 'set', componentName, data: {record}});
      isRecordSet.current = true;
    }

    const handleWorkerMessage = (e: MessageEvent) => {
      if (e.data.type === 'get' && e.data.componentName === componentName)
        console.log(componentName, e.data);
    };

    worker.addEventListener('message', handleWorkerMessage);

    return () => {
      if (worker) worker.removeEventListener('message', handleWorkerMessage);
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
                if (worker) worker.postMessage({type: 'get', componentName});
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
