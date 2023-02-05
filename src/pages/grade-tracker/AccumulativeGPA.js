import React from 'react'

export default function AccumulativeGPA(props) {
    const {totalPoints, totalCredits} = props;
    return (
        <div>
            <h2 className="main-title">Overall GPA: {(totalPoints / totalCredits).toFixed(2)}</h2>
            <h2 className="main-title">Total points: {totalPoints} Total credits: {totalCredits}</h2>
        </div>
    )
}
