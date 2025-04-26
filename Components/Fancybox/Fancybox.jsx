import React, { useRef, useEffect } from "react";
import { Fancybox as NativeFancybox } from "@fancyapps/ui";
import "@fancyapps/ui/dist/fancybox/fancybox.css";

function Fancybox(props) {
    const containerRef = useRef(null);
    const { fancyboxIsActive, setFancyboxIsActive, delegate = "[data-fancybox]", options = {} } = props;

    useEffect(() => {
        const container = containerRef.current;

        // Allow manual trigger via window
        window.Fancybox = NativeFancybox;

        if (fancyboxIsActive) {
            NativeFancybox.defaults.on = {
                init: () => setFancyboxIsActive?.(true),
                close: () => setFancyboxIsActive?.(false)
            };

            NativeFancybox.bind(container, delegate, options);
        }

        return () => {
            NativeFancybox.unbind(container);
            // Don't auto close unless you want all to close on re-render
        };
    }, [fancyboxIsActive]);

    return <div ref={containerRef}>{props.children}</div>;
}

export default Fancybox;
