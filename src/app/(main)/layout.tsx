export default function UserLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <div className="admin-layout">{children}</div>;
}
