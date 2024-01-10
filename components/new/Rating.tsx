const Rating = ({ value }: any) => {
  return (
    <div className="d-flex gap-2 mt-0 align-items-start">
      {["1", "2", "3", "4", "5"].map((star: any, index: any) => (
        <div key={star} className={`tw-text-4xl  ${index + 1 <= value ? "text-warning" : "text-muted"}`}>
          {index + 1 <= value ? <div>&#9733;</div> : <div>&#9734;</div>}
        </div>
      ))}
    </div>
  );
};

export default Rating;
