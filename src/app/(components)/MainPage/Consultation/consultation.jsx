import React from "react";
import styles from './consultation.module.css'
import Image from "next/image"

const Consultation = () => {
	return (
		<div className={`${styles.consultation} container`}>
			<h3 className={styles.consultation_header}>Потрібна консультація?</h3>
			<span className={styles.consultation_description}>Наші інженри підберуть краще рішення під вашу потребу та виклики</span>
			<div className={styles.consultation_block}>
				<div className={styles.consultation_contacts}>
					<Image className={styles.consultation_photo} src='/images/mainPage/manager.jpg' width={51}
					       height={51} alt='Manager'></Image>
					<div className={styles.consultation_links}>
						<a href="tel:+380732370045">+38(073)237-00-45</a>
						<a href="mailto:info@genexpert.com.ua">info@genexpert.com.ua</a>
					</div>
				</div>
				<div className={styles.consultation_form}>
					<h6 className={styles.consultation_form__header}>Залиште телефон для зворотнього звʼязку</h6>
					<div className={styles.consultation_form__row}>
						<input type='number' placeholder='Контактний номер'
						       className={styles.consultation_form__input}/>
						<button type='button' className='btn btn_green'>Звʼязатися</button>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Consultation;
