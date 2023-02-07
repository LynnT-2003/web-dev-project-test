import * as React from "react"
import "bootstrap/dist/css/bootstrap.min.css"
import {Form } from "react-bootstrap"

export default function FormSelectMajorComponent(props) {
  const {selectedGroup, setSelectedGroup, subjectsData} = props
  return (
    <div>
      <table className="table" style={{ border: "white" }}>
        <tbody>
          <tr>
            <td
              style={{
                width: "330px",
                fontFamily: "Georgia",
                fontSize: "20px",
              }}>Select a course group to add from:</td>
            <td style={{
              textAlign: "left"
            }}>
              <Form.Select
                aria-label="Select Group"
                value={selectedGroup.groupName}
                onChange={e =>
                  setSelectedGroup(
                    subjectsData.find(group => group.groupName === e.target.value)
                  )
                }
              >
                {subjectsData.map(group => (
                  <option key={group.groupName} value={group.groupName}>
                    {group.groupName}
                  </option>
                ))}
              </Form.Select>
            </td>
            <td>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    )
}