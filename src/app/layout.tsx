'use client';

const RootLayout = ({ children }: { children: React.ReactNode }) => (
  <html lang="en">
    <head>
      <title>Country rank</title>
    </head>
    <body>{children}</body>
  </html>
);

export default RootLayout;
