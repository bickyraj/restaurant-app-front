import LoginLayout from "@/components/layouts/LoginLayout";
import { useAuthContext } from "@/contexts/AuthContext";
import AuthService from "@/services/AuthService";
import { emitNotification } from "@/services/api";
import { useRouter } from "next/router";
import React, { useState, ReactNode } from 'react';

const Login: React.FC & { Layout: React.FC } = (props: any) => {
  const authService = new AuthService;
  const { userToken, login } = useAuthContext();
  const router = useRouter();
  const [formFields, setFormFields] = useState({
    email: '',
    password: '',
  });
  const [isValid, setIsValid] = useState(false);
  const [errors, setErrors] = useState({
    email: "",
    password: ""
  });

  function onChange(e: any) {
    const { name, value } = e.target;
    setFormFields({
      ...formFields,
      [name]: value
    });
  }

  function validateForm(form: any) {
    return new Promise((resolve, reject) => {
      const errors = {
        password: "",
        email: "",
      };
  
      if (!form.password) {
        errors.password = "Password is required.";
      }
      
      if (!form.email) {
        errors.email = "Email is required.";
      } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(form.email)) {
        errors.email = "Invalid email address.";
      }

      setErrors({
        ...errors
      });
      const hasError = Object.values(errors).some((error) => !!error);
      resolve(!hasError);
    });
  }

  async function onSubmit(e: any) {
    e.preventDefault();
    const isFormValid = await validateForm(formFields);
    if (isFormValid) {
      try {
        const response = await authService.login(formFields);
        const token = response.data.token;
        login(token);
        router.push('/');
      } catch (error: any) {
        emitNotification(error.message, 'error');
      }
    }
  }

  return (
    <>
      <form onSubmit={onSubmit} className="space-y-6">
        <div>
          <label htmlFor="email" className="block text-sm font-medium leading-5 text-gray-700">
            Email address
          </label>
          <div className="mt-1 rounded-md shadow-sm">
            <input id="email" name="email" type="email" value={formFields.email} onChange={onChange} className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md placeholder-gray-400 focus:outline-none focus:shadow-outline-blue focus:border-blue-300 transition duration-150 ease-in-out sm:text-sm sm:leading-5" />
            {errors.email && <div className="text-red-500 text-sm">{errors.email}</div>}
          </div>
        </div>

        <div>
          <label htmlFor="password" className="block text-sm font-medium leading-5 text-gray-700">
            Password
          </label>
          <div className="mt-1 rounded-md shadow-sm">
            <input id="password" type="password" name="password" value={formFields.password} onChange={onChange} className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md placeholder-gray-400 focus:outline-none focus:shadow-outline-blue focus:border-blue-300 transition duration-150 ease-in-out sm:text-sm sm:leading-5" />
            {errors.password && <div className="text-red-500 text-sm">{errors.password}</div>}
          </div>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <input id="remember_me" type="checkbox" className="form-checkbox h-4 w-4 text-cyan-600 transition duration-150 ease-in-out" />
            <label htmlFor="remember_me" className="ml-2 block text-sm leading-5 text-gray-900">
              Remember me
            </label>
          </div>

          <div className="text-sm leading-5">
            <a href="#top" className="font-medium text-cyan-600 hover:text-cyan-500 focus:outline-none focus:underline transition ease-in-out duration-150">
              Forgot your password?
            </a>
          </div>
        </div>

        <div>
          <span className="block w-full rounded-md shadow-sm">
            <button type="submit" className="w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-cyan-600 hover:bg-cyan-500 focus:outline-none focus:border-cyan-700 focus:shadow-outline-cyan active:bg-cyan-700 transition duration-150 ease-in-out">
              Sign in
            </button>
          </span>
        </div>
      </form>
    </>
  );
};
Login.Layout = LoginLayout;
export default Login;