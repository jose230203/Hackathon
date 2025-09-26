import React from "react";
import AcademiaHomeAcademyView from "../../../../presentation/views/Academia/AcademiaHomeAcademyView";

export default async function HomeAcademyByIdPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  return <AcademiaHomeAcademyView academiaId={id} />;
}
