import * as React from "react"
import "bootstrap/dist/css/bootstrap.min.css"
import { Modal, Button } from "react-bootstrap"
import { useLocalStorage } from "react-use"
import "./style.css"
import NavbarComponent from "./NavbarComponent"
import GreetingComponent from "./GreetingComponent"
import AccumulativeGPA from "./AccumulativeGPA"
import ProgressListComponent from "./ProgressListComponent"
import FormSelectMajorComponent from "./FormSelectMajorComponent"


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

  // Handle to hide or show completed courses
  const [showCompletedCourses, setShowCompletedCourses] = React.useState(false);

  // handle no course group selected
  const handleNoGroupSelected = (x) => {
    console.log("HandleNoGroupSelected called")
    console.log(x)
    if (x === 'None') {
      return (
        <h6 style={{ marginLeft: "10px", color: "red", fontFamily: "" }}>No course group selected </h6>)
    }
  }

  // const for toggling semester
  const [showSemesters, setShowSemesters] = React.useState(false)

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

  // useState for a selected course code 
  const [selectedCourseCode, setSelectedCourseCode] = React.useState([])

  // useState for a selected course credit
  const [selectedCourseCredit, setSelectedCourseCredit] = React.useState([])

  // useState for selectedGrade
  const [selectedGrade, setSelectedGrade] = React.useState([])

  // useState for selectedGradePoint
  const [selectedGradePoint, setSelectedGradePoint] = React.useState(0)

  // localStorage for gradeList (a list that stores courses and their respective grades)
  const [gradeList, setGradeList] = useLocalStorage("gradeList", [])

  // localStorage for semester
  const [semesterGradeList, setSemesterGradeList] = useLocalStorage("semesterGradeList", [])

  // localStorage for totalPoints
  const [totalPoints, setTotalPoints] = useLocalStorage('Total Points', 0);

  // localStorage for totalCredits
  const [totalCredits, setTotalCredits] = useLocalStorage('Total Credits', 0);

  // localStorage for overallGPA
  const [overallGPA, setOverallGPA] = useLocalStorage("overallGPA", 0);

  const handleClickSetSelectedMajor = (major) => {
    setSelectedMajor(major)
  }

  const handleClickSetSelectedGroup = (group) => {
    setSelectedGroup(group)
  }

  // const hide or show groupCourses
  const [showGroupCourses, setShowGroupCourses] = React.useState(false)

  // function for adding to gradeList (a neccessity to gradeList and setGradeList)
  function addToGradeList(props) {
    gradeList.push(props)
    setGradeList([...gradeList])
    return gradeList
  }

  // function for removing from gradeList 
  const removeFromGradeList = (x) => {
    console.log("removeFromGradeList called")
    console.log(x)
    console.log("Before deleting", { gradeList })
    var myIndex = gradeList.indexOf(x);
    console.log("Index to find for", { x })
    if (myIndex > -1) {
      console.log("Index found", { myIndex })
      setTotalCredits(totalCredits - gradeList[myIndex][2])
      setTotalPoints(totalPoints - (gradeList[myIndex][5] * gradeList[myIndex][2]))
      gradeList.splice(myIndex, 1);
      setGradeList(gradeList)
    }
    console.log("After deleting", { myIndex }, { gradeList })
  }

  // function for adding a grade to a course and storing it in newList
  const setGrade = (course, grade) => {
    setSelectedCourse({ course: course, grade: grade })
    newList.push([selectedCourse, selectedGrade])
  }

  // handleClick MAIN
  const handleClick = (course, code, credit, sem, year) => {

    let subjectExists = false

    for (let i = 0; i < gradeList.length; i++) {
      if (gradeList[i][1] === code && gradeList[i][4][0] === sem && gradeList[i][4][1] === year) {
        subjectExists = true
      }
    }

    if (subjectExists) {
      alert(`Subject code ${code} already exists in Semester ${sem}/${year}!`)
    } else {
      if (selectedGrade !== "W") {

        setTotalCredits(totalCredits + credit);
        console.log('total credits', { totalCredits }, { totalCredits }, ' + ', { credit })

        setTotalPoints(totalPoints + credit * selectedGradePoint);
        console.log('Selected Grade GPA in handleClick', { selectedGradePoint })
        console.log('total points', { totalPoints })

        setSelectedCourse(course)
        setGrade(course, selectedGrade)

        addToGradeList([course, code, credit, selectedGrade, [sem, year], selectedGradePoint])
      } else {
        addToGradeList([course, code, 0, selectedGrade, [sem, year], 0])
      }
      setShowModal(true);

      console.table(gradeList)
    }
  }

  // handleClickGrade to set selectedGradePoint based on grade
  const handleClickGrade = grade => {
    console.log('Testing')
    setSelectedGrade(grade)
    setGrade(selectedCourse, grade)

    switch (grade) {
      case "W":
        setSelectedGradePoint(0)
        break
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
      const semester = `${grade[4][1]}-${grade[4][0]}`;
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
      results[semester].push(0)
      results[semester].push(0)
    }
    for (const semester in results) {
      // console.log(semester);
      // console.table(results[semester]);
      // console.log(results[semester][results[semester].length-1])
      // console.log(results[semester])
      for (let i = 0; i < results[semester].length - 2; i++) {
        console.log("For loop test result:", results[semester][i])
        console.log("For loop credit result:", results[semester][i][2])
        console.log("For loop point result:", results[semester][i][5])
        results[semester][results[semester].length - 2] += results[semester][i][2] // add total credits
        results[semester][results[semester].length - 1] += (results[semester][i][5] * results[semester][i][2]) // add total points
      }
    }
    console.log("Results", { results });
    setSemesterGradeList(results)
    console.log(semesterGradeList)

    for (const semester in results) {
      console.log(semester);
      console.table(results[semester]);
    }

    if (gradeList.length > 0) {
      setShowCompletedCourses(true)
    } else {
      setShowCompletedCourses(false)
    }

  }, [selectedMajor, selectedGroup, subjectsData, gradeList])

  React.useEffect(() => {
    setSelectedGroup({ groupName: "None", subjects: [] })
  }, [selectedMajor])

  React.useEffect(() => {
    if (selectedGroup.groupName !== 'None') {
      setShowGroupCourses(true)
    } else {
      setShowGroupCourses(false)
    }
  }, [selectedGroup])

  return (
    <>
      <NavbarComponent handleSetSelectedMajor={handleClickSetSelectedMajor} />

      {showCompletedCourses ? <div className="main-show-courses">
        <div className="Container">
          <div className="main-body welcome-text" style={{ marginLeft: "40px" }} >
            {/* <GreetingComponent major={selectedMajor}/> */}
            {/* <AccumulativeGPA totalCredits={totalCredits} totalPoints={totalPoints} /> */}
          </div> <ProgressListComponent list={gradeList} handleDelete={removeFromGradeList} totalCredits={totalCredits} totalPoints={totalPoints} />
        </div>

        <div className="semesters" style={{ marginLeft: "0px" }}>
          <button
            className="show-semesters-button"
            onClick={() => setShowSemesters(!showSemesters)}>
            Show semesters
          </button>
          {
            showSemesters ? <div>

              {Object.keys(semesterGradeList).map(
                key => <div>
                  <h5 style={{ marginLeft: "2.5%", marginTop: "10px", marginBottom: "5px", color: "darkgreen" }}>
                    Semester {key} &nbsp;&nbsp;&nbsp; <span className="badge badge-custom rounded-pill semester-gpa">Credits:&nbsp;
                      {(Object.values(semesterGradeList[key])[semesterGradeList[key].length - 2])}</span> <span className="badge rounded-pill badge-custom semester-gpa">GPA:&nbsp;
                      {(Object.values(semesterGradeList[key]).slice(-1) / Object.values(semesterGradeList[key])[semesterGradeList[key].length - 2]).toFixed(2)}</span>
                  </h5>
                  <table className="table table-hover table-striped" style={{ marginTop: "0px" }}>
                    <thead className="thead-semester">
                      <tr>
                        <th>Course Name</th>
                        <th>Course Code</th>
                        <th>Earned Credits</th>
                        <th>Course Grade</th>
                      </tr>
                    </thead>
                    <tbody>
                      {Object.values(semesterGradeList[key]).slice(0, -2).map(x =>
                        <tr>
                          <td>{x[0]}</td>
                          <td>{x[1]}</td>
                          <td>{x[2]}</td>
                          <td>{x[3]}</td>
                          {/* <td style={{ width: "30px", alignContent: "left" }}>
                    <button 
                      className="delete-button"
                      onClick={() => {removeFromGradeListV2(x)}}
                    >
                      Delete
                    </button>
                  </td> */}
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              )}
            </div> : null
          }
        </div></div> : null}





      <FormSelectMajorComponent
        selectedGroup={selectedGroup}
        setSelectedGroup={handleClickSetSelectedGroup}
        subjectsData={subjectsData}
      />

      {/* <CurriculumComponent
        selectedGroup = {selectedGroup}
        handleClickGrade = {handleClickGrade}
        setSelectedCourse = {handleSetSelectedCourse}
        handleClickShowModal = {handleClickShowModal}
        showModal = {showModal}
        handleCloseModal = {handleCloseModal}
        selectedYear = {selectedYear}
        selectedSemester = {selectedSemester}
        handleSelectYear = {handleSelectYear}
        handleSelectSemester = {handleSelectSemester}
        handleClick = {handleClick}
        selectedCourse = {selectedCourse}
        setSelectedCourseCode = {handleSetSelectedCoursecode}
        setSelectedCourseCredit = {handleSetSelectedCourseCredit}
        selectedCourseCode = {selectedCourseCode}
        selectedCourseCredit = {selectedCourseCredit}
      /> */}

      {showGroupCourses ? <table className="table table-striped">

        <thead>
          <tr>
            <th className="th">Course Name</th>
            <th className="th" style={{ width: "100px" }}>Code</th>
            <th className="th">Credits</th>
            {/* <th className="th">Grade</th> */}
            <th className="th" style={{ width: "640px" }}>Set Grade</th>
          </tr>

        </thead>

        <tbody>
          <>
            {handleNoGroupSelected(selectedGroup.groupName)}
            {selectedGroup.subjects.map((course, j) => (
              <tr key={j}>
                <td>{course.name}</td>
                <td>{course.code}</td>
                <td>{course.credit}</td>
                {/* <td>{course.grade}</td> */}
                <td>

                  <button
                    className="button1 font-weight-bold"
                    onClick={() => handleClickGrade("A")}
                  >
                    A
                  </button>
                  <button
                    className="button1 font-weight-bold"
                    onClick={() => handleClickGrade("A-")}
                  >
                    A-
                  </button>
                  <button
                    className="button1 font-weight-bold"
                    onClick={() => handleClickGrade("B+")}
                  >
                    B+
                  </button>
                  <button
                    className="button1 font-weight-bold"
                    onClick={() => handleClickGrade("B")}
                  >
                    B
                  </button>
                  <button
                    className="button1 font-weight-bold"
                    onClick={() => handleClickGrade("B-")}
                  >
                    B-
                  </button>
                  <button
                    className="button1 font-weight-bold"
                    onClick={() => handleClickGrade("C+")}
                  >
                    C+
                  </button>
                  <button
                    className="button1 font-weight-bold"
                    onClick={() => handleClickGrade("C")}
                  >
                    C
                  </button>
                  <button
                    className="button1 font-weight-bold"
                    onClick={() => handleClickGrade("C-")}
                  >
                    C-
                  </button>
                  <button
                    className="button1 font-weight-bold"
                    onClick={() => handleClickGrade("D")}
                  >
                    D
                  </button>
                  <button
                    className="button1 font-weight-bold"
                    onClick={() => handleClickGrade("F")}
                  >
                    F
                  </button>
                  <button
                    className="button1 font-weight-bold"
                    onClick={() => handleClickGrade("W")}
                  >
                    W
                  </button>
                  <button
                    className="add-button"
                    onClick={() => { setSelectedCourse(course.name); setSelectedCourseCode(course.code); setSelectedCourseCredit(course.credit); handleClickShowModal() }
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
                      <Button variant="primary" onClick={() => { handleClick(selectedCourse, selectedCourseCode, selectedCourseCredit, selectedSemester, selectedYear); handleCloseModal() }}>
                        Done
                      </Button>
                    </Modal.Footer>
                  </Modal>
                </td>
              </tr>
            ))}
          </>
        </tbody>
      </table> : null}



      <footer class="text-center text-lg-start bg-white text-muted">
        <div className="text-center p-4" style={{ backgroundColor: "rgba(0, 0, 0, 0.025)" }}>
          A Web Application Development Project
          from:&nbsp;
          <a class="text-reset fw-bold" href="https://github.com/LynnT-2003">Lynn Thit Nyi Nyi</a>
        </div>
      </footer>

    </>
  )

}



export default Page 