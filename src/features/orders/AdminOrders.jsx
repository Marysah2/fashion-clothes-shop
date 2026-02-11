import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  fetchAllOrders,
  updateOrderStatus,
  selectAllOrders,
  selectAllOrdersStatus,
  selectAllOrdersError
} from './orderSlice';
import './AdminOrders.css';

const AdminOrders = () => {
  const dispatch = useDispatch();
  const orders = useSelector(selectAllOrders);
  const status = useSelector(selectAllOrdersStatus);
  const error = useSelector(selectAllOrdersError);

  const [filters, setFilters] = useState({
    status: 'all',
    search: ''
  });
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [bulkSelected, setBulkSelected] = useState([]);
  const [showBulkActions, setShowBulkActions] = useState(false);

  useEffect(() => {
    dispatch(fetchAllOrders(filters));
  }, [dispatch, filters]);

  // Filter orders based on search and status
  const filteredOrders = orders.filter(order => {
    const statusMatch = filters.status === 'all' || order.status === filters.status;
    const searchMatch = filters.search === '' ||
      order._id.toLowerCase().includes(filters.search.toLowerCase()) ||
      order.customer?.name?.toLowerCase().includes(filters.search.toLowerCase()) ||
      order.customer?.email?.toLowerCase().includes(filters.search.toLowerCase());
    return statusMatch && searchMatch;
  });

  // Calculate statistics
  const stats = {
    total: filteredOrders.length,
    totalRevenue: filteredOrders.reduce((sum, order) => sum + order.totalAmount, 0),
    pending: filteredOrders.filter(o => o.status === 'pending').length,
    delivered: filteredOrders.filter(o => o.status === 'delivered').length
  };

  const handleStatusUpdate = async (orderId, newStatus) => {
    try {
      await dispatch(updateOrderStatus({ orderId, status: newStatus })).unwrap();
    } catch (error) {
      alert(`Failed to update order status: ${error}`);
    }
  };

  const handleBulkStatusUpdate = async (newStatus) => {
    if (bulkSelected.length === 0) return;
    
    if (!window.confirm(`Update ${bulkSelected.length} orders to "${newStatus}"?`)) return;
    
    try {
      for (const orderId of bulkSelected) {
        await dispatch(updateOrderStatus({ orderId, status: newStatus })).unwrap();
      }
      setBulkSelected([]);
      setShowBulkActions(false);
      alert(`Successfully updated ${bulkSelected.length} orders`);
    } catch (error) {
      alert(`Failed to update orders: ${error}`);
    }
  };

  const toggleSelectAll = () => {
    if (bulkSelected.length === filteredOrders.length) {
      setBulkSelected([]);
    } else {
      setBulkSelected(filteredOrders.map(order => order._id));
    }
  };

  const exportToCSV = () => {
    const headers = ['Order ID', 'Customer', 'Email', 'Date', 'Items', 'Total', 'Status'];
    const rows = filteredOrders.map(order => [
      order._id,
      order.customer?.name || 'N/A',
      order.customer?.email || 'N/A',
      new Date(order.createdAt).toLocaleDateString(),
      order.items.reduce((sum, item) => sum + item.quantity, 0),
      order.totalAmount.toFixed(2),
      order.status
    ]);
    
    const csvContent = [
      headers.join(','),
      ...rows.map(row => row.join(','))
    ].join('\n');
    
    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `orders_export_${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
    window.URL.revokeObjectURL(url);
  };

  if (status === 'loading') return <div>Loading...</div>;
  if (status === 'failed') return (
    <div className="admin-orders-error">
      <div className="error-icon"></div>
      <p>{error}</p>
      <button onClick={() => dispatch(fetchAllOrders())} className="retry-btn">
        Retry
      </button>
    </div>
  );

  return (
    <div className="admin-orders-container">
      <div className="admin-orders-header">
        <div>
          <h1>Order Management</h1>
          <p>Manage and track all customer orders</p>
        </div>
        <div className="header-actions">
          <button className="btn-export" onClick={exportToCSV}>
            Export CSV
          </button>
        </div>
      </div>

      {/* Statistics Cards */}
      <div className="stats-grid">
        <StatCard title="Total Orders" value={stats.total.toLocaleString()} icon="📦" color="#3b82f6" />
        <StatCard title="Total Revenue" value={`$${stats.totalRevenue.toFixed(2)}`} icon="💰" color="#10b981" />
        <StatCard title="Pending" value={stats.pending} icon="⏳" color="#f59e0b" />
        <StatCard title="Delivered" value={stats.delivered} icon="✅" color="#10b981" />
      </div>

      {/* Filters */}
      <div className="filters-section">
        <div className="filters-grid">
          <div className="filter-group">
            <label>Status</label>
            <select
              value={filters.status}
              onChange={(e) => setFilters({...filters, status: e.target.value})}
              className="filter-select"
            >
              <option value="all">All Statuses</option>
              <option value="pending">Pending</option>
              <option value="processing">Processing</option>
              <option value="shipped">Shipped</option>
              <option value="delivered">Delivered</option>
              <option value="cancelled">Cancelled</option>
            </select>
          </div>

          <div className="filter-group search-group">
            <label>Search</label>
            <div className="search-container">
              <input
                type="text"
                placeholder="Search orders..."
                value={filters.search}
                onChange={(e) => setFilters({...filters, search: e.target.value})}
                className="search-input"
              />
              {filters.search && (
                <button 
                  className="clear-btn"
                  onClick={() => setFilters({...filters, search: ''})}
                >
                  ✕
                </button>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Bulk Actions */}
      {bulkSelected.length > 0 && (
        <div className="bulk-actions">
          <div className="bulk-info">
            <input
              type="checkbox"
              checked={bulkSelected.length === filteredOrders.length}
              onChange={toggleSelectAll}
              className="bulk-checkbox"
            />
            <span>{bulkSelected.length} selected</span>
          </div>
          <div className="bulk-buttons">
            <select 
              className="bulk-select" 
              onChange={(e) => {
                if (e.target.value) handleBulkStatusUpdate(e.target.value);
              }}
              defaultValue=""
            >
              <option value="" disabled>Bulk Actions</option>
              <option value="pending">Set to Pending</option>
              <option value="processing">Set to Processing</option>
              <option value="shipped">Set to Shipped</option>
              <option value="delivered">Set to Delivered</option>
              <option value="cancelled">Cancel Orders</option>
            </select>
          </div>
        </div>
      )}

      {/* Orders Table */}
      <div className="orders-table-container">
        <div className="table-header">
          <div className="table-title">
            <h2>Orders ({filteredOrders.length})</h2>
          </div>
        </div>
        
        <div className="table-responsive">
          <table className="orders-table">
            <thead>
              <tr>
                <th>
                  <input
                    type="checkbox"
                    checked={bulkSelected.length === filteredOrders.length && filteredOrders.length > 0}
                    onChange={toggleSelectAll}
                    className="header-checkbox"
                  />
                </th>
                <th>Order ID</th>
                <th>Customer</th>
                <th>Date</th>
                <th>Items</th>
                <th>Total</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredOrders.map(order => (
                <tr key={order._id}>
                  <td>
                    <input
                      type="checkbox"
                      checked={bulkSelected.includes(order._id)}
                      onChange={(e) => {
                        if (e.target.checked) {
                          setBulkSelected([...bulkSelected, order._id]);
                        } else {
                          setBulkSelected(bulkSelected.filter(id => id !== order._id));
                        }
                      }}
                      className="row-checkbox"
                    />
                  </td>
                  <td className="order-id-cell">
                    <span className="order-id">{order._id.slice(-8)}</span>
                  </td>
                  <td className="customer-cell">
                    <div className="customer-name">{order.customer?.name || 'N/A'}</div>
                    <div className="customer-email">{order.customer?.email || 'N/A'}</div>
                  </td>
                  <td className="date-cell">
                    {new Date(order.createdAt).toLocaleDateString()}
                  </td>
                  <td className="items-cell">
                    {order.items.reduce((sum, item) => sum + item.quantity, 0)}
                  </td>
                  <td className="total-cell">${order.totalAmount.toFixed(2)}</td>
                  <td className="status-cell">
                    <select
                      value={order.status}
                      onChange={(e) => handleStatusUpdate(order._id, e.target.value)}
                      className={`status-select status-${order.status.toLowerCase()}`}
                    >
                      <option value="pending">Pending</option>
                      <option value="processing">Processing</option>
                      <option value="shipped">Shipped</option>
                      <option value="delivered">Delivered</option>
                      <option value="cancelled">Cancelled</option>
                    </select>
                  </td>
                  <td className="actions-cell">
                    <button 
                      className="btn-view" 
                      onClick={() => setSelectedOrder(order)}
                    >
                      View
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {filteredOrders.length === 0 && (
          <div className="empty-state">
            <div className="empty-icon">📭</div>
            <p>No orders found</p>
            <p className="empty-subtitle">Try adjusting your filters</p>
          </div>
        )}
      </div>

      {/* Order Detail Modal */}
      {selectedOrder && (
        <OrderDetailModal 
          order={selectedOrder} 
          onClose={() => setSelectedOrder(null)}
          onStatusUpdate={handleStatusUpdate}
        />
      )}
    </div>
  );
};

// Helper Components
const StatCard = ({ title, value, icon, color }) => (
  <div className="stat-card">
    <div className="stat-icon" style={{ backgroundColor: `${color}15`, color: color }}>
      {icon}
    </div>
    <div className="stat-value">{value}</div>
    <div className="stat-title">{title}</div>
  </div>
);

const OrderDetailModal = ({ order, onClose, onStatusUpdate }) => {
  const calculateSubtotal = () => {
    return order.items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <div>
            <h2>Order Details</h2>
            <p className="order-number">#{order._id.slice(-8)}</p>
          </div>
          <button className="btn-close" onClick={onClose}>×</button>
        </div>

        <div className="modal-body">
          {/* Order Info */}
          <div className="order-info-grid">
            <div className="info-section">
              <h3>📋 Order Information</h3>
              <div className="info-item">
                <span className="info-label">Status:</span>
                <span className={`status-badge status-${order.status.toLowerCase()}`}>
                  {order.status}
                </span>
              </div>
              <div className="info-item">
                <span className="info-label">Date:</span>
                <span>{new Date(order.createdAt).toLocaleString()}</span>
              </div>
              <div className="info-item">
                <span className="info-label">Total:</span>
                <span className="info-value">${order.totalAmount.toFixed(2)}</span>
              </div>
            </div>

            <div className="info-section">
              <h3>👤 Customer</h3>
              <div className="info-item">
                <span className="info-label">Name:</span>
                <span>{order.customer?.name || 'N/A'}</span>
              </div>
              <div className="info-item">
                <span className="info-label">Email:</span>
                <span>{order.customer?.email || 'N/A'}</span>
              </div>
              <div className="info-item">
                <span className="info-label">Phone:</span>
                <span>{order.customer?.phone || 'N/A'}</span>
              </div>
            </div>
          </div>

          {/* Items */}
          <div className="items-section">
            <h3>🛒 Items ({order.items.length})</h3>
            <div className="items-grid">
              {order.items.map((item, index) => (
                <div key={index} className="item-card">
                  <div className="item-details">
                    <div className="item-name">{item.name}</div>
                    <div className="item-meta">
                      {item.category_name && <span className="item-category">{item.category_name}</span>}
                      <span className="item-price">${item.price.toFixed(2)}</span>
                    </div>
                  </div>
                  <div className="item-quantity">× {item.quantity}</div>
                  <div className="item-total">${(item.price * item.quantity).toFixed(2)}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Totals */}
          <div className="totals-section">
            <h3>💰 Order Summary</h3>
            <div className="totals-grid">
              <div className="total-row">
                <span>Subtotal:</span>
                <span>${calculateSubtotal().toFixed(2)}</span>
              </div>
              <div className="total-row">
                <span>Shipping:</span>
                <span>${(order.shippingFee || 0).toFixed(2)}</span>
              </div>
              <div className="total-row total-highlight">
                <span>Total:</span>
                <span>${order.totalAmount.toFixed(2)}</span>
              </div>
            </div>
          </div>
        </div>

        <div className="modal-footer">
          <button className="btn-secondary" onClick={onClose}>Close</button>
          <select
            value=""
            onChange={(e) => {
              if (e.target.value) {
                onStatusUpdate(order._id, e.target.value);
                onClose();
              }
            }}
            className="status-update-select"
          >
            <option value="" disabled>Update Status</option>
            <option value="pending">Set to Pending</option>
            <option value="processing">Set to Processing</option>
            <option value="shipped">Set to Shipped</option>
            <option value="delivered">Set to Delivered</option>
            <option value="cancelled">Cancel Order</option>
          </select>
        </div>
      </div>
    </div>
  );
};

export default AdminOrders;
