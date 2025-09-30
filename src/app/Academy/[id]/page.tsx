import React from "react";
import AcademiaDetailView from "../../../presentation/views/Academia/AcademiaDetailView";

export default function AcademiaByIdPage({ params }: { params: { id: string } }) {
  const { id } = params;
  return <AcademiaDetailView academiaId={id} />;
}
