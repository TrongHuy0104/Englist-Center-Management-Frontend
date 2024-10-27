import React from 'react';
import styled from 'styled-components';
import { format } from 'date-fns';

const linearColor = [
    "linear-gradient(135deg, #ff9a9e 0%, #fad0c4 25%, #fad0c4 50%, #ffd1ff 75%, #fbc2eb 100%)",  // Pink to soft pink to lavender
    "linear-gradient(135deg, #a18cd1 0%, #fbc2eb 20%, #a6c1ee 50%, #b8cbb8 75%, #b5e7a0 100%)",  // Lavender to pink to blue to mint
    "linear-gradient(135deg, #fbc2eb 0%, #a6c1ee 30%, #d4fc79 60%, #96e6a1 100%)",  // Soft pink to blue to green
    "linear-gradient(135deg, #f6d365 0%, #fda085 20%, #f6c7c3 40%, #f78ca0 60%, #ff6f91 100%)",  // Peach to coral to pink
    "linear-gradient(135deg, #c3cfe2 0%, #eef2f3 25%, #f5a9b8 50%, #ffd1ff 75%, #ffa69e 100%)",  // Soft blue to white to soft pink
    "linear-gradient(135deg, #84fab0 0%, #8fd3f4 25%, #a6e3e9 50%, #80e4b1 75%, #69c0a2 100%)",  // Light green to cyan to soft blue-green
    "linear-gradient(135deg, #ffecd2 0%, #fcb69f 30%, #fda085 60%, #f78ca0 90%, #ff6f91 100%)",  // Soft orange to coral to pink
    "linear-gradient(135deg, #d4fc79 0%, #96e6a1 25%, #a1e9d0 50%, #6ddccf 75%, #4facfe 100%)",  // Light green to mint to teal
    "linear-gradient(135deg, #a6c0fe 0%, #f68084 20%, #ffa69e 40%, #ffd1ff 60%, #fbc2eb 100%)",  // Lavender to pink to peach to light pink
    "linear-gradient(135deg, #ff9a8b 0%, #ff6a88 30%, #ff99ac 60%, #ffbf69 90%, #ffab73 100%)",  // Coral to pink to peach to soft orange
    "linear-gradient(135deg, #ff9966 0%, #ff5e62 20%, #ffafbd 40%, #fbc2eb 60%, #a6c1ee 100%)",  // Orange to coral to light pink to blue
    "linear-gradient(135deg, #6a11cb 0%, #2575fc 20%, #e94057 40%, #ff9a9e 60%, #ffd1ff 100%)",  // Purple to blue to pink to lavender
    "linear-gradient(135deg, #30cfd0 0%, #330867 25%, #ee0979 50%, #f76a94 75%, #f5a6ca 100%)",  // Teal to dark purple to pink to soft pink
    "linear-gradient(135deg, #fdfcfb 0%, #e2d1c3 30%, #f5efef 50%, #ffb6c1 70%, #ff6f91 100%)",  // White to soft beige to light pink to blush
    "linear-gradient(135deg, #fbc2eb 0%, #a6c1ee 20%, #fda085 40%, #ffcc33 60%, #ffde59 100%)",  // Soft pink to blue to peach to yellow
    "linear-gradient(135deg, #4facfe 0%, #00f2fe 25%, #2e67f6 50%, #8fd3f4 75%, #69c0a2 100%)",  // Sky blue to cyan to teal
    "linear-gradient(135deg, #5ee7df 0%, #b490ca 20%, #ffb88c 40%, #ffa69e 60%, #ffccf9 100%)",  // Aqua green to purple to peach to soft pink
    "linear-gradient(135deg, #ff9a9e 0%, #fecfef 20%, #f6d285 40%, #f78ca0 60%, #ff6f91 100%)",  // Soft pink to coral to orange
    "linear-gradient(135deg, #ee9ca7 0%, #ffdde1 25%, #ff9a9e 50%, #fbc2eb 75%, #a6c1ee 100%)",  // Soft red to pink to lavender to blue
    "linear-gradient(135deg, #89f7fe 0%, #66a6ff 25%, #3f2b96 50%, #b8cbb8 75%, #6ddccf 100%)"   // Bright cyan to dark violet to mint

];

const getColorIndex = (id) => {
    if (!id) return 0; // Trả về chỉ số mặc định nếu id không hợp lệ
    let hash = 0;
    for (let i = 0; i < id.length; i++) {
        hash = id.charCodeAt(i) + ((hash << 5) - hash);
    }
    return Math.abs(hash) % linearColor.length;
};

const ClassTagWrapper = styled.div`
  background: ${({ id }) => linearColor[getColorIndex(id)]};
  padding: 20px;
  border-radius: 15px;
  color: #333;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  min-width: 300px;
  min-height: 220px;
  cursor: pointer;
  box-shadow: 0 6px 12px rgba(0, 0, 0, 0.15);
  transition: transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out;
  overflow: hidden;

  &:hover {
    transform: translateY(-8px);
    box-shadow: 0 10px 20px rgba(0, 0, 0, 0.25);
  }

  background-image: ${({ imageUrl }) =>
        imageUrl ? `url(${imageUrl})` : 'none'};
  background-size: cover;
  background-position: center;
`;

const ClassInfo = styled.div`
  background: rgba(255, 255, 255, 0.5);
  padding: 10px;
  border-radius: 10px;
  border: 0.5px solid rgba(0, 0, 0, 0.3);
  backdrop-filter: blur(10px);
`;

const ClassName = styled.h3`
  font-size: 1.5rem;
  margin: 0;
  font-weight: bold;
  color: #333;
`;

const ClassDetail = styled.p`
  font-size: 1rem;
  margin: 8px 0 0;
  color: #666;
`;

const ClassTag = ({ id, name, deadline, imageUrl, onClick }) => {
    const formattedDeadline = format(new Date(deadline), 'MMMM dd, yyyy');
    return (
        <ClassTagWrapper imageUrl={imageUrl}
            onClick={onClick}
            id={id}>
            <ClassInfo>
                <ClassName>{name}</ClassName>
                <ClassDetail>Enrollment Deadline: {formattedDeadline}</ClassDetail>
            </ClassInfo>
        </ClassTagWrapper>
    );
};

export default ClassTag;
