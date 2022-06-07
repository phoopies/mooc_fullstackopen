import { useState, forwardRef, useImperativeHandle } from 'react';

const Hidable = forwardRef((props, ref) => {
    const [isVisible, setIsVisible] = useState(false);

    useImperativeHandle(ref, () => {
        return { toggleVisibility };
    });

    const toggleVisibility = () => {
        setIsVisible(!isVisible);
    };

    return (
        <div>
            {isVisible && props.children}
            <button onClick={toggleVisibility}>{isVisible ? 'cancel' : props.buttonLabel}</button>
        </div>
    );
});

Hidable.displayName = 'Hidable';

export default Hidable;