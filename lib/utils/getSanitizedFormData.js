import xss from 'xss';

export default function getSanitizedFormData(formData) {
  const sanitizedData = new Map();

  for (const [key, value] of formData.entries()) {
    sanitizedData.set(key, xss(value));
  }

  return sanitizedData;
}
