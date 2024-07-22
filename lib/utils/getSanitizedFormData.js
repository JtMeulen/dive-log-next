import xss from "xss";

export default function getSanitizedFormData(formData) {
  const sanitizedData = new Map();

  for (const [key, value] of formData.entries()) {
    if (key === "image" || key === "avatar") {
      sanitizedData.set(key, value);
      continue;
    }
    sanitizedData.set(key, xss(value));
  }

  return sanitizedData;
}
