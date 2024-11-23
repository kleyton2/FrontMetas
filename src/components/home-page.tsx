import Footer from "./ui/footer";
import Main from "./ui/main";
import { MyFormComponent } from "./ui/forms";

export default function homePage() {
  return (
    <div>
      <Main />
      <MyFormComponent />
      <Footer />
    </div>
  );
}
