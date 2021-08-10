import { useState } from 'react';
import { IoMdArrowDropdown } from 'react-icons/io';
import { RiArrowRightSLine } from 'react-icons/ri';
import { DepartmentsMenu } from '../../../../types/Department';
import styles from './DropDown.module.scss';

const DropDown = ({ data }: { data: DepartmentsMenu[] | null }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedDepartment, setSelectedDepartment] =
    useState<DepartmentsMenu | null>(null);

  return (
    <>
      <div
        className={styles.TextContent}
        onClick={() => setIsOpen((prev) => !prev)}
        onKeyDown={() => setIsOpen((prev) => !prev)}
        role="menu"
        tabIndex={0}
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
            {data &&
              data.map((department) => (
                <span
                  className={
                    selectedDepartment?._id === department._id
                      ? styles.DepartmentItemActive
                      : styles.DepartmentItem
                  }
                  key={department._id}
                  onMouseEnter={() => setSelectedDepartment(department)}
                >
                  {department.name}
                  <RiArrowRightSLine />
                </span>
              ))}
          </div>
          <div
            className={styles.CategoriesContainer}
            style={{ display: selectedDepartment ? 'block' : 'none' }}
          >
            <div className={styles.CategoryList}>
              {selectedDepartment?.categories.map((category) => (
                <div className={styles.CategoryItem} key={category._id}>
                  <h3> {category.name} </h3>
                  <div className={styles.SubList}>
                    {category.subs.map((sub) => (
                      <span key={sub._id}> {sub.name} </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
            <div className={styles.ImgContainer}>
              <img src={selectedDepartment?.banners[0].url} alt="asndjkasjdj" />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default DropDown;
