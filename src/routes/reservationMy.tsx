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

const Reservation = styled.a`

`;

const ResContainer = styled.div`

`;

const ResBlock = styled.div`
    margin: 10px;
    padding: 10px;
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
        fetchResList();
    }, [uid]);

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

    return (
        <Wrapper>
            <Reservation href="/reservation"> &lt; 예약 바로가기</Reservation>
            <ResContainer>
                {resList.map((reservation) => {
                    const instrument = instList.find(inst => inst.iid === reservation.iid);
                    return (
                        <ResBlock key={reservation.rid}>
                            <p>예약 장비: {instrument ? instrument.instName : "장비 정보 없음"}</p>
                            <p>
                                예약 시작 시간:{" "}
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
                            <p>예약 상태: {getStatusLabel(reservation.reservationStatus)}</p>
                        </ResBlock>
                    );
                })}
            </ResContainer>
        </Wrapper>
    );
}
