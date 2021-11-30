import React from "react";
// next imports
import { useRouter } from "next/router";
// react bootstrap
import { Container, Button, Form, Tabs, Tab } from "react-bootstrap";
// swr
import useSWR from "swr";
// uuid
import { v4 as uuidV4 } from "uuid";
// cron parser
const parser = require("cron-parser");
// components
import SessionForm from "@components/admin/sessions/sessionForm";
import SessionUser from "@components/admin/sessions/sessionUser";
import CalenderMonthView from "@components/admin/calenderviews/monthview";
// layouts
import AdminLayout from "@layouts/adminLayout";
// api routes
import { USER_ENDPOINT, USER_WITH_ID_ENDPOINT } from "@constants/routes";
// api services
import { SessionBulkCreate } from "@lib/services/sessionservice";
import { APIFetcher, APIUpdater } from "@lib/services";
// hoc
import withAdminAuth from "@lib/hoc/withAdminAuth";
// components
import Page from "@components/page";
// constants
import { META_DESCRIPTION } from "@constants/page";

const BulkSchedules = () => {
  const router = useRouter();
  const calendarMonths: any = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  const calendarDays: any = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  const [buttonLoader, setButtonLoader] = React.useState<any>(false);
  const [sessionList, setSessionList] = React.useState<any>();

  const [sessionData, setSessionData] = React.useState<any>({
    title: "",
    description: "",
    start_date: new Date(),
    end_date: new Date(),
    start_time: new Date(),
    end_time: new Date(),
    link: "",
    data: {},
    listeners: [],
    teachers: [],
    cornJobKind: "daily",
    cornJobKindValue: "everyday",
  });
  const handleSessionData = (value: any) => {
    setSessionData(value);
  };
  const handleSessionListeners = (key: any, value: any) => {
    setSessionData({ ...sessionData, [key]: value });
  };
  const handleSessionTabData = (value: any) => {
    let data;
    if (value === "daily") {
      data = "everyday";
    }
    if (value === "weekly") {
      data = [];
    }
    if (value === "monthly") {
      data = {
        category: "c1",
        date: 1,
        month: 1,
      };
    }
    setSessionData({ ...sessionData, cornJobKind: value, cornJobKindValue: data });
  };

  const returnCalenderDays = (days: any) => {
    const array = [];
    for (let i = 0; i < days.length; i++) {
      if (days[i] === "Sunday") array.push("SUN");
      if (days[i] === "Monday") array.push("MON");
      if (days[i] === "Tuesday") array.push("TUE");
      if (days[i] === "Wednesday") array.push("WED");
      if (days[i] === "Thursday") array.push("THU");
      if (days[i] === "Friday") array.push("FRI");
      if (days[i] === "Saturday") array.push("SAT");
    }
    return array.toString();
  };

  const sessionCreate = () => {
    if (sessionData.start_date && sessionData.end_date) {
      if (
        new Date(sessionData.start_date).getDate() === new Date(sessionData.end_date).getDate() &&
        new Date(sessionData.start_date).getMonth() === new Date(sessionData.end_date).getMonth() &&
        new Date(sessionData.start_date).getFullYear() ===
          new Date(sessionData.end_date).getFullYear()
      ) {
        // alert("Start date and End date are equal");
        setSessionList([]);
      } else {
        console.log(
          "new Date(sessionData.start_date).getDate()",
          new Date(sessionData.start_date).getDate()
        );
        console.log(
          "new Date(sessionData.start_date).getMonth()",
          new Date(sessionData.start_date).getMonth()
        );
        console.log(
          "new Date(sessionData.start_date).getFullYear()",
          new Date(sessionData.start_date).getFullYear()
        );
        console.log(
          "new Date(sessionData.end_date).getDate()",
          new Date(sessionData.end_date).getDate()
        );
        if (
          (new Date(sessionData.start_date).getMonth() ===
            new Date(sessionData.end_date).getMonth() &&
            new Date(sessionData.start_date).getDate() >
              new Date(sessionData.end_date).getDate()) ||
          new Date(sessionData.start_date).getMonth() > new Date(sessionData.end_date).getMonth()
        ) {
          // alert("End date has to be greater than Start date");
          setSessionList([]);
        } else {
          let options: any = {
            currentDate: new Date(sessionData.start_date),
            endDate: new Date(sessionData.end_date),
            iterator: true,
          };

          options.currentDate.setHours(0);
          options.currentDate.setMinutes(0);
          options.currentDate.setSeconds(0);

          options.endDate.setHours(0);
          options.endDate.setMinutes(0);
          options.endDate.setSeconds(0);

          options.endDate.setDate(options.endDate.getDate() + 1);
          let returnArray = [];
          let dateArray = [];
          // second(0 - 59), minute(0 - 59), hour(0 - 23), dayOfMonth(1 - 31), month(1 - 12), dayOfWeek (0 - 7) (0 or 7 is Sun)
          let cronExpression = `0 ${sessionData.start_time.getMinutes()} ${sessionData.start_time.getHours()} * * *`;
          if (sessionData.cornJobKind === "daily") {
            if (sessionData.cornJobKindValue === "everyday") {
              cronExpression = `0 ${sessionData.start_time.getMinutes()} ${sessionData.start_time.getHours()} * * *`;
            }
            if (sessionData.cornJobKindValue === "weekday") {
              cronExpression = `0 ${sessionData.start_time.getMinutes()} ${sessionData.start_time.getHours()} * * MON-FRI`;
            }
            if (sessionData.cornJobKindValue === "weekend") {
              cronExpression = `0 ${sessionData.start_time.getMinutes()} ${sessionData.start_time.getHours()} * * SAT,SUN`;
            }
          }
          if (sessionData.cornJobKind === "weekly" && sessionData.cornJobKindValue.length > 0) {
            const weeklyDay = returnCalenderDays(sessionData.cornJobKindValue);
            cronExpression = `0 ${sessionData.start_time.getMinutes()} ${sessionData.start_time.getHours()} * * ${weeklyDay}`;
          }
          if (sessionData.cornJobKind === "monthly") {
            if (sessionData.cornJobKindValue && sessionData.cornJobKindValue.category) {
              if (sessionData.cornJobKindValue.category === "c1") {
                cronExpression = `0 ${sessionData.start_time.getMinutes()} ${sessionData.start_time.getHours()} ${
                  sessionData.cornJobKindValue.date
                } 1/${sessionData.cornJobKindValue.month} *`;
              }
              if (sessionData.cornJobKindValue.category === "c2") {
                const weeklyDay = returnCalenderDays([sessionData.cornJobKindValue.day]);

                cronExpression = `0 ${sessionData.start_time.getMinutes()} ${sessionData.start_time.getHours()} * 1/${
                  sessionData.cornJobKindValue.month
                } ${weeklyDay}#${sessionData.cornJobKindValue.week}`;
              }
            }
          }

          try {
            var interval = parser.parseExpression(cronExpression, options);

            while (true) {
              try {
                var obj = interval.next();
                returnArray.push(obj.value.toString());
              } catch (e) {
                break;
              }
            }
          } catch (err: any) {
            console.log("Error: " + err.message);
          }

          if (returnArray) {
            for (let i = 0; i < returnArray.length; i++) {
              const newDate = new Date(returnArray[i]);

              const currentDate = new Date(returnArray[i]);
              currentDate.setHours(sessionData.end_time.getHours());
              currentDate.setMinutes(sessionData.end_time.getMinutes());
              currentDate.setSeconds(sessionData.end_time.getSeconds());

              const data = {
                title: sessionData.title,
                description: sessionData.description,
                start_datetime: new Date(newDate),
                end_datetime: new Date(currentDate),
                link: sessionData.link,
                data: sessionData.data,
              };
              dateArray.push(data);
            }
            setSessionList(dateArray);
          }
        }
      }
    } else {
      // alert("Please select start date and end date");
      setSessionList([]);
    }
  };

  React.useEffect(() => {
    sessionCreate();
    console.log(`start_date`);
  }, [sessionData.start_date]);

  React.useEffect(() => {
    sessionCreate();
    console.log(`end_date`);
  }, [sessionData.end_date]);

  React.useEffect(() => {
    sessionCreate();
    console.log(`start_time`);
  }, [sessionData.start_time]);

  React.useEffect(() => {
    sessionCreate();
    console.log(`end_time`);
  }, [sessionData.end_time]);

  React.useEffect(() => {
    sessionCreate();
    console.log(`title`);
  }, [sessionData.title]);

  React.useEffect(() => {
    sessionCreate();
    console.log(`description`);
  }, [sessionData.description]);

  React.useEffect(() => {
    sessionCreate();
    console.log(`cornJobKindValue`);
  }, [sessionData.cornJobKindValue]);

  React.useEffect(() => {
    sessionCreate();
    console.log(`cornJobKind`);
  }, [sessionData.cornJobKind]);

  const validateBulkCreate = () => {
    // title validate
    if (sessionData.title) {
      // date validation
      if (sessionData.start_date && sessionData.end_date) {
        if (new Date(sessionData.start_date) > new Date(sessionData.end_date)) {
          alert("End date has to be greater than or Equal to Start date");
        } else {
          // students validation
          if (sessionData.listeners.length <= 0) {
            alert("Students has to be selected.");
            return false;
          } else {
            // teacher validation
            if (sessionData.teachers.length <= 0) {
              alert("Teachers has to be selected.");
              return false;
            } else {
              return true;
            }
          }
        }
      } else {
        alert("Please select Start date and End date");
        return false;
      }
    } else {
      alert("Add title");
      return false;
    }
  };

  const sessionBulkCreate = (event: any) => {
    event.preventDefault();
    setButtonLoader(true);
    if (validateBulkCreate()) {
      const payload = {
        sessions: sessionList,
        students: sessionData.listeners,
        teachers: sessionData.teachers,
      };

      SessionBulkCreate(payload)
        .then((res) => {
          alert("sessions created successfully.");
          router.push("/calendar");
          // redirect to calenders
          setButtonLoader(false);
        })
        .catch((errors) => {
          console.log(errors);
          setButtonLoader(false);
        });
    } else {
      setButtonLoader(false);
    }
  };

  const [dailyData, setDailyData] = React.useState<any>("everyday");
  const handleDailyData = (value: any) => {
    setDailyData(value);
    setSessionData({ ...sessionData, cornJobKindValue: value });
  };
  const validateDailyData = (value: any) => {
    if (dailyData === value) {
      return true;
    }
    return false;
  };

  const [weeklyData, setWeeklyData] = React.useState<any>([]);
  const handleWeeklyData = (value: any) => {
    let array: any = Array.from(weeklyData);
    if (weeklyData.includes(value)) {
      let index = array.findIndex((item: any) => item === value);
      array.splice(index, 1);
    } else {
      array.push(value);
    }
    setWeeklyData(array);
    setSessionData({ ...sessionData, cornJobKindValue: array });
  };
  const validateWeeklyData = (value: any) => {
    if (weeklyData.includes(value)) {
      return true;
    }
    return false;
  };

  const [monthlyData, setMonthlyData] = React.useState<any>({
    category: "c1",
    c1date: 1,
    c1month: 1,
    c2week: 1,
    c2day: "Sunday",
    c2month: 1,
  });
  function handleMonthlyData(category: any, key: any, value: any) {
    setMonthlyData({ ...monthlyData, [key]: value });
    let object = Object.assign({}, monthlyData);
    if (category === "c1") {
      const data = {
        category: key === "category" ? value : object.category,
        date: key === "c1date" ? value : object.c1date,
        month: key === "c1month" ? value : object.c1month,
      };
      setSessionData({ ...sessionData, cornJobKindValue: data });
    }
    if (category === "c2") {
      const data = {
        category: key === "category" ? value : object.category,
        week: key === "c2week" ? value : object.c2week,
        day: key === "c2day" ? value : object.c2day,
        month: key === "c2month" ? value : object.c2month,
      };

      setSessionData({ ...sessionData, cornJobKindValue: data });
    }
  }
  const validateMonthlyData = (value: any) => {
    if (monthlyData.category === value) {
      return true;
    }
    return false;
  };

  const { data: userList, error: userListError } = useSWR(USER_ENDPOINT, APIFetcher);

  const meta = {
    title: "Bulk Schedules",
    description: META_DESCRIPTION,
  };

  return (
    <Page meta={meta}>
      <div>
        <AdminLayout>
          <div className="right-layout">
            <Container className="mt-4">
              <div className="card shadow">
                <div className="card-header bg-white fw-bold py-3">
                  <h4 className="m-0">Schedule recurring sessions.</h4>
                </div>
                <div className="card-body">
                  <SessionForm
                    data={sessionData}
                    handleData={handleSessionData}
                    view_end_date={true}
                    role={`admin`}
                  />
                  <SessionUser users={userList} handleData={handleSessionListeners} />
                  <Tabs
                    activeKey={sessionData.cornJobKind}
                    onSelect={(k) => handleSessionTabData(k)}
                  >
                    <Tab eventKey="daily" title={`Daily`}>
                      <div className="pt-2 pb-2">
                        <div className="calender-flex-container">
                          <div className="calender-flex-item pt-3">
                            <Form.Check
                              name="daily"
                              type="radio"
                              label="Everyday"
                              id="everyday"
                              value="everyday"
                              onChange={(e) => {
                                handleDailyData("everyday");
                              }}
                              checked={validateDailyData("everyday")}
                            />
                            <Form.Check
                              name="daily"
                              type="radio"
                              label="Every weekday"
                              id="weekday"
                              value="weekday"
                              onChange={(e) => {
                                handleDailyData("weekday");
                              }}
                              checked={validateDailyData("weekday")}
                            />
                            <Form.Check
                              name="daily"
                              type="radio"
                              label="Every weekend"
                              id="weekend"
                              value="weekend"
                              onChange={(e) => {
                                handleDailyData("weekend");
                              }}
                              checked={validateDailyData("weekend")}
                            />
                          </div>
                        </div>
                      </div>
                    </Tab>
                    <Tab eventKey="weekly" title={`Weekly`}>
                      <div className="pt-2 pb-2">
                        <div className="calender-flex-container pt-3">
                          {calendarDays &&
                            calendarDays.map((day: any, dayIndex: any) => (
                              <div key={`weekly-${day}`} className="calender-flex-item">
                                <Form.Check
                                  type="checkbox"
                                  id={`weekly-${day}-${uuidV4()}`}
                                  label={day}
                                  value={day}
                                  onChange={(e) => handleWeeklyData(day)}
                                  checked={validateWeeklyData(day)}
                                />
                              </div>
                            ))}
                        </div>
                      </div>
                    </Tab>
                    <Tab eventKey="monthly" title={`Monthly`}>
                      <div className="pt-2 pb-2">
                        <div className="calender-flex-container">
                          <div className="calender-flex-item">
                            <Form.Check
                              name="monthly"
                              type="radio"
                              label=""
                              id="monthly-1"
                              value="c1"
                              onChange={(e) => {
                                handleMonthlyData("c1", "category", "c1");
                              }}
                              checked={validateMonthlyData("c1")}
                            />
                          </div>
                          <div className="calender-flex-item">Day</div>
                          <div className="calender-flex-item mr-4">
                            <Form.Control
                              type="text"
                              value={monthlyData.c1date}
                              onChange={(e) => {
                                handleMonthlyData("c1", "c1date", e.target.value);
                              }}
                            />
                          </div>
                          <div className="calender-flex-item">of every</div>
                          <div className="calender-flex-item">
                            <Form.Control
                              as="select"
                              value={monthlyData.c1month}
                              onChange={(e) => {
                                handleMonthlyData("c1", "c1month", e.target.value);
                              }}
                            >
                              <option value="1">1</option>
                              <option value="2">2</option>
                              <option value="3">3</option>
                              <option value="4">4</option>
                              <option value="6">6</option>
                            </Form.Control>
                          </div>
                          <div className="calender-flex-item">month(s)</div>
                        </div>
                        <div className="calender-flex-container">
                          <div className="calender-flex-item">
                            <Form.Check
                              name="monthly"
                              type="radio"
                              label=""
                              id="monthly-2"
                              value="c2"
                              onChange={(e) => {
                                handleMonthlyData("c2", "category", "c2");
                              }}
                              checked={validateMonthlyData("c2")}
                            />
                          </div>
                          <div className="calender-flex-item">The</div>
                          <div className="calender-flex-item">
                            <Form.Control
                              as="select"
                              value={monthlyData.c2week}
                              onChange={(e) => {
                                handleMonthlyData("c2", "c2week", e.target.value);
                              }}
                            >
                              <option value="1">First</option>
                              <option value="2">Second</option>
                              <option value="3">Third</option>
                              <option value="4">Fourth</option>
                            </Form.Control>
                          </div>
                          <div className="calender-flex-container">
                            <Form.Control
                              as="select"
                              value={monthlyData.c2day}
                              onChange={(e) => {
                                handleMonthlyData("c2", "c2day", e.target.value);
                              }}
                            >
                              {calendarDays &&
                                calendarDays.map((day: any, dayIndex: any) => (
                                  <option key={`monthly-${day}`} value={day}>
                                    {day}
                                  </option>
                                ))}
                            </Form.Control>
                          </div>
                          <div className="calender-flex-item">of every</div>
                          <div className="calender-flex-item">
                            <Form.Control
                              as="select"
                              value={monthlyData.c2month}
                              onChange={(e) => {
                                handleMonthlyData("c2", "c2month", e.target.value);
                              }}
                            >
                              <option value="1">1</option>
                              <option value="2">2</option>
                              <option value="3">3</option>
                              <option value="4">4</option>
                              <option value="6">6</option>
                            </Form.Control>
                          </div>
                          <div className="calender-flex-item">month(s)</div>
                        </div>
                      </div>
                    </Tab>
                  </Tabs>

                  <hr />
                  <div>
                    <h5>Calendar View</h5>
                    <CalenderMonthView
                      currentDate={new Date()}
                      sessionList={sessionList}
                      role={"admin"}
                      bulkPreview={true}
                    />
                  </div>

                  <hr />
                  <Button
                    variant="primary"
                    className="btn-sm mt-2"
                    type="submit"
                    disabled={buttonLoader}
                    onClick={sessionBulkCreate}
                  >
                    {buttonLoader ? "Saving..." : "Save"}
                  </Button>
                </div>
              </div>
            </Container>
          </div>
        </AdminLayout>
      </div>
    </Page>
  );
};

export default withAdminAuth(BulkSchedules);
