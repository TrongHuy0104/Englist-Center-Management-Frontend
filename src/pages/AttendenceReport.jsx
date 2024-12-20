import useUser from "../features/authentication/useUser";
import useAttendance from "../features/student/profiles/useAttendance";
import Table from "../ui/Table";
import { useState } from "react";
import styled from "styled-components";
import Heading from "../ui/Heading";
import useClass from "../features/student/myclass/useClass";
import useTeacher from "../features/student/profiles/useTeacher";
import Empty from "../ui/Empty";
import Spinner from "../ui/Spinner";

const AttendanceReport = () => {
  const { user } = useUser();
  const [selectedClass, setSelectedClass] = useState(null);
  const { isLoading, attendanceReports, error } = useAttendance(
    user.roleDetails._id
  );
  const classIds = attendanceReports.map((report) => report.class);
  console.log(classIds);
  
  const { classes } = useClass();
  const teacherIds = attendanceReports.map(
    (report) => report.teacher_attendance.teacher_id
  );
  const { teachers } = useTeacher(teacherIds);
  const teacherResponse = teachers.map((response) => response.data.data);
  const getStatusColor = (status) => {
    switch (status) {
      case "Present":
        return "green";
      case "Absent":
        return "red";
      default:
        return "gray";
    }
  };

  if (isLoading) {
    return <Spinner/>;
  }
  if (error) {
    return <Error message={error.message}/> ;
  }
  if (!attendanceReports.length) {
    return <Empty resource="attendance report"/>;
  }
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  };

  const handleClassSelect = (classId) => {
    setSelectedClass(classId);
  };

  const filteredReports = selectedClass
    ? attendanceReports.filter((report) => report.class === selectedClass)
    : attendanceReports; // Show all reports if no class is selected


  return (
    <div>
      <div>
        <Heading as="h1" style={{ marginBottom: "10px" }}>
          Attendance Report
        </Heading>
      </div>
      <div style={{ display: "flex" }}>
        <div style={{ flex: 0.5, marginRight: "20px" }}>
          <Table columns="2fr">
            <Table.Header>
              <div>Classes</div>
            </Table.Header>
            <div>
              {classes
                .filter((classItem) =>
                  classItem.students.some(
                    (student) =>
                      student._id === user.roleDetails._id &&
                      student.enrollStatus !== "Not Enroll"
                  )
                )
                .map((classItem) => (
                  <StyledRow
                    key={classItem._id}
                    onClick={() => handleClassSelect(classItem._id)}
                  >
                    <Stacked>
                      <span>{classItem.name}</span>
                    </Stacked>
                  </StyledRow>
                ))}
            </div>

          </Table>
        </div>
        <div style={{ flex: 2 }}>
          <Table columns="2fr 2fr 2fr 2fr 2fr">
            <Table.Header>
              <div>Date</div>
              <div>Slot</div>
              <div>Time</div>
              <div>Teacher</div>
              <div>Student Status</div>
            </Table.Header>
            <div>
              {selectedClass ? (
                filteredReports.length > 0 ? (
                  filteredReports.map((attendanceReport) => {
                    const studentAttendance =
                      attendanceReport.student_attendance?.find(
                        (student) => student.student_id === user.roleDetails._id
                      );
                    const matchedTeacher = teacherResponse.find(
                      (teacher) =>
                        teacher.data._id ===
                        attendanceReport.teacher_attendance.teacher_id
                    );
                    return (
                      <Table.Row key={attendanceReport._id}>
                        <Stacked>
                          <span>{formatDate(attendanceReport.date)}</span>
                        </Stacked>
                        <Stacked>
                          <span>{attendanceReport.slot || "Unknown Slot"}</span>
                        </Stacked>
                        <Stacked>
                          <span>
                            {" "}
                            {`${attendanceReport.start_time || "N/A"} - ${attendanceReport.end_time || "N/A"
                              }`}
                          </span>
                        </Stacked>
                        <Stacked>
                          <span>
                            {matchedTeacher
                              ? matchedTeacher.data.name
                              : "Teacher not found"}
                          </span>
                        </Stacked>
                        <Stacked>
                          <span
                            style={{
                              color: getStatusColor(studentAttendance?.status),
                            }}
                          >
                            {studentAttendance?.status || "No Status"}
                          </span>
                        </Stacked>
                      </Table.Row>
                    );
                  })
                ) : (
                  <Table.Row>
                    <OneLineMessage>
                      No attendance data available for this class.
                    </OneLineMessage>
                  </Table.Row>
                )
              ) : (
                <Table.Row>
                  <OneLineMessage>
                    Please select a class to view attendance details.
                  </OneLineMessage>
                </Table.Row>
              )}
            </div>
          </Table>
        </div>
      </div>
    </div>
  );
};

const CommonRow = styled.div`
  display: grid;
  grid-template-columns: ${(props) => props.columns};
  column-gap: 2.4rem;
  align-items: center;
  transition: none;
`;

const StyledRow = styled(CommonRow)`
  padding: 1.2rem 2.4rem;
  background-color: white;
  cursor: pointer;

  &:hover {
    background-color: #f0f0f0;
  }

  &:not(:last-child) {
    border-bottom: 1px solid var(--color-grey-100);
  }
`;

const Stacked = styled.div`
  font-size: 1.6rem;
  font-weight: 500;
  display: flex;
  flex-direction: column;
  gap: 0.2rem;
  color: var(--color-grey-600);
`;

const OneLineMessage = styled.div`
  white-space: nowrap;
  font-size: 1.4rem;
  font-weight: 500;
  color: var(--color-grey-600);
`;

export default AttendanceReport;
