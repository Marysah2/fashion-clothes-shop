import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Line, Pie, Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
  Filler
} from 'chart.js';
import { fetchAdminAnalytics, selectAnalytics, selectAnalyticsStatus, selectAnalyticsError } from '../orders/orderSlice';
import './AnalyticsDashboard.css';

// Register Chart.js components ONCE
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

const AnalyticsDashboard = () => {
  const dispatch = useDispatch();
  const analytics = useSelector(selectAnalytics);
  const status = useSelector(selectAnalyticsStatus);
  const error = useSelector(selectAnalyticsError);

  const [timeRange, setTimeRange] = useState('30d');

  useEffect(() => {
    dispatch(fetchAdminAnalytics());
  }, [dispatch]);

  if (status === 'loading') return <div>Loading...</div>;
  if (status === 'failed') return (
    <div className="analytics-error">
      <div className="error-icon"></div>
      <p>{error}</p>
      <button onClick={() => dispatch(fetchAdminAnalytics())} className="retry-btn">
        Retry
      </button>
    </div>
  );
  if (!analytics) return null;

  // Filter data based on time range
  const filteredData = {
    summary: analytics.summary,
    ordersTrend: analytics.ordersTrend,
    revenueTrend: analytics.revenueTrend,
    statusDistribution: analytics.statusDistribution,
    categoryStatistics: analytics.categoryStatistics
  };

  // ===== CHART CONFIGURATIONS =====

  // 1. Orders Trend (Line Chart)
  const ordersTrendData = {
    labels: filteredData.ordersTrend.map(item => new Date(item.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })),
    datasets: [{
      label: 'Orders',
      data: filteredData.ordersTrend.map(item => item.count),
      borderColor: 'rgb(59, 130, 246)',
      backgroundColor: 'rgba(59, 130, 246, 0.1)',
      fill: true,
      tension: 0.3,
      pointRadius: 3,
      pointHoverRadius: 6,
      borderWidth: 3
    }]
  };

  const ordersTrendOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: { 
      legend: { position: 'top' },
      tooltip: {
        callbacks: {
          label: (context) => `Orders: ${context.raw}`
        }
      }
    },
    scales: {
      y: { 
        beginAtZero: true, 
        grid: { color: 'rgba(0,0,0,0.05)' },
        ticks: { precision: 0 }
      },
      x: { grid: { display: false } }
    }
  };

  // 2. Revenue Trend (Bar Chart)
  const revenueTrendData = {
    labels: filteredData.revenueTrend.map(item => new Date(item.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })),
    datasets: [{
      label: 'Revenue ($)',
      data: filteredData.revenueTrend.map(item => item.revenue),
      backgroundColor: 'rgba(139, 92, 246, 0.7)',
      borderColor: 'rgb(139, 92, 246)',
      borderWidth: 1,
      borderRadius: 4
    }]
  };

  const revenueTrendOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { position: 'top' },
      tooltip: {
        callbacks: {
          label: (context) => `Revenue: $${context.raw.toFixed(2)}`
        }
      }
    },
    scales: {
      y: { 
        beginAtZero: true, 
        grid: { color: 'rgba(0,0,0,0.05)' },
        ticks: {
          callback: (value) => `$${value.toLocaleString()}`
        }
      },
      x: { grid: { display: false } }
    }
  };

  // 3. Status Distribution (Pie Chart)
  const statusColors = {
    pending: 'rgb(245, 158, 11)',
    processing: 'rgb(59, 130, 246)',
    shipped: 'rgb(99, 102, 241)',
    delivered: 'rgb(16, 185, 129)',
    cancelled: 'rgb(220, 38, 38)'
  };

  const statusPieData = {
    labels: filteredData.statusDistribution.map(item => item.status),
    datasets: [{
      data: filteredData.statusDistribution.map(item => item.count),
      backgroundColor: filteredData.statusDistribution.map(item => 
        statusColors[item.status.toLowerCase()] || 'rgb(156, 163, 175)'
      ),
      borderWidth: 0,
      hoverOffset: 15
    }]
  };

  // 4. Category Statistics (Bar Chart)
  const categoryChartData = {
    labels: filteredData.categoryStatistics.map(item => item.category),
    datasets: [{
      label: 'Revenue ($)',
      data: filteredData.categoryStatistics.map(item => item.revenue),
      backgroundColor: filteredData.categoryStatistics.map((_, i) => 
        `rgba(${59 + i * 20}, ${130 - i * 10}, ${246 - i * 15}, 0.7)`
      ),
      borderColor: filteredData.categoryStatistics.map((_, i) => 
        `rgb(${59 + i * 20}, ${130 - i * 10}, ${246 - i * 15})`
      ),
      borderWidth: 1,
      borderRadius: 4
    }]
  };

  const categoryChartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    indexAxis: 'y',
    plugins: {
      legend: { position: 'top' },
      tooltip: {
        callbacks: {
          label: (context) => `Revenue: $${context.raw.toFixed(2)}`
        }
      }
    },
    scales: {
      x: {
        beginAtZero: true,
        grid: { color: 'rgba(0,0,0,0.05)' }
      },
      y: {
        grid: { display: false }
      }
    }
  };

  return (
    <div className="analytics-dashboard">
      {/* Header */}
      <div className="dashboard-header">
        <div>
          <h1>Order Analytics Dashboard</h1>
          <p className="dashboard-subtitle">Real-time insights into your store's performance</p>
        </div>
        <div className="time-range-selector">
          <button 
            className={`time-btn ${timeRange === '7d' ? 'active' : ''}`}
            onClick={() => setTimeRange('7d')}
          >
            7D
          </button>
          <button 
            className={`time-btn ${timeRange === '30d' ? 'active' : ''}`}
            onClick={() => setTimeRange('30d')}
          >
            30D
          </button>
          <button 
            className={`time-btn ${timeRange === '90d' ? 'active' : ''}`}
            onClick={() => setTimeRange('90d')}
          >
            90D
          </button>
          <button 
            className={`time-btn ${timeRange === '1y' ? 'active' : ''}`}
            onClick={() => setTimeRange('1y')}
          >
            1Y
          </button>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="summary-grid">
        <SummaryCard 
          title="Total Orders" 
          value={filteredData.summary.totalOrders.toLocaleString()}
          icon="📦"
          color="#3b82f6"
        />
        <SummaryCard 
          title="Total Revenue" 
          value={`$${filteredData.summary.totalRevenue.toFixed(2)}`}
          icon="💰"
          color="#10b981"
        />
        <SummaryCard 
          title="Avg. Order Value" 
          value={`$${filteredData.summary.avgOrderValue.toFixed(2)}`}
          icon="📈"
          color="#8b5cf6"
        />
        <SummaryCard 
          title="Pending Orders" 
          value={filteredData.summary.pendingOrders}
          icon="⏳"
          color="#f59e0b"
        />
      </div>

      {/* Charts Grid */}
      <div className="charts-grid">
        {/* Orders Trend */}
        <ChartCard title="Orders Over Time" subtitle="Last 30 days">
          <div style={{ height: '300px' }}>
            <Line data={ordersTrendData} options={ordersTrendOptions} />
          </div>
        </ChartCard>

        {/* Revenue Trend */}
        <ChartCard title="Revenue Trend" subtitle="Last 30 days">
          <div style={{ height: '300px' }}>
            <Bar data={revenueTrendData} options={revenueTrendOptions} />
          </div>
        </ChartCard>

        {/* Status Distribution */}
        <ChartCard title="Order Status Distribution" subtitle="Current breakdown">
          <div style={{ height: '300px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Pie 
              data={statusPieData} 
              options={{ 
                responsive: true, 
                maintainAspectRatio: false,
                plugins: { 
                  legend: { position: 'right' },
                  tooltip: {
                    callbacks: {
                      label: (context) => `${context.label}: ${context.raw} orders`
                    }
                  }
                }
              }} 
            />
          </div>
        </ChartCard>

        {/* Category Performance */}
        <ChartCard title="Category Performance" subtitle="Revenue by category" fullHeight>
          <div style={{ height: '400px' }}>
            <Bar data={categoryChartData} options={categoryChartOptions} />
          </div>
        </ChartCard>
      </div>

      {/* Category Table */}
      {filteredData.categoryStatistics.length > 0 && (
        <div className="category-table-section">
          <div className="section-header">
            <h2>Category-Level Statistics</h2>
            <p>Breakdown of order performance by product category</p>
          </div>
          
          <div className="category-table-container">
            <table className="category-table">
              <thead>
                <tr>
                  <th>Category</th>
                  <th>Orders</th>
                  <th>Revenue</th>
                  <th>Avg. Order Value</th>
                  <th>Share</th>
                </tr>
              </thead>
              <tbody>
                {filteredData.categoryStatistics.map((category, index) => (
                  <tr key={index}>
                    <td>
                      <div className="category-cell">
                        <span className="category-badge" style={{ backgroundColor: getCategoryColor(index) }}>
                          {category.category.charAt(0)}
                        </span>
                        <span>{category.category}</span>
                      </div>
                    </td>
                    <td>{category.count.toLocaleString()}</td>
                    <td>${category.revenue.toFixed(2)}</td>
                    <td>${(category.revenue / category.count).toFixed(2)}</td>
                    <td>
                      <div className="progress-bar">
                        <div 
                          className="progress-fill" 
                          style={{ 
                            width: `${(category.count / filteredData.summary.totalOrders) * 100}%`,
                            backgroundColor: getCategoryColor(index)
                          }}
                        ></div>
                        <span>{((category.count / filteredData.summary.totalOrders) * 100).toFixed(1)}%</span>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};

// Helper Components
const SummaryCard = ({ title, value, icon, color }) => (
  <div className="summary-card">
    <div className="card-header">
      <div className="card-icon" style={{ backgroundColor: `${color}15`, color: color }}>
        {icon}
      </div>
    </div>
    <div className="card-value">{value}</div>
    <div className="card-title">{title}</div>
  </div>
);

const ChartCard = ({ title, subtitle, children, fullHeight = false }) => (
  <div className={`chart-card ${fullHeight ? 'full-height' : ''}`}>
    <div className="chart-header">
      <div>
        <h2>{title}</h2>
        <p>{subtitle}</p>
      </div>
    </div>
    <div className="chart-content">
      {children}
    </div>
  </div>
);

// Helper Functions
const getCategoryColor = (index) => {
  const colors = [
    '#3b82f6', // blue
    '#10b981', // green
    '#8b5cf6', // purple
    '#f59e0b', // amber
    '#ef4444', // red
    '#ec4899', // pink
    '#6366f1', // indigo
    '#14b8a6'  // teal
  ];
  return colors[index % colors.length];
};

export default AnalyticsDashboard;