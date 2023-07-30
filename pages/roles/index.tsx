import React, { useState, useEffect } from 'react';
import Link from "next/link";
import RoleService from '@/services/RoleService';
import { emitNotification } from '@/services/api';
import Modal from '@/components/Modal';

interface RoleData {
  id: number;
  name: String;
}
const Index: React.FC = () => {
  const roleService = new RoleService();
  const [data, setData] = useState<RoleData | null | any>(null);
  const [showModal, setShowModal] = useState(false);
  const [selectedRoleId, setSelectedRoleId] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await roleService.getList('/role?PageNumber=0&PageSize=200');
        if (Array.isArray(response.data)) {
          const modifiedData = response.data.map((item: RoleData) => ({ id: item.id, name: item.name }));
          setData(modifiedData);
        }
      } catch (error) {
        //   setError('An error occurred while fetching the data.');
      }
    };

    fetchData();
  }, []);

  const renderDataRows = () => {
    let sn: number = 1;
    if (data && data.length > 0) {
      return data.map((item: RoleData) => (
        <tr key={item.id} className="bg-white">
          <td className="px-6 py-4 text-left text-sm text-gray-500">
            {sn++}
          </td>
          <td className="max-w-0 px-6 py-4 whitespace-nowrap text-sm text-gray-900">
            <div className="flex">
              {/* <a href="/" className="group inline-flex space-x-2 truncate text-sm"> */}
              <p className="capitalize text-gray-500 truncate group-hover:text-gray-900">
                {item.name}
              </p>
              {/* </a> */}
            </div>
          </td>
          <td className="max-w-0 px-6 py-4 whitespace-nowrap text-sm text-gray-900">
            <div className="flex">
              <button onClick={() => handleOnclickDelete(item.id)} className="group inline-flex space-x-2 truncate text-xs bg-red-400 px-2 py-1 rounded-md text-white">
                Delete
              </button>
            </div>
          </td>
        </tr>
      ));
    } else {
      return (
        <>
          <tr><td colSpan={5} className="max-w-0 px-6 py-4 whitespace-nowrap text-sm text-gray-900">No data.</td></tr>
        </>
      );
    }
  };

  const handleOnclickDelete = (id: number) => {
    setSelectedRoleId(id);
    setShowModal(true);
  }

  const deleteRole = async (): Promise<void> => {
    try {
      setShowModal(false);
      const response = await roleService.delete(`/role/${selectedRoleId}`);
      if (response.data && response.status === 200) {
        const updatedList = data.filter((item: RoleData) => item.id !== selectedRoleId);
        setData(updatedList);
        emitNotification("Deleted successfully", "success");
      }
    } catch (error) {
      emitNotification("Something went wrong. Please try again.", "error");
    }
  }

  return (
    <div>
      <div className="hidden sm:block mt-6">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="relative mb-5 pb-5 border-b border-gray-200 sm:pb-0">
            <div className="flex pb-3 w-full md:items-center">
              <h3 className="text-lg leading-6 font-medium text-gray-900">
                Roles
              </h3>
              <div className="ml-auto">
                <Link
                  href="/roles/add"
                  className="ml-3 inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500">
                  New Role
                </Link>
              </div>
            </div>
          </div>

          <div className="flex flex-col mt-2">
            <div className="align-middle min-w-full overflow-x-auto shadow overflow-hidden">
              <table className="min-w-full divide-y divide-gray-200">
                <thead>
                  <tr>
                    <th
                      className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase">
                      SN
                    </th>
                    <th
                      className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Name
                    </th>
                    <th
                      className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Action
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {renderDataRows()}
                </tbody>
              </table>
            </div>
            {/* <Paginator paginate={this.state.carriers} onPageChange={(page) => this.handlePageClick(page)}></Paginator> */}
          </div>
        </div>
      </div>
      <Modal
        title="Delete Role"
        message="Are you sure you want to delete this?"
        type={`success`}
        show={showModal}
        onSuccess={deleteRole}
        onClose={() => setShowModal(false)}/>
    </div>
  );
}

export default Index