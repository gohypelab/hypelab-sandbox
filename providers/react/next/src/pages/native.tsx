import Head from 'next/head';
import styles from '@/styles/Home.module.css';
import { NativeComponent } from '@/components/NativeComponent';

export default function Ad() {
  return (
    <>
      <Head>
        <title>Native</title>
        <script src="https://cdn.tailwindcss.com"></script>
      </Head>
      <main className={styles.main}>
        <NativeComponent />
      </main>
    </>
  );
}
