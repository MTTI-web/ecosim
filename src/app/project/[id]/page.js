'use client';
import { useRef, useState } from 'react';
import { useUnity } from '@/hooks/useUnity';
import styles from '../styles.module.css';
import { UnityContainer } from '@/components/UnityContainer';
import { useEffect } from 'react';
import fetchAPI from '@/utils/fetchAPI';
import { useRouter } from 'next/navigation';

function FormInput({
  type,
  placeholder,
  defaultValue,
  min,
  id,
  max,
  onBlur,
  onFocus,
  className,
  disabled,
  ref,
}) {
  const { sendMessage, playing } = useUnity();

  return (
    <input
      type={type}
      name={id}
      defaultValue={defaultValue}
      placeholder={placeholder}
      className={`input ${className}`}
      min={min}
      ref={ref}
      max={max}
      disabled={disabled}
      onBlur={() => {
        sendMessage('Canvas', 'ReleaseCapture');
        if (onBlur) onBlur();
      }}
      onFocus={() => {
        sendMessage('Canvas', 'StartCapture');
        console.log('focused');
        if (onFocus) onFocus();
      }}
    />
  );
}

async function getData(params, setProject, setloading, titleRef, router) {
  const resolvedParams = await params;
  const { id } = resolvedParams;
  console.log('Project id:', id);
  if (id == 'new') {
    return;
  } else {
    setloading(true);
    const res = await fetchAPI({
      url: `/project/get`,
      method: 'post',
      body: { id },
    });
    setloading(false);
    if (res.success) {
      setProject(res.project);
      titleRef.current.value = res.project.name;
    } else {
      router.replace('/project/new');
    }
    console.log('get project response:', res);
  }
}

