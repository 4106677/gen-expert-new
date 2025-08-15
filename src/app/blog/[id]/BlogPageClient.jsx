'use client';
import React, {useEffect, useState} from "react";
import styles from './BlogPage.module.css'
import {useLanguage} from "@/app/context";
import {useTranslation} from "react-i18next";
import Consultation from "@/app/(components)/MainPage/Consultation/consultation";
import GreenBox from "@/app/(components)/GreenBox/GreenBox";
import {useSheetData} from "@/context/SheetDataContext";
import Image from "next/image";
import CustomLink from "@/app/(components)/CustomLink/customLink";
import BackButton from "@/app/(components)/BackButton/BackButton";

const BlogPageClient = ({ id }) => {
	const { t } = useTranslation("common");
	const { lang } = useLanguage();
	const { loading } = useSheetData()

	const [item, setItem] = useState(null)
	const [itemLoading, setItemLoading] = useState(true);

	const carriers = {
		gas: "#ffc931",
		heating: "#f90101",
		electricity: "#538135",
		coolant: "#739dcb",
		exhaust: "#000000"
	}

	useEffect(() => {
		const loadItem = async () => {
			setItemLoading(true);
			const blogData = t('blog.data', { returnObjects: true });
			if (!Array.isArray(blogData) || blogData.length === 0) {
				setItemLoading(false);
				return;
			}
			const foundItem = blogData.find(item => item.href === id);

			if (!foundItem) {
				setItem(null);
				setItemLoading(false);
				return;
			}

			setItem(foundItem);
			setItemLoading(false);
		};

		if (lang) {
			loadItem();
		}
	}, [lang, id, t]);

	if (loading || itemLoading) {
		return (
			<div >
				<div >
					<h2>Loading...</h2>
				</div>
			</div>
		);
	}

	if (!item) {
		return (
			<div>
				<h2>Blog post not found</h2>
			</div>
		);
	}

	return (
		<>
			<GreenBox text={item?.title}/>
			<div className={`${styles.container} container`}>
				<BackButton/>
				<div className={styles.main}>
					<Image className={styles.main_image} src={item.image} alt={item.title} width={525} height={618}/>
					<div className={styles.details}>
						{item.detailsHeader !== "" && <h2 className={styles.details_header}>{item.detailsHeader}</h2>}
						{item.details.split("\n").map((line, index) => (
							<p className={styles.details_p} key={index}>{line}</p>
						))}
						{item.whatIsGPU &&
							<div className={styles.parameterBlock}>
								<h3 className={styles.parameterTitle}>
									{/*<span className={styles.parameterIcon}>🔧</span>*/}
									{item.whatIsGPU.structure.title}
								</h3>
								<p className={styles.whatIsGPU_p}>{item.whatIsGPU.structure.typesIntro}</p>
								<ul className={styles.checkList_simple}>
									<li>{item.whatIsGPU.structure.type1}</li>
									<li>{item.whatIsGPU.structure.type2}</li>
								</ul>
								<p className={styles.whatIsGPU_p}>{item.whatIsGPU.structure.componentsIntro}</p>
								<ul className={styles.checkList_simple}>
									<li>{item.whatIsGPU.structure.component1}</li>
									<li>{item.whatIsGPU.structure.component2}</li>
									<li>{item.whatIsGPU.structure.component3}</li>
									<li>{item.whatIsGPU.structure.component4}</li>
									<li>{item.whatIsGPU.structure.component5}</li>
									<li>{item.whatIsGPU.structure.component6}</li>
									<li>{item.whatIsGPU.structure.component7}</li>
								</ul>
							</div>

						}
					</div>
				</div>
				<h3 className={styles.details_header}>{item.descriptionHeader}</h3>
				{item.description.split("\n").map((line, index) => (
					<p className={styles.details_p} key={index}>{line}</p>
				))}
				{/*links*/}
				<div className={styles.links}>
					{item.links && item.links.map(({title, url}, index) => (
						<CustomLink href={url} text={title} key={index} classname={styles.link}/>
					))}
				</div>
				{/*serviceLife*/}
				{item.serviceLife &&
					<>
						<div>
							<div className={styles.tableWrapper}>
								<table className={styles.comparisonTable}>
									<thead>
									<tr>
										<th>{item.serviceLife.table.manufacturer}</th>
										<th>{item.serviceLife.table.electricalEfficiency}</th>
										<th>{item.serviceLife.table.thermalEfficiency}</th>
										<th>{item.serviceLife.table.totalEfficiency}</th>
										<th>{item.serviceLife.table.reliability}</th>
										<th>{item.serviceLife.table.fuelConsumption}</th>
										<th>{item.serviceLife.table.partsAvailability}</th>
										<th>{item.serviceLife.table.serviceLifeHours}</th>
										<th>{item.serviceLife.table.maintenanceInterval}</th>
										<th>{item.serviceLife.table.gasConsumption}</th>
									</tr>
									</thead>
									<tbody>
									<tr>
										<td>Jenbacher</td>
										<td>43-44%</td>
										<td>45-47%</td>
										<td>88-90%</td>
										<td><span className={styles.highRating}>🔥 {item.high}</span></td>
										<td><span className={styles.goodRating}>🟢 {item.economical}</span></td>
										<td><span className={styles.mediumRating}>🟡 {item.medium}</span></td>
										<td><span className={styles.highRating}>🔥 60 000 - 80 000</span></td>
										<td><span className={styles.lowRating}>🔴 1 500 - 2 000</span></td>
										<td>230</td>
									</tr>
									<tr>
										<td>MWM</td>
										<td>42-43%</td>
										<td>44-46%</td>
										<td>86-88%</td>
										<td><span className={styles.highRating}>🔥 {item.high}</span></td>
										<td><span className={styles.goodRating}>🟢 {item.economical}</span></td>
										<td><span className={styles.goodRating}>🟢 {item.good}</span></td>
										<td><span className={styles.highRating}>🔥 60 000 - 80 000</span></td>
										<td><span className={styles.lowRating}>🔴 1 500 - 2 000</span></td>
										<td>235</td>
									</tr>
									<tr>
										<td>MTU</td>
										<td>40-42%</td>
										<td>42-44%</td>
										<td>82-85%</td>
										<td><span className={styles.goodRating}>🟢 {item.high}</span></td>
										<td><span className={styles.goodRating}>🟢 {item.economical}</span></td>
										<td><span className={styles.goodRating}>🟢 {item.good}</span></td>
										<td><span className={styles.goodRating}>🟢 50 000 - 60 000</span></td>
										<td><span className={styles.mediumRating}>🟡 2 000 - 3 000</span></td>
										<td>250</td>
									</tr>
									<tr>
										<td>CAT</td>
										<td>38-41%</td>
										<td>40-43%</td>
										<td>80-84%</td>
										<td><span className={styles.goodRating}>🟢 {item.high}</span></td>
										<td><span className={styles.goodRating}>🟡 {item.medium}</span></td>
										<td><span className={styles.goodRating}>🟢 {item.excellent}</span></td>
										<td><span className={styles.goodRating}>🟢 50 000 - 60 000</span></td>
										<td><span className={styles.mediumRating}>🟢 3 000 - 4 000</span></td>
										<td>260</td>
									</tr>
									<tr>
										<td>Bergen</td>
										<td>44-45%</td>
										<td>45-47%</td>
										<td>89-92%</td>
										<td><span className={styles.goodRating}>🔥 {item.high}</span></td>
										<td><span className={styles.goodRating}>🟢 {item.economical}</span></td>
										<td><span className={styles.goodRating}>🔴 {item.complexLogistics}</span></td>
										<td><span className={styles.goodRating}>🔥 80 000 - 100 000</span></td>
										<td><span className={styles.mediumRating}>🔴 1 000 - 2 000</span></td>
										<td>225</td>
									</tr>
									<tr>
										<td>Wärtsilä</td>
										<td>44-46%</td>
										<td>45-48%</td>
										<td>89-92%</td>
										<td><span className={styles.goodRating}>🔥 {item.high}</span></td>
										<td><span className={styles.goodRating}>🟢 {item.economical}</span></td>
										<td><span className={styles.goodRating}>🔴 {item.limited}</span></td>
										<td><span className={styles.goodRating}>🔥 80 000 - 100 000</span></td>
										<td><span className={styles.mediumRating}>🔴 1 500 - 2 000</span></td>
										<td>220</td>
									</tr>
									<tr>
										<td>Cummins</td>
										<td>37-40%</td>
										<td>40-42%</td>
										<td>77-82%</td>
										<td><span className={styles.goodRating}>🟡 {item.medium}</span></td>
										<td><span className={styles.goodRating}>🔴 {item.high}</span></td>
										<td><span className={styles.goodRating}>🟢 {item.excellent}</span></td>
										<td><span className={styles.goodRating}>🟡 40 000 - 50 000</span></td>
										<td><span className={styles.mediumRating}>🟢 3 000 - 4 000</span></td>
										<td>270</td>
									</tr>
									<tr>
										<td>Doosan</td>
										<td>36-39%</td>
										<td>38-41%</td>
										<td>74-80%</td>
										<td><span className={styles.goodRating}>🟡 {item.medium}</span></td>
										<td><span className={styles.goodRating}>🟡 {item.medium}</span></td>
										<td><span className={styles.goodRating}>🟡 {item.medium}</span></td>
										<td><span className={styles.goodRating}>🟡 40 000 - 50 000</span></td>
										<td><span className={styles.mediumRating}>🟢 3 000 - 4 000</span></td>
										<td>280</td>
									</tr>
									</tbody>
								</table>
							</div>

							<div className={styles.maintenanceCosts}>
								<h3>{item.serviceLife.serviceInterval.title}</h3>
								<ul className={styles.costsList}>
									<li><span
										className={styles.goodRating}>🟢&nbsp; </span>{item.serviceLife.serviceInterval.regular.title} {item.serviceLife.serviceInterval.regular.desc}
									</li>
									<li><span
										className={styles.mediumRating}>🟡&nbsp; </span>{item.serviceLife.serviceInterval.middle.title} {item.serviceLife.serviceInterval.middle.desc}
									</li>
									<li><span
										className={styles.lowRating}>🔴&nbsp; </span>{item.serviceLife.serviceInterval.major.title} {item.serviceLife.serviceInterval.major.desc}
									</li>
								</ul>
							</div>
						</div>
						<div className={styles.maintenanceInfo}>
							<h3 className={styles.maintenanceTitle}>
								{/*<span className={styles.parameterIcon}></span>*/}
								{item.serviceLife.maintenanceTypes.standardTitle}
							</h3>


							<div className={styles.maintenanceTable}>
								<table className={styles.comparisonTable}>
									<thead>
									<tr>
										<th>{item.serviceLife.maintenanceTypes.component}</th>
										<th>{item.serviceLife.maintenanceTypes.works}</th>
									</tr>
									</thead>
									<tbody>
									<tr>
										<td>
											{/*🛢️*/}
											{item.serviceLife.maintenanceTypes.oil}</td>
										<td>
											{/*🔄 */}
											{item.serviceLife.maintenanceTypes.oilChange}</td>
									</tr>
									<tr>
										<td>
											{/*🧴 */}
											{item.serviceLife.maintenanceTypes.oilFilters}</td>
										<td>
											{/*🔄 */}
											{item.serviceLife.maintenanceTypes.oilFiltersChange}</td>
									</tr>
									<tr>
										<td>
											{/*🌀 */}
											{item.serviceLife.maintenanceTypes.airFilters}</td>
										<td>
											{/*🔄 */}
											{item.serviceLife.maintenanceTypes.airFiltersChange}</td>
									</tr>
									<tr>
										<td>
											{/*🔥 */}
											{item.serviceLife.maintenanceTypes.sparkPlugs}</td>
										<td>
											{/*🔄 */}
											{item.serviceLife.maintenanceTypes.sparkPlugsChange}</td>
									</tr>
									<tr>
										<td>
											{/*🔍 */}
											{item.serviceLife.maintenanceTypes.engineDiagnostics}</td>
										<td>
											{/*📈 */}
											{item.serviceLife.maintenanceTypes.engineDiagnosticsCheck}</td>
									</tr>
									<tr>
										<td>
											{/*🧪 */}
											{item.serviceLife.maintenanceTypes.oilAnalysis}</td>
										<td>
											{/*🧫 */}
											{item.serviceLife.maintenanceTypes.oilAnalysisCheck}</td>
									</tr>
									<tr>
										<td>
											{/*🌡️*/}
											{item.serviceLife.maintenanceTypes.coolant}</td>
										<td>
											{/*🔄 */}
											{item.serviceLife.maintenanceTypes.coolantCheck}</td>
									</tr>
									<tr>
										<td>
											{/*⛽ */}
											{item.serviceLife.maintenanceTypes.gasValve}</td>
										<td>
											{/*🔎 */}
											{item.serviceLife.maintenanceTypes.gasValveCheck}</td>
									</tr>
									<tr>
										<td>
											{/*⚡ */}
											{item.serviceLife.maintenanceTypes.generator}</td>
										<td>
											{/*🔍 */}
											{item.serviceLife.maintenanceTypes.generatorCheck}</td>
									</tr>
									<tr>
										<td>
											{/*🧠 */}
											{item.serviceLife.maintenanceTypes.automation}</td>
										<td>
											{/*🛠️*/}
											{item.serviceLife.maintenanceTypes.automationCheck}</td>
									</tr>
									<tr>
										<td>
											{/*📋 */}
											{item.serviceLife.maintenanceTypes.fasteners}</td>
										<td>
											{/*🔧 */}
											{item.serviceLife.maintenanceTypes.fastenersCheck}</td>
									</tr>
									</tbody>
								</table>
							</div>

							<h3 className={styles.maintenanceTitle}>
								{/*<span className={styles.parameterIcon}>🔧</span>*/}
								{item.serviceLife.maintenanceTypes.midLifeTitle}
							</h3>
							<p className={styles.maintenanceDescription}>{item.serviceLife.maintenanceTypes.midLifeDescription}</p>

							<div className={styles.keyPoints}>
								<h4>{item.serviceLife.maintenanceTypes.mainWorks}</h4>
								<ul className={styles.checkList_simple}>
									<li>{item.serviceLife.maintenanceTypes.midLife.point1}</li>
									<li>{item.serviceLife.maintenanceTypes.midLife.point2}</li>
									<li>{item.serviceLife.maintenanceTypes.midLife.point3}</li>
									<li>{item.serviceLife.maintenanceTypes.midLife.point4}</li>
									<li>{item.serviceLife.maintenanceTypes.midLife.point5}</li>
									<li>{item.serviceLife.maintenanceTypes.midLife.point6}</li>
									<li>{item.serviceLife.maintenanceTypes.midLife.point7}</li>
									<li>{item.serviceLife.maintenanceTypes.midLife.point8}</li>
									<li>{item.serviceLife.maintenanceTypes.midLife.point9}</li>
								</ul>
							</div>

							<h3 className={styles.maintenanceTitle}>
								{/*<span className={styles.parameterIcon}>🔧</span>*/}
								{item.serviceLife.maintenanceTypes.majorTitle}
							</h3>
							<p className={styles.maintenanceDescription}>{item.serviceLife.maintenanceTypes.majorDescription}</p>

							<div className={styles.keyPoints}>
								<h4>{item.serviceLife.maintenanceTypes.includes}</h4>
								<ul className={styles.checkList_simple}>
									<li>{item.serviceLife.maintenanceTypes.major.point1}</li>
									<li>{item.serviceLife.maintenanceTypes.major.point2}</li>
									<li>{item.serviceLife.maintenanceTypes.major.point3}</li>
									<li>{item.serviceLife.maintenanceTypes.major.point4}</li>
									<li>{item.serviceLife.maintenanceTypes.major.point5}</li>
									<li>{item.serviceLife.maintenanceTypes.major.point6}</li>
									<li>{item.serviceLife.maintenanceTypes.major.point7}</li>
									<li>{item.serviceLife.maintenanceTypes.major.point8}</li>
								</ul>
							</div>

							<div className={styles.maintenanceCosts}>
								<h3>{item.serviceLife.maintenanceTypes.averageCosts}</h3>
								<ul className={styles.costsList}>
									<li><span
										className={styles.goodRating}>🟢</span> {item.serviceLife.maintenanceTypes.standardCost}
									</li>
									<li><span
										className={styles.mediumRating}>🟡</span> {item.serviceLife.maintenanceTypes.midLifeCost}
									</li>
									<li><span
										className={styles.lowRating}>🔴</span> {item.serviceLife.maintenanceTypes.majorCost}
									</li>
								</ul>
							</div>
						</div>
					</>
				}

				{/*how choose*/}
				{item.useful?.howToChooseGPU &&
					<div className={styles.sectionContent}>
						<p className={styles.introText}>{item.useful.howToChooseGPU.intro1}</p>
						<p className={styles.introText}>{item.useful.howToChooseGPU.intro2}</p>

						{/* Параметр 1 */}
						<div className={styles.parameterBlock}>
							<h3 className={styles.parameterTitle}>
								{/*<span className={styles.parameterIcon}></span>*/}
								{item.useful.howToChooseGPU.parameter1.title}
							</h3>
							<p>{item.useful.howToChooseGPU.parameter1.description}</p>

							<div className={styles.keyPoints}>
								<h4>{item.useful.keyQuestions}</h4>
								<ul className={styles.checkList}>
									<li>{item.useful.howToChooseGPU.parameter1.point1}</li>
									<li>{item.useful.howToChooseGPU.parameter1.point2}</li>
									<li>{item.useful.howToChooseGPU.parameter1.point3}</li>
								</ul>

								<div className={styles.tip}>
									<h4>{item.useful.tip}</h4>
									<p>{item.useful.howToChooseGPU.parameter1.tip}</p>
								</div>
							</div>
						</div>

						{/* Параметр 2 */}
						<div className={styles.parameterBlock}>
							<h3 className={styles.parameterTitle}>
								{/*<span className={styles.parameterIcon}></span>*/}
								{item.useful.howToChooseGPU.parameter2.title}
							</h3>
							<p>{item.useful.howToChooseGPU.parameter2.description}</p>

							<div className={styles.keyPoints}>
								<h4>{item.useful.whatToConsider}</h4>
								<ul className={styles.checkList}>
									<li>{item.useful.howToChooseGPU.parameter2.point1}</li>
									<li>{item.useful.howToChooseGPU.parameter2.point2}</li>
									<li>{item.useful.howToChooseGPU.parameter2.point3}</li>
									<li>{item.useful.howToChooseGPU.parameter2.point4}</li>
								</ul>

								<div className={styles.tip}>
									<h4>{item.useful.tip}</h4>
									<p>{item.useful.howToChooseGPU.parameter2.tip}</p>
								</div>
							</div>
						</div>

						{/* Параметр 3 */}
						<div className={styles.parameterBlock}>
							<h3 className={styles.parameterTitle}>
								{/*<span className={styles.parameterIcon}></span>*/}
								{item.useful.howToChooseGPU.parameter3.title}
							</h3>
							<p>{item.useful.howToChooseGPU.parameter3.description}</p>

							<div className={styles.keyPoints}>
								<h4>{item.useful.whatToConsider}</h4>
								<ul className={styles.checkList}>
									<li>{item.useful.howToChooseGPU.parameter3.point1}</li>
									<li>{item.useful.howToChooseGPU.parameter3.point2}</li>
									<li>{item.useful.howToChooseGPU.parameter3.point3}</li>
									<li>{item.useful.howToChooseGPU.parameter3.point4}</li>
								</ul>

								<div className={styles.tableWrapper}>
									<h4>{item.useful.howToChooseGPU.parameter3.consumptionTable.title}</h4>
									<table className={styles.comparisonTable}>
										<thead>
										<tr>
											<th>{item.useful.howToChooseGPU.parameter3.consumptionTable.headers.model}</th>
											<th>{item.useful.howToChooseGPU.parameter3.consumptionTable.headers.efficiency}</th>
											<th>{item.useful.howToChooseGPU.parameter3.consumptionTable.headers.consumption}</th>
										</tr>
										</thead>
										<tbody>
										<tr>
											<td>{item.useful.howToChooseGPU.parameter3.consumptionTable.rows[0].model}</td>
											<td>{item.useful.howToChooseGPU.parameter3.consumptionTable.rows[0].efficiency}</td>
											<td>{item.useful.howToChooseGPU.parameter3.consumptionTable.rows[0].consumption}</td>
										</tr>
										<tr>
											<td>{item.useful.howToChooseGPU.parameter3.consumptionTable.rows[1].model}</td>
											<td>{item.useful.howToChooseGPU.parameter3.consumptionTable.rows[1].efficiency}</td>
											<td>{item.useful.howToChooseGPU.parameter3.consumptionTable.rows[1].consumption}</td>
										</tr>
										<tr>
											<td>{item.useful.howToChooseGPU.parameter3.consumptionTable.rows[2].model}</td>
											<td>{item.useful.howToChooseGPU.parameter3.consumptionTable.rows[2].efficiency}</td>
											<td>{item.useful.howToChooseGPU.parameter3.consumptionTable.rows[2].consumption}</td>
										</tr>
										<tr>
											<td>{item.useful.howToChooseGPU.parameter3.consumptionTable.rows[3].model}</td>
											<td>{item.useful.howToChooseGPU.parameter3.consumptionTable.rows[3].efficiency}</td>
											<td>{item.useful.howToChooseGPU.parameter3.consumptionTable.rows[3].consumption}</td>
										</tr>
										<tr>
											<td>{item.useful.howToChooseGPU.parameter3.consumptionTable.rows[4].model}</td>
											<td>{item.useful.howToChooseGPU.parameter3.consumptionTable.rows[4].efficiency}</td>
											<td>{item.useful.howToChooseGPU.parameter3.consumptionTable.rows[4].consumption}</td>
										</tr>
										</tbody>
									</table>
								</div>

								<div className={styles.tip}>
									<h4>{item.useful.tip}</h4>
									<p>{item.useful.howToChooseGPU.parameter3.tip}</p>
								</div>
							</div>
						</div>

						{/* Параметр 4 */}
						<div className={styles.parameterBlock}>
							<h3 className={styles.parameterTitle}>
								{/*<span className={styles.parameterIcon}></span>*/}
								{item.useful.howToChooseGPU.parameter4.title}
							</h3>
							<p>{item.useful.howToChooseGPU.parameter4.description}</p>

							<div className={styles.keyPoints}>
								<ul className={styles.checkList}>
									<li>{item.useful.howToChooseGPU.parameter4.point1}</li>
									<li>{item.useful.howToChooseGPU.parameter4.point2}</li>
									<li>{item.useful.howToChooseGPU.parameter4.point3}</li>
								</ul>
							</div>
						</div>

						{/* Параметр 5 */}
						<div className={styles.parameterBlock}>
							<h3 className={styles.parameterTitle}>
								{/*<span className={styles.parameterIcon}></span>*/}
								{item.useful.howToChooseGPU.parameter5.title}
							</h3>
							<p>{item.useful.howToChooseGPU.parameter5.description}</p>

							<div className={styles.keyPoints}>
								<h4>{item.useful.whatToConsider}</h4>
								<ul className={styles.checkList}>
									<li>{item.useful.howToChooseGPU.parameter5.point1}</li>
									<li>{item.useful.howToChooseGPU.parameter5.point2}</li>
									<li>{item.useful.howToChooseGPU.parameter5.point3}</li>
									<li>{item.useful.howToChooseGPU.parameter5.point4}</li>
									<li>{item.useful.howToChooseGPU.parameter5.point5}</li>
								</ul>

								<div className={styles.tip}>
									<h4>{item.useful.tip}</h4>
									<p>{item.useful.howToChooseGPU.parameter5.tip}</p>
								</div>
							</div>
						</div>

						{/* Параметр 6 */}
						<div className={styles.parameterBlock}>
							<h3 className={styles.parameterTitle}>
								{/*<span className={styles.parameterIcon}></span>*/}
								{item.useful.howToChooseGPU.parameter6.title}
							</h3>
							<p>{item.useful.howToChooseGPU.parameter6.description}</p>

							<div className={styles.keyPoints}>
								<h4>{item.useful.whatToConsider}</h4>
								<ul className={styles.checkList}>
									<li>{item.useful.howToChooseGPU.parameter6.point1}</li>
									<li>{item.useful.howToChooseGPU.parameter6.point2}</li>
									<li>{item.useful.howToChooseGPU.parameter6.point3}</li>
									<li>{item.useful.howToChooseGPU.parameter6.point4}</li>
								</ul>

								<div className={styles.tip}>
									<h4>{item.useful.tip}</h4>
									<p>{item.useful.howToChooseGPU.parameter6.tip}</p>
								</div>
							</div>
						</div>

						{/* Параметр 7 */}
						<div className={styles.parameterBlock}>
							<h3 className={styles.parameterTitle}>
								{/*<span className={styles.parameterIcon}></span>*/}
								{item.useful.howToChooseGPU.parameter7.title}
							</h3>
							<p>{item.useful.howToChooseGPU.parameter7.description}</p>

							<div className={styles.keyPoints}>
								<ul className={styles.checkList}>
									<li>{item.useful.howToChooseGPU.parameter7.point1}</li>
									<li>{item.useful.howToChooseGPU.parameter7.point2}</li>
									<li>{item.useful.howToChooseGPU.parameter7.point3}</li>
								</ul>

								<div className={styles.tip}>
									<h4>{item.useful.tip}</h4>
									<p>{item.useful.howToChooseGPU.parameter7.tip}</p>
								</div>
							</div>
						</div>

						{/* Параметр 8 */}
						<div className={styles.parameterBlock}>
							<h3 className={styles.parameterTitle}>
								{/*<span className={styles.parameterIcon}></span>*/}
								{item.useful.howToChooseGPU.parameter8.title}
							</h3>
							<p>{item.useful.howToChooseGPU.parameter8.description}</p>

							<div className={styles.tableWrapper}>
								<h4>{item.useful.howToChooseGPU.parameter8.costTable.title}</h4>
								<table className={styles.comparisonTable}>
									<thead>
									<tr>
										<th>{item.useful.howToChooseGPU.parameter8.costTable.headers.factor}</th>
										<th>{item.useful.howToChooseGPU.parameter8.costTable.headers.cost}</th>
									</tr>
									</thead>
									<tbody>
									<tr>
										<td>{item.useful.howToChooseGPU.parameter8.costTable.rows[0].factor}</td>
										<td>{item.useful.howToChooseGPU.parameter8.costTable.rows[0].cost}</td>
									</tr>
									<tr>
										<td>{item.useful.howToChooseGPU.parameter8.costTable.rows[1].factor}</td>
										<td>{item.useful.howToChooseGPU.parameter8.costTable.rows[1].cost}</td>
									</tr>
									<tr>
										<td>{item.useful.howToChooseGPU.parameter8.costTable.rows[2].factor}</td>
										<td>{item.useful.howToChooseGPU.parameter8.costTable.rows[2].cost}</td>
									</tr>
									<tr>
										<td>{item.useful.howToChooseGPU.parameter8.costTable.rows[3].factor}</td>
										<td>{item.useful.howToChooseGPU.parameter8.costTable.rows[3].cost}</td>
									</tr>
									<tr>
										<td>{item.useful.howToChooseGPU.parameter8.costTable.rows[4].factor}</td>
										<td>{item.useful.howToChooseGPU.parameter8.costTable.rows[4].cost}</td>
									</tr>
									</tbody>
								</table>
							</div>

							<div className={styles.tip}>
								<h4>{item.useful.tip}</h4>
								<p>{item.useful.howToChooseGPU.parameter8.tip}</p>
							</div>
						</div>

						{/* Параметр 9 */}
						<div className={styles.parameterBlock}>
							<h3 className={styles.parameterTitle}>
								{/*<span className={styles.parameterIcon}></span>*/}
								{item.useful.howToChooseGPU.parameter9.title}
							</h3>
							<p>{item.useful.howToChooseGPU.parameter9.description}</p>

							<div className={styles.keyPoints}>
								<ul className={styles.checkList}>
									<li>{item.useful.howToChooseGPU.parameter9.point1}</li>
									<li>{item.useful.howToChooseGPU.parameter9.point2}</li>
									<li>{item.useful.howToChooseGPU.parameter9.point3}</li>
								</ul>

								<div className={styles.tip}>
									<h4>{item.useful.tip}</h4>
									<p>{item.useful.howToChooseGPU.parameter9.tip}</p>
								</div>
							</div>
						</div>

						{/* Итоги */}
						<div className={styles.summaryBlock}>
							<h3 className={styles.summaryTitle}>
								{/*<span className={styles.parameterIcon}></span>*/}
								{item.useful.howToChooseGPU.summary.title}
							</h3>
							<ul className={styles.summaryList}>
								<li>{item.useful.howToChooseGPU.summary.point1}</li>
								<li>{item.useful.howToChooseGPU.summary.point2}</li>
								<li>{item.useful.howToChooseGPU.summary.point3}</li>
								<li>{item.useful.howToChooseGPU.summary.point4}</li>
								<li>{item.useful.howToChooseGPU.summary.point5}</li>
								<li>{item.useful.howToChooseGPU.summary.point6}</li>
								<li>{item.useful.howToChooseGPU.summary.point7}</li>
							</ul>
							<p className={styles.conclusion}>{item.useful.howToChooseGPU.summary.conclusion}</p>


						</div>
					</div>
				}

				{/*whatIsGPU*/}
				{item.whatIsGPU &&
					<div>
						{/*<div className={styles.parameterBlock}>*/}
						{/*	<h3 className={styles.parameterTitle}>*/}
						{/*/!*		<span className={styles.parameterIcon}>🔧</span>*!/*/}
						{/*		{item.whatIsGPU.structure.title}*/}
						{/*	</h3>*/}
						{/*	<p className={styles.whatIsGPU_p}>{item.whatIsGPU.structure.typesIntro}</p>*/}
						{/*	<ul className={styles.checkList_simple}>*/}
						{/*		<li>{item.whatIsGPU.structure.type1}</li>*/}
						{/*		<li>{item.whatIsGPU.structure.type2}</li>*/}
						{/*	</ul>*/}
						{/*	<p className={styles.whatIsGPU_p}>{item.whatIsGPU.structure.componentsIntro}</p>*/}
						{/*	<ul className={styles.checkList_simple}>*/}
						{/*		<li>{item.whatIsGPU.structure.component1}</li>*/}
						{/*		<li>{item.whatIsGPU.structure.component2}</li>*/}
						{/*		<li>{item.whatIsGPU.structure.component3}</li>*/}
						{/*		<li>{item.whatIsGPU.structure.component4}</li>*/}
						{/*		<li>{item.whatIsGPU.structure.component5}</li>*/}
						{/*		<li>{item.whatIsGPU.structure.component6}</li>*/}
						{/*		<li>{item.whatIsGPU.structure.component7}</li>*/}
						{/*	</ul>*/}
						{/*</div>*/}

						<div className={styles.parameterBlock}>
							<h3 className={styles.parameterTitle}>
								{/*<span className={styles.parameterIcon}>⚙️</span>*/}
								{item.whatIsGPU.principle.title}
							</h3>

							<h4 className={styles.subTitle}>{item.whatIsGPU.principle.step1.title}</h4>
							<p className={styles.whatIsGPU_p}>{item.whatIsGPU.principle.step1.description}</p>
							<ul className={styles.checkList_simple}>
								<li>{item.whatIsGPU.principle.step1.point1}</li>
								<li>{item.whatIsGPU.principle.step1.point2}</li>
								<li>{item.whatIsGPU.principle.step1.point3}</li>
								<li>{item.whatIsGPU.principle.step1.point4}</li>
								<li>{item.whatIsGPU.principle.step1.point5}</li>
								<li>{item.whatIsGPU.principle.step1.point6}</li>
							</ul>

							<h4 className={styles.subTitle}>{item.whatIsGPU.principle.step2.title}</h4>
							<p className={styles.whatIsGPU_p}>{item.whatIsGPU.principle.step2.description}</p>
							<ul className={styles.checkList_simple}>
								<li>{item.whatIsGPU.principle.step2.point1}</li>
								<li>{item.whatIsGPU.principle.step2.point2}</li>
							</ul>

							<h4 className={styles.subTitle}>{item.whatIsGPU.principle.step3.title}</h4>
							<p className={styles.whatIsGPU_p}>{item.whatIsGPU.principle.step3.description}</p>
							<ul className={styles.checkList_simple}>
								<li>{item.whatIsGPU.principle.step3.point1}</li>
								<li>{item.whatIsGPU.principle.step3.point2}</li>
								<li>{item.whatIsGPU.principle.step3.point3}</li>
							</ul>

							<h4 className={styles.subTitle}>{item.whatIsGPU.principle.step4.title}</h4>
							<p className={styles.whatIsGPU_p}>{item.whatIsGPU.principle.step4.description}</p>
							<ul className={styles.checkList_simple}>
								<li>{item.whatIsGPU.principle.step4.point1}</li>
								<li>{item.whatIsGPU.principle.step4.point2}</li>
								<li>{item.whatIsGPU.principle.step4.point3}</li>
							</ul>

							<h4 className={styles.subTitle}>{item.whatIsGPU.principle.step5.title}</h4>
							<p className={styles.whatIsGPU_p}>{item.whatIsGPU.principle.step5.description}</p>
							<ul className={styles.checkList_simple}>
								<li>{item.whatIsGPU.principle.step5.point1}</li>
								<li>{item.whatIsGPU.principle.step5.point2}</li>
								<li>{item.whatIsGPU.principle.step5.point3}</li>
							</ul>

							<h4 className={styles.subTitle}>{item.whatIsGPU.principle.step6.title}</h4>
							<p className={styles.whatIsGPU_p}>{item.whatIsGPU.principle.step6.description}</p>
							<ul className={styles.checkList_simple}>
								<li>{item.whatIsGPU.principle.step6.point1}</li>
								<li>{item.whatIsGPU.principle.step6.point2}</li>
								<li>{item.whatIsGPU.principle.step6.point3}</li>
								<li>{item.whatIsGPU.principle.step6.point4}</li>
							</ul>
						</div>

						<div className={styles.parameterBlock}>
							<h3 className={styles.parameterTitle}>
								{/*<span className={styles.parameterIcon}>📈</span>*/}
								{item.whatIsGPU.indicators.title}
							</h3>
							<ul className={styles.checkList_simple}>
								<li>{item.whatIsGPU.indicators.point1}</li>
								<li>{item.whatIsGPU.indicators.point2}</li>
								<li>{item.whatIsGPU.indicators.point3}</li>
								<li>{item.whatIsGPU.indicators.point4}</li>
								<li>{item.whatIsGPU.indicators.point5}</li>
							</ul>
						</div>

						<div className={styles.parameterBlock}>
							<h3 className={styles.parameterTitle}>
								{/*<span className={styles.parameterIcon}>♻️</span>*/}
								{item.whatIsGPU.cogeneration.title}
							</h3>
							<p>{item.whatIsGPU.cogeneration.formula}</p>
							<p className={styles.whatIsGPU_p}>{item.whatIsGPU.cogeneration.sourcesIntro}</p>
							<ul className={styles.checkList_simple}>
								<li>{item.whatIsGPU.cogeneration.source1}</li>
								<li>{item.whatIsGPU.cogeneration.source2}</li>
							</ul>

							<div className={styles.imageWrapper}>
								<ul className={styles.imageWrapper_list}>
									<li style={{borderBottomColor: carriers.gas}}
									    className={styles.imageWrapper_list__item}>{item.whatIsGPU.carriers.gas}</li>
									<li style={{borderBottomColor: carriers.heating}}
									    className={styles.imageWrapper_list__item}>{item.whatIsGPU.carriers.heating}</li>
									<li style={{borderBottomColor: carriers.electricity}}
									    className={styles.imageWrapper_list__item}>{item.whatIsGPU.carriers.electricity}</li>
									<li style={{borderBottomColor: carriers.exhaust}}
									    className={styles.imageWrapper_list__item}>{item.whatIsGPU.carriers.exhaust}</li>
								</ul>
								<Image src="/images/cogeneration.png" alt="cogeneration" width={600} height={400}
								       className={styles.schemeImage}/>
							</div>
						</div>

						<div className={styles.parameterBlock}>
							<h3 className={styles.parameterTitle}>
								{/*<span className={styles.parameterIcon}>❄️</span>*/}
								{item.whatIsGPU.trigeneration.title}
							</h3>
							<p>{item.whatIsGPU.trigeneration.description}</p>
							<p className={styles.whatIsGPU_p}>{item.whatIsGPU.trigeneration.examples}</p>
							<ul className={styles.checkList_simple}>
								<li>{item.whatIsGPU.trigeneration.example1}</li>
								<li>{item.whatIsGPU.trigeneration.example2}</li>
							</ul>

							<div className={styles.imageWrapper}>
								<ul className={styles.imageWrapper_list}>
									<li style={{borderBottomColor: carriers.gas}}
									    className={styles.imageWrapper_list__item}>{item.whatIsGPU.carriers.gas}</li>
									<li style={{borderBottomColor: carriers.heating}}
									    className={styles.imageWrapper_list__item}>{item.whatIsGPU.carriers.heating}</li>
									<li style={{borderBottomColor: carriers.electricity}}
									    className={styles.imageWrapper_list__item}>{item.whatIsGPU.carriers.electricity}</li>
									<li style={{borderBottomColor: carriers.coolant}}
									    className={styles.imageWrapper_list__item}>{item.whatIsGPU.carriers.coolant}</li>
									<li style={{borderBottomColor: carriers.exhaust}}
									    className={styles.imageWrapper_list__item}>{item.whatIsGPU.carriers.exhaust}</li>

								</ul>
								<Image src="/images/trigeneration.png" alt="trigeneration" width={600} height={400}
								       className={styles.schemeImage}/>
							</div>
						</div>
					</div>
				}
			</div>

			{/*Що нового*/}
			<div className={`${styles.news} container`}>
				<h2 className={styles.news_header}>{t("blog.pageSlug")}</h2>
				<div className={styles.news_list}>
					{Object.values(t("blog.data", {returnObjects: true}) || {})
						.filter(item => item && typeof item === "object")
						.map(({id, image, title, subtitle, href}, index) => (
							<React.Fragment key={index + id}>
								{href !== item.href &&
									<div key={id || index} className={styles.news_item}>
										<Image className={styles.news_image}
										       src={image}
										       alt={title}
										       width={385}
										       height={233}/>
										<h4 className={styles.news_item__header}>{title}</h4>
										<span className={styles.news_item__span}>{subtitle}</span>
										<CustomLink href={`/blog/${href}`} height={40} text={t("blog.details")} style={{
											marginTop: "auto",
											border: '1px solid #50AE55',
											width: 'max-content',
										}}/>
									</div>
								}
							</React.Fragment>
						))}
				</div>
			</div>

			<Consultation/>
		</>
	);
};

export default BlogPageClient;