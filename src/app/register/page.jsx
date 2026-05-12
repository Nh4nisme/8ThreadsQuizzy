import AuthPage from "../../views/Auth/AuthPage";
import LayoutTransition from "../../components/ui/LayoutTransition.jsx";

export default function RegisterPage() {
  return (
    <LayoutTransition>
      <AuthPage mode="signup" />
    </LayoutTransition>
  );
}
