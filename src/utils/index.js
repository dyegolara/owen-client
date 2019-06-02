export const formatCurrency = amount => new Intl.NumberFormat('es-MX', {
  style: 'currency',
  currency: 'MXN',
}).format(amount);

export default {
  formatCurrency,
};
