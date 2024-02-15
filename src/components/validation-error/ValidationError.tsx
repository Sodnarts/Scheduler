import "./ValidationError.styles.scss";

interface Props {
  errorMessage: string;
}

const ValidationError = ({ errorMessage }: Props) => {
  return (
    <div className="error--container">
      <p className="error--message">{errorMessage}</p>
    </div>
  );
};

export { ValidationError };
