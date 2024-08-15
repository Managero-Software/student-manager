import LoginForm from "@/components/forms/LoginForm";
import { getLoggedInUser } from "@/lib/actions/user.actions";
import { redirect } from "next/navigation";

export default async function Login() {
  const user = await getLoggedInUser();
  if (user) redirect("/dashboard");

  return (
    <div className="flex h-screen max-h-screen">
      <div className="container my-auto">
        <div className="sub-container max-w-[496px]">
          <LoginForm />
        </div>
      </div>
    </div>
  );
}
