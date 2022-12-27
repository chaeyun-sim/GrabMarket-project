import React, { useState, useEffect } from "react";

function TimerComponent() {
    const [time, setTime] = useState(0)
    // const updateTime = () => {
    //     setTime(time + 1);
    // }
    useEffect(() => {
        setTime(time + 1)
    }, []);
    return (
        <div>
            <h3>{time}번</h3>
            <button>클릭하세요!</button>
        </div>
    )
}

export default TimerComponent;