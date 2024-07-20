import "./globals.css";
import "leaflet/dist/leaflet.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { AuthProvider } from "@/app/authProvider";
import { Toaster } from "react-hot-toast";

export const metadata = {
  title: "ScubiBranches",
  description: "Your favorite nudibranch dive log!",
  manifest : "/manifest.json",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <AuthProvider>
        <body>
          <Toaster
            position="top-center"
            toastOptions={{
              success: {
                style: {
                  border: "var(--success-color) 1px solid",
                  padding: "16px",
                },
              },
              error: {
                style: {
                  border: "var(--error-color) 1px solid",
                  padding: "16px",
                },
              },
            }}
          />
          <Header />
          {children}
          <Footer />
        </body>
      </AuthProvider>
    </html>
  );
}
