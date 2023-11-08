import Image from "next/image";
import styles from "./page.module.css";
import Navbar from "./components/Navbar"
import CartContainer from './components/CartContainer/page'
import { inter, montserrat } from "./dist/fonts";
export default function Home() {

  return (
    <html className={montserrat.className}> <body>
      <main className="h-dvh">
        <Navbar />
        <div className={`wrapper my-0 mx-auto`}>
          <CartContainer />
        </div>
      </main>
    </body>
    </html>
  );
}
