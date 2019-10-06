import React, { useState, useEffect, useCallback, useRef } from "react";
import moment from "moment";
import styled from "styled-components";
import ReactGrid from "./ReactGrid";

const MotherHolder = styled.div`
  width: 95%;
  height: 80%;
  background: lightgray;
`;

const MonthsHolder = styled.div`
  border: 2px solid black;
  width: 100%;
  height: 100%;
  background: lightgray;
`;

const MonthNavBar = styled.div`
  border: 2px solid green;
  font-size: 1.5rem;
  width: 100%;
  height: auto;
  background: inherit;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const DayContainer = styled.div`
  width: 100%;
  height: auto;
  background: gray;
  color: white;
`;

const OneDay = styled.div`
//   border: 2px solid black;
//   background: blanchedalmond;
  height: 8%;
  width: ${({ width, days }) => width / days}px
  display:flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
`;

const ButtonHolder = styled.div`
  height: auto;
  width: auto;
  position: absolute;
  left: 10;
  top: 10;
  display: flex;
`;

const MonthButton = styled.div`
  width: auto;
  height: 40px;
  border: 2px solid white;
  background: black;
  color: white;
  text-align: center;
  vertical-align: middle;
  padding: 8px;
`;

const DateDiv = styled.div`
  padding: 5px;
  width: 100%;
  height: auto;
  text-align: center;
`;

const TopNavbarContainer = styled.div`
  width: 100%;
  display: flex;
  text-align: center;
  height: 6%;
`;

const AbsoluteContainer = styled.div`
position: absolute;
width: 94%;
/* width: ${({ width, days, length }) => (width / days) * length}px;
 */
`;

const production = [
  {
    id: 0,
    startDate: "2019-10-03",
    endDate: "2019-10-30",
    name: "Executive Producer",
    crewList: [
      {
        name: "Peter Petersson"
      },
      {
        name: "Helga Helgsson"
      },
      {
        name: "Toby Tobysson"
      }
    ]
  },
  {
    id: 1,
    startDate: "2019-10-15",
    endDate: "2019-10-27",
    name: "god bless",
    crewList: [
      {
        name: "Peter Petersson"
      },
      {
        name: "Helga Helgsson"
      },
      {
        name: "Toby Tobysson"
      }
    ]
  },
  {
    id: 2,
    startDate: "2019-10-07",
    endDate: "2019-10-18",
    name: "The Vidar Boys",
    crewList: [
      {
        name: "Peter Petersson"
      },
      {
        name: "Helga Helgsson"
      },
      {
        name: "Toby Tobysson"
      }
    ]
  },
  {
    id: 3,
    startDate: "2019-10-07",
    endDate: "2019-10-18",
    name: "The Vidar Boys2",
    crewList: [
      {
        name: "Peter Petersson"
      },
      {
        name: "Helga Helgsson"
      },
      {
        name: "Toby Tobysson"
      }
    ]
  }
];

export default function Calendar() {
  const year = moment().year();
  const [month, setMonth] = useState(moment().month()); // like "9" for october
  const [daysInMonth, setDaysInMonth] = useState(
    moment(`${year}-${month + 1}`, "YYYY-MM").daysInMonth()
  );
  const [days, setDays] = useState([null]);
  const [timeline, setTimeline] = useState([null]);
  const [layout, setLayout] = useState([null]);


  const monthsObj = Object.assign({}, moment.months());
  //   console.log(monthsObj, moment().month());

  const changeMonthForward = useCallback(() => {
    if (month === 11) setMonth(0);
    else {
      setMonth(month + 1);
    }
  }, [month]);

  const changeMonthBackwards = useCallback(() => {
    if (month === 0) setMonth(11);
    else {
      setMonth(month - 1);
    }
  }, [month]);

  const ref = useRef(null);

  useEffect(() => {
    console.log("we are in effect");
    const parentWidth = ref.current ? ref.current.offsetWidth : 0;

    setDaysInMonth(moment(`${year}-${month + 1}`, "YYYY-MM").daysInMonth());

    const amountOfDays = moment(
      `${year}-${month + 1}`,
      "YYYY-MM"
    ).daysInMonth();
    setTimeline([null]);
    setLayout([null]);
    const arr = [];
    const El = [];
    const tempLayout = [];

         const clicking = ({ target: { id } }) => {
      console.log(id);
    }; 
    for (let i = 0; i < amountOfDays; i += 1) {


const itterationDate = moment(`${year}-${month + 1}-${i + 1}`, 'YYYY-MM-D').format();
    for (let j = 0; j < production.length; j += 1) {
        const date = moment(`${production[j].startDate}`, 'YYYY-MM-D').format();
        if (date === itterationDate) {
          const date2 = moment(`${production[j].endDate}`, 'YYYY-MM-D');
          const date1 = moment(`${production[j].startDate}`, 'YYYY-MM-D');
          const date1Days = moment(`${production[j].startDate}`, 'YYYY-MM-D').format('D');
          console.log(date1Days);

          const diff = date2.diff(date1, 'days');
          console.log(diff);

          const thing = {
              id : production[j].id,
              width : parentWidth,
              days : amountOfDays,
              length : diff,
              startDate : date1Days,
              name: production[j].name,
          };

          console.log(thing)

          const thingLayout = { i: `${production[j].id}`, x: parseInt(date1Days), y: 0, w: diff, h: 1 };

          El.push(thing);
          tempLayout.push(thingLayout)
          setLayout(tempLayout)
          setTimeline(El);
          console.log(layout, ' this is big layout')
          console.log('this matches', date, itterationDate);
        }
      }  


      arr.push(
        <>
          <OneDay width={parentWidth} days={amountOfDays} key={i}>
            <DayContainer>
              <DateDiv>
                {moment(`${year}-${month + 1}-${i + 1}`, "YYYY-MM-D").format(
                  "dd"
                )}
              </DateDiv>
              <DateDiv>{i + 1}</DateDiv>
            </DayContainer>
          </OneDay>
        </>
      );
    }
    setDays(arr);
  }, [month, setMonth, ref.current]);
  return (
    <>
      <ButtonHolder>
        <MonthButton onClick={changeMonthForward}> Next </MonthButton>
        <MonthButton onClick={changeMonthBackwards}> Prev </MonthButton>
      </ButtonHolder>

      <MotherHolder>
        <MonthNavBar>
          {moment.months()[month]} {year}
        </MonthNavBar>
        <MonthsHolder ref={ref}>
          <TopNavbarContainer>{days}</TopNavbarContainer>
          {/* <TimelineContainer>{timeline} </TimelineContainer> */}
          <AbsoluteContainer>
            <ReactGrid timelineItems={timeline} theLayout={layout} />
          </AbsoluteContainer>
        </MonthsHolder>
      </MotherHolder>
    </>
  );
}

/* const contentDiv = document.getElementById('root')
const gridProps = window.gridProps || {}; */
/* ReactDOM.render(React.createElement(Calendar, gridProps), contentDiv); */
