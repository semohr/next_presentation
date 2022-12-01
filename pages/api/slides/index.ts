import { allSlidesSorted } from 'lib/slides';

export default async function handler(req, res) {
    const slides = await allSlidesSorted();

    res.status(200).json(slides);
}
