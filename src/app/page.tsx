"use client";
import React from 'react'
import store from './store';
import { Provider } from 'react-redux';
import AutomationPage from '@/components/Pages/AutomationPage';

const HomePage = () => {
  return (
    <Provider store={store}>
      <AutomationPage />
    </Provider>
  )
}

export default HomePage