"use client";
import React from 'react';
import styles from './HomePage.module.css';
import Link from 'next/link';
import { useRouter } from 'next/navigation';


const HomePage = () => {
  const router = useRouter();

  return (
    <div className={styles.background}>
    <div className={styles.container}>
    <header className={styles.header}>
  <div className={styles.left}>
    <img src="/Logo1.svg" alt="Logo" className={styles.logo} />
  </div>

  <nav className={styles.center}>
    <Link href="/">Inicio</Link>
    <Link href="/catalogo/bebidas">Productos</Link>
    <Link href="/aboutme/">Sobre nosotros</Link>
  </nav>

  <div className={styles.right}></div> {/* espacio para balancear visualmente */}
</header>

      <section className={styles.main}>
        <h1>Disfrute su cafe con Aroma Digital</h1>
        <p>
          En Aroma Digital, queremos que disfrutes el café a tu manera. <br />
          Visítanos y vive la experiencia de un ambiente acogedor con el aroma inconfundible del café recién preparado. <br />
          O si lo prefieres, haz tu pedido en línea y recibe tu café favorito en la comodidad de tu hogar u oficina.
        </p>
       <button className={styles.button} onClick={() => router.push('/catalogo/bebidas')}>
  Explora Nuestros Productos ⟶
</button>

        <div className={styles.imageGallery}>
        <img src="/Coffe1.svg" alt="Cafe 1" />
          <img src="/Coffe2.svg" alt="Cafe 2" />
          <img src="/Coffe3.svg" alt="Cafe 3" />
          <img src="/Coffe4.svg" alt="Cafe 4" />
          <img src="/Coffe5.svg" alt="Cafe 5" />
        </div>
      </section>
    </div>
    </div>

  );
};

export default HomePage;
