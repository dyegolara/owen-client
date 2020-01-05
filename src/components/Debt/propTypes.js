import PropTypes from "prop-types";

const DebtShape = PropTypes.shape({
  amount: PropTypes.number.isRequired,
  created: PropTypes.string.isRequired,
  date: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  to: PropTypes.string.isRequired,
  description: PropTypes.string,
  completed: PropTypes.bool
});

export default DebtShape;
