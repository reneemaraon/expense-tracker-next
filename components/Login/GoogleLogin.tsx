"use client";
import { createClient } from "@/utils/supabase/client";
import Image from "next/image";
import { useSearchParams } from "next/navigation";
import { useState } from "react";
import CustomButton from "../common/Button";

const GoogleLogin = () => {
  const [isGoogleLoading, setIsGoogleLoading] = useState<boolean>(false);
  const supabase = createClient();

  const searchParams = useSearchParams();

  const next = searchParams.get("next");

  async function signInWithGoogle() {
    setIsGoogleLoading(true);
    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider: "google",
        options: {
          redirectTo: `${window.location.origin}/auth/callback`,
        },
      });

      if (error) {
        throw error;
      }
    } catch (error) {
      setIsGoogleLoading(false);
    }
  }
  return (
    <CustomButton
      onClick={signInWithGoogle}
      // className="w-full h-12 flex gap-4 items-center justify-center main-gradient text-white rounded-full max-w-[400px] cursor-pointer"
    >
      <Image
        src="https://authjs.dev/img/providers/google.svg"
        alt="Google logo"
        width={20}
        height={20}
        className="mr-2"
      />
      {isGoogleLoading ? "Please wait..." : "Login with Google"}
    </CustomButton>
  );
};

export default GoogleLogin;
