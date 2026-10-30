import "../assets/css/styles.css";

export const metadata = {
  title: "IT Support | Incident Demo",
  description: "Browser-based IT support incident management demo.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="de">
      <body>{children}</body>
    </html>
  );
}
