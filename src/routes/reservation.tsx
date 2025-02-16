import styled from "styled-components"
import Calendar from "react-calendar"
import 'react-calendar/dist/Calendar.css';
import { useEffect, useState } from "react"
import axios from "axios";

export interface InstItem {
    name: string,
    isActive: boolean,
    instrumentId: number
}

export interface resItem {
    reservationId: number,
    time: Date,
    status: string | null,
    possible: boolean,
    instrument: InstItem,
    userId: number
}

const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    margin-left: 15vw;
    margin-right: 15vw;
    align-items: center;
    font-family: "Noto Sans KR";
    margin-top: 80px;
`

const MyResLink = styled.a`
    align-self: flex-end;
`

const CalendarContainer = styled.div`
    .react-calendar {
        width: 100%;
        max-width: 800px;
        padding: 1rem;
        border: 0px;
        font-family: "Noto Sans KR";
    }

    .react-calendar__navigation {
        height: 3.5rem;
        display: flex;
        text-align: center;
        align-items: center;
        padding: 0 5.5rem;
    }

    .react-calendar__navigation__label {
        width: 5.5rem;
        height: 1.375rem;
        font-size: 16px;
        border: none;
        font-weight: 700;
        font-family: "Noto Sans KR";
    }

    .react-calendar__month-view__weekdays__weekday {
        font-family: "Noto Sans KR";
        font-weight: 400;
        font-size: 15px;
    }

    .react-calendar__tile {
        height: 50px;

        &:hover {
            border-radius: 8px;
        }

        &:disabled {
            border-radius: 0px;
        }
    }

    .react-calendar__tile--active {
        border-radius: 8px;
        background-color: #006edc;
    }

    .react-calendar__tile--now {
        border-radius: 8px;
        color: #006edc;
        background-color: white;
    }

    .today-label {
        color: #006edc;
    }

    abbr {
        text-decoration: none;
    }
`

const InstContainer = styled.div`
    margin-top: 10px;
`

const InstList = styled.ul`
    display: flex;
    gap: 8px;
    margin-top: 8px;
    flex-wrap: wrap;
    list-style:none;
    
`

const InstListItem = styled.li<{ isSelectedItem: boolean; isActive: boolean }>`
    list-style: none;
    border: 1px solid #c5c5c7;
    border-radius: 8px;
    font-size: 16px;
    line-height: 38px;
    padding: 10px;
    background-color: ${({ isSelectedItem, isActive }) => 
        !isActive ? "#f0f0f0" : isSelectedItem ? "#006edc" : "white"};    cursor: ${({ isActive }) => (isActive ? "pointer" : "not-allowed")};
    pointer-events: ${({ isActive }) => (isActive ? "auto" : "none")}; 

    &:hover {
        background-color: ${({ isSelectedItem, isActive }) =>
            isActive ? (isSelectedItem ? "#006edc" : "#f0f0f0") : "white"}; // 비활성 상태 색상 유지
    }
`


const CaledarTimeContainer = styled.div`
    text-align: left;
    display: flex;
    flex-direction: column;
    align-items: center; 
`

const TimeTitle = styled.div`
    font-size: 18px;
    font-weight: 600;
    align-self: flex-start;
    margin-bottom: 8px;
`

const TimeList = styled.ul`
    /* display: flex;
    gap: 8px;
    margin-top: 8px;
    flex-wrap: wrap; */

    /* display: grid;
    grid-template-columns: repeat(4, 1fr); 
    gap: 8px;
    margin-top: 8px;
    justify-content: center; // 리스트 전체를 중앙에 정렬 */

    display: flex;
    gap: 8px;
    margin-top: 8px;
    flex-wrap: wrap;
    justify-content: center; 
    list-style-type: style none;    
    width: 100%

