import { createContext, Dispatch, useContext } from 'react';
import { useBroadcast } from './brodcast';
import { Slide } from './slides';
import { useSlides } from './useSlide';

interface Screen {
    width: number;
    height: number;
}

// Data type for broadcast server
interface DataTypeBroadcast {
    currentSlideIndex: number;
    started?: Date;
    paused: boolean;
    screen: Screen;
}

interface ContextType extends DataTypeBroadcast {
    currentSlideIndex: number;
    setCurrentSlideIndex: Dispatch<number>;

    nextSlide: Slide;
    setNextSlide: () => void;
    setPreviousSlide: () => void;

    currentSlide: Slide;
    setCurrentSlide: Dispatch<Slide>;

    slides: Slide[];

    started?: Date;
    setStarted: Dispatch<Date>;

    paused: boolean;
    setPaused: Dispatch<boolean>;

    screen: Screen;
    setScreen: Dispatch<Screen>;

    isLoading: boolean;
    isError: Error;
}

const Context = createContext<ContextType>(null);

/** Global context for the presentation app
 * synced between tabs using BroadcastChannel
 */
export function ContextProvider({ children }) {
    // Load all slides from api endpoint see (api/slides/index.ts)
    const { slides, isLoading, isError } = useSlides();

    const { state, setState } = useBroadcast<DataTypeBroadcast>(
        'next_presenter',
        {
            currentSlideIndex: 0,
            paused: false,
            screen: {
                width: 1920,
                height: 1080
            }
        }
    );

    // Started time if the presentation has started
    const setStarted = (started: Date) => setState({ ...state, started });

    /** Setters for slides */
    const setCurrentSlide = (slide: Slide) => {
        // Find index of slide
        const index = slides.findIndex((s) => slide == s);
        setState({ ...state, currentSlideIndex: index });
    };
    const setCurrentSlideIndex = (index: number) => {
        //Check if allowed
        if (index < 0 || index >= slides.length) return;
        setState({ ...state, currentSlideIndex: index });
    };
    const setNextSlide = () =>
        setCurrentSlideIndex(state.currentSlideIndex + 1);
    const setPreviousSlide = () =>
        setCurrentSlideIndex(state.currentSlideIndex - 1);

    // Aspect ratio of the presentation
    const setScreen = (screen: Screen) => setState({ ...state, screen });
    const setPaused = (paused: boolean) => setState({ ...state, paused });

    var nextSlide, currentSlide;
    if (slides) {
        currentSlide = slides[state.currentSlideIndex];

        // Next slide checks bounds
        if (state.currentSlideIndex + 1 >= slides.length) {
            nextSlide = {
                source: 'NEXT_SLIDE_NOT_FOUND'
            };
        } else {
            nextSlide = slides[state.currentSlideIndex + 1];
        }
    }

    const ret: ContextType = {
        ...state,
        setCurrentSlideIndex,
        setNextSlide,
        nextSlide,
        setPreviousSlide,

        currentSlide,
        setCurrentSlide,

        slides,

        started: state.started,
        setStarted,

        paused: state.paused,
        setPaused,

        screen: state.screen,
        setScreen,

        isLoading,
        isError
    };

    return <Context.Provider value={ret}>{children}</Context.Provider>;
}

export function usePresentation() {
    return useContext(Context);
}
