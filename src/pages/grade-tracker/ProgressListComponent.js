import * as React from "react"
import "bootstrap/dist/css/bootstrap.min.css"

export default function ProgressListComponent(props) {
    const {list, handleDelete, totalCredits, totalPoints} = props
    return (
        <div>
            <h5 style={{ marginLeft: "40px", marginBottom: "0px", color: "darkgreen" }}>Completed Courses&nbsp;&nbsp;&nbsp;
            <span className="badge rounded-pill bg-success semester-gpa">
                Total Credits:&nbsp;{totalCredits}
            </span>&nbsp;
            <span className="badge rounded-pill bg-success semester-gpa">
                Accumulative GPA:&nbsp;{totalPoints/totalCredits}
            </span></h5>
            <table className="table table-striped" style={{marginTop:"0px"}}>
            <thead>
                <tr>
                    <th>Course Name</th>
                    <th>Course Code</th>
                    <th>Earned Credits</th>
                    <th>Course Grade</th>
                </tr>
            </thead>
            <tbody>
                {list.map((item, i) => {
                    return (
                        <tr key={i}>
                            <td>{item[0]}</td>
                            <td>{item[1]}</td>
                            <td>{item[2]}</td>
                            <td>{item[3]}</td>
                            <td style={{width:"30px", alignContent:"left"}}>
                                <button
                                onClick={() => {handleDelete(item); console.log("Deleted item:", item)}}
                                    className="delete-button">
                                    Delete
                                </button>
                            </td>
                        </tr>
                    )
                })}
            </tbody>
        </table></div>
    )
}