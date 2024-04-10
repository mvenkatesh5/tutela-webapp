import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import useSWR from "swr";

import { Form } from "react-bootstrap";

// constants
import { META_DESCRIPTION } from "@constants/page";
import {
  USER_PRODUCT_REPORTS,
  PRODUCT_USER_ENDPOINT,
  PRODUCTS_WITH_ID_ENDPOINT,
  USER_REPORT_WITH_PRODUCT_ID_ENDPOINT,
  USER_PRODUCT_ATTENDANCE,
} from "@constants/routes";

// services
import { APIFetcher } from "@lib/services";

// hoc
import withParentAuth from "@lib/hoc/withParentAuth";

// layout
import ReportLayout from "@layouts/parent/ChildReportLayout";

// components
import Page from "@components/page";
import PerformanceView from "@components/reports/components/Performance";
import BehaviorView from "@components/reports/components/Behavior";
import SyllabusView from "@components/reports/components/Syllabus";
import Overview from "@components/reports/components/Overview";
import AttendanceView from "@components/reports/components/Attendance";
import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";
import { countSundaysInRange, returnSingleMonth, returnSingleYear } from "@constants/global";

const UserProductReportsView = () => {
  const meta = {
    title: "Child Reports",
    description: META_DESCRIPTION,
  };
  const router = useRouter();

  const { student_id, product_id } = router.query;

  const [currentView, setCurrentView] = useState("overview");

  const [startDate, setStartDate] = useState(new Date());
  const [filteredAttendance, setFilteredAttendance] = useState([]);
  const [filteredSyllabusData, setFilteredSyllabusData] = useState([]);
  const [teachers, setTeachers] = useState<any>([
    {
      id: "-",
      first_name: "None",
    },
  ]);
  const [selectedTeacher, setSelectedTeacher] = useState<any>(null);

  const [classesPerWeek, setClassesPerWeek] = useState<any>([]);

  const { data: product, error: productError } = useSWR(
    product_id ? PRODUCTS_WITH_ID_ENDPOINT(product_id) : null,
    (url) => APIFetcher(url),
    { refreshInterval: 0 }
  );

  const { data: productUsers, error: productUsersError } = useSWR(
    product_id ? PRODUCT_USER_ENDPOINT(product_id) : null,
    (url) => APIFetcher(url),
    { refreshInterval: 0 }
  );

  const { data: userProductReport, error: userProductReportError } = useSWR(
    product_id ? USER_REPORT_WITH_PRODUCT_ID_ENDPOINT(product_id) : null,
    (url) => APIFetcher(url),
    { refreshInterval: 0 }
  );

  const { data: userAttendanceData, error: userAttendanceError } = useSWR(
    product_id ? USER_PRODUCT_ATTENDANCE(product_id, student_id) : null,
    (url: any) => APIFetcher(url),
    { refreshInterval: 0 }
  );

  const { data: userProductReports, error: userProductReportsError } = useSWR(
    student_id && product_id ? USER_PRODUCT_REPORTS(student_id, product_id) : null,
    (url) => APIFetcher(url),
    { refreshInterval: 0 }
  );

  useEffect(() => {
    if (userAttendanceData) {
      let startDate = new Date(userAttendanceData?.conducted_classes?.[0]?.end_time);
      startDate = new Date(startDate.setDate(startDate.getDate() - 7));
      let endDate = new Date();
      endDate = new Date(endDate.setDate(endDate.getDate() + 7));
      let cumulativeClasses: any = [];
      const sundayDates = countSundaysInRange(startDate, endDate);
      sundayDates.map((sunday: Date, i: number) => {
        const startRange = sunday;
        const endRange =
          i + 1 >= sundayDates.length
            ? new Date(sunday.setDate(sunday.getDate() + 7))
            : sundayDates[i + 1];

        let currentWeekClassCount = userAttendanceData?.conducted_classes.filter(
          (ele: any) => new Date(ele.end_time) >= startRange && new Date(ele.end_time) <= endRange
        ).length;
        if (cumulativeClasses.length <= 0) cumulativeClasses.push(currentWeekClassCount);
        else
          cumulativeClasses.push(
            Number(currentWeekClassCount) + Number(cumulativeClasses?.slice(-1))
          );
      });

      console.log("this is cumulativeclassess", cumulativeClasses);

      setClassesPerWeek(cumulativeClasses.slice(0, cumulativeClasses.length - 1));
    }
  }, [userAttendanceData]);

  useEffect(() => {
    if (userAttendanceData) {
      let syllabusTeachers: any = [];

      for (const syllabus of userAttendanceData?.session_wise_attendance) {
        syllabusTeachers.push(...syllabus.teacher);
      }

      setTeachers([
        ...teachers,
        ...syllabusTeachers.filter((value: any, index: any, self: any) => {
          return (
            index ===
            self.findIndex(
              (item: any) =>
                item.id === value.id &&
                item.first_name === value.first_name &&
                item.last_name === value.last_name
            )
          );
        }),
      ]);
    }
  }, [userAttendanceData]);

  useEffect(() => {
    if (selectedTeacher && selectedTeacher !== "-") {
      setFilteredAttendance(
        userAttendanceData?.session_wise_attendance?.filter((session: any) => {
          const teacherIds = session.teacher.map((teacher: any) => teacher.id);
          console.log(teacherIds.includes(Number(selectedTeacher)), selectedTeacher, teacherIds);
          if (teacherIds.includes(Number(selectedTeacher))) return true;
          return false;
        })
      );

      setFilteredSyllabusData(
        userAttendanceData?.syllabus_wise_attendance?.filter((session: any) => {
          const teacherIds = session.teacher.map((teacher: any) => teacher.id);
          if (teacherIds.includes(Number(selectedTeacher))) return true;
          return false;
        })
      );
    } else {
      // If no teacher is selected, set the attendance data to the original data
      setFilteredAttendance(userAttendanceData?.session_wise_attendance);
      setFilteredSyllabusData(userAttendanceData?.syllabus_wise_attendance);
    }
  }, [userAttendanceData, selectedTeacher]);

  if (
    !product ||
    !userProductReports ||
    !productUsers ||
    !userProductReport ||
    !userAttendanceData
  ) {
    return <>Loading...</>;
  }

  const user = productUsers.users.find((user: any) => user?.id == student_id);
  const mentors = productUsers.users.filter((mentor: any) => mentor?.role == 1);

  const Options = [
    { label: "Overview", value: "overview" },
    { label: "Behavior", value: "behavior" },
    { label: "Perfomance", value: "performance" },
    { label: "Syllabus", value: "syllabus" },
    { label: "Attendance", value: "attendance" },
  ];

  let componentToRender;

  const reports = userProductReport.filter(
    (report: any) =>
      returnSingleMonth(report.created) == returnSingleMonth(startDate) &&
      returnSingleYear(report.created) == returnSingleYear(startDate)
  );
  switch (currentView) {
    case "overview":
      componentToRender = (
        <Overview
          reports={reports}
          userAttendanceData={userAttendanceData}
          classesPerWeek={classesPerWeek}
          startDate={startDate}
        />
      );
      break;
    case "syllabus":
      componentToRender = (
        <SyllabusView
          reports={reports}
          tableData={filteredSyllabusData?.filter(
            (syllabus: any) =>
              returnSingleMonth(syllabus.end_time) == returnSingleMonth(startDate) &&
              returnSingleYear(syllabus.end_time) == returnSingleYear(startDate)
          )}
        />
      );
      break;
    case "performance":
      componentToRender = <PerformanceView reports={reports} />;
      break;
    case "behavior":
      componentToRender = <BehaviorView reports={reports} />;
      break;
    case "attendance":
      componentToRender = (
        <AttendanceView
          tableData={filteredAttendance?.filter(
            (session: any) =>
              returnSingleMonth(session.end_time) == returnSingleMonth(startDate) &&
              returnSingleYear(session.end_time) == returnSingleYear(startDate)
          )}
        />
      );
      break;
    default:
      componentToRender = null;
  }

  const handleStartDateChange = (date: any) => {
    setStartDate(date);
    // setEndDate(date);
  };

  return (
    <Page meta={meta}>
      <ReportLayout student={user || {}} product={product} mentors={mentors}>
        <div className="d-flex justify-content-start gap-4">
          <div className="relative">
            <DatePicker
              showMonthYearPicker={true}
              selected={startDate}
              onChange={handleStartDateChange}
              startDate={startDate}
              dateFormat="MM/yyyy"
              className=" tw-p-2 tw-rounded-md tw-outline-none tw-border-[0.5px] tw-border-gray-300"
            />
          </div>
          <Form.Select
            className="tw-w-fit"
            style={{
              width: "10em",
            }}
            onChange={(e) => {
              setCurrentView(e.target.value);
            }}
            value={currentView}
          >
            {Options.map((item: any, index: any) => {
              return (
                <option value={item.value} key={index}>
                  {item.label}
                </option>
              );
            })}
          </Form.Select>
          {["attendance", "syllabus"].includes(currentView) && (
            <>
              <Form.Select
                className="tw-w-fit"
                style={{
                  width: "10em",
                }}
                onChange={(e: any) => setSelectedTeacher(e.target.value)}
              >
                {teachers.map((teacher: any) => (
                  <option key={teacher.id} className="py-4" value={teacher.id}>
                    {teacher.first_name} {teacher.last_name}
                  </option>
                ))}
              </Form.Select>
            </>
          )}
        </div>
        {componentToRender}
      </ReportLayout>
    </Page>
  );
};

export default withParentAuth(UserProductReportsView);
