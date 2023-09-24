"use client";

import { signIn, signOut, useSession } from "next-auth/react";

const UserLogin: React.FC = () => {
  const { data: session, status } = useSession();

  if (status === "authenticated")
    return (
      <>
        <span
          className="cursor-pointer hover:text-primary"
          onClick={() => signOut()}
        >
          خروج
        </span>
      </>
    );

  return (
    <span
      className="cursor-pointer hover:text-primary"
      onClick={() => signIn()}
    >
      ورود
    </span>
  );
};

export default UserLogin;
