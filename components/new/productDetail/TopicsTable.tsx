const TopicsTable = ({ productDetail }:any) => {
  return (
    <div className="border rounded">
      <table className="mb-0 custom-table w-100">
        <thead className="bg-light">
          <tr>
            <th className="text-center">#</th>
            <th>Topic Name</th>
            <th>Column</th>
            <th>Column</th>
            <th>Column</th>
            <th>Column</th>
            <th>
              <div className="mb-1 p-2">...</div>
            </th>
          </tr>
        </thead>
        <tbody>
          {productDetail &&
            productDetail.length > 0 &&
            productDetail.map((data: any, index: any) => (
              <tr key={`attendanceData-key-${index}`}>
                <td className="text-center">{index + 1}</td>
                <td>{data.name}</td>
                <td>data</td>
                <td>data</td>
                <td>data</td>
                <td>data</td>
                <td></td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
};

export default TopicsTable;
