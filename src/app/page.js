import dynamicImport from "next/dynamic";

export const dynamic = "force-dynamic";

const ExcalidrawWrapper = dynamicImport(() => import("../components/Canvas"), {
  ssr: false,
});

export default function Home() {
  return (
    <main>
      <ExcalidrawWrapper />
    </main>
  );
}