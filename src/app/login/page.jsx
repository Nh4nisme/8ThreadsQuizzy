import { Suspense } from "react";
import AuthPage from "../../views/Auth/AuthPage";
import LayoutTransition from "../../components/ui/LayoutTransition.jsx";

export default function LoginPage() {
  return (
    <LayoutTransition>
      <Suspense fallback={null}>
        <AuthPage mode="signin" />
      </Suspense>
    </LayoutTransition>
  );
}
