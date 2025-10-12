'use client';

import React, { useEffect, useState } from 'react';
import { useUnity } from '@/hooks/useUnity';
// The CSS file must be named 'styles.module.css' for this import to work correctly
import styles from './styles.module.css';
import { useRouter } from 'next/navigation';
import fetchAPI from '@/utils/fetchAPI';

const formatLastOpened = (isoString) => {
  const date = new Date(isoString);
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
};

// Project Card Component
const ProjectCard = ({ project }) => {
  const router = useRouter();
  return (
    // Note: All card-related classes already use the 'styles' object
    <div
      className={styles.projectCard}
      onClick={() => router.replace(`/project/${project._id}`)}
    >
      <h3 className={styles.projectTitle}>{project.name}</h3>
      <div className={styles.projectMetadata}>
        <span className={styles.lastOpenedLabel}>Created:</span>
        <span className={styles.lastOpenedValue}>
          {formatLastOpened(project.createdAt)}
        </span>
      </div>
      <button className={styles.projectMenuBtn}>
        <span aria-hidden="true">&#x22EE;</span>
      </button>
    </div>
  );
};

// Main Component
export default function Home() {
  const { user, setloading } = useUnity();
  const router = useRouter();
  const [projects, setProjects] = useState(null);

  useEffect(() => {
    if (!projects) {
      const func = async () => {
        const res = await fetchAPI({ url: '/project/get_all', method: 'get' });
        console.log('user projects', res);
        setProjects(res.projects);
      };
      func();
    }
  }, [projects, setProjects]);

  return (
    // APPLYING CSS MODULES to the main structure classes
    <section className={styles.projectsCatalogueContainer}>
      <div className={styles.welcomeText}>
        Welcome back, {user?.name || 'User'}!
      </div>

      {projects && (
        <>
          {/* Header and Plus Button */}
          <div className={styles.projectsHeader}>
            <h2 className={styles.projectsHeading}>Your Projects</h2>
            <button
              className={styles.newProjectBtn}
              onClick={() => router.replace('/project/new')}
              aria-label="Add New Project"
            >
              <span aria-hidden="true">+</span> New Project
            </button>
          </div>

          {/* Project Grid - This is where the grid layout is applied */}
          <div className={styles.projectsGrid}>
            {projects.map((project) => (
              <ProjectCard key={project._id} project={project} />
            ))}
          </div>
        </>
      )}
    </section>
  );
}
