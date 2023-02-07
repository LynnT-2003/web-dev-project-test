// import * as React from "react"
// import "bootstrap/dist/css/bootstrap.min.css"
// import { Modal, Button, Navbar, Nav, NavDropdown, Form } from "react-bootstrap"
// import { useLocalStorage } from "react-use"

// export default function CurriculumComponent(props) {
//     const {selectedGroup, handleClickGrade, setSelectedCourse, handleClickShowModal, showModal, handleCloseModal, selectedYear, selectedSemester, handleSelectYear, handleSelectSemester, handleClick, selectedCourse, setSelectedCourseCode, setSelectedCourseCredit, selectedCourseCode, selectedCourseCredit} = props
//     return (
//         <div><table className="table table-striped">
//         <thead>
//             <tr>
//                 <th className="th">Subject Group</th>
//                 <th className="th">Subject Code</th>
//                 <th className="th">Subject Name</th>
//                 {/* <th className="th">Grade</th> */}
//                 <th className="th">Set Grade</th>
//             </tr>

//         </thead>

//         <tbody>
//             <>
//                 {selectedGroup.subjects.map((course, j) => (
//                     <tr key={j}>
//                         <td>{selectedGroup.groupName}</td>
//                         <td>{course.code}</td>
//                         <td>{course.name}</td>
//                         {/* <td>{course.grade}</td> */}
//                         <td>

//                             <button
//                                 className="button1 font-weight-bold"
//                                 onClick={() => handleClickGrade("A")}
//                             >
//                                 A
//                             </button>
//                             <button
//                                 className="button1 font-weight-bold"
//                                 onClick={() => handleClickGrade("A-")}
//                             >
//                                 A-
//                             </button>
//                             <button
//                                 className="button1 font-weight-bold"
//                                 onClick={() => handleClickGrade("B+")}
//                             >
//                                 B+
//                             </button>
//                             <button
//                                 className="button1 font-weight-bold"
//                                 onClick={() => handleClickGrade("B")}
//                             >
//                                 B
//                             </button>
//                             <button
//                                 className="button1 font-weight-bold"
//                                 onClick={() => handleClickGrade("B-")}
//                             >
//                                 B-
//                             </button>
//                             <button
//                                 className="button1 font-weight-bold"
//                                 onClick={() => handleClickGrade("C+")}
//                             >
//                                 C+
//                             </button>
//                             <button
//                                 className="button1 font-weight-bold"
//                                 onClick={() => handleClickGrade("C")}
//                             >
//                                 C
//                             </button>
//                             <button
//                                 className="button1 font-weight-bold"
//                                 onClick={() => handleClickGrade("C-")}
//                             >
//                                 C-
//                             </button>
//                             <button
//                                 className="button1 font-weight-bold"
//                                 onClick={() => handleClickGrade("D")}
//                             >
//                                 D
//                             </button>
//                             <button
//                                 className="button1 font-weight-bold"
//                                 onClick={() => handleClickGrade("F")}
//                             >
//                                 F
//                             </button>
//                             <button
//                                 className="button1 font-weight-bold"
//                                 onClick={() => handleClickGrade("W")}
//                             >
//                                 W
//                             </button>
//                             <button
//                                 onClick={() => {setSelectedCourse(course.name); setSelectedCourseCode(course.code); setSelectedCourseCredit(course.credit); handleClickShowModal()}
//                                 }
//                                 style={{ marginLeft: "10px" }}
//                             >
//                                 Add+
//                             </button>


//                             <Modal show={showModal} onHide={handleCloseModal}>
//                                 <Modal.Header closeButton>
//                                     <Modal.Title>Select Year and Semester</Modal.Title>
//                                 </Modal.Header>
//                                 <Modal.Body>
//                                     <div className="form-group">
//                                         <label>Year:</label>
//                                         <select
//                                             className="form-control"
//                                             value={selectedYear}
//                                             onChange={(e) => handleSelectYear(e.target.value)}
//                                         >
//                                             <option value="">Select a year</option>
//                                             <option value="2020">2020</option>
//                                             <option value="2021">2021</option>
//                                             <option value="2022">2022</option>
//                                             <option value="2023">2023</option>
//                                             <option value="2024">2024</option>
//                                         </select>
//                                     </div>
//                                     <div className="form-group">
//                                         <label>Semester:</label>
//                                         <select
//                                             className="form-control"
//                                             value={selectedSemester}
//                                             onChange={(e) => handleSelectSemester(e.target.value)}
//                                         >
//                                             <option value="">Select a semester</option>
//                                             <option value="1">1</option>
//                                             <option value="2">2</option>
//                                         </select>
//                                     </div>
//                                 </Modal.Body>
//                                 <Modal.Footer>
//                                     <Button variant="primary" onClick={() => {handleClick(selectedCourse, selectedCourseCode, selectedCourseCredit, selectedSemester, selectedYear); handleCloseModal()}}>
//                                         Done
//                                     </Button>
//                                 </Modal.Footer>
//                             </Modal>
//                         </td>
//                     </tr>
//                 ))}
//             </>
//         </tbody>
//     </table></div>
//     )
// }