import { Outlet } from "react-router-dom";
import { useRef, useState } from "react";
import Header from "./Header/Header";
import Loader from "../components/Loader/Loader";

export default function Layout() {
  const headerAnimationRef = useRef();
  const pageAnimationRef = useRef();
  const [isLoaded, setIsLoaded] = useState(false);

  return (
    <div className="bg-mainBlack text-mainWhite font-HelveticaNeue flex min-h-screen flex-col font-medium">
      {/* Header рендериться завжди */}
      <Header ref={headerAnimationRef} />

      <main className="relative flex-1">
        {/* Outlet рендериться завжди, але контент може бути прихований стилями */}
        <Outlet context={{ pageAnimationRef, headerAnimationRef, isLoaded }} />

        {/* Loader накладається поверх контенту */}
        {!isLoaded && (
          <Loader
            onFinish={() => setIsLoaded(true)}
            headerRef={headerAnimationRef}
            pageRef={pageAnimationRef}
          />
        )}
      </main>
    </div>
  );
}
