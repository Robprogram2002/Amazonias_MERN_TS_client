import { useState } from 'react';
import { IoMdArrowDropdown } from 'react-icons/io';
import { RiArrowRightSLine } from 'react-icons/ri';
import styles from './DropDown.module.scss';

const DropDown = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* eslint-disable-next-line jsx-a11y/interactive-supports-focus */}
      <div
        className={styles.TextContent}
        onClick={() => setIsOpen((prev) => !prev)}
        onKeyDown={() => setIsOpen((prev) => !prev)}
        role="menu"
      >
        <span>All the </span>
        <strong>
          Departments <IoMdArrowDropdown />{' '}
        </strong>
        <div
          className={styles.DropDownContainer}
          style={{ display: isOpen ? 'flex' : 'none' }}
        >
          <div className={styles.DepartmentList}>
            <span className={styles.DepartmentItem}>
              Amazon Prime Video
              <RiArrowRightSLine />
            </span>
            <span className={styles.DepartmentItem}>
              Echo y Alexa
              <RiArrowRightSLine />
            </span>
            <span className={styles.DepartmentItem}>
              Amazon music
              <RiArrowRightSLine />
            </span>
            <span className={styles.DepartmentItem}>
              Alimentos y bebidas
              <RiArrowRightSLine />
            </span>
            <span className={styles.DepartmentItem}>
              Alimentos y bebidas
              <RiArrowRightSLine />
            </span>
            <span className={styles.DepartmentItem}>
              Alimentos y bebidas
              <RiArrowRightSLine />
            </span>
            <span className={styles.DepartmentItem}>
              Alimentos y bebidas
              <RiArrowRightSLine />
            </span>
            <span className={styles.DepartmentItem}>
              Alimentos y bebidas
              <RiArrowRightSLine />
            </span>
            <span className={styles.DepartmentItem}>
              Amazon music
              <RiArrowRightSLine />
            </span>
            <span className={styles.DepartmentItem}>
              Amazon music
              <RiArrowRightSLine />
            </span>
            <span className={styles.DepartmentItem}>
              Amazon music
              <RiArrowRightSLine />
            </span>
            <span className={styles.DepartmentItem}>
              Amazon music
              <RiArrowRightSLine />
            </span>
            <span className={styles.DepartmentItem}>
              Amazon music
              <RiArrowRightSLine />
            </span>
          </div>
          <div className={styles.CategoriesContainer}>
            <div className={styles.CategoryList}>
              <div className={styles.CategoryItem}>
                <h3> E-readers </h3>
                <div className={styles.SubList}>
                  <span>Kindle</span>
                  <span>Kindle Peperwhite</span>
                  <span>Kindle Oasis</span>
                  <span>Kindle Accesories</span>
                </div>
              </div>
              <div className={styles.CategoryItem}>
                <h3> Apps Kindle asjdnjsd</h3>
                <div className={styles.SubList}>
                  <span>Kindle</span>
                  <span>Kindle Peperwhite</span>
                  <span>Kindle Oasis</span>
                  <span>Kindle Accesories</span>
                </div>
              </div>
              <div className={styles.CategoryItem}>
                <h3> E-readers </h3>
                <div className={styles.SubList}>
                  <span>Kindle</span>
                  <span>Kindle Peperwhite</span>
                  <span>Kindle Oasis</span>
                  <span>Kindle Accesories</span>
                </div>
              </div>
              <div className={styles.CategoryItem}>
                <h3> E-readers </h3>
                <div className={styles.SubList}>
                  <span>Kindle</span>
                  <span>Kindle Peperwhite</span>
                  <span>Kindle Oasis</span>
                  <span>Kindle Accesories</span>
                </div>
              </div>
              <div className={styles.CategoryItem}>
                <h3> E-readers </h3>
                <div className={styles.SubList}>
                  <span>Kindle</span>
                  <span>Kindle Peperwhite</span>
                  <span>Kindle Oasis</span>
                  <span>Kindle Accesories</span>
                </div>
              </div>
              <div className={styles.CategoryItem}>
                <h3> E-readers </h3>
                <div className={styles.SubList}>
                  <span>Kindle</span>
                  <span>Kindle Peperwhite</span>
                  <span>Kindle Oasis</span>
                  <span>Kindle Accesories</span>
                </div>
              </div>
            </div>
            <div className={styles.ImgContainer}>
              <img
                src="https://res.cloudinary.com/dhpjmkudq/image/upload/v1628303896/amazonias/giu-vicente-FMArg2k3qOU-unsplash.jpg/1628303893253.jpg"
                alt="asndjkasjdj"
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default DropDown;
