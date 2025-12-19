import React from 'react';
import { FiChevronUp, FiChevronDown, FiClock, FiUser, FiDollarSign, FiShoppingCart, FiSettings } from 'react-icons/fi';
import StatusBadge from './StatusBadge';
//import ActionButtons from './ActionButtons';

const OrdersTable = ({ 
  orders, 
  onOrderSelect, 
  onOrderAction, 
  sortBy, 
  sortOrder, 
  onSortChange 
}) => {
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleString('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(amount);
  };

  const handleSort = (column) => {
    const newSortOrder = sortBy === column && sortOrder === 'asc' ? 'desc' : 'asc';
    onSortChange(column, newSortOrder);
  };

  const getSortIcon = (column) => {
    if (sortBy !== column) {
      return <FiChevronUp className="w-4 h-4 text-gray-400" />;
    }
    return sortOrder === 'asc' 
      ? <FiChevronUp className="w-4 h-4 text-blue-600" />
      : <FiChevronDown className="w-4 h-4 text-blue-600" />;
  };

  if (orders.length === 0) {
    return (
      <div className="p-8 text-center">
        <div className="text-gray-500 text-lg mb-2">No orders found</div>
        <div className="text-gray-400">Try adjusting your filters or search criteria</div>
      </div>
    );
  }

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th
              scope="col"
              className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
              onClick={() => handleSort('orderNumber')}
            >
              <div className="flex items-center space-x-1">
                <span>Order ID</span>
                {getSortIcon('orderNumber')}
              </div>
            </th>
            <th
              scope="col"
              className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
              onClick={() => handleSort('customerName')}
            >
              <div className="flex items-center space-x-1">
                <FiUser className="w-4 h-4" />
                <span>Customer/Table</span>
                {getSortIcon('customerName')}
              </div>
            </th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Type
            </th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Status
            </th>
            <th
              scope="col"
              className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
              onClick={() => handleSort('orderTime')}
            >
              <div className="flex items-center space-x-1">
                <FiClock className="w-4 h-4" />
                <span>Time</span>
                {getSortIcon('orderTime')}
              </div>
            </th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              <div className="flex items-center space-x-1">
                <FiShoppingCart className="w-4 h-4" />
                <span>Items</span>
              </div>
            </th>
            <th
              scope="col"
              className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
              onClick={() => handleSort('totalAmount')}
            >
              <div className="flex items-center space-x-1">
                <FiDollarSign className="w-4 h-4" />
                <span>Amount</span>
                {getSortIcon('totalAmount')}
              </div>
            </th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              <div className="flex items-center space-x-1">
                <FiSettings className="w-4 h-4" />
                <span>Staff/Source</span>
              </div>
            </th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Actions
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {orders.map((order) => (
            <tr
              key={order.id}
              className="hover:bg-gray-50 cursor-pointer"
              onClick={() => onOrderSelect(order)}
            >
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-sm font-medium text-gray-900">
                  {order.orderNumber}
                </div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-sm text-gray-900">
                  <div className="font-medium">{order.customerName}</div>
                  <div className="text-gray-500 text-xs">
                    {order.tableNumber ? `Table ${order.tableNumber}` : 'Walk-in'}
                  </div>
                </div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-sm text-gray-900 capitalize">
                  {order.source || 'dine-in'}
                </div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <StatusBadge
                  status={order.status}
                  paymentStatus={order.paymentStatus}
                />
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-sm text-gray-900">{formatDate(order.orderTime)}</div>
              </td>
              <td className="px-6 py-4">
                <div className="text-sm text-gray-900">
                  {order.items && order.items.length > 0 ? (
                    <div>
                      <div className="font-medium">{order.items.length} items</div>
                      <div className="text-gray-500 text-xs max-w-xs truncate">
                        {order.items.slice(0, 2).map(item => `${item.quantity}x ${item.name}`).join(', ')}
                        {order.items.length > 2 && ` +${order.items.length - 2} more`}
                      </div>
                    </div>
                  ) : (
                    <span className="text-gray-400">No items</span>
                  )}
                </div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-sm font-medium text-gray-900">
                  {formatCurrency(order.totalAmount)}
                </div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-sm text-gray-900">
                  <div className="font-medium">
                    {order.raw?.waiterId?.fullName || order.raw?.waiterId?.name || 'Unknown'}
                  </div>
                  <div className="text-gray-500 text-xs capitalize">
                    {order.source || 'dine-in'}
                  </div>
                </div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                <ActionButtons
                  order={order}
                  onOrderAction={onOrderAction}
                  onOrderSelect={onOrderSelect}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default OrdersTable;
