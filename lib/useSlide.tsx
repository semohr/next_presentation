import useSWR, { Fetcher } from 'swr';
import { Slide } from './slides';

/** Get all slides from the
 * api. (Client-side)
 * @param {number} slide_number
 * @returns {Promise<Slide>}
 */
const fetcher: Fetcher<any, string> = (...args) =>
    fetch(...args).then((res) => res.json());

export function useSlide(slide_number: number) {
    const { data, error } = useSWR<Slide, Error>(
        `/api/slides/${slide_number}`,
        fetcher
    );

    return {
        slide: data,
        isLoading: !error && !data,
        isError: error
    };
}

export function useSlides() {
    const { data, error } = useSWR<Slide[], Error>(`/api/slides`, fetcher, {
        refreshInterval: 1000
    });

    return {
        slides: data,
        isLoading: !error && !data,
        isError: error
    };
}
