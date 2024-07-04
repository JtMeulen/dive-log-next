'use server'

export async function signupAction(formData) {
  const user = {
    name: formData.get('name'),
    email: formData.get('email'),
    password: formData.get('password'),
  }

  console.log('Signup user:', user);
}
