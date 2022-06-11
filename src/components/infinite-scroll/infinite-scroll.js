import { useEffect, useState } from 'react';
import { useInView } from 'react-intersection-observer';
import { InfiniteScrollLoader } from './infinite-scroll-loader';

export const InfiniteScroll = ({onNext, threshold=0, hasMore=true}) => {

	const { ref, inView } = useInView({threshold});

	const [isLoading, setIsLoading] = useState(false);

	useEffect(() => {

		if (isLoading || !inView || !hasMore) return;

		if (typeof onNext === "function") {
			setIsLoading(true);
			onNext().then( _ => {
				setTimeout(() => {
					setIsLoading(false)
				}, 0);
			})
		}


	}, [inView, isLoading, hasMore])

	return (
		<div ref={ref}>
			{isLoading && <InfiniteScrollLoader />}
		</div>
	)
}