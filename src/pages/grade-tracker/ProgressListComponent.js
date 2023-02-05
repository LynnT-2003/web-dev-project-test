import * as React from "react"
import "bootstrap/dist/css/bootstrap.min.css"
import { Modal, Button, Navbar, Nav, NavDropdown, Form } from "react-bootstrap"
import { useLocalStorage } from "react-use"

export default function ProgressListComponent(props) {
    const {list, handleDelete} = props
    return (
        <div><table className="table table-striped">
            <thead>
                <tr>
                    <th>Course Name</th>
                    <th>Course Code</th>
                    <th>Course Credits</th>
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
                                onClick={() => {handleDelete(item)}}
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
