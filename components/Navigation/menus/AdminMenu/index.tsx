import { FC, useState } from 'react';
import { Layout, Menu } from 'antd';
import {
  PieChartOutlined,
  DesktopOutlined,
  ContainerOutlined,
  AppstoreOutlined,
  ShopFilled,
} from '@ant-design/icons';
import SubMenu from 'antd/lib/menu/SubMenu';
import AdminHeader from '@components/Navigation/headers/AdminHeader/index';
import { useRouter } from 'next/router';
import styles from './AdminMenu.module.scss';

const { Sider, Content } = Layout;

const AdminMenu: FC<{ selectedKey: string; openKey: string | null }> = ({
  children,
  selectedKey,
  openKey,
}) => {
  const [collapse, setCollapse] = useState(true);
  const router = useRouter();

  const toggle = () => {
    setCollapse((prevState) => !prevState);
  };

  return (
    <Layout className={styles.LayoutContainer}>
      <Sider
        trigger={null}
        collapsible
        collapsed={collapse}
        width="270px"
        theme="light"
        style={{ overflow: 'hidden' }}
        className={collapse ? styles.SiderCollapsed : styles.Sider}
      >
        <div className={styles.LogoContainer}>
          <div className={collapse ? styles.Title : styles.TitleAndIcon}>
            <ShopFilled style={{ fontSize: '30px' }} />
            {!collapse && <h2>Amazonias</h2>}
          </div>
        </div>

        <Menu
          defaultSelectedKeys={[selectedKey]}
          defaultOpenKeys={[openKey || '']}
          mode="inline"
          theme="light"
          inlineCollapsed={collapse}
          className={styles.Menu}
          style={{ overflowX: 'hidden' }}
        >
          <Menu.Item
            key="home"
            icon={<AppstoreOutlined />}
            onClick={() => router.push('/admin/dashboard')}
          >
            Home
          </Menu.Item>
          <SubMenu key="products" icon={<PieChartOutlined />} title="Products">
            <Menu.Item
              key="products/create"
              onClick={() => router.push('/admin/products/create')}
            >
              Add product
            </Menu.Item>
            <Menu.Item
              key="products/list"
              onClick={() => router.push('/admin/products/list')}
            >
              Product List
            </Menu.Item>
            <Menu.Item
              key="products/grid"
              onClick={() => router.push('/admin/products/grid')}
            >
              Product Grid
            </Menu.Item>
          </SubMenu>
          <SubMenu
            key="departments"
            icon={<DesktopOutlined />}
            title="Departments"
          >
            <Menu.Item
              key="departments/create"
              onClick={() => router.push('/admin/departments/create')}
            >
              Add department
            </Menu.Item>
            <Menu.Item
              key="departments/list"
              onClick={() => router.push('/admin/departments/list')}
            >
              Department List
            </Menu.Item>
          </SubMenu>
          <SubMenu
            key="categories"
            icon={<DesktopOutlined />}
            title="Categories"
          >
            <Menu.Item
              key="categories/create"
              onClick={() => router.push('/admin/categories/create')}
            >
              Add category
            </Menu.Item>
            <Menu.Item
              key="categories/list"
              onClick={() => router.push('/admin/categories/list')}
            >
              Category List
            </Menu.Item>
          </SubMenu>
          <SubMenu
            key="sub-categories"
            icon={<DesktopOutlined />}
            title="Sub-Categories"
          >
            <Menu.Item
              key="sub-categories/create"
              onClick={() => router.push('/admin/sub-categories/create')}
            >
              Add sub-category
            </Menu.Item>
            <Menu.Item
              key="sub-categories/list"
              onClick={() => router.push('/admin/sub-categories/list')}
            >
              Sub-categories List
            </Menu.Item>
          </SubMenu>

          <Menu.Item
            key="orders"
            icon={<ContainerOutlined />}
            onClick={() => router.push('/admin/orders')}
          >
            Orders
          </Menu.Item>
          <Menu.Item
            key="customers"
            icon={<ContainerOutlined />}
            onClick={() => router.push('/admin/customers')}
          >
            Customers
          </Menu.Item>
          <Menu.Item
            key="revies"
            icon={<ContainerOutlined />}
            onClick={() => router.push('/admin/reviews')}
          >
            Reviews
          </Menu.Item>
          <SubMenu key="sellers" icon={<ContainerOutlined />} title="Sellers">
            <Menu.Item
              key="sellers/create"
              onClick={() => router.push('/admin/sellers/create')}
            >
              Add seller
            </Menu.Item>
            <Menu.Item
              key="sellers/list"
              onClick={() => router.push('/admin/sellers/list')}
            >
              Seller List
            </Menu.Item>
          </SubMenu>
          <Menu.Item
            key="sales"
            icon={<ContainerOutlined />}
            onClick={() => router.push('/admin/sales')}
          >
            Sales
          </Menu.Item>
          <Menu.Item
            key="transactions"
            icon={<ContainerOutlined />}
            onClick={() => router.push('/admin/transactions')}
          >
            Transactions
          </Menu.Item>

          <hr />

          <Menu.Item
            key="appearence"
            icon={<ContainerOutlined />}
            onClick={() => router.push('/admin/appearence')}
          >
            Appearence
          </Menu.Item>
          <Menu.Item
            key="settings"
            icon={<ContainerOutlined />}
            onClick={() => router.push('/admin/settings')}
          >
            Settings
          </Menu.Item>
          <div style={{ height: '15px' }} />
        </Menu>
      </Sider>
      <Layout className="site-layout">
        <AdminHeader toggle={toggle} collapse={collapse} />
        <Content
          className="site-layout-background"
          style={{
            padding: 24,
            minHeight: 280,
          }}
        >
          {children}
        </Content>
      </Layout>
    </Layout>
  );
};

export default AdminMenu;
