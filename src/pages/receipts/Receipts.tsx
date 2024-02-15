import { Card } from '../../components/cards/Card';
import { Loader } from '../../components/loader/Loader';
import { useHouseholdContext } from '../../hooks/useHouseholdContext';
import { formatDate } from '../../utils/formatDate';
import './Receipts.styles.scss';

const Receipts = () => {
  const { household } = useHouseholdContext();

  if (!household) return <Loader />;

  return (
    <div className="receipts--container">
      <div className="receipts--list">
        {household.receipts
          .sort((a, b) => b.date.toMillis() - a.date.toMillis())
          .map((r, i) => (
            <Card key={i}>
              <div className="receipts--card--container">
                <div className="receipts--card--left">
                  <p className="receipts--card--text">Shopped by {r.shoppedBy}</p>
                  <p className="receipts--card--text">
                    Duration: {Math.floor(r.duration / 60)}:{r.duration % 60}
                  </p>
                  <p className="receipts--card--text">Items: {r.items.length}</p>
                </div>

                <div className="receipts--card--right">
                  <p className="receipts--card--text">{formatDate(r.date)}</p>
                  <p className="receipts--card--text receipts--card--text--large">{r.price},-</p>
                </div>
              </div>
            </Card>
          ))}
      </div>
    </div>
  );
};

export { Receipts };
