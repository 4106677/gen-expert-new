'use client'
import styles from "./page.module.css";
import "../i18n";
import {fetchGoogleSheetData} from "@/services/google";
import {useEffect, useState} from "react";
import {useLanguage} from "@/app/context";
import Hero from "@/app/(components)/Hero/hero";
import Fields from "@/app/(components)/Fields/fields";
import Possibilities from "@/app/(components)/Possibilities/possibilities";

export default function Home() {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(false)
    // const { showModal, setShowModal } = useModal();
    // const router = useRouter();
    const { lang } = useLanguage();

    // useEffect(() => {
    //     const checkIfMobile = () => {
    //         setIsMobile(window.innerWidth < 980);
    //     };
    //     checkIfMobile();
    //     window.addEventListener('resize', checkIfMobile);
    //     return () => window.removeEventListener('resize', checkIfMobile);
    // }, []);

    useEffect(() => {
        async function loadSheetData() {
            setLoading(true)
            try {
                const sheetData = await fetchGoogleSheetData(`TOP5${lang.toUpperCase()}`);
                setData(sheetData);
            } catch (error) {
                console.error("Failed to fetch sheet data:", error.message);
                setData([]);
            }
        }

        loadSheetData().then(r => setLoading(false));
    }, [lang]);

    return (
        <div className={styles.page}>
            <Hero/>
            <Fields/>
            <Possibilities/>
        </div>
    );
}

