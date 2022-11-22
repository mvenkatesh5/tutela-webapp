import React from "react";
// icons
import { ChevronLeft, ChevronRight } from "@styled-icons/boxicons-regular/";
// react bootstrap
import { Button } from "react-bootstrap";

const Pagination = ({ data, cursor, setCursor, count, totalPages, className }: any) => {
  return (
    <>
      <div className={`d-flex ${className}`}>
        <Button
          variant="secondary"
          disabled={parseInt(cursor?.split(":")[1]) <= 0}
          onClick={() => setCursor(data?.prev_cursor)}
        >
          <ChevronLeft height="12" width="12" fill="#222" />
        </Button>

        <div className="flex max-w-[200px] overflow-auto scrollbar-hidden">
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
        </div>
        <Button
          variant="secondary"
          disabled={!data?.next_page_results}
          onClick={() => setCursor(data?.next_cursor)}
        >
          <ChevronRight height="15" width="15" fill="#222" />
        </Button>
      </div>
    </>
  );
};

export default Pagination;
