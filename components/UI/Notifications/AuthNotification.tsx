import { NextRouter } from 'next/router';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

const MySwal = withReactContent(Swal);

const fireAuthNotification = (router: NextRouter) => {
  MySwal.fire({
    title: 'Authentication',
    text: 'You need to be authenticated to complete this action',
    imageUrl:
      'https://thumbs.dreamstime.com/z/default-avatar-profile-icon-vector-social-media-user-portrait-176256935.jpg',
    imageWidth: 400,
    imageHeight: 200,
    showCancelButton: true,
    cancelButtonColor: '#d33',
    confirmButtonText: 'Go to login',
  }).then((result) => {
    if (result.isConfirmed) {
      router.push('/auth/login');
    }
  });
};

export default fireAuthNotification;
