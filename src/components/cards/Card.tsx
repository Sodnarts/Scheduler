import { ReactNode } from 'react';
import './Card.styles.scss';

interface Props {
  children: ReactNode;
}

const Card = ({ children }: Props) => {
  return <div className="card--container">{children}</div>;
};

export { Card };

/**
 * Clicking a Card, opens "Shopping"-page in Figma.
 * "Stop Shopping"-button should be replaced with action-bar containing "Edit", "Delete" and "Receipt" or "Checkout".
 * Height of buttons should optimally be 44px;
 * Once ending shopping through Receipt/Checkout, remove shoppinglist, and save it as a receipt.
 * Anything not selected when ending, is considered not purchased.
 * Edit-button navigates to Edit/Create page. This is "ShoppingList" in Figma.
 *
 *
 * Edit/Create
 * Saves to Firebase in onBlur-calls.
 */
