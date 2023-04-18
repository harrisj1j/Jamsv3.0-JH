import { useCollectionData } from 'react-firebase-hooks/firestore';
import { db } from './firestore';

const ApproveReject = () => {
  const [approvedEntries, isloading, error] = useCollectionData(
    db.collection('journal_entries').where('status', '==', 'approved'),
    { idField: 'id' }
  );

  const [rejectedEntries, isLoading, iserror] = useCollectionData(
    db.collection('journal_entries').where('status', '==', 'rejected'),
    { idField: 'id' }
  );
  

  if (isloading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error.message}</p>;
  }

  return (
    <div>
      <h1>Approved Journal Entries</h1>
      <table>
        <thead>
          <tr>
            <th>Description</th>
            <th>Account</th>
            <th>Credit</th>
            <th>Debit</th>
          </tr>
        </thead>
        <tbody>
          {approvedEntries.map((entry) => (
            <tr key={entry.id}>
              <td>{entry.description}</td>
              <td>{entry.account}</td>
              <td>{entry.credit}</td>
              <td>{entry.debit}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <h1>Rejected Journal Entries</h1>
      <table>
        <thead>
          <tr>
            <th>Description</th>
            <th>Account</th>
            <th>Credit</th>
            <th>Debit</th>
          </tr>
        </thead>
        <tbody>
          {rejectedEntries.map((entry) => (
            <tr key={entry.id}>
              <td>{entry.description}</td>
              <td>{entry.account}</td>
              <td>{entry.credit}</td>
              <td>{entry.debit}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ApproveReject;
