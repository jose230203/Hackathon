import React from "react";
import AcademiaDetailView from "../../../presentation/views/Academia/AcademiaDetailView";

export default async function AcademiaByIdPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  return <AcademiaDetailView academiaId={id} />;
}
