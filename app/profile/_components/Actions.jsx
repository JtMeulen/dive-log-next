"use client";

import { useState } from "react";
import { signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

import { deleteUser } from "@/lib/actions/deleteUser";
import { debug_db_populate } from "@/lib/db/debug/populate_dummy";
import Button from "@/components/Button";
import ButtonLink from "@/components/ButtonLink";
import Modal from "@/components/Modal";

import styles from "./page.module.css";

export default function Actions() {
  const [showModal, setShowModal] = useState(false);
  const router = useRouter();

  const handleSignOut = async (e) => {
    e.preventDefault();

    await signOut();
    router.push("/login");
  };

  const handleDelete = async (e) => {
    e.preventDefault();

    const response = await deleteUser();

    if (response.success) {
      await signOut();
      router.push("/");
    } else {
      toast.error(response.error);
    }
  };

  return (
    <>
      <div className={styles.actions}>
        <ButtonLink variant="primary" href="/profile/edit">
          Edit Account
        </ButtonLink>
        <Button variant="secondary" onClick={handleSignOut}>
          Sign Out
        </Button>
        <Button variant="danger" onClick={() => setShowModal(true)}>
          Delete Account
        </Button>

        {/* FOR TESTING PURPOSES ONLY */}
        {process.env.NODE_ENV === "development" && (
          <Button
            variant="danger"
            onClick={async () => {
              await debug_db_populate();
            }}
          >
            Populate Dummy Data
          </Button>
        )}
      </div>

      {/* Confirm modal for delete action */}
      <Modal show={showModal} closeButtonHandler={() => setShowModal(false)}>
        <p className={styles.modalText}>
          Are you sure you want to delete your account?
        </p>
        <div className={styles.modalButtons}>
          <Button variant="danger" onClick={handleDelete}>
            Yes, delete my account
          </Button>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Cancel
          </Button>
        </div>
      </Modal>
    </>
  );
}
