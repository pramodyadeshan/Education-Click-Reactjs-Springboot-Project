import React, { useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { Button } from 'reactstrap';
import { isNumber, ValidatedField, ValidatedForm } from 'react-jhipster';
import { useAppDispatch, useAppSelector } from 'app/config/store';
import { createEntity, getEntity, updateEntity } from './teacher.reducer';
import { FiArrowLeft, FiSave } from 'react-icons/fi';

export const TeacherUpdate = () => {
  const dispatch = useAppDispatch();

  const navigate = useNavigate();

  const { id } = useParams<'id'>();
  const isNew = id === undefined;

  const teacherEntity = useAppSelector(state => state.teacher.entity);
  const loading = useAppSelector(state => state.teacher.loading);
  const updating = useAppSelector(state => state.teacher.updating);
  const updateSuccess = useAppSelector(state => state.teacher.updateSuccess);

  const handleClose = () => {
    navigate('/teacher');
  };

  useEffect(() => {
    if (!isNew) {
      dispatch(getEntity(id));
    }
  }, []);

  useEffect(() => {
    if (updateSuccess) {
      handleClose();
    }
  }, [updateSuccess]);

  // eslint-disable-next-line complexity
  const saveEntity = values => {
    if (values.id !== undefined && typeof values.id !== 'number') {
      values.id = Number(values.id);
    }
    if (values.feePerHour !== undefined && typeof values.feePerHour !== 'number') {
      values.feePerHour = Number(values.feePerHour);
    }

    const entity = {
      ...teacherEntity,
      ...values,
    };

    if (isNew) {
      dispatch(createEntity(entity));
    } else {
      dispatch(updateEntity(entity));
    }
  };

  const defaultValues = () =>
    isNew
      ? {}
      : {
          ...teacherEntity,
        };

  return (
    <div className="text-dark">
      <div className="d-flex h-100 overflow-hidden">
        <div className="flex-grow-1">
          <main className="d-flex justify-content-center align-items-center mt-3">
            <div className="container">
              <h1 className="text-center text-zinc-600 my-4 font-sans xl:text-4xl lg:text-4xl md:text-3xl sm:text-3xl min-[320px]:text-3xl max-[639px]:text-4xl antialiased font-medium leading-snug tracking-normal ">
                Update Your Teacher Information Here
              </h1>
              <div className="row overflow-hidden">
                <div className="col-md-6 col-12 mb-3">
                  <div className="relative flex w-full flex-col rounded-xl bg-white mx-4 my-4 card">
                    <div className="relative mt-2 flex justify-center items-center overflow-hidden bg-white rounded-xl">
                      <img src="../../../content/images/icon/Teacher-boy.jpg" alt="ui/ux review" className="object-cover w-60 h-60" />
                    </div>

                    <div className="p-6 pt-2">
                      <div className="mb-2 text-center">
                        <h5 className="block font-sans text-3xl antialiased font-medium leading-snug tracking-normal text-gray-600">
                          {teacherEntity.name}
                        </h5>
                        <p className="text-zinc-500 text-sm py-2">{teacherEntity.email}</p>

                        <span className="my-1 inline-flex items-center rounded-md bg-indigo-50 px-2 py-1 text-xs font-medium text-indigo-700 ring-1 ring-inset ring-indigo-700/10 mr-1">
                          ICT
                        </span>
                        <span className="my-1 inline-flex items-center rounded-md bg-indigo-50 px-2 py-1 text-xs font-medium text-indigo-700 ring-1 ring-inset ring-indigo-700/10 mr-1">
                          English
                        </span>
                        <h4 className="text-sm mt-4 text-gray-400">Fee per hour</h4>
                        <h5 className="block font-sans text-xl antialiased font-bold leading-snug tracking-normal text-gray-700 flex justify-center items-center">
                          LKR {parseInt(teacherEntity.feePerHour).toFixed(2)}
                        </h5>
                        <p>{teacherEntity.subject ? teacherEntity.subject.name : ''}</p>
                      </div>
                      <div className="flex flex-wrap justify-center items-center gap-3 mt-4 group">
                        <Button
                          tag={Link}
                          to={`/teacher`}
                          className="cursor-pointer rounded-full border border-gray-900/5 bg-gray-900/5 p-3 text-gray-900 hover:text-gray-900 transition-colors hover:border-gray-900/10 hover:bg-gray-900/10 hover:!opacity-100 group-hover:opacity-70"
                        >
                          <FiArrowLeft className="w-5 h-5" />
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-md-5 col-12 mb-3">
                  <div className="relative flex w-full flex-col rounded-xl bg-white mx-4 my-4 card h-auto px-8 pt-4 pb-10">
                    <div className="overflow-hidden bg-white rounded-xl text-gray-700">
                      <h1 className="text-zinc-600 my-4 font-sans xl:text-3xl lg:text-3xl md:text-2xl sm:text-2xl min-[320px]:text-2xl max-[639px]:text-3xl antialiased font-medium leading-snug tracking-normal">
                        Update Teacher Details
                      </h1>
                      <ValidatedForm defaultValues={defaultValues()} onSubmit={saveEntity}>
                        {!isNew ? (
                          <ValidatedField type="hidden" name="id" required readOnly id="teacher-id" validate={{ required: true }} />
                        ) : null}
                        <ValidatedField
                          label="Name"
                          id="teacher-name"
                          name="name"
                          data-cy="name"
                          type="text"
                          validate={{
                            required: { value: true, message: 'This field is required.' },
                          }}
                        />
                        <ValidatedField
                          label="Subject"
                          id="teacher-subject"
                          name="subject"
                          data-cy="subject"
                          type="text"
                          validate={{
                            required: { value: true, message: 'This field is required.' },
                          }}
                        />
                        <ValidatedField
                          label="Email"
                          id="teacher-email"
                          name="email"
                          data-cy="email"
                          type="text"
                          validate={{
                            required: { value: true, message: 'This field is required.' },
                          }}
                        />
                        <ValidatedField
                          label="Fee Per Hour"
                          id="teacher-feePerHour"
                          name="feePerHour"
                          data-cy="feePerHour"
                          type="text"
                          validate={{
                            required: { value: true, message: 'This field is required.' },
                            validate: v => isNumber(v) || 'This field should be a number.',
                          }}
                        />
                        <Button
                          color="primary"
                          id="save-entity"
                          data-cy="entityCreateSaveButton"
                          type="submit"
                          disabled={updating}
                          className="w-full flex items-center justify-center outline-none" // Use flex utilities to center content
                        >
                          <FiSave className="mr-2" />
                          Save
                        </Button>
                      </ValidatedForm>
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

export default TeacherUpdate;
