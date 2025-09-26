import React from 'react';
import CTFChallengeView from "@/presentation/views/CTF/CTFChallengeView";

export default function Page({
  searchParams,
}: {
  searchParams?: { id?: string };
}) {
  const id = searchParams?.id;
  return (
    <div>
      {/* Si no hay id, la vista lo manejará mostrando un estado vacío */}
      <CTFChallengeView id={id} />
    </div>
  );
}