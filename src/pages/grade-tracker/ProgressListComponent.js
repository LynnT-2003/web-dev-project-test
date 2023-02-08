import * as React from "react"
import "bootstrap/dist/css/bootstrap.min.css"

export default function ProgressListComponent(props) {
    const {list, handleDelete, totalCredits, totalPoints} = props
    return (
        <div>
            <h5 style={{ marginLeft: "40px", marginBottom: "0px", color: "darkgreen" }}>Completed Courses&nbsp;&nbsp;&nbsp;
            <span className="badge badge-custom rounded-pill semester-gpa">
                Total Credits:&nbsp;{totalCredits}
            </span>&nbsp;
            <span className="badge badge-custom rounded-pill semester-gpa">
                Accumulative GPA:&nbsp;{(totalPoints/totalCredits).toFixed(2)}
            </span></h5>
            <table className="table" style={{marginTop:"5px", marginBottom:"0px"}}>
            <thead className="thead-semester">
                <tr>
                    <th style={{width:"15%"}}>Course Code</th>
                    <th style={{width:"35%"}}>Course Name</th>
                    <th style={{width:"20%"}}>Earned Credits</th>
                    <th style={{width:"20%"}}>Course Grade</th>
                    <th style={{width:"10%"}}></th>
                </tr>
            </thead>
            <tbody>
                {list.map((item, i) => {
                    return (
                        <tr key={i} style={{backgroundColor:"#caf0f8"}}>
                            <td>{item[1]}</td>
                            <td>{item[0]}</td>
                            <td>{item[2]}</td>
                            <td>{item[3]}</td>
                            <td style={{width:"30px", alignContent:"left"}}>
                                <button
                                onClick={() => {handleDelete(item); console.log("Deleted item:", item)}}
                                    className="delete-button">
                                    Remove
                                </button>
                            </td>
                        </tr>
                    )
                })}
            </tbody>
        </table></div>
    )
}