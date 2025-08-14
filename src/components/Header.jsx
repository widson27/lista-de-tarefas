import { Menu } from 'lucide-react';

function Header() {
  return (
    <div className="w-full flex justify-between items-center px-2 h-14 bg-blue-600">
        <Menu className='text-white font-bold' />
        <div className='flex my-4 text-blue-600 px-2 py-4'>
            <h2 className='px-2 py-2 bg-sky-200 rounded-md font-semibold'>Bosque do Cerrado</h2>
        </div>
    </div>
  )
}

export default Header