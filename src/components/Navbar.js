import React from 'react';
import { Link } from 'react-router-dom';
import { Disclosure, Menu } from '@headlessui/react';
import { UserIcon, XMarkIcon, Bars3Icon } from '@heroicons/react/24/outline';
import { supabase } from '../supabaseClient';

function classNames(...classes) {
  return classes.filter(Boolean).join(' ');
}

function Navbar({ session }) {
  const handleSignOut = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) console.error('Error signing out:', error.message);
  };

  return (
    <Disclosure as="nav" className="bg-site-bg bg-opacity-90 py-4 shadow-lg">
      {({ open }) => (
        <>
          <div className="container mx-auto px-4 flex justify-between items-center">
            <div className="flex items-center">
              <Link to="/" className="text-2xl font-bold text-white">
                nsdr.co
              </Link>
            </div>
            <div className="flex items-center space-x-4">
              <Menu as="div" className="relative">
                <Menu.Button className="flex rounded-full bg-gray-800 text-sm p-1 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                  <span className="sr-only">Open user menu</span>
                  <UserIcon className="h-6 w-6 text-gray-400" aria-hidden="true" />
                </Menu.Button>
                <Menu.Items className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                  <Menu.Item>
                    {({ active }) => (
                      <a
                        href="https://billing.stripe.com/p/login/test_7sI1764KneQJbsI5kk"
                        className={classNames(active ? 'bg-gray-100' : '', 'block px-4 py-2 text-sm text-gray-700')}
                      >
                        Manage Billing
                      </a>
                    )}
                  </Menu.Item>
                  <Menu.Item>
                    {({ active }) => (
                      <button
                        onClick={handleSignOut}
                        className={classNames(active ? 'bg-gray-100' : '', 'block w-full text-left px-4 py-2 text-sm text-gray-700')}
                      >
                        Sign out
                      </button>
                    )}
                  </Menu.Item>
                </Menu.Items>
              </Menu>
            </div>
            <div className="sm:hidden">
              <Disclosure.Button className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
                <span className="sr-only">Open main menu</span>
                {open ? (
                  <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
                ) : (
                  <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
                )}
              </Disclosure.Button>
            </div>
          </div>

          <Disclosure.Panel className="sm:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1">
              {/* Add mobile menu items here if needed */}
            </div>
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  );
}

export default Navbar;