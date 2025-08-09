"use client";
import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import styles from "./AboutProject.module.css"


const ABOUTME = () => {
  const router = useRouter();

  return (
    <div className={styles.background}>
    
    <header className={styles.header}>
  <div className={styles.left}>
    <img src="/Logo1.svg" alt="Logo" className={styles.logo} />
  </div>

  <nav className={styles.center}>
    <Link href="/">Inicio</Link>
    <Link href="/catalogo/bebidas">Productos</Link>
    <Link href="/aboutme/">Sobre nosotros</Link>
  </nav>

  <div className={styles.right}></div> {}
</header>

<div className={styles.container}>
      <div className={styles.card}>
        <h1 className={styles.title}>Sobre el Proyecto</h1>
        <p className={styles.description}>
          Este proyecto es una tienda virtual enfocada en la venta de bebidas y repostería. Los usuarios pueden explorar un catálogo atractivo, ver calificaciones, agregar productos al carrito, y gestionar su compra con una experiencia fluida gracias al uso de React, Next.js, y un backend conectado a una base de datos con API REST.
        </p>
        <p className={styles.description}>
          Se desarrolló con la intención de practicar conceptos como paginación, manejo de estado global (context), diseño responsivo y comunicación cliente-servidor usando Axios.
        </p>
        <Link href="https://github.com/jose230203" target="_blank">
          <button className={styles.githubButton}>Ver en GitHub</button>
        </Link>
      </div>
    </div>
    </div>

  );
};

export default ABOUTME;
