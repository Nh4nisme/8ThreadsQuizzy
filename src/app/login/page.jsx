import AuthPage from "../../views/Auth/AuthPage";
import LayoutTransition from "../../components/ui/LayoutTransition.jsx";

export default function LoginPage() {
  return (
    <LayoutTransition>
      <AuthPage mode="signin" />
    </LayoutTransition>
  );
}
