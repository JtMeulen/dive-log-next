"use client";

import { useState } from "react";

import styles from "./ImagePicker.module.css";
import Image from "next/image";

export default function Input({ label, name, ...rest }) {
  const [imageFile, setImageFile] = useState(null);

  const handleImageChange = (e) => {
    const file = e.target.files?.[0];

    if (!file) {
      setImageFile(null);
      return;
    }

    const fileReader = new FileReader();

    fileReader.onload = () => {
      setImageFile(fileReader.result);
    };

    fileReader.readAsDataURL(file);
  };

  return (
    <div className={styles.inputWrapper}>
      <label htmlFor={name} className={styles.label}>
        {label}
      </label>
      <input
        type="file"
        accept="image/png, image/jpeg, image/jpg, image/heic, image/heif"
        name={name}
        className={styles.input}
        onChange={handleImageChange}
        {...rest}
      ></input>
      {imageFile && (
        <div className={styles.imagePreview}>
          <Image src={imageFile} alt="User selected image" fill />
        </div>
      )}
    </div>
  );
}
