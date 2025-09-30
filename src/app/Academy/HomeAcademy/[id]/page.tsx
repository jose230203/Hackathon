import React from "react";
import AcademiaHomeAcademyView from "../../../../presentation/views/Academia/AcademiaHomeAcademyView";

export default function HomeAcademyByIdPage({ params }: { params: { id: string } }) {
  const { id } = params;
  return <AcademiaHomeAcademyView academiaId={id} />;
}
