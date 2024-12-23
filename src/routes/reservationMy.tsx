import styled from "styled-components";
import { resItem } from "./reservation";
import { useEffect, useState } from "react";
import axios from "axios";

export interface instItem {
    instrumentId: number;
    name: string;
    isActive: boolean;
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
    padding: 10px;
`;

const ResContainer = styled.div`
    margin: 10px;


    h2{
        font-size: 18px;
        font-weight: 600;
    };

    p{
        text-align: center;
        margin: 50px
    }

`;

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
    const token = localStorage.getItem('authorization');


    // const [resList, setResList] = useState<resItem[]>([]);
    const [instList, setInstList] = useState<instItem[]>([]);
    const [uid, setUid] = useState<number | null>(null);

    // 예약 상태별 배열
    const [upcomingReservations, setUpcomingReservations] = useState<resItem[]>([]);
    const [pastReservations, setPastReservations] = useState<resItem[]>([]);

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const res = await axios.get(
                    `${import.meta.env.VITE_API_URL}/users/my`,
                    { 
                        headers: {
                            Authorization: `Bearer ${token}`,
                        }  
                    }
                );
                setUid(res.data.data.uid);
            } catch (err) {
                console.log(err);
            }
        };

        const fetchInst = async () => {
            try {
                const res = await axios.get(
                    `${import.meta.env.VITE_API_URL}/instruments`,
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        }
                    }
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
    }, []);

    const fetchResList = async () => {
        
        try {
            const res = await axios.get(
                `${import.meta.env.VITE_API_URL}/reservations/listbyuser`,
                { 
                    headers: {
                        Authorization: `Bearer ${token}`,
                    }
                }
            );
            // setResList(res.data);
            console.log(res.data.data)
            const now = new Date();
            const upcoming = res.data.data
                .filter((reservation: resItem) => new Date(reservation.time) >= now)
                .sort(
                    (a: resItem, b: resItem) =>
                        new Date(a.time).getTime() - new Date(b.time).getTime()
                );
            const past = res.data.data
                .filter((reservation: resItem) => new Date(reservation.time) < now)
                .sort(
                    (a: resItem, b: resItem) =>
                        new Date(a.time).getTime() - new Date(b.time).getTime()
                );

            setUpcomingReservations(upcoming);
            setPastReservations(past);
        } catch (err) {
            console.log(err);
        }
        
    };

    const getStatusLabel = (status: string | null) => {
        switch (status) {
            case "PENDING":
                return "승인 대기중";
            case "CONFIRMED":
                return "승인 됨";
            case "CANCELLED":
                return "취소됨";
            default:
                return "알 수 없음";
        }
    };

    const onClickCancelRes = (reservationId: number) => {
        if (window.confirm("정말 취소하시겠습니까?")) {
            const cancelRes = async () => {
                try {
                    const res = await axios.get(
                        `${import.meta.env.VITE_API_URL}/reservations/cancel?reservationId=${reservationId}`,
                        { 
                            headers: {
                                Authorization: `Bearer ${token}`,
                            }
                        }
                    );
                    if (res.status === 200) {
                        fetchResList();
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
                <h2>다가오는 예약</h2>
                {upcomingReservations.length > 0 ? (
                    upcomingReservations.map((reservation) => {
                        const instrument = reservation.instrument;
                        return (
                            <ResBlock key={reservation.reservationId}>
                                <UpperResBox>
                                    {instrument ? instrument.name : "장비 정보 없음"}
                                    <ResCancelButton
                                        onClick={() => onClickCancelRes(reservation.reservationId)}
                                    >
                                        예약 취소
                                    </ResCancelButton>
                                </UpperResBox>
                                <LowwerResBox>
                                    <div>
                                        {new Date(reservation.time).toLocaleDateString('ko-KR', {
                                            year: 'numeric',
                                            month: 'long',
                                            day: 'numeric',
                                        })}{" "}
                                        {new Date(reservation.time).toLocaleTimeString('ko-KR', {
                                            hour: 'numeric',
                                            minute: 'numeric',
                                        })}
                                    </div>
                                    {getStatusLabel(reservation.status)}
                                </LowwerResBox>
                            </ResBlock>
                        );
                    })
                ) : (
                    <p>예약 내역이 없습니다</p>
                )}
            </ResContainer>

            <ResContainer>
                <h2>지난 예약</h2>
                {pastReservations.length > 0 ? (
                    pastReservations.map((reservation) => {
                        const instrument = instList.find(inst => inst.instrumentId === reservation.instrument.instrumentId);
                        return (
                            <ResBlock key={reservation.reservationId}>
                                <UpperResBox>
                                    {instrument ? instrument.name : "장비 정보 없음"}
                                    <ResCancelButton disabled>
                                        취소 불가
                                    </ResCancelButton>
                                </UpperResBox>
                                <LowwerResBox>
                                    <div>
                                        {new Date(reservation.time).toLocaleDateString('ko-KR', {
                                            year: 'numeric',
                                            month: 'long',
                                            day: 'numeric',
                                        })}{" "}
                                        {new Date(reservation.time).toLocaleTimeString('ko-KR', {
                                            hour: 'numeric',
                                            minute: 'numeric',
                                        })}
                                    </div>
                                    {getStatusLabel(reservation.status)}
                                </LowwerResBox>
                            </ResBlock>
                        );
                    })
                ) : (
                    <p>예약 내역이 없습니다</p>
                )}
            </ResContainer>
        </Wrapper>
    );
}