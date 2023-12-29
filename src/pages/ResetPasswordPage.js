import React from 'react';
import { useParams } from 'react-router-dom';
import ResetPassword from '../features/auth/components/ResetPassword';

function ResetPasswordPage() {
  const { uid, token } = useParams();

  return (
    <div>
      <ResetPassword uid={uid} token={token} />
    </div>
  );
}

export default ResetPasswordPage;
