export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html>
      <head>
        <title>Country rank</title>
      </head>
      <body>{children}</body>
    </html>
  );
}
