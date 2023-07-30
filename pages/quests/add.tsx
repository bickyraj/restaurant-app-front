import CInput from "@/components/forms/CInput";
import QuestService from "@/services/QuestService";
import { emitNotification } from "@/services/api";
import Link from "next/link";
import { useRouter } from "next/router";
import { useState, useRef } from "react";

enum QuestType {
  Lesson = 1,
  Chapter = 2,
  Subject = 3
}

enum RewardType {
  Coin = 1
}

interface Quest {
  title: string,
  questType: QuestType,
  neededProgress: number,
  rewardType: RewardType,
  rewardValue: number
}

const QuestTypeData = {
  "Lesson": 1,
  "Chapter": 2,
  "Subject": 3
}

const validationRules = {
  title: {
    required: true,
  },
  questType: {
    required: true,
  },
  neededProgress: {
    required: true,
  },
  rewardType: {
    required: true,
  },
  rewardValue: {
    required: true,
  },
};

const Add: React.FC = () => {
  const router = useRouter();
  const subjectService = new QuestService();
  const [errors, setErrors] = useState<any>({});
  const [formData, setFormData] = useState<Quest | any>({
    title: "",
    questType: 1,
    neededProgress: 1,
    rewardType: 1,
    rewardValue: 1
  });

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  };

  const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (formValid()) {
      try {
        await subjectService.create('/quest', formData); // Replace with your payload data
        emitNotification("Added successfully", "success");
        router.push('/quest');
        // clearFormData();
      } catch (error: any) {
        // Handle any errors
        emitNotification("error saving", "error");
        console.error(error);
      }
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
                    <h2 className="text-base font-semibold leading-7 text-gray-900 pb-3 border-b border-gray-100">Add New Quest</h2>
                    {/* <p className="mt-1 text-sm leading-6 text-gray-600">Use a permanent address where you can receive mail.</p> */}

                    <div className="mt-5 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                      <div className="sm:col-span-4">
                        <label className="block text-sm font-medium leading-6 text-gray-900">Title</label>
                        <div className="mt-2">
                          <CInput
                            type="text"
                            name="title"
                            hasError={errors.title}
                            handleChange={handleChange}
                          ></CInput>
                        </div>
                      </div>
                      <div className="sm:col-span-4">
                        <label className="block text-sm font-medium leading-6 text-gray-900">Type</label>
                        <div className="mt-2">
                          <select id="select" name="questType" onChange={handleSelectChange} className="border border-gray-300 rounded px-3 py-2 w-full">
                            {Object.entries(QuestTypeData).map(([key, value]) => (
                              <option key={value} value={value}>
                                {key}
                              </option>
                            ))}
                          </select>
                        </div>
                      </div>
                      <div className="sm:col-span-4">
                        <label className="block text-sm font-medium leading-6 text-gray-900">Needed Progress</label>
                        <div className="mt-2">
                          <CInput
                            type="number"
                            value={formData.neededProgress}
                            name="neededProgress"
                            hasError={errors.neededProgress}
                            handleChange={handleChange}
                          ></CInput>
                        </div>
                      </div>
                      <div className="sm:col-span-4">
                        <label className="block text-sm font-medium leading-6 text-gray-900">Reward Type</label>
                        <div className="mt-2">
                          <input type="text" disabled readOnly name="" id="reward-type" value="Coin" className="block w-full px-2 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 sm:text-sm sm:leading-6" />
                        </div>
                      </div>
                      <div className="sm:col-span-4">
                        <label className="block text-sm font-medium leading-6 text-gray-900">Reward Value</label>
                        <div className="mt-2">
                          <CInput
                            type="number"
                            value={formData.rewardValue}
                            name="rewardValue"
                            hasError={errors.rewardValue}
                            handleChange={handleChange}
                          ></CInput>
                        </div>
                      </div>
                    </div>
                  </div>

                </div>

                <div className="mt-6 mb-5 flex items-center gap-x-2">
                  <Link href={"/quests"} className="rounded-md bg-gray-200 px-5 py-2 text-sm font-semibold text-gray-800 shadow-sm hover:bg-gray-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan-600">Cancel</Link>
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