export default function UnityPage({ params }) {
  const { sendMessage, user, setUser, setloading, stats, loading, playing } =
    useUnity();
  const [project, setProject] = useState(null);
  const [owner, setOwner] = useState(null);
  const titleRef = useRef(null);
  const router = useRouter();
  useEffect(() => {
    if (!project) {
      getData(params, setProject, setloading, titleRef, router);
    }
  }, [params, setProject, setloading, project, titleRef]);

  useEffect(() => {
    console.log('owner', project, user);
    if (loading) return;
    if (project && user) {
      if (project.owner == user._id) {
        setOwner(true);
      } else {
        setOwner(false);
      }
    } else if (!project && user) {
      setOwner(true);
    }
  }, [project, user]);

  const handleSave = async (event) => {
    event.preventDefault();
    const title = titleRef.current?.value || 'Untitled Project';
    console.log('User data', user);
    if (!project) {
      setloading(true);
      const res = await fetchAPI({
        url: '/project/create',
        body: { user, project: { name: title, initialStats: stats } },
        method: 'post',
      });
      console.log('res:', res);
      if (res.success) {
        setUser(res.user);
        router.replace(`/project/${res.project._id}`);
      }
      setloading(false);
    } else {
      if (owner) {
        setloading(true);
        const res = await fetchAPI({
          url: '/project/update',
          method: 'post',
          body: {
            id: project._id,
            updates: { name: title, initialStats: stats },
          },
        });
        console.log('project updated res: ', res);
        if (res.success) {
          console.log('project updated successfully.');
          setProject(res.project);
        }
        setloading(false);
      } else if (owner === false) {
        setloading(true);
        const res = await fetchAPI({
          url: '/project/create',
          body: { user, project: { name: title, initialStats: stats } },
          method: 'post',
        });
        console.log('res:', res);
        if (res.success) {
          setUser(res.user);
          router.replace(`/project/${res.project._id}`);
        }
        setloading(false);
      }
    }
  };

  return (
    <section className={`unity-page ${styles.page}`}>
      <main className={styles.mainGrid}>
        <div className={styles.controlPanel}>
          <div className={styles.controlPanelHeading} title="Save Project">
            <FormInput
              type="text"
              defaultValue={project ? project.name : 'Untitled Project'}
              placeholder="Project Title"
              ref={titleRef}
              disabled={!owner}
              className={styles.projectTitleInput}
              id="projectTitle"
            />
            <div className={styles.saveButton} onClick={handleSave}>
              <svg
                stroke="currentColor"
                fill="currentColor"
                strokeWidth="0"
                viewBox="0 0 448 512"
                height="1em"
                width="1em"
                xmlns="http://www.w3.org/2000/svg"
                data-darkreader-inline-fill=""
                data-darkreader-inline-stroke=""
              >
                <path d="M433.941 129.941l-83.882-83.882A48 48 0 0 0 316.118 32H48C21.49 32 0 53.49 0 80v352c0 26.51 21.49 48 48 48h352c26.51 0 48-21.49 48-48V163.882a48 48 0 0 0-14.059-33.941zM224 416c-35.346 0-64-28.654-64-64 0-35.346 28.654-64 64-64s64 28.654 64 64c0 35.346-28.654 64-64 64zm96-304.52V212c0 6.627-5.373 12-12 12H76c-6.627 0-12-5.373-12-12V108c0-6.627 5.373-12 12-12h228.52c3.183 0 6.235 1.264 8.485 3.515l3.48 3.48A11.996 11.996 0 0 1 320 111.48z"></path>
              </svg>
            </div>
          </div>
          {playing !== null && (
            <form id="initial-stats-form">
              <div className={styles.category}>
                <h2
                  onClick={() => {
                    sendMessage('Canvas', 'GetMapCompressed');
                  }}
                >
                  Fossil Fuels
                </h2>
                <div className={styles.inputGroup}>
                  <label htmlFor="coal">Coal</label>
                  <FormInput
                    disabled={playing}
                    type="number"
                    id="Coal"
                    defaultValue="50000"
                    value
                  />
                </div>
                <div className={styles.inputGroup}>
                  <label htmlFor="petrol">Petrol</label>
                  <FormInput
                    disabled={playing}
                    type="number"
                    id="Petrol"
                    defaultValue="1000000"
                  />
                </div>
              </div>

              {/* Category 2 */}
              <div className={styles.category}>
                <h2>Demographic</h2>
                <div className={styles.inputGroup}>
                  <label htmlFor="population">Population</label>
                  <FormInput
                    disabled={playing}
                    type="number"
                    id="PeopleCount"
                    defaultValue="1000000"
                  />
                </div>
                <div className={styles.inputGroup}>
                  <label htmlFor="liability">Liability Percentage</label>
                  <FormInput
                    disabled={playing}
                    type="range"
                    id="liability"
                    min="0"
                    max="100"
                    defaultValue="20"
                  />
                </div>
                <div className={styles.inputGroup}>
                  <label htmlFor="CarPerPeople">Car per person (0-1)</label>
                  <FormInput
                    disabled={playing}
                    type="range"
                    id="CarPerPeople"
                    min="0"
                    max="100"
                    defaultValue="50"
                  />
                </div>
                <div className={styles.inputGroup}>
                  <label htmlFor="BirthRate">Birth rate</label>
                  <FormInput
                    disabled={playing}
                    type="range"
                    id="BirthRate"
                    min="0"
                    max="100"
                    defaultValue="50"
                  />
                </div>
                <div className={styles.inputGroup}>
                  <label htmlFor="DeathRate">Death rate</label>
                  <FormInput
                    disabled={playing}
                    type="range"
                    id="DeathRate"
                    min="0"
                    max="100"
                    defaultValue="50"
                  />
                </div>
              </div>

              <div className={styles.category}>
                <h2>Essentials</h2>
                <div className={styles.inputGroup}>
                  <label htmlFor="Electricity">Electricity</label>
                  <FormInput
                    disabled={playing}
                    type="number"
                    id="Electricity"
                    defaultValue="200000"
                  />
                </div>
                <div className={styles.inputGroup}>
                  <label htmlFor="Food">Food</label>
                  <FormInput
                    disabled={playing}
                    type="number"
                    id="Food"
                    defaultValue="200000"
                  />
                </div>
              </div>
            </form>
          )}
        </div>
        <UnityContainer />
      </main>
    </section>
  );
}
