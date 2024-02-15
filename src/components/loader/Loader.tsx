import "./Loader.styles.scss";

interface Props {
  className?: string;
  classNameSpinner?: string;
}

const Loader = ({ className, classNameSpinner }: Props) => {
  return (
    <div className={`loader--container ${className && className}`}>
      <div className={`loader--spinner ${classNameSpinner && classNameSpinner}`} />
    </div>
  );
};

export { Loader };
