import React from "react";
// next imports
import Link from "next/link";
import { useRouter } from "next/router";
import dynamic from "next/dynamic";
// react bootstrap
import { Image, Button, Modal, Form } from "react-bootstrap";
// material icons
import { LinkAlt } from "@styled-icons/boxicons-regular";
import { Users } from "@styled-icons/fa-solid";
import { User } from "@styled-icons/boxicons-regular";
import { Video } from "@styled-icons/boxicons-regular/Video";
import { HelpWithCircle } from "@styled-icons/entypo/HelpWithCircle";
// swr
import useSWR, { mutate } from "swr";
// components
import ZoomSessions from "@components/zoomsessions";
import IconRow from "@components/iconRow";
const ShakaPlayer = dynamic(() => import("@components/ShakaPlayer"), {
  ssr: false,
});
// api routes
import { SESSION_ASSET_WITH_SESSION_ID_ENDPOINT } from "@constants/routes";
// api services
import { APIFetcher } from "@lib/services";
import {
  SessionAssetCreate,
  SessionAssetEdit,
  ZoomRecordingsEndpoint,
  ZoomRecordingsGoEndpoint,
} from "@lib/services/sessionservice";
// cookie
import { getAuthenticationToken } from "@lib/cookie";
// global imports
import { datePreview } from "@constants/global";
// hoc
import withGlobalAuth from "@lib/hoc/withGlobalAuth";

