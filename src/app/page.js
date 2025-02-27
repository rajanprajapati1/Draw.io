export const dynamic = "force-dynamic"; 
import dynamic from "next/dynamic";
const ExcalidrawWrapper = dynamic(() => import("../components/Canvas"), { ssr: false });

export default function Home() {
  return (
    <main>
      <ExcalidrawWrapper />
    </main>
  );
}
