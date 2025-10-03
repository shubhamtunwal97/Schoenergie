import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Schoenergie - Solar-Check',
  description: 'Finden Sie heraus, ob sich eine Solaranlage für Ihr Dach lohnt',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="de">
      <body>
        <header className="bg-white shadow-sm">
          <div className="max-w-7xl mx-auto px-4 py-4">
            <h1 className="text-xl font-bold text-blue-600">
              Schoenergie
            </h1>
          </div>
        </header>

        <main>
          {children}
        </main>

        <footer className="bg-gray-800 text-white py-8 mt-16">
          <div className="max-w-7xl mx-auto px-4 text-center">
            <p>&copy; 2024 Schoenergie. Alle Rechte vorbehalten.</p>
            <p className="text-sm text-gray-400 mt-2">
              E-Mail: info@schoenergie.de | Tel: +49 (0) 123 456 7890
            </p>
          </div>
        </footer>
      </body>
    </html>
  );
}