// utils/formSubmitHandler.js

const FORM_ID = '1FAIpQLSdRdjEpfyMI_kIvkYpQ0xNrp1K_NAH5lTcDyxO-c-Xm10m7iA';
const FIELD_IDS = {
	fullName: 'entry.1068065394',    // Імʼя
	workEmail: 'entry.170382577',    // Email
	contactPhone: 'entry.354872363', // Телефон
	comment: 'entry.682639409',      // Деталі
	companyName: 'entry.238390855',  // Название компании (опциональное)
	model: 'entry.1720971177'        // Модель (опциональное)
};

export const submitContactForm = async (values, { setSubmitting, resetForm, setSubmitStatus }) => {
	try {
		setSubmitStatus(null);
		console.log('Відправка форми:', values);

		// Відправка події для аналітики/SEO
		if (typeof window !== 'undefined' && window.dataLayer) {
			window.dataLayer.push({
				'event': 'form_submit',
				'formName': 'contact_form',
				'formData': {
					hasName: !!values.fullName,
					hasEmail: !!values.workEmail,
					hasPhone: !!values.contactPhone,
					hasComment: !!values.comment
				}
			});
		}

		const url = `https://docs.google.com/forms/d/e/${FORM_ID}/formResponse`;
		const formData = new FormData();

		// Мапимо поля форми на Google Forms поля
		formData.append(FIELD_IDS.fullName, values.fullName || '');
		formData.append(FIELD_IDS.workEmail, values.workEmail || '');
		formData.append(FIELD_IDS.contactPhone, values.contactPhone || '');
		formData.append(FIELD_IDS.comment, values.comment || '');
		formData.append(FIELD_IDS.companyName, values.companyName || '');
		formData.append(FIELD_IDS.model, values.model || 'Contact Form');

		await fetch(url, {
			method: 'POST',
			mode: 'no-cors',
			body: formData,
		});

		setSubmitStatus('success');
		resetForm();

		// Показуємо повідомлення про успіх на 3 секунди
		setTimeout(() => {
			setSubmitStatus(null);
		}, 3000);

	} catch (error) {
		console.error('Помилка при відправці форми:', error);
		setSubmitStatus('error');

		// Приховуємо повідомлення про помилку через 5 секунд
		setTimeout(() => {
			setSubmitStatus(null);
		}, 5000);
	} finally {
		setSubmitting(false);
	}
};