import React from 'react';
import clsx from 'clsx';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';
import Heading from '@theme/Heading';
import styles from './index.module.css';

function HomepageHeader() {
  const { siteConfig } = useDocusaurusContext();

  return (
    <header className={styles.hero}>
      <div className="container">
        <div className={styles.heroGrid}>
          {/* Left Side – Text */}
          <div className={styles.heroContent}>
            <Heading as="h1" className={styles.heroTitle}>
              {siteConfig.title}
            </Heading>
            <p className={styles.heroSubtitle}>
              {siteConfig.tagline}
            </p>

            <div className={styles.buttons}>
              <Link
                className="button button--lg button--primary"
                to="/docs/intro"
              >
                Start Learning
              </Link>
            </div>
          </div>

         {/* Right Side – Futuristic Robot Image */}
<div className={styles.heroImageWrapper}>
  <div className={styles.imageGlowWrapper}>
    <img
      src="img/image.jpg"
      alt="Humanoid Robot in Action"
      height={400}
      className={styles.heroImage}
      loading="lazy"
    />
  </div>
  <div className={styles.floatingParticles}></div>
</div>
        </div>
      </div>
    </header>
  );
}

function WhySection() {
  return (
    <section className={styles.whySection}>
      <div className="container text--center">
        <h2 className={styles.whyTitle}>Why This Book?</h2>
        <p className={styles.whySubtitle}>
            The <strong>first complete open-source textbook</strong> that actually teaches you how to 
            build real humanoid robots — from simulation to physical deployment.
          </p>

        <div className={styles.featuresGrid}>
          <div className={styles.featureCard}>
           <Link to="/docs/simulation/sensors" className={styles.featureCard}>
   <span className={styles.icon}>Simulation</span>
   <h3>Isaac Sim Mastery</h3>
   <p>Perfect digital twins before hardware</p>
</Link>

          </div>

          <div className={styles.featureCard}>
              <Link to="/docs/ros-2/concepts" className={styles.featureCard}>
            <span className={styles.icon}>Robotics</span>
            <h3>ROS 2 + Real Control</h3>
            <p>From URDF to walking robots</p>
            </Link>
          </div>

<div className={styles.featureCard}>
           <Link to="/docs/vla/whisper" className={styles.featureCard}>
            <span className={styles.icon}>AI</span>
            <h3>AI Brain for Robots</h3>
            <p>VLA, LLMs, Vision, Speech</p>
            </Link>
       </div>
          </div>
       
      </div>
    </section>
  );
}
export default function Home(): React.ReactNode {
  const { siteConfig } = useDocusaurusContext();

  return (
    <Layout
      title={siteConfig.title}
      description="The ultimate open-source guide to Physical AI & Humanoid Robotics — from simulation to real robots."
    >
      <HomepageHeader />
      <main>
        <WhySection />
      </main>
    </Layout>
  );
}