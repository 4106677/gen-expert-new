'use client'
import React, { useState } from "react";
import styles from "./contactForm.module.css";
import Image from "next/image";
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { submitContactForm } from '@/utils/formSubmitHandler';
import {useTranslation} from "react-i18next";

const ContactForm = () => {
	const [submitStatus, setSubmitStatus] = useState(null);
	const { t } = useTranslation('common');

	const initialValues = {
		fullName: '',
		workEmail: '',
		contactPhone: '',
		comment: '',
	};

	const validationSchema = Yup.object({
		fullName: Yup.string()
			.min(2, 'Імʼя повинно містити мінімум 2 символи')
			.required('Імʼя є обовʼязковим полем'),
		workEmail: Yup.string()
			.email('Введіть коректний email')
			.required('Email є обовʼязковим полем'),
		contactPhone: Yup.string()
			.matches(/^[\d\s\+\-\(\)]+$/, 'Введіть коректний номер телефону'),
		comment: Yup.string(),
	});

	const handleSubmit = (values, formikBag) => {
		submitContactForm(values, { ...formikBag, setSubmitStatus });
	};

	return (
		<div className={`${styles.container} container`}>
			<div className={styles.left}>
				<h2 className={styles.left_header}>Скорочуйте витрати! Ми зробимо все під ключ</h2>
				<span className={styles.left_description}>Надійний партнер у переході до власної генерації. Скоротіть витрати на енергію до 50% та забезпечте стабільність роботи вашого бізнесу.</span>
				<div className={styles.tips_items}>
					<div className={styles.tips_item}>
						<Image src='/images/check-verified-green.svg' width={30} height={30} alt='check verified'></Image>
						<h5 className={styles.tips_item_text}>Повний цикл «під ключ»</h5>
					</div>
					<div className={styles.tips_item}>
						<Image src='/images/check-verified-green.svg' width={30} height={30} alt='check verified'></Image>
						<h5 className={styles.tips_item_text}>Проектування та супровід</h5>
					</div>
					<div className={styles.tips_item}>
						<Image src='/images/check-verified-green.svg' width={30} height={30} alt='check verified'></Image>
						<h5 className={styles.tips_item_text}>Спільне фінансування</h5>
					</div>
					<div className={styles.tips_item}>
						<Image src='/images/check-verified-green.svg' width={30} height={30} alt='check verified'></Image>
						<h5 className={styles.tips_item_text}>Купівля обладнання</h5>
					</div>
				</div>
			</div>
			<div className={styles.right}>
				<h3 className={styles.right_header}>Отримати консультацію</h3>

				{submitStatus === 'success' && (
					<div className={styles.successMessage}>
						Дякуємо! Ваша заявка успішно відправлена. Ми звʼяжемося з вами найближчим часом.
					</div>
				)}

				{submitStatus === 'error' && (
					<div className={styles.errorMessage}>
						Виникла помилка при відправці форми. Будь ласка, спробуйте ще раз.
					</div>
				)}

				{submitStatus !== 'success' && (
					<Formik
						initialValues={initialValues}
						validationSchema={validationSchema}
						onSubmit={handleSubmit}
					>
						{({ isSubmitting }) => (
							<Form className={styles.form}>
								<div className={styles.formGroup}>
									<Field
										type="text"
										name="fullName"
										className={styles.input}
										placeholder="Імʼя*"
									/>
									<ErrorMessage name="fullName" component="div" className={styles.error} />
								</div>

								<div className={styles.formGroup}>
									<Field
										type="email"
										name="workEmail"
										className={styles.input}
										placeholder="Email*"
									/>
									<ErrorMessage name="workEmail" component="div" className={styles.error} />
								</div>

								<div className={styles.formGroup}>
									<Field
										type="tel"
										name="contactPhone"
										className={styles.input}
										placeholder="Телефон"
									/>
									<ErrorMessage name="contactPhone" component="div" className={styles.error} />
								</div>

								<div className={styles.formGroup}>
									<Field
										as="textarea"
										name="comment"
										className={styles.textarea}
										placeholder="Деталі"
									/>
									<ErrorMessage name="comment" component="div" className={styles.error} />
								</div>

								<button
									type='submit'
									className='btn btn_green'
									style={{fontSize: '18px', fontWeight: 600, width: '144px', marginLeft: 'auto', height: '54px'}}
									disabled={isSubmitting}
								>
									{isSubmitting ? 'Відправляємо...' : 'Звʼязатися'}
								</button>
							</Form>
						)}
					</Formik>
				)}
			</div>
		</div>
	);
};

export default ContactForm;