"use client";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import Loader from "@/components/shared/loader";

export default function RouteLoaderProvider({ children }) {
  const pathname = usePathname();
  const [loading, setLoading] = useState(true);

  // On first mount
  useEffect(() => {
    setLoading(true);
    const t = setTimeout(() => setLoading(false), 3500);
    return () => clearTimeout(t);
  }, []);

  // On route change
  useEffect(() => {
    setLoading(true);
    const t = setTimeout(() => setLoading(false), 3500);
    return () => clearTimeout(t);
  }, [pathname]);

  return (
    <>
      {loading && <Loader />}
      {children}
    </>
  );
}
