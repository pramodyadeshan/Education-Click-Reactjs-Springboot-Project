import React from 'react';
import { DropdownItem } from 'reactstrap';
import { NavLink as Link } from 'react-router-dom';

export interface IMenuItem {
  children: React.ReactNode;
  to: string;
  id?: string;
  'data-cy'?: string;
}

const MenuItem = (props: IMenuItem) => {
  const { to, id, children } = props;

  return (
    <DropdownItem tag={Link} to={to} id={id} data-cy={props['data-cy']} className="d-flex align-items-center text-boxdark mt-2 px-2">
      {children}
    </DropdownItem>
  );
};

export default MenuItem;
