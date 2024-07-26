'use client';

import Image from "next/image";

import tangledDiver from "@/public/tangled_diver.png";

export default function ErrorPAge() {
  return (
    <main className="error">
      <h1>Oops, something went wrong!</h1>
      <p>Please hold on tight untill the problem is resolved. Sorry for the inconvenience!</p>
      <Image src={tangledDiver} alt="Diver being entangled and looking angry" />
    </main>
  );
}
