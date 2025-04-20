import Link from 'next/link';

const NotFound = () => (
  <div>
    An error has occurred, please try again later or{' '}
    <Link href="/">go to home page</Link>
  </div>
);

export default NotFound;
