import LoginForm from "@/components/authentication/loginForm";

export default function Login() {
  return (
    <div className="w-343 mx-auto mt-84 flex-center flex-col gap-24">
      <h2 className="font-bold-24 text-text-primary">로그인</h2>
      <LoginForm />
    </div>
  );
}
