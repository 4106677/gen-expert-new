import {useState, useEffect, useRef} from "react";

export function useMediaQuery(mediaQuery) {
	const [isMatch, setIsMatch] = useState(false);
	const [mediaQueryList, setMediaQueryList] = useState(null);

	useEffect(() => {
		const list = window.matchMedia(mediaQuery);
		setMediaQueryList(list);
		setIsMatch(list.matches);
	}, [mediaQuery]);

	useEventListener("change", (e) => setIsMatch(e.matches), mediaQueryList);

	return isMatch;
}

export function useEventListener(eventType, callback, element = window) {
	const callbackRef = useRef(callback);

	useEffect(() => {
		callbackRef.current = callback;
	}, [callback]);

	useEffect(() => {
		if (element == null) return;

		const handler = (e) => callbackRef.current(e);
		element.addEventListener(eventType, handler);

		return () => element.removeEventListener(eventType, handler);
	}, [eventType, element]);
}

export function useHeroVisibility(callback) {
	useEffect(() => {
		const heroElement = document.getElementById("HeroLogo");
		if (!heroElement) return;

		const observer = new IntersectionObserver(
			(entries) => {
				entries.forEach(entry => {
					callback(entry.isIntersecting);
				});
			},
			{threshold: 0}
		);

		observer.observe(heroElement);

		return () => {
			observer.disconnect();
		};
	}, [callback]);
}