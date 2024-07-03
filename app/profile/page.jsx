import Image from "next/image";

import styles from "./page.module.css";
import avatarPlaceholder from "@/public/avatar_placeholder.png";
import Button from "@/components/ui/Button";

export default function ProfilePage() {
  // TODO: fetch real user data
  const user = {
    name: "John Doe",
    email: "johndoe@gmail.com",
    age: "25",
    avatar: "",
  };

  return (
    <main className={styles.main}>
      <div className={styles.avatar}>
        <Image src={avatarPlaceholder} alt="Avatar image" fill />
      </div>

      <p>{user.name}</p>
      <p>{user.email}</p>
      <p>Age: {user.age}</p>

      <div className={styles.actions}>
        <Button variant="primary">Edit Account</Button>
        <Button variant="secondary">Delete Account</Button>
      </div>
    </main>
  );
}
