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
      <div className="w-full gap-3 flex pt-10 items-center">
        <div className="center-col w-full gap-4">
          <p className="font-medium leading-[100%] text-light-gray-text ">
            Welcome!
          </p>
          <p className="mb-20 text-base leading-[100%] text-dark-text font-bold">
            Please Login to start Expense Tracker
          </p>
        </div>
      </div>
      <GoogleLogin />
    </div>
  );
}
