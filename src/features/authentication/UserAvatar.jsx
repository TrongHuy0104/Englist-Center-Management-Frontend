import styled from "styled-components";
import useUser from "./useUser";
import defaultAvatar from "../../../public/img/default-user.jpg";

const StyledUserAvatar = styled.div`
    display: flex;
    gap: 1.2rem;
    align-items: center;
    font-weight: 500;
    font-size: 1.4rem;
    color: var(--color-grey-600);
`;

const Avatar = styled.img`
    display: block;
    width: 4rem;
    width: 3.6rem;
    aspect-ratio: 1;
    object-fit: cover;
    object-position: center;
    border-radius: 50%;
    outline: 2px solid var(--color-grey-100);
`;

function UserAvatar() {
    const { user } = useUser();

    return (
        <StyledUserAvatar>
            <Avatar
                src={user.roleDetails?.avatar || defaultAvatar}
                alt={"avatar"}
            />
            <span>{user.roleDetails?.name}</span>
        </StyledUserAvatar>
    );
}

export default UserAvatar;
