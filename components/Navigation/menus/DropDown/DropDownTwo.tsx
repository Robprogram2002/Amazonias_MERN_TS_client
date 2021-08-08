import { useState } from 'react';
import { IoMdArrowDropdown } from 'react-icons/io';
import { RiArrowRightSLine } from 'react-icons/ri';
import styles from './DropDownTwo.module.scss';

const DropDownTwo = () => {
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
          <div className={styles.CategoryList}>
            <h3>Amazon Prime Video</h3>

            <span className={styles.CategoryItem}>
              Laptops
              <RiArrowRightSLine />
            </span>
            <span className={styles.CategoryItem}>
              Tablets
              <RiArrowRightSLine />
            </span>
            <span className={styles.CategoryItem}>
              Computadoras de escritorio
              <RiArrowRightSLine />
            </span>
            <span className={styles.CategoryItem}>
              Computadoras de escritorio
              <RiArrowRightSLine />
            </span>
            <span className={styles.CategoryItem}>
              Computadoras de escritorio
              <RiArrowRightSLine />
            </span>
            <span className={styles.CategoryItem}>
              Computadoras de escritorio
              <RiArrowRightSLine />
            </span>
          </div>
          <div className={styles.BigBanner}>
            <img
              src="https://res.cloudinary.com/dhpjmkudq/image/upload/v1628303896/amazonias/giu-vicente-FMArg2k3qOU-unsplash.jpg/1628303893253.jpg"
              alt="ajksndjs sajdjk"
            />
          </div>
          <div className={styles.BannersContainer}>
            <div className={styles.Banner}>
              <img
                src="https://res.cloudinary.com/dhpjmkudq/image/upload/v1628303887/amazonias/jonathan-francisca-YHbcum51JB0-unsplash.jpg/1628303883890.jpg"
                alt="ajksndjs sajdjk"
              />
            </div>
            <div className={styles.Banner}>
              <img
                src="https://res.cloudinary.com/dhpjmkudq/image/upload/v1628303887/amazonias/jonathan-francisca-YHbcum51JB0-unsplash.jpg/1628303883890.jpg"
                alt="ajksndjs sajdjk"
              />
            </div>
            <div className={styles.Banner}>
              <img
                src="https://res.cloudinary.com/dhpjmkudq/image/upload/v1628303887/amazonias/jonathan-francisca-YHbcum51JB0-unsplash.jpg/1628303883890.jpg"
                alt="ajksndjs sajdjk"
              />
            </div>
            <div className={styles.Banner}>
              <img
                src="https://res.cloudinary.com/dhpjmkudq/image/upload/v1628303887/amazonias/jonathan-francisca-YHbcum51JB0-unsplash.jpg/1628303883890.jpg"
                alt="ajksndjs sajdjk"
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default DropDownTwo;
