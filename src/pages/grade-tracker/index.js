import * as React from "react"
import "bootstrap/dist/css/bootstrap.min.css"
import { Button, Container, Navbar, Nav, NavDropdown, Form } from "react-bootstrap"
import { useLocalStorage } from "react-use"

function Page() {

	// dummy value for credits
	let dummyCredits = 3

	// newList dummy
	const newList = []

	// useState for all subjectsData from the JSON
	const [subjectsData, setSubjectsData] = React.useState([])

	// useState for majors (for Computer Science and IT)
	const [selectedMajor, setSelectedMajor] = React.useState("CS")

	// useState for all course groups
	const [selectedGroup, setSelectedGroup] = React.useState({groupName: 'No group selected', subjects: subjectsData})

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
  const handleClick = course => {

    if (selectedGrade !== "W") {

      setTotalCredits(totalCredits + dummyCredits);
      console.log('total credits', {totalCredits}, {totalCredits}, ' + ', {dummyCredits})
  
      setTotalPoints(totalPoints + dummyCredits * selectedGradePoint);
      console.log('Selected Grade GPA in handleClick', {selectedGradePoint})
      console.log('total points', {totalPoints})
     
      setSelectedCourse(course)
      setGrade(course, selectedGrade)
      addToGradeList([[course], [selectedGrade]])

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
    console.log('Currently selected grade GPA', {selectedGradePoint})
  }


	React.useEffect(() => {
		const importJson = async () => {
			const importedJson = await import(`./${selectedMajor.toLowerCase()}-2019.json`)
			setSubjectsData(importedJson.curriculum.subjects)
			console.log("SubjectsData imported and set for ", {selectedMajor})
		}
		importJson()
		console.log('selected group changed', { selectedGroup });
		console.log({subjectsData})
	}, [selectedMajor, selectedGroup])

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

			

      <div className="main-body">
        <div className="welcome-text">
          Hello Mr. Lynn !<br></br> Welcome to the 2023 Curriculum for{" "}
          {selectedMajor}
        </div>
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
      </div>

			<table className="table table-striped">
				<tbody>
					<tr>
						<td>
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
						<th className="th">Grade</th>
					</tr>

				</thead>

				<tbody>
						<>
							{selectedGroup.subjects.map((course, j) => (
								<tr key={j}>
									<td>{selectedGroup.groupName}</td>
									<td>{course.code}</td>
									<td>{course.name}</td>
									<td>{course.grade}</td>
									<td>
										<button>
											Add+
										</button>
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