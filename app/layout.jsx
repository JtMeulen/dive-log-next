import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { AuthProvider } from  "@/app/authProvider";

export const metadata = {
  title: "ScubApp",
  description: "Your favorite scuba dive log!",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <AuthProvider>
        <body>
          <Header />
          {children}
          <Footer />
        </body>
      </AuthProvider>
    </html>
  );
}
