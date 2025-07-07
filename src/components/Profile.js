import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "./Header";

function Profile() {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/users")
      .then(res => res.json())
      .then(data => setUser(data[0]))
      .catch(err => console.error(err));
  }, []);

  return (
    <div className="container">
      <Header userInitial={user ? user.name.slice(0, 2).toUpperCase() : "U"} userName={user ? user.name : "User"} />
      <button className="btn btn-outline-secondary mb-4" onClick={() => navigate("/")}>← Back to Dashboard</button>
      {user ? (
        <div className="card shadow-sm">
          <div className="card-body">
            <div className="d-flex align-items-center mb-4">
              <img src={`https://ui-avatars.com/api/?name=${user.name}`} className="rounded-circle me-3" alt="avatar" width="60" height="60" />
              <div>
                <h5 className="mb-0">{user.name}</h5>
                <small className="text-muted">{user.email}</small>
              </div>
            </div>
            <hr />
            <div className="row">
              <div className="col-md-4">
                <h6>Contact</h6>
                <p>Phone: {user.phone}</p>
                <p>Website: {user.website}</p>
              </div>
              <div className="col-md-4">
                <h6>Company</h6>
                <p>{user.company.name}</p>
              </div>
              <div className="col-md-4">
                <h6>Address</h6>
                <p>{user.address.street}, {user.address.city}</p>
              </div>
            </div>
          </div>
        </div>
      ) : <p>Loading...</p>}
    </div>
  );
}

export default Profile;
