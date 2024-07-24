'use client';

export default function BirthDate({ birthdate }) {
  return (
    birthdate && (
      <p>Date of birth: {new Date(birthdate).toLocaleDateString("en-GB")}</p>
    )
  );
}
