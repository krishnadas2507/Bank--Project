import React, { useState,useEffect } from 'react';
import Array from './Data';

import './frontpage.css';
import {AiOutlineCloseCircle} from 'react-icons/ai'
import {BsFlag} from 'react-icons/bs'
import {Link} from 'react-router-dom'

function Frontpage() {   
  const [selectedStatus, setSelectedStatus] = useState('Draft');
  const handleStatusFilter = (status) => {
    setSelectedStatus(status);
  };

    useEffect(()=>{
     localStorage.clear()
  },[]);
  let filteredArray;
  
  if (selectedStatus === 'Draft') {
    filteredArray = Array.filter((item) => item.status !== 'Completed');
  } else {
    filteredArray = Array.filter((item) => item.status === selectedStatus);
  }
                                                 
  return (
    <div className='container'>
      <div className='header'>
        <div className='head1'>
          <h1>DASHBOARD</h1>
        </div>
        <div className='head2-btn'>
          <button className='create-btn' ><Link to='Request'>create</Link></button>
        </div>
      </div>
      <div className='main'>
    
      <button className='inprogress button'onClick={() => handleStatusFilter('Draft')}><AiOutlineCloseCircle/>Inprogress</button>
       <button className='complete button'onClick={() => handleStatusFilter('Completed')}><BsFlag/>completed</button>

       

      <hr className='horizontal-line' />
        <div className='search-box'>
          <label htmlFor=''>search:</label>
          <input type='text' />
        </div>
         <div className='table-fr'>
         <table>
          <thead>
            <tr>
              <th>Id</th>
              <th>requestedOn</th>
              <th>customername</th>
              <th>branchcode</th>
              <th>branchname</th>
              <th>customeraccountnumber</th>
              <th>compensation</th>
              <th className='status-heading'>status</th>
            </tr>
          </thead>
          <tbody>
            {filteredArray.map((user, index) => (
              <tr key={index}>
                <td>{user.id}</td>
                <td>{user.requestedOn}</td>
                <td>{user.customername}</td>
                <td>{user.branchcode}</td>
                <td>{user.branchname}</td>
                <td>{user.customeraccountnumber}</td>
                <td>{user.compensation}</td>
                <td>{user.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
         </div>
      </div>
    </div>
  );
}

export default Frontpage;