const SessionDetailView = () => {
  const router = useRouter();
  const session_id: any = router.query.session_id;

  const initialModalData = {
    id: null,
    title: "",
    url: "",
    kind: "RECORDING",
    thumbnail: "",
  };

  const [userRole, setUserRole] = React.useState<any>();
  const [studentImages, setStudentImages] = React.useState<any>();
  const [teacherImages, setTeacherImages] = React.useState<any>();

  const [currentVideoRenderUrl, setCurrentVideoRenderUrl] = React.useState<any>();
  const handleCurrentVideoRenderUrl = (value: any) => {
    setCurrentVideoRenderUrl(value);
  };

  const [buttonLoader, setButtonLoader] = React.useState<boolean>(false);
  const [modalData, setModalData] = React.useState<any>({});
  const [modal, setModal] = React.useState(false);

  const closeModal = () => {
    setModal(false);
    setModalData({});
  };
  const openModal = (data: any) => {
    setModal(true);
    setModalData(data);
  };
  const handleModalData = (key: any, value: any) => {
    setModalData({ ...modalData, [key]: value });
  };

  const submitHandleData = (e: any) => {
    e.preventDefault();
    setButtonLoader(true);
    if (modalData && modalData.id === null) {
      const payload = {
        title: modalData.title,
        url: modalData.url,
        kind: modalData.kind,
        thumbnail: modalData.thumbnail,
        session: session_id,
      };
      SessionAssetCreate(payload)
        .then((response) => {
          mutate([SESSION_ASSET_WITH_SESSION_ID_ENDPOINT(session_id), session_id], false);
          closeModal();
          setButtonLoader(false);
        })
        .catch((error) => {
          console.log(error);
          setButtonLoader(false);
        });
    } else {
      const payload = {
        id: modalData.id,
        title: modalData.title,
        url: modalData.url,
        thumbnail: modalData.thumbnail,
      };
      SessionAssetEdit(payload)
        .then((response) => {
          mutate([SESSION_ASSET_WITH_SESSION_ID_ENDPOINT(session_id), session_id], false);
          closeModal();
          setButtonLoader(false);
        })
        .catch((error) => {
          console.log(error);
          setButtonLoader(false);
        });
    }
  };

  // zoom fetching
  const [fetchLoader, setFetchLoader] = React.useState<boolean>(false);
  const fetchZoomRecordings = () => {
    const payload = {
      session_id: session_id,
    };
    setFetchLoader(true);
    ZoomRecordingsEndpoint(payload)
      .then((response) => {
        if (response && response.message === "NO_NEW_FILES") {
          alert("All recordings processed.");
          setFetchLoader(false);
        } else if (response.dl_server) {
          uploadZoomRecordings(response.dl_server);
        } else {
          alert("Recordings not ready, please try again after sometime.");
          setFetchLoader(false);
        }
      })
      .catch((error) => {
        setFetchLoader(false);
      });
  };
  const uploadZoomRecordings = (payload: any) => {
    ZoomRecordingsGoEndpoint(payload)
      .then((response) => {
        setFetchLoader(false);
        alert("Recording transfer initiated. Please check after sometime.");
      })
      .catch((error) => {
        if (error.status === 403) alert("No recording files found.");
        setFetchLoader(false);
      });
  };

  const { data: sessionDetail, error: sessionDetailError } = useSWR(
    session_id ? [SESSION_ASSET_WITH_SESSION_ID_ENDPOINT(session_id), session_id] : null,
    (url) => APIFetcher(url),
    { refreshInterval: 0 }
  );

  const [videoAssets, setVideoAssets] = React.useState<any>();
  React.useEffect(() => {
    if (sessionDetail && sessionDetail.session_users) {
      let learners: any = [];
      let teachers: any = [];
      sessionDetail.session_users.map((data: any) => {
        if (data.as_role === 0) {
          learners.push({
            user_id: data.user.id,
            id: data.id,
            coins: data.coins,
            rating: data.rating,
            going: data.going,
            name: data.user.first_name,
            icon: "/bird.svg",
          });
        } else {
          teachers.push({
            user_id: data.user.id,
            id: data.id,
            coins: data.coins,
            rating: data.rating,
            going: data.going,
            name: data.user.first_name,
            icon: "/bird.svg",
          });
        }
      });
      setStudentImages(learners);
      setTeacherImages(teachers);
    }
    let assets: any = [];
    if (sessionDetail && sessionDetail.session_assets && sessionDetail.session_assets.length > 0) {
      sessionDetail.session_assets.map((data: any) => {
        const payload = {
          id: data.id,
          title: data.title,
          thumbnail: data.thumbnail,
          kind: data.kind,
          url: data.url,
          created: data.created,
          updated: data.updated,
        };
        console.log("payload", payload);
        assets.push(payload);
      });
    }
    if (
      sessionDetail &&
      sessionDetail.recording_files &&
      sessionDetail.recording_files.data &&
      sessionDetail.recording_files.data.length > 0
    ) {
      sessionDetail.recording_files.data.map((data: any) => {
        console.log("data", data);
        const payload = {
          id: data.uuid,
          title: "Zoom recording",
          thumbnail: data.thumbnail,
          kind: data.medium,
          url: data.recording_link,
          created: null,
          updated: null,
        };
        assets.push(payload);
      });
    }
    if (assets && assets.length > 0) {
      setVideoAssets(assets);
    }
  }, [sessionDetail]);

  React.useEffect(() => {
    if (getAuthenticationToken()) {
      let details: any = getAuthenticationToken();
      details = details ? JSON.parse(details) : null;
      if (details) {
        // setTokenDetails(details);
        if (details.info.role === 2) setUserRole("admin");
        else if (details.info.role === 1) setUserRole("teacher");
        else setUserRole("student");
      }
    }
  }, []);

  const crispOpen = () => {
    if (window) {
      window.$crisp.push(["do", "chat:show"]);
      window.$crisp.push(["do", "chat:open"]);
      window.$crisp.push(["on", "chat:closed", crispClose]);
    }
  };
  const crispClose = () => {
    if (window) {
      window.$crisp.push(["do", "chat:hide"]);
    }
  };

  return (
    <div>
      <div className="video-wrapper">
        <div className="header-wrapper">
          <Link href="/calendar">
            <a>
              <Image src="/logo.svg" alt="" />
            </a>
          </Link>
          <div className="chat-icon" onClick={crispOpen}>
            <HelpWithCircle />
          </div>
        </div>
        {!sessionDetail && !sessionDetailError ? (
          <div className="text-center text-secondary m-5">Loading...</div>
        ) : (
          <>
            {sessionDetail && (
              <div className="content-wrapper">
                <div className="left-wrapper">
                  <div className="session-title-container">
                    <div className="icon">
                      <Image alt="" className="img-fluid rounded" src="/bird.svg" />
                    </div>
                    <div className="content">
                      <div className="title">{sessionDetail.title}</div>
                      <div className="description">{sessionDetail.description}</div>
                    </div>
                  </div>
                  <div className="video-primary-description">
                    <div>Starts At: {datePreview(sessionDetail.start_datetime)}</div>
                    <div>Ends At: {datePreview(sessionDetail.end_datetime)}</div>
                  </div>

                  <div className="video-section-detail">
                    <div className="heading">
                      <div className="icon">
                        <Users className="text-muted" />
                      </div>
                      <div className="content">Students</div>
                    </div>
                    <div className="description">
                      {studentImages && studentImages.length > 0 && (
                        <IconRow
                          data={studentImages}
                          session={sessionDetail}
                          user_role={userRole}
                          role="user"
                        />
                      )}
                    </div>
                  </div>

                  <div className="video-section-detail">
                    <div className="heading">
                      <div className="icon">
                        <User className="text-muted" />
                      </div>
                      <div className="content">Teachers</div>
                    </div>
                    <div className="description">
                      {teacherImages && teacherImages.length > 0 && (
                        <IconRow
                          data={teacherImages}
                          sessionDetail={sessionDetail}
                          user_role={userRole}
                          role="teacher"
                        />
                      )}
                    </div>
                  </div>

                  {sessionDetail.recording_link && (
                    <div className="video-section-detail">
                      <div className="heading">
                        <div className="icon">
                          <LinkAlt className="text-muted" />
                        </div>
                        <div className="content">Zoom Recording</div>
                      </div>
                      <div className="description">
                        {sessionDetail.recording_link ? (
                          <a
                            href={sessionDetail.recording_link}
                            target="_blank"
                            className="description"
                            rel="noreferrer"
                          >
                            {sessionDetail.recording_link}
                          </a>
                        ) : (
                          <div className="description">No recording is available.</div>
                        )}
                      </div>
                    </div>
                  )}

                  <div className="video-section-detail">
                    <div className="heading">
                      <div className="icon">
                        <Video className="text-muted" />
                      </div>
                      <div className="content">Zoom Session</div>
                    </div>
                    <div className="description">
                      {userRole && (
                        <ZoomSessions
                          data={sessionDetail}
                          role={userRole ? userRole : null}
                          sessionUsers={studentImages}
                        />
                      )}
                    </div>
                  </div>
                </div>
                <div className="middle-wrapper">
                  <div className="middle-top-wrapper">
                    {currentVideoRenderUrl && (
                      <div className="video-container">
                        <div className="iframe-container">
                          {currentVideoRenderUrl.kind === "ZOOM_CLOUD" ? (
                            <ShakaPlayer
                              src={currentVideoRenderUrl.url}
                              config={null}
                              chromeLess={null}
                              className={"h-100"}
                              subtitle={null}
                            />
                          ) : (
                            <iframe
                              src={currentVideoRenderUrl.url}
                              loading="lazy"
                              allow="accelerometer; gyroscope; autoplay; encrypted-media; picture-in-picture;"
                              allowFullScreen={true}
                            ></iframe>
                          )}
                        </div>
                        <div className="video-heading">
                          <div className="title">{currentVideoRenderUrl.title}</div>
                          <div className="kind">{currentVideoRenderUrl.kind}</div>
                        </div>
                        {/* <div className="video-description">Video description</div> */}
                      </div>
                    )}
                  </div>

                  <div className="middle-bottom-wrapper">
                    <div className="d-flex align-items-center gap-3">
                      <div>
                        <h5 className="m-0 p-0">All Videos</h5>
                      </div>
                      {userRole != "student" && (
                        <>
                          <div className="ms-auto">
                            <Button className="btn-sm" onClick={() => openModal(initialModalData)}>
                              Upload Video
                            </Button>
                          </div>
                          {sessionDetail && sessionDetail.data && sessionDetail.data.zoom && (
                            <div>
                              <Button
                                className="btn-sm"
                                disabled={fetchLoader}
                                onClick={fetchZoomRecordings}
                              >
                                {fetchLoader ? "Fetching in progress..." : "Fetch Recordings"}
                              </Button>
                            </div>
                          )}
                        </>
                      )}
                    </div>
                    {videoAssets && videoAssets.length > 0 ? (
                      <>
                        <div className="render-video-container">
                          {videoAssets.map((item: any, index: any) => (
                            <div
                              key={`render-video-item-${index}`}
                              className={`render-video-item ${
                                currentVideoRenderUrl && currentVideoRenderUrl.id === item.id
                                  ? "active"
                                  : ""
                              }`}
                            >
                              <div
                                className="image-container"
                                onClick={() => handleCurrentVideoRenderUrl(item)}
                              >
                                <Image
                                  alt=""
                                  src={item.thumbnail ? item.thumbnail : "/default-image.png"}
                                />
                              </div>
                              <div
                                className="title"
                                onClick={() => handleCurrentVideoRenderUrl(item)}
                              >
                                {item.title}
                              </div>
                              {/* <div
                                className="description"
                                onClick={() => handleCurrentVideoRenderUrl(item)}
                              >
                                Video description
                              </div> */}
                              {userRole != "student" && item.kind != "ZOOM_CLOUD" && (
                                <div className="button-container">
                                  <Button
                                    variant="outline-secondary"
                                    className="btn-sm edit-button"
                                    onClick={() => openModal(item)}
                                  >
                                    Edit
                                  </Button>
                                </div>
                              )}
                            </div>
                          ))}
                        </div>
                      </>
                    ) : (
                      <div className="text-center text-secondary pt-5">
                        No Assets are available.
                      </div>
                    )}
                  </div>
                </div>
                <div className="right-wrapper">No Chat is available.</div>
              </div>
            )}
          </>
        )}
      </div>
      {/* modal */}
      <Modal show={modal} onHide={closeModal} centered backdrop={"static"}>
        <Modal.Body>
          <h5>Upload New Video</h5>
          <div>
            {modalData && (
              <Form onSubmit={submitHandleData}>
                <Form.Group className="mb-3" controlId="form-modal-title">
                  <Form.Label>Enter title</Form.Label>
                  <Form.Control
                    type="text"
                    value={modalData.title}
                    onChange={(e: any) => handleModalData("title", e.target.value)}
                    required
                  />
                </Form.Group>
                <Form.Group className="mb-3" controlId="form-modal-url">
                  <Form.Label>Enter Thumbnail</Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={3}
                    value={modalData.thumbnail}
                    onChange={(e: any) => handleModalData("thumbnail", e.target.value)}
                    required
                  />
                </Form.Group>
                <Form.Group className="mb-3" controlId="form-modal-url">
                  <Form.Label>Enter Recording URL</Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={3}
                    value={modalData.url}
                    onChange={(e: any) => handleModalData("url", e.target.value)}
                    required
                  />
                </Form.Group>
                <div className="mb-3">
                  <Button variant="secondary" className="btn-sm me-2" onClick={closeModal}>
                    Close
                  </Button>
                  <Button type="submit" className="btn-sm me-2">
                    {buttonLoader ? "Processing.." : "Upload"}
                  </Button>
                </div>
              </Form>
            )}
          </div>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default withGlobalAuth(SessionDetailView);
