import React from 'react';
import ErrorFallback from '../components/ErrorFallback';

const ErrorPage = () => {
  return (
    <ErrorFallback
      title="CÓ BIẾN RỒI"
      message="Hãy thử refresh lại"
      image="/images/default-blue.png"
    />
  );
};

export default ErrorPage;
