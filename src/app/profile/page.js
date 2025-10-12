'use client';

import styles from './styles.module.css'; // Link to our CSS module
import { useUnity } from '@/hooks/useUnity';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import fetchAPI from '@/utils/fetchAPI';

const ProfilePage = () => {
  const { user, loading, setUser, setloading } = useUnity();
  const router = useRouter();

  useEffect(() => {
    if (!user && !loading) {
      router.replace('/auth/login');
    }
  }, [user, loading]);

  return (
    <section className={styles.container}>
      {user ? (
        <main className={styles.mainContent}>
          <h1 className={styles.title}>Your Profile</h1>
          <p className={styles.subtitle}>Manage your personal information.</p>

          <div className={styles.profileCard}>
            <div className={styles.profilePhotoContainer}>
              <img
                src="https://newprofilepic.photo-cdn.net//assets/images/article/profile.jpg?90af0c8"
                alt={`${user.name}'s profile photo`}
                className={styles.profilePhoto}
              />
            </div>
            <div className={styles.profileInfo}>
              <p className={styles.infoLabel}>Name</p>
              <p className={styles.infoValue}>{user.name}</p>

              <p className={styles.infoLabel}>Email</p>
              <p className={styles.infoValue}>{user.email}</p>

              <button
                className={styles.logoutButton}
                onClick={async () => {
                  setloading(true);
                  const data = await fetchAPI({ url: '/auth/sign_out' });
                  setUser(null);
                  setloading(false);
                  router.replace('/');
                  console.log(data);
                }}
              >
                Log out
              </button>
            </div>
          </div>
        </main>
      ) : loading ? (
        <p>Loading...</p>
      ) : null}
    </section>
  );
};

export default ProfilePage;
