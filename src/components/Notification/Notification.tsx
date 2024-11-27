import toast from 'react-hot-toast';

interface NotifyOptions {
  message: string;
  type: 'success' | 'error';
}

export const Notify = ({ message, type }: NotifyOptions) => {
  if (type === 'success') {
    toast.success(message);
  } else if (type === 'error') {
    toast.error(message);
  }
};
