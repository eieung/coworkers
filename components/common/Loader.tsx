import { PropagateLoader } from 'react-spinners';

const Loader = ({ className }: { className?: string }) => {
  return <PropagateLoader color="var(--brand-primary)" className={className} />;
};

export default Loader;
