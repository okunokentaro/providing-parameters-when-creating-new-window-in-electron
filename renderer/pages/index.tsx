import { useEffect, useCallback } from "react";
import Link from "next/link";
import Layout from "../components/Layout";

const IndexPage = () => {
  useEffect(() => {
    const handleMessage = (_event, args) => alert(args);
    const dispose = globalThis.ipcRenderer.on("message", handleMessage);
    return () => dispose();
  }, []);

  const onSayHiClick = useCallback(() => {
    globalThis.ipcRenderer.send("message", "hi from next");
  }, []);

  return (
    <Layout title="Home | Next.js + TypeScript + Electron Example">
      <h1>Hello Next.js 👋</h1>
      <button onClick={onSayHiClick}>Say hi to electron</button>
      <p>
        <Link href="/about">About</Link>
      </p>
    </Layout>
  );
};

export default IndexPage;
