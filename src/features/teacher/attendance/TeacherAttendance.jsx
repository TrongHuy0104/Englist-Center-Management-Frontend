import React, { useState } from "react";
import useUser from "../../authentication/useUser";
import { useNavigate } from "react-router-dom";
import useSlotAttendance from "./useSlotAttendance";
import Table from "../../../ui/Table";

function TeacherAttendance() {
  const { isLoading: isLoadingUser, user } = useUser();
  const teacherId = user?.roleDetails?._id;

  const navigate = useNavigate();

  // Calculate today's date in the adjusted timezone
  const date = new Date();
  date.setHours(date.getHours() + 7);
  const todayDate = date.toISOString().split("T")[0];

  // Use the useSlotAttendance hook with react-query
  const { isLoading, classData, error } = useSlotAttendance(teacherId);
  
  // Access classes from classData if available
  const classes = classData?.data?.classes || [];

  // Filter and map the class data to include only today's slots
  const filteredClassData = classes
    .map((classItem) => ({
      ...classItem,
      schedule: classItem.schedule?.filter(
        (slot) => slot.date.split("T")[0] === todayDate
      ) || [], // Add a fallback for schedule if undefined
    }))
    .filter((classItem) => classItem.schedule.length > 0);

  const handleTakeAttendance = (classId, slot) => {
    navigate("/teacher/attendance/take-attendance", {
      state: { teacherId, classId, todayDate, slot },
    });
  };

  if (isLoadingUser || isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      {filteredClassData.length > 0 ? (
        <Table columns="0.5fr 1fr 1fr 1fr 1fr 1fr">
          <Table.Header>
            <div>No.</div>
            <div>Class Name</div>
            <div>Date</div>
            <div>Slot</div>
            <div>Time</div>
            <div>Action</div>
          </Table.Header>
          <Table.Body
            data={filteredClassData.flatMap((classItem, index) =>
              classItem.schedule.map((slot) => ({
                ...slot,
                className: classItem.name,
                classId: classItem._id,
                index: index + 1,
              }))
            )}
            render={(slot) => (
              <Table.Row key={`${slot.classId}-${slot.slot}`}>
                <div>{slot.index}</div>
                <div>{slot.className}</div>
                <div>{new Date(slot.date).toLocaleDateString()}</div>
                <div>{slot.slot}</div>
                <div>{slot.start_time} - {slot.end_time}</div>
                <div>
                  <button
                    onClick={() => handleTakeAttendance(slot.classId, slot.slot)}
                    style={{
                      backgroundColor: "#4f46e5",
                      color: "white",
                      padding: "8px 12px",
                      border: "none",
                      borderRadius: "4px",
                      cursor: "pointer",
                    }}
                  >
                    Take Attendance
                  </button>
                </div>
              </Table.Row>
            )}
          />
        </Table>
      ) : (
        <p>No attendance data available for today.</p>
      )}
    </div>
  );
}

export default TeacherAttendance;
