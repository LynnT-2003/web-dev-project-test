import React from 'react'
import { Navbar, Nav, NavDropdown } from "react-bootstrap"

export default function NavbarComponent({handleSetSelectedMajor}) {
  return (
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
                handleSetSelectedMajor("CS")
              }}
            >
              Computer Science
            </NavDropdown.Item>
            <NavDropdown.Item
              href="#IT"
              onClick={() => {
                handleSetSelectedMajor("IT")
              }}
            >
              IT
            </NavDropdown.Item>
          </NavDropdown>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  )
}
