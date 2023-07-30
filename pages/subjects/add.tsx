import CForm from "@/components/forms/CForm";
import CInput from "@/components/forms/CInput";
import { FormProvider, useFormContext } from "@/contexts/CFormContext";
import SubjectService from "@/services/SubjectService";
import { emitNotification } from "@/services/api";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

const Add: React.FC = () => {
  const router = useRouter();
  const subjectService = new SubjectService();
  const [errors, setErrors] = useState<any>({});
  const [formData, setFormData] = useState<any>({
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

  const clearFormData = () => {
    setFormData({
      name: '',
    });
  }

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      if (formValid()) {
        await subjectService.create('/subject', formData); // Replace with your payload data
        emitNotification("Added successfully", "success");
        router.push('/subject');
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
      emitNotification("error saving", "error");
      console.error(error);
    }
  }

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
                    <h2 className="text-base font-semibold leading-7 text-gray-900 pb-3 border-b border-gray-100">Add New Subject</h2>
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
                  </div>

                </div>

                <div className="mt-6 mb-5 flex items-center gap-x-2">
                  <button type="button" className="rounded-md bg-gray-200 px-5 py-2 text-sm font-semibold text-gray-800 shadow-sm hover:bg-gray-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan-600">Cancel</button>
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