"use server";

export const newDiveAction = async (formData) => {
  const dive = {
    title: formData.get("title"),
    location: formData.get("location"),
    description: formData.get("description"),
    date: formData.get("date"),
    time: formData.get("time"),
    depth: formData.get("depth"),
    image: formData.get("image"),
    notes: formData.get("notes"),
  };

  console.log("Loggin new dive:", dive);
}
