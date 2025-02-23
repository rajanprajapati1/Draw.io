import './globals.css';
import { Poppins } from 'next/font/google';

const poppins = Poppins({ subsets: ['latin'], weight: ['400', '700'] });

export const metadata = {
  title: 'Draw.io - Using Excalidraw & Mermaid',
  description:
    'A dynamic web-based drawing tool that leverages Excalidraw and Mermaid to create and visualize diagrams in real time.',
};

const RootLayout = ({ children }) => {
  return (
    <html lang="en">
      <head>
      </head>
      <body className={poppins.className}>
        {children}
      </body>
    </html>
  );
};

export default RootLayout;
