import { Outlet } from 'react-router-dom'

export default function App() {
  return (
    <div className='max-w-7xl w-full h-full bg-gray-800 text-gray-100'>
      <Outlet />
    </div>
  );
}