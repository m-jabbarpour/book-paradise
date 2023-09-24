import Link from "next/link";

import LoginForm from "./components/LoginForm";

const Login: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col justify-center">
      <LoginForm />
      <div className="mx-auto text-center mt-3">
        <span>عضو نیستید؟ </span>
        <Link href="signup">
          <span className="cursor-pointer hover:text-primary">ثبت‌نام</span>
        </Link>
      </div>
    </div>
  );
};

export default Login;
