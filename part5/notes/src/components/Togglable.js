import { forwardRef, useImperativeHandle, useState } from 'react';
import PropTypes from 'prop-types';

// to access the ref that is assigned to it  -> wrap in forwardRef
const Togglable = forwardRef((props, refs) => {
  const [visible, setVisible] = useState(false);

  const hideWhenVisible = { display: visible ? 'none' : '' };
  const showWhenVisible = { display: visible ? '' : 'none' };

  const toggleVisibility = () => {
    setVisible(!visible);
  };

  // hook to make function available outside of the component
  useImperativeHandle(refs, () => {
    return { toggleVisibility };
  });

  return (
    <div>
      <div style={hideWhenVisible}>
        <button onClick={toggleVisibility}>{props.buttonLabel}</button>
      </div>
      <div style={showWhenVisible} className="togglableContent">
        {props.children}
        <button onClick={toggleVisibility}>cancel</button>
      </div>
    </div>
  );
});

Togglable.displayName = 'Togglable';

// define buttonLabel as required string-type prop
Togglable.propTypes = {
  buttonLabel: PropTypes.string.isRequired,
};

export default Togglable;
