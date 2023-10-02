import './globals.css'


export const metadata = {
  title: 'Kanban',
  description: 'personal task manager using kanban methodology',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
