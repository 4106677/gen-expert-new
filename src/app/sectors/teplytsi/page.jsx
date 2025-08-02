'use client'
import Consultation from "@/app/(components)/MainPage/Consultation/consultation";
import Principle from "@/app/(components)/Sectors/Principle/Principle";
import Advantages from "@/app/(components)/Sectors/Advantages/Advantages";
import SectorHead from "@/app/(components)/Sectors/Head/SectorHead";
import BackButton from "@/app/(components)/BackButton/BackButton";
import GreenBox from "@/app/(components)/GreenBox/GreenBox";
import {useTranslation} from "react-i18next";
import styles from '../[slug]/SectorPage.module.scss'
import Solution from "@/app/(components)/Sectors/Solution/Solution";
import HowItWorks from "@/app/(components)/Sectors/HowItWorks/HowItWorks";

export default function TeplytsiPage() {
    const { t } = useTranslation("common");
    const sectors = t("sectors", { returnObjects: true });
    const sector = sectors?.industries?.find((item) => item.slug === "teplytsi");
    const headers = sector?.headers
    console.log(sector);

    if (!sector) {
        return (
            <div></div>
        )
    }

  return (
      <div>
          <GreenBox text={sector.name}/>
          <div className={`${styles.container} container`}>
              <BackButton/>
              <SectorHead sector={sector} headers={headers}/>
              <HowItWorks sector={sector} headers={headers}/>
              <Principle sector={sector} headers={headers}/>
              <Advantages sector={sector} headers={headers}/>
              <Solution sector={sector} headers={headers}/>
          </div>
          <Consultation/>
      </div>
  );
}


