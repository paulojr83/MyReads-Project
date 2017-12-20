import PropTypes from 'prop-types'

const If = ({ test, children }) => test ? children : false;

If.propTypes = {
    test: PropTypes.bool.isRequired
};

export default If;
