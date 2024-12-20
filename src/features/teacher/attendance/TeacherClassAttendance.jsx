import React, { useState } from "react";
import useUser from "../../authentication/useUser";
import { useNavigate } from "react-router-dom";
import Table from "../../../ui/Table";
import Spinner from "../../../ui/Spinner";
import useSlotAttendance from "./useSlotAttendance";

function TeacherClassAttendance() {
    const { isLoading: isLoadingUser, user } = useUser();
    const teacherId = user?.roleDetails?._id;

    const navigate = useNavigate();
    const [sortBy] = useState("className-asc"); // Default sort option

    // Calculate today's date in the adjusted timezone
    const date = new Date();
    date.setHours(date.getHours() + 7);
    const todayDate = date.toISOString().split("T")[0];

    // Use the useSlotAttendance hook with react-query
    const { isLoading, classData, error } = useSlotAttendance(teacherId);

    // Access classes from classData if available
    const classes = classData?.data?.classes || [];

    const slotTimeMapping = {
        1: { start: "09:00", end: "10:00" },
        2: { start: "10:15", end: "11:15" },
        3: { start: "11:30", end: "12:30" },
        4: { start: "12:30", end: "14:00" },
        5: { start: "14:15", end: "15:45" },
        6: { start: "16:00", end: "17:30" },
        7: { start: "18:00", end: "19:30" },
        8: { start: "19:45", end: "21:15" },
    };

    function timeStringToDate(timeString) {
        const [hours, minutes] = timeString.split(":").map(Number);
        const date = new Date();
        date.setHours(hours, minutes, 0, 0); // Set hours and minutes
        return date;
    }

    function getCurrentSlot() {
        const now = new Date();
        const currentTime = new Date(
            timeStringToDate(now.toTimeString().slice(0, 5)).getTime()
        );

        for (const [slot, times] of Object.entries(slotTimeMapping)) {
            const startTime = new Date(timeStringToDate(times.start)).getTime();
            const endTime = new Date(timeStringToDate(times.end)).getTime();

            if (currentTime >= startTime && currentTime <= endTime) {
                return slot;
            }
        }

        return null;
    }

    // Filter and map the class data to include only today's slots
    const filteredClassData = classes
        .map((classItem) => ({
            ...classItem,
            schedule:
                classItem.schedule?.filter(
                    (slot) => slot.date.split("T")[0] === todayDate
                    // &&
                    //     slot.slot >= getCurrentSlot()
                ) || [], // Add a fallback for schedule if undefined
        }))
        .filter((classItem) => classItem.schedule.length > 0);

    // Sort the class data based on the selected sorting option
    const sortedClassData = filteredClassData
        .flatMap((classItem) =>
            classItem.schedule.map((slot) => ({
                ...slot,
                className: classItem.name,
                classId: classItem._id,
            }))
        )
        .sort((a, b) => {
            switch (sortBy) {
                case "className-asc":
                    return a.className.localeCompare(b.className);
                case "className-desc":
                    return b.className.localeCompare(a.className);
                case "slot-asc":
                    return a.slot.localeCompare(b.slot);
                case "slot-desc":
                    return b.slot.localeCompare(a.slot);
                default:
                    return 0;
            }
        });

    const handleTakeAttendance = (classId, slot) => {
        navigate(`/teacher/attendance/${slot}`);
    };

    if (isLoadingUser || isLoading) {
        return <Spinner />;
    }

    return (
        <div>
            {sortedClassData.length > 0 ? (
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
                        data={sortedClassData.map((slot, index) => ({
                            ...slot,
                            index: index + 1,
                        }))}
                        render={(slot) => (
                            <Table.Row key={`${slot.classId}-${slot.slot}`}>
                                <div>{slot.index}</div>
                                <div>{slot.className}</div>
                                <div>
                                    {new Date(slot.date).toLocaleDateString()}
                                </div>
                                <div>{slot.slot}</div>
                                <div>
                                    {slot.start_time} - {slot.end_time}
                                </div>
                                <div>
                                    <button
                                        onClick={() =>
                                            handleTakeAttendance(
                                                slot.classId,
                                                slot.slot
                                            )
                                        }
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

export default TeacherClassAttendance;