`;

const TimeItem = styled.li<{ isSelected: boolean ; isDisabled: boolean }>`
    list-style: none;
    border: 1px solid #cccccc;
    border-radius: 8px;
    font-size: 16px;
    font-weight: 400;

    line-height: 38px;
    background-color: ${({ isSelected, isDisabled }) =>
        isDisabled ? "#e0e0e0" : isSelected ? "#006edc" : "white"};
    cursor: ${({ isDisabled }) => (isDisabled ? "not-allowed" : "pointer")};
    display: flex;
    justify-content: center;
    color: ${({ isDisabled }) => (isDisabled ? "#999999" : "black")};
    width: 15vw;;

    &:hover {
        background-color: ${({ isSelected, isDisabled }) => 
            isDisabled ? "#e0e0e0" : (isSelected ? "#006edc" : "#f0f0f0")};
    }

`;

const ResSubmit = styled.button<{isButtonAble: boolean }>`
    margin: 60px;
    font-size: 24px;
    background-color: ${({ isButtonAble }) => 
        isButtonAble ? "#006edc" : "#f0f0f0"};
    border: none;
    padding: 10px;
    width: 50%;
    cursor: ${({ isButtonAble }) => 
        isButtonAble ? "pointer" : "not-allowed"};
`;

const Notice = styled.div`
    align-self: flex-start;
    margin: 10px;
    margin-top: 40px;

    p{
        font-size: 18px;
        font-weight: 600;
    }

    li{
        margin: 5px;
    }
