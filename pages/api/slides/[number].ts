import { getSlide } from "lib/slides";

export default async function handler(req, res) {
    const { number } = req.query;
    const slide = await getSlide(number);
    res.status(200).json(slide);
}
