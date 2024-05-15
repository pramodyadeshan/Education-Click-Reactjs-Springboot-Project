import React, { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useAppDispatch } from 'app/config/store';
import { Calendar } from 'primereact/calendar';
import 'primereact/resources/themes/lara-light-cyan/theme.css';
import { Button } from 'reactstrap';

const UpcommingClass = () => {
  const dispatch = useAppDispatch();
  const [date, setDate] = useState(null);
  const { id } = useParams<'id'>();
  return (
    <div className="text-dark">
      <div className="d-flex h-100 overflow-hidden">
        <div className="flex-grow-1">
          <main className="d-flex justify-content-center align-items-center mt-3">
            <div className="container">
              <h1 className="text-center text-zinc-600 my-4 font-sans xl:text-4xl lg:text-4xl md:text-3xl sm:text-3xl min-[320px]:text-3xl max-[639px]:text-4xl antialiased font-medium leading-snug tracking-normal ">
                Upcoming classes
              </h1>
              <div className="row">
                <div className="col-md-6 col-12 mt-6 overflow-y-auto max-h-[500px] bg-local" id="scroll">
                  <div className="max-w-md mx-auto bg-white rounded-xl border border-gray-300  shadow-md overflow-hidden md:max-w-2xl m-3">
                    <div className="p-3 flex items-center">
                      <div className="pr-6 bg-blue-600 p-2 rounded-lg text-center">
                        <p className="text-2xl font-bold text-white">18th</p>
                        <p className="text-sm text-white">May, 2024</p>
                      </div>
                      <div className="ml-4">
                        <div className="uppercase tracking-wide text-sm text-gray-600 font-semibold">First class Mathematics</div>
                        <p className="mt-1 text-gray-500">
                          Your booking is on May 18th, from 3:00 PM to 5:00 PM <br /> Click the link to prepare for your class
                        </p>
                        <Link to={`/teacher`} className="inline-block text-blue-600 font-bold py-2 rounded">
                          Click Link Here
                        </Link>
                      </div>
                    </div>
                  </div>
                  <div className="max-w-md mx-auto bg-white rounded-xl border border-gray-300  shadow-md overflow-hidden md:max-w-2xl m-3">
                    <div className="p-3 flex items-center">
                      <div className="pr-6 bg-blue-600 p-2 rounded-lg text-center">
                        <p className="text-2xl font-bold text-white">18th</p>
                        <p className="text-sm text-white">May, 2024</p>
                      </div>
                      <div className="ml-4">
                        <div className="uppercase tracking-wide text-sm text-gray-600 font-semibold">First class Mathematics</div>
                        <p className="mt-1 text-gray-500">
                          Your booking is on May 18th, from 3:00 PM to 5:00 PM <br /> Click the link to prepare for your class
                        </p>
                        <Link to={`/teacher`} className="inline-block text-blue-600 font-bold py-2 rounded">
                          Click Link Here
                        </Link>
                      </div>
                    </div>
                  </div>
                  <div className="max-w-md mx-auto bg-white rounded-xl border border-gray-300  shadow-md overflow-hidden md:max-w-2xl m-3">
                    <div className="p-3 flex items-center">
                      <div className="pr-6 bg-blue-600 p-2 rounded-lg text-center">
                        <p className="text-2xl font-bold text-white">18th</p>
                        <p className="text-sm text-white">May, 2024</p>
                      </div>
                      <div className="ml-4">
                        <div className="uppercase tracking-wide text-sm text-gray-600 font-semibold">First class Mathematics</div>
                        <p className="mt-1 text-gray-500">
                          Your booking is on May 18th, from 3:00 PM to 5:00 PM <br /> Click the link to prepare for your class
                        </p>
                        <Link to={`/teacher`} className="inline-block text-blue-600 font-bold py-2 rounded">
                          Click Link Here
                        </Link>
                      </div>
                    </div>
                  </div>
                  <div className="max-w-md mx-auto bg-white rounded-xl border border-gray-300  shadow-md overflow-hidden md:max-w-2xl m-3">
                    <div className="p-3 flex items-center">
                      <div className="pr-6 bg-blue-600 p-2 rounded-lg text-center">
                        <p className="text-2xl font-bold text-white">18th</p>
                        <p className="text-sm text-white">May, 2024</p>
                      </div>
                      <div className="ml-4">
                        <div className="uppercase tracking-wide text-sm text-gray-600 font-semibold">First class Mathematics</div>
                        <p className="mt-1 text-gray-500">
                          Your booking is on May 18th, from 3:00 PM to 5:00 PM <br /> Click the link to prepare for your class
                        </p>
                        <Link to={`/teacher`} className="inline-block text-blue-600 font-bold py-2 rounded">
                          Click Link Here
                        </Link>
                      </div>
                    </div>
                  </div>
                  <div className="max-w-md mx-auto bg-white rounded-xl border border-gray-300  shadow-md overflow-hidden md:max-w-2xl m-3">
                    <div className="p-3 flex items-center">
                      <div className="pr-6 bg-blue-600 p-2 rounded-lg text-center">
                        <p className="text-2xl font-bold text-white">18th</p>
                        <p className="text-sm text-white">May, 2024</p>
                      </div>
                      <div className="ml-4">
                        <div className="uppercase tracking-wide text-sm text-gray-600 font-semibold">First class Mathematics</div>
                        <p className="mt-1 text-gray-500">
                          Your booking is on May 18th, from 3:00 PM to 5:00 PM <br /> Click the link to prepare for your class
                        </p>
                        <Link to={`/teacher`} className="inline-block text-blue-600 font-bold py-2 rounded">
                          Click Link Here
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-md-5 col-12 mt-3 overflow-hidden">
                  <div className="relative flex w-full flex-col rounded-xl bg-white mx-4 my-4">
                    <div className="overflow-hidden bg-white rounded-xl">
                      <div className="flex justify-content-center w-full">
                        <Calendar value={date} onChange={e => setDate(e.value)} inline showWeek />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
};

export default UpcommingClass;
