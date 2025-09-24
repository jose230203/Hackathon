import React from "react";
import CourseClassCard from "./CourseClassCard";

interface ClassItem {
  titulo: string;
  duracion: string;
  imgSrc: string;
  selected?: boolean;
}

interface Props {
  clases: ClassItem[];
}

const CourseClassList: React.FC<Props> = ({ clases }) => (
  <div className="flex flex-col gap-2">
    {clases.map((clase, idx) => (
      <CourseClassCard key={idx} {...clase} />
    ))}
  </div>
);

export default CourseClassList;
