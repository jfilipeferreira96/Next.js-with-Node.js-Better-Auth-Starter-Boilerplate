import Navbar from "@/components/Navbar";

export default async function LandingPageLayout({
  children,
}: {
  children: React.ReactNode;
}) {

  return (
    <>
      <Navbar />
      {children}
    </>
  );
}
