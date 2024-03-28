import Image from "next/image";
import styles from "./page.module.css";
import Navbar from "./components/Navbar"
import CartContainer from './components/CartContainer/page'
export default function Home() {

  return (
    <html> <body>
      <main className="h-dvh">
        <Navbar />
        <div className="wrapper my-0 mx-auto">
          <CartContainer />
        </div>
      </main>
    </body>
    </html>
  );
}
