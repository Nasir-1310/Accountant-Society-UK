//src/app/api/admin/layout.tsx

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        {children}
      </body>
    </html>
  );
}
// src/app/api/admin/layout.tsx