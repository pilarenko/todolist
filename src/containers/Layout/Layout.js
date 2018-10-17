import React from 'react';
import Header from '../../components/Header/Header';
import Table from '../../components/Table/Table';
import './Layout.css';

const Layout = (props) => {
  return (
    <div className='layout'>
      <Header />
      <Table />
    </div>
  )
}

export default Layout
