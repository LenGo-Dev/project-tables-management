import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchTables, getAllTables } from '../../../redux/tablesRedux';
import { NavLink } from 'react-router-dom';
import { Button } from 'react-bootstrap';

const Home = () => {
  const dispatch = useDispatch();
  const tables = useSelector(getAllTables);

  useEffect(() => {
    dispatch(fetchTables());
  }, [dispatch]);

  return (
    <>
      <h1>All tables</h1>

      {tables.map(table => (
        <div key={table.id} className="border-bottom mt-4 mb-4 rounded px-3 d-flex justify-content-between align-items-center">
          <h4>Table {table.id} <small className="ml-2"><b>Status:</b> {table.status}</small></h4>
          <Button
            as={NavLink}
            to={`/table/${table.id}`}
            className="mb-3"
          >
            Show more
          </Button>
        </div>
      ))}
    </>
  );
};

export default Home;
