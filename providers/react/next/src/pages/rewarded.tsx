import Head from 'next/head';
import styles from '@/styles/Home.module.css';
import { RewardedComponent } from '@/components/RewardedComponent';

export default function Ad() {
  return (
    <>
      <Head>
        <title>Rewarded</title>
        <script src="https://cdn.tailwindcss.com"></script>
      </Head>
      <main className={styles.main}>
        <RewardedComponent />
      </main>
    </>
  );
}
