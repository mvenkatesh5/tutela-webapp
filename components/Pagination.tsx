import React from "react";
// icons
import { ChevronLeft, ChevronRight } from "@styled-icons/boxicons-regular/";
// react bootstrap
import { Button } from "react-bootstrap";

const Pagination = ({ data, cursor, setCursor, count, totalPages, className }: any) => {
  // console.log("data", data);
  // console.log("cursor", cursor);
  // console.log("count", count);
  // console.log("totalPages", totalPages);

  const findPaginationMidLeft = () => {
    const _currentValue = parseInt(cursor?.split(":")[1]);

    if (_currentValue > 1) return true;
    return false;
  };

  const findPaginationMidRight = () => {
    const _totalPages = totalPages;
    const _currentValue = parseInt(cursor?.split(":")[1]);

    // if (_totalPages - _currentValue < 4) return false;
    return true;
  };

  const renderMidValues = () => {
    let midValues: any = [];

    const _totalPages = totalPages;
    const _currentValue = parseInt(cursor?.split(":")[1]);

    console.log("_totalPages", _totalPages);
    console.log("_currentValue", _currentValue);

    // validating for 1
    if (_currentValue === 0) midValues = [2, 3, 4];

    // validating for pages between 1 and total_pages - 1
    if (_currentValue > 0 && _currentValue < _totalPages - 1)
      midValues = [_currentValue - 1, _currentValue, _currentValue + 1];

    // validating for total_pages - 1
    if (_currentValue === _totalPages - 1)
      midValues = [_currentValue - 3, _currentValue - 2, _currentValue - 1];

    return midValues;
  };

  return (
    <>
      <div className={`pagination-root`}>
        <div
          className={`pagination-default-styling pagination-root-item ${
            !data?.prev_page_results && `disabled`
          } `}
          onClick={() => {
            if (data?.prev_page_results) setCursor(data?.prev_cursor);
          }}
        >
          <ChevronLeft height="20" fill="#222" />
        </div>

        <div
          className={`pagination-root-item content`}
          style={{
            position: "relative",
          }}
        >
          {totalPages &&
            totalPages > 0 &&
            [...Array(totalPages)].map((_pagination: any, _index: any) => (
              <div
                key={_index}
                className={`pagination-default-styling ${
                  parseInt(cursor?.split(":")[1]) === _index && `active`
                }`}
                style={{ flexShrink: 0 }}
                onClick={() => setCursor(`${count}:${_index}:0`)}
              >
                {_index + 1}
              </div>
            ))}

          {/* <div
            className={`pagination-default-styling ${
              parseInt(cursor?.split(":")[1]) === 0 && `active`
            }`}
            onClick={() => setCursor(`${count}:${0}:0`)}
          >
            1
          </div>

          {findPaginationMidLeft() && <div className={`pagination-default-styling`}>...</div>}

          {renderMidValues().map((_pagination: any, _index: any) => (
            <div
              key={_index}
              className={`pagination-default-styling ${
                parseInt(cursor?.split(":")[1]) === _pagination && `active`
              }`}
              onClick={() => setCursor(`${count}:${_pagination - 1}:0`)}
            >
              {_pagination}
            </div>
          ))}

          {findPaginationMidRight() && <div className={`pagination-default-styling`}>...</div>}

          <div
            className={`pagination-default-styling ${
              parseInt(cursor?.split(":")[1]) === totalPages - 1 && `active`
            }`}
            onClick={() => setCursor(`${count}:${totalPages - 1}:0`)}
          >
            {totalPages}
          </div> */}
        </div>

        <div
          className={`pagination-default-styling pagination-root-item ${
            !data?.next_page_results && `disabled`
          } `}
          onClick={() => {
            if (data?.next_page_results) setCursor(data?.next_cursor);
          }}
        >
          <ChevronRight height="20" fill="#222" />
        </div>

        {/* <div className="flex max-w-[200px] overflow-auto scrollbar-hidden">
          {Array(totalPages)
            .fill(totalPages)
            .map((_: number, index: any) => (
              <Button
                variant={
                  parseInt(cursor?.split(":")[1]) == index ? "outline-primary" : "outline-secondary"
                }
                onClick={() => setCursor(`${count}:${index}:0`)}
                key={"page-" + index + "-button"}
              >
                {index + 1}
              </Button>
            ))}
        </div> */}
      </div>
    </>
  );
};

export default Pagination;
