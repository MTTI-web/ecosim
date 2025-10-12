import Head from 'next/head';
import styles from './page.module.css'; // Adjust path as needed
import Link from 'next/link';

export default function MinimalLandingPage() {
  return (
    <>
      <Head>
        <title>EcoSim: The Ultimate City Simulator</title>
        <meta
          name="description"
          content="Design, simulate, and observe your perfect (or imperfect) city. Control every factor."
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <section className={styles.container}>
        <section className={styles.hero}>
          <h1 className={styles.heroTitle}>
            Design Your <span className={styles.highlight}>Metropolis</span>.
            Observe the Results.
          </h1>
          <p className={styles.heroSubtitle}>
            EcoSim is the ultimate city simulator where you make the decisions
            and you see the consequences.
          </p>
          <Link href="/project/new" className={styles.ctaButton}>
            Start a new project
          </Link>
          <Link
            href="https://youtu.be/auSkS7mcm9Y"
            className={styles.ctaButton}
            target="_blank"
          >
            Demo video
          </Link>
        </section>

        <section id="features" className={styles.features}>
          <div className={styles.featureItem}>
            <h3>Deep Control Factors</h3>
            <p>
              Adjust numerous variables like food production,tax rates, and
              zoning laws to control the growth of your city.
            </p>
          </div>
          <div className={styles.featureItem}>
            <h3>Real-Time Analytics</h3>
            <p>
              Instantly view key metrics: Population trends, Pollution levels,
              Food reserves, and Fuel reserves.
            </p>
          </div>
          <div className={styles.featureItem}>
            <h3>Complex Simulation Engine</h3>
            <p>
              Our engine models realistic interactions, leading to emergent
              challenges like traffic, acute pollution or a food crisis.
            </p>
          </div>
        </section>

        <footer className={styles.footer}>
          <p>
            &copy; {new Date().getFullYear()} Parabola Games. All rights
            reserved.
          </p>
        </footer>
      </section>
    </>
  );
}
