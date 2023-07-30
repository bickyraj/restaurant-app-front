import { emitNotification } from "@/services/api";
import UserService from "@/services/UserService";
import { useState } from "react";

const Add: React.FC = () => {
  const userService = new UserService();
  const [formData, setFormData] = useState({
    firstname: '',
    lastname: '',
    email: '',
    country: '',
    city: '',
    state: '',
    postalcode: '',
    streetaddress: '',
  });

  const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setFormData({
      ...formData,
      country: event.target.value,
    });
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  };

  const clearFormData = () => {
    setFormData({
      firstname: '',
      lastname: '',
      email: '',
      country: '',
      city: '',
      state: '',
      postalcode: '',
      streetaddress: '',
    });
  }

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      await userService.createUser(formData); // Replace with your payload data
      emitNotification("Added successfully", "success");
      clearFormData();
    } catch (error) {
      // Handle any errors
      console.error(error);
    }
  };

  return (
    <div>
      <div className="hidden sm:block mt-6">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="relative mb-5 p-5 border-b border-gray-200 sm:pb-0 bg-white">
            <div className="flex pb-3 w-full md:items-center">
              <form onSubmit={handleSubmit}>
                <div className="space-y-12">
                  <div className="border-b border-gray-900/10 pb-12">
                    <h2 className="text-base font-semibold leading-7 text-gray-900">Add New User</h2>
                    {/* <p className="mt-1 text-sm leading-6 text-gray-600">Use a permanent address where you can receive mail.</p> */}

                    <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                      <div className="sm:col-span-3">
                        <label className="block text-sm font-medium leading-6 text-gray-900">First name</label>
                        <div className="mt-2">
                          <input type="text" name="firstname" value={formData.firstname} onChange={handleChange} id="first-name" className="block w-full px-2 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 sm:text-sm sm:leading-6" />
                        </div>
                      </div>

                      <div className="sm:col-span-3">
                        <label className="block text-sm font-medium leading-6 text-gray-900">Last name</label>
                        <div className="mt-2">
                          <input type="text" name="lastname" id="lastname" value={formData.lastname} onChange={handleChange} className="block w-full px-2 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 sm:text-sm sm:leading-6" />
                        </div>
                      </div>

                      <div className="sm:col-span-4">
                        <label className="block text-sm font-medium leading-6 text-gray-900">Email address</label>
                        <div className="mt-2">
                          <input id="email" name="email" type="email" value={formData.email} onChange={handleChange} className="block w-full px-2 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 sm:text-sm sm:leading-6" />
                        </div>
                      </div>

                      <div className="sm:col-span-3">
                        <label className="block text-sm font-medium leading-6 text-gray-900">Country</label>
                        <div className="mt-2">
                          <select id="country" name="country" value={formData.country} onChange={handleSelectChange} className="block w-full px-2 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 sm:max-w-xs sm:text-sm sm:leading-6">
                            <option>France</option>
                            <option>Switzerland</option>
                            <option>Belgium</option>
                            <option>United States</option>
                            <option>Canada</option>
                            <option>Mexico</option>
                          </select>
                        </div>
                      </div>

                      <div className="col-span-full">
                        <label className="block text-sm font-medium leading-6 text-gray-900">Street address</label>
                        <div className="mt-2">
                          <input type="text" name="streetaddress" value={formData.streetaddress} onChange={handleChange} id="street-address" className="block w-full px-2 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 sm:text-sm sm:leading-6" />
                        </div>
                      </div>

                      <div className="sm:col-span-2 sm:col-start-1">
                        <label className="block text-sm font-medium leading-6 text-gray-900">City</label>
                        <div className="mt-2">
                          <input type="text" name="city" id="city" value={formData.city} onChange={handleChange} className="block w-full px-2 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 sm:text-sm sm:leading-6" />
                        </div>
                      </div>

                      <div className="sm:col-span-2">
                        <label className="block text-sm font-medium leading-6 text-gray-900">State / Province</label>
                        <div className="mt-2">
                          <input type="text" name="state" id="region" value={formData.state} onChange={handleChange} className="block w-full px-2 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 sm:text-sm sm:leading-6" />
                        </div>
                      </div>

                      <div className="sm:col-span-2">
                        <label className="block text-sm font-medium leading-6 text-gray-900">ZIP / Postal code</label>
                        <div className="mt-2">
                          <input type="text" name="postalcode" value={formData.postalcode} onChange={handleChange} id="postal-code" className="block w-full px-2 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 sm:text-sm sm:leading-6" />
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* <div className="border-b border-gray-900/10 pb-12">
                                  <h2 className="text-base font-semibold leading-7 text-gray-900">Notifications</h2>
                                  <p className="mt-1 text-sm leading-6 text-gray-600">We'll always let you know about important changes, but you pick what else you want to hear about.</p>

                                  <div className="mt-10 space-y-10">
                                    <fieldset>
                                      <legend className="text-sm font-semibold leading-6 text-gray-900">By Email</legend>
                                      <div className="mt-6 space-y-6">
                                        <div className="relative flex gap-x-3">
                                          <div className="flex h-6 items-center">
                                            <input id="comments" name="comments" type="checkbox" className="h-4 w-4 rounded border-gray-300 text-cyan-600"/>
                                          </div>
                                          <div className="text-sm leading-6">
                                            <label className="font-medium text-gray-900">Comments</label>
                                            <p className="text-gray-500">Get notified when someones posts a comment on a posting.</p>
                                          </div>
                                        </div>
                                        <div className="relative flex gap-x-3">
                                          <div className="flex h-6 items-center">
                                            <input id="candidates" name="candidates" type="checkbox" className="h-4 w-4 rounded border-gray-300 text-cyan-600"/>
                                          </div>
                                          <div className="text-sm leading-6">
                                            <label className="font-medium text-gray-900">Candidates</label>
                                            <p className="text-gray-500">Get notified when a candidate applies for a job.</p>
                                          </div>
                                        </div>
                                        <div className="relative flex gap-x-3">
                                          <div className="flex h-6 items-center">
                                            <input id="offers" name="offers" type="checkbox" className="h-4 w-4 rounded border-gray-300 text-cyan-600"/>
                                          </div>
                                          <div className="text-sm leading-6">
                                            <label className="font-medium text-gray-900">Offers</label>
                                            <p className="text-gray-500">Get notified when a candidate accepts or rejects an offer.</p>
                                          </div>
                                        </div>
                                      </div>
                                    </fieldset>
                                    <fieldset>
                                      <legend className="text-sm font-semibold leading-6 text-gray-900">Push Notifications</legend>
                                      <p className="mt-1 text-sm leading-6 text-gray-600">These are delivered via SMS to your mobile phone.</p>
                                      <div className="mt-6 space-y-6">
                                        <div className="flex items-center gap-x-3">
                                          <input id="push-everything" name="push-notifications" type="radio" className="h-4 w-4 border-gray-300 text-cyan-600"/>
                                          <label className="block text-sm font-medium leading-6 text-gray-900">Everything</label>
                                        </div>
                                        <div className="flex items-center gap-x-3">
                                          <input id="push-email" name="push-notifications" type="radio" className="h-4 w-4 border-gray-300 text-cyan-600"/>
                                          <label className="block text-sm font-medium leading-6 text-gray-900">Same as email</label>
                                        </div>
                                        <div className="flex items-center gap-x-3">
                                          <input id="push-nothing" name="push-notifications" type="radio" className="h-4 w-4 border-gray-300 text-cyan-600"/>
                                          <label className="block text-sm font-medium leading-6 text-gray-900">No push notifications</label>
                                        </div>
                                      </div>
                                    </fieldset>
                                  </div>
                                </div> */}
                </div>

                <div className="mt-6 flex items-center justify-end gap-x-6">
                  <button type="button" className="text-sm font-semibold leading-6 text-gray-900">Cancel</button>
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