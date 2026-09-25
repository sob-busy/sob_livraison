import { notFound } from "next/navigation";

// Any unknown URL inside /fr or /en shows the translated 404 page
export default function CatchAllPage() {
  notFound();
}
