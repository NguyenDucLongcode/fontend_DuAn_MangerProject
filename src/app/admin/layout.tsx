import AdminNavbar from "@/components/nav/admin.nav";

export default function AdminLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="admin-layout">
      <AdminNavbar />
      {children}
    </div>
  );
}
