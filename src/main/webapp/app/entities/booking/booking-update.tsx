import React, { useEffect, useRef } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { Button } from 'reactstrap';
import { isNumber, ValidatedField, ValidatedForm } from 'react-jhipster';

import { convertDateTimeFromServer, convertDateTimeToServer, displayDefaultDateTime } from 'app/shared/util/date-utils';
import { useAppDispatch, useAppSelector } from 'app/config/store';
import { getEntities as getTimeslots } from 'app/entities/timeslot/timeslot.reducer';
import { getEntities as getTeachers } from 'app/entities/teacher/teacher.reducer';
import { getEntities as getStudents } from 'app/entities/student/student.reducer';
import { createEntity, getEntity, updateEntity } from './booking.reducer';
import { FiArrowLeft, FiSave } from 'react-icons/fi';

export const BookingUpdate = () => {
  const dispatch = useAppDispatch();
  const buttonRef = useRef(null);
  const navigate = useNavigate();

  const { id } = useParams<'id'>();
  const isNew = id === undefined;

  const timeslots = useAppSelector(state => state.timeslot.entities);
  const teachers = useAppSelector(state => state.teacher.entities);
  const students = useAppSelector(state => state.student.entities);
  const bookingEntity = useAppSelector(state => state.booking.entity);
  const loading = useAppSelector(state => state.booking.loading);
  const updating = useAppSelector(state => state.booking.updating);
  const updateSuccess = useAppSelector(state => state.booking.updateSuccess);

  const handleClose = () => {
    navigate('/booking');
  };

  useEffect(() => {
    if (!isNew) {
      dispatch(getEntity(id));
    }

    dispatch(getTimeslots({}));
    dispatch(getTeachers({}));
    dispatch(getStudents({}));
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
    values.bookingDate = convertDateTimeToServer(values.bookingDate);
    if (values.payment !== undefined && typeof values.payment !== 'number') {
      values.payment = Number(values.payment);
    }

    const entity = {
      ...bookingEntity,
      ...values,
      timeslot: timeslots.find(it => it.id.toString() === values.timeslot?.toString()),
      teacher: teachers.find(it => it.id.toString() === values.teacher?.toString()),
      student: students.find(it => it.id.toString() === values.student?.toString()),
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
          bookingDate: displayDefaultDateTime(),
        }
      : {
          ...bookingEntity,
          bookingDate: convertDateTimeFromServer(bookingEntity.bookingDate),
          timeslot: bookingEntity?.timeslot?.id,
          teacher: bookingEntity?.teacher?.id,
          student: bookingEntity?.student?.id,
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
                Create or Update Booking Details
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
                              label="Booking Date"
                              id="booking-bookingDate"
                              name="bookingDate"
                              data-cy="bookingDate"
                              type="datetime-local"
                              placeholder="YYYY-MM-DD HH:mm"
                              validate={{
                                required: { value: true, message: 'This field is required.' },
                              }}
                            />

                            <ValidatedField id="booking-timeslot" name="timeslot" data-cy="timeslot" label="Timeslot" type="select">
                              <option value="" key="0" />
                              {timeslots
                                ? timeslots.map(otherEntity => (
                                    <option value={otherEntity.id} key={otherEntity.id}>
                                      {otherEntity.startTime}
                                    </option>
                                  ))
                                : null}
                            </ValidatedField>

                            <ValidatedField id="booking-teacher" name="teacher" data-cy="teacher" label="Teacher Name" type="select">
                              <option value="" key="0" />
                              {teachers
                                ? teachers.map(otherEntity => (
                                    <option value={otherEntity.id} key={otherEntity.id}>
                                      {otherEntity.name}
                                    </option>
                                  ))
                                : null}
                            </ValidatedField>

                            <ValidatedField id="booking-student" name="student" data-cy="student" label="Student Name" type="select">
                              <option value="" key="0" />
                              {students
                                ? students.map(otherEntity => (
                                    <option value={otherEntity.id} key={otherEntity.id}>
                                      {otherEntity.firstName}
                                    </option>
                                  ))
                                : null}
                            </ValidatedField>

                            <ValidatedField
                              label="Payment"
                              id="booking-payment"
                              name="payment"
                              data-cy="payment"
                              type="text"
                              validate={{
                                required: { value: true, message: 'This field is required.' },
                                validate: v => isNumber(v) || 'This field should be a number.',
                              }}
                            />

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
                          to={`/booking`}
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

export default BookingUpdate;
