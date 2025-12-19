import React from 'react';  

const ActionButtons = ({ reservations }) => {

  // Function to export data as CSV
  const exportCSV = () => {
    const header = ['Customer Name', 'Phone', 'Date & Time', 'Table', 'Party Size', 'Staff', 'Status'];
    
    const rows = reservations.map(res => [
      res.customer.name,
      res.customer.phone,
      `${res.date} (${res.dateInfo})`,
      res.table,
      res.partySize,
      res.staff || 'Unassigned',
      res.status
    ]);

    const csvContent = [
      header.join(','),
      ...rows.map(row => row.join(','))
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', `reservations_${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Function to export data as PDF (printable version)
  const exportPDF = () => {
    const printWindow = window.open('', '_blank');
    if (!printWindow) return;

    const htmlContent = `
      <html>
        <head>
          <title>Reservations Report</title>
          <style>
            body { font-family: Arial, sans-serif; }
            table { width: 100%; border-collapse: collapse; }
            th, td { border: 1px solid #ddd; padding: 8px; text-align: left; }
            th { background-color: #f2f2f2; }
            .header { text-align: center; margin-bottom: 20px; }
            .status-badge {
              padding: 4px 8px;
              border-radius: 12px;
              font-size: 12px;
              display: inline-block;
            }
            .checked-in { background-color: #4CAF50; color: white; }
            .upcoming { background-color: #FF9800; color: white; }
            .completed { background-color: #9E9E9E; color: white; }
            .cancelled { background-color: #F44336; color: white; }
          </style>
        </head>
        <body>
          <div class="header">
            <h1>Reservations Report</h1>
            <p>Generated on ${new Date().toLocaleString()}</p>
          </div>
          <table>
            <thead>
              <tr>
                <th>Customer</th>
                <th>Date & Time</th>
                <th>Table</th>
                <th>Party Size</th>
                <th>Staff</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              ${reservations.map(res => `
                <tr>
                  <td>
                    <div>${res.customer.name}</div>
                    <div style="font-size: 12px; color: #666;">${res.customer.phone}</div>
                  </td>
                  <td>
                    <div>${res.date}</div>
                    <div style="font-size: 12px; color: #666;">${res.dateInfo}</div>
                  </td>
                  <td>
                    <div>${res.table}</div>
                    ${res.capacity ? `<div style="font-size:12px;color:#666;">Capacity: ${res.capacity}</div>` : ''}
                  </td>
                  <td>${res.partySize} guests</td>
                  <td>${res.staff || 'Unassigned'}</td>
                  <td><span class="status-badge ${res.status}">${res.status}</span></td>
                </tr>
              `).join('')}
            </tbody>
          </table>
        </body>
      </html>
    `;

    printWindow.document.write(htmlContent);
    printWindow.document.close();

    printWindow.onload = () => printWindow.print();
  };

  return (
    <div className="flex flex-wrap gap-3">
      <button className="flex items-center bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md">
        <span className="mr-1 text-lg font-bold">+</span> New Reservation
      </button>
      <button className="flex items-center bg-gray-100 hover:bg-gray-200 text-gray-700 px-4 py-2 rounded-md" onClick={exportCSV}>
        <span className="mr-1">↓</span> Export CSV
      </button>
      <button className="flex items-center bg-gray-100 hover:bg-gray-200 text-gray-700 px-4 py-2 rounded-md" onClick={exportPDF}>
        <span className="mr-1">↓</span> Export PDF
      </button>
    </div>
  );
};

export default ActionButtons;
