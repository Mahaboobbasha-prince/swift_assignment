// import React, { useEffect, useState } from "react";
// import { Link } from "react-router-dom";

// function Dashboard() {
//   const [comments, setComments] = useState([]);
//   const [filtered, setFiltered] = useState([]);
//   const [sortConfig, setSortConfig] = useState(JSON.parse(localStorage.getItem("sort")) || { key: null, direction: null });
//   const [searchTerm, setSearchTerm] = useState(localStorage.getItem("search") || "");
//   const [pageSize, setPageSize] = useState(Number(localStorage.getItem("pageSize")) || 10);
//   const [currentPage, setCurrentPage] = useState(Number(localStorage.getItem("page")) || 1);

//   useEffect(() => {
//     fetch("https://jsonplaceholder.typicode.com/comments")
//       .then(res => res.json())
//       .then(data => setComments(data));
//   }, []);

//   useEffect(() => {
//     let data = [...comments];

//     // Search
//     if (searchTerm) {
//       data = data.filter(c =>
//         c.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
//         c.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
//         c.body.toLowerCase().includes(searchTerm.toLowerCase())
//       );
//     }

//     // Sort
//     if (sortConfig.key) {
//       data.sort((a, b) => {
//         if (a[sortConfig.key] < b[sortConfig.key]) return sortConfig.direction === "asc" ? -1 : 1;
//         if (a[sortConfig.key] > b[sortConfig.key]) return sortConfig.direction === "asc" ? 1 : -1;
//         return 0;
//       });
//     }

//     setFiltered(data);
//   }, [comments, sortConfig, searchTerm]);

//   useEffect(() => {
//     localStorage.setItem("sort", JSON.stringify(sortConfig));
//     localStorage.setItem("search", searchTerm);
//     localStorage.setItem("pageSize", pageSize);
//     localStorage.setItem("page", currentPage);
//   }, [sortConfig, searchTerm, pageSize, currentPage]);

//   const toggleSort = key => {
//     let direction = "asc";
//     if (sortConfig.key === key && sortConfig.direction === "asc") direction = "desc";
//     else if (sortConfig.key === key && sortConfig.direction === "desc") direction = null;

//     setSortConfig(direction ? { key, direction } : { key: null, direction: null });
//   };

//   const startIndex = (currentPage - 1) * pageSize;
//   const paginated = filtered.slice(startIndex, startIndex + pageSize);
//   const totalPages = Math.ceil(filtered.length / pageSize);

//   return (
//     <div className="container mt-4">
//       <div className="d-flex justify-content-between mb-3">
//         <input
//           type="text"
//           className="form-control w-50"
//           placeholder="Search by name, email, or body"
//           value={searchTerm}
//           onChange={e => { setSearchTerm(e.target.value); setCurrentPage(1); }}
//         />
//         <Link to="/profile" className="btn btn-primary">Go to Profile</Link>
//       </div>

//       <div className="mb-3">
//         <label>Page Size: </label>
//         {[10, 50, 100].map(size => (
//           <button
//             key={size}
//             className={`btn btn-outline-primary ms-2 ${pageSize === size ? "active" : ""}`}
//             onClick={() => { setPageSize(size); setCurrentPage(1); }}
//           >
//             {size}
//           </button>
//         ))}
//       </div>

//       <table className="table table-bordered">
//         <thead>
//           <tr>
//             <th onClick={() => toggleSort("postId")}>Post ID</th>
//             <th onClick={() => toggleSort("name")}>Name</th>
//             <th onClick={() => toggleSort("email")}>Email</th>
//             <th>Comment</th>
//           </tr>
//         </thead>
//         <tbody>
//           {paginated.map(c => (
//             <tr key={c.id}>
//               <td>{c.postId}</td>
//               <td>{c.name}</td>
//               <td>{c.email}</td>
//               <td>{c.body}</td>
//             </tr>
//           ))}
//         </tbody>
//       </table>

