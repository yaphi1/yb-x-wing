import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "YB X-Wing Sim",
  description: "An x-wing simulator",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        {children}
      </body>
    </html>
  );
}
