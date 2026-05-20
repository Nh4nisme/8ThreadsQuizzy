import { Suspense } from "react";
import AuthPage from "../../views/Auth/AuthPage";
import LayoutTransition from "../../components/ui/LayoutTransition.jsx";

export default function RegisterPage() {
  return (
    <LayoutTransition>
      <Suspense fallback={null}>
        <AuthPage mode="signup" />
      </Suspense>
    </LayoutTransition>
  );
}
