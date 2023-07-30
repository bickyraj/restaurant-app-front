import React, { useState, useEffect } from 'react';
import Link from "next/link";

const Index: React.FC = () => {
    return (
        <div>
            <div className="hidden sm:block">
                <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="pt-6 divide-y divide-gray-200">
                        <div className="">
                            <div>
                                <h2 className="text-lg leading-6 font-medium text-gray-900">Settings</h2>
                                {/* <p className="mt-1 text-sm text-gray-500">
                                    Ornare eu a volutpat eget vulputate. Fringilla commodo amet.
                                </p> */}
                            </div>
                            <ul className="bg-white px-5 mt-2 divide-y divide-gray-200">
                                <li className="py-4 flex items-center justify-between">
                                    <div className="flex flex-col">
                                        <p id="privacy-option-label-1" className="text-sm font-medium text-gray-900">
                                            Roles and Permissions
                                        </p>
                                        <p id="privacy-option-description-1" className="text-sm text-gray-500">
                                            Define roles and their permissions.
                                        </p>
                                    </div>
                                    {/* <!-- On: "bg-teal-500", Off: "bg-gray-200" --> */}
                                    <Link href="/roles" type="button" aria-labelledby="privacy-option-label-1" aria-describedby="privacy-option-description-1" className="bg-white py-2 px-4 border border-gray-300 rounded-md shadow-sm text-xs font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-light-blue-500">
                                        Go to settings
                                    </Link>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Index;