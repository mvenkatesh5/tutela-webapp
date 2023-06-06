import { FC, useState, useEffect } from "react";
// react bootstrap
import { Image } from "react-bootstrap";
// styled icons
import { CloseOutline } from "@styled-icons/evaicons-outline";
import { ArrowRightShort } from "@styled-icons/bootstrap";
import { ChevronRight, ChevronLeft } from "@styled-icons/entypo";

export const ImagePreview: FC<any> = ({ images, handleImages }) => {
  const [previewImagesIndex, setPreviewImagesIndex] = useState<number>(0);
  const handleImageIndex = (type: "decrement" | "increment") => {
    if (type === "decrement") {
      if (previewImagesIndex > 0) setPreviewImagesIndex((prevData) => prevData - 1);
    } else {
      if (previewImagesIndex < images.length - 1) setPreviewImagesIndex((prevData) => prevData + 1);
    }
  };
  useEffect(() => {
    if (images && images.length > 0) {
      setPreviewImagesIndex(0);
    }
  }, [images]);

  return (
    <div className="tw-fixed tw-top-0 tw-left-0 !tw-h-screen !tw-w-screen tw-z-[9999999] tw-bg-black tw-bg-opacity-90 tw-text-white tw-flex tw-flex-col tw-select-none">
      {/* header */}
      <div className="tw-flex-shrink-0 tw-w-full tw-p-4 tw-px-6 tw-flex tw-justify-between tw-items-center">
        <div
          className="tw-inline-flex tw-items-center tw-gap-2 tw-bg-white tw-bg-opacity-20 hover:tw-bg-opacity-30 tw-p-1 tw-px-2 tw-rounded-sm tw-text-sm tw-cursor-pointer"
          onClick={() => handleImages(null)}
        >
          <div className="tw-h-[20px] tw-w-[20px] tw-flex tw-justify-center tw-items-center tw-rotate-180">
            <ArrowRightShort />
          </div>
          <div>Image {previewImagesIndex + 1}</div>
        </div>
        <div
          className="tw-flex-shrink-0 tw-w-[40px] tw-h-[40px] tw-flex tw-justify-center tw-items-center tw-cursor-pointer tw-rounded-sm hover:tw-bg-white hover:tw-bg-opacity-20 tw-p-2"
          onClick={() => handleImages(null)}
        >
          <CloseOutline />
        </div>
      </div>
      <div className="tw-w-full tw-h-full tw-overflow-hidden">
        <Image
          src={images[previewImagesIndex]}
          alt={images[previewImagesIndex]}
          className="tw-object-center tw-object-contain tw-w-full tw-h-full"
        />
      </div>
      <div className="tw-flex-shrink-0 tw-w-full tw-p-4 tw-px-6 tw-flex tw-justify-center tw-items-center">
        <div className="tw-inline-flex tw-justify-center tw-items-center tw-bg-black tw-p-1 tw-px-2 tw-rounded-sm tw-gap-2">
          <div
            className="tw-flex-shrink-0 tw-w-[40px] tw-h-[40px] tw-flex tw-justify-center tw-items-center tw-cursor-pointer tw-rounded-sm hover:tw-bg-white hover:tw-bg-opacity-20 tw-p-2"
            onClick={() => handleImageIndex("decrement")}
          >
            <ChevronLeft />
          </div>
          <div className="tw-flex-shrink-0 tw-w-[60px] tw-h-[40px] tw-flex tw-justify-center tw-items-center tw-cursor-pointer tw-rounded-sm tw-text-sm">
            {previewImagesIndex + 1}/{images?.length || 0}
          </div>
          <div
            className="tw-flex-shrink-0 tw-w-[40px] tw-h-[40px] tw-flex tw-justify-center tw-items-center tw-cursor-pointer tw-rounded-sm hover:tw-bg-white hover:tw-bg-opacity-20 tw-p-2"
            onClick={() => handleImageIndex("increment")}
          >
            <ChevronRight />
          </div>
        </div>
      </div>
    </div>
  );
};
