import type { Metadata } from "next";
// Fontes auto-hospedadas (sem chamada ao Google Fonts em produção).
import "@fontsource-variable/sora";
import "@fontsource/jetbrains-mono/400.css";
import "@fontsource/jetbrains-mono/500.css";
import "@fontsource/jetbrains-mono/700.css";
import "./globals.css";
import { site } from "@/content/site";

export const metadata: Metadata = {
  title: `${site.name} | ${site.role}`,
  description: site.tagline,
  openGraph: {
    title: `${site.name} | ${site.role}`,
    description: site.tagline,
    type: "website",
  },
};

// Aplica o tema salvo antes da primeira pintura, evitando o "piscar" de tema.
const themeScript = `(function(){try{var t=localStorage.getItem("theme");if(t==="light"||t==="dark")document.documentElement.setAttribute("data-theme",t)}catch(e){}})()`;

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="pt-BR" suppressHydrationWarning>
      <head>
        {/* suppressHydrationWarning: extensões do navegador alteram scripts do <head> antes da hidratação. */}
        <script suppressHydrationWarning dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body className="min-h-dvh">{children}</body>
    </html>
  );
}
