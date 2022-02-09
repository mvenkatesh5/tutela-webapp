import React from "react";
// Next import
import Link from "next/link";
// react bootstrap
import { Image } from "react-bootstrap";
// icon
import { Download } from "@styled-icons/bootstrap/Download";
import { Close } from "@styled-icons/evaicons-solid/Close";
import { ImageFill } from "@styled-icons/bootstrap/ImageFill";
import { DocumentAttach } from "@styled-icons/ionicons-sharp/DocumentAttach";
// DropZone
import Dropzone from "react-dropzone";

const ImageUploader = ({ data, handleData, edit = true }: any) => {
  const [files, setFiles] = React.useState<any>([]);
  const handleFiles = (index: any) => {
    const newFiles = [...files];
    newFiles.splice(index, 1);
    setFiles(newFiles);
    handleData("files", newFiles);
  };
  React.useEffect(() => {
    if (data && data.length > 0) {
      setFiles(data);
    }
  }, [data]);

  const [uploadFiles, setUploadFiles] = React.useState<any>([]);
  const handleUploadFiles = (files: any) => {
    if (uploadFiles.length > 0) {
      let uploadedFiles = [...uploadFiles];
      files.map((file: any) => {
        uploadedFiles.push(file);
      });
      setUploadFiles(uploadedFiles);
      handleData("attachments", uploadedFiles);
    } else {
      setUploadFiles(files);
      handleData("attachments", files);
    }
  };
  const handleRemoveFile = (index: any) => {
    setUploadFiles(uploadFiles.filter((file: any, i: any) => i !== index));
  };

  const downloadFile = (url: any) => {
    fetch(url)
      .then((response: any) => response.blob())
      .then((blob) => {
        if (blob) {
          const anchorElement = document.createElement("a");
          anchorElement.href = URL.createObjectURL(blob);
          anchorElement.download = getFileName(url);
          anchorElement.click();
        }
      })
      .catch((error) => {
        alert("Failed to fetch the content");
        console.log(error);
      });
  };

  const getFileName = (url: any) => {
    let name = url.split("/");
    name = name[name.length - 1];
    return name;
  };

  return (
    <div>
      <div className="attachment-wrapper">
        <div className="d-flex flex-wrap gap-4 attachment-wrapper">
          {files &&
            files.length > 0 &&
            files.map((file: any, fileIndex: any) => (
              <>
                {file.attributes?.type.includes("application") ? (
                  <div className="border px-2 py-1 d-flex gap-2 rounded attachment">
                    <div className="relative">
                      {/* {file.attributes?.type.includes("application") ? ( */}
                      <DocumentAttach width="20px" />
                      {/* ) : (
                        <ImageFill width="20px" />
                      )} */}
                    </div>

                    <div className="">
                      <Link href={file.asset}>
                        <a target={"_blank"}>{getFileName(file.asset)}</a>
                      </Link>
                    </div>

                    {edit && (
                      <button onClick={() => handleFiles(fileIndex)} className="attachment-button">
                        <Close width="16px" />
                      </button>
                    )}

                    <div className="attachment-button" onClick={() => downloadFile(file.asset)}>
                      <Download width="16px" />
                    </div>
                  </div>
                ) : (
                  <div className="border p-2 pt-4 image-wrapper">
                    <div className="buttons-wrapper px-2 d-flex gap-1">
                      <div className="attachment-button" onClick={() => downloadFile(file.asset)}>
                        <Download width="16px" />
                      </div>
                      {edit && (
                        <button
                          onClick={() => handleFiles(fileIndex)}
                          className="attachment-button p-0"
                        >
                          <Close width="16px" />
                        </button>
                      )}
                    </div>
                    <Link href={file.asset}>
                      <a target={"_blank"}>
                        <Image src={file.asset} alt="" className="image" />
                      </a>
                    </Link>
                  </div>
                )}
              </>
            ))}

          {uploadFiles &&
            uploadFiles.length > 0 &&
            uploadFiles.map((file: any, fileIndex: any) => (
              <>
                <div className="border px-2 py-1 d-flex gap-2 rounded">
                  {file.type.includes("application") ? (
                    <DocumentAttach width="20px" />
                  ) : (
                    <ImageFill width="20px" />
                  )}
                  <div className="w-full">{getFileName(file.name)}</div>

                  {edit && (
                    <button
                      onClick={() => handleRemoveFile(fileIndex)}
                      className="attachment-button p-0.5"
                    >
                      <Close width="20px" />
                    </button>
                  )}
                </div>
              </>
            ))}
        </div>
      </div>

      {edit && (
        <Dropzone
          multiple={true}
          accept="image/*,.pdf,.doc,.docx"
          onDrop={(files) => {
            // uploadFileToS3(files[0]);
            handleUploadFiles(files);
          }}
        >
          {({ getRootProps, getInputProps }) => (
            <div className="attachment-uploader-wrapper">
              <div className="mt-3">
                <div {...getRootProps({})} className="py-4 dropzone">
                  <input {...getInputProps()} />
                  <strong className="m-auto">Drop your Attachments here</strong>
                  <div className="m-auto">
                    PDF, DOCX, DOC, JPEG, JPG, PNG & GIF files are allowed
                  </div>
                  <div className="m-auto pt-2">Browse photos</div>
                </div>
              </div>
            </div>
          )}
        </Dropzone>
      )}
    </div>
  );
};

export default ImageUploader;
