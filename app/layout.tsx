import "./globals.css";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="bg-gradient-to-r from-blue-500 via-purple-600 to-pink-500 min-h-screen">
        {children}
      </body>
    </html>
  );
}
