import type React from "react"
import type { Metadata } from "next"
import { Outfit } from "next/font/google"
import "./globals.css"
import { Toaster } from "@/components/ui/toaster"
import { Providers } from "@/components/providers"
import { HydrationFix } from "@/components/hydration-fix"

const outfit = Outfit({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Bonjuekittens - Premium Cat Breeding",
  description:
    "Discover beautiful, healthy kittens from our premium cat breeding program. Specializing in Persian, Maine Coon, British Shorthair, and Ragdoll breeds.",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              // Remove browser extension attributes before React hydrates
              (function() {
                const removeExtensionAttributes = () => {
                  const elements = document.querySelectorAll('[bis_skin_checked]');
                  elements.forEach(element => {
                    element.removeAttribute('bis_skin_checked');
                  });
                };
                
                // Run immediately
                removeExtensionAttributes();
                
                // Set up observer to catch attributes added later
                const observer = new MutationObserver((mutations) => {
                  mutations.forEach((mutation) => {
                    if (mutation.type === 'attributes' && mutation.attributeName === 'bis_skin_checked') {
                      const target = mutation.target;
                      if (target.hasAttribute('bis_skin_checked')) {
                        target.removeAttribute('bis_skin_checked');
                      }
                    }
                  });
                });
                
                // Start observing when DOM is ready
                if (document.readyState === 'loading') {
                  document.addEventListener('DOMContentLoaded', () => {
                    observer.observe(document.body, {
                      attributes: true,
                      childList: true,
                      subtree: true,
                      attributeFilter: ['bis_skin_checked']
                    });
                  });
                } else {
                  observer.observe(document.body, {
                    attributes: true,
                    childList: true,
                    subtree: true,
                    attributeFilter: ['bis_skin_checked']
                  });
                }
              })();
            `,
          }}
        />
      </head>
      <body className={`${outfit.className} antialiased min-h-screen bg-background text-foreground transition-colors duration-300`} suppressHydrationWarning>
        <Providers>
          <HydrationFix />
          <div suppressHydrationWarning className="relative flex min-h-screen flex-col">
            {children}
          </div>
          <Toaster />
        </Providers>
      </body>
    </html>
  )
}
