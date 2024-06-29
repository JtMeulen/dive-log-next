import "./globals.css";

export const metadata = {
  title: "ScubApp",
  description: "Your favorite scuba dive log!",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
