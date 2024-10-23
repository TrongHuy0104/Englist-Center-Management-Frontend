// src/features/teacher/TeacherClasses.jsx
// import { useState } from "react";
import useUser from "../features/authentication/useUser";
import useTeacherClasses from "../features/teacher/useTeacherClasses";
import styled from "styled-components";

// Styled components cho danh sách lớp học
const ClassesContainer = styled.div`
    padding: 20px;
    background-color: #f9f9f9;
    border-radius: 8px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

const ClassItem = styled.div`
    padding: 10px;
    margin-bottom: 10px;
    background-color: #ffffff;
    border-radius: 4px;
    box-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);
`;

const ClassTitle = styled.h2`
    font-size: 1.2em;
    color: #333;
`;

const ClassDetails = styled.p`
    font-size: 0.9em;
    color: #666;
`;

function TeacherClasses() {
    const { isLoading: isLoadingUser, user } = useUser();
    const teacherId = user?.roleDetails?._id;
    const { isLoading: isLoadingClasses, data: classesData, error } = useTeacherClasses(teacherId);

    if (isLoadingUser || isLoadingClasses) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error.message}</div>;
    }

    const classes = classesData?.data?.classes || [];

    return (
        <ClassesContainer>
            <h1>Teachers Classes</h1>
            {classes.length > 0 ? (
                classes.map((cls) => (
                    <ClassItem key={cls._id}>
                        <ClassTitle>{cls.className}</ClassTitle>
                        <ClassDetails>Subject: {cls.subject}</ClassDetails>
                        <ClassDetails>Room: {cls.room}</ClassDetails>
                        <ClassDetails>Time: {cls.time}</ClassDetails>
                    </ClassItem>
                ))
            ) : (
                <div>No classes available.</div>
            )}
        </ClassesContainer>
    );
}

export default TeacherClasses;
