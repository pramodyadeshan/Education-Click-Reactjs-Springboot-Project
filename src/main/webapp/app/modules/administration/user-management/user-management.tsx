import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Button, Table, Badge, ModalHeader, ModalBody, ModalFooter, Modal } from 'reactstrap';
import { TextFormat, JhiPagination, JhiItemCount, getPaginationState } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSort, faSortUp, faSortDown } from '@fortawesome/free-solid-svg-icons';

import { APP_DATE_FORMAT } from 'app/config/constants';
import { ASC, DESC, ITEMS_PER_PAGE, SORT } from 'app/shared/util/pagination.constants';
import { overridePaginationStateWithQueryParams } from 'app/shared/util/entity-utils';
import { deleteUser, getUsersAsAdmin, updateUser } from './user-management.reducer';
import { useAppDispatch, useAppSelector } from 'app/config/store';

export const UserManagement = () => {
  const dispatch = useAppDispatch();

  const pageLocation = useLocation();
  const navigate = useNavigate();

  const [pagination, setPagination] = useState(
    overridePaginationStateWithQueryParams(getPaginationState(pageLocation, ITEMS_PER_PAGE, 'id'), pageLocation.search),
  );
  const user = useAppSelector(state => state.userManagement.user);
  const [loadModal, setLoadModal] = useState(false);
  const [userToDeleteId, setUserToDeleteId] = useState(null);
  const handleClose = () => {
    setLoadModal(false);
  };
  const openModal = id => {
    setLoadModal(true);
    setUserToDeleteId(id);
  };
  const confirmDelete = () => {
    if (userToDeleteId) {
      dispatch(deleteUser(userToDeleteId));
      setUserToDeleteId(null);
      handleClose();
    }
  };
  const getUsersFromProps = () => {
    dispatch(
      getUsersAsAdmin({
        page: pagination.activePage - 1,
        size: pagination.itemsPerPage,
        sort: `${pagination.sort},${pagination.order}`,
      }),
    );
    const endURL = `?page=${pagination.activePage}&sort=${pagination.sort},${pagination.order}`;
    if (pageLocation.search !== endURL) {
      navigate(`${pageLocation.pathname}${endURL}`);
    }
  };

  useEffect(() => {
    getUsersFromProps();
  }, [pagination.activePage, pagination.order, pagination.sort]);

  useEffect(() => {
    const params = new URLSearchParams(pageLocation.search);
    const page = params.get('page');
    const sortParam = params.get(SORT);
    if (page && sortParam) {
      const sortSplit = sortParam.split(',');
      setPagination({
        ...pagination,
        activePage: +page,
        sort: sortSplit[0],
        order: sortSplit[1],
      });
    }
  }, [pageLocation.search]);

  const sort = p => () =>
    setPagination({
      ...pagination,
      order: pagination.order === ASC ? DESC : ASC,
      sort: p,
    });

  const handlePagination = currentPage =>
    setPagination({
      ...pagination,
      activePage: currentPage,
    });

  const handleSyncList = () => {
    getUsersFromProps();
  };

  const toggleActive = user => () => {
    dispatch(
      updateUser({
        ...user,
        activated: !user.activated,
      }),
    );
  };

  const account = useAppSelector(state => state.authentication.account);
  const users = useAppSelector(state => state.userManagement.users);
  const totalItems = useAppSelector(state => state.userManagement.totalItems);
  const loading = useAppSelector(state => state.userManagement.loading);
  const getSortIconByFieldName = (fieldName: string) => {
    const sortFieldName = pagination.sort;
    const order = pagination.order;
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
          User Management
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
          to="new"
          className="select-none rounded-lg bg-blue-500 py-3 px-6 text-center align-middle font-sans text-xs font-bold uppercase text-white shadow-md shadow-blue-500/20 transition-all hover:shadow-lg hover:shadow-blue-500/40 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
        >
          <FontAwesomeIcon icon="plus" /> Create a new user
        </Link>
      </div>
      <Table responsive striped>
        <thead>
          <tr className="text-gray-500">
            <th className="hand" onClick={sort('id')}>
              ID <FontAwesomeIcon icon={getSortIconByFieldName('id')} />
            </th>
            <th className="hand" onClick={sort('login')}>
              Login <FontAwesomeIcon icon={getSortIconByFieldName('login')} />
            </th>
            <th className="hand" onClick={sort('email')}>
              Email <FontAwesomeIcon icon={getSortIconByFieldName('email')} />
            </th>
            <th />
            <th>Profiles</th>
            <th className="hand" onClick={sort('createdDate')}>
              Created date <FontAwesomeIcon icon={getSortIconByFieldName('createdDate')} />
            </th>
            <th className="hand" onClick={sort('lastModifiedBy')}>
              Modified by <FontAwesomeIcon icon={getSortIconByFieldName('lastModifiedBy')} />
            </th>
            <th id="modified-date-sort" className="hand" onClick={sort('lastModifiedDate')}>
              Modified date <FontAwesomeIcon icon={getSortIconByFieldName('lastModifiedDate')} />
            </th>
            <th className="hand text-center">Action</th>
            <th />
            <th />
          </tr>
        </thead>
        <tbody>
          {users.map((user, i) => (
            <tr id={user.login} key={`user-${i}`}>
              <td className="py-4">
                <Button tag={Link} to={user.login} color="link" size="sm">
                  {user.id}
                </Button>
              </td>
              <td className="py-4">{user.login}</td>
              <td className="py-4">{user.email}</td>
              <td className="py-4">
                {user.activated ? (
                  <Button color="success" onClick={toggleActive(user)}>
                    Activated
                  </Button>
                ) : (
                  <Button color="danger" onClick={toggleActive(user)}>
                    Deactivated
                  </Button>
                )}
              </td>
              <td className="py-4">
                {user.authorities
                  ? user.authorities.map((authority, j) => (
                      <div key={`user-auth-${i}-${j}`}>
                        <Badge color="info">{authority}</Badge>
                      </div>
                    ))
                  : null}
              </td>
              <td className="py-4">
                {user.createdDate ? <TextFormat value={user.createdDate} type="date" format={APP_DATE_FORMAT} blankOnInvalid /> : null}
              </td>
              <td className="py-4">{user.lastModifiedBy}</td>
              <td className="py-4">
                {user.lastModifiedDate ? (
                  <TextFormat value={user.lastModifiedDate} type="date" format={APP_DATE_FORMAT} blankOnInvalid />
                ) : null}
              </td>
              <td className="text-end">
                <div className="btn-group flex-btn-group-container">
                  <Button
                    tag={Link}
                    to={user.login}
                    className="select-none rounded-lg bg-amber-500 py-3 px-6 text-center align-middle font-sans text-xs font-bold uppercase text-white shadow-md shadow-amber-500/20 transition-all hover:shadow-lg hover:shadow-amber-500/40 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
                  >
                    <FontAwesomeIcon icon="eye" /> <span className="d-none d-md-inline">View</span>
                  </Button>
                  <Button
                    tag={Link}
                    to={`${user.login}/edit`}
                    className="select-none rounded-lg bg-blue-500 py-3 px-6 text-center align-middle font-sans text-xs font-bold uppercase text-white shadow-md shadow-blue-500/20 transition-all hover:shadow-lg hover:shadow-blue-500/40 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
                  >
                    <FontAwesomeIcon icon="pencil-alt" /> <span className="d-none d-md-inline">Edit</span>
                  </Button>
                  <Button
                    onClick={() => openModal(user.login)}
                    className="select-none rounded-lg bg-red-500 py-3 px-6 text-center align-middle font-sans text-xs font-bold uppercase text-white shadow-md shadow-red-500/20 transition-all hover:shadow-lg hover:shadow-red-500/40 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
                    disabled={account.login === user.login}
                  >
                    <FontAwesomeIcon icon="trash" /> <span className="d-none d-md-inline">Delete</span>
                  </Button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
      <Modal isOpen={loadModal} toggle={handleClose}>
        <ModalHeader toggle={handleClose}>Confirm delete operation</ModalHeader>
        <ModalBody>Are you sure you want to delete user?</ModalBody>
        <ModalFooter>
          <Button color="secondary" onClick={handleClose}>
            <FontAwesomeIcon icon="ban" />
            &nbsp; Cancel
          </Button>
          <Button color="danger" onClick={confirmDelete}>
            <FontAwesomeIcon icon="trash" />
            &nbsp; Delete
          </Button>
        </ModalFooter>
      </Modal>
      {totalItems ? (
        <div className={users?.length > 0 ? '' : 'd-none'}>
          <div className="justify-content-center d-flex">
            <JhiItemCount page={pagination.activePage} total={totalItems} itemsPerPage={pagination.itemsPerPage} />
          </div>
          <div className="justify-content-center d-flex">
            <JhiPagination
              activePage={pagination.activePage}
              onSelect={handlePagination}
              maxButtons={5}
              itemsPerPage={pagination.itemsPerPage}
              totalItems={totalItems}
            />
          </div>
        </div>
      ) : (
        ''
      )}
    </div>
  );
};

export default UserManagement;