`;

export type DatePiece = Date | null;
export type SelectedDate = DatePiece | [DatePiece, DatePiece];

const formatDate = (date: Date) => {
    return date.toLocaleDateString('ko-KR', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit'
    }).replace(/\s/g, '') // 모든 공백 제거
    .replace(/\./g, '-') // 점을 하이픈으로 변경
    .replace(/-$/, ''); // 마지막 하이픈 제거
}

export default function Reservation() {

    const token = localStorage.getItem('authorization');

    const [selectedDate, setSelectedDate] = useState<SelectedDate>(new Date());
    const [selectedInst, setSelectedInst] = useState<number | null>(null);
    const [selectedRes, setSelectedRes] = useState<number | null>(null);
    const [instList, setInstList] = useState<InstItem[]>([]);
    const [amResList, setAmResList] = useState<resItem[]>([]);
    const [pmResList, setPmResList] = useState<resItem[]>([]);
    const [isButtonAble, setIsButtonAble] = useState<boolean>(false);

    const splitByAmPm = (list: resItem[]) => {
        return list.reduce<{ am : resItem[], pm: resItem[]}>((acc, item) => {
            const hour = new Date(item.time).getHours();
            if (hour < 12) {
                acc.am.push(item); 
            } else {
                acc.pm.push(item); 
            }
            return acc;
        }, { am: [], pm: [] });
    };

    useEffect(() => {
        const fetchInstList = async () => {
            try {
                const res = await axios.get(
                    `${import.meta.env.VITE_API_URL}/instruments`,
                    { 
                        headers: {
                            Authorization: `Bearer ${token}`, 
                        }                    
                    }
                );
                setInstList(res.data.data);
            } catch (err) {
                console.log(err);
            }
        };

        setSelectedDate(new Date());
        fetchInstList();

    }, []);

    useEffect(() => {
        const fetchResTime = async() => {
            if(selectedDate instanceof Date && selectedInst != null){
                const date = formatDate(selectedDate);
                try{
                    const res = await axios.get(
                        `${import.meta.env.VITE_API_URL}/reservations/listbydate?date=${date}&instrumentId=${selectedInst}`,
                        { 
                            headers: {
                            Authorization: `Bearer ${token}`, 
                            }                          
                        }
                    );
                    console.log(res.data.data)
                    const splitList = splitByAmPm(res.data.data);
                    setAmResList(splitList.am);
                    setPmResList(splitList.pm);

                }catch (err){
                    console.log(err)
                }
            }
        }

        fetchResTime();
        setSelectedRes(null);
    },[selectedDate, selectedInst])

    useEffect(()=>{
        if(selectedDate == null || selectedDate == null || selectedRes == null){
           setIsButtonAble(false); 
        }else{
            setIsButtonAble(true);
        }
    }, [selectedInst, selectedDate, selectedRes])


    const tileContent = ({ date, view }: { date: Date, view: string }) => {
        if (view === 'month' && isToday(date)) {
            return <div className="today-label">오늘</div>;
        }
        return null;
    }

    const isToday = (date: Date) => {
        const today = new Date();
        return (
            date.getDate() === today.getDate() &&
            date.getMonth() === today.getMonth() &&
            date.getFullYear() === today.getFullYear()
        );
    }

    const handleInstClick = (iid: number) => {
        setSelectedInst(iid);
    }

    const submitRes = () => {
        const makeRes = async() => {
            try {
                const response = await axios.get(
                    `${import.meta.env.VITE_API_URL}/reservations/make?reservationId=${selectedRes}`,
                    { 
                        headers: {
                            Authorization: `Bearer ${token}`, 
                        }
                    }
                );
                
                if (response.status === 200) {
                    alert("예약이 완료되었습니다.");
                    window.location.reload();
                }
            } catch (err) {
                alert("예약이 실패하였습니다.");
                window.location.reload();
            }
        };

        makeRes();
    }

    return (
        <Wrapper>
            <MyResLink href="reservation/my">내 예약 보기 &gt; </MyResLink>
            <InstContainer>
                <InstList>
                    {instList.length === 0 ? (
                        <TimeTitle>선택 가능한 장비가 없습니다.</TimeTitle>
                    ) : (
                        instList.map((inst) => (
                            <InstListItem 
                                key={inst.instrumentId} 
                                isSelectedItem={selectedInst === inst.instrumentId}
                                isActive = {inst.isActive}
                                onClick={() => handleInstClick(inst.instrumentId)}
                            >
                                {inst.name}
                            </InstListItem>
                        ))
                    )}
                </InstList>
            </InstContainer>
            <CalendarContainer>
                <Calendar 
                    onChange={setSelectedDate} 
                    value={selectedDate}
                    calendarType="gregory"
                    prev2Label={null}
                    next2Label={null}
                    minDate={new Date()}
                    tileContent={tileContent}
                    defaultActiveStartDate={new Date()}
                />
            </CalendarContainer>
            <CaledarTimeContainer>
                <TimeTitle>오전</TimeTitle>
                <TimeList>
                    {amResList.map((res) => (
                        <TimeItem
                            key={res.reservationId}
                            onClick={() => {if(res.possible && new Date(res.time).getTime() >= new Date().getTime() + 30 * 60 * 1000) setSelectedRes(res.reservationId)}}
                            isSelected={selectedRes === res.reservationId}
                            isDisabled = {!res.possible || new Date(res.time).getTime() < new Date().getTime() + 30 * 60 * 1000}
                        >
                            {new Date(res.time).toLocaleTimeString('ko-KR', {
                                hour: '2-digit',
                                minute: '2-digit',
                                hour12: false,
                            })}
                        </TimeItem>
                    ))}
                </TimeList>
                <TimeTitle>오후</TimeTitle>
                <TimeList>
                    {pmResList.map((res) => (
                        <TimeItem
                            key={res.reservationId}
                            onClick={() => {if(res.possible && new Date(res.time).getTime() >= new Date().getTime() + 30 * 60 * 1000) setSelectedRes(res.reservationId)}}
                            isSelected={selectedRes === res.reservationId}
                            isDisabled = {!res.possible || new Date(res.time).getTime() < new Date().getTime() + 30 * 60 * 1000}
                        >
                            {new Date(res.time).toLocaleTimeString('ko-KR', {
                                hour: '2-digit',
                                minute: '2-digit',
                                hour12: false,
                            })}
                        </TimeItem>
                    ))}
                </TimeList>
            </CaledarTimeContainer>

            <Notice>
                <p>공지사항</p>
                
                    <li>모든 예약은 1주일 전부터 가능합니다</li>
                    <li>합주 예약은 1주일 전 밤 12시 부터 가능합니다.</li>
                    <li>장비 예약은 1주일 전 낮 12시 부터 가능합니다.</li>
                    <li>철야 관련 예약은 회장 및 임원에 문의 바랍니다.</li>

                
            </Notice>
            <ResSubmit
                isButtonAble={isButtonAble}
                disabled = {!isButtonAble}
                onClick={submitRes}
            >
                예약하기
            </ResSubmit>
        </Wrapper>
    )
}