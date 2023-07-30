import Image from 'next/image'
import { Inter } from 'next/font/google'
import Link from 'next/link'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  return (
    <>
      <div>
        {/* <!-- Page header --> */}
        <div className="bg-white shadow">
          <div className="px-4 sm:px-6 lg:max-w-6xl lg:mx-auto lg:px-8">
            <div className="py-6 md:flex md:items-center md:justify-between lg:border-t lg:border-cool-gray-200">
              <div className="flex-1 min-w-0">
                {/* <!-- Profile --> */}
                <div className="flex items-center">
                  <img className="hidden h-15 w-12 rounded-full sm:block" src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2.6&w=256&h=256&q=80" alt="" />
                  <div>
                    <div className="flex items-center">
                      <img className="h-15 w-15 rounded-full sm:hidden" src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2.6&w=256&h=256&q=80" alt="" />
                      <h1 className="ml-3 text-2xl font-bold leading-7 text-cool-gray-900 sm:leading-9 sm:truncate">
                        Good morning, Admin
                      </h1>
                    </div>
                    <dl className="mt-6 flex flex-col sm:ml-3 sm:mt-1 sm:flex-row sm:flex-wrap">
                      <dt className="sr-only">Company</dt>
                      <dd className="flex items-center text-sm leading-5 text-cool-gray-500 font-medium capitalize sm:mr-6">
                        {/* <!-- Heroicon name: office-building --> */}
                        <svg className="flex-shrink-0 mr-1.5 h-5 w-5 text-cool-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M4 4a2 2 0 012-2h8a2 2 0 012 2v12a1 1 0 110 2h-3a1 1 0 01-1-1v-2a1 1 0 00-1-1H9a1 1 0 00-1 1v2a1 1 0 01-1 1H4a1 1 0 110-2V4zm3 1h2v2H7V5zm2 4H7v2h2V9zm2-4h2v2h-2V5zm2 4h-2v2h2V9z" clipRule="evenodd" />
                        </svg>
                        Paris, France
                      </dd>
                      <dt className="sr-only">Account</dt>
                      <dd className="mt-3 flex items-center text-sm leading-5 text-cool-gray-500 font-medium sm:mr-6 sm:mt-0 capitalize">
                        {/* <!-- Heroicon name: check-circle --> */}
                        <svg className="flex-shrink-0 mr-1.5 h-5 w-5 text-green-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                        </svg>
                        Verified
                      </dd>
                    </dl>
                  </div>
                </div>
              </div>
              {/* <div className="mt-6 flex space-x-3 md:mt-0 md:ml-4">
                <span className="shadow-sm rounded-md">
                  <button type="button" className="inline-flex items-center px-4 py-2 border border-cool-gray-300 text-sm leading-5 font-medium rounded-md text-cool-gray-700 bg-white hover:text-cool-gray-500 focus:outline-none focus:shadow-outline-blue focus:border-blue-300 active:text-cool-gray-800 active:bg-cool-gray-50 transition duration-150 ease-in-out">
                    Add money
                  </button>
                </span>
                <span className="shadow-sm rounded-md">
                  <button type="button" className="inline-flex items-center px-4 py-2 border border-transparent text-sm leading-5 font-medium rounded-md text-white bg-cyan-600 hover:bg-cyan-700 focus:outline-none focus:shadow-outline-cyan focus:border-cyan-700 active:bg-cyan-700 transition duration-150 ease-in-out">
                    Send money
                  </button>
                </span>
              </div> */}
            </div>
          </div>
        </div>

        <div className="mt-8">
        </div>
      </div>
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-lg leading-6 font-medium text-cool-gray-900">Overview</h2>
        <div className="mt-2 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {/* <!-- Card --> */}

          <div className="bg-white overflow-hidden shadow rounded-lg">
            <div className="p-5">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  {/* <!-- Heroicon name: scale --> */}
                  <svg className="h-6 w-6 text-cool-gray-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z" />
                  </svg>
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dl>
                    <dt className="text-sm leading-5 font-medium text-cool-gray-500 truncate">
                      Our Customers
                    </dt>
                    <dd>
                      <div className="text-lg leading-7 font-medium text-cool-gray-900">
                        124
                      </div>
                    </dd>
                  </dl>
                </div>
              </div>
            </div>
            <div className="bg-cool-gray-50 px-5 py-3">
              <div className="text-sm leading-5">
                <Link href="/users" className="font-medium text-cyan-600 hover:text-cyan-900 transition ease-in-out duration-150">
                  View all
                </Link>
              </div>
            </div>
          </div>

          <div className="bg-white overflow-hidden shadow rounded-lg">
            <div className="p-5">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <svg className="h-6 w-6 text-cool-gray-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 12h16.5m-16.5 3.75h16.5M3.75 19.5h16.5M5.625 4.5h12.75a1.875 1.875 0 010 3.75H5.625a1.875 1.875 0 010-3.75z" />
                  </svg>
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dl>
                    <dt className="text-sm leading-5 font-medium text-cool-gray-500 truncate">
                      Lessons
                    </dt>
                    <dd>
                      <div className="text-lg leading-7 font-medium text-cool-gray-900">
                        500
                      </div>
                    </dd>
                  </dl>
                </div>
              </div>
            </div>
            <div className="bg-cool-gray-50 px-5 py-3">
              <div className="text-sm leading-5">
                <Link href="/lessons" className="font-medium text-cyan-600 hover:text-cyan-900 transition ease-in-out duration-150">
                  View all
                </Link>
              </div>
            </div>
          </div>

          <div className="bg-white overflow-hidden shadow rounded-lg">
            <div className="p-5">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  {/* <!-- Heroicon name: scale --> */}
                  <svg className="h-6 w-6 text-cool-gray-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 7.5l3 2.25-3 2.25m4.5 0h3m-9 8.25h13.5A2.25 2.25 0 0021 18V6a2.25 2.25 0 00-2.25-2.25H5.25A2.25 2.25 0 003 6v12a2.25 2.25 0 002.25 2.25z" />
                  </svg>
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dl>
                    <dt className="text-sm leading-5 font-medium text-cool-gray-500 truncate">
                      Subjects
                    </dt>
                    <dd>
                      <div className="text-lg leading-7 font-medium text-cool-gray-900">
                        100
                      </div>
                    </dd>
                  </dl>
                </div>
              </div>
            </div>
            <div className="bg-cool-gray-50 px-5 py-3">
              <div className="text-sm leading-5">
                <Link href="/subjects" className="font-medium text-cyan-600 hover:text-cyan-900 transition ease-in-out duration-150">
                  View all
                </Link>
              </div>
            </div>
          </div>

          {/* <!-- More cards... --> */}
        </div>
      </div>
    </>
  )
}
