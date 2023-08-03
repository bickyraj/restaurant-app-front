import CInput from "@/components/forms/CInput";
import CategoryService from "@/services/CategoryService";
import { emitNotification } from "@/services/api";
import Error from "next/error";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

interface Category {
  _id: string;
  name: string;
}
const Add: React.FC = () => {
  const router = useRouter();
  const categoryService = new CategoryService();
  const [categories, setCategories] = useState<Category[] | null>(null);
  const [errors, setErrors] = useState<any>({});
  const [selectedCategoryId, setSelectedCategoryId] = useState('');
  const [formData, setFormData] = useState<any>({
    root_category_id: '',
    name: '',
  });

  const validationRules = {
    name: {
      required: true,
    }
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
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
    if (categories && categories.length > 0) {
      setFormData({
        ...formData,
        root_category_id: categories[0]._id,
      });
      setSelectedCategoryId(categories[0]._id);
    }
  }, [categories]);

  useEffect(() => {
    fetchCategories();
  }, []);
  
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      if (formValid()) {
        console.log(formData);
        await categoryService.create('/sub-category', formData); // Replace with your payload data
        emitNotification("Added successfully", "success");
        router.push('/food-sub-categories');
      } else {
        const firstErrorField = Object.entries(errors).find(([fieldName, hasError]) => hasError);
        if (firstErrorField) {
          const [fieldName] = firstErrorField;
          const fieldRef = document.getElementsByName(fieldName)[0];
          if (fieldRef) {
            fieldRef.scrollIntoView({ behavior: 'smooth' });
          }
        }
      }
      // clearFormData();
    } catch (error: any) {
      // Handle any errors
      emitNotification(error.message, "error");
      console.error(error.message);
    }
  }

  const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedCategoryId(event.target.value)
    setFormData({
      ...formData,
      root_category_id: event.target.value,
    });
  };

  const formValid = () => {
    const newErrors: any = {};

    Object.entries(validationRules).forEach(([fieldName, rules]) => {
      const { required } = rules;
      const value = formData[fieldName];

      if (required && !value) {
        newErrors[fieldName] = true;
      }
    });

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }

  return (
    <div>
      <div className="hidden sm:block mt-6">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="relative mb-5 p-5 border-b border-gray-200 sm:pb-0 bg-white">
            <div className="pb-3 w-full md:items-center">
              <form onSubmit={handleSubmit}>
                <div className="space-y-12">
                  <div className="border-b border-gray-900/10 pb-12">
                    <h2 className="text-base font-semibold leading-7 text-gray-900 pb-3 border-b border-gray-100">Add New Category</h2>
                    {/* <p className="mt-1 text-sm leading-6 text-gray-600">Use a permanent address where you can receive mail.</p> */}

                    <div className="mt-5 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                      <div className="sm:col-span-4">
                        <label className="block text-sm font-medium leading-6 text-gray-900">Name</label>
                        <div className="mt-2">
                          <CInput
                            type="text"
                            value={formData.name}
                            name="name"
                            hasError={errors.name}
                            handleChange={handleChange}
                          ></CInput>
                        </div>
                      </div>
                    </div>
                    <div className="mt-5 grid grid-cols-2 gap-x-6 gap-y-8 sm:grid-cols-2">
                      <div className="sm:col-span-1">
                        <label className="block text-sm font-medium leading-6 text-gray-900">Categories</label>
                        <div className="mt-2">
                          <select id="select" value={selectedCategoryId} name="root_category_id" onChange={handleSelectChange} className="border border-gray-300 rounded px-3 py-2 w-full">
                            {categories && Array.isArray(categories) && categories.map((option: Category) => (
                              <option key={option._id} value={option._id}>
                                {option.name}
                              </option>
                            ))}
                          </select>
                          {/* {errors.subjectId && <span className="text-red-500 text-sm">{"This field is required."}</span>} */}
                        </div>
                      </div>
                    </div>
                  </div>

                </div>

                <div className="mt-6 mb-5 flex items-center gap-x-2">
                  <Link href="/food-sub-categories" className="rounded-md bg-gray-200 px-5 py-2 text-sm font-semibold text-gray-800 shadow-sm hover:bg-gray-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan-600">Cancel</Link>
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

export default Add;