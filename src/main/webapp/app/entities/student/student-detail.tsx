import React, { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Button } from 'reactstrap';
import { useAppDispatch, useAppSelector } from 'app/config/store';

import { getEntity } from './student.reducer';
import { FiArrowLeft, FiEdit } from 'react-icons/fi';
import { TextFormat } from 'react-jhipster';
import { APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export const StudentDetail = () => {
  const dispatch = useAppDispatch();

  const { id } = useParams<'id'>();

  useEffect(() => {
    dispatch(getEntity(id));
  }, []);

  const studentEntity = useAppSelector(state => state.student.entity);
  return (
    <div className="text-dark">
      <div className="d-flex h-100 overflow-hidden">
        <div className="flex-grow-1">
          <main className="d-flex justify-content-center align-items-center mt-3">
            <div className="container">
              <h1 className="text-center text-zinc-600 my-4 font-sans xl:text-4xl lg:text-4xl md:text-3xl sm:text-3xl min-[320px]:text-3xl max-[639px]:text-4xl antialiased font-medium leading-snug tracking-normal ">
                View students details
              </h1>
              <div className="row overflow-hidden">
                <div className="col-md-3 col-12 mb-3"></div>
                <div className="col-md-6 col-12 mb-3">
                  <div className="relative flex w-full flex-col rounded-xl bg-white mx-4 my-4 card">
                    <div className="relative mt-2 flex justify-center items-center overflow-hidden bg-white rounded-xl">
                      <img src="../../../content/images/icon/Teacher-boy.jpg" alt="ui/ux review" className="object-cover w-60 h-60" />
                    </div>

                    <div className="p-8 pt-2">
                      <div className="mb-2 text-center">
                        <h5 className="block font-sans text-3xl antialiased font-medium leading-snug tracking-normal text-gray-600">
                          {studentEntity.firstName} {studentEntity.lastName}
                        </h5>
                        <p className="text-zinc-500 text-sm py-2">{studentEntity.email}</p>
                        <label className="block font-sans text-sm antialiased font-bold leading-snug tracking-normal text-gray-500 flex justify-center items-center">
                          @{studentEntity.username}
                        </label>
                        <h5 className="block font-sans text-md antialiased font-bold leading-snug tracking-normal text-gray-400 flex justify-center items-center">
                          {studentEntity.contactNo}
                        </h5>
                      </div>
                      <div className="bg-white rounded-lg p-4">
                        <div className="grid grid-cols-2 gap-4 justify-content-center items-center">
                          <div className="col-span-1">
                            <label className="text-gray-600 text-md py-2">Date Of Birth</label>
                            <h5 className="text-gray-800 text-lg font-bold">
                              {studentEntity.dateOfBirth ? (
                                <TextFormat value={studentEntity.dateOfBirth} type="date" format={APP_LOCAL_DATE_FORMAT} />
                              ) : (
                                '-'
                              )}
                            </h5>
                          </div>
                          <div className="col-span-1">
                            <label className="text-gray-600 text-md py-2">Address</label>
                            <h5 className="text-gray-800 text-lg font-bold">{studentEntity.address || '-'}</h5>
                          </div>
                          <div className="col-span-1">
                            <label className="text-gray-600 text-md py-2">Gender</label>
                            <h5 className="text-gray-800 text-lg font-bold">{studentEntity.gender || '-'}</h5>
                          </div>
                          <div className="col-span-1">
                            <label className="text-gray-600 text-md py-2">Guardian's Name</label>
                            <h5 className="text-gray-800 text-lg font-bold">{studentEntity.guardianName || '-'}</h5>
                          </div>
                          <div className="col-span-1">
                            <label className="text-gray-600 text-md py-2">Guardian's Email</label>
                            <h5 className="text-gray-800 text-lg font-bold">{studentEntity.guardianEmail || '-'}</h5>
                          </div>
                          <div className="col-span-1">
                            <label className="text-gray-600 text-md py-2">Guardian's Contact</label>
                            <h5 className="text-gray-800 text-lg font-bold">{studentEntity.guardianContact || '-'}</h5>
                          </div>
                        </div>
                      </div>
                      <div className="flex flex-wrap justify-center items-center gap-3 mt-4 group">
                        <Button
                          tag={Link}
                          to={`/student`}
                          className="cursor-pointer rounded-full border border-gray-900/5 bg-gray-900/5 p-3 text-gray-900 hover:text-gray-900 transition-colors hover:border-gray-900/10 hover:bg-gray-900/10 hover:!opacity-100 group-hover:opacity-70"
                        >
                          <FiArrowLeft className="w-5 h-5" />
                        </Button>
                        <Button
                          tag={Link}
                          to={`/student/${studentEntity.id}/edit`}
                          className="cursor-pointer rounded-full border border-gray-900/5 bg-gray-900/5 p-3 text-gray-900 hover:text-gray-900 transition-colors hover:border-gray-900/10 hover:bg-gray-900/10 hover:!opacity-100 group-hover:opacity-70"
                        >
                          <FiEdit className="w-5 h-5" />
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-md-3 col-12 mb-3"></div>
              </div>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
};

export default StudentDetail;
