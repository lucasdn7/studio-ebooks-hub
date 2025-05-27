
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const MemberArea = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Redirect to the new member dashboard
    navigate('/member-dashboard', { replace: true });
  }, [navigate]);

  return null;
};

export default MemberArea;
