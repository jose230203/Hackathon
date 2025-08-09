"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import styles from "../bebidas/BeverageCatalog.module.css"; // Reutilizamos los estilos de bebidas
import axios from "axios";
import { useCart } from "@/app/context/CartContext"; // Ajusta la ruta según tu estructura

interface Product {
  id: number;
  name: string;
  description: string;
  price: string;
  image: string;
  product_type: string;
  rating: number;
}

const PastryCatalog = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { cart, addToCart, removeFromCart } = useCart();

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/v1/products/paginated?product_type=pastry&limit=10&offset=0")
      .then((res) => setProducts(res.data))
      .catch((err) => console.error("Error fetching pastries:", err));
  }, []);

  const total = cart.reduce((sum, item) => sum + parseFloat(item.price), 0).toFixed(2);

  return (
    <div className={styles.background}>
      <div className={styles.catalogContainer}>
        {/* NAVBAR */}
        <header className={styles.navbar}>
          <img src="/Logo1.svg" alt="Logo" className={styles.logo} />
          <nav>
            <Link href="/homepage">Inicio</Link>
            <Link href="/catalogo/bebidas" className={styles.active}>Productos</Link>
            <Link href="/aboutme/">Sobre nosotros</Link>
          </nav>
          <button className={styles.buttonModal} onClick={() => setIsModalOpen(true)}>
            🛒 C${total}
          </button>
        </header>

        {/* TABS */}
        <div className={styles.tabs}>
          <Link href="/catalogo/bebidas">Bebidas</Link>
          <span className={styles.activeTab}>Repostería</span>
        </div>

        {/* PRODUCT CARDS */}
        <div className={styles.cards}>
          {products.map((product) => (
            <div key={product.id} className={styles.card}>
              <img src={product.image} alt={product.name} />
              <div className={styles.info}>
                <strong>{product.name.toLowerCase()}</strong>
                <p>Precio C${product.price}</p>
                <div className={styles.bottomRow}>
                  <span>⭐{product.rating}</span>
                  <button onClick={() => addToCart(product)}>＋</button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* MODAL */}
        {isModalOpen && (
          <div className={styles.modalOverlay}>
            <div className={styles.modalContent}>
              <h2>🛒 Carrito</h2>
              {cart.length === 0 ? (
                <p>Tu carrito está vacío.</p>
              ) : (
                <>
                  <ul className={styles.cartList}>
                    {cart.map((item, index) => (
                      <li key={index}>
                        {item.name} - C${item.price}
                        <button
                          onClick={() => removeFromCart(index)}
                          className={styles.removeButton}
                        >
                          ⊖
                        </button>
                      </li>
                    ))}
                  </ul>
                  <p><strong>Total: C${total}</strong></p>
                  <button className={styles.payButton}>Pagar con PayPal</button>
                </>
              )}
              <button className={styles.closeButton} onClick={() => setIsModalOpen(false)}>
                Cerrar
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default PastryCatalog;
