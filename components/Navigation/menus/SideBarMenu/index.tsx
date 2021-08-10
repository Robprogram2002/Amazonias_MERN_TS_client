import { useState } from 'react';
import { FaBars, FaArrowLeft } from 'react-icons/fa';
import { BiUserCircle } from 'react-icons/bi';
import { RiArrowRightSLine } from 'react-icons/ri';

import { IoMdArrowDropdown, IoMdClose } from 'react-icons/io';
import { DepartmentsMenu } from '../../../../types/Department';
import styles from './SideBarMenu.module.scss';

const SideBarMenu = ({ data }: { data: DepartmentsMenu[] | null }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectDepartment, setSelectDepartment] =
    useState<DepartmentsMenu | null>(null);

  return (
    <>
      <div
        className={styles.MenuItem}
        onClick={() => setIsOpen(true)}
        onKeyDown={() => setIsOpen(true)}
        role="menubar"
        tabIndex={0}
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
          <div
            className={styles.Close}
            onClick={() => setIsOpen(false)}
            onKeyDown={() => setIsOpen(false)}
            role="menubar"
            tabIndex={0}
          >
            <IoMdClose size={35} />
          </div>
        </div>
        <div
          className={styles.SideBar}
          style={{ display: selectDepartment === null ? 'block' : 'none' }}
        >
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

          {data &&
            data.map((department) => (
              <div
                key={department._id}
                className={styles.Item}
                onClick={() => setSelectDepartment(department)}
                onKeyDown={() => setSelectDepartment(department)}
                role="menuitem"
                tabIndex={0}
              >
                <span> {department.name} </span>
                <RiArrowRightSLine size={20} />
              </div>
            ))}

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
        <div
          className={styles.SideBar}
          style={{ display: selectDepartment ? 'block' : 'none' }}
        >
          <div
            className={styles.Back}
            onClick={() => setSelectDepartment(null)}
            onKeyDown={() => setSelectDepartment(null)}
            role="menuitem"
            tabIndex={0}
          >
            <FaArrowLeft size={20} />
            <h3>MAIN MENU</h3>
          </div>
          <h1> {selectDepartment?.name} </h1>
          {selectDepartment?.categories.map((category) => (
            <div className={styles.Item} key={category._id}>
              <span> {category.name} </span>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default SideBarMenu;
