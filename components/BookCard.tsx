// react bootstrap
import { Image } from "react-bootstrap";
const BookCard = (props: any) => {
  return (
    <>
      <div className="book-card-view">
        <div className="book-container">
          <div className="book-image">
            <Image
              src="https://www.tutelaprep.com/assets/images/logo-tutela.png"
              className="image"
              alt=""
            />
          </div>
          <div>
            <div className="book-title">{props.data.title}</div>
            <div className="book-description">{props.data.description}</div>
          </div>
        </div>
        <div className="book-bump"></div>
      </div>
    </>
  );
};
export default BookCard;
