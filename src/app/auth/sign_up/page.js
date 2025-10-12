'use client';

import React, { useState } from 'react';
import styles from '../styles.module.css'; // Adjust path as needed
import fetchAPI from '@/utils/fetchAPI.js'; // Adjust path as needed
import { useRouter } from 'next/navigation';
import { useUnity } from '@/hooks/useUnity'; // Adjust path as needed
import Link from 'next/link';

export default function SignUpForm() {
  const router = useRouter();
  const { setUser } = useUnity();
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const form = event.currentTarget;
    const userData = {
      name: form.name.value,
      email: form.email.value,
      password: form.password.value,
    };
    console.log('User data', userData);
    const res = await fetchAPI({
      url: '/auth/sign_up',
      body: { user: userData },
      method: 'post',
    });
    console.log('res:', res);
    if (res.success) {
      setUser(res.user);
      router.replace('/home');
    }
    setLoading(false);
  };

  return (
    <section className={styles.container}>
      <div className={styles.formContainer}>
        <h2 className={styles.title}>Create Your Account</h2>
        <p className={styles.subtitle}>
          Join ProductX today and simplify your workflow.
        </p>
        <p className={styles.subtitle}>{loading ? 'Loading...' : ''}</p>

        <form className={styles.form} onSubmit={handleSubmit}>
          <div className={styles.formGroup}>
            <label htmlFor="name" className={styles.label}>
              Full Name
            </label>
            <input
              type="text"
              id="name"
              className={styles.input}
              placeholder="John Doe"
              required
            />
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="email" className={styles.label}>
              Email Address
            </label>
            <input
              type="email"
              id="email"
              className={styles.input}
              placeholder="john.doe@example.com"
              required
            />
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="password" className={styles.label}>
              Password
            </label>
            <input
              type="password"
              id="password"
              className={styles.input}
              placeholder="••••••••"
              required
            />
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="confirmPassword" className={styles.label}>
              Confirm Password
            </label>
            <input
              type="password"
              id="confirmPassword"
              className={styles.input}
              placeholder="••••••••"
              required
            />
          </div>

          <div className={styles.checkboxGroup}>
            <input
              type="checkbox"
              id="terms"
              className={styles.checkbox}
              required
            />
            <label htmlFor="terms" className={styles.checkboxLabel}>
              I agree to the{' '}
              <a href="#" className={styles.termsLink}>
                Terms of Service
              </a>{' '}
              and{' '}
              <a href="#" className={styles.termsLink}>
                Privacy Policy
              </a>
              .
            </label>
          </div>

          <button type="submit" className={styles.submitButton}>
            Sign Up
          </button>
        </form>

        <p className={styles.loginPrompt}>
          Already have an account?{' '}
          <Link href="/auth/login" className={styles.loginLink}>
            Log in here
          </Link>
          .
        </p>
      </div>
    </section>
  );
}
