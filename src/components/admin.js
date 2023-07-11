import React, { useEffect } from "react";
import { Link, Route, useParams } from "react-router-dom/cjs/react-router-dom.min";
import {ProductsAdmin, UsersAdmin} from "./index";

const AdminPage = ({allRamen, fetchRamen, allUsers, fetchUsers}) =>{



  useEffect(() => {
    fetchRamen();
    fetchUsers();
  }, [])

  return <>

  <Link to='/admin/products'>Ramen</Link>
  <Link to='/admin/users'>Users</Link>

  <h2>WELCOME ADMINISTRATOR</h2>
      
  </>
};

export default AdminPage;