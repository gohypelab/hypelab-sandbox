import Head from 'next/head';
import styles from '@/styles/Home.module.css';
import { useEffect } from 'react';
import { BannerComponent } from '@/components/BannerComponent';

export default function Ad() {
  return (
    <>
      <Head>
        <title>Banner</title>
        <script src="https://cdn.tailwindcss.com"></script>
      </Head>
      <main className={styles.main}>
        <BannerComponent />
      </main>
    </>
  );
}
