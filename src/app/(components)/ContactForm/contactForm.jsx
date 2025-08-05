'use client'
import React, {useEffect, useState} from "react";
import styles from "./contactForm.module.css";
import Image from "next/image";
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { submitContactForm } from '@/utils/formSubmitHandler';
import {useTranslation} from "react-i18next";

const ContactForm = () => {
	const [submitStatus, setSubmitStatus] = useState(null);
	const [isMounted, setIsMounted] = useState(false);
	const { t } = useTranslation('common');
	const tips = t("contact_form.tips", { returnObjects: true }) || [];

	useEffect(() => {
		setIsMounted(true);
	}, []);

	const initialValues = {
		fullName: '',
		workEmail: '',
		contactPhone: '',
		comment: '',
	};

	const validationSchema = Yup.object({
		fullName: Yup.string()
			.min(2, t('contact_form.form.yup.name')),
		workEmail: Yup.string()
			.email(t('contact_form.form.yup.email')),
		contactPhone: Yup.string()
			.matches(/^[\d\s\+\-\(\)]+$/, t('contact_form.form.yup.phone')),
		comment: Yup.string(),
	});

	const handleSubmit = (values, formikBag) => {
		submitContactForm(values, { ...formikBag, setSubmitStatus });
	};

	if (!isMounted) {
		return (
			<div>
			</div>
		);
	}

	return (
		<div className={`${styles.container} container`} id="contactForm">
			<div className={styles.left}>
				<h2 className={styles.left_header}>{t("contact_form.title")}</h2>
				<span className={styles.left_description}>{t("contact_form.subtitle")}</span>
				<div className={styles.tips_items}>
					{Array.isArray(tips) && tips?.map((tip, index) => (
						<div className={styles.tips_item} key={index}>
							<Image src="/images/check-verified-green.svg" width={30} height={30}
							       alt="check verified"></Image>
							<h5 className={styles.tips_item_text}>{tip}</h5>
						</div>
					))}
				</div>
			</div>
			<div className={styles.right}>
				<h3 className={styles.right_header}>{t("contact_form.form.header")}</h3>

				{submitStatus === 'success' && (
					<div className={styles.successMessage}>
						{t("contact_form.form.messages.success")}
					</div>
				)}

				{submitStatus === 'error' && (
					<div className={styles.errorMessage}>
						{t("contact_form.form.messages.error")}
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
										placeholder={t("contact_form.form.name")}
									/>
									<ErrorMessage name="fullName" component="div" className={styles.error} />
								</div>

								<div className={styles.formGroup}>
									<Field
										type="email"
										name="workEmail"
										className={styles.input}
										placeholder={t("contact_form.form.email")}
									/>
									<ErrorMessage name="workEmail" component="div" className={styles.error} />
								</div>

								<div className={styles.formGroup}>
									<Field
										type="tel"
										name="contactPhone"
										className={styles.input}
										placeholder={t("contact_form.form.phone")}
									/>
									<ErrorMessage name="contactPhone" component="div" className={styles.error} />
								</div>

								<div className={styles.formGroup}>
									<Field
										as="textarea"
										name="comment"
										className={styles.textarea}
										placeholder={t("contact_form.form.details")}
									/>
									<ErrorMessage name="comment" component="div" className={styles.error} />
								</div>

								<button
									type='submit'
									className='btn btn_green'
									style={{fontSize: '18px', fontWeight: 600, width: 'max-content', marginLeft: 'auto', height: '54px'}}
									disabled={isSubmitting}
								>
									{isSubmitting ? t("contact_form.form.sending") : t("contact_form.form.button")}
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