"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

import Link from "next/link";

// API / STORE

import { useAuthStore } from "../../../../lib/store/authStore";
import { editProfile } from "../../../../lib/clientApi";

// TYPES

import { RegisterRequest } from "../../../../types/user";

// MEDIA

import css from "./EditProfilePage.module.css";
import Image from "next/image";

export default function EditPage() {
  const router = useRouter();
  const { user } = useAuthStore();
  const [error, setError] = useState("");

  console.log(user);

  const setUser = useAuthStore((state) => state.setUser);

  const hundleEditProfile = async (formData: FormData) => {
    try {
      const formValues = Object.fromEntries(formData) as RegisterRequest;
      console.log(formValues);

      const res = await editProfile(formValues);
      // Виконуємо редірект або відображаємо помилку
      if (res) {
        setUser(res);

        router.push("/profile");
      } else {
        setError("Invalid email or password");
      }
    } catch (error) {
      console.log("error", error);
      setError("Invalid email or password");
    }
  };

  return (
    <main className={css.mainContent}>
      <div className={css.profileCard}>
        <h1 className={css.formTitle}>Edit Profile</h1>
        <Image
          src="/images/avatar.png"
          alt="User Avatar"
          width={120}
          height={120}
          className={css.avatar}
        />
        <form
          onSubmit={async (e) => {
            e.preventDefault();
            const formData = new FormData(e.currentTarget);
            await hundleEditProfile(formData);
          }}
          className={css.profileInfo}
        >
          <div className={css.usernameWrapper}>
            <label htmlFor="username">Username:</label>
            <input
              id="username"
              name="username"
              type="text"
              className={css.input}
              required
            />
          </div>

          <p>Email: {user?.email}</p>

          <div className={css.actions}>
            <button type="submit" className={css.saveButton}>
              Save
            </button>
            <Link href="/profile">
              <button type="button" className={css.cancelButton}>
                Cancel
              </button>
            </Link>
          </div>
        </form>
        {error && <p>{error}</p>}
      </div>
    </main>
  );
}
