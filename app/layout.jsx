import "./globals.css";

import Header from "@/components/Header";

export const metadata = {
  title: "ScubApp",
  description: "Your favorite scuba dive log!",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Header />
        {children}
      </body>
    </html>
  );
}
