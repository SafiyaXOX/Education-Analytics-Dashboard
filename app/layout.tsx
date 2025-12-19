// app/layout.tsx
import './globals.css';
import Providers from './providers'; // Import the provider we built

export const metadata = {
  title: 'Education Analytics Dashboard',
  description: 'DfE School Performance Data',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        {/* This wraps your entire application. 
          Without this, useQuery hooks cannot find the cache 'store'.
        */}
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
}