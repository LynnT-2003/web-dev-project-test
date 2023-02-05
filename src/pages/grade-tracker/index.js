import * as React from "react"
import "bootstrap/dist/css/bootstrap.min.css"
import { Modal, Button, Navbar, Nav, NavDropdown, Form } from "react-bootstrap"
import { useLocalStorage } from "react-use"
import "./style.css"
import NavbarComponent from "./NavbarComponent"
import GreetingComponent from "./GreetingComponent"
import AccumulativeGPA from "./AccumulativeGPA"
import ProgressListComponent from "./ProgressListComponent"
import FormSelectMajorComponent from "./FormSelectMajorComponent"
import CurriculumComponent from "./CurriculumComponent"

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
  const handleSetSelectedCourse = (course) => {
    setSelectedCourse(course)
  }

	// useState for a selected course code 
	const [selectedCourseCode, setSelectedCourseCode] = React.useState([])
  const handleSetSelectedCoursecode = (code) => {
    setSelectedCourse(code)
  }

	// useState for a selected course credit
	const [selectedCourseCredit, setSelectedCourseCredit] = React.useState([])
  const handleSetSelectedCourseCredit = (credit) => {
    setSelectedCourse(credit)
  }

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

  const handleClickSetSelectedMajor = (major) => {
    setSelectedMajor(major)
  }
  
  const handleClickSetSelectedGroup = (group) => {
    setSelectedGroup(group)
  }

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
		  }

	}, [selectedMajor, selectedGroup, subjectsData, gradeList])

	React.useEffect(() => {
		setSelectedGroup({ groupName: "None", subjects: [] })
	}, [selectedMajor])

	return (
    <>
      <NavbarComponent handleSetSelectedMajor={handleClickSetSelectedMajor} />

      <div className="Container">
				<div className="main-body welcome-text">
          <GreetingComponent major={selectedMajor}/>
          <AccumulativeGPA totalCredits = {totalCredits} totalPoints = {totalPoints}/>
        </div> <ProgressListComponent list={gradeList}/>
			</div>

      <FormSelectMajorComponent
        selectedGroup = {selectedGroup}
        setSelectedGroup = {handleClickSetSelectedGroup}
        subjectsData = {subjectsData}
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
										onClick={() => {setSelectedCourse(course.name); setSelectedCourseCode(course.code); setSelectedCourseCredit(course.credit); handleClickShowModal()}
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
											<Button variant="primary" onClick={() => {handleClick(selectedCourse, selectedCourseCode, selectedCourseCredit, selectedSemester, selectedYear); handleCloseModal()}}>
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