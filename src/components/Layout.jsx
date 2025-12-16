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
      <Header ref={headerAnimationRef} />

      <main className="relative flex-1">
        <Outlet context={{ pageAnimationRef, headerAnimationRef, isLoaded }} />

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
