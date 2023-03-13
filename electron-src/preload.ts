import { ipcRenderer, contextBridge } from "electron";

type Tail<T> = T extends [unknown, ...infer REST] ? REST : never;

contextBridge.exposeInMainWorld("ipcRenderer", {
  send: (
    channel: Parameters<typeof ipcRenderer.send>[0],
    ...args: Tail<Parameters<typeof ipcRenderer.send>>
  ): ReturnType<typeof ipcRenderer.send> => {
    return ipcRenderer.send(channel, ...args);
  },
  on: (
    channel: Parameters<typeof ipcRenderer.on>[0],
    listener: Parameters<typeof ipcRenderer.on>[1],
    ...args: Tail<Tail<Parameters<typeof ipcRenderer.on>>>
  ): () => ReturnType<typeof ipcRenderer.removeListener> => {
    ipcRenderer.on(channel, listener, ...args);
    return () => ipcRenderer.removeListener(channel, listener);
  },
});
