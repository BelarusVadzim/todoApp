import { FadeLoader } from 'react-spinners';
import style from './Spinner.module.scss';

type SpinnerProps = {
  visible?: boolean;
};

const Spinner: React.FC<SpinnerProps> = ({ visible }) => {
  const overlayStyle = visible ? style.overlay : style.overlayHidden;

  return (
    <div className={overlayStyle}>
      <FadeLoader
        className={style.spinner}
        color={'#1064ae'}
        loading
        aria-label="Loading Spinner"
        data-testid="loader"
      />
    </div>
  );
};

export default Spinner;