//       <div className="d-flex justify-content-between">
//         <div>Page {currentPage} of {totalPages}</div>
//         <div>
//           {Array.from({ length: totalPages }, (_, i) => i + 1).map(num => (
//             <button
//               key={num}
//               className={`btn btn-sm ${num === currentPage ? "btn-primary" : "btn-outline-primary"} ms-1`}
//               onClick={() => setCurrentPage(num)}
//             >
//               {num}
//             </button>
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// }

// export default Dashboard;


import React, { useEffect, useState } from "react";
import Header from "./Header";

function Dashboard() {
  const [comments, setComments] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [sortConfig, setSortConfig] = useState(JSON.parse(localStorage.getItem("sort")) || { key: null, direction: null });
  const [searchTerm, setSearchTerm] = useState(localStorage.getItem("search") || "");
  const [pageSize] = useState(Number(localStorage.getItem("pageSize")) || 10);
  const [currentPage, setCurrentPage] = useState(Number(localStorage.getItem("page")) || 1);

  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/comments")
      .then(res => res.json())
      .then(data => setComments(data));
  }, []);

  useEffect(() => {
    let data = [...comments];
    if (searchTerm) {
      data = data.filter(c =>
        c.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        c.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        c.body.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    if (sortConfig.key) {
      data.sort((a, b) => {
        if (a[sortConfig.key] < b[sortConfig.key]) return sortConfig.direction === "asc" ? -1 : 1;
        if (a[sortConfig.key] > b[sortConfig.key]) return sortConfig.direction === "asc" ? 1 : -1;
        return 0;
      });
    }
    setFiltered(data);
  }, [comments, sortConfig, searchTerm]);

  useEffect(() => {
    localStorage.setItem("sort", JSON.stringify(sortConfig));
    localStorage.setItem("search", searchTerm);
    localStorage.setItem("page", currentPage);
  }, [sortConfig, searchTerm, currentPage]);

  const handleSort = (key) => {
    let direction = "asc";
    if (sortConfig.key === key && sortConfig.direction === "asc") direction = "desc";
    else if (sortConfig.key === key && sortConfig.direction === "desc") direction = null;
    setSortConfig(direction ? { key, direction } : { key: null, direction: null });
  };

  const startIndex = (currentPage - 1) * pageSize;
  const paginated = filtered.slice(startIndex, startIndex + pageSize);
  const totalPages = Math.ceil(filtered.length / pageSize);

  return (
    <div className="container">
      <Header userInitial="JD" userName="John Doe" />

      <div className="d-flex flex-column flex-md-row justify-content-between align-items-md-center mb-3 gap-2 flex-wrap">
        <div className="d-flex flex-wrap gap-2 sort-div">
          <button className="btn sort-btn" onClick={() => handleSort("postId")}>Sort Post ID ↑↓</button>
          <button className="btn sort-btn" onClick={() => handleSort("name")}>Sort Name ↑↓</button>
          <button className="btn sort-btn" onClick={() => handleSort("email")}>Sort Email ↑↓</button>
        </div>
        <div className="ms-md-auto seach-button" style={{ minWidth: "220px" }}>
          <input
            type="text"
            className="form-control search-input"
            placeholder="Search..."
            value={searchTerm}
            onChange={e => { setSearchTerm(e.target.value); setCurrentPage(1); }}
          />
        </div>
      </div>

      <div className="table-responsive">
        <table className="table table-hover table-bordered">
          <thead style={{ backgroundColor: '#87ceeb' }}>
            <tr>
              <th>Post ID</th>
              <th>Name</th>
              <th>Email</th>
              <th>Comment</th>
            </tr>
          </thead>
          <tbody>
            {paginated.map(c => (
              <tr key={c.id}>
                <td>{c.postId}</td>
                <td>{c.name}</td>
                <td>{c.email}</td>
                <td>{c.body}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="d-flex justify-content-between align-items-center mt-3">
        <div>Page {currentPage} of {totalPages}</div>
        <div className="d-flex flex-wrap">
          {Array.from({ length: totalPages }, (_, i) => i + 1).map(num => (
            <button
              key={num}
              className={`btn btn-sm me-1 mb-1 ${num === currentPage ? "btn-primary" : "btn-outline-primary"}`}
              onClick={() => setCurrentPage(num)}
            >
              {num}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
