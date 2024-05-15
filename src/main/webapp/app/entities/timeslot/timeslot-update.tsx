import React, { useEffect, useRef } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { Button } from 'reactstrap';
import { ValidatedField, ValidatedForm } from 'react-jhipster';

import { convertDateTimeFromServer, convertDateTimeToServer, displayDefaultDateTime } from 'app/shared/util/date-utils';
import { useAppDispatch, useAppSelector } from 'app/config/store';
import { getEntities as getTeachers } from 'app/entities/teacher/teacher.reducer';
import { createEntity, getEntity, updateEntity } from './timeslot.reducer';
import { FiArrowLeft, FiSave } from 'react-icons/fi';

export const TimeslotUpdate = () => {
  const dispatch = useAppDispatch();
  const buttonRef = useRef(null);
  const navigate = useNavigate();

  const { id } = useParams<'id'>();
  const isNew = id === undefined;

  const teachers = useAppSelector(state => state.teacher.entities);
  const timeslotEntity = useAppSelector(state => state.timeslot.entity);
  const loading = useAppSelector(state => state.timeslot.loading);
  const updating = useAppSelector(state => state.timeslot.updating);
  const updateSuccess = useAppSelector(state => state.timeslot.updateSuccess);

  const handleClose = () => {
    navigate('/timeslot');
  };

  useEffect(() => {
    if (!isNew) {
      dispatch(getEntity(id));
    }

    dispatch(getTeachers({}));
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
    values.startTime = convertDateTimeToServer(values.startTime);
    values.endTime = convertDateTimeToServer(values.endTime);

    const entity = {
      ...timeslotEntity,
      ...values,
      teacher: teachers.find(it => it.id.toString() === values.teacher?.toString()),
    };

    if (isNew) {
      dispatch(createEntity(entity));
    } else {
      dispatch(updateEntity(entity));
    }
  };

  const defaultValues = () =>
    isNew
      ? {
          startTime: displayDefaultDateTime(),
          endTime: displayDefaultDateTime(),
        }
      : {
          ...timeslotEntity,
          startTime: convertDateTimeFromServer(timeslotEntity.startTime),
          endTime: convertDateTimeFromServer(timeslotEntity.endTime),
          teacher: timeslotEntity?.teacher?.id,
        };

  const clickButtonById = buttonId => {
    const buttonElement = document.getElementById(buttonId);
    if (buttonElement) {
      buttonElement.click();
    }
  };
  return (
    <div className="text-dark">
      <div className="d-flex h-100 overflow-hidden">
        <div className="flex-grow-1">
          <main className="d-flex justify-content-center align-items-center mt-3">
            <div className="container">
              <h1 className="text-center text-zinc-600 my-4 font-sans xl:text-4xl lg:text-4xl md:text-3xl sm:text-3xl min-[320px]:text-3xl max-[639px]:text-4xl antialiased font-medium leading-snug tracking-normal ">
                Create or Update Timeslot Details
              </h1>
              <div className="row overflow-hidden">
                <div className="col-md-3 col-12 mb-3"></div>
                <div className="col-md-6 col-12 mb-3">
                  <div className="relative flex w-full flex-col rounded-xl bg-white mx-4 my-4 card">
                    <div className="p-8 pt-2">
                      <div className="bg-white rounded-lg p-4">
                        <div className="flex flex-wrap -mx-3 mb-6 justify-content-center items-center">
                          <ValidatedForm defaultValues={defaultValues()} onSubmit={saveEntity} className="w-100">
                            {!isNew ? (
                              <ValidatedField name="id" type="hidden" required readOnly id="booking-id" validate={{ required: true }} />
                            ) : null}

                            <ValidatedField
                              label="Start Time"
                              id="timeslot-startTime"
                              name="startTime"
                              data-cy="startTime"
                              type="datetime-local"
                              placeholder="YYYY-MM-DD HH:mm"
                              validate={{
                                required: { value: true, message: 'This field is required.' },
                              }}
                            />
                            <ValidatedField
                              label="End Time"
                              id="timeslot-endTime"
                              name="endTime"
                              data-cy="endTime"
                              type="datetime-local"
                              placeholder="YYYY-MM-DD HH:mm"
                              validate={{
                                required: { value: true, message: 'This field is required.' },
                              }}
                            />
                            <ValidatedField
                              label="Availability"
                              id="timeslot-availability"
                              name="availability"
                              data-cy="availability"
                              check
                              type="checkbox"
                            />
                            <ValidatedField id="timeslot-teacher" name="teacher" data-cy="teacher" label="Teacher Name" type="select">
                              <option value="" key="0" />
                              {teachers
                                ? teachers.map(otherEntity => (
                                    <option value={otherEntity.id} key={otherEntity.id}>
                                      {otherEntity.name}
                                    </option>
                                  ))
                                : null}
                            </ValidatedField>
                            <Button
                              id="save-entity"
                              ref={buttonRef}
                              data-cy="entityCreateSaveButton"
                              type="submit"
                              className="hidden cursor-pointer rounded-full border border-gray-900/5 bg-gray-900/5 p-3 text-gray-900 hover:text-gray-900 transition-colors hover:border-gray-900/10 hover:bg-gray-900/10 hover:!opacity-100 group-hover:opacity-70"
                            >
                              <FiSave className="w-5 h-5" />
                            </Button>
                          </ValidatedForm>
                        </div>
                      </div>
                      <div className="flex flex-wrap justify-center items-center gap-3 mt-1 group">
                        <Button
                          tag={Link}
                          to={`/timeslot`}
                          className="cursor-pointer rounded-full border border-gray-900/5 bg-gray-900/5 p-3 text-gray-900 hover:text-gray-900 transition-colors hover:border-gray-900/10 hover:bg-gray-900/10 hover:!opacity-100 group-hover:opacity-70"
                        >
                          <FiArrowLeft className="w-5 h-5" />
                        </Button>
                        <Button
                          onClick={() => clickButtonById('save-entity')}
                          className="cursor-pointer rounded-full border border-gray-900/5 bg-gray-900/5 p-3 text-gray-900 hover:text-gray-900 transition-colors hover:border-gray-900/10 hover:bg-gray-900/10 hover:!opacity-100 group-hover:opacity-70"
                        >
                          <FiSave className="w-5 h-5" />
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

export default TimeslotUpdate;
