import Landing from "../views/Landing/Landing.jsx";
import LayoutTransition from "../components/ui/LayoutTransition.jsx";

export default function HomePage() {
  return (
    <LayoutTransition>
      <Landing />
    </LayoutTransition>
  );
}
