import GoogleLogin from "@/components/Login/GoogleLogin";
import { createClient } from "@/utils/supabase/client";
import { redirect } from "next/navigation";

export default async function Login() {
  const supabase = createClient();
  const { data } = await supabase.auth.getUser();
  if (data.user) {
    redirect("/");
  }

  return (
    <div className="w-full center-col gap-8">
      <div className="w-full gap-3 flex items-center">
        <div className="flex flex-col gap-1.5">
          <p className="text-xs leading-[100%] text-light-gray-text font-bold">
            Welcome!
          </p>
          <p className="text-base leading-[100%] text-dark-text font-bold">
            Please Login
          </p>
        </div>
      </div>
      <GoogleLogin />
    </div>
  );
}
