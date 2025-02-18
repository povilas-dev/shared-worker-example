const workerStorage: Record<string, Record<string, string>> = {};

self.onmessage = (event) => {
  const {data, type, componentName} = event.data as {
    data: any;
    type: string;
    componentName: string;
  };
  console.log('dedicated-worker: ', event.data);
  if (type === 'set' && componentName && data.record) {
    Object.entries(data.record).forEach((entry) => {
      const [key, value] = entry as [string, string];
      if (!workerStorage[componentName]) {
        workerStorage[componentName] = {};
      }
      workerStorage[componentName][key] = value;
    });
  }

  if (type === 'get') {
    self.postMessage({type: 'get', componentName, data: workerStorage});
  }
};
