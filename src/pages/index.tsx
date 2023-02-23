import { type NextPage } from "next";
import Head from "next/head";

import { Timeline } from "../components/Timeline";

const Home: NextPage = () => {
  return (
    <>
      <Head>
        <title>Twitter Clone</title>
        <meta name="description" content="Generated by create-t3-app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <div>
          <Timeline where={undefined} />
        </div>
      </main>
    </>
  );
};

export default Home;
