import styled from "styled-components";
import { resItem } from "./reservation";
import { useEffect, useState } from "react";
import axios from "axios";

export interface instItem {
    iid: number;
    instName: string;
    instBirth: string;
    instUseable: boolean;
}

const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    margin-left: 15vw;
    margin-right: 15vw;
    font-family: "Noto Sans KR";
    margin-top: 80px;
`;

const Reservation = styled.a``;

const ResContainer = styled.div``;

const ResBlock = styled.div`
    margin: 10px;
    padding: 10px;
    border-radius: 15px;
    box-shadow: 0px 2px 4px 0px rgba(0, 0, 0, 0.1), 0px 0px 6px 0px rgba(0, 0, 0, 0.1);
`;

const UpperResBox = styled.div`
    display: flex;
    justify-content: space-between;
    margin: 10px;
    font-size: 20px;
    font-weight: 500;
`;

const ResCancelButton = styled.button`
    border: none;
    padding: 5px;
    cursor: pointer;
`;

const LowwerResBox = styled.div`
    display: flex;
    justify-content: space-between;
    margin: 10px;
`;

export default function ReservationMy() {
    const [resList, setResList] = useState<resItem[]>([]);
    const [instList, setInstList] = useState<instItem[]>([]);
    const [uid, setUid] = useState<number | null>(null);

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const res = await axios.get(
                    `${import.meta.env.VITE_API_URL}/users/userinfo`,
                    { withCredentials: true }
                );
                setUid(res.data.data.uid);
            } catch (err) {
                console.log(err);
            }
        };

        const fetchInst = async () => {
            try {
                const res = await axios.get(
                    `${import.meta.env.VITE_API_URL}/inst/list`,
                    { withCredentials: true }
                );
                setInstList(res.data);
            } catch (err) {
                console.log(err);
            }
        };

        fetchUser();
        fetchInst();
    }, []);

    useEffect(() => {
        fetchResList();
    }, [uid]);

    const fetchResList = async () => {
        if (uid !== null) {
            try {
                const res = await axios.get(
                    `${import.meta.env.VITE_API_URL}/reservation/user/${uid}`,
                    { withCredentials: true }
                );
                setResList(res.data);
            } catch (err) {
                console.log(err);
            }
        }
    };

    const getStatusLabel = (status: string | null) => {
        switch (status) {
            case "WAIT_APPROVAL":
                return "승인 대기중";
            case "APPROVED":
                return "승인 됨";
            case "RETURNED":
                return "반려됨";
            default:
                return "알 수 없음";
        }
    };

    const onClickCancelRes = (rid: number) => {
        if (window.confirm("정말 취소하시겠습니까?")) {
            const cancelRes = async () => {
                try {
                    const res = await axios.get(
                        `${import.meta.env.VITE_API_URL}/reservation/${rid}/cancel`,
                        { withCredentials: true }
                    );
                    if (res.status === 200) {
                        window.location.reload()                    
                    }
                } catch (err) {
                    console.log(err);
                }
            };
            cancelRes();
        }
    };

    return (
        <Wrapper>
            <Reservation href="/reservation"> &lt; 예약 바로가기</Reservation>
            <ResContainer>
                {resList.map((reservation) => {
                    const instrument = instList.find(inst => inst.iid === reservation.iid);
                    return (
                        <ResBlock key={reservation.rid}>
                            <UpperResBox>
                                {instrument ? instrument.instName : "장비 정보 없음"}
                                <ResCancelButton
                                    onClick={() => onClickCancelRes(reservation.rid)}
                                >
                                    예약 취소
                                </ResCancelButton>
                            </UpperResBox>
                            <LowwerResBox>
                                <p>
                                    {new Date(reservation.resStartTime).toLocaleDateString('ko-KR', {
                                        year: 'numeric',
                                        month: 'long',
                                        day: 'numeric',
                                    })}{" "}
                                    {new Date(reservation.resStartTime).toLocaleTimeString('ko-KR', {
                                        hour: 'numeric',
                                        minute: 'numeric',
                                    })}
                                </p>
                                {getStatusLabel(reservation.reservationStatus)}
                            </LowwerResBox>
                        </ResBlock>
                    );
                })}
            </ResContainer>
        </Wrapper>
    );
}
