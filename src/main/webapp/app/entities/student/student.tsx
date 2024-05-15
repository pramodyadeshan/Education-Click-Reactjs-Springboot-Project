import React, { useEffect, useState } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import { Link, useLocation, useNavigate, useParams } from 'react-router-dom';
import { Button, Modal, ModalBody, ModalFooter, ModalHeader, Table } from 'reactstrap';
import { getPaginationState, TextFormat } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSort, faSortDown, faSortUp } from '@fortawesome/free-solid-svg-icons';
import { APP_LOCAL_DATE_FORMAT } from 'app/config/constants';
import { ASC, DESC, ITEMS_PER_PAGE } from 'app/shared/util/pagination.constants';
import { overridePaginationStateWithQueryParams } from 'app/shared/util/entity-utils';
import { useAppDispatch, useAppSelector } from 'app/config/store';

import { deleteEntity, getEntities, reset } from './student.reducer';

export const Student = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const pageLocation = useLocation();
  const { id } = useParams<'id'>();

  const [paginationState, setPaginationState] = useState(
    overridePaginationStateWithQueryParams(getPaginationState(pageLocation, ITEMS_PER_PAGE, 'id'), pageLocation.search),
  );
  const [sorting, setSorting] = useState(false);

  const studentList = useAppSelector(state => state.student.entities);
  const loading = useAppSelector(state => state.student.loading);
  const links = useAppSelector(state => state.student.links);
  const updateSuccess = useAppSelector(state => state.student.updateSuccess);
  const [loadModal, setLoadModal] = useState(false);
  const [studentToDeleteId, setStudentToDeleteId] = useState(null);
  const handleClose = () => {
    setLoadModal(false);
  };
  const openModal = id => {
    setLoadModal(true);
    setStudentToDeleteId(id);
  };
  const confirmDelete = () => {
    if (studentToDeleteId) {
      dispatch(deleteEntity(studentToDeleteId));
      setStudentToDeleteId(null);
      handleClose();
    }
  };
  const getAllEntities = () => {
    dispatch(
      getEntities({
        page: paginationState.activePage - 1,
        size: paginationState.itemsPerPage,
        sort: `${paginationState.sort},${paginationState.order}`,
      }),
    );
  };

  const resetAll = () => {
    dispatch(reset());
    setPaginationState({
      ...paginationState,
      activePage: 1,
    });
    dispatch(getEntities({}));
  };

  useEffect(() => {
    resetAll();
  }, []);

  useEffect(() => {
    if (updateSuccess) {
      resetAll();
    }
  }, [updateSuccess]);

  useEffect(() => {
    getAllEntities();
  }, [paginationState.activePage]);

  const handleLoadMore = () => {
    if ((window as any).pageYOffset > 0) {
      setPaginationState({
        ...paginationState,
        activePage: paginationState.activePage + 1,
      });
    }
  };

  useEffect(() => {
    if (sorting) {
      getAllEntities();
      setSorting(false);
    }
  }, [sorting]);

  const sort = p => () => {
    dispatch(reset());
    setPaginationState({
      ...paginationState,
      activePage: 1,
      order: paginationState.order === ASC ? DESC : ASC,
      sort: p,
    });
    setSorting(true);
  };

  const handleSyncList = () => {
    resetAll();
  };

  const getSortIconByFieldName = (fieldName: string) => {
    const sortFieldName = paginationState.sort;
    const order = paginationState.order;
    if (sortFieldName !== fieldName) {
      return faSort;
    } else {
      return order === ASC ? faSortUp : faSortDown;
    }
  };

  return (
    <div>
      <div className="justify-centent-start">
        <h2 id="student-heading" data-cy="StudentHeading" className="text-4xl text-gray-600">
          Students
        </h2>
      </div>
      <div className="d-flex justify-content-end">
        <Button
          className="mx-2 select-none rounded-lg bg-green-500 py-3 px-6 text-center align-middle font-sans text-xs font-bold uppercase text-white shadow-md shadow-green-500/20 transition-all hover:shadow-lg hover:shadow-green-500/40 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
          onClick={handleSyncList}
          disabled={loading}
        >
          <FontAwesomeIcon icon="sync" spin={loading} /> Refresh list
        </Button>
        <Link
          to="/student/new"
          className="select-none rounded-lg bg-blue-500 py-3 px-6 text-center align-middle font-sans text-xs font-bold uppercase text-white shadow-md shadow-blue-500/20 transition-all hover:shadow-lg hover:shadow-blue-500/40 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
          id="jh-create-entity"
          data-cy="entityCreateButton"
        >
          <FontAwesomeIcon icon="plus" />
          &nbsp; Create Student
        </Link>
      </div>

      <div className="table-responsive">
        <InfiniteScroll
          dataLength={studentList ? studentList.length : 0}
          next={handleLoadMore}
          hasMore={paginationState.activePage - 1 < links.next}
          loader={<div className="loader">Loading ...</div>}
        >
          {studentList && studentList.length > 0 ? (
            <Table responsive className="mt-6">
              <thead>
                <tr className="text-gray-500">
                  <th className="hand" onClick={sort('id')}>
                    ID <FontAwesomeIcon icon={getSortIconByFieldName('id')} />
                  </th>
                  <th className="hand" onClick={sort('firstName')}>
                    First Name <FontAwesomeIcon icon={getSortIconByFieldName('firstName')} />
                  </th>
                  <th className="hand" onClick={sort('lastName')}>
                    Last Name <FontAwesomeIcon icon={getSortIconByFieldName('lastName')} />
                  </th>
                  <th className="hand" onClick={sort('contactNo')}>
                    Contact No <FontAwesomeIcon icon={getSortIconByFieldName('contactNo')} />
                  </th>
                  <th className="hand" onClick={sort('dateOfBirth')}>
                    Date Of Birth <FontAwesomeIcon icon={getSortIconByFieldName('dateOfBirth')} />
                  </th>
                  <th className="hand" onClick={sort('gender')}>
                    Gender <FontAwesomeIcon icon={getSortIconByFieldName('gender')} />
                  </th>
                  <th className="hand" onClick={sort('email')}>
                    Email <FontAwesomeIcon icon={getSortIconByFieldName('email')} />
                  </th>
                  <th className="hand text-center">Action</th>
                  <th />
                </tr>
              </thead>
              <tbody>
                {studentList.map((student, i) => (
                  <tr key={`entity-${i}`} data-cy="entityTable">
                    <td className="py-4">
                      <Button tag={Link} to={`/student/${student.id}`} color="link" size="sm">
                        {student.id}
                      </Button>
                    </td>
                    <td className="py-4">{student.firstName}</td>
                    <td className="py-4">{student.lastName}</td>
                    <td className="py-4">{student.contactNo}</td>
                    <td className="py-4">
                      {student.dateOfBirth ? <TextFormat type="date" value={student.dateOfBirth} format={APP_LOCAL_DATE_FORMAT} /> : null}
                    </td>
                    <td className="py-4">{student.gender}</td>
                    <td className="pt-4">{student.email}</td>
                    <td className="text-end">
                      <div className="btn-group flex-btn-group-container">
                        <Button
                          tag={Link}
                          to={`/student/${student.id}`}
                          className="select-none rounded-lg bg-amber-500 py-3 px-6 text-center align-middle font-sans text-xs font-bold uppercase text-white shadow-md shadow-amber-500/20 transition-all hover:shadow-lg hover:shadow-amber-500/40 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
                          data-cy="entityDetailsButton"
                        >
                          <FontAwesomeIcon icon="eye" /> <span className="d-none d-md-inline">View</span>
                        </Button>
                        <Button
                          tag={Link}
                          to={`/student/${student.id}/edit`}
                          size="sm"
                          data-cy="entityEditButton"
                          className="select-none rounded-lg bg-blue-500 py-3 px-6 text-center align-middle font-sans text-xs font-bold uppercase text-white shadow-md shadow-blue-500/20 transition-all hover:shadow-lg hover:shadow-blue-500/40 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
                        >
                          <FontAwesomeIcon icon="pencil-alt" /> <span className="d-none d-md-inline">Edit</span>
                        </Button>
                        <Button
                          onClick={() => openModal(student.id)}
                          className="select-none rounded-lg bg-red-500 py-3 px-6 text-center align-middle font-sans text-xs font-bold uppercase text-white shadow-md shadow-red-500/20 transition-all hover:shadow-lg hover:shadow-red-500/40 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
                          data-cy="entityDeleteButton"
                        >
                          <FontAwesomeIcon icon="trash" /> <span className="d-none d-md-inline">Delete</span>
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          ) : (
            !loading && <div className="alert alert-warning my-4">No Students found</div>
          )}
        </InfiniteScroll>
        <Modal isOpen={loadModal} toggle={handleClose}>
          <ModalHeader toggle={handleClose} data-cy="studentDeleteDialogHeading">
            Confirm delete operation
          </ModalHeader>
          <ModalBody id="educationclickApp.student.delete.question">Are you sure you want to delete student?</ModalBody>
          <ModalFooter>
            <Button color="secondary" onClick={handleClose}>
              <FontAwesomeIcon icon="ban" />
              &nbsp; Cancel
            </Button>
            <Button id="jhi-confirm-delete-student" data-cy="entityConfirmDeleteButton" color="danger" onClick={confirmDelete}>
              <FontAwesomeIcon icon="trash" />
              &nbsp; Delete
            </Button>
          </ModalFooter>
        </Modal>
      </div>
    </div>
  );
};

export default Student;
