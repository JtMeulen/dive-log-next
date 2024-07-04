'use server'

export async function loginAction(formData) {
  const user = {
    email: formData.get('email'),
    password: formData.get('password'),
  }

  console.log('Login user:', user);
}
