import styled from "styled-components"
import Calendar from "react-calendar"
import 'react-calendar/dist/Calendar.css';
import { useEffect, useState } from "react"


const Wrapper = styled.div`
    display: flex;
    flex-direction:column;

    margin-left: 15vw;
    margin-right: 15vw;

    align-items: center;
    font-family: "Noto Sans KR";
    
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
        text-decoration: none;
        font-family: "Noto Sans KR";
        font-weight: 400;
        font-size: 15px;
    
    }

    .react-calendar__tile{
        height: 50px;

        &:hover{
            border-radius: 8px;;
        }

        &:disabled{
            border-radius: 0px;
        }
    }

    .react-calendar__tile--active{
        border-radius: 8px;
        background-color: #006edc;
        .today-label {
            color: #c9c9c9;
        }
        .react-calendar__tile--now{
            color: white;
        }
    }

    .react-calendar__tile--now{
        border-radius: 8px;
        color: #006edc;
        background-color: white;
    }


    .today-label{
        color:#006edc;

    }


    abbr{
        text-decoration: none;
    }

    
`

const CaledarTimeContainer = styled.div`
    display: block;
    text-align: left;
    align-self: flex-start;

    margin-left: 20px;

`

const TimeTitle = styled.div`
    font-size:14px;
    margin-bottom: 8px;
    
`

const TimeList = styled.ul`
    display: flex;
    gap: 8px;
    margin-top: 8px;
`

const TimeItem = styled.li`
    list-style: none;
`

export type DatePiece = Date | null;
export type SelectedDate = DatePiece | [DatePiece, DatePiece];



export default function Reservation(){
    const [selectedDate, setSelectedDate] = useState<SelectedDate>(new Date());

    useEffect(() => {
        setSelectedDate(new Date());
    }, [])


    useEffect(() => {

    }, [selectedDate])


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


    return (
        <Wrapper>
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

                </TimeList>

                <TimeTitle>오후</TimeTitle>
                <TimeList>

                </TimeList>
            </CaledarTimeContainer>
        </Wrapper>
    )
}