import { PropagateLoader, ClipLoader } from 'react-spinners';

type LoaderProps = {
  className?: string;
  size?: number;
  type?: 'propagate' | 'clip';
  color?: string;
};

const Loader = ({
  className,
  size,
  type = 'propagate',
  color = 'var(--brand-primary)',
}: LoaderProps) => {
  return (
    <>
      {type === 'propagate' ? (
        <PropagateLoader color={color} size={size} className={className} />
      ) : (
        <ClipLoader color={color} size={size} className={className} />
      )}
    </>
  );
};

export default Loader;
