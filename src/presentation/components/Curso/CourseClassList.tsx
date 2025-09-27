import React from "react";
import CourseClassCard from "./CourseClassCard";
import Link from "next/link";

interface ClassItem {
  titulo: string;
  duracion: string;
  imgSrc: string;
  selected?: boolean;
  id?: string; // id de la sesión (opcional para compatibilidad)
}

interface Props {
  clases: ClassItem[];
  cursoId?: string;
}

const CourseClassList: React.FC<Props> = ({ clases, cursoId }) => (
  <div className="flex flex-col gap-2">
    {clases.map((clase, idx) => {
      const content = <CourseClassCard key={idx} {...clase} />;
      // Si viene el id de la sesión, convertir en Link
      return clase.id && cursoId ? (
        <Link key={idx} href={`/curso/${cursoId}/sesion/${clase.id}`} prefetch={false}>
          {content}
        </Link>
      ) : (
        content
      );
    })}
  </div>
);

export default CourseClassList;
