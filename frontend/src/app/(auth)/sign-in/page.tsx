import { SignInView } from "@/modules/auth/views/sign-in-view";

export default function LoginPage() {
  return (
    <div className="min-h-screen flex justify-center items-center bg-gradient-to-r from-blue-100 to-purple-200">
      <SignInView />
    </div>
  );
}
