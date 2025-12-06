import type {ReactNode} from 'react';
import clsx from 'clsx';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';
import Heading from '@theme/Heading';

import styles from './index.module.css';

function HomepageHeader() {
  const {siteConfig} = useDocusaurusContext();

  return (
    <header className={clsx('hero', styles.heroBanner)}>
      <div className="container">
        <div className="row row--align-center">
          
          {/* LEFT CONTENT */}
          <div className="col col--6">
            <Heading as="h1" className={styles.heroTitle}>
              {siteConfig.title}
            </Heading>
            <p className={styles.heroSubtitle}>
              {siteConfig.tagline}
            </p>

            <p className={styles.heroDescription}>
              A complete guide to <b>Embodied Intelligence</b>, <b>Physical AI</b> and
              <b> Humanoid Robotics</b> — designed for students, researchers and engineers 
              ready to build the future.
            </p>

            <div className={styles.buttons}>
              <Link
                className="button button--primary button--lg margin-right--sm"
                to="/docs/intro">
                Start Reading
              </Link>

              <Link
                className="button button--outline button--lg"
                to="/docs/intro">
                View Chapters
              </Link>
            </div>
          </div>

          {/* RIGHT IMAGE */}
          <div className="col col--6 text--center">
            <img
              src="img/book-cover.jpg"
              alt="Book Cover"
              className={styles.heroImage}
            />
          </div>

        </div>
      </div>
    </header>
  );
}

export default function Home(): ReactNode {
  return (
    <Layout
      title="Embodied Intelligence Guide"
      description="A complete guide to Physical AI, Humanoid Robotics and Simulated Intelligence Systems">

      <HomepageHeader />

      <main>

        {/* ABOUT SECTION */}
        <section className={styles.section}>
          <div className="container">
            <h2 className="text--center margin-bottom--lg">
              What You Will Learn
            </h2>

            <div className="row">
              <div className="col col--4">
                <div className={styles.card}>
                  <h3>Robotics Fundamentals</h3>
                  <p>
                    Understand kinematics, perception, actuation, control systems and 
                    intelligent decision-making in robots.
                  </p>
                </div>
              </div>

              <div className="col col--4">
                <div className={styles.card}>
                  <h3>Simulation & Digital Twins</h3>
                  <p>
                    Learn Gazebo, Unity, and NVIDIA Isaac to create digital environments
                    for robotic training and testing.
                  </p>
                </div>
              </div>

              <div className="col col--4">
                <div className={styles.card}>
                  <h3>AI Brain Integration</h3>
                  <p>
                    Build Vision-Language-Action pipelines and integrate AI models
                    to power humanoid intelligence.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* HIGHLIGHTS */}
        <section className={clsx(styles.sectionAlt)}>
          <div className="container">
            <div className="row row--align-center">

              <div className="col col--6">
                <h2>Why This Book?</h2>
                <ul className={styles.list}>
                  <li>✔ Step-by-step learning path</li>
                  <li>✔ Practical labs & simulations</li>
                  <li>✔ Modern AI + Robotics integration</li>
                  <li>✔ Beginner to Advanced friendly</li>
                  <li>✔ Perfect for research & career</li>
                </ul>
              </div>

              <div className="col col--6 text--center">
                <img
                  src="img/why.jpg"
                  alt="Robot"
                  className={styles.sectionImage}
                />
              </div>

            </div>
          </div>
        </section>

        {/* CTA */}
        <section className={styles.section}>
          <div className="container text--center">
            <h2>Start Your Journey Today</h2>
            <p>
              Explore the world of humanoid intelligence and future robotics systems.
            </p>

            <Link
              className="button button--primary button--lg"
              to="/docs/intro"
            >
              Read First Chapter
            </Link>
          </div>
        </section>

      </main>
    </Layout>
  );
}
