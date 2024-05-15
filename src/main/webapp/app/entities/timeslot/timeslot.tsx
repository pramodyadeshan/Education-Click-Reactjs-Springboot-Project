import React, { useState, useEffect } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Button, Modal, ModalBody, ModalFooter, ModalHeader, Table } from 'reactstrap';
import { Translate, TextFormat, getPaginationState } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSort, faSortUp, faSortDown } from '@fortawesome/free-solid-svg-icons';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';
import { ASC, DESC, ITEMS_PER_PAGE, SORT } from 'app/shared/util/pagination.constants';
import { overridePaginationStateWithQueryParams } from 'app/shared/util/entity-utils';
import { useAppDispatch, useAppSelector } from 'app/config/store';

import { getEntities, reset } from './timeslot.reducer';
import { getEntity, deleteEntity } from './timeslot.reducer';

export const Timeslot = () => {
  const dispatch = useAppDispatch();

  const pageLocation = useLocation();

  const [paginationState, setPaginationState] = useState(
    overridePaginationStateWithQueryParams(getPaginationState(pageLocation, ITEMS_PER_PAGE, 'id'), pageLocation.search),
  );
  const [sorting, setSorting] = useState(false);

  const timeslotList = useAppSelector(state => state.timeslot.entities);
  const loading = useAppSelector(state => state.timeslot.loading);
  const links = useAppSelector(state => state.timeslot.links);
  const updateSuccess = useAppSelector(state => state.timeslot.updateSuccess);
  const [loadModal, setLoadModal] = useState(false);
  const [timeslotToDeleteId, setTimeslotToDeleteId] = useState(null);
  const handleClose = () => {
    setLoadModal(false);
  };
  const openModal = id => {
    setLoadModal(true);
    setTimeslotToDeleteId(id);
  };
  const confirmDelete = () => {
    if (timeslotToDeleteId) {
      dispatch(deleteEntity(timeslotToDeleteId));
      setTimeslotToDeleteId(null);
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
          Timeslot
        </h2>
      </div>
      <div className="d-flex justify-content-end">
        <Button
          className="me-2 select-none rounded-lg bg-green-500 py-3 px-6 text-center align-middle font-sans text-xs font-bold uppercase text-white shadow-md shadow-green-500/20 transition-all hover:shadow-lg hover:shadow-green-500/40 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
          onClick={handleSyncList}
          disabled={loading}
        >
          <FontAwesomeIcon icon="sync" spin={loading} /> Refresh list
        </Button>
        <Link
          to="/timeslot/new"
          className="select-none rounded-lg bg-blue-500 py-3 px-6 text-center align-middle font-sans text-xs font-bold uppercase text-white shadow-md shadow-blue-500/20 transition-all hover:shadow-lg hover:shadow-blue-500/40 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
          id="jh-create-entity"
          data-cy="entityCreateButton"
        >
          <FontAwesomeIcon icon="plus" />
          &nbsp; Create a new Timeslot
        </Link>
      </div>
      <div className="table-responsive">
        <InfiniteScroll
          dataLength={timeslotList ? timeslotList.length : 0}
          next={handleLoadMore}
          hasMore={paginationState.activePage - 1 < links.next}
          loader={<div className="loader">Loading ...</div>}
        >
          {timeslotList && timeslotList.length > 0 ? (
            <Table responsive>
              <thead>
                <tr className="text-gray-500">
                  <th className="hand" onClick={sort('id')}>
                    ID <FontAwesomeIcon icon={getSortIconByFieldName('id')} />
                  </th>
                  <th className="hand" onClick={sort('startTime')}>
                    Start Time <FontAwesomeIcon icon={getSortIconByFieldName('startTime')} />
                  </th>
                  <th className="hand" onClick={sort('endTime')}>
                    End Time <FontAwesomeIcon icon={getSortIconByFieldName('endTime')} />
                  </th>
                  <th className="hand" onClick={sort('availability')}>
                    Availability <FontAwesomeIcon icon={getSortIconByFieldName('availability')} />
                  </th>
                  <th>
                    Teacher Name <FontAwesomeIcon icon="sort" />
                  </th>
                  <th className="hand text-center">Action</th>
                  <th />
                </tr>
              </thead>
              <tbody>
                {timeslotList.map((timeslot, i) => (
                  <tr key={`entity-${i}`} data-cy="entityTable">
                    <td className="py-4">
                      <Button tag={Link} to={`/timeslot/${timeslot.id}`} color="link" size="sm">
                        {timeslot.id}
                      </Button>
                    </td>
                    <td className="py-4">
                      {timeslot.startTime ? <TextFormat type="date" value={timeslot.startTime} format={APP_DATE_FORMAT} /> : null}
                    </td>
                    <td className="py-4">
                      {timeslot.endTime ? <TextFormat type="date" value={timeslot.endTime} format={APP_DATE_FORMAT} /> : null}
                    </td>
                    <td className="py-4">{timeslot.availability ? 'true' : 'false'}</td>
                    <td className="py-4">
                      {timeslot.teacher ? <Link to={`/teacher/${timeslot.teacher.id}`}>{timeslot.teacher.id}</Link> : ''}
                    </td>
                    <td className="text-end">
                      <div className="btn-group flex-btn-group-container">
                        <Button
                          tag={Link}
                          to={`/timeslot/${timeslot.id}`}
                          className="select-none rounded-lg bg-amber-500 py-3 px-6 text-center align-middle font-sans text-xs font-bold uppercase text-white shadow-md shadow-amber-500/20 transition-all hover:shadow-lg hover:shadow-amber-500/40 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
                          data-cy="entityDetailsButton"
                        >
                          <FontAwesomeIcon icon="eye" /> <span className="d-none d-md-inline">View</span>
                        </Button>
                        <Button
                          tag={Link}
                          to={`/timeslot/${timeslot.id}/edit`}
                          className="select-none rounded-lg bg-blue-500 py-3 px-6 text-center align-middle font-sans text-xs font-bold uppercase text-white shadow-md shadow-blue-500/20 transition-all hover:shadow-lg hover:shadow-blue-500/40 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
                          data-cy="entityEditButton"
                        >
                          <FontAwesomeIcon icon="pencil-alt" /> <span className="d-none d-md-inline">Edit</span>
                        </Button>
                        <Button
                          onClick={() => openModal(timeslot.id)}
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
            !loading && <div className="alert alert-warning my-4">No Timeslots found</div>
          )}
        </InfiniteScroll>
        <Modal isOpen={loadModal} toggle={handleClose}>
          <ModalHeader toggle={handleClose} data-cy="timeslotDeleteDialogHeading">
            Confirm delete operation
          </ModalHeader>
          <ModalBody id="educationclickApp.timeslot.delete.question">Are you sure you want to delete timeslot?</ModalBody>
          <ModalFooter>
            <Button color="secondary" onClick={handleClose}>
              <FontAwesomeIcon icon="ban" />
              &nbsp; Cancel
            </Button>
            <Button id="jhi-confirm-delete-timeslot" data-cy="entityConfirmDeleteButton" color="danger" onClick={confirmDelete}>
              <FontAwesomeIcon icon="trash" />
              &nbsp; Delete
            </Button>
          </ModalFooter>
        </Modal>
      </div>
    </div>
  );
};

export default Timeslot;
