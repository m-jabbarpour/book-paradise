import "react-toastify/dist/ReactToastify.css";

import ToastContainerWithTheme from "@/components/ToastContainerWithTheme";
import Header from "./components/Header";
import SideBar from "./components/SideBar";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Header />
      <div className="flex">
        <SideBar />
        <div className="p-6 grow">{children}</div>
      </div>
      <ToastContainerWithTheme />
    </>
  );
}
