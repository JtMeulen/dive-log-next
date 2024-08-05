"use client";

import { useRef, useState } from "react";

import styles from "./ImagePicker.module.css";
import Image from "next/image";

export default function Input({ label, name, defaultImage, ...rest }) {
  const inputRef = useRef(null);
  const [imageFile, setImageFile] = useState(null);

  const handleImageChange = (e) => {
    const file = e.target.files?.[0];

    if (file && file.size > 4 * 1024 * 1024) {
      // 4MB limit
      inputRef.current.setCustomValidity("File size exceeds 4MB limit");
    } else {
      inputRef.current.setCustomValidity("");
    }

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
        ref={inputRef}
        {...rest}
      ></input>

      <em id={`${name}-description`} className={styles.description}>
        Max size is 4mb. Supported formats: PNG, JPG, JPEG, HEIC, HEIF.
      </em>
    </div>
  );
}
