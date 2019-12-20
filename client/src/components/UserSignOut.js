import React from 'react';
import { Redirect } from 'react-router-dom';

export default ({ context }) => {
  //call the signOut()
  context.actions.signOut();
  return (
    <Redirect to="/" />
  );
}