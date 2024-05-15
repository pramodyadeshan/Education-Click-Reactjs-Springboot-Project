import React from 'react';
import { motion } from 'framer-motion';
import { useAppSelector } from 'app/config/store';

export const profile = () => {
  const account = useAppSelector(state => state.authentication.account);
  return (
    <div className="dark-bg-boxdark" style={{ paddingTop: '120px', paddingBottom: '40px' }}>
      <div className="parent">
        <div>
          <motion.div
            className="mb-20"
            initial={{ y: -200, opacity: 0 }}
            animate={{
              y: 0,
              opacity: 1,
              transition: { duration: 1, type: 'spring' },
            }}
          >
            <h1 className="text-5xl text-gray-700 text-center">
              Hello <span className="header-text-color">{account.firstName}!</span>
            </h1>
            <p className="text-xl font-weight-bold text-center text-boxdark">Welcome to Education Click</p>
            <div className="d-flex justify-content-center align-items-center mt-12 relative">
              <img src="../../../content/images/icon/Teacher-boy.jpg" alt="User Profile" className="w-56 h-56" title="About User" />
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default profile;
