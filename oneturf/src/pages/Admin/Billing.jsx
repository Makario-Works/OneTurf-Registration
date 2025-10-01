import React, { useState, useMemo } from "react";
import {
  startOfWeek,
  endOfWeek,
  isWithinInterval,
  parseISO,
} from "date-fns";
import { jsPDF } from "jspdf";
import "./Styles/Billing.css";

const Billing = () => {
  const [selectedEstate, setSelectedEstate] = useState("All");
  const [transactionType, setTransactionType] = useState("All");
  const [dateFrom, setDateFrom] = useState("");
  const [dateTo, setDateTo] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;
  const [showTable, setShowTable] = useState(false);

  // 📌 Example data
  const [payments] = useState([
    {
      id: 1,
      estate: "OneTurf Estate",
      amount: 1509800.89,
      status: "successful",
      type: "Credit",
      date: "2025-09-30",
      time: "12:42 AM",
      description: "Deed of Assignment",
    },
    {
      id: 2,
      estate: "Oral Estate",
      amount: 700000.09,
      status: "unpaid",
      type: "Debit",
      date: "2025-09-25",
      time: "12:32 AM",
      description: "Contract of Sale",
    },
    {
      id: 3,
      estate: "Victory Estate",
      amount: 886000,
      status: "unpaid",
      type: "Debit",
      date: "2025-09-20",
      time: "12:42 AM",
      description: "Deed of Restrction",
    },
    {
      id: 4,
      estate: "Prime Estate",
      amount: 1288000,
      status: "successful",
      type: "Credit",
      date: "2025-09-28",
      time: "01:42 PM",
      description: "Certificate of Occupancy",
    },
    {
      id: 5,
      estate: "Power Estate",
      amount: 1488000,
      status: "unpaid",
      type: "Credit",
      date: "2025-09-28",
      time: "01:42 PM",
      description: "Withdrew commission",
    },
      {
      id: 6,
      estate: "Peace Estate",
      amount: 1588000,
      status: "successful",
      type: "Credit",
      date: "2025-09-28",
      time: "01:22 PM",
      description: "Commission from Sapa",
    },
    
  ]);

  // 📌 Summary calculations
  const summary = useMemo(() => {
    const now = new Date();
    const weekStart = startOfWeek(now, { weekStartsOn: 1 });
    const weekEnd = endOfWeek(now, { weekStartsOn: 1 });

    let totalPayments = 0;
    let paymentsThisWeek = 0;
    let unpaidPayments = 0;

    payments.forEach((p) => {
      if (p.status === "successful") {
        totalPayments += p.amount;
      }
      if (
        p.status === "successful" &&
        isWithinInterval(parseISO(p.date), { start: weekStart, end: weekEnd })
      ) {
        paymentsThisWeek += p.amount;
      }
      if (p.status === "unpaid") {
        unpaidPayments += p.amount;
      }
    });

    return { totalPayments, paymentsThisWeek, unpaidPayments };
  }, [payments]);

  // 📌 Filter logic
  const filteredPayments = useMemo(() => {
    return payments.filter((p) => {
      const matchesEstate =
        selectedEstate === "All" || p.estate === selectedEstate;
      const matchesType =
        transactionType === "All" || p.type === transactionType;
      const matchesDate =
        (!dateFrom || new Date(p.date) >= new Date(dateFrom)) &&
        (!dateTo || new Date(p.date) <= new Date(dateTo));
      return matchesEstate && matchesType && matchesDate;
    });
  }, [payments, selectedEstate, transactionType, dateFrom, dateTo]);

  // 📌 Pagination logic
  const totalPages = Math.ceil(filteredPayments.length / itemsPerPage);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const paginatedPayments = filteredPayments.slice(
    indexOfFirstItem,
    indexOfLastItem
  );

  // 📌 Export CSV
  const exportCSV = () => {
    if (filteredPayments.length === 0) return;

    const headers = ["Estate", "Description", "Date", "Type", "Amount"];
    const rows = filteredPayments.map((p) => [
      p.estate,
      p.description,
      p.date,
      p.time,
      p.type,
      `₦${p.amount.toLocaleString()}`,
    ]);

    const csvContent =
      [headers, ...rows].map((row) => row.join(",")).join("\n");

    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);

    const link = document.createElement("a");
    link.href = url;
    link.download = "billing-history.csv";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  // 📌 Export XLS
  const exportXLS = () => {
    if (filteredPayments.length === 0) return;

    const headers = ["Estate", "Description", "Date", "Type", "Amount"];
    const rows = filteredPayments.map((p) => [
      p.estate,
      p.description,
      p.date,
      p.time,
      p.type,
      `₦${p.amount.toLocaleString()}`,
    ]);

    const xlsContent =
      [headers, ...rows].map((row) => row.join("\t")).join("\n");

    const blob = new Blob([xlsContent], {
      type: "application/vnd.ms-excel",
    });
    const url = URL.createObjectURL(blob);

    const link = document.createElement("a");
    link.href = url;
    link.download = "billing-history.xls";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  // 📌 Export PDF
  const exportPDF = () => {
    if (filteredPayments.length === 0) return;

    const doc = new jsPDF();
    doc.setFontSize(14);
    doc.text("Billing History", 14, 15);

    const headers = ["Estate", "Description", "Date", "Time", "Type", "Amount"];
    const colWidths = [40, 80, 50, 30, 50, 30];
    let startX = 14;
    let startY = 30;
    let rowHeight = 10;

    // Headers
    doc.setFontSize(10);
    doc.setFont("helvetica", "bold");
    headers.forEach((header, i) => {
      doc.text(header, startX + i * colWidths[i], startY);
    });

    // Rows
    doc.setFont("helvetica", "normal");
    let y = startY + rowHeight;

    filteredPayments.forEach((p) => {
      const row = [
        p.estate,
        p.description,
        p.date,
        p.time,
        p.type,
        `₦${p.amount.toLocaleString()}`,
      ];

      row.forEach((text, i) => {
        doc.text(String(text), startX + i * colWidths[i], y);
      });

      y += rowHeight;
    });

    doc.save("billing-history.pdf");
  };

  return (
    <div className="billing-container">
      <h2>Billing</h2>

      <div className="billing-summary">
        <div className="billing-card black">
          <p className="title">Total Payments</p>
          <h3 className="amount">
            ₦{summary.totalPayments.toLocaleString()}
          </h3>
        </div>

        <div className="billing-card">
          <p className="title">Payments This Week</p>
          <h3 className="amount">
            ₦{summary.paymentsThisWeek.toLocaleString()}
          </h3>
        </div>

        <div className="billing-card">
          <p className="title">Unpaid Payments</p>
          <h3 className="amount">
            ₦{summary.unpaidPayments.toLocaleString()}
          </h3>
        </div>
      </div>

      {/* Filters */}
      <div className="filter-container">
           <div className="filter-title"><h2>Estate payment history</h2></div>
            <div className="filters">
            <div className="selection-container">
               <label>Select Estate</label>
              <select
                value={selectedEstate}
                onChange={(e) => setSelectedEstate(e.target.value)}
              >
                <option>Estate</option>
                <option>OneTurf Estate</option>
                <option>Oral Estate</option>
                <option>Victory Estate</option>
                <option>Prime Estate</option>
              </select>
          </div>
       
        <div className="selection-container">
        <label>Select Transaction Type</label>
        <select
          value={transactionType}
          onChange={(e) => setTransactionType(e.target.value)}
        >
          <option>Transanction type</option>
           <option>All</option>
          <option>Credit</option>
          <option>Debit</option>
        </select>
        </div>

        <div className="date-container">
          <label>From</label>
        <input
          type="date"
          value={dateFrom}
          onChange={(e) => setDateFrom(e.target.value)}
           style={{ height: "35px", padding: "2px 10px" }}
        />
        </div>
        <div className="date-container">
          <label>To</label>
          <input
            type="date"
            value={dateTo}
            onChange={(e) => setDateTo(e.target.value)}
             style={{ height: "35px", padding: "2px 10px" }}
          />
        </div>
        
      </div>
        <button 
          className="generate-btn"
          onClick={() => setShowTable(true)}
        >
          Generate payment history
        </button>
      </div>
   
     
      {/* Export Buttons + Table */}
      {showTable && (
        <>
          <div className="export-buttons">
            <button className="csv" onClick={exportCSV}>CSV</button>
            <button className="pdf" onClick={exportPDF}>PDF</button>
            <button className="xls" onClick={exportXLS}>XLS</button>
          </div>

          <table className="billing-table">
            <thead>
              <tr>
                <th>Description</th>
                <th>Date</th>
                <th>Amount</th>
              </tr>
            </thead>
            <tbody>
            {filteredPayments.map((p, i) => (
              <tr key={i}>
                <td data-label="Description">{p.description}</td>
                <td data-label="Date">{p.date}, {p.time}</td>
                <td data-label="Amount">₦{p.amount.toLocaleString()}</td>
              </tr>
            ))}
          </tbody>

          </table>

          <div className="pagination">
            <span>Showing 1 to {filteredPayments.length} from {payments.length} data</span>
            <div className="pagination-controls">
              <button>{"< Previous"}</button>
              <button className="active">1</button>
              <button>2</button>
              <button>3</button>
              <button>{"Next >"}</button>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Billing;
