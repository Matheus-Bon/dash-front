import "./globals.css";
import { Toaster } from 'sonner';

export const metadata = {
  title: "Hermes | Dashbaord",
  description: "",
};

export default function RootLayout({ children }) {
  return (
    <html lang="pt-BR">
      <body>
        {children}
        <Toaster
          richColors
          position="top-right"
        />
      </body>
    </html>
  );
}
