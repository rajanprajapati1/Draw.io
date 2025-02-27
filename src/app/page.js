// Use a unique name for the dynamic import to avoid collision
import dynamicImport from "next/dynamic";

// Set the page to render dynamically (skip prerendering)
export const dynamic = "force-dynamic";

// Dynamically import the Canvas component (assuming ExcalidrawWrapper is now Canvas)
const ExcalidrawWrapper = dynamicImport(() => import("../components/Canvas"), {
  ssr: false, // Disable server-side rendering
});

export default function Home() {
  return (
    <main>
      <ExcalidrawWrapper />
    </main>
  );
}
