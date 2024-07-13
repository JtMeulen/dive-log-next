import Image from "next/image";

import confusedDiver from "@/public/confused_diver.png";

export default function NotFoundPage() {
  return (
    <main className="not-found">
      <h1>404 - Page Not Found</h1>
      <p>Sorry, the page you are looking for does not exist.</p>
      <Image src={confusedDiver} alt="Diver and angler fish looking lost" />
    </main>
  );
}
