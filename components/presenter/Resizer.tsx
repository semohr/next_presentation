import { useCallback, useEffect, useRef, useState } from 'react';

interface Props extends React.HTMLAttributes<HTMLDivElement> {
    min_previous?: number;
    max_previous?: number;
}

/** Simple divider that lets your resize two elements
 * - the previous and next element are determined by the order in the DOM
 */
export default function ResizerHorizontal({
    min_previous = 25,
    max_previous = 75,
    ...divProps
}: Props) {
    const resizerRef = useRef<HTMLDivElement>(null);
    const previousElementRef = useRef<HTMLElement>(null);
    const nextElementRef = useRef<HTMLElement>(null);
    const parentElementRef = useRef<HTMLElement>(null);

    // Get the elements surrounding the resizer
    useEffect(() => {
        previousElementRef.current = resizerRef.current
            .previousElementSibling as HTMLElement;
        nextElementRef.current = resizerRef.current
            .nextElementSibling as HTMLElement;
        parentElementRef.current = resizerRef.current
            .parentElement as HTMLElement;
    }, [resizerRef]);

    // The current/mousdown position of the mouse and the previous element
    const mouse = { x: 0, y: 0 };
    let prevWidth = 0;

    function mouseDownHandler(e: React.MouseEvent) {
        // Recheck the elements
        previousElementRef.current = resizerRef.current
            .previousElementSibling as HTMLElement;
        nextElementRef.current = resizerRef.current
            .nextElementSibling as HTMLElement;
        parentElementRef.current = resizerRef.current
            .parentElement as HTMLElement;

        // Get the current mouse position
        mouse.x = e.clientX;
        mouse.y = e.clientY;
        prevWidth = previousElementRef.current.getBoundingClientRect().width;

        // Attach the listeners to `document`
        document.addEventListener('mousemove', mouseMoveHandler);
        document.addEventListener('mouseup', mouseUpHandler);
    }

    function mouseMoveHandler(e: MouseEvent) {
        // How far the mouse has been moved
        const dx = e.pageX - mouse.x;
        //const dy = e.pageY - mouse.y;
        const width_parent =
            parentElementRef.current.getBoundingClientRect().width;

        let newPrevWidth = Math.min(
            Math.max(((prevWidth + dx) * 100) / width_parent, min_previous),
            max_previous
        );

        previousElementRef.current.style.width = `${newPrevWidth}%`;
        nextElementRef.current.style.width = `calc(${
            100 - newPrevWidth
        }% - 10px)`; //10px resizer size

        resizerRef.current.style.cursor = 'col-resize';
        document.body.style.cursor = 'col-resize';

        previousElementRef.current.style.userSelect = 'none';
        previousElementRef.current.style.pointerEvents = 'none';

        nextElementRef.current.style.userSelect = 'none';
        nextElementRef.current.style.pointerEvents = 'none';

        nextElementRef.current.style.userSelect = 'none';
        nextElementRef.current.style.pointerEvents = 'none';
    }

    function mouseUpHandler() {
        resizerRef.current.style.removeProperty('cursor');
        document.body.style.removeProperty('cursor');

        previousElementRef.current.style.removeProperty('user-select');
        previousElementRef.current.style.removeProperty('pointer-events');

        nextElementRef.current.style.removeProperty('user-select');
        nextElementRef.current.style.removeProperty('pointer-events');

        // Remove the handlers of `mousemove` and `mouseup`
        document.removeEventListener('mousemove', mouseMoveHandler);
        document.removeEventListener('mouseup', mouseUpHandler);
    }

    return (
        <div
            {...divProps}
            ref={resizerRef}
            onMouseDown={mouseDownHandler}
        ></div>
    );
}
