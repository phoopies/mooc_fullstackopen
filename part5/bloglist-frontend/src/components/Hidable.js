import { useState, forwardRef, useImperativeHandle } from 'react';
import PropTypes from 'prop-types';

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

Hidable.propTypes = {
    buttonLabel: PropTypes.string.isRequired
};

export default Hidable;