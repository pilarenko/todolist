import React from 'react';
import Header from '../../components/Header/Header';
import Todo from '../../components/Todo/Todo';
import './Layout.css';

const Layout = (props) => {
  return (
    <div className='layout'>
      <Header />
      <Todo />
    </div>
  )
}

export default Layout
