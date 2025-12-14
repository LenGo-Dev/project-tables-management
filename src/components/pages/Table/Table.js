import {useParams} from 'react-router-dom';
import {useSelector, useDispatch} from 'react-redux';
import {fetchTables, getAllTables, getTableById, updateTableRequest} from '../../../redux/tablesRedux';
import {Form, Row, Col, Button} from 'react-bootstrap';
import {useEffect, useState} from 'react';

const Table = () => {
  const {tableId} = useParams();
  const dispatch = useDispatch();
  const table = useSelector(state => getTableById(state, tableId));

  const [status, setStatus] = useState(table?.status ?? '');
  const [people, setPeople] = useState(table?.peopleAmount ?? 0);
  const [maxPeople, setMaxPeople] = useState(table?.maxPeopleAmount ?? 0);
  const [bill, setBill] = useState(table?.bill ?? 0);

  const tables = useSelector(getAllTables);

  useEffect(() => {
    dispatch(fetchTables());
  }, [dispatch]);

  useEffect(() => {
    if (table) {
      setStatus(table.status);
      setPeople(table.peopleAmount);
      setMaxPeople(table.maxPeopleAmount);
      setBill(table.bill);
    }
  }, [table]);

  const handleSubmit = e => {
    e.preventDefault();
    e.stopPropagation();

    dispatch(updateTableRequest({
      id: table.id,
      status,
      peopleAmount: Number(people),
      maxPeopleAmount: Number(maxPeople),
      bill: Number(bill)
    }));

    return false;
  };

  if (tables.length === 0 || !table) {
    return (<div>loading...</div>);
  }

  return (
    <>
      <h1 className="mb-4">Table {table?.id}</h1>

      <Form>
        {/* Status */}
        <Form.Group className="mb-3 row">
          <Row>
            <Col xs={1}>
              <Form.Label className="fw-bold align-middle mb-0">Status:</Form.Label>
            </Col>

            <Col xs={4}>
              <Form.Select value={status} onChange={e => setStatus(e.target.value)}>
                <option>Free</option>
                <option>Busy</option>
                <option>Cleaning</option>
                <option>Reserved</option>
              </Form.Select>
            </Col>
          </Row>
        </Form.Group>

        {/* People */}
        <Form.Group className="mb-3">
          <Row>
            <Col xs={1}>
              <Form.Label className="fw-bold align-middle mb-0">People:</Form.Label>
            </Col>
            <Col xs={1}>
              <Form.Control
                type="number"
                value={people}
                onChange={e => setPeople(e.target.value)}
              />
            </Col>
            /
            <Col xs={1}>
              <Form.Control
                type="number"
                value={maxPeople}
                onChange={e => setMaxPeople(e.target.value)}
              />
            </Col>
          </Row>
        </Form.Group>

        {/* Bill */}
        <Form.Group className="mb-3">
          <Row>
            <Col xs={1}>
              <Form.Label className="fw-bold align-middle mb-0">Bill:</Form.Label>
            </Col>
            <Col xs={1}>
              <div className="d-inline-flex gap-3">
              <p className="mb-0 align-content-center">$</p>
              <Form.Control
                type="number"
                value={bill}
                onChange={e => setBill(e.target.value)}
              />
              </div>
            </Col>
          </Row>
        </Form.Group>

        <Button type="button" onClick={handleSubmit}>Update</Button>
      </Form>
    </>
  );
};

export default Table;
