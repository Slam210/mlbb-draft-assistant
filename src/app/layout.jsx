import "./globals.css";

export const metadata = { title: "MLBB Draft Assistant" };

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
