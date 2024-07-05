import { NavLink, Outlet } from 'react-router-dom';

export default function Admin() {
  return (
    <div>
      <nav>
        <ul className='flex justify-center gap-4 bg-slate-900 text-slate-200 py-3'>
          <NavLink
            to='add-seller'
            className={({ isActive }) =>
              isActive ? 'underline underline-offset-8' : ''
            }
          >
            <li>Add Seller</li>
          </NavLink>
          <NavLink
            to='add-product'
            className={({ isActive }) =>
              isActive ? 'underline underline-offset-8' : ''
            }
          >
            <li>Add Product</li>
          </NavLink>
        </ul>
      </nav>
      <Outlet />
    </div>
  );
}
