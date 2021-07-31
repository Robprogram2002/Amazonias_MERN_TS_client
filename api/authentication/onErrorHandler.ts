import { toast } from 'react-toastify';

const onErrorHandler = (err: any) => {
  if (err.response.data.status === 500) {
    toast.error('Upps ... Somehting went wrong please try again');
  } else {
    toast.error(err.response.data.message);
    console.log(err.response.data);
  }
};

export default onErrorHandler;
