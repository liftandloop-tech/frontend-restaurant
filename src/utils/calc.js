import { TAX_RATE, SERVICE_CHARGE_RATE } from './constants';

// Returns the subtotal of the order
export function getSubtotal(items) {
  return items.reduce((sum, item) => sum + item.price * item.quantity, 0);
}

// Returns the tax for the given subtotal (optionally after discount)
export function getTax(subtotal, discount = 0) {
  return Math.max(0, subtotal - discount) * TAX_RATE;
}

// Returns the service charge for the subtotal (service charge may be toggled)
export function getServiceCharge(subtotal, include = true) {
  return include ? subtotal * SERVICE_CHARGE_RATE : 0;
}

// Returns the total payable
export function getTotal(subtotal, tax, serviceCharge, tip = 0, discount = 0) {
  return Math.max(0, subtotal - discount) + tax + serviceCharge + tip;
}
