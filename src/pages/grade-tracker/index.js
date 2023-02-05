import * as React from "react"
import "bootstrap/dist/css/bootstrap.min.css"
import { Modal, Button, Navbar, Nav, NavDropdown, Form } from "react-bootstrap"
import { useLocalStorage } from "react-use"
// import css
import "./style.css"

function Page() {

  // For Modal and Semester
  const [showModal, setShowModal] = React.useState(false);
  const [selectedYear, setSelectedYear] = React.useState("");
  const [selectedSemester, setSelectedSemester] = React.useState("");
  // HandleClick to hide or show modal
  const handleClickShowModal = (courseName, courseCode, courseCredit) => {
    setShowModal(true);
  };
  const handleCloseModal = () => setShowModal(false);
  // Handle for Year and Semester
  const handleSelectYear = (year) => setSelectedYear(year);
  const handleSelectSemester = (semester) => setSelectedSemester(semester);


  // newList dummy
  const newList = []

  // useState for all subjectsData from the JSON
  const [subjectsData, setSubjectsData] = React.useState([])

  // useState for majors (for Computer Science and IT)
  const [selectedMajor, setSelectedMajor] = React.useState("CS")

  // useState for all course groups
  const [selectedGroup, setSelectedGroup] = React.useState({ groupName: 'No group selected', subjects: subjectsData })

  // useState for a selected course
  const [selectedCourse, setSelectedCourse] = React.useState([])

  // useState for selectedGrade
  const [selectedGrade, setSelectedGrade] = React.useState([])

  // useState for selectedGradePoint
  const [selectedGradePoint, setSelectedGradePoint] = React.useState(0)

  // localStorage for gradeList (a list that stores courses and their respective grades)
  const [gradeList, setGradeList] = useLocalStorage("gradeList", [])

  // localStorage for totalPoints
  const [totalPoints, setTotalPoints] = useLocalStorage('Total Points', 0);

  // localStorage for totalCredits
  const [totalCredits, setTotalCredits] = useLocalStorage('Total Credits', 0);

  // localStorage for overallGPA
  const [overallGPA, setOverallGPA] = useLocalStorage("overallGPA", 0);

  // function for adding to gradeList (a neccessity to gradeList and setGradeList)
  function addToGradeList(props) {
    gradeList.push(props)
    setGradeList([...gradeList])
    return gradeList
  }

  // function for adding a grade to a course and storing it in newList
  const setGrade = (course, grade) => {
    setSelectedCourse({ course: course, grade: grade })
    newList.push([selectedCourse, selectedGrade])
  }

  // handleClick MAIN
  const handleClick = (course, code, credit, sem, year) => {

    if (selectedGrade !== "W") {

      setTotalCredits(totalCredits + credit);
      console.log('total credits', { totalCredits }, { totalCredits }, ' + ', { credit })

      setTotalPoints(totalPoints + credit * selectedGradePoint);
      console.log('Selected Grade GPA in handleClick', { selectedGradePoint })
      console.log('total points', { totalPoints })

      setSelectedCourse(course)
      setGrade(course, selectedGrade)

    }
    addToGradeList([course, code, credit, selectedGrade, [sem, year]])
    setShowModal(true);

    console.table(gradeList)
  }

  // handleClickGrade to set selectedGradePoint based on grade
  const handleClickGrade = grade => {
    console.log('Testing')
    setSelectedGrade(grade)
    setGrade(selectedCourse, grade)

    switch (grade) {
      case "W":
        setSelectedGradePoint(0)
      case "A":
        setSelectedGradePoint(4)
        break
      case "A-":
        setSelectedGradePoint(3.75)
        break
      case "B+":
        setSelectedGradePoint(3.25)
        break
      case "B":
        setSelectedGradePoint(3)
        break
      case "B-":
        setSelectedGradePoint(2.75)
        break
      case "C+":
        setSelectedGradePoint(2.25)
        break
      case "C":
        setSelectedGradePoint(2)
        break
      case "C-":
        setSelectedGradePoint(1.75)
        break
      case "D":
        setSelectedGradePoint(1.25)
        break
      case "F":
        setSelectedGradePoint(1);
        break
    }
    console.log('Currently selected grade GPA', { selectedGradePoint })
  }

  // anonymous function for grouping by semester and returning the result
  const groupBySemester = grades => {
    const groupedResults = {};
    for (const grade of grades) {
      const semester = `${grade[4][0]}-${grade[4][1]}`;
      if (!groupedResults[semester]) {
        groupedResults[semester] = [];
      }
      groupedResults[semester].push(grade);
    }
    return groupedResults;
  };


  React.useEffect(() => {
    const importJson = async () => {
      const importedJson = await import(`./${selectedMajor.toLowerCase()}-2019.json`)
      setSubjectsData(importedJson.curriculum.subjects)
      console.log("SubjectsData imported and set for ", { selectedMajor })
    }
    importJson()
    console.log('selected group changed', { selectedGroup });
    console.log({ subjectsData })

    // group by semesters and check result in console
    const results = groupBySemester(gradeList);
    for (const semester in results) {
    	console.log(semester);
    	console.table(results[semester]);
      console.log(results)
      }

  }, [selectedMajor, selectedGroup, subjectsData, gradeList])

  React.useEffect(() => {
    setSelectedGroup({ groupName: "None", subjects: [] })
  }, [selectedMajor])

  return (
    <>
      <Navbar bg="light" expand="lg">
        <Navbar.Brand className="my-margin app-title" href="#grade-tracker">
          Grade Tracker
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse className="my-margin" id="basic-navbar-nav">
          <Nav className="mr-auto">
            <Nav.Link href="#home">Curriculum</Nav.Link>
            <Nav.Link href="#about">About</Nav.Link>
          </Nav>
          <Nav>
            <NavDropdown title="Select Major" id="basic-nav-dropdown">
              <NavDropdown.Item
                href="#computer-science"
                onClick={() => {
                  setSelectedMajor("CS")
                  console.log("Subjects Data", { subjectsData })
                  console.log("selectedMajor", { selectedMajor })
                  console.log(selectedGroup)
                }}
              >
                Computer Science
              </NavDropdown.Item>
              <NavDropdown.Item
                href="#IT"
                onClick={() => {
                  setSelectedMajor("IT")
                  console.log("Subjects Data", { subjectsData })
                  console.log("selectedMajor", { selectedMajor })
                  console.log(selectedGroup)
                }}
              >
                IT
              </NavDropdown.Item>
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Navbar>



      <div>

        <div className="main-body">
          <div className="welcome-text">
            Hello Mr. Lynn Thit !<br></br> Welcome to the 2023 Curriculum for{" "}
            {selectedMajor}
          </div>
        </div>

        <h2 className="main-title">Overall GPA: {(totalPoints / totalCredits).toFixed(2)}</h2>
        <h2 className="main-title">Total points: {totalPoints} Total credits: {totalCredits}</h2>
        <table className="table table-striped">
          <thead>
            <tr>
              <th>Course Name</th>
              <th>Course Code</th>
              <th>Course Credits</th>
              <th>Course Grade</th>
            </tr>
          </thead>
          <tbody>
            {/* {selectedCourse.course && selectedCourse.grade && (
              <tr>
                <td>{selectedCourse.course}</td>
                <td>{selectedCourse.grade}</td>
              </tr>
            )} */}
            {gradeList.map((item, i) => {
              return (
                <tr key={i}>
                  <td>{item[0]}</td>
                  <td>{item[1]}</td>
                  <td>{item[2]}</td>
                  <td>{item[3]}</td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>



      <table className="table" style={{ border: "white" }}>
        <tbody>
          <tr>
            <td
              style={{
                width: "270px",
                fontFamily: "Georgia",
                fontSize: "20px",
              }}>Please select a course group:</td>
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

      <table className="table table-striped">
        <thead>
          <tr>
            <th className="th">Subject Group</th>
            <th className="th">Subject Code</th>
            <th className="th">Subject Name</th>
            {/* <th className="th">Grade</th> */}
            <th className="th">Set Grade</th>
          </tr>

        </thead>

        <tbody>
          <>
            {selectedGroup.subjects.map((course, j) => (
              <tr key={j}>
                <td>{selectedGroup.groupName}</td>
                <td>{course.code}</td>
                <td>{course.name}</td>
                {/* <td>{course.grade}</td> */}
                <td>

                  <button
                    className="button1 font-weight-bold"
                    onClick={() => handleClickGrade("A") && setSelectedGrade("A")}
                  >
                    A
                  </button>
                  <button
                    className="button1 font-weight-bold"
                    onClick={() => handleClickGrade("A-") && setSelectedGrade("A-")}
                  >
                    A-
                  </button>
                  <button
                    className="button1 font-weight-bold"
                    onClick={() => handleClickGrade("B+") && setSelectedGrade("B+")}
                  >
                    B+
                  </button>
                  <button
                    className="button1 font-weight-bold"
                    onClick={() => handleClickGrade("B") && setSelectedGrade("B")}
                  >
                    B
                  </button>
                  <button
                    className="button1 font-weight-bold"
                    onClick={() => handleClickGrade("B-") && setSelectedGrade("B-")}
                  >
                    B-
                  </button>
                  <button
                    className="button1 font-weight-bold"
                    onClick={() => handleClickGrade("C+") && setSelectedGrade("C+")}
                  >
                    C+
                  </button>
                  <button
                    className="button1 font-weight-bold"
                    onClick={() => handleClickGrade("C") && setSelectedGrade("C")}
                  >
                    C
                  </button>
                  <button
                    className="button1 font-weight-bold"
                    onClick={() => handleClickGrade("C-") && setSelectedGrade("C-")}
                  >
                    C-
                  </button>
                  <button
                    className="button1 font-weight-bold"
                    onClick={() => handleClickGrade("D") && setSelectedGrade("D")}
                  >
                    D
                  </button>
                  <button
                    className="button1 font-weight-bold"
                    onClick={() => handleClickGrade("F") && setSelectedGrade("F")}
                  >
                    F
                  </button>
                  <button
                    className="button1 font-weight-bold"
                    onClick={() => handleClickGrade("W") && setSelectedGrade("W")}
                  >
                    W
                  </button>
                  <button
                    onClick={() => handleClickShowModal()
                    }
                    style={{ marginLeft: "10px" }}
                  >
                    Add+
                  </button>


                  <Modal show={showModal} onHide={handleCloseModal}>
                    <Modal.Header closeButton>
                      <Modal.Title>Select Year and Semester</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                      <div className="form-group">
                        <label>Year:</label>
                        <select
                          className="form-control"
                          value={selectedYear}
                          onChange={(e) => handleSelectYear(e.target.value)}
                        >
                          <option value="">Select a year</option>
                          <option value="2020">2020</option>
                          <option value="2021">2021</option>
                          <option value="2022">2022</option>
                          <option value="2023">2023</option>
                          <option value="2024">2024</option>
                        </select>
                      </div>
                      <div className="form-group">
                        <label>Semester:</label>
                        <select
                          className="form-control"
                          value={selectedSemester}
                          onChange={(e) => handleSelectSemester(e.target.value)}
                        >
                          <option value="">Select a semester</option>
                          <option value="1">1</option>
                          <option value="2">2</option>
                        </select>
                      </div>
                    </Modal.Body>
                    <Modal.Footer>
                      <Button variant="primary" onClick={() => { handleClick(course.name, course.code, course.credit, selectedSemester, selectedYear); handleCloseModal() }}>
                        Done
                      </Button>
                    </Modal.Footer>
                  </Modal>
                </td>
              </tr>
            ))}
          </>
        </tbody>
      </table>

    </>
  )
}



export default Page 
