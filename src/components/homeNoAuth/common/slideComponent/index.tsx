import { Splide, SplideSlide } from "node_modules/@splidejs/react-splide/dist/types";
import "@splidejs/splide/dist/css/splide.min.css";


export default function SlideComponent() {
    return(
        <>
            <div>
                <Splide>
                    <SplideSlide></SplideSlide>
                </Splide>
            </div>
        </>
    )
}