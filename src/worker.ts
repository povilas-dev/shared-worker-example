console.log('worker!');

const workerStorage: Record<string, string> = {};
onconnect = (e) => {
  const port = e.ports[0];
  console.log('connect', {port});

  port.addEventListener('message', (e) => {
    const {data, type} = e.data;
    console.log({data, type});
    if (type === 'set' && data.record) {
      Object.entries(data.record).forEach((entry) => {
        workerStorage[entry[0]] = entry[1] as string;
      });
    }
    if (type === 'get') {
      port.postMessage(workerStorage);
    }
    console.log({workerStorage});
    // const workerResult = `Result: ${e.data[0] * e.data[1]}`;
    port.postMessage(workerStorage);
  });

  port.start(); // Required when using addEventListener. Otherwise called implicitly by onmessage setter.
};
