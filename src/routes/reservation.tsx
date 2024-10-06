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
    }

    .react-calendar__tile--now{
        border-radius: 8px;
    }

    abbr{
        text-decoration: none;
    }
`

export type DatePiece = Date | null;
export type SelectedDate = DatePiece | [DatePiece, DatePiece];



export default function Reservation(){
    const [selectedDate, setSelectedDate] = useState<SelectedDate>(new Date());

    useEffect(() => {
        
    }, [selectedDate])

    return (
        <Wrapper>
            <CalendarContainer>
                <Calendar 
                    onChange={setSelectedDate} 
                    value={selectedDate}
                    calendarType="gregory"
                    prev2Label={null}
                    next2Label={null}
                />
            </CalendarContainer>
        </Wrapper>
    )
}