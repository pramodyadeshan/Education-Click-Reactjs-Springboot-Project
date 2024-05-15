import React, { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Button } from 'reactstrap';
import { openFile, TextFormat } from 'react-jhipster';

import { APP_DATE_FORMAT } from 'app/config/constants';
import { useAppDispatch, useAppSelector } from 'app/config/store';

import { getEntity } from './study-material.reducer';
import { FiArrowLeft, FiEdit, FiFile } from 'react-icons/fi';

export const StudyMaterialDetail = () => {
  const dispatch = useAppDispatch();

  const { id } = useParams<'id'>();

  useEffect(() => {
    dispatch(getEntity(id));
  }, []);

  const studyMaterialEntity = useAppSelector(state => state.studyMaterial.entity);
  return (
    <div className="text-dark">
      <div className="d-flex h-100 overflow-hidden">
        <div className="flex-grow-1">
          <main className="d-flex justify-content-center align-items-center mt-3">
            <div className="container">
              <h1 className="text-center text-zinc-600 my-4 font-sans xl:text-4xl lg:text-4xl md:text-3xl sm:text-3xl min-[320px]:text-3xl max-[639px]:text-4xl antialiased font-medium leading-snug tracking-normal ">
                View Study Material Details
              </h1>
              <div className="row overflow-hidden">
                <div className="col-md-3 col-12 mb-3"></div>
                <div className="col-md-6 col-12 mb-3">
                  <div className="relative flex w-full flex-col rounded-xl bg-white mx-4 my-4 card">
                    <div className="p-8 pt-2">
                      <div className="bg-white rounded-lg p-4">
                        <div className="grid grid-cols-2 gap-4 justify-content-center items-center">
                          <div className="col-span-1">
                            <label className="text-gray-600 text-md py-2">Title</label>
                            <h5 className="text-gray-800 text-lg font-bold">{studyMaterialEntity.name}</h5>
                          </div>
                          <div className="col-span-1">
                            <label className="text-gray-600 text-md py-2">Description</label>
                            <h5 className="text-gray-800 text-lg font-bold">{studyMaterialEntity.description}</h5>
                          </div>
                          <div className="col-span-1">
                            <label className="text-gray-600 text-md py-2">Teacher Name</label>
                            <h5 className="text-gray-800 text-lg font-bold">
                              {studyMaterialEntity.teacher ? studyMaterialEntity.teacher.name : ''}
                            </h5>
                          </div>
                          <div className="col-span-1">
                            <label className="text-gray-600 text-md py-2">Upload Date</label>
                            <h5 className="text-gray-800 text-lg font-bold">
                              {studyMaterialEntity.uploadDate ? (
                                <TextFormat value={studyMaterialEntity.uploadDate} type="date" format={APP_DATE_FORMAT} />
                              ) : null}
                            </h5>
                          </div>
                        </div>
                      </div>
                      <div className="flex flex-wrap justify-center items-center gap-3 mt-4 group">
                        <Button
                          tag={Link}
                          to={`/study-material`}
                          className="cursor-pointer rounded-full border border-gray-900/5 bg-gray-900/5 p-3 text-gray-900 hover:text-gray-900 transition-colors hover:border-gray-900/10 hover:bg-gray-900/10 hover:!opacity-100 group-hover:opacity-70"
                        >
                          <FiArrowLeft className="w-5 h-5" />
                        </Button>
                        <Button
                          tag={Link}
                          to={`/study-material/${studyMaterialEntity.id}/edit`}
                          className="cursor-pointer rounded-full border border-gray-900/5 bg-gray-900/5 p-3 text-gray-900 hover:text-gray-900 transition-colors hover:border-gray-900/10 hover:bg-gray-900/10 hover:!opacity-100 group-hover:opacity-70"
                        >
                          <FiEdit className="w-5 h-5" />
                        </Button>
                        {studyMaterialEntity.fileContentType ? (
                          <a
                            onClick={openFile(studyMaterialEntity.fileContentType, studyMaterialEntity.file)}
                            className="cursor-pointer rounded-full border border-gray-900/5 bg-gray-900/5 p-3 text-gray-900 hover:text-gray-900 transition-colors hover:border-gray-900/10 hover:bg-gray-900/10 hover:!opacity-100 group-hover:opacity-70"
                          >
                            <FiFile className="w-5 h-5" />
                          </a>
                        ) : null}
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

export default StudyMaterialDetail;
