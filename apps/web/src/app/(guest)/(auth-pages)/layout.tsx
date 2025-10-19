import AuthPagesLayoutClient from "./AuthPagesLayoutClient";

export default function AuthPagesLayout({ children }: { children: React.ReactNode }) {
  return <AuthPagesLayoutClient>{children}</AuthPagesLayoutClient>;
}
