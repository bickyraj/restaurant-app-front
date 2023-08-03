import CategoryService from "@/services/CategoryService";
import { emitNotification } from "@/services/api";
import { useState, useEffect } from "react";
import Link from "next/link";

interface Category {
  _id: string;
  name: string;
}
const Edit: React.FC = ({ id }: any) => {
  const categoryService = new CategoryService();
  const [categories, setCategories] = useState<Category[] | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    root_category_id: '',
  });

  const getCategory = async (id: number) => {
    const result: any = await categoryService.get('/category', id);
    setFormData({
      name: result.data.name,
      root_category_id: result.data.parentCategory
    });
  }

  useEffect(() => {
    getCategory(id);
  }, []);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      await categoryService.update(`/category/${id}`, formData); // Replace with your payload data
      emitNotification("Edited successfully", "success");
    } catch (error: any) {
      emitNotification(error.message, "error");
    }
  };

  const fetchCategories = async () => {
    try {
      const result: any = await categoryService.getList('/category/all');
      setCategories(result.data);
    } catch (error) {
      throw error;
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  };

  return (
    <div>
      <div className="hidden sm:block mt-6">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="relative mb-5 p-5 border-b border-gray-200 sm:pb-0 bg-white">
            <div className="pb-3 w-full md:items-center">
              <form onSubmit={handleSubmit}>
                <div className="space-y-12">
                  <div className="border-b border-gray-900/10 pb-12">
                    <h2 className="text-base font-semibold leading-7 text-gray-900 pb-3 border-b border-gray-100">Edit Category</h2>
                    {/* <p className="mt-1 text-sm leading-6 text-gray-600">Use a permanent address where you can receive mail.</p> */}
                    <div className="mt-5 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                      <div className="sm:col-span-4">
                        <label className="block text-sm font-medium leading-6 text-gray-900">Name</label>
                        <div className="mt-2">
                          <input type="text" name="name" value={formData.name} onChange={handleChange} id="first-name" className="block w-full px-2 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 sm:text-sm sm:leading-6" />
                        </div>
                      </div>
                    </div>
                    <div className="mt-5 grid grid-cols-2 gap-x-6 gap-y-8 sm:grid-cols-2">
                      <div className="sm:col-span-1">
                        <label className="block text-sm font-medium leading-6 text-gray-900">Subject</label>
                        <div className="mt-2">
                          <select id="select" value={formData.root_category_id} name="root_category_id" onChange={handleSelectChange} className="border border-gray-300 rounded px-3 py-2 w-full">
                            {categories && Array.isArray(categories) && categories.map((option: Category) => (
                              <option key={option._id} value={option._id}>
                                {option.name}
                              </option>
                            ))}
                          </select>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="mt-6 mb-5 flex items-center gap-x-2">
                  <Link href={"/food-categories"} className="rounded-md bg-gray-200 px-5 py-2 text-sm font-semibold text-gray-800 shadow-sm hover:bg-gray-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan-600">Cancel</Link>
                  <button type="submit" className="rounded-md bg-cyan-600 px-5 py-2 text-sm font-semibold text-white shadow-sm hover:bg-cyan-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan-600">Save</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export async function getServerSideProps(context: any) {
  const { params } = context;
  const { id } = params;
  return {
    props: {
      id,
    },
  };
}

export default Edit;