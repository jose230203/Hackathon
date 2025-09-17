import React, { useState, useEffect } from "react";
import Button from "./Button";

interface NewsCardProps {
  title: string;
  description: string;
  category: string;
  onClick?: () => void;
}

const NewsCard: React.FC<NewsCardProps> = ({ title, description, category, onClick }) => {
  const [categoryColor, setCategoryColor] = useState<string>("");

  // Función para seleccionar un color aleatorio
  useEffect(() => {
    const colors = ["#6B64F2", "#AD53F0", "#E9499E"];
    const randomColor = colors[Math.floor(Math.random() * colors.length)];
    setCategoryColor(randomColor);
  }, []);

  const formatDescription = (text: string, wordsPerLine: number) => {
    const words = text.split(" ");
    const lines = [];
    for (let i = 0; i < words.length; i += wordsPerLine) {
      lines.push(words.slice(i, i + wordsPerLine).join(" "));
    }
    return lines;
  };

  return (
    <div className="bg-[#241A49] rounded-lg shadow-lg p-6 w-full max-w-sm min-h-[20rem] flex flex-col justify-between text-left">
  <div>
    <h3
      className="font-['suez-one'] text-xl md:text-3xl font-black mb-3"
      style={{ color: categoryColor }}
    >
      {category}
    </h3>
    <h2 className="font-['suez-one'] text-lg md:text-2xl font-black text-white mb-2">
      {title}
    </h2>
    <p className="font-['orbitron'] text-lg text-gray-300 mb-3">
      {formatDescription(description, 3).map((line, index) => (
        <React.Fragment key={index}>
          {line}
          <br />
        </React.Fragment>
      ))}
    </p>
  </div>
  <Button variant="secondary" onClick={onClick} className="w-full">
    Leer Más
  </Button>
</div>
  );
};

export default NewsCard;