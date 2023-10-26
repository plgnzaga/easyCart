import Image from "next/image";
import styles from "./page.module.css";
import Navbar from "./components/Navbar"
import CartContainer from './components/CartContainer/page'
export default function Home() {

  return (
    <html> <body>
      <main className="h-dvh">
        <Navbar />
        <CartContainer />
      </main>
    </body>
    </html>
  );
}
