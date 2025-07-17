import localFont from "next/font/local";
import "./globals.css";
import Header from "@/app/(components)/Header/header";
import Container from "@/app/(components)/Container/container";
import SheetDataProvider from "@/app/(components)/SheetDataProvider";
import ClientLayout from "./ClientLayout";
import Modal from "@/app/(components)/Modal/modal";
import {ContactsModal} from "@/app/(components)/ContactsModal/contactsModal";
import {Footer} from "@/app/(components)/Footer/footer";
import styles from "@/app/(components)/Footer/footer.module.css";
import GoogleTagManagerNoScript from "@/app/(components)/GoogleTagManagerNoScript";
import GoogleTagManager from "@/app/(components)/GoogleTagManager";

const roboto = localFont({
    src: "../../public/fonts/Roboto.ttf",
    variable: "--font-roboto",
    display: "swap",
});

const caviarDreams = localFont({
    src: "../../public/fonts/caviar_dreams/CaviarDreams.ttf",
    variable: "--font-caviar-dreams",
    display: "swap",
});

const caviarDreamsBold = localFont({
    src: "../../public/fonts/caviar_dreams/CaviarDreams_Bold.ttf",
    variable: "--font-caviar-dreams-bold",
    display: "swap",
});

export const metadata = {
  title: "Gen Expert",
  description: "Новые и б/у газопоршневые генераторы под ключ.",
};

export default async function RootLayout({children, params}) {
    return (
        <html lang="en">
        <head>
            <GoogleTagManager/>
        </head>
        <body className={`${caviarDreams.variable} ${caviarDreamsBold.variable} ${roboto.variable}`}>
        <GoogleTagManagerNoScript/>
        <ClientLayout>
            <SheetDataProvider>
                <Header/>
                <Container>
                    <main>{children}</main>
                </Container>
                <Footer className={styles.mainFooter}/>
                <Modal/>
                <ContactsModal/>
            </SheetDataProvider>
        </ClientLayout>
        </body>
        </html>
    );
}
