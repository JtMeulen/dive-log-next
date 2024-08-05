"use client";

import { useState } from "react";

import styles from "./ImagePicker.module.css";
import Image from "next/image";

export default function Input({ label, name, defaultImage, ...rest }) {
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

  const hasImage = imageFile || defaultImage;

  return (
    <div className={styles.inputWrapper}>
      <label htmlFor={name} className={styles.label}>
        {label}

        <div
          className={`${styles.imagePreview} ${hasImage && styles.hasImage}`}
          tabIndex={0}
        >
          {hasImage && (
            <Image
              src={imageFile || defaultImage}
              alt="User selected image"
              fill
            />
          )}

          <span>+</span>
          <span>Click here to select an image</span>
        </div>
      </label>
      <input
        type="file"
        accept="image/png, image/jpeg, image/jpg, image/heic, image/heif"
        name={name}
        id={name}
        className={styles.input}
        onChange={handleImageChange}
        aria-describedby={`${name}-description`}
        {...rest}
      ></input>

      <em id={`${name}-description`} className={styles.description}>
        Max size is 4mb. Supported formats: PNG, JPG, JPEG, HEIC, HEIF.
      </em>
    </div>
  );
}
