import { useState, forwardRef, useImperativeHandle } from 'react';
import PropTypes from 'prop-types';
import { Button } from '@mui/material';

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
            <Button id={props.id} onClick={toggleVisibility}>
                {isVisible ? 'cancel' : props.buttonLabel}
            </Button>
        </div>
    );
});

Hidable.displayName = 'Hidable';

Hidable.propTypes = {
    buttonLabel: PropTypes.string.isRequired,
};

export default Hidable;
