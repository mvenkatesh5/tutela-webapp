import { SlateEditor } from "@components/SlateEditor";
import { RenderSlateContent } from "@lib/utils";
import { useState } from "react";
import { Image } from "react-bootstrap";
import { Rating } from "react-simple-star-rating";

const PerformanceView = ({ reports }: any) => {
  const [rating, setRating] = useState<any>({});

  // Catch Rating value
  const handleRating = (id: any) => (rate: number) => {
    setRating({ id, vaue: rate });
  };
  return (
    <div className="mt-3">
      {reports.map((item: any, index: any) => (
        <div key={index} className="my-5">
          <div className="d-flex gap-3 align-items-center">
            <div className="fw-bold fs-4">{item.title}</div>
            <Rating
              onClick={handleRating(item.id)}
              initialValue={item.id === rating.id ? rating.value : 0}
              size={20}
            />
          </div>

          {item.report?.test_details?.map((element: any, elindex: any) => (
            <>
              <div className="d-flex gap-3 align-items-center my-3" key={elindex}>
                <Image src="/ScoreIcon.svg" alt="score" />
                <div className="d-flex flex-column">
                  <div className="fs-5">{element.score}</div>
                  <div className="fw-normal fs-6 text-muted">Score</div>
                </div>
              </div>
              {item?.performance?.content && (
                <div className="my-2">
                  {RenderSlateContent(item?.performance?.content) && (
                    <div>
                      <SlateEditor
                        readOnly={true}
                        initialValue={RenderSlateContent(item?.performance?.content)}
                      />
                    </div>
                  )}
                </div>
              )}
            </>
          ))}
        </div>
      ))}
    </div>
  );
};

export default PerformanceView;
