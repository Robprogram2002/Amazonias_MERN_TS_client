import { useState } from 'react';
import { FaBars, FaArrowLeft } from 'react-icons/fa';
import { BiUserCircle } from 'react-icons/bi';
import { RiArrowRightSLine } from 'react-icons/ri';

import { IoMdArrowDropdown, IoMdClose } from 'react-icons/io';
import styles from './SideBarMenu.module.scss';

const Departments = ({ handler }: { handler: any }) => (
  <div className={styles.SideBar}>
    <h1>Digital Content & Devices</h1>
    <div className={styles.Item}>
      <span>Amazon Music</span>
      <RiArrowRightSLine size={20} />
    </div>
    <div className={styles.Item}>
      <span>Kindle E-readers & Books</span>
      <RiArrowRightSLine size={20} />
    </div>
    <div className={styles.Item}>
      <span>Appstore for Android</span>
      <RiArrowRightSLine size={20} />
    </div>

    <hr />

    <h1>Shop By Department</h1>
    {/* eslint-disable-next-line jsx-a11y/interactive-supports-focus */}
    <div
      className={styles.Item}
      onClick={() => handler('something')}
      onKeyDown={() => handler('something')}
      role="menuitem"
    >
      <span>Electronics</span>
      <RiArrowRightSLine size={20} />
    </div>
    <div className={styles.Item}>
      <span>Computers</span>
      <RiArrowRightSLine size={20} />
    </div>
    <div className={styles.Item}>
      <span>Smart Home</span>
      <RiArrowRightSLine size={20} />
    </div>
    <div className={styles.Item}>
      <span>Arts & Craft</span>
      <RiArrowRightSLine size={20} />
    </div>
    <div className={styles.Item}>
      <span>See All</span>
      <IoMdArrowDropdown size={20} />
    </div>

    <hr />

    <h1>Program & Features</h1>
    <div className={styles.Item}>
      <span>Gift Cards</span>
      <RiArrowRightSLine size={20} />
    </div>
    <div className={styles.Item}>
      <span>Amazon live</span>
      <RiArrowRightSLine size={20} />
    </div>
    <div className={styles.Item}>
      <span>International Shopping</span>
      <RiArrowRightSLine size={20} />
    </div>
    <div className={styles.Item}>
      <span>See All</span>
      <IoMdArrowDropdown size={20} />
    </div>

    <hr />

    <h1>Help & Settings</h1>
    <div className={styles.Item}>
      <span>Your Account</span>
    </div>
    <div className={styles.Item}>
      <span>English</span>
    </div>
    <div className={styles.Item}>
      <span>United States</span>
    </div>
    <div className={styles.Item}>
      <span>Custom Service</span>
    </div>
    <div className={styles.Item}>
      <span>Sign In</span>
    </div>

    <div style={{ height: '40px' }} />
  </div>
);

const Categories = ({ handler }: { handler: any }) => (
  <div className={styles.SideBar}>
    {/* eslint-disable-next-line jsx-a11y/interactive-supports-focus */}
    <div
      className={styles.Back}
      onClick={() => handler('')}
      onKeyDown={() => handler('')}
      role="menuitem"
    >
      <FaArrowLeft size={20} />
      <h3>MAIN MENU</h3>
    </div>
    <h1>Electronics</h1>
    <div className={styles.Item}>
      <span>Accesories & Supplies</span>
    </div>
    <div className={styles.Item}>
      <span>Camera & Photo</span>
    </div>
    <div className={styles.Item}>
      <span>Camera & Photo</span>
    </div>
    <div className={styles.Item}>
      <span>Camera & Photo</span>
    </div>
    <div className={styles.Item}>
      <span>Camera & Photo</span>
    </div>
    <div className={styles.Item}>
      <span>Camera & Photo</span>
    </div>
    <div className={styles.Item}>
      <span>Camera & Photo</span>
    </div>
    <div className={styles.Item}>
      <span>Camera & Photo</span>
    </div>
  </div>
);

const SideBarMenu = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [category, setCategory] = useState('something');

  return (
    <>
      {/* eslint-disable-next-line jsx-a11y/interactive-supports-focus */}
      <div
        className={styles.MenuItem}
        onClick={() => setIsOpen(true)}
        onKeyDown={() => setIsOpen(true)}
        role="menubar"
      >
        <FaBars size={20} /> <span>All</span>
      </div>
      <div className={isOpen ? styles.BlackBackground : ''} />
      <div
        className={styles.SideContainer}
        style={{ display: isOpen ? 'block' : 'none' }}
      >
        <div className={styles.Header}>
          <BiUserCircle size={30} />
          <h2>Hello , Sign In</h2>
          {/* eslint-disable-next-line jsx-a11y/interactive-supports-focus */}
          <div
            className={styles.Close}
            onClick={() => setIsOpen(false)}
            onKeyDown={() => setIsOpen(false)}
            role="menubar"
          >
            <IoMdClose size={35} />
          </div>
        </div>
        {category !== '' ? (
          <Categories handler={setCategory} />
        ) : (
          <Departments handler={setCategory} />
        )}
      </div>
    </>
  );
};

export default SideBarMenu;
