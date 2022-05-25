import dynamic from "next/dynamic";

//////////////////////////// we need this dynamic import, due to our next.js usage
/////////////////////////// https://nextjs.org/docs/advanced-features/dynamic-import#with-no-ssr
const Map = dynamic(() => import("../components/Map"), { ssr: false });

export default function Home() {
  return (
    <>
      <Map />
    </>
  );
}
