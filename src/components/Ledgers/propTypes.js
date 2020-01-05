import PropTypes from "prop-types";

const LedgerShape = PropTypes.shape({
  color: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  modified: PropTypes.string.isRequired,
  total: PropTypes.shape({
    amount: PropTypes.number.isRequired,
    to: PropTypes.string.isRequired
  }).isRequired,
  users: PropTypes.objectOf(PropTypes.string).isRequired
});

export default LedgerShape;